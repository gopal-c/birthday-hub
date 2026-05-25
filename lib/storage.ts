import { sql } from "@vercel/postgres";
import type { Employee, SendLog, ScheduledSend, AppSettings } from "./types";

// ── In-memory fallback for local dev without POSTGRES_URL ────────────────────
const mem: { employees: Employee[]; logs: SendLog[]; scheduled: ScheduledSend[] } = {
  employees: [], logs: [], scheduled: [],
};

function hasDb(): boolean {
  return !!process.env.POSTGRES_URL;
}

// ── Schema bootstrap ─────────────────────────────────────────────────────────
let schemaReady = false;

async function ensureSchema(): Promise<void> {
  if (schemaReady) return;
  await sql`
    CREATE TABLE IF NOT EXISTS employees (
      id          TEXT PRIMARY KEY,
      name        TEXT NOT NULL,
      email       TEXT NOT NULL,
      department  TEXT,
      birthday    TEXT NOT NULL,
      notes       TEXT,
      created_at  TEXT
    )
  `;
  await sql`
    CREATE TABLE IF NOT EXISTS send_logs (
      id            TEXT PRIMARY KEY,
      employee_id   TEXT,
      employee_name TEXT,
      sent_at       TEXT,
      year          INTEGER,
      status        TEXT,
      error         TEXT
    )
  `;
  await sql`
    CREATE TABLE IF NOT EXISTS scheduled_sends (
      id                 TEXT PRIMARY KEY,
      employee_id        TEXT NOT NULL,
      employee_name      TEXT NOT NULL,
      employee_email     TEXT NOT NULL,
      message            TEXT,
      gmail_user         TEXT,
      gmail_app_password TEXT,
      from_name          TEXT,
      cc                 TEXT,
      cc_behavior        TEXT DEFAULT 'cc',
      mood               TEXT,
      fuel               TEXT,
      hero_image_url     TEXT,
      palette_id         TEXT,
      scheduled_at       TEXT NOT NULL,
      status             TEXT NOT NULL DEFAULT 'pending',
      created_at         TEXT,
      sent_at            TEXT
    )
  `;
  // Migration: add cc_behavior to existing scheduled_sends tables
  await sql`ALTER TABLE scheduled_sends ADD COLUMN IF NOT EXISTS cc_behavior TEXT DEFAULT 'cc'`;
  await sql`
    CREATE TABLE IF NOT EXISTS kv_store (
      key   TEXT PRIMARY KEY,
      value TEXT NOT NULL
    )
  `;
  schemaReady = true;
}

// ── Row mappers ───────────────────────────────────────────────────────────────
function rowToEmployee(row: Record<string, unknown>): Employee {
  return {
    id:         row.id as string,
    name:       row.name as string,
    email:      row.email as string,
    department: (row.department as string) || "",
    birthday:   row.birthday as string,
    notes:      (row.notes as string) || undefined,
    createdAt:  (row.created_at as string) || new Date().toISOString(),
  };
}

function rowToLog(row: Record<string, unknown>): SendLog {
  return {
    id:           row.id as string,
    employeeId:   row.employee_id as string,
    employeeName: row.employee_name as string,
    sentAt:       row.sent_at as string,
    year:         row.year as number,
    status:       row.status as "sent" | "failed",
    error:        (row.error as string) || undefined,
  };
}

// ── Employees ────────────────────────────────────────────────────────────────

export async function getEmployees(): Promise<Employee[]> {
  if (!hasDb()) return mem.employees;
  await ensureSchema();
  const { rows } = await sql`SELECT * FROM employees ORDER BY created_at ASC`;
  return rows.map(rowToEmployee);
}

export async function saveEmployees(employees: Employee[]): Promise<void> {
  if (!hasDb()) { mem.employees = employees; return; }
  await ensureSchema();
  await sql`DELETE FROM employees`;
  for (const e of employees) {
    await sql`
      INSERT INTO employees (id, name, email, department, birthday, notes, created_at)
      VALUES (${e.id}, ${e.name}, ${e.email}, ${e.department || null}, ${e.birthday}, ${e.notes || null}, ${e.createdAt || null})
    `;
  }
}

export async function getEmployee(id: string): Promise<Employee | null> {
  if (!hasDb()) return mem.employees.find((e) => e.id === id) ?? null;
  await ensureSchema();
  const { rows } = await sql`SELECT * FROM employees WHERE id = ${id}`;
  return rows.length ? rowToEmployee(rows[0]) : null;
}

export async function upsertEmployee(employee: Employee): Promise<void> {
  if (!hasDb()) {
    const idx = mem.employees.findIndex((e) => e.id === employee.id);
    if (idx >= 0) mem.employees[idx] = employee;
    else mem.employees.push(employee);
    return;
  }
  await ensureSchema();
  await sql`
    INSERT INTO employees (id, name, email, department, birthday, notes, created_at)
    VALUES (${employee.id}, ${employee.name}, ${employee.email}, ${employee.department || null}, ${employee.birthday}, ${employee.notes || null}, ${employee.createdAt || null})
    ON CONFLICT (id) DO UPDATE SET
      name       = EXCLUDED.name,
      email      = EXCLUDED.email,
      department = EXCLUDED.department,
      birthday   = EXCLUDED.birthday,
      notes      = EXCLUDED.notes,
      created_at = EXCLUDED.created_at
  `;
}

export async function deleteEmployee(id: string): Promise<void> {
  if (!hasDb()) { mem.employees = mem.employees.filter((e) => e.id !== id); return; }
  await ensureSchema();
  await sql`DELETE FROM employees WHERE id = ${id}`;
}

// ── Send Logs ────────────────────────────────────────────────────────────────

export async function getLogs(): Promise<SendLog[]> {
  if (!hasDb()) return mem.logs;
  await ensureSchema();
  const { rows } = await sql`SELECT * FROM send_logs ORDER BY sent_at DESC LIMIT 200`;
  return rows.map(rowToLog);
}

export async function appendLog(log: SendLog): Promise<void> {
  if (!hasDb()) {
    const existing = mem.logs.find(
      l => l.employeeId === log.employeeId &&
           l.year === log.year &&
           l.status === "sent"
    );
    if (existing) return;
    mem.logs.unshift(log);
    mem.logs = mem.logs.slice(0, 200);
    return;
  }
  await ensureSchema();
  // Skip if a "sent" entry already exists for this employee + year
  const { rows } = await sql`
    SELECT 1 FROM send_logs
    WHERE employee_id = ${log.employeeId}
      AND year = ${log.year}
      AND status = 'sent'
    LIMIT 1
  `;
  if (rows.length > 0) return;
  await sql`
    INSERT INTO send_logs (id, employee_id, employee_name, sent_at, year, status, error)
    VALUES (${log.id}, ${log.employeeId}, ${log.employeeName}, ${log.sentAt}, ${log.year}, ${log.status}, ${log.error || null})
  `;
}

export async function clearLogs(): Promise<void> {
  if (!hasDb()) { mem.logs = []; return; }
  await ensureSchema();
  await sql`DELETE FROM send_logs`;
}

// ── App Settings ─────────────────────────────────────────────────────────────

const DEFAULT_SETTINGS: AppSettings = {
  fromName: process.env.GMAIL_FROM_NAME || "The HR Team",
  replyTo: "",
  autoSendEnabled: true,
  sendTimeIST: "09:00",
  sendTimeUTC: "03:30",
  cronExpression: "30 3 * * *",
  ccMode: "all",
  customCCList: [],
  bccOverride: true,
};

export async function getSettings(): Promise<AppSettings> {
  if (!hasDb()) return { ...DEFAULT_SETTINGS };
  await ensureSchema();
  const { rows } = await sql`SELECT value FROM kv_store WHERE key = 'bh:settings'`;
  if (!rows.length) return { ...DEFAULT_SETTINGS };
  try {
    return { ...DEFAULT_SETTINGS, ...JSON.parse(rows[0].value as string) };
  } catch {
    return { ...DEFAULT_SETTINGS };
  }
}

export async function saveSettings(settings: AppSettings): Promise<void> {
  const value = JSON.stringify(settings);
  if (!hasDb()) return;
  await ensureSchema();
  await sql`
    INSERT INTO kv_store (key, value) VALUES ('bh:settings', ${value})
    ON CONFLICT (key) DO UPDATE SET value = EXCLUDED.value
  `;
}

// ── Helpers ──────────────────────────────────────────────────────────────────

export function todayMMDD(): string {
  const n = new Date();
  const m = String(n.getMonth() + 1).padStart(2, "0");
  const d = String(n.getDate()).padStart(2, "0");
  return `${m}-${d}`;
}

export function alreadySentThisYear(logs: SendLog[], employeeId: string): boolean {
  const year = new Date().getFullYear();
  return logs.some(
    (l) => l.employeeId === employeeId && l.year === year && l.status === "sent"
  );
}

// ── Scheduled Sends ──────────────────────────────────────────────────────────

function rowToScheduledSend(row: Record<string, unknown>): ScheduledSend {
  let cc: string[] = [];
  try { cc = JSON.parse((row.cc as string) || "[]"); } catch { cc = []; }
  return {
    id:               row.id as string,
    employeeId:       row.employee_id as string,
    employeeName:     row.employee_name as string,
    employeeEmail:    row.employee_email as string,
    message:          (row.message as string) || "",
    gmailUser:        (row.gmail_user as string) || "",
    gmailAppPassword: (row.gmail_app_password as string) || "",
    fromName:         (row.from_name as string) || "The HR Team",
    cc,
    ccBehavior:       ((row.cc_behavior as string) || "cc") as ScheduledSend["ccBehavior"],
    mood:             (row.mood as string) || "Sunny",
    fuel:             (row.fuel as string) || "Coffee",
    heroImageUrl:     (row.hero_image_url as string) || undefined,
    paletteId:        (row.palette_id as string) || undefined,
    scheduledAt:      row.scheduled_at as string,
    status:           row.status as ScheduledSend["status"],
    createdAt:        (row.created_at as string) || new Date().toISOString(),
    sentAt:           (row.sent_at as string) || undefined,
  };
}

export async function createScheduledSend(job: ScheduledSend): Promise<void> {
  const ccJson = JSON.stringify(job.cc || []);
  const ccBehavior = job.ccBehavior || "cc";
  if (!hasDb()) { mem.scheduled.push(job); return; }
  await ensureSchema();
  await sql`
    INSERT INTO scheduled_sends
      (id, employee_id, employee_name, employee_email, message,
       gmail_user, gmail_app_password, from_name, cc, cc_behavior,
       mood, fuel, hero_image_url, palette_id,
       scheduled_at, status, created_at)
    VALUES
      (${job.id}, ${job.employeeId}, ${job.employeeName}, ${job.employeeEmail},
       ${job.message}, ${job.gmailUser}, ${job.gmailAppPassword}, ${job.fromName},
       ${ccJson}, ${ccBehavior}, ${job.mood}, ${job.fuel},
       ${job.heroImageUrl || null}, ${job.paletteId || null},
       ${job.scheduledAt}, 'pending', ${job.createdAt})
  `;
}

export async function getScheduledSends(status = "pending"): Promise<ScheduledSend[]> {
  if (!hasDb()) return mem.scheduled.filter((s) => s.status === status);
  await ensureSchema();
  const { rows } = await sql`
    SELECT * FROM scheduled_sends WHERE status = ${status} ORDER BY scheduled_at ASC
  `;
  return rows.map(rowToScheduledSend);
}

export async function getScheduledSend(id: string): Promise<ScheduledSend | null> {
  if (!hasDb()) return mem.scheduled.find((s) => s.id === id) ?? null;
  await ensureSchema();
  const { rows } = await sql`SELECT * FROM scheduled_sends WHERE id = ${id}`;
  return rows.length ? rowToScheduledSend(rows[0]) : null;
}

export async function updateScheduledSendStatus(
  id: string,
  status: ScheduledSend["status"],
  sentAt?: string
): Promise<void> {
  if (!hasDb()) {
    const j = mem.scheduled.find((s) => s.id === id);
    if (j) { j.status = status; if (sentAt) j.sentAt = sentAt; }
    return;
  }
  await ensureSchema();
  await sql`
    UPDATE scheduled_sends SET status = ${status}, sent_at = ${sentAt || null} WHERE id = ${id}
  `;
}

/** Returns all pending jobs whose scheduledAt is at or before now. */
export async function getDueScheduledSends(): Promise<ScheduledSend[]> {
  const now = new Date().toISOString();
  if (!hasDb()) {
    return mem.scheduled.filter((s) => s.status === "pending" && s.scheduledAt <= now);
  }
  await ensureSchema();
  const { rows } = await sql`
    SELECT * FROM scheduled_sends
    WHERE status = 'pending' AND scheduled_at <= ${now}
    ORDER BY scheduled_at ASC
  `;
  return rows.map(rowToScheduledSend);
}
