"use client";

import { useRef, useState } from "react";
import { IMAGE_LIBRARY } from "@/lib/site-data";

export default function ImagePicker({
  value,
  onChange,
  label = "Photograph",
  passcode,
}: {
  value: string;
  onChange: (value: string) => void;
  label?: string;
  passcode: string;
}) {
  const [options, setOptions] = useState(IMAGE_LIBRARY);
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);

  async function upload(file: File) {
    setUploading(true);
    setError("");
    try {
      const form = new FormData();
      form.append("file", file);
      const response = await fetch("/api/admin/upload", {
        method: "POST",
        headers: passcode ? { "x-admin-passcode": passcode } : {},
        body: form,
      });
      const result = await response.json();
      if (!response.ok) throw new Error(result.error || "Upload failed");
      setOptions((current) => [result.url, ...current]);
      onChange(result.url);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Upload failed");
    } finally {
      setUploading(false);
      if (inputRef.current) inputRef.current.value = "";
    }
  }

  return (
    <div>
      <span className="mb-2 block text-[10px] font-semibold uppercase tracking-[0.18em] text-charcoal/55">{label}</span>
      <div className="flex flex-col gap-3 sm:flex-row sm:items-start">
        <div className="h-24 w-32 shrink-0 overflow-hidden border border-charcoal/15 bg-stone">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          {value ? <img src={value} alt="Selected preview" className="h-full w-full object-cover" /> : null}
        </div>
        <div className="flex-1 space-y-2">
          <select value={options.includes(value) ? value : ""} onChange={(event) => onChange(event.target.value)} className="field">
            <option value="">Choose from existing project photos...</option>
            {options.map((option) => (
              <option key={option} value={option} disabled={option.startsWith("data:")}>
                {option.startsWith("data:") ? "Uploaded image (saved)" : option.replace("/images/", "").replace(".jpeg", "").replace(".png", "")}
              </option>
            ))}
          </select>
          <div className="flex flex-wrap items-center gap-3">
            <input
              ref={inputRef}
              type="file"
              accept="image/jpeg,image/png,image/webp,image/gif"
              className="block w-full max-w-xs text-xs file:mr-3 file:border-0 file:bg-charcoal file:px-4 file:py-2 file:text-[10px] file:font-semibold file:uppercase file:tracking-widest file:text-ivory"
              onChange={(event) => {
                const file = event.target.files?.[0];
                if (file) void upload(file);
              }}
            />
            {uploading && <span className="text-xs text-bronze">Uploading...</span>}
          </div>
          {error && <p className="text-xs text-red-700">{error}</p>}
          <p className="text-[11px] text-charcoal/45">Upload a JPG, PNG, or WebP (up to 5 MB). New photos are saved with the project or review.</p>
        </div>
      </div>
    </div>
  );
}
