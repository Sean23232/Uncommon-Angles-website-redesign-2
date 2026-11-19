import type { Metadata } from "next";
import Link from "next/link";
import Photo from "@/components/Photo";
import { ArrowRight } from "@/components/Icons";
import { SERVICES } from "@/lib/site-data";

export const metadata: Metadata = {
  title: "Services",
  description:
    "Custom home construction, structural work, foundations, framing, roofing, interior and exterior carpentry, and concrete work in Buena Vista, Colorado.",
};

export default function ServicesPage() {
  return (
    <>
      <section className="relative flex min-h-[58svh] items-end overflow-hidden bg-charcoal">
        <div className="absolute inset-0 photo-zoom">
          <Photo src="/images/img_sl_7.png" alt="Structural framing and crane work on a custom home build" sizes="100vw" priority />
        </div>
        <div className="absolute inset-0 bg-gradient-to-r from-charcoal/92 via-charcoal/60 to-charcoal/25" />
        <div className="absolute inset-0 bg-gradient-to-t from-charcoal/75 to-transparent" />
        <div className="container-x relative z-10 pb-16 pt-40 lg:pb-20">
          <p className="text-[10px] font-semibold uppercase tracking-[0.32em] text-bronze">Our Services</p>
          <h1 className="display mt-5 max-w-4xl text-[clamp(3.2rem,7vw,6.4rem)] text-ivory">
            Everything You Need <br className="hidden sm:block" /> to Build Your Dream Home.
          </h1>
          <p className="mt-6 max-w-2xl text-[15px] leading-[1.9] text-ivory/75">
            No matter the size of the job, we can help start the work — or finish it and get it back on schedule.
          </p>
        </div>
      </section>

      <section className="section-pad">
        <div className="container-x">
          <div className="max-w-3xl">
            <p className="eyebrow">Capability</p>
            <h2 className="display mt-5 text-[clamp(2.6rem,4.8vw,4.8rem)]">From the Ground Up.</h2>
            <p className="body-copy mt-7">
              We provide services mainly to general contractors and homeowners. As a structure and carpentry
              subcontractor, we pour the foundation, frame the structure, install the roofing, and complete the
              exterior carpentry, interior carpentry, site concrete work, and decorative site concrete work. We make
              the building process easier by providing quality workmanship on every job.
            </p>
          </div>

          <div className="mt-20 space-y-20 lg:space-y-28">
            {SERVICES.map((service, index) => (
              <article
                key={service.slug}
                id={service.slug}
                className="grid scroll-mt-32 gap-8 lg:grid-cols-2 lg:items-center lg:gap-16"
              >
                <div className={`photo-zoom relative aspect-[4/3] bg-stone ${index % 2 === 1 ? "lg:order-2" : ""}`}>
                  <Photo
                    src={service.image}
                    alt={service.alt}
                    sizes="(max-width: 1024px) 100vw, 50vw"
                  />
                  <span className="absolute left-0 top-0 bg-charcoal px-4 py-3 font-serif text-xl text-ivory">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                </div>
                <div className={index % 2 === 1 ? "lg:order-1" : ""}>
                  <p className="eyebrow">UnCommon Angles · Service</p>
                  <h2 className="display mt-4 text-[clamp(2.4rem,4vw,4rem)]">{service.title}</h2>
                  <div className="mt-6 h-px w-16 bg-bronze" />
                  <p className="body-copy mt-6 max-w-xl">{service.description}</p>
                  <div className="mt-8 flex flex-wrap gap-5">
                    <Link href="/contact" className="text-link">
                      Inquire About This Service <ArrowRight className="h-4 w-4" />
                    </Link>
                    <Link href="/projects" className="text-link">
                      View Related Work <ArrowRight className="h-4 w-4" />
                    </Link>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-charcoal py-20 text-center text-ivory lg:py-24">
        <div className="container-x">
          <p className="text-[10px] font-semibold uppercase tracking-[0.3em] text-bronze">Start the Conversation</p>
          <h2 className="display mx-auto mt-5 max-w-3xl text-[clamp(2.5rem,4.5vw,4.5rem)]">
            Need a Dependable Hand on Your Project?
          </h2>
          <Link href="/contact" className="btn-bronze mt-9">
            Discuss Your Project <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </section>
    </>
  );
}
