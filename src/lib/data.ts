import { db } from "@/db";
import { inquiries, projectPhotos, projects, siteContent, testimonials } from "@/db/schema";
import { asc, desc, eq, sql } from "drizzle-orm";
import { DEFAULT_CONTENT, SEED_PROJECTS, SEED_TESTIMONIALS } from "@/lib/site-data";
import { ensureSchema } from "@/lib/schema-bootstrap";

export type Project = typeof projects.$inferSelect;
export type Photo = typeof projectPhotos.$inferSelect;
export type Testimonial = typeof testimonials.$inferSelect;

let seedPromise: Promise<void> | null = null;

async function count(table: typeof projects | typeof testimonials) {
  const result = await db.select({ total: sql<number>`count(*)::int` }).from(table);
  return result[0]?.total ?? 0;
}

export async function ensureSeeded(): Promise<void> {
  if (!seedPromise) {
    seedPromise = (async () => {
      await ensureSchema();
      if ((await count(projects)) === 0) {
        for (const project of SEED_PROJECTS) {
          const inserted = await db
            .insert(projects)
            .values({
              slug: project.slug,
              title: project.title,
              category: project.category,
              description: project.description,
              details: project.details,
              coverImage: project.coverImage,
              featured: project.featured,
              sortOrder: project.sortOrder,
            })
            .onConflictDoNothing()
            .returning({ id: projects.id });
          const id = inserted[0]?.id;
          if (id && project.photos.length) {
            await db.insert(projectPhotos).values(
              project.photos.map((photo, index) => ({
                projectId: id,
                url: photo.url,
                caption: photo.caption,
                sortOrder: index,
              })),
            );
          }
        }
      }

      if ((await count(testimonials)) === 0) {
        await db.insert(testimonials).values(SEED_TESTIMONIALS);
      }

      for (const item of DEFAULT_CONTENT) {
        await db
          .insert(siteContent)
          .values(item)
          .onConflictDoNothing({ target: siteContent.key });
      }
    })().catch((error) => {
      seedPromise = null;
      throw error;
    });
  }
  return seedPromise;
}

export async function getProjects(): Promise<Project[]> {
  await ensureSeeded();
  return db.select().from(projects).orderBy(asc(projects.sortOrder), asc(projects.id));
}

export async function getFeaturedProjects(limit = 6): Promise<Project[]> {
  const all = await getProjects();
  const featured = all.filter((project) => project.featured);
  return (featured.length ? featured : all).slice(0, limit);
}

export async function getProjectBySlug(slug: string): Promise<Project | undefined> {
  await ensureSeeded();
  const result = await db.select().from(projects).where(eq(projects.slug, slug)).limit(1);
  return result[0];
}

export async function getProjectPhotos(projectId: number): Promise<Photo[]> {
  await ensureSeeded();
  return db
    .select()
    .from(projectPhotos)
    .where(eq(projectPhotos.projectId, projectId))
    .orderBy(asc(projectPhotos.sortOrder), asc(projectPhotos.id));
}

export async function getAllPhotos(): Promise<(Photo & { projectTitle: string })[]> {
  await ensureSeeded();
  const result = await db
    .select({
      photo: projectPhotos,
      projectTitle: projects.title,
    })
    .from(projectPhotos)
    .innerJoin(projects, eq(projectPhotos.projectId, projects.id))
    .orderBy(desc(projectPhotos.id));
  return result.map((row) => ({ ...row.photo, projectTitle: row.projectTitle }));
}

export async function getTestimonials(featuredOnly = false): Promise<Testimonial[]> {
  await ensureSeeded();
  if (featuredOnly) {
    return db
      .select()
      .from(testimonials)
      .where(eq(testimonials.featured, true))
      .orderBy(asc(testimonials.sortOrder), asc(testimonials.id));
  }
  return db
    .select()
    .from(testimonials)
    .orderBy(asc(testimonials.sortOrder), asc(testimonials.id));
}

export async function getContent(): Promise<Record<string, string>> {
  await ensureSeeded();
  const rows = await db.select().from(siteContent);
  const values: Record<string, string> = {};
  for (const row of rows) values[row.key] = row.value;
  for (const item of DEFAULT_CONTENT) {
    if (values[item.key] === undefined) values[item.key] = item.value;
  }
  return values;
}

export async function getContentItems(): Promise<typeof siteContent.$inferSelect[]> {
  await ensureSeeded();
  return db.select().from(siteContent);
}

export async function getInquiries(): Promise<(typeof inquiries.$inferSelect)[]> {
  await ensureSeeded();
  return db.select().from(inquiries).orderBy(desc(inquiries.createdAt)).limit(50);
}
