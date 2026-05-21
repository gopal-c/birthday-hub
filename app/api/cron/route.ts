import { NextResponse, NextRequest } from "next/server";
import nodemailer from "nodemailer";
import Groq from "groq-sdk";
import {
  getEmployees, getLogs, appendLog, todayMMDD, alreadySentThisYear,
  getDueScheduledSends, updateScheduledSendStatus, getSettings,
} from "@/lib/storage";
import { buildEmailHTML, generateHeroImageUrl, resolvePalette } from "@/lib/email-template";
import { randomUUID } from "crypto";

// Runs every 15 minutes via Vercel Cron.
// Does two things each tick:
//   1. Auto-send birthday emails for today (once per person per year).
//   2. Fire any scheduled sends whose scheduledAt is now in the past.

export async function GET(req: NextRequest) {
  // Protect with a shared secret so only Vercel Cron can trigger this
  const secret = req.headers.get("authorization")?.replace("Bearer ", "");
  if (process.env.CRON_SECRET && secret !== process.env.CRON_SECRET) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const results = { birthdaySent: 0, birthdayFailed: 0, scheduledSent: 0, scheduledFailed: 0 };

  // Load settings once for this cron tick
  const settings = await getSettings();

  // ── 1. Birthday emails ──────────────────────────────────────────────────────
  if (!settings.autoSendEnabled) {
    results.birthdaySent = 0;
    results.birthdayFailed = 0;
  } else
  try {
    const today = todayMMDD();
    const [employees, logs] = await Promise.all([getEmployees(), getLogs()]);

    const birthdayPeople = employees.filter(
      (e) => e.birthday === today && !alreadySentThisYear(logs, e.id)
    );

    if (birthdayPeople.length > 0) {
      const groq = new Groq({ apiKey: process.env.GROQ_API_KEY });
      const fromName = settings.fromName;
      const logoUrl = process.env.NEXT_PUBLIC_APP_URL
        ? `${process.env.NEXT_PUBLIC_APP_URL}/rezolve.gif`
        : undefined;

      const transporter = nodemailer.createTransport({
        host: "smtp.gmail.com",
        port: 465,
        secure: true,
        auth: { user: process.env.GMAIL_USER, pass: process.env.GMAIL_APP_PASSWORD },
        tls: { rejectUnauthorized: false },
      });

      const birthdayResults = await Promise.allSettled(
        birthdayPeople.map(async (employee) => {
          // Generate message + mood + fuel from Groq
          const completion = await groq.chat.completions.create({
            model: "llama-3.3-70b-versatile",
            max_tokens: 300,
            messages: [{
              role: "user",
              content: `Write a birthday message for ${employee.name}${employee.department ? `, who works in ${employee.department}` : ""}${employee.notes ? `. Context: ${employee.notes}` : ""}.

Return ONLY a valid JSON object:
{
  "message": "Dear ${employee.name}, [exactly 1 warm birthday sentence using we/our, never I/my]",
  "mood": "[one upbeat word for their vibe today]",
  "fuel": "[what they probably run on, 1-2 words]"
}`,
            }],
          });

          const raw = completion.choices[0]?.message?.content ?? "";
          const cleaned = raw.replace(/```json\n?/g, "").replace(/```\n?/g, "").trim();
          let message = `Dear ${employee.name}, wishing you a wonderful birthday from all of us!`;
          let mood = "Sunny";
          let fuel = "Coffee";
          try {
            const parsed = JSON.parse(cleaned);
            message = parsed.message || message;
            mood    = parsed.mood    || mood;
            fuel    = parsed.fuel    || fuel;
          } catch { /* keep defaults */ }

          const heroImageUrl = generateHeroImageUrl();
          const palette      = resolvePalette();
          const html = buildEmailHTML(
            employee.name, employee.department, message, fromName,
            undefined, mood, fuel, logoUrl, heroImageUrl, palette.id
          );

          // CC/BCC other employees according to settings
          const otherEmails = employees
            .filter((e) => e.id !== employee.id && e.email)
            .map((e) => e.email);
          const behavior = otherEmails.length > 50 ? "bcc" : settings.ccBehavior;
          const recipientField = otherEmails.length > 0 && behavior !== "none"
            ? { [behavior]: otherEmails.join(", ") }
            : {};

          await transporter.sendMail({
            from:    `"${fromName}" <${process.env.GMAIL_USER}>`,
            to:      employee.email,
            ...recipientField,
            ...(settings.replyTo ? { replyTo: settings.replyTo } : {}),
            subject: `🎂 Happy Birthday, ${employee.name}!`,
            html,
          });

          await appendLog({
            id: randomUUID(), employeeId: employee.id, employeeName: employee.name,
            sentAt: new Date().toISOString(), year: new Date().getFullYear(), status: "sent",
          });
        })
      );

      results.birthdaySent   = birthdayResults.filter((r) => r.status === "fulfilled").length;
      results.birthdayFailed = birthdayResults.filter((r) => r.status === "rejected").length;

      for (let i = 0; i < birthdayResults.length; i++) {
        const r = birthdayResults[i];
        if (r.status === "rejected") {
          console.error(`Birthday send failed for ${birthdayPeople[i].name}:`, r.reason);
          await appendLog({
            id: randomUUID(), employeeId: birthdayPeople[i].id,
            employeeName: birthdayPeople[i].name, sentAt: new Date().toISOString(),
            year: new Date().getFullYear(), status: "failed", error: String(r.reason),
          });
        }
      }
    }
  } catch (err) {
    console.error("Birthday send phase error:", err);
  }

  // ── 2. Scheduled sends ──────────────────────────────────────────────────────
  try {
    const due = await getDueScheduledSends();

    const scheduledResults = await Promise.allSettled(
      due.map(async (job) => {
        const logoUrl = process.env.NEXT_PUBLIC_APP_URL
          ? `${process.env.NEXT_PUBLIC_APP_URL}/rezolve.gif`
          : undefined;

        const html = buildEmailHTML(
          job.employeeName, "", job.message, job.fromName,
          undefined, job.mood, job.fuel, logoUrl, job.heroImageUrl, job.paletteId
        );

        const transporter = nodemailer.createTransport({
          host: "smtp.gmail.com",
          port: 465,
          secure: true,
          auth: { user: job.gmailUser, pass: job.gmailAppPassword },
          tls: { rejectUnauthorized: false },
        });

        const jobCcList = job.cc || [];
        const jobBehavior = jobCcList.length > 50 ? "bcc" : (job.ccBehavior || "cc");
        const jobRecipientField = jobCcList.length > 0 && jobBehavior !== "none"
          ? { [jobBehavior]: jobCcList.join(", ") }
          : {};

        await transporter.sendMail({
          from:    `"${job.fromName}" <${job.gmailUser}>`,
          to:      job.employeeEmail,
          ...jobRecipientField,
          subject: `🎂 Happy Birthday, ${job.employeeName}!`,
          html,
        });

        await updateScheduledSendStatus(job.id, "sent", new Date().toISOString());
      })
    );

    results.scheduledSent   = scheduledResults.filter((r) => r.status === "fulfilled").length;
    results.scheduledFailed = scheduledResults.filter((r) => r.status === "rejected").length;

    for (let i = 0; i < scheduledResults.length; i++) {
      if (scheduledResults[i].status === "rejected") {
        const r = scheduledResults[i] as PromiseRejectedResult;
        console.error(`Scheduled send failed for job ${due[i].id}:`, r.reason);
        await updateScheduledSendStatus(due[i].id, "pending"); // leave pending to retry
      }
    }
  } catch (err) {
    console.error("Scheduled send phase error:", err);
  }

  return NextResponse.json(results);
}
