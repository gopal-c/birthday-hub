import { NextResponse } from 'next/server';

export async function GET() {
  const prompts = ['birthday cake candles pastel pink aesthetic'];

  try {
    const res = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/imagen-3.0-generate-001:predict?key=${process.env.GEMINI_API_KEY}`,
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          instances: [{ prompt: prompts[0] }],
          parameters: { sampleCount: 1, aspectRatio: '16:9' },
        }),
      }
    );

    const data = await res.json();
    return NextResponse.json({
      status: res.status,
      statusText: res.statusText,
      data,
      geminiKeyPresent: !!process.env.GEMINI_API_KEY,
    });
  } catch (err) {
    return NextResponse.json({ error: String(err) });
  }
}
