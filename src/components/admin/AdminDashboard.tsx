"use client";

import { useEffect, useState, type FormEvent, type ReactNode } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import ImagePicker from "@/components/admin/ImagePicker";
import { CheckIcon } from "@/components/Icons";
import type { Photo, Project, Testimonial } from "@/lib/data";
import { PROJECT_CATEGORIES } from "@/lib/site-data";
import type { inquiries, siteContent } from "@/db/schema";

type Tab = "projects" | "photos" | "reviews" | "content" | "inquiries";
type ContentItem = typeof siteContent.$inferSelect;
type Inquiry = typeof inquiries.$inferSelect;

const TABS: { id: Tab; label: string; note: string }[] = [
  { id: "projects", label: "Manage Projects", note: "Add, edit, feature, or remove completed work." },
  { id: "photos", label: "Manage Photos", note: "Upload new photographs and organize each project gallery." },
  { id: "reviews", label: "Manage Reviews", note: "Keep customer testimonials current and accurate." },
  { id: "content", label: "Manage Content", note: "Update headlines, contact details, and social links." },
  { id: "inquiries", label: "Inquiries", note: "Read messages submitted through the contact form." },
];

export default function AdminDashboard({
  projects,
  photos,
  testimonials,
  contentItems,
  inquiries: inquiryList,
}: {
  projects: Project[];
  photos: (Photo & { projectTitle: string })[];
  testimonials: Testimonial[];
  contentItems: ContentItem[];
  inquiries: Inquiry[];
}) {
  const router = useRouter();
  const [tab, setTab] = useState<Tab>("projects");
  const [needsPasscode, setNeedsPasscode] = useState(false);
  const [unlocked, setUnlocked] = useState(false);
  const [passcode, setPasscode] = useState("");
  const [notice, setNotice] = useState("");
  const [busy, setBusy] = useState(false);

  useEffect(() => {
    fetch("/api/admin")
      .then((response) => response.json())
      .then((data) => {
        setNeedsPasscode(Boolean(data.protected));
        if (!data.protected) setUnlocked(true);
      })
      .catch(() => setUnlocked(true));
  }, []);

  async function send(action: string, payload: Record<string, unknown>, code = passcode) {
    setBusy(true);
    setNotice("");
    try {
      const response = await fetch("/api/admin", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          ...(code ? { "x-admin-passcode": code } : {}),
        },
        body: JSON.stringify({ action, payload }),
      });
      const result = await response.json();
      if (!response.ok) throw new Error(result.error || "Unable to save changes.");
      setNotice("Saved. The website has been updated.");
      router.refresh();
      return true;
    } catch (error) {
      setNotice(error instanceof Error ? `Error: ${error.message}` : "Unable to save changes.");
      return false;
    } finally {
      setBusy(false);
    }
  }

  if (needsPasscode && !unlocked) {
    return (
      <div className="container-x flex min-h-screen items-center py-32">
        <form
          className="mx-auto w-full max-w-md border border-charcoal/12 bg-white/60 p-9"
          onSubmit={async (event) => {
            event.preventDefault();
            if (await send("content.update", { items: [] }, passcode)) setUnlocked(true);
          }}
        >
          <p className="eyebrow">Site Management</p>
          <h1 className="display mt-4 text-4xl">Enter passcode</h1>
          <p className="body-copy mt-3">This area is protected. Enter the site management passcode to continue.</p>
          <input type="password" value={passcode} onChange={(event) => setPasscode(event.target.value)} className="field mt-6" placeholder="Passcode" required />
          <button type="submit" className="btn-primary mt-5 w-full">Unlock</button>
          {notice && <p className="mt-4 text-sm text-red-700">{notice}</p>}
        </form>
      </div>
    );
  }

  return (
    <div className="container-x py-32 lg:py-40">
      <div className="flex flex-col justify-between gap-6 border-b border-charcoal/15 pb-9 md:flex-row md:items-end">
        <div>
          <p className="eyebrow">UnCommon Angles · Private</p>
          <h1 className="display mt-4 text-[clamp(2.8rem,5vw,4.6rem)]">Site Management</h1>
          <p className="body-copy mt-4 max-w-2xl">
            Simple tools for keeping the website current. Choose a section below — every change is saved to the live site
            right away, with no developer needed.
          </p>
        </div>
        <Link href="/" className="text-link">View Website ↗</Link>
      </div>

      <div className="mt-10 grid gap-8 lg:grid-cols-[260px_1fr] lg:gap-12">
        <nav className="flex gap-2 overflow-x-auto pb-2 lg:sticky lg:top-28 lg:h-fit lg:flex-col lg:overflow-visible" aria-label="Admin sections">
          {TABS.map((item) => (
            <button
              key={item.id}
              type="button"
              onClick={() => { setTab(item.id); setNotice(""); }}
              className={`shrink-0 border px-4 py-3 text-left text-[11px] font-semibold uppercase tracking-[0.1em] transition-colors lg:text-[12px] ${
                tab === item.id ? "border-charcoal bg-charcoal text-ivory" : "border-charcoal/15 bg-ivory text-charcoal/65 hover:border-bronze hover:text-bronze"
              }`}
            >
              {item.label}
            </button>
          ))}
        </nav>

        <div>
          <div className="mb-8">
            <h2 className="font-serif text-4xl">{TABS.find((item) => item.id === tab)?.label}</h2>
            <p className="mt-2 text-sm text-charcoal/55">{TABS.find((item) => item.id === tab)?.note}</p>
            {notice && (
              <p className={`mt-4 border px-4 py-3 text-sm ${notice.startsWith("Error") ? "border-red-300 bg-red-50 text-red-700" : "border-forest/25 bg-forest/5 text-forest"}`}>
                {notice}
              </p>
            )}
          </div>

          {tab === "projects" && (
            <ProjectsPanel projects={projects} send={send} busy={busy} passcode={passcode} />
          )}
          {tab === "photos" && (
            <PhotosPanel projects={projects} photos={photos} send={send} busy={busy} passcode={passcode} />
          )}
          {tab === "reviews" && (
            <ReviewsPanel testimonials={testimonials} send={send} busy={busy} />
          )}
          {tab === "content" && (
            <ContentPanel items={contentItems} send={send} busy={busy} />
          )}
          {tab === "inquiries" && (
            <InquiriesPanel inquiries={inquiryList} send={send} busy={busy} />
          )}
        </div>
      </div>
    </div>
  );
}

type Send = (action: string, payload: Record<string, unknown>) => Promise<boolean>;

function Card({ title, children }: { title: string; children: ReactNode }) {
  return (
    <section className="mb-10 border border-charcoal/12 bg-white/55 p-6 sm:p-8">
      <h3 className="font-serif text-2xl">{title}</h3>
      <div className="mt-6">{children}</div>
    </section>
  );
}

function ProjectsPanel({ projects, send, busy, passcode }: { projects: Project[]; send: Send; busy: boolean; passcode: string }) {
  const [form, setForm] = useState({ title: "", category: PROJECT_CATEGORIES[0], description: "", details: "", coverImage: "/images/Project-1.jpeg", featured: false, sortOrder: 100 });

  return (
    <>
      <Card title="Add a New Project">
        <form
          className="space-y-5"
          onSubmit={async (event) => {
            event.preventDefault();
            if (await send("project.create", form)) {
              setForm({ title: "", category: PROJECT_CATEGORIES[0], description: "", details: "", coverImage: "/images/Project-1.jpeg", featured: false, sortOrder: 100 });
              (event.target as HTMLFormElement).reset();
            }
          }}
        >
          <div className="grid gap-4 sm:grid-cols-2">
            <label className="block"><span className="field-label">Project title</span><input required className="field" value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })} placeholder="e.g. Contemporary Mountain Home" /></label>
            <label className="block"><span className="field-label">Category</span><select className="field" value={form.category} onChange={(e) => setForm({ ...form, category: e.target.value })}>{PROJECT_CATEGORIES.map((category) => <option key={category}>{category}</option>)}</select></label>
          </div>
          <label className="block"><span className="field-label">Short description</span><textarea required rows={3} className="field" value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })} /></label>
          <label className="block"><span className="field-label">Details (optional)</span><input className="field" value={form.details} onChange={(e) => setForm({ ...form, details: e.target.value })} placeholder="Scope, materials, location..." /></label>
          <ImagePicker value={form.coverImage} onChange={(url) => setForm({ ...form, coverImage: url })} label="Cover photograph" passcode={passcode} />
          <div className="flex flex-wrap items-center gap-6">
            <label className="flex items-center gap-2 text-sm"><input type="checkbox" checked={form.featured} onChange={(e) => setForm({ ...form, featured: e.target.checked })} /> Feature on homepage</label>
            <label className="flex items-center gap-3 text-sm">Order <input type="number" className="field w-20" value={form.sortOrder} onChange={(e) => setForm({ ...form, sortOrder: Number(e.target.value) })} /></label>
          </div>
          <button type="submit" disabled={busy} className="btn-primary">Add Project</button>
        </form>
      </Card>

      <Card title={`Existing Projects (${projects.length})`}>
        <div className="space-y-5">
          {projects.map((project) => (
            <ProjectEditor key={project.id} project={project} send={send} busy={busy} passcode={passcode} />
          ))}
          {!projects.length && <p className="text-sm text-charcoal/50">No projects yet. Add one above.</p>}
        </div>
      </Card>
    </>
  );
}

function ProjectEditor({ project, send, busy, passcode }: { project: Project; send: Send; busy: boolean; passcode: string }) {
  const [open, setOpen] = useState(false);
  const [form, setForm] = useState({
    title: project.title,
    category: project.category,
    description: project.description,
    details: project.details,
    coverImage: project.coverImage,
    featured: project.featured,
    sortOrder: project.sortOrder,
  });

  return (
    <div className="border border-charcoal/12 bg-ivory">
      <div className="flex items-center gap-4 p-4">
        <div className="h-16 w-24 shrink-0 bg-stone">{/* eslint-disable-next-line @next/next/no-img-element */}<img src={project.coverImage} alt="" className="h-full w-full object-cover" /></div>
        <div className="min-w-0 flex-1">
          <p className="font-serif text-xl leading-tight">{project.title}</p>
          <p className="mt-1 text-[11px] uppercase tracking-wider text-charcoal/45">{project.category}{project.featured ? " · Featured" : ""}</p>
        </div>
        <button type="button" onClick={() => setOpen((value) => !value)} className="text-[11px] font-semibold uppercase tracking-widest text-bronze">{open ? "Close" : "Edit"}</button>
      </div>
      {open && (
        <form
          className="space-y-4 border-t border-charcoal/10 p-5"
          onSubmit={async (event) => {
            event.preventDefault();
            await send("project.update", { id: project.id, ...form });
          }}
        >
          <div className="grid gap-4 sm:grid-cols-2">
            <label className="block"><span className="field-label">Title</span><input className="field" value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })} /></label>
            <label className="block"><span className="field-label">Category</span><input className="field" value={form.category} onChange={(e) => setForm({ ...form, category: e.target.value })} /></label>
          </div>
          <label className="block"><span className="field-label">Description</span><textarea rows={3} className="field" value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })} /></label>
          <label className="block"><span className="field-label">Details</span><input className="field" value={form.details} onChange={(e) => setForm({ ...form, details: e.target.value })} /></label>
          <ImagePicker value={form.coverImage} onChange={(url) => setForm({ ...form, coverImage: url })} label="Cover photograph" passcode={passcode} />
          <div className="flex flex-wrap items-center gap-6">
            <label className="flex items-center gap-2 text-sm"><input type="checkbox" checked={form.featured} onChange={(e) => setForm({ ...form, featured: e.target.checked })} /> Featured</label>
            <label className="flex items-center gap-3 text-sm">Order <input type="number" className="field w-20" value={form.sortOrder} onChange={(e) => setForm({ ...form, sortOrder: Number(e.target.value) })} /></label>
          </div>
          <div className="flex flex-wrap gap-3">
            <button type="submit" disabled={busy} className="btn-primary">Save Changes</button>
            <button type="button" disabled={busy} onClick={async () => { if (confirm(`Remove "${project.title}" and its photos?`)) await send("project.delete", { id: project.id }); }} className="border border-red-300 px-5 py-3 text-[11px] font-semibold uppercase tracking-widest text-red-700 hover:bg-red-50">Remove Project</button>
          </div>
        </form>
      )}
    </div>
  );
}

function PhotosPanel({ projects, photos, send, busy, passcode }: { projects: Project[]; photos: (Photo & { projectTitle: string })[]; send: Send; busy: boolean; passcode: string }) {
  const [projectId, setProjectId] = useState<number>(projects[0]?.id ?? 0);
  const [url, setUrl] = useState("");
  const [caption, setCaption] = useState("");
  const current = projects.find((project) => project.id === projectId);
  const visible = photos.filter((photo) => photo.projectId === projectId);

  return (
    <>
      <Card title="Add Photograph to a Project">
        <form
          className="space-y-5"
          onSubmit={async (event) => {
            event.preventDefault();
            if (await send("photo.create", { projectId, url, caption })) { setUrl(""); setCaption(""); }
          }}
        >
          <label className="block"><span className="field-label">Project</span><select className="field" value={projectId} onChange={(e) => setProjectId(Number(e.target.value))}>{projects.map((project) => <option key={project.id} value={project.id}>{project.title}</option>)}</select></label>
          <ImagePicker value={url} onChange={setUrl} label="Photograph to add" passcode={passcode} />
          <label className="block"><span className="field-label">Caption (optional)</span><input className="field" value={caption} onChange={(e) => setCaption(e.target.value)} placeholder="e.g. Front exterior at dusk" /></label>
          <button type="submit" disabled={busy || !url || !projectId} className="btn-primary">Add Photograph</button>
        </form>
      </Card>

      <Card title={`Gallery: ${current?.title ?? "No project selected"} (${visible.length})`}>
        <div className="space-y-4">
          {visible.map((photo) => (
            <PhotoEditor key={photo.id} photo={photo} send={send} busy={busy} />
          ))}
          {!visible.length && <p className="text-sm text-charcoal/50">No photographs in this gallery yet.</p>}
        </div>
      </Card>

      <Card title="All Uploaded Photographs">
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
          {photos.map((photo) => (
            <div key={photo.id} className="border border-charcoal/10">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={photo.url} alt={photo.caption || "Project photo"} className="aspect-[4/3] w-full object-cover" />
              <p className="truncate p-2 text-[11px] text-charcoal/55">{photo.projectTitle}</p>
            </div>
          ))}
        </div>
      </Card>
    </>
  );
}

function PhotoEditor({ photo, send, busy }: { photo: Photo & { projectTitle: string }; send: Send; busy: boolean }) {
  const [caption, setCaption] = useState(photo.caption);
  return (
    <div className="flex flex-col gap-4 border border-charcoal/12 bg-ivory p-4 sm:flex-row sm:items-center">
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src={photo.url} alt={photo.caption} className="h-20 w-28 shrink-0 object-cover" />
      <form className="flex flex-1 flex-wrap items-end gap-3" onSubmit={async (event) => { event.preventDefault(); await send("photo.update", { id: photo.id, caption }); }}>
        <label className="min-w-[180px] flex-1"><span className="field-label">Caption</span><input className="field" value={caption} onChange={(e) => setCaption(e.target.value)} /></label>
        <button type="submit" disabled={busy} className="border border-charcoal px-4 py-3 text-[11px] font-semibold uppercase tracking-widest">Save</button>
        <button type="button" disabled={busy} onClick={async () => { if (confirm("Remove this photograph?")) await send("photo.delete", { id: photo.id }); }} className="text-[11px] font-semibold uppercase tracking-widest text-red-700 hover:underline">Remove</button>
      </form>
    </div>
  );
}

function ReviewsPanel({ testimonials, send, busy }: { testimonials: Testimonial[]; send: Send; busy: boolean }) {
  const [form, setForm] = useState({ author: "", quote: "", context: "", featured: false, sortOrder: 100 });

  return (
    <>
      <Card title="Add a Customer Testimonial">
        <form
          className="space-y-5"
          onSubmit={async (event) => {
            event.preventDefault();
            if (await send("review.create", form)) { setForm({ author: "", quote: "", context: "", featured: false, sortOrder: 100 }); (event.target as HTMLFormElement).reset(); }
          }}
        >
          <div className="grid gap-4 sm:grid-cols-2">
            <label className="block"><span className="field-label">Customer name / attribution</span><input required className="field" value={form.author} onChange={(e) => setForm({ ...form, author: e.target.value })} /></label>
            <label className="block"><span className="field-label">Project context (optional)</span><input className="field" value={form.context} onChange={(e) => setForm({ ...form, context: e.target.value })} placeholder="e.g. Custom home, Salida CO" /></label>
          </div>
          <label className="block"><span className="field-label">Review text</span><textarea required rows={5} className="field" value={form.quote} onChange={(e) => setForm({ ...form, quote: e.target.value })} /></label>
          <div className="flex flex-wrap items-center gap-6">
            <label className="flex items-center gap-2 text-sm"><input type="checkbox" checked={form.featured} onChange={(e) => setForm({ ...form, featured: e.target.checked })} /> Feature on homepage</label>
            <label className="flex items-center gap-3 text-sm">Order <input type="number" className="field w-20" value={form.sortOrder} onChange={(e) => setForm({ ...form, sortOrder: Number(e.target.value) })} /></label>
          </div>
          <button type="submit" disabled={busy} className="btn-primary">Add Testimonial</button>
          <p className="text-[11px] text-charcoal/45">Only add reviews you have received from real customers. Do not invent ratings or endorsements.</p>
        </form>
      </Card>

      <Card title={`Existing Testimonials (${testimonials.length})`}>
        <div className="space-y-5">
          {testimonials.map((item) => <ReviewEditor key={item.id} item={item} send={send} busy={busy} />)}
        </div>
      </Card>
    </>
  );
}

function ReviewEditor({ item, send, busy }: { item: Testimonial; send: Send; busy: boolean }) {
  const [form, setForm] = useState({ author: item.author, quote: item.quote, context: item.context, featured: item.featured, sortOrder: item.sortOrder });
  const [open, setOpen] = useState(false);
  return (
    <div className="border border-charcoal/12 bg-ivory">
      <div className="flex items-start gap-4 p-4">
        <div className="min-w-0 flex-1">
          <p className="text-sm font-semibold">{item.author}</p>
          <p className="mt-1 line-clamp-2 text-[13px] text-charcoal/55">{item.quote}</p>
        </div>
        <button type="button" onClick={() => setOpen((value) => !value)} className="text-[11px] font-semibold uppercase tracking-widest text-bronze">{open ? "Close" : "Edit"}</button>
      </div>
      {open && (
        <form
          className="space-y-4 border-t border-charcoal/10 p-5"
          onSubmit={async (event) => { event.preventDefault(); await send("review.update", { id: item.id, ...form }); }}
        >
          <div className="grid gap-4 sm:grid-cols-2">
            <label className="block"><span className="field-label">Name</span><input className="field" value={form.author} onChange={(e) => setForm({ ...form, author: e.target.value })} /></label>
            <label className="block"><span className="field-label">Context</span><input className="field" value={form.context} onChange={(e) => setForm({ ...form, context: e.target.value })} /></label>
          </div>
          <label className="block"><span className="field-label">Review text</span><textarea rows={5} className="field" value={form.quote} onChange={(e) => setForm({ ...form, quote: e.target.value })} /></label>
          <div className="flex flex-wrap items-center gap-6">
            <label className="flex items-center gap-2 text-sm"><input type="checkbox" checked={form.featured} onChange={(e) => setForm({ ...form, featured: e.target.checked })} /> Featured</label>
            <label className="flex items-center gap-3 text-sm">Order <input type="number" className="field w-20" value={form.sortOrder} onChange={(e) => setForm({ ...form, sortOrder: Number(e.target.value) })} /></label>
          </div>
          <div className="flex flex-wrap gap-3">
            <button type="submit" disabled={busy} className="btn-primary">Save Review</button>
            <button type="button" disabled={busy} onClick={async () => { if (confirm("Remove this testimonial?")) await send("review.delete", { id: item.id }); }} className="border border-red-300 px-5 py-3 text-[11px] font-semibold uppercase tracking-widest text-red-700 hover:bg-red-50">Remove</button>
          </div>
        </form>
      )}
    </div>
  );
}

function ContentPanel({ items, send, busy }: { items: ContentItem[]; send: Send; busy: boolean }) {
  const [values, setValues] = useState<Record<string, string>>(() => Object.fromEntries(items.map((item) => [item.key, item.value])));
  const groups = Array.from(new Set(items.map((item) => item.group)));
  const longFields = new Set(["hero_text", "about_story", "cta_text", "footer_description"]);

  return (
    <form
      className="space-y-10"
      onSubmit={async (event: FormEvent) => {
        event.preventDefault();
        await send("content.update", { items: items.map((item) => ({ ...item, value: values[item.key] ?? item.value })) });
      }}
    >
      {groups.map((group) => (
        <Card key={group} title={group}>
          <div className="space-y-5">
            {items.filter((item) => item.group === group).map((item) => (
              <label key={item.key} className="block">
                <span className="field-label">{item.label}</span>
                {longFields.has(item.key) ? (
                  <textarea rows={3} className="field" value={values[item.key] ?? ""} onChange={(e) => setValues({ ...values, [item.key]: e.target.value })} />
                ) : (
                  <input className="field" value={values[item.key] ?? ""} onChange={(e) => setValues({ ...values, [item.key]: e.target.value })} placeholder={item.key.includes("url") ? "https://..." : undefined} />
                )}
              </label>
            ))}
          </div>
        </Card>
      ))}
      <button type="submit" disabled={busy} className="btn-primary"><CheckIcon className="h-4 w-4" /> Save All Content</button>
    </form>
  );
}

function InquiriesPanel({ inquiries, send, busy }: { inquiries: Inquiry[]; send: Send; busy: boolean }) {
  return (
    <Card title={`Recent Inquiries (${inquiries.length})`}>
      {!inquiries.length && <p className="text-sm text-charcoal/50">No inquiries have been submitted yet.</p>}
      <div className="space-y-4">
        {inquiries.map((item) => (
          <div key={item.id} className="border border-charcoal/12 bg-ivory p-5">
            <div className="flex flex-wrap items-start justify-between gap-3">
              <div>
                <p className="font-serif text-xl">{item.name}</p>
                <p className="mt-1 text-xs text-charcoal/50">{item.email}{item.phone ? ` · ${item.phone}` : ""}</p>
              </div>
              <div className="flex items-center gap-4">
                <span className="text-[11px] text-charcoal/45">{new Date(item.createdAt).toLocaleDateString("en-US")}</span>
                <button type="button" disabled={busy} onClick={async () => { if (confirm("Delete this inquiry?")) await send("inquiry.delete", { id: item.id }); }} className="text-[11px] font-semibold uppercase tracking-widest text-red-700 hover:underline">Delete</button>
              </div>
            </div>
            {item.projectType && <p className="mt-3 text-[11px] font-semibold uppercase tracking-widest text-bronze">{item.projectType}</p>}
            <p className="mt-3 whitespace-pre-wrap text-sm leading-relaxed text-charcoal/70">{item.message}</p>
            <a href={`mailto:${item.email}`} className="text-link mt-4">Reply by Email ↗</a>
          </div>
        ))}
      </div>
    </Card>
  );
}
