"use client";

import { useState, type FormEvent } from "react";
import { ArrowRight, CheckIcon } from "@/components/Icons";
import { SERVICES } from "@/lib/site-data";

type Status = "idle" | "sending" | "success" | "error";

export default function ContactForm() {
  const [status, setStatus] = useState<Status>("idle");
  const [error, setError] = useState("");

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (status === "sending") return;
    const form = event.currentTarget;
    const data = new FormData(form);
    setStatus("sending");
    setError("");

    try {
      const response = await fetch("/api/inquiries", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: data.get("name"),
          email: data.get("email"),
          phone: data.get("phone"),
          projectType: data.get("projectType"),
          message: data.get("message"),
          website: data.get("website"),
        }),
      });
      const result = await response.json();
      if (!response.ok) throw new Error(result.error || "Something went wrong. Please try again.");
      form.reset();
      setStatus("success");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Unable to send your message.");
      setStatus("error");
    }
  }

  if (status === "success") {
    return (
      <div className="border border-forest/30 bg-forest/5 p-10">
        <CheckIcon className="h-10 w-10 text-forest" />
        <h3 className="display mt-6 text-4xl">Thank you for reaching out.</h3>
        <p className="body-copy mt-4">
          Your inquiry has been received. Matt will review the details and get back to you as soon as possible.
        </p>
        <button type="button" onClick={() => setStatus("idle")} className="text-link mt-7">
          Send another inquiry <ArrowRight className="h-4 w-4" />
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      <div className="grid gap-5 sm:grid-cols-2">
        <div>
          <label htmlFor="name" className="mb-2 block text-[10px] font-semibold uppercase tracking-[0.2em] text-charcoal/60">
            Full Name *
          </label>
          <input id="name" name="name" required maxLength={100} autoComplete="name" className="field" placeholder="Your name" />
        </div>
        <div>
          <label htmlFor="email" className="mb-2 block text-[10px] font-semibold uppercase tracking-[0.2em] text-charcoal/60">
            Email Address *
          </label>
          <input id="email" name="email" type="email" required maxLength={200} autoComplete="email" className="field" placeholder="you@example.com" />
        </div>
      </div>
      <div className="grid gap-5 sm:grid-cols-2">
        <div>
          <label htmlFor="phone" className="mb-2 block text-[10px] font-semibold uppercase tracking-[0.2em] text-charcoal/60">
            Phone Number
          </label>
          <input id="phone" name="phone" type="tel" maxLength={40} autoComplete="tel" className="field" placeholder="719-000-0000" />
        </div>
        <div>
          <label htmlFor="projectType" className="mb-2 block text-[10px] font-semibold uppercase tracking-[0.2em] text-charcoal/60">
            Project Type
          </label>
          <select id="projectType" name="projectType" className="field" defaultValue="">
            <option value="">Select a project type</option>
            {SERVICES.map((service) => (
              <option key={service.slug} value={service.title}>
                {service.title}
              </option>
            ))}
            <option value="Other / General Inquiry">Other / General Inquiry</option>
          </select>
        </div>
      </div>
      <div>
        <label htmlFor="message" className="mb-2 block text-[10px] font-semibold uppercase tracking-[0.2em] text-charcoal/60">
          Tell Us About Your Project *
        </label>
        <textarea id="message" name="message" required maxLength={5000} rows={6} className="field resize-y" placeholder="A few details about what you have in mind, your timeline, and your location..." />
      </div>
      <div className="hidden" aria-hidden="true">
        <label htmlFor="website">Leave this field empty</label>
        <input id="website" name="website" tabIndex={-1} autoComplete="off" />
      </div>
      {status === "error" && <p className="text-sm text-red-700" role="alert">{error}</p>}
      <button type="submit" disabled={status === "sending"} className="btn-primary w-full disabled:cursor-not-allowed disabled:opacity-60 sm:w-auto">
        {status === "sending" ? "Sending Inquiry..." : "Send Inquiry"}<ArrowRight className="h-4 w-4" />
      </button>
      <p className="text-[11px] leading-relaxed text-charcoal/45">
        Your information is used only to respond to your inquiry. No third-party marketing, no spam.
      </p>
    </form>
  );
}
