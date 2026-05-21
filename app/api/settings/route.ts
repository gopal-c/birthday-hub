import { NextResponse } from "next/server";
import { getSettings, saveSettings } from "@/lib/storage";
import type { AppSettings } from "@/lib/types";

export const dynamic = "force-dynamic";

export async function GET() {
  const settings = await getSettings();
  return NextResponse.json(settings);
}

export async function POST(req: Request) {
  const body = (await req.json()) as Partial<AppSettings>;
  const current = await getSettings();
  const updated: AppSettings = {
    fromName:        body.fromName        ?? current.fromName,
    replyTo:         body.replyTo         ?? current.replyTo,
    autoSendEnabled: body.autoSendEnabled ?? current.autoSendEnabled,
    ccBehavior:      body.ccBehavior      ?? current.ccBehavior,
  };
  await saveSettings(updated);
  return NextResponse.json(updated);
}
