import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import Photo from "@/components/Photo";
import ShareButtons from "@/components/ShareButtons";
import { ArrowLeft, ArrowRight, CheckIcon } from "@/components/Icons";
import { getProjectBySlug, getProjectPhotos, getProjects } from "@/lib/data";

type Params = { params: Promise<{ slug: string }> };

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const { slug } = await params;
  const project = await getProjectBySlug(slug);
  if (!project) return { title: "Project Not Found" };
  return {
    title: project.title,
    description: project.description,
    openGraph: { images: [project.coverImage] },
  };
}

export const dynamic = "force-dynamic";

export default async function ProjectDetailPage({ params }: Params) {
  const { slug } = await params;
  const project = await getProjectBySlug(slug);
  if (!project) notFound();

  const photos = await getProjectPhotos(project.id);
  const all = await getProjects();
  const currentIndex = all.findIndex((item) => item.id === project.id);
  const next = all[(currentIndex + 1) % all.length];

  return (
    <>
      <section className="relative flex min-h-[70svh] items-end overflow-hidden bg-charcoal">
        <div className="absolute inset-0 photo-zoom">
          <Photo src={project.coverImage} alt={project.title} sizes="100vw" priority />
        </div>
        <div className="absolute inset-0 bg-gradient-to-t from-charcoal/90 via-charcoal/35 to-charcoal/25" />
        <div className="container-x relative z-10 pb-14 pt-40 lg:pb-16">
          <Link href="/projects" className="inline-flex items-center gap-2 text-[11px] font-semibold uppercase tracking-[0.16em] text-ivory/70 hover:text-ivory">
            <ArrowLeft className="h-4 w-4" /> All Projects
          </Link>
          <p className="mt-8 text-[10px] font-semibold uppercase tracking-[0.3em] text-bronze">{project.category}</p>
          <h1 className="display mt-4 max-w-4xl text-[clamp(3.2rem,7vw,6.4rem)] text-ivory">{project.title}</h1>
        </div>
      </section>

      <section className="section-pad">
        <div className="container-x grid gap-12 lg:grid-cols-[1fr_0.75fr] lg:gap-24">
          <div>
            <p className="eyebrow">Project Overview</p>
            <h2 className="display mt-5 text-[clamp(2.4rem,4vw,3.8rem)]">The Work Behind the Image.</h2>
            <p className="body-copy mt-7 max-w-2xl text-base">{project.description}</p>
            {project.details && (
              <div className="mt-10 border-t border-charcoal/15 pt-7">
                <p className="text-[10px] font-semibold uppercase tracking-[0.22em] text-charcoal/45">Project Details</p>
                <p className="mt-4 text-sm leading-[1.9] text-charcoal/70">{project.details}</p>
              </div>
            )}
            <div className="mt-10 flex flex-wrap gap-3">
              <Link href="/contact" className="btn-primary">
                Discuss a Similar Project <ArrowRight className="h-4 w-4" />
              </Link>
              <ShareButtons title={project.title} />
            </div>
          </div>
          <aside className="h-fit border border-charcoal/12 bg-[#eeebe3]/60 p-8">
            <p className="eyebrow">Project Archive</p>
            <div className="mt-6 space-y-5 text-sm">
              <div className="flex justify-between gap-4 border-b border-charcoal/10 pb-4">
                <span className="text-charcoal/50">Category</span>
                <span className="text-right font-medium">{project.category}</span>
              </div>
              <div className="flex justify-between gap-4 border-b border-charcoal/10 pb-4">
                <span className="text-charcoal/50">Builder</span>
                <span className="text-right font-medium">UnCommon Angles, Inc.</span>
              </div>
              <div className="flex justify-between gap-4 border-b border-charcoal/10 pb-4">
                <span className="text-charcoal/50">Photographs</span>
                <span className="text-right font-medium">{photos.length} in gallery</span>
              </div>
              <div className="flex justify-between gap-4">
                <span className="text-charcoal/50">Based in</span>
                <span className="text-right font-medium">Buena Vista, Colorado</span>
              </div>
            </div>
            <div className="mt-7 flex items-start gap-2.5 text-[12px] leading-relaxed text-charcoal/50">
              <CheckIcon className="mt-0.5 h-4 w-4 shrink-0 text-bronze" />
              Images are drawn from the UnCommon Angles project archive.
            </div>
          </aside>
        </div>

        <div className="container-x mt-20">
          <div className="grid gap-4 sm:grid-cols-2">
            {photos.map((photo, index) => (
              <figure key={photo.id} className={index === 0 && photos.length > 2 ? "sm:col-span-2" : ""}>
                <div className={`photo-zoom relative w-full bg-stone ${index === 0 && photos.length > 2 ? "aspect-[16/9]" : "aspect-[4/3]"}`}>
                  <Photo
                    src={photo.url}
                    alt={photo.caption || `${project.title} project photograph`}
                    sizes="(max-width: 640px) 100vw, 50vw"
                  />
                </div>
                {photo.caption && (
                  <figcaption className="mt-3 text-[12px] tracking-wide text-charcoal/45">{photo.caption}</figcaption>
                )}
              </figure>
            ))}
          </div>
        </div>
      </section>

      <section className="border-t border-charcoal/10 bg-[#eeebe3] py-16 lg:py-20">
        <div className="container-x flex flex-col gap-8 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <p className="eyebrow">Next in the archive</p>
            <Link href={`/projects/${next.slug}`} className="mt-2 block font-serif text-4xl transition-colors hover:text-bronze sm:text-5xl">
              {next.title}
            </Link>
          </div>
          <Link href={`/projects/${next.slug}`} className="btn-primary">
            View Next Project <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </section>
    </>
  );
}
