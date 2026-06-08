import { NextResponse } from 'next/server';

export async function GET() {
  try {
    const res = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash-image:generateContent?key=${process.env.GEMINI_API_KEY}`,
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          contents: [{ parts: [{ text: 'birthday cake candles pastel pink aesthetic' }] }],
          generationConfig: { responseModalities: ['TEXT', 'IMAGE'] },
        }),
      }
    );

    const data = await res.json();
    const imagePart = data.candidates?.[0]?.content?.parts?.find(
      (p: { inlineData?: unknown }) => p.inlineData
    );
    const inlineData = imagePart?.inlineData as { mimeType: string; data: string } | undefined;
    return NextResponse.json({
      status: res.status,
      statusText: res.statusText,
      hasImage: !!inlineData,
      previewUrl: inlineData ? `data:${inlineData.mimeType};base64,${inlineData.data.slice(0, 60)}...` : null,
      geminiKeyPresent: !!process.env.GEMINI_API_KEY,
      ...(inlineData ? {} : { data }),
    });
  } catch (err) {
    return NextResponse.json({ error: String(err) });
  }
}
