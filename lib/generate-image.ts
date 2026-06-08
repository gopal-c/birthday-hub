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
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash-image:generateContent?key=${process.env.GEMINI_API_KEY}`,
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          contents: [{
            parts: [{ text: prompt }],
          }],
          generationConfig: {
            responseModalities: ['TEXT', 'IMAGE'],
          },
        }),
      }
    );

    const data = await res.json();
    console.log('Gemini image response status:', res.status);
    console.log('Gemini image response:', JSON.stringify(data).slice(0, 200));

    const imagePart = data.candidates?.[0]?.content?.parts?.find(
      (p: { inlineData?: { mimeType: string; data: string } }) => p.inlineData
    );
    if (imagePart?.inlineData) {
      return `data:${imagePart.inlineData.mimeType};base64,${imagePart.inlineData.data}`;
    }
  } catch (err) {
    console.error('Gemini image error:', err);
  }

  return '';
}
