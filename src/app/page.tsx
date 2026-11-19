import Link from "next/link";
import Photo from "@/components/Photo";
import ProjectCard from "@/components/ProjectCard";
import TestimonialCarousel from "@/components/TestimonialCarousel";
import {
  ArrowRight,
  CheckIcon,
  ClockIcon,
  HammerIcon,
  HandshakeIcon,
  InstagramIcon,
  FacebookIcon,
  LinkedInIcon,
  ShieldIcon,
} from "@/components/Icons";
import { getContent, getFeaturedProjects, getTestimonials } from "@/lib/data";
import { BRAND, SERVICES } from "@/lib/site-data";

export const dynamic = "force-dynamic";

const values = [
  {
    Icon: ClockIcon,
    title: "Experience Since 1997",
    text: "Decades of hands-on construction experience, and a crew whose combined experience spans 90 years.",
  },
  {
    Icon: ShieldIcon,
    title: "Quality Craftsmanship",
    text: "Attention to detail in every phase — from the foundation and framing to the final interior finish.",
  },
  {
    Icon: HandshakeIcon,
    title: "Personalized Approach",
    text: "Every project is shaped around the client's ideas, needs, budget, and the place it will call home.",
  },
  {
    Icon: HammerIcon,
    title: "Dependable Service",
    text: "Professional workmanship and reliable communication, whether we start the job or help finish it.",
  },
];

export default async function HomePage() {
  const [content, projects, testimonials] = await Promise.all([
    getContent(),
    getFeaturedProjects(6),
    getTestimonials(true),
  ]);

  const socials = [
    { label: "Facebook", href: content.facebook_url, Icon: FacebookIcon },
    { label: "Instagram", href: content.instagram_url, Icon: InstagramIcon },
    { label: "LinkedIn", href: content.linkedin_url, Icon: LinkedInIcon },
  ].filter((item) => item.href && item.href.startsWith("http"));

  return (
    <>
      {/* 01 — Hero */}
      <section className="relative flex min-h-[92svh] items-end overflow-hidden bg-charcoal">
        <div className="absolute inset-0 photo-zoom">
          <Photo
            src="/images/img_sl_9.png"
            alt="UnCommon Angles custom home with a mountain-view deck in Colorado"
            sizes="100vw"
            priority
          />
        </div>
        <div className="absolute inset-0 bg-gradient-to-r from-charcoal/90 via-charcoal/60 to-charcoal/25" />
        <div className="absolute inset-0 bg-gradient-to-t from-charcoal/85 via-transparent to-charcoal/35" />

        <div className="container-x relative z-10 pb-20 pt-40 sm:pb-24 lg:pb-28">
          <div className="max-w-4xl">
            <div className="mb-7 flex items-center gap-4 text-ivory/80">
              <span className="h-px w-10 bg-bronze" />
              <p className="text-[10px] font-semibold uppercase tracking-[0.32em]">
                Buena Vista, Colorado · Since 1997
              </p>
            </div>
            <h1 className="display text-[clamp(3.4rem,8vw,7.6rem)] text-ivory">
              {content.hero_headline || "Built With Purpose. Crafted to Last."}
            </h1>
            <p className="mt-8 max-w-2xl text-[15px] leading-[1.9] text-ivory/80 sm:text-lg">
              {content.hero_text}
            </p>
            <div className="mt-10 flex flex-wrap items-center gap-3.5">
              <Link href="/projects" className="btn-primary">
                Explore Our Projects <ArrowRight className="h-4 w-4" />
              </Link>
              <Link href="/contact" className="btn-outline">
                Discuss Your Project <ArrowUpRightIcon />
              </Link>
            </div>
          </div>
        </div>
      </section>

      <div className="border-y border-charcoal/10 bg-ivory">
        <div className="container-x flex flex-col gap-4 py-5 text-[10px] font-medium uppercase tracking-[0.2em] text-charcoal/60 sm:flex-row sm:items-center sm:justify-between">
          <span>Custom Homes</span>
          <span className="hidden h-1 w-1 rounded-full bg-bronze sm:block" />
          <span>Structural Construction</span>
          <span className="hidden h-1 w-1 rounded-full bg-bronze sm:block" />
          <span>Carpentry &amp; Roofing</span>
          <span className="hidden h-1 w-1 rounded-full bg-bronze sm:block" />
          <span>Concrete Work</span>
          <span className="hidden h-1 w-1 rounded-full bg-bronze sm:block" />
          <span>Residential &amp; Commercial</span>
        </div>
      </div>

      {/* 02 — Introduction */}
      <section className="section-pad">
        <div className="container-x grid items-center gap-14 lg:grid-cols-[1fr_0.92fr] lg:gap-24">
          <div className="max-w-2xl">
            <p className="eyebrow">01 / About the Company</p>
            <h2 className="display mt-5 text-[clamp(2.8rem,5.2vw,5.2rem)]">
              Craftsmanship Rooted <br className="hidden sm:block" /> in Experience.
            </h2>
            <div className="mt-8 h-px w-20 bg-bronze" />
            <p className="body-copy mt-8">{content.about_story}</p>
            <p className="body-copy mt-5">
              Matched with an expert crew of 90 years in combined experience, Matt's mission is to bring an honest,
              dependable approach to every job — no matter the size, style, or budget.
            </p>
            <div className="mt-10 flex flex-wrap gap-x-14 gap-y-7">
              <div>
                <p className="font-serif text-5xl text-charcoal">1997</p>
                <p className="mt-1 text-[10px] font-semibold uppercase tracking-[0.2em] text-charcoal/45">
                  Founded in Buena Vista
                </p>
              </div>
              <div>
                <p className="font-serif text-5xl text-charcoal">90</p>
                <p className="mt-1 text-[10px] font-semibold uppercase tracking-[0.2em] text-charcoal/45">
                  Years of combined crew experience
                </p>
              </div>
            </div>
            <Link href="/about" className="text-link mt-11">
              More about Matt &amp; the company <ArrowRight className="h-4 w-4" />
            </Link>
          </div>

          <div className="relative">
            <div className="photo-zoom relative aspect-[4/5] w-full bg-stone">
              <Photo src="/images/img_sl_8.png" alt="Completed custom home with natural stone and timber detailing" sizes="(max-width: 1024px) 100vw, 45vw" />
            </div>
            <div className="photo-zoom absolute -bottom-8 -left-4 aspect-[4/3] w-[48%] border-8 border-ivory bg-stone sm:-left-10 sm:w-[45%]">
              <Photo src="/images/img_sl_2.png" alt="Custom interior carpentry with sliding barn doors and built-in shelving" sizes="(max-width: 1024px) 50vw, 22vw" />
            </div>
            <div className="absolute -right-3 -top-5 hidden border border-charcoal/10 bg-ivory px-5 py-4 sm:block">
              <p className="font-serif text-2xl italic text-forest">“Honest, dependable construction.”</p>
            </div>
          </div>
        </div>
      </section>

      {/* 03 — Services */}
      <section className="section-pad border-t border-charcoal/10 bg-[#eeebe3]">
        <div className="container-x">
          <div className="flex flex-col justify-between gap-7 md:flex-row md:items-end">
            <div className="max-w-2xl">
              <p className="eyebrow">02 / What We Do</p>
              <h2 className="display mt-5 text-[clamp(2.8rem,5vw,5rem)]">
                Construction Expertise <br className="hidden sm:block" /> From the Ground Up.
              </h2>
            </div>
            <p className="max-w-md text-sm leading-[1.9] text-charcoal/65">
              A structure and carpentry subcontractor working primarily with general contractors and homeowners —
              starting the job or helping bring it back on schedule.
            </p>
          </div>

          <div className="mt-14 grid gap-x-7 gap-y-12 sm:grid-cols-2 lg:grid-cols-3">
            {SERVICES.map((service, index) => (
              <Link key={service.slug} href={`/services#${service.slug}`} className="group block">
                <div className="photo-zoom relative aspect-[4/3] w-full bg-stone">
                  <Photo src={service.image} alt={service.alt} sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw" />
                  <span className="absolute bottom-0 left-0 bg-ivory/95 px-3 py-2 text-[10px] font-semibold tracking-[0.15em] text-charcoal">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                </div>
                <div className="mt-5 flex items-start justify-between gap-4 border-b border-charcoal/12 pb-5">
                  <div>
                    <h3 className="font-serif text-[27px] leading-tight text-charcoal transition-colors group-hover:text-bronze">
                      {service.title}
                    </h3>
                    <p className="mt-2.5 max-w-sm text-[13px] leading-[1.8] text-charcoal/60">{service.description}</p>
                  </div>
                  <ArrowRight className="mt-1.5 h-5 w-5 shrink-0 text-charcoal/30 transition-all group-hover:translate-x-1 group-hover:text-bronze" />
                </div>
              </Link>
            ))}
          </div>
          <Link href="/services" className="btn-primary mt-14">
            All Services <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </section>

      {/* 04 — Featured projects */}
      <section className="section-pad">
        <div className="container-x">
          <div className="flex flex-col justify-between gap-7 md:flex-row md:items-end">
            <div>
              <p className="eyebrow">03 / Selected Work</p>
              <h2 className="display mt-5 text-[clamp(2.8rem,5vw,5rem)]">A Look at What We’ve Built.</h2>
            </div>
            <Link href="/projects" className="text-link pb-2">
              Explore All Projects <ArrowRight className="h-4 w-4" />
            </Link>
          </div>

          <div className="mt-14 grid gap-x-7 gap-y-14 sm:grid-cols-2 lg:grid-cols-3">
            {projects.map((project, index) => (
              <div key={project.id} className={index === 0 ? "sm:col-span-2 sm:row-span-1" : ""}>
                <ProjectCard
                  project={project}
                  aspect={index === 0 ? "aspect-[16/10] sm:aspect-[16/10]" : "aspect-[4/3]"}
                  priority={index === 0}
                />
              </div>
            ))}
          </div>

          <div className="mt-16 flex justify-center">
            <Link href="/projects" className="btn-primary">
              View the Complete Archive <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* 05 — Why choose us */}
      <section className="section-pad bg-charcoal text-ivory">
        <div className="container-x">
          <div className="max-w-3xl">
            <p className="eyebrow">04 / Why UnCommon Angles</p>
            <h2 className="display mt-5 text-[clamp(2.8rem,5vw,5rem)] text-ivory">
              Built on Trust. <br className="hidden sm:block" /> Defined by Quality.
            </h2>
            <p className="mt-7 max-w-xl text-sm leading-[1.9] text-ivory/60">
              A company founded on a simple idea: an honest, dependable builder who takes pride in the work — and in
              the relationships built along the way.
            </p>
          </div>

          <div className="mt-16 grid gap-px bg-ivory/12 sm:grid-cols-2 lg:grid-cols-4">
            {values.map(({ Icon, title, text }, index) => (
              <div key={title} className="bg-charcoal p-8 py-10 lg:p-9 lg:py-12">
                <div className="flex items-center justify-between">
                  <Icon className="h-9 w-9 text-bronze" />
                  <span className="text-[10px] tracking-widest text-ivory/25">0{index + 1}</span>
                </div>
                <h3 className="mt-9 font-serif text-[27px] leading-tight">{title}</h3>
                <p className="mt-4 text-[13px] leading-[1.85] text-ivory/55">{text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 06 — Testimonials */}
      <section className="section-pad">
        <div className="container-x">
          <div className="flex flex-col justify-between gap-6 md:flex-row md:items-end">
            <div className="max-w-2xl">
              <p className="eyebrow">05 / Client Words</p>
              <h2 className="display mt-5 text-[clamp(2.8rem,5vw,5rem)]">
                The Relationships <br className="hidden sm:block" /> Behind Every Build.
              </h2>
            </div>
            <p className="max-w-sm text-sm leading-[1.9] text-charcoal/60">
              Feedback from the homeowners, contractors, and partners we have worked with over the years.
            </p>
          </div>
          <div className="mt-14">
            <TestimonialCarousel testimonials={testimonials.slice(0, 9)} />
          </div>
        </div>
      </section>

      {/* Social presence */}
      <section className="border-y border-charcoal/10 bg-[#eeebe3] py-16 lg:py-20">
        <div className="container-x grid gap-10 lg:grid-cols-[1fr_1.4fr] lg:items-center">
          <div>
            <p className="eyebrow">06 / Stay Connected</p>
            <h2 className="display mt-4 text-[clamp(2.2rem,3.6vw,3.6rem)]">The Same Brand, Everywhere.</h2>
            <p className="body-copy mt-4 max-w-lg">
              Follow along for project photography and updates from the team. Have a build of your own? Every project
              photo on this site can be shared directly from its detail page.
            </p>
          </div>
          <div className="grid gap-3 sm:grid-cols-3">
            {socials.map(({ label, href, Icon }) => (
              <a
                key={label}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                className="group flex items-center justify-between border border-charcoal/12 bg-ivory p-5 transition-colors hover:border-bronze"
              >
                <span className="flex items-center gap-3">
                  <Icon className="h-5 w-5 text-bronze" />
                  <span className="font-serif text-2xl">{label}</span>
                </span>
                <ArrowRight className="h-4 w-4 text-charcoal/35 transition-transform group-hover:translate-x-1 group-hover:text-bronze" />
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* 07 — CTA */}
      <section className="relative flex min-h-[68svh] items-center justify-center overflow-hidden bg-charcoal">
        <div className="absolute inset-0 photo-zoom">
          <Photo src="/images/Third-right.jpeg" alt="Custom kitchen and interior carpentry by UnCommon Angles" sizes="100vw" />
        </div>
        <div className="absolute inset-0 bg-charcoal/72" />
        <div className="container-x relative z-10 py-24 text-center">
          <p className="text-[10px] font-semibold uppercase tracking-[0.32em] text-bronze">Let’s Talk About Your Project</p>
          <h2 className="display mx-auto mt-6 max-w-4xl text-[clamp(2.7rem,6vw,5.6rem)] text-ivory">
            {content.cta_headline}
          </h2>
          <p className="mx-auto mt-7 max-w-2xl text-[15px] leading-[1.9] text-ivory/75">{content.cta_text}</p>
          <div className="mt-10 flex flex-wrap items-center justify-center gap-3.5">
            <Link href="/contact" className="bg-bronze px-7 py-4 text-[11px] font-semibold uppercase tracking-[0.18em] text-white transition-colors hover:bg-[#8f6d49]">
              Contact UnCommon Angles <ArrowRight className="inline h-4 w-4" />
            </Link>
            <a href={BRAND.phoneHref} className="btn-outline">
              Call {BRAND.phone}
            </a>
          </div>
          <div className="mt-10 flex items-center justify-center gap-2 text-[11px] uppercase tracking-[0.18em] text-ivory/50">
            <CheckIcon className="h-4 w-4 text-bronze" /> Buena Vista, Colorado · Serving the surrounding region
          </div>
        </div>
      </section>
    </>
  );
}

function ArrowUpRightIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="h-4 w-4">
      <path d="M7 17 17 7M8 7h9v9" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}
