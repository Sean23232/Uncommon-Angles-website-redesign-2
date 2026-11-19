import Link from "next/link";
import Photo from "@/components/Photo";
import { ArrowUpRight } from "@/components/Icons";
import type { Project } from "@/lib/data";

export default function ProjectCard({
  project,
  aspect = "aspect-[4/3]",
  priority = false,
}: {
  project: Project;
  aspect?: string;
  priority?: boolean;
}) {
  return (
    <Link href={`/projects/${project.slug}`} className="group block">
      <div className={`photo-zoom relative w-full bg-stone ${aspect}`}>
        <Photo
          src={project.coverImage}
          alt={`${project.title} — a project by UnCommon Angles`}
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
          priority={priority}
        />
        <div className="pointer-events-none absolute inset-0 bg-charcoal/0 transition-colors duration-500 group-hover:bg-charcoal/20" />
        <span className="absolute right-4 top-4 inline-flex h-9 w-9 items-center justify-center bg-ivory/90 text-charcoal opacity-0 transition-all duration-300 group-hover:opacity-100">
          <ArrowUpRight className="h-4 w-4" />
        </span>
      </div>
      <div className="mt-5 flex items-start justify-between gap-4">
        <div>
          <p className="eyebrow">{project.category}</p>
          <h3 className="mt-2 font-serif text-[26px] leading-tight tracking-[-0.01em] text-charcoal transition-colors group-hover:text-bronze sm:text-[30px]">
            {project.title}
          </h3>
        </div>
        <ArrowUpRight className="mt-1 h-5 w-5 shrink-0 text-charcoal/35 transition-all group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-bronze" />
      </div>
    </Link>
  );
}
