import { NextResponse } from "next/server";
import Anthropic from "@anthropic-ai/sdk";

const client = new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY });

export async function POST(req: Request) {
  const { name, department, notes } = await req.json();

  if (!name) {
    return NextResponse.json({ error: "name is required" }, { status: 400 });
  }

  const extraContext = notes ? `\nExtra context about this person: ${notes}` : "";

  try {
    const msg = await client.messages.create({
      model: "claude-sonnet-4-20250514",
      max_tokens: 300,
      messages: [
        {
          role: "user",
          content: `Write a warm, genuine 2–3 sentence birthday message for ${name}${department ? `, who works in ${department}` : ""}.${extraContext}

Rules:
- Start with "Dear ${name},"
- Make it personal and heartfelt, not generic
- Reference their role or department naturally
- Do not include a subject line or sign-off
- Do not use hollow phrases like "on this special day" or "may all your dreams come true"
- Sound like it's from a real colleague who cares`,
        },
      ],
    });

    const text = msg.content[0].type === "text" ? msg.content[0].text : "";
    return NextResponse.json({ message: text });
  } catch (err) {
    console.error("Anthropic error:", err);
    return NextResponse.json({ error: "Failed to generate message" }, { status: 500 });
  }
}
