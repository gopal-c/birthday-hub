import { NextResponse } from "next/server";
import { NextRequest } from "next/server";
import nodemailer from "nodemailer";
import Anthropic from "@anthropic-ai/sdk";
import { getEmployees, getLogs, appendLog, todayMMDD, alreadySentThisYear } from "@/lib/storage";
import { buildEmailHTML } from "@/lib/email-template";
import { randomUUID } from "crypto";

export async function GET(req: NextRequest) {
  // Protect with a shared secret so only Vercel can trigger this
  const secret = req.headers.get("authorization")?.replace("Bearer ", "");
  if (process.env.CRON_SECRET && secret !== process.env.CRON_SECRET) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const today = todayMMDD();
  const [employees, logs] = await Promise.all([getEmployees(), getLogs()]);

  const birthdayPeople = employees.filter(
    (e) => e.birthday === today && !alreadySentThisYear(logs, e.id)
  );

  if (birthdayPeople.length === 0) {
    return NextResponse.json({ sent: 0, message: "No birthdays today" });
  }

  const anthropic = new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY });
  const fromName = process.env.GMAIL_FROM_NAME || "The HR Team";
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: { user: process.env.GMAIL_USER, pass: process.env.GMAIL_APP_PASSWORD },
  });

  const results = await Promise.allSettled(
    birthdayPeople.map(async (employee) => {
      // Generate message
      const msg = await anthropic.messages.create({
        model: "claude-sonnet-4-20250514",
        max_tokens: 300,
        messages: [
          {
            role: "user",
            content: `Write a warm, genuine 2–3 sentence birthday message for ${employee.name}${employee.department ? `, who works in ${employee.department}` : ""}${employee.notes ? `. Context: ${employee.notes}` : ""}.
Start with "Dear ${employee.name},". Personal, heartfelt, no clichés. No subject line or sign-off.`,
          },
        ],
      });
      const message = msg.content[0].type === "text" ? msg.content[0].text : `Dear ${employee.name},\n\nWishing you a wonderful birthday today! Your contributions to ${employee.department} are truly appreciated.`;

      // Send email
      const html = buildEmailHTML(employee.name, employee.department, message, fromName);
      await transporter.sendMail({
        from: `"${fromName}" <${process.env.GMAIL_USER}>`,
        to: employee.email,
        subject: `🎂 Happy Birthday, ${employee.name}!`,
        html,
      });

      await appendLog({
        id: randomUUID(),
        employeeId: employee.id,
        employeeName: employee.name,
        sentAt: new Date().toISOString(),
        year: new Date().getFullYear(),
        status: "sent",
      });

      return { name: employee.name, email: employee.email };
    })
  );

  const sent = results.filter((r) => r.status === "fulfilled").length;
  const failed = results.filter((r) => r.status === "rejected").length;

  // Log failures
  for (let i = 0; i < results.length; i++) {
    const r = results[i];
    if (r.status === "rejected") {
      console.error(`Failed for ${birthdayPeople[i].name}:`, r.reason);
      await appendLog({
        id: randomUUID(),
        employeeId: birthdayPeople[i].id,
        employeeName: birthdayPeople[i].name,
        sentAt: new Date().toISOString(),
        year: new Date().getFullYear(),
        status: "failed",
        error: String(r.reason),
      });
    }
  }

  return NextResponse.json({ sent, failed, total: birthdayPeople.length });
}
