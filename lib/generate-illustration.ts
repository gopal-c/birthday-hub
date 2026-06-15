import sharp from 'sharp';
import { put } from '@vercel/blob';
import { illustrations } from './illustrations';

export async function generateIllustrationUrl(): Promise<string> {
  const svg = illustrations[Math.floor(Math.random() * illustrations.length)];

  const buffer = await sharp(Buffer.from(svg))
    .resize(600, 240)
    .png()
    .toBuffer();

  const filename = `illustrations/bday-${Date.now()}-${Math.random().toString(36).slice(2)}.png`;

  const { url } = await put(filename, buffer, {
    access: 'public',
    contentType: 'image/png',
  });

  return url;
}
