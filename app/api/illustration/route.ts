import { NextResponse } from 'next/server';
import { illustrations } from '@/lib/illustrations';
import { svgToBase64 } from '@/lib/svg-to-base64';

export async function GET() {
  const svg = illustrations[Math.floor(Math.random() * illustrations.length)];
  const imageUrl = await svgToBase64(svg);
  return NextResponse.json({ imageUrl });
}
