import type { Metadata } from "next";
import Photo from "@/components/Photo";
import ProjectsGallery from "@/components/ProjectsGallery";
import { getProjects } from "@/lib/data";

export const metadata: Metadata = {
  title: "Projects",
  description:
    "Explore custom homes, log homes, contemporary houses, interior carpentry, and structural construction from the UnCommon Angles project archive.",
};

export const dynamic = "force-dynamic";

export default async function ProjectsPage() {
  const projects = await getProjects();

  return (
    <>
      <section className="relative flex min-h-[58svh] items-end overflow-hidden bg-charcoal">
        <div className="absolute inset-0 photo-zoom">
          <Photo src="/images/Project-3.jpeg" alt="Contemporary custom home built by UnCommon Angles in Colorado" sizes="100vw" priority />
        </div>
        <div className="absolute inset-0 bg-gradient-to-r from-charcoal/92 via-charcoal/60 to-charcoal/25" />
        <div className="absolute inset-0 bg-gradient-to-t from-charcoal/75 to-transparent" />
        <div className="container-x relative z-10 pb-16 pt-40">
          <p className="text-[10px] font-semibold uppercase tracking-[0.32em] text-bronze">Our Work · Archive</p>
          <h1 className="display mt-5 max-w-4xl text-[clamp(3.2rem,7vw,6.4rem)] text-ivory">
            A Look at What We’ve Built.
          </h1>
          <p className="mt-6 max-w-2xl text-[15px] leading-[1.9] text-ivory/75">
            New homes to large commercial investments. Every project we’re involved with is done with your ideas in
            mind — from log and contemporary homes to craftsman and traditional farmhouses.
          </p>
        </div>
      </section>

      <section className="section-pad pt-14 lg:pt-16">
        <div className="container-x">
          <ProjectsGallery projects={projects} />
        </div>
      </section>
    </>
  );
}
