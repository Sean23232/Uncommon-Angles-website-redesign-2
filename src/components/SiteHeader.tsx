"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { BRAND, NAV_LINKS } from "@/lib/site-data";
import { CloseIcon, MenuIcon, PhoneIcon } from "@/components/Icons";

export function Logo({ light = false, compact = false }: { light?: boolean; compact?: boolean }) {
  return (
    <Link href="/" className="group inline-flex flex-col leading-none" aria-label={`${BRAND.name} home`}>
      <span
        className={`font-serif text-[23px] tracking-[-0.03em] transition-colors sm:text-[26px] ${light ? "text-ivory" : "text-charcoal"} group-hover:text-bronze`}
      >
        UnCommon<span className="text-bronze"> Angles</span>
      </span>
      {!compact && (
        <span
          className={`mt-1.5 text-[8px] font-semibold uppercase tracking-[0.36em] ${light ? "text-ivory/60" : "text-charcoal/50"}`}
        >
          Builders · Est. 1997
        </span>
      )}
    </Link>
  );
}

export default function SiteHeader() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const isHome = pathname === "/";

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  const transparent = isHome && !scrolled && !open;

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-500 ${
        transparent
          ? "bg-gradient-to-b from-charcoal/60 to-transparent"
          : "border-b border-charcoal/10 bg-ivory/95 shadow-[0_1px_20px_rgba(32,37,34,0.05)] backdrop-blur-md"
      }`}
    >
      <div className="container-x flex h-[78px] items-center justify-between gap-6 lg:h-[92px]">
        <div className={transparent ? "" : ""}>
          <Logo light={transparent} />
        </div>

        <nav className="hidden items-center gap-7 lg:flex xl:gap-9" aria-label="Primary navigation">
          {NAV_LINKS.map((link) => {
            const active = pathname === link.href;
            return (
              <Link
                key={link.label}
                href={link.href}
                className={`relative py-2 text-[12px] font-medium uppercase tracking-[0.14em] transition-colors ${
                  transparent ? "text-ivory/85 hover:text-ivory" : "text-charcoal/70 hover:text-charcoal"
                } ${active ? "text-bronze!" : ""}`}
              >
                {link.label}
                {active && <span className="absolute -bottom-0.5 left-0 h-px w-full bg-bronze" />}
              </Link>
            );
          })}
        </nav>

        <div className="flex items-center gap-3">
          <a
            href={BRAND.phoneHref}
            className={`hidden items-center gap-2 text-[12px] font-medium tracking-[0.06em] transition-colors xl:inline-flex ${
              transparent ? "text-ivory hover:text-bronze" : "text-charcoal hover:text-bronze"
            }`}
          >
            <PhoneIcon className="h-4 w-4" />
            {BRAND.phone}
          </a>
          <Link
            href="/contact"
            className={`hidden px-5 py-3 text-[11px] font-semibold uppercase tracking-[0.16em] transition-colors lg:inline-flex ${
              transparent
                ? "bg-ivory text-charcoal hover:bg-bronze hover:text-white"
                : "bg-charcoal text-ivory hover:bg-forest"
            }`}
          >
            Start a Project
          </Link>
          <button
            type="button"
            onClick={() => setOpen((value) => !value)}
            aria-label={open ? "Close menu" : "Open menu"}
            aria-expanded={open}
            className={`inline-flex h-11 w-11 items-center justify-center border transition-colors lg:hidden ${
              transparent ? "border-ivory/40 text-ivory" : "border-charcoal/15 text-charcoal"
            }`}
          >
            {open ? <CloseIcon className="h-5 w-5" /> : <MenuIcon className="h-5 w-5" />}
          </button>
        </div>
      </div>

      {open && (
        <nav className="fixed inset-x-0 top-[78px] bottom-0 overflow-y-auto bg-charcoal px-6 pb-12 pt-8 lg:hidden" aria-label="Mobile navigation">
          <div className="mx-auto flex h-full max-w-lg flex-col">
            <p className="mb-6 text-[10px] font-semibold uppercase tracking-[0.3em] text-bronze">Navigate</p>
            {NAV_LINKS.map((link, index) => (
              <Link
                key={link.label}
                href={link.href}
                className="flex items-center justify-between border-b border-ivory/10 py-4 font-serif text-4xl text-ivory"
              >
                {link.label}
                <span className="font-sans text-[11px] tracking-widest text-bronze">0{index + 1}</span>
              </Link>
            ))}
            <div className="mt-10 flex flex-col gap-3">
              <Link href="/contact" className="btn-bronze justify-center">
                Discuss Your Project
              </Link>
              <a href={BRAND.phoneHref} className="btn-outline justify-center">
                <PhoneIcon className="h-4 w-4" /> {BRAND.phone}
              </a>
            </div>
          </div>
        </nav>
      )}
    </header>
  );
}
