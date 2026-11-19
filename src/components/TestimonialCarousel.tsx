"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowLeft, ArrowRight } from "@/components/Icons";
import type { Testimonial } from "@/lib/data";

export default function TestimonialCarousel({ testimonials }: { testimonials: Testimonial[] }) {
  const [index, setIndex] = useState(0);
  if (!testimonials.length) return null;

  const perPage = 3;
  const pages = Math.ceil(testimonials.length / perPage);
  const visible = Array.from({ length: perPage }, (_, i) => testimonials[(index * perPage + i) % testimonials.length]);

  return (
    <div>
      <div className="grid gap-5 md:grid-cols-3">
        {visible.map((item, i) => (
          <article
            key={`${item.id}-${i}`}
            className="flex min-h-[320px] flex-col border border-charcoal/12 bg-ivory p-7 sm:p-9"
          >
            <div className="mb-6 font-serif text-5xl leading-none text-bronze/45">“</div>
            <p className="flex-1 text-[14px] leading-[1.9] text-charcoal/75">{item.quote}</p>
            <div className="mt-8 border-t border-charcoal/10 pt-5">
              <p className="text-[12px] font-semibold uppercase tracking-[0.14em] text-charcoal">{item.author}</p>
              {item.context && <p className="mt-1 text-[12px] text-charcoal/45">{item.context}</p>}
            </div>
          </article>
        ))}
      </div>

      <div className="mt-8 flex items-center justify-between">
        <Link href="/testimonials" className="text-link">
          Read all client words <ArrowRight className="h-4 w-4" />
        </Link>
        {pages > 1 && (
          <div className="flex items-center gap-4">
            <span className="font-sans text-xs tracking-widest text-charcoal/50">
              {String(index + 1).padStart(2, "0")} / {String(pages).padStart(2, "0")}
            </span>
            <button
              type="button"
              aria-label="Previous testimonials"
              onClick={() => setIndex((value) => (value - 1 + pages) % pages)}
              className="inline-flex h-11 w-11 items-center justify-center border border-charcoal/20 transition-colors hover:border-charcoal hover:bg-charcoal hover:text-ivory"
            >
              <ArrowLeft className="h-4 w-4" />
            </button>
            <button
              type="button"
              aria-label="Next testimonials"
              onClick={() => setIndex((value) => (value + 1) % pages)}
              className="inline-flex h-11 w-11 items-center justify-center border border-charcoal/20 transition-colors hover:border-charcoal hover:bg-charcoal hover:text-ivory"
            >
              <ArrowRight className="h-4 w-4" />
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
