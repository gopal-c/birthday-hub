import { generateBirthdayImage } from '@/lib/generate-image';
import { NextResponse } from 'next/server';

export async function GET() {
  const url = await generateBirthdayImage();
  return NextResponse.json({
    url: url.slice(0, 100),
    hasImage: url.length > 0,
    geminiKeyPresent: !!process.env.GEMINI_API_KEY,
  });
}
