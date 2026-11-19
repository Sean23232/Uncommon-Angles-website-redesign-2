import { NextResponse } from "next/server";
import { db } from "@/db";
import { inquiries } from "@/db/schema";

export const runtime = "nodejs";

const recentRequests = new Map<string, number[]>();

function isAllowed(ip: string) {
  const now = Date.now();
  const times = (recentRequests.get(ip) ?? []).filter((time) => now - time < 60_000);
  if (times.length >= 5) {
    recentRequests.set(ip, times);
    return false;
  }
  times.push(now);
  recentRequests.set(ip, times);
  return true;
}

export async function POST(request: Request) {
  try {
    const ip = request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() || "unknown";
    if (!isAllowed(ip)) {
      return NextResponse.json({ error: "Too many requests. Please try again in a minute." }, { status: 429 });
    }

    const body = await request.json();
    if (typeof body.website === "string" && body.website.trim()) {
      return NextResponse.json({ ok: true });
    }

    const name = typeof body.name === "string" ? body.name.trim() : "";
    const email = typeof body.email === "string" ? body.email.trim() : "";
    const phone = typeof body.phone === "string" ? body.phone.trim() : "";
    const projectType = typeof body.projectType === "string" ? body.projectType.trim() : "";
    const message = typeof body.message === "string" ? body.message.trim() : "";

    if (!name || name.length > 100 || !email || email.length > 200 || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email) || !message || message.length > 5000) {
      return NextResponse.json({ error: "Please complete all required fields with valid information." }, { status: 400 });
    }

    await db.insert(inquiries).values({ name, email, phone, projectType, message });

    return NextResponse.json({ ok: true });
  } catch {
    return NextResponse.json({ error: "Unable to send your inquiry right now. Please email matt@uncommonangles.com." }, { status: 500 });
  }
}
