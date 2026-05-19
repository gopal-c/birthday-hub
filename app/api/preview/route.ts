import { NextResponse } from "next/server";
import { buildEmailHTML } from "@/lib/email-template";

export async function POST(req: Request) {
  const { name, department, message } = await req.json();
  const fromName = process.env.GMAIL_FROM_NAME || "The HR Team";
  const html = buildEmailHTML(name || "", department || "", message || "", fromName);
  return NextResponse.json({ html });
}
