"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import Photo from "@/components/Photo";
import { ArrowUpRight } from "@/components/Icons";
import type { Project } from "@/lib/data";

export default function ProjectsGallery({ projects }: { projects: Project[] }) {
  const categories = useMemo(
    () => ["All Projects", ...Array.from(new Set(projects.map((project) => project.category)))],
    [projects],
  );
  const [active, setActive] = useState("All Projects");
  const visible = active === "All Projects" ? projects : projects.filter((project) => project.category === active);

  return (
    <div>
      <div className="flex flex-wrap gap-2.5 border-y border-charcoal/12 py-6">
        {categories.map((category) => (
          <button
            key={category}
            type="button"
            onClick={() => setActive(category)}
            className={`border px-4 py-2.5 text-[11px] font-semibold uppercase tracking-[0.12em] transition-colors ${
              active === category
                ? "border-charcoal bg-charcoal text-ivory"
                : "border-charcoal/15 text-charcoal/60 hover:border-bronze hover:text-bronze"
            }`}
          >
            {category}
          </button>
        ))}
      </div>

      <p className="mt-7 text-[11px] uppercase tracking-[0.18em] text-charcoal/45">
        Showing {visible.length} {visible.length === 1 ? "project" : "projects"}
      </p>

      <div className="masonry mt-8">
        {visible.map((project, index) => (
          <Link key={project.id} href={`/projects/${project.slug}`} className="masonry-item group block">
            <div className="photo-zoom relative w-full bg-stone">
              <Photo
                src={project.coverImage}
                alt={`${project.title} — UnCommon Angles project photography`}
                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                priority={index < 3}
              />
              <span className="absolute inset-0 flex items-end bg-gradient-to-t from-charcoal/75 via-transparent to-transparent p-6 opacity-0 transition-opacity duration-500 group-hover:opacity-100">
                <span className="inline-flex items-center gap-2 text-[11px] font-semibold uppercase tracking-[0.16em] text-ivory">
                  View Project <ArrowUpRight className="h-4 w-4" />
                </span>
              </span>
            </div>
            <div className="mt-4 flex items-start justify-between gap-3">
              <div>
                <p className="eyebrow">{project.category}</p>
                <h2 className="mt-1.5 font-serif text-2xl leading-tight text-charcoal transition-colors group-hover:text-bronze">
                  {project.title}
                </h2>
              </div>
              <ArrowUpRight className="mt-1 h-4 w-4 shrink-0 text-charcoal/30 transition-colors group-hover:text-bronze" />
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
