import { NextResponse } from "next/server";
import { buildEmailHTML, generateHeroImageUrl, resolvePalette } from "@/lib/email-template";

export async function POST(req: Request) {
  const {
    name,
    department,
    message,
    imageUrl: inputImageUrl,
    paletteId: inputPaletteId,
    mood,
    fuel,
  } = await req.json();

  const fromName = process.env.GMAIL_FROM_NAME || "The HR Team";

  // Generate fresh values when none supplied (i.e. on Regenerate).
  // When the caller passes existing values they are reused (edit mode).
  const resolvedImageUrl: string = inputImageUrl || generateHeroImageUrl();
  const resolvedPalette = resolvePalette(inputPaletteId || undefined);

  const html = buildEmailHTML(
    name || "",
    department || "",
    message || "",
    fromName,
    undefined,
    mood || "Sunny",
    fuel || "Coffee",
    undefined,
    resolvedImageUrl,
    resolvedPalette.id
  );

  return NextResponse.json({
    html,
    imageUrl: resolvedImageUrl,
    paletteId: resolvedPalette.id,
  });
}
