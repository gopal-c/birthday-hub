import { NextResponse } from "next/server";
import { buildEmailHTML, resolvePalette } from "@/lib/email-template";
import { generateBirthdayImage } from "@/lib/generate-image";

export async function POST(req: Request) {
  const {
    name,
    department,
    message,
    fromName: bodyFromName,
    imageUrl: inputImageUrl,
    paletteId: inputPaletteId,
    mood,
    fuel,
  } = await req.json();

  const fromName = bodyFromName || process.env.GMAIL_FROM_NAME || "The HR Team";

  // Generate fresh values when none supplied (i.e. on Regenerate).
  // When the caller passes existing values they are reused (edit mode).
  const resolvedImageUrl: string = inputImageUrl || await generateBirthdayImage(name || "", department || "");
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
