export async function generateBirthdayImage(): Promise<string> {
  const prompts = [
    'birthday cake with candles soft pastel pink cream background flowers aesthetic minimal studio photography',
    'elegant balloon bouquet lavender and gold soft dreamy pastel aesthetic light background',
    'gift boxes with ribbons and sparkles sage green and blush pink aesthetic photography',
    'champagne glasses with stars peach and ivory luxury minimal celebration aesthetic',
    'floral birthday wreath with candles soft blue and white botanical editorial',
    'party celebration warm amber cream confetti streamers aesthetic flat lay',
  ];
  const prompt = prompts[Math.floor(Math.random() * prompts.length)];

  try {
    const res = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/imagen-3.0-generate-002:predict?key=${process.env.GEMINI_API_KEY}`,
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          instances: [{ prompt }],
          parameters: {
            sampleCount: 1,
            aspectRatio: '16:9',
          },
        }),
      }
    );

    const data = await res.json();
    console.log('Imagen response status:', res.status);
    console.log('Imagen response:', JSON.stringify(data).slice(0, 200));

    const b64 = data.predictions?.[0]?.bytesBase64Encoded;
    if (b64) return `data:image/png;base64,${b64}`;
  } catch (err) {
    console.error('Imagen error:', err);
  }

  return '';
}
