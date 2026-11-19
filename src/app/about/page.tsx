import type { Metadata } from "next";
import Link from "next/link";
import Photo from "@/components/Photo";
import { ArrowRight, CheckIcon } from "@/components/Icons";
import { getContent } from "@/lib/data";
import { BRAND } from "@/lib/site-data";

export const metadata: Metadata = {
  title: "About Us",
  description:
    "The story of UnCommon Angles: founded in Buena Vista, Colorado by Matt Young in 1997, built on honest service and quality craftsmanship.",
};

export const dynamic = "force-dynamic";

export default async function AboutPage() {
  const content = await getContent();

  return (
    <>
      <section className="relative flex min-h-[62svh] items-end overflow-hidden bg-charcoal">
        <div className="absolute inset-0 photo-zoom">
          <Photo src="/images/img_sl_8.png" alt="Custom home with stone and timber detailing built in Colorado" sizes="100vw" priority />
        </div>
        <div className="absolute inset-0 bg-gradient-to-r from-charcoal/90 via-charcoal/55 to-charcoal/20" />
        <div className="absolute inset-0 bg-gradient-to-t from-charcoal/70 to-transparent" />
        <div className="container-x relative z-10 pb-16 pt-40 lg:pb-20">
          <p className="text-[10px] font-semibold uppercase tracking-[0.32em] text-bronze">About UnCommon Angles</p>
          <h1 className="display mt-5 max-w-4xl text-[clamp(3.2rem,7vw,6.4rem)] text-ivory">
            It All Started in Buena Vista.
          </h1>
          <p className="mt-6 max-w-2xl text-[15px] leading-[1.9] text-ivory/75">
            A local builder with a simple conviction: an honest, dependable construction company makes all the
            difference in how a home — and a relationship — turns out.
          </p>
        </div>
      </section>

      <section className="section-pad">
        <div className="container-x grid gap-16 lg:grid-cols-[0.9fr_1.1fr] lg:gap-24">
          <div className="relative">
            <div className="photo-zoom relative aspect-[4/5] bg-stone">
              <Photo src="/images/First-on-the-right.jpeg" alt="Custom home exterior from the UnCommon Angles project archive" sizes="(max-width: 1024px) 100vw, 45vw" />
            </div>
            <div className="photo-zoom absolute -bottom-10 -right-2 aspect-[4/3] w-[52%] border-8 border-ivory bg-stone sm:-right-8">
              <Photo src="/images/img_sl_7.png" alt="Home framing and structural construction in progress" sizes="(max-width: 1024px) 50vw, 25vw" />
            </div>
          </div>
          <div className="max-w-2xl">
            <p className="eyebrow">Matt Young · Founder</p>
            <h2 className="display mt-5 text-[clamp(2.6rem,4.5vw,4.6rem)]">A Builder’s Story, Rooted in Place.</h2>
            <div className="mt-8 h-px w-20 bg-bronze" />
            <p className="body-copy mt-8">{content.about_story}</p>
            <p className="body-copy mt-5">
              Over the years, we have provided quality construction services to meet the needs of homeowners and
              general contractors. We welcome jobs of any size and work with each client to create a home that fits
              their vision and their budget.
            </p>
            <p className="body-copy mt-5">
              Our crew brings 90 years of combined experience to every jobsite. Whether we start a build or step in to
              finish one and get it back on schedule, the approach is the same: do the work right, communicate clearly,
              and stand behind it.
            </p>
            <div className="mt-10 space-y-3">
              {[
                "Founded in Buena Vista, Colorado in 1997",
                "Custom homes from initial concept through finish work",
                "Structure and carpentry subcontracting for general contractors",
                "Residential and commercial construction support",
              ].map((item) => (
                <div key={item} className="flex items-start gap-3 text-sm text-charcoal/75">
                  <CheckIcon className="mt-0.5 h-4 w-4 shrink-0 text-bronze" />
                  {item}
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="border-y border-charcoal/10 bg-[#eeebe3] py-20 lg:py-28">
        <div className="container-x">
          <div className="max-w-2xl">
            <p className="eyebrow">Our Philosophy</p>
            <h2 className="display mt-5 text-[clamp(2.6rem,4.8vw,4.8rem)]">
              The Details Are the Whole Difference.
            </h2>
            <p className="body-copy mt-7">
              A dependable build starts long before the finished surfaces. It starts with a foundation poured
              correctly, framing that is straight and true, a roof detailed to last, and a crew that respects both the
              plan and the people who will live with the result.
            </p>
          </div>
          <div className="mt-14 grid gap-10 md:grid-cols-3">
            {[
              {
                year: "1997",
                title: "A Local Beginning",
                text: "Matt Young, a native of Buena Vista, sees the need for an honest, dependable construction company and opens UnCommon Angles.",
              },
              {
                year: "90 Years",
                title: "Combined Experience",
                text: "An expert crew brings decades of combined trade knowledge to residential and commercial jobs across the region.",
              },
              {
                year: "Today",
                title: "Built on Relationships",
                text: "From log homes to contemporary houses and commercial work, each project is guided by the same standard of craftsmanship and service.",
              },
            ].map((item) => (
              <div key={item.year} className="border-t border-charcoal/20 pt-7">
                <p className="font-serif text-4xl text-bronze">{item.year}</p>
                <h3 className="mt-4 font-serif text-2xl">{item.title}</h3>
                <p className="mt-3 text-[13px] leading-[1.85] text-charcoal/60">{item.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section-pad">
        <div className="container-x grid items-center gap-12 lg:grid-cols-[1.1fr_0.9fr] lg:gap-20">
          <div className="photo-zoom relative aspect-[16/10] bg-stone">
            <Photo src="/images/Project-3.jpeg" alt="Contemporary custom home built in a Colorado mountain setting" sizes="(max-width: 1024px) 100vw, 55vw" />
          </div>
          <div>
            <p className="eyebrow">Work With Us</p>
            <h2 className="display mt-5 text-[clamp(2.6rem,4.5vw,4.4rem)]">Let’s Build Something Worth Keeping.</h2>
            <p className="body-copy mt-6">
              Tell us what you have in mind. We would be glad to talk through your plans, answer questions, and discuss
              how our team can help.
            </p>
            <div className="mt-9 flex flex-wrap gap-3">
              <Link href="/contact" className="btn-primary">
                Contact {BRAND.founder} <ArrowRight className="h-4 w-4" />
              </Link>
              <Link href="/projects" className="btn-outline border-charcoal/20 text-charcoal hover:bg-charcoal hover:text-ivory">
                See Our Work
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
