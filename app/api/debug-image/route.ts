import { NextResponse } from 'next/server';

export async function GET() {
  try {
    const res = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/imagen-4.0-fast-generate-001:predict?key=${process.env.GEMINI_API_KEY}`,
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          instances: [{ prompt: 'birthday cake candles pastel pink aesthetic' }],
          parameters: { sampleCount: 1, aspectRatio: '16:9' },
        }),
      }
    );

    const data = await res.json();
    const b64 = data.predictions?.[0]?.bytesBase64Encoded;
    return NextResponse.json({
      status: res.status,
      statusText: res.statusText,
      hasImage: !!b64,
      previewUrl: b64 ? `data:image/png;base64,${b64.slice(0, 60)}...` : null,
      geminiKeyPresent: !!process.env.GEMINI_API_KEY,
      ...(b64 ? {} : { data }),
    });
  } catch (err) {
    return NextResponse.json({ error: String(err) });
  }
}
