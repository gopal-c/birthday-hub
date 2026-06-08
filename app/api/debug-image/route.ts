import { NextResponse } from 'next/server';

export async function GET() {
  // First list available models
  const listRes = await fetch(
    `https://generativelanguage.googleapis.com/v1beta/models?key=${process.env.GEMINI_API_KEY}`
  );
  const listData = await listRes.json();

  // Filter image-related models
  const imageModels = listData.models?.filter((m: { name: string; supportedGenerationMethods?: string[] }) =>
    m.name.includes('imagen') ||
    m.name.includes('image') ||
    m.supportedGenerationMethods?.includes('predict')
  ).map((m: { name: string; supportedGenerationMethods?: string[] }) => ({
    name: m.name,
    methods: m.supportedGenerationMethods,
  }));

  return NextResponse.json({ imageModels });
}
