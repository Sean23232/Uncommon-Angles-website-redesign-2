import type { Metadata } from "next";
import ContactForm from "@/components/ContactForm";
import { FacebookIcon, InstagramIcon, LinkedInIcon, MailIcon, PhoneIcon } from "@/components/Icons";
import { getContent } from "@/lib/data";
import { BRAND } from "@/lib/site-data";

export const metadata: Metadata = {
  title: "Contact",
  description:
    "Discuss a custom home or construction project with UnCommon Angles in Buena Vista, Colorado. Call 719-395-6777 or email matt@uncommonangles.com.",
};

export const dynamic = "force-dynamic";

export default async function ContactPage() {
  const content = await getContent();
  const socials = [
    { label: "Facebook", href: content.facebook_url, Icon: FacebookIcon },
    { label: "Instagram", href: content.instagram_url, Icon: InstagramIcon },
    { label: "LinkedIn", href: content.linkedin_url, Icon: LinkedInIcon },
  ].filter((item) => item.href && item.href.startsWith("http"));

  return (
    <>
      <section className="relative overflow-hidden bg-charcoal pt-32 text-ivory lg:pt-40">
        <div className="container-x relative z-10 pb-14">
          <p className="text-[10px] font-semibold uppercase tracking-[0.32em] text-bronze">Contact Us</p>
          <h1 className="display mt-5 max-w-4xl text-[clamp(3.2rem,7vw,6.4rem)]">Let’s Talk About Your Project.</h1>
          <p className="mt-6 max-w-2xl text-[15px] leading-[1.9] text-ivory/70">
            Whether you're planning a custom home or need experienced construction support, we'd be happy to discuss
            what you have in mind.
          </p>
        </div>
        <div className="absolute -right-24 top-0 h-72 w-72 rounded-full bg-forest/30 blur-3xl" />
      </section>

      <section className="section-pad">
        <div className="container-x grid gap-16 lg:grid-cols-[1fr_0.75fr] lg:gap-24">
          <div>
            <p className="eyebrow">Project Inquiry</p>
            <h2 className="display mt-5 text-[clamp(2.5rem,4vw,4rem)]">Tell Us What You’re Building.</h2>
            <div className="mt-10 max-w-2xl">
              <ContactForm />
            </div>
          </div>

          <aside className="space-y-8">
            <div className="border border-charcoal/12 bg-[#eeebe3]/60 p-8 sm:p-10">
              <p className="eyebrow">Direct Contact</p>
              <h3 className="display mt-4 text-3xl">Reach Matt Directly</h3>
              <div className="mt-8 space-y-6">
                <a href={BRAND.phoneHref} className="group flex items-start gap-4">
                  <span className="flex h-11 w-11 shrink-0 items-center justify-center bg-charcoal text-ivory transition-colors group-hover:bg-bronze">
                    <PhoneIcon className="h-5 w-5" />
                  </span>
                  <span>
                    <span className="block text-[10px] font-semibold uppercase tracking-[0.2em] text-charcoal/45">Call</span>
                    <span className="mt-1 block font-serif text-2xl text-charcoal group-hover:text-bronze">{content.phone || BRAND.phone}</span>
                  </span>
                </a>
                <a href={`mailto:${content.email || BRAND.email}`} className="group flex items-start gap-4">
                  <span className="flex h-11 w-11 shrink-0 items-center justify-center bg-charcoal text-ivory transition-colors group-hover:bg-bronze">
                    <MailIcon className="h-5 w-5" />
                  </span>
                  <span>
                    <span className="block text-[10px] font-semibold uppercase tracking-[0.2em] text-charcoal/45">Email</span>
                    <span className="mt-1 block break-all font-serif text-xl text-charcoal group-hover:text-bronze">{content.email || BRAND.email}</span>
                  </span>
                </a>
              </div>
            </div>

            <div className="border border-charcoal/12 p-8 sm:p-10">
              <p className="eyebrow">Based In</p>
              <h3 className="display mt-4 text-3xl">Buena Vista, Colorado.</h3>
              <p className="mt-4 text-sm leading-[1.85] text-charcoal/60">
                Building custom homes and providing structural construction support throughout the surrounding
                mountain region since 1997.
              </p>
            </div>

            {socials.length > 0 && (
              <div>
                <p className="eyebrow">Follow Along</p>
                <div className="mt-5 flex flex-wrap gap-3">
                  {socials.map(({ label, href, Icon }) => (
                    <a
                      key={label}
                      href={href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2.5 border border-charcoal/20 px-4 py-3 text-[11px] font-semibold uppercase tracking-[0.12em] transition-colors hover:border-bronze hover:text-bronze"
                    >
                      <Icon className="h-4 w-4" /> {label}
                    </a>
                  ))}
                </div>
              </div>
            )}
          </aside>
        </div>
      </section>
    </>
  );
}
