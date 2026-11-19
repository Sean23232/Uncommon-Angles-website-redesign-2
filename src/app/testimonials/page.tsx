import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, CheckIcon } from "@/components/Icons";
import { getContent, getTestimonials } from "@/lib/data";

export const metadata: Metadata = {
  title: "Testimonials",
  description: "Feedback from homeowners, log cabin owners, general contractors, and partners who have worked with UnCommon Angles.",
};

export const dynamic = "force-dynamic";

export default async function TestimonialsPage() {
  const [testimonials, content] = await Promise.all([getTestimonials(), getContent()]);

  return (
    <>
      <section className="relative flex min-h-[52svh] items-end overflow-hidden bg-charcoal">
        <div className="absolute inset-0 photo-zoom">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/images/img_sl_8.png" alt="" className="h-full w-full object-cover" />
        </div>
        <div className="absolute inset-0 bg-gradient-to-r from-charcoal/92 via-charcoal/60 to-charcoal/30" />
        <div className="container-x relative z-10 pb-16 pt-40">
          <p className="text-[10px] font-semibold uppercase tracking-[0.32em] text-bronze">Client Words</p>
          <h1 className="display mt-5 max-w-4xl text-[clamp(3.2rem,7vw,6.4rem)] text-ivory">
            The Relationships Behind Every Build.
          </h1>
          <p className="mt-6 max-w-2xl text-[15px] leading-[1.9] text-ivory/75">
            The feedback below is preserved from the original UnCommon Angles website, with attribution as provided.
          </p>
        </div>
      </section>

      <section className="section-pad">
        <div className="container-x">
          <div className="grid gap-x-6 gap-y-5 lg:grid-cols-3">
            {testimonials.map((item) => (
              <article key={item.id} className="flex flex-col border border-charcoal/12 bg-[#eeebe3]/50 p-7 sm:p-9">
                <div className="font-serif text-5xl leading-none text-bronze/45">“</div>
                <p className="mt-5 flex-1 text-[14px] leading-[1.9] text-charcoal/75">{item.quote}</p>
                <div className="mt-8 border-t border-charcoal/12 pt-5">
                  <p className="text-[12px] font-semibold uppercase tracking-[0.13em] text-charcoal">{item.author}</p>
                  {item.context && <p className="mt-1 text-[12px] text-charcoal/50">{item.context}</p>}
                </div>
              </article>
            ))}
          </div>

          <div className="mt-16 grid gap-10 border-t border-charcoal/12 pt-12 lg:grid-cols-[1fr_1fr] lg:gap-20">
            <div>
              <p className="eyebrow">Share Your Experience</p>
              <h2 className="display mt-4 text-[clamp(2.2rem,3.6vw,3.6rem)]">Worked With Us Before?</h2>
              <p className="body-copy mt-5">
                We welcome feedback from the clients and partners who have built with us. If you would like to add a
                testimonial, send it to Matt directly and it can be added to this page.
              </p>
              <a href={`mailto:${content.email || "matt@uncommonangles.com"}`} className="text-link mt-7">
                Email Your Testimonial <ArrowRight className="h-4 w-4" />
              </a>
            </div>
            <div>
              <p className="eyebrow">Our Commitment</p>
              <h2 className="display mt-4 text-[clamp(2.2rem,3.6vw,3.6rem)]">Trust Earned on Every Jobsite.</h2>
              <div className="mt-6 space-y-3">
                {[
                  "Honest, dependable service since 1997",
                  "Quality workmanship from foundation to finish",
                  "Clear communication and respect for your vision",
                ].map((item) => (
                  <div key={item} className="flex items-start gap-3 text-sm text-charcoal/70">
                    <CheckIcon className="mt-0.5 h-4 w-4 shrink-0 text-bronze" />
                    {item}
                  </div>
                ))}
              </div>
              {content.review_platform_url && (
                <a
                  href={content.review_platform_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-link mt-7"
                >
                  Visit Our Preferred Review Platform <ArrowRight className="h-4 w-4" />
                </a>
              )}
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
