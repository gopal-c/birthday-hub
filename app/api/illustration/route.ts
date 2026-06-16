import { NextResponse } from 'next/server';
import { generateIllustrationUrl } from '@/lib/generate-illustration';

export const dynamic = 'force-dynamic';

export function GET() {
  const imageUrl = generateIllustrationUrl();
  return NextResponse.json({ imageUrl }, { headers: { 'Cache-Control': 'no-store' } });
}
