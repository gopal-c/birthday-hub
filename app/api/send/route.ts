import { NextResponse } from "next/server";
import nodemailer from "nodemailer";
import { getEmployee, appendLog } from "@/lib/storage";
import { buildEmailHTML } from "@/lib/email-template";
import { randomUUID } from "crypto";

function getTransporter() {
  return nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 465,
    secure: true,
    auth: {
      user: process.env.GMAIL_USER,
      pass: process.env.GMAIL_APP_PASSWORD,
    },
    tls: { rejectUnauthorized: false },
  });
}

export async function POST(req: Request) {
  console.log("GMAIL_USER present:", !!process.env.GMAIL_USER);
  console.log("GMAIL_APP_PASSWORD present:", !!process.env.GMAIL_APP_PASSWORD);
  console.log("GMAIL_USER value:", process.env.GMAIL_USER);

  const { employeeId, message } = await req.json();

  if (!employeeId || !message) {
    return NextResponse.json({ error: "employeeId and message are required" }, { status: 400 });
  }

  const employee = await getEmployee(employeeId);
  if (!employee) {
    return NextResponse.json({ error: "Employee not found" }, { status: 404 });
  }

  const fromName = process.env.GMAIL_FROM_NAME || "The HR Team";
  const html = buildEmailHTML(employee.name, employee.department, message, fromName);

  try {
    const transporter = getTransporter();
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
