import { NextResponse } from "next/server";

export async function GET() {
  const token = process.env.BLOB_READ_WRITE_TOKEN;
  if (!token) {
    return NextResponse.json({ blob: false, message: "BLOB_READ_WRITE_TOKEN is not set" });
  }

  const storeId = token.match(/^vercel_blob_rw_([^_]+)_/)?.[1] ?? "unknown";

  try {
    const { put, list } = await import("@vercel/blob");

    // Test write
    let writeUrl: string | null = null;
    let writeError: string | null = null;
    try {
      const result = await put("bh-debug-test.json", JSON.stringify({ ok: true, ts: Date.now() }), {
        access: "public",
        addRandomSuffix: false,
        contentType: "application/json",
        cacheControlMaxAge: 0,
      });
      writeUrl = result.url;
    } catch (e) {
      writeError = String(e);
    }

    // Test read
    let readOk: boolean | null = null;
    let readError: string | null = null;
    if (writeUrl) {
      try {
        const res = await fetch(writeUrl, { cache: "no-store" });
        readOk = res.ok;
      } catch (e) {
        readError = String(e);
      }
    }

    const { blobs } = await list();

    return NextResponse.json({
      blob: true,
      storeId,
      write: writeError ? { ok: false, error: writeError } : { ok: true, url: writeUrl },
      read: readError ? { ok: false, error: readError } : { ok: readOk },
      blobs: blobs.map((b) => ({ pathname: b.pathname, size: b.size })),
    });
  } catch (e) {
    return NextResponse.json({ blob: true, storeId, error: String(e) }, { status: 500 });
  }
}
