import { NextResponse } from 'next/server';
import { generateIllustrationUrl } from '@/lib/generate-illustration';

export async function GET() {
  const imageUrl = await generateIllustrationUrl();
  return NextResponse.json({ imageUrl });
}
