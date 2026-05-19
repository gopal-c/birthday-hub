import type { Employee, SendLog } from "./types";

// ── In-memory fallback for local dev without KV ──────────────────────────────
const mem: Record<string, unknown> = {};

async function kvGet<T>(key: string): Promise<T | null> {
  if (
    process.env.KV_REST_API_URL &&
    process.env.KV_REST_API_TOKEN
  ) {
    const { kv } = await import("@vercel/kv");
    return kv.get<T>(key);
  }
  return (mem[key] as T) ?? null;
}

async function kvSet(key: string, value: unknown): Promise<void> {
  if (
    process.env.KV_REST_API_URL &&
    process.env.KV_REST_API_TOKEN
  ) {
    const { kv } = await import("@vercel/kv");
    await kv.set(key, value);
    return;
  }
  mem[key] = value;
}

// ── Employees ────────────────────────────────────────────────────────────────
const EMP_KEY = "bh:employees";

export async function getEmployees(): Promise<Employee[]> {
  const data = await kvGet<Employee[]>(EMP_KEY);
  return data ?? [];
}

export async function saveEmployees(employees: Employee[]): Promise<void> {
  await kvSet(EMP_KEY, employees);
}

export async function getEmployee(id: string): Promise<Employee | null> {
  const all = await getEmployees();
  return all.find((e) => e.id === id) ?? null;
}

export async function upsertEmployee(employee: Employee): Promise<void> {
  const all = await getEmployees();
  const idx = all.findIndex((e) => e.id === employee.id);
  if (idx >= 0) all[idx] = employee;
  else all.push(employee);
  await saveEmployees(all);
}

export async function deleteEmployee(id: string): Promise<void> {
  const all = await getEmployees();
  await saveEmployees(all.filter((e) => e.id !== id));
}

// ── Send Logs ────────────────────────────────────────────────────────────────
const LOG_KEY = "bh:logs";

export async function getLogs(): Promise<SendLog[]> {
  const data = await kvGet<SendLog[]>(LOG_KEY);
  return data ?? [];
}

export async function appendLog(log: SendLog): Promise<void> {
  const all = await getLogs();
  all.unshift(log); // newest first
  await kvSet(LOG_KEY, all.slice(0, 200)); // keep last 200
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
