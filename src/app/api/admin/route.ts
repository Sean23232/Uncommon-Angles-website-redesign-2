import { NextResponse } from "next/server";
import { revalidatePath } from "next/cache";
import { eq } from "drizzle-orm";
import { db } from "@/db";
import { inquiries, projectPhotos, projects, siteContent, testimonials } from "@/db/schema";
import { isAdminRequest } from "@/lib/admin-auth";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

function slugify(value: string) {
  return value
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "")
    .slice(0, 70);
}

function text(value: unknown, fallback = "") {
  return typeof value === "string" ? value.trim() : fallback;
}

export async function GET() {
  return NextResponse.json({ protected: Boolean(process.env.ADMIN_PASSCODE) });
}

export async function POST(request: Request) {
  if (!isAdminRequest(request)) {
    return NextResponse.json({ error: "Incorrect site management passcode." }, { status: 401 });
  }

  try {
    const { action, payload = {} } = await request.json();
    const id = Number(payload.id);

    switch (action) {
      case "project.create": {
        const title = text(payload.title);
        if (!title || !text(payload.category) || !text(payload.description)) {
          return NextResponse.json({ error: "Title, category, and description are required." }, { status: 400 });
        }
        const base = slugify(title) || "project";
        const existing = await db.select({ id: projects.id }).from(projects).where(eq(projects.slug, base));
        const slug = existing.length ? `${base}-${Date.now().toString(36)}` : base;
        await db.insert(projects).values({
          slug,
          title,
          category: text(payload.category),
          description: text(payload.description),
          details: text(payload.details),
          coverImage: text(payload.coverImage, "/images/Project-1.jpeg"),
          featured: Boolean(payload.featured),
          sortOrder: Number(payload.sortOrder) || 100,
        });
        break;
      }
      case "project.update": {
        if (!Number.isInteger(id)) return NextResponse.json({ error: "Invalid project." }, { status: 400 });
        const title = text(payload.title);
        const slug = title ? slugify(title) : undefined;
        await db
          .update(projects)
          .set({
            title: title || undefined,
            slug,
            category: text(payload.category) || undefined,
            description: text(payload.description) || undefined,
            details: text(payload.details),
            coverImage: text(payload.coverImage) || undefined,
            featured: Boolean(payload.featured),
            sortOrder: Number(payload.sortOrder) || 0,
          })
          .where(eq(projects.id, id));
        break;
      }
      case "project.delete": {
        if (!Number.isInteger(id)) return NextResponse.json({ error: "Invalid project." }, { status: 400 });
        await db.delete(projects).where(eq(projects.id, id));
        break;
      }
      case "photo.create": {
        const projectId = Number(payload.projectId);
        if (!Number.isInteger(projectId) || !text(payload.url)) {
          return NextResponse.json({ error: "Choose a project and an image." }, { status: 400 });
        }
        await db.insert(projectPhotos).values({
          projectId,
          url: text(payload.url),
          caption: text(payload.caption),
          sortOrder: Number(payload.sortOrder) || 0,
        });
        break;
      }
      case "photo.update": {
        if (!Number.isInteger(id)) return NextResponse.json({ error: "Invalid photo." }, { status: 400 });
        await db
          .update(projectPhotos)
          .set({ caption: text(payload.caption), sortOrder: Number(payload.sortOrder) || 0 })
          .where(eq(projectPhotos.id, id));
        break;
      }
      case "photo.delete": {
        if (!Number.isInteger(id)) return NextResponse.json({ error: "Invalid photo." }, { status: 400 });
        await db.delete(projectPhotos).where(eq(projectPhotos.id, id));
        break;
      }
      case "review.create": {
        if (!text(payload.author) || !text(payload.quote)) {
          return NextResponse.json({ error: "Name and review text are required." }, { status: 400 });
        }
        await db.insert(testimonials).values({
          author: text(payload.author),
          quote: text(payload.quote),
          context: text(payload.context),
          featured: Boolean(payload.featured),
          sortOrder: Number(payload.sortOrder) || 100,
        });
        break;
      }
      case "review.update": {
        if (!Number.isInteger(id)) return NextResponse.json({ error: "Invalid review." }, { status: 400 });
        await db
          .update(testimonials)
          .set({
            author: text(payload.author) || undefined,
            quote: text(payload.quote) || undefined,
            context: text(payload.context),
            featured: Boolean(payload.featured),
            sortOrder: Number(payload.sortOrder) || 0,
          })
          .where(eq(testimonials.id, id));
        break;
      }
      case "review.delete": {
        if (!Number.isInteger(id)) return NextResponse.json({ error: "Invalid review." }, { status: 400 });
        await db.delete(testimonials).where(eq(testimonials.id, id));
        break;
      }
      case "content.update": {
        const entries = Array.isArray(payload.items) ? payload.items : [];
        for (const item of entries) {
          const key = text(item.key);
          if (!key) continue;
          await db
            .insert(siteContent)
            .values({ key, value: text(item.value), label: text(item.label, key), group: text(item.group, "General") })
            .onConflictDoUpdate({
              target: siteContent.key,
              set: { value: text(item.value), updatedAt: new Date() },
            });
        }
        break;
      }
      case "inquiry.delete": {
        if (!Number.isInteger(id)) return NextResponse.json({ error: "Invalid inquiry." }, { status: 400 });
        await db.delete(inquiries).where(eq(inquiries.id, id));
        break;
      }
      default:
        return NextResponse.json({ error: "Unknown action." }, { status: 400 });
    }

    revalidatePath("/", "layout");
    return NextResponse.json({ ok: true });
  } catch (error) {
    console.error("Admin action failed", error);
    return NextResponse.json({ error: "The change could not be saved. Please try again." }, { status: 500 });
  }
}
