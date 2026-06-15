import { NextResponse } from "next/server";
import { buildEmailHTML, resolvePalette } from "@/lib/email-template";
import { illustrations } from "@/lib/illustrations";
import { svgToBase64 } from "@/lib/svg-to-base64";

export async function POST(req: Request) {
  const {
    name,
    department,
    message,
    fromName: bodyFromName,
    paletteId: inputPaletteId,
    mood,
    fuel,
    imageUrl: lockedImageUrl,
  } = await req.json();

  const fromName = bodyFromName || process.env.GMAIL_FROM_NAME || "The HR Team";
  const resolvedPalette = resolvePalette(inputPaletteId || undefined);

  let imageUrl: string = lockedImageUrl || "";
  if (!imageUrl) {
    const svg = illustrations[Math.floor(Math.random() * illustrations.length)];
    imageUrl = await svgToBase64(svg);
  }

  const html = buildEmailHTML(
    name || "",
    department || "",
    message || "",
    fromName,
    undefined,
    mood || "Sunny",
    fuel || "Coffee",
    undefined,
    imageUrl,
    resolvedPalette.id
  );

  return NextResponse.json({ html, imageUrl, paletteId: resolvedPalette.id });
}
