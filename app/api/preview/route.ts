import { NextResponse } from "next/server";
import { buildEmailHTML, generateHeroImageUrl } from "@/lib/email-template";

export async function POST(req: Request) {
  const {
    name,
    department,
    message,
    imageUrl: inputImageUrl,
    mood,
    fuel,
  } = await req.json();

  const fromName = process.env.GMAIL_FROM_NAME || "The HR Team";

  // Generate a fresh URL when none is supplied (i.e. on Regenerate).
  // When the caller passes an existing URL the same image is reused.
  const resolvedImageUrl: string = inputImageUrl || generateHeroImageUrl();

  const html = buildEmailHTML(
    name || "",
    department || "",
    message || "",
    fromName,
    undefined,
    mood || "Sunny",
    fuel || "Coffee",
    undefined,
    resolvedImageUrl
  );

  return NextResponse.json({ html, imageUrl: resolvedImageUrl });
}
