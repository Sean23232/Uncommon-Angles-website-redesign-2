import { NextResponse } from "next/server";
import { isAdminRequest } from "@/lib/admin-auth";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const MAX_BYTES = 5 * 1024 * 1024;
const ALLOWED = new Set(["image/jpeg", "image/png", "image/webp", "image/gif"]);

export async function POST(request: Request) {
  if (!isAdminRequest(request)) {
    return NextResponse.json({ error: "Incorrect site management passcode." }, { status: 401 });
  }

  try {
    const form = await request.formData();
    const file = form.get("file");
    if (!(file instanceof File)) {
      return NextResponse.json({ error: "Choose an image file." }, { status: 400 });
    }
    if (!ALLOWED.has(file.type)) {
      return NextResponse.json({ error: "Please upload a JPG, PNG, WebP, or GIF image." }, { status: 400 });
    }
    if (file.size > MAX_BYTES) {
      return NextResponse.json({ error: "Images must be under 5 MB." }, { status: 400 });
    }

    const bytes = Buffer.from(await file.arrayBuffer());
    const extension = file.type === "image/jpeg" ? "jpg" : file.type.split("/")[1];
    const url = `data:${file.type};base64,${bytes.toString("base64")}`;
    return NextResponse.json({ ok: true, url, extension });
  } catch {
    return NextResponse.json({ error: "Upload failed." }, { status: 500 });
  }
}
