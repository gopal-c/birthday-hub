import { NextResponse } from "next/server";
import { buildEmailHTML, resolvePalette } from "@/lib/email-template";

export async function POST(req: Request) {
  const {
    name,
    department,
    message,
    fromName: bodyFromName,
    paletteId: inputPaletteId,
    mood,
    fuel,
  } = await req.json();

  const fromName = bodyFromName || process.env.GMAIL_FROM_NAME || "The HR Team";
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
    undefined,
    resolvedPalette.id
  );

  return NextResponse.json({
    html,
    imageUrl: "",
    paletteId: resolvedPalette.id,
  });
}
