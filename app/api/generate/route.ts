import { NextResponse } from "next/server";
import Groq from "groq-sdk";

export async function POST(req: Request) {
  const { name, department, notes } = await req.json();

  if (!name) {
    return NextResponse.json({ error: "name is required" }, { status: 400 });
  }

  const extraContext = notes ? `\nExtra context about this person: ${notes}` : "";

  try {
    const groq = new Groq({ apiKey: process.env.GROQ_API_KEY });

    const completion = await groq.chat.completions.create({
      model: "llama-3.3-70b-versatile",
      max_tokens: 300,
      messages: [
        {
          role: "user",
          content: `Write a birthday message for ${name}${department ? `, who works in ${department}` : ""}.${extraContext}

Return ONLY a valid JSON object with no extra text or markdown, exactly like this:
{
  "message": "Dear ${name}, [exactly 1 warm, personal, heartfelt birthday sentence — not generic]",
  "mood": "[one upbeat word that fits ${name}'s vibe or role today, e.g. Radiant, Creative, Stellar, Focused, Bright]",
  "fuel": "[what ${name} probably runs on — a drink or snack, 1-2 words, e.g. Espresso, Cold Brew, Matcha, Green Tea, Pizza]"
}

Rules:
- message: exactly 1 sentence starting with "Dear ${name},"
- mood: single capitalised word, energetic and positive, ideally hinting at their role or personality
- fuel: 1-2 words max, fun and specific, ideally tied to their department or personality
- Do NOT use hollow phrases like "on this special day"
- Sound like it's from a real colleague who cares`,
        },
      ],
    });

    const raw = completion.choices[0]?.message?.content ?? "";

    // Parse JSON — strip any accidental markdown fences first
    const cleaned = raw.replace(/```json\n?/g, "").replace(/```\n?/g, "").trim();
    let message = "";
    let mood = "Sunny";
    let fuel = "Coffee";

    try {
      const parsed = JSON.parse(cleaned);
      message = parsed.message ?? "";
      mood = parsed.mood ?? "Sunny";
      fuel = parsed.fuel ?? "Coffee";
    } catch {
      // Fallback: treat the whole response as the message
      message = raw;
    }

    return NextResponse.json({ message, mood, fuel });
  } catch (err) {
    console.error("Generate error:", err);
    return NextResponse.json({ error: "Failed to generate message", detail: String(err) }, { status: 500 });
  }
}
