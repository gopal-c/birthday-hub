import { NextResponse } from "next/server";
import { getDueScheduledSends } from "@/lib/storage";

export const dynamic = "force-dynamic";

/** Returns all pending scheduled sends where scheduledAt <= now. */
export async function GET() {
  const due = await getDueScheduledSends();
  return NextResponse.json(due);
}
