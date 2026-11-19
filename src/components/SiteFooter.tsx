import Link from "next/link";
import { getContent } from "@/lib/data";
import { BRAND, NAV_LINKS, SERVICES } from "@/lib/site-data";
import { FacebookIcon, InstagramIcon, LinkedInIcon, MailIcon, PhoneIcon } from "@/components/Icons";

export default async function SiteFooter() {
  const content = await getContent();
  const socials = [
    { label: "Facebook", href: content.facebook_url, Icon: FacebookIcon },
    { label: "Instagram", href: content.instagram_url, Icon: InstagramIcon },
    { label: "LinkedIn", href: content.linkedin_url, Icon: LinkedInIcon },
  ].filter((item) => item.href && item.href.startsWith("http"));

  return (
    <footer className="bg-charcoal text-ivory">
      <div className="container-x py-16 lg:py-20">
        <div className="grid gap-12 border-b border-ivory/12 pb-14 lg:grid-cols-[1.5fr_1fr_1.1fr_1.2fr] lg:gap-10">
          <div>
            <div className="font-serif text-[30px] leading-none tracking-[-0.03em]">
              UnCommon<span className="text-bronze"> Angles</span>
            </div>
            <p className="mt-2 text-[8px] font-semibold uppercase tracking-[0.36em] text-ivory/50">
              Inc. · Custom Builders · Est. 1997
            </p>
            <p className="mt-7 max-w-sm text-sm leading-[1.9] text-ivory/60">
              {content.footer_description || BRAND.name}
            </p>
            <div className="mt-7 flex gap-2.5">
              {socials.map(({ label, href, Icon }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={label}
                  className="inline-flex h-10 w-10 items-center justify-center border border-ivory/20 text-ivory/70 transition-colors hover:border-bronze hover:bg-bronze hover:text-white"
                >
                  <Icon className="h-[18px] w-[18px]" />
                </a>
              ))}
            </div>
          </div>

          <div>
            <h3 className="mb-6 text-[10px] font-semibold uppercase tracking-[0.26em] text-bronze">Explore</h3>
            <ul className="space-y-3.5">
              {NAV_LINKS.map((link) => (
                <li key={link.label}>
                  <Link href={link.href} className="text-sm text-ivory/65 transition-colors hover:text-ivory">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="mb-6 text-[10px] font-semibold uppercase tracking-[0.26em] text-bronze">Services</h3>
            <ul className="space-y-3.5">
              {SERVICES.slice(0, 6).map((service) => (
                <li key={service.slug}>
                  <Link
                    href={`/services#${service.slug}`}
                    className="text-sm text-ivory/65 transition-colors hover:text-ivory"
                  >
                    {service.title}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="mb-6 text-[10px] font-semibold uppercase tracking-[0.26em] text-bronze">Get in Touch</h3>
            <div className="space-y-4 text-sm text-ivory/70">
              <a href={BRAND.phoneHref} className="flex items-start gap-3 transition-colors hover:text-ivory">
                <PhoneIcon className="mt-0.5 h-4 w-4 shrink-0 text-bronze" />
                {content.phone || BRAND.phone}
              </a>
              <a href={`mailto:${content.email || BRAND.email}`} className="flex items-start gap-3 break-all transition-colors hover:text-ivory">
                <MailIcon className="mt-0.5 h-4 w-4 shrink-0 text-bronze" />
                {content.email || BRAND.email}
              </a>
              <p className="pl-7 text-ivory/50">{BRAND.location}</p>
            </div>
            <Link href="/contact" className="mt-7 inline-flex border-b border-bronze pb-1 text-[11px] font-semibold uppercase tracking-[0.16em] text-bronze hover:text-ivory">
              Request a consultation →
            </Link>
          </div>
        </div>

        <div className="flex flex-col gap-4 pt-8 text-[11px] tracking-wide text-ivory/40 sm:flex-row sm:items-center sm:justify-between">
          <p>© {new Date().getFullYear()} UnCommon Angles, Inc. All rights reserved.</p>
          <div className="flex flex-wrap items-center gap-5">
            <Link href="/projects" className="transition-colors hover:text-ivory">Project Archive</Link>
            <Link href="/testimonials" className="transition-colors hover:text-ivory">Client Words</Link>
            <Link href="/admin" className="transition-colors hover:text-ivory">Site Management</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
