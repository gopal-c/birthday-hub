import { NextResponse } from "next/server";

export async function GET() {
  const hasBlob = !!process.env.BLOB_READ_WRITE_TOKEN;

  if (hasBlob) {
    try {
      const { list } = await import("@vercel/blob");
      const { blobs } = await list();
      return NextResponse.json({ blob: true, blobs: blobs.map((b) => ({ pathname: b.pathname, url: b.url, size: b.size })) });
    } catch (e) {
      return NextResponse.json({ blob: true, error: String(e) }, { status: 500 });
    }
  }

  return NextResponse.json({ blob: false, message: "BLOB_READ_WRITE_TOKEN is not set — using in-memory fallback" });
}
