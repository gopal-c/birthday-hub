import sharp from 'sharp';

export async function svgToBase64(svg: string): Promise<string> {
  const buffer = await sharp(Buffer.from(svg))
    .resize(600, 240)
    .png()
    .toBuffer();
  return `data:image/png;base64,${buffer.toString('base64')}`;
}
