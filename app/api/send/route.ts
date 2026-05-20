import { NextResponse } from "next/server";
import nodemailer from "nodemailer";
import { getEmployee, appendLog } from "@/lib/storage";
import { buildEmailHTML } from "@/lib/email-template";
import { randomUUID } from "crypto";

function getTransporter(gmailUser: string, gmailAppPassword: string) {
  return nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 465,
    secure: true,
    auth: {
      user: gmailUser,
      pass: gmailAppPassword,
    },
    tls: { rejectUnauthorized: false },
  });
}

export async function POST(req: Request) {
  const { employeeId, message, gmailUser, gmailAppPassword, fromName: bodyFromName, mood, fuel, heroImageUrl } = await req.json();

  if (!employeeId || !message) {
    return NextResponse.json({ error: "employeeId and message are required" }, { status: 400 });
  }

  // Accept credentials from request body (manual sends) or env vars (cron fallback)
  const resolvedGmailUser = gmailUser || process.env.GMAIL_USER;
  const resolvedGmailPass = gmailAppPassword || process.env.GMAIL_APP_PASSWORD;

  if (!resolvedGmailUser || !resolvedGmailPass) {
    return NextResponse.json(
      { error: "Gmail credentials are required. Please configure them before sending." },
      { status: 400 }
    );
  }

  const employee = await getEmployee(employeeId);
  if (!employee) {
    return NextResponse.json({ error: "Employee not found" }, { status: 404 });
  }

  const fromName = bodyFromName || process.env.GMAIL_FROM_NAME || "The HR Team";
  const origin = new URL(req.url).origin;
  const logoUrl = `${origin}/rezolve.gif`;
  const html = buildEmailHTML(
    employee.name, employee.department, message, fromName,
    undefined, mood, fuel, logoUrl, heroImageUrl
  );

  try {
    const transporter = getTransporter(resolvedGmailUser, resolvedGmailPass);
    await transporter.sendMail({
      from: `"${fromName}" <${resolvedGmailUser}>`,
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

    return NextResponse.json({ ok: true, to: employee.email });
  } catch (err: unknown) {
    console.error("Gmail error full details:", JSON.stringify(err, Object.getOwnPropertyNames(err)));
    const errorMsg = err instanceof Error ? err.message : String(err);
    await appendLog({
      id: randomUUID(),
      employeeId: employee.id,
      employeeName: employee.name,
      sentAt: new Date().toISOString(),
      year: new Date().getFullYear(),
      status: "failed",
      error: errorMsg,
    });
    return NextResponse.json({ error: "Failed to send email", detail: errorMsg }, { status: 500 });
  }
}
