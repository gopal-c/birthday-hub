import { NextResponse } from "next/server";
import Groq from "groq-sdk";

export async function POST(req: Request) {
  console.log("GROQ_API_KEY present:", !!process.env.GROQ_API_KEY);

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
          content: `Write a warm, genuine birthday message for ${name}${department ? `, who works in ${department}` : ""}.${extraContext}

Rules:
- Write exactly 2 sentences, no more. Be warm and personal. Never write a third sentence.
- Start with "Dear ${name},"
- Make it personal and heartfelt, not generic
- Reference their role or department naturally if provided
- Do not include a subject line or sign-off
- Do not use hollow phrases like "on this special day" or "may all your dreams come true"
- Sound like it's from a real colleague who cares
- STOP after 2 sentences. Do not continue.`,
        },
      ],
    });

    const text = completion.choices[0]?.message?.content ?? "";
    return NextResponse.json({ message: text });
  } catch (err) {
    console.error("Generate error:", err);
    return NextResponse.json({ error: "Failed to generate message", detail: String(err) }, { status: 500 });
  }
}
