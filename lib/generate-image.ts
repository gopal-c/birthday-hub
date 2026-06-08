export async function generateBirthdayImage(name: string, department: string): Promise<string> {
  const prompts = [
    'birthday cake with candles soft pastel pink cream background flowers aesthetic minimal',
    'elegant balloon bouquet lavender gold soft dreamy pastel aesthetic',
    'gift boxes ribbons sparkles sage green blush pink aesthetic',
    'champagne glasses stars peach ivory luxury minimal celebration',
    'floral birthday wreath candles soft blue white botanical',
    'party celebration warm amber cream confetti streamers aesthetic',
  ];
  const prompt = prompts[Math.floor(Math.random() * prompts.length)];

  const res = await fetch(
    `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash-preview-image-generation:generateContent?key=${process.env.GEMINI_API_KEY}`,
    {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        contents: [{ parts: [{ text: `${prompt}, high quality, soft lighting, editorial style` }] }],
        generationConfig: { responseModalities: ['IMAGE'] },
      }),
    }
  );

  const data = await res.json();
  const imageData = data.candidates?.[0]?.content?.parts?.find(
    (p: { inlineData?: { mimeType: string; data: string } }) => p.inlineData
  )?.inlineData;

  if (imageData) {
    return `data:${imageData.mimeType};base64,${imageData.data}`;
  }

  // Fallback to embedded SVG if generation fails
  return '';
}
