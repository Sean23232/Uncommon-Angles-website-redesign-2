"use client";

import { useState } from "react";
import { ShareIcon } from "@/components/Icons";

export default function ShareButtons({ title }: { title: string }) {
  const [copied, setCopied] = useState(false);

  const share = async () => {
    const url = typeof window !== "undefined" ? window.location.href : "";
    if (navigator.share) {
      try {
        await navigator.share({ title, text: `A project by UnCommon Angles: ${title}`, url });
        return;
      } catch {
        // User dismissed the native share sheet.
      }
    }
    if (navigator.clipboard) {
      await navigator.clipboard.writeText(url);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 2200);
    }
  };

  return (
    <button
      type="button"
      onClick={share}
      className="inline-flex items-center gap-2.5 border border-charcoal/20 px-4 py-3 text-[11px] font-semibold uppercase tracking-[0.14em] text-charcoal transition-colors hover:border-bronze hover:text-bronze"
      aria-label="Share this project"
    >
      <ShareIcon className="h-4 w-4" />
      {copied ? "Link copied" : "Share project"}
    </button>
  );
}
