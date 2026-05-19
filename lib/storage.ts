import type { Employee, SendLog } from "./types";

const EMP_BLOB = "bh-employees.json";
const LOG_BLOB = "bh-logs.json";

// In-memory URL cache: pathname → public blob URL.
// Populated on first write; on cache miss we list once to find the URL.
const urlCache: Record<string, string> = {};

// In-memory fallback for local dev without a Blob token.
const memStore: Record<string, unknown> = {};

function hasBlobToken(): boolean {
  return !!process.env.BLOB_READ_WRITE_TOKEN;
}

async function blobRead<T>(pathname: string): Promise<T | null> {
  if (!hasBlobToken()) {
    return (memStore[pathname] as T) ?? null;
  }

  let url = urlCache[pathname];

  if (!url) {
    const { list } = await import("@vercel/blob");
    const { blobs } = await list({ prefix: pathname });
    const match = blobs.find((b) => b.pathname === pathname);
    if (!match) return null;
    url = match.url;
    urlCache[pathname] = url;
  }

  try {
    const res = await fetch(url, { cache: "no-store" });
    if (!res.ok) return null;
    return (await res.json()) as T;
  } catch {
    return null;
  }
}

async function blobWrite(pathname: string, value: unknown): Promise<void> {
  if (!hasBlobToken()) {
    memStore[pathname] = value;
    return;
  }

  const { put } = await import("@vercel/blob");
  const result = await put(pathname, JSON.stringify(value), {
    access: "public",
    addRandomSuffix: false,
    contentType: "application/json",
  });
  urlCache[pathname] = result.url;
}

// ── Employees ────────────────────────────────────────────────────────────────

export async function getEmployees(): Promise<Employee[]> {
  return (await blobRead<Employee[]>(EMP_BLOB)) ?? [];
}

export async function saveEmployees(employees: Employee[]): Promise<void> {
  await blobWrite(EMP_BLOB, employees);
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

export async function getLogs(): Promise<SendLog[]> {
  return (await blobRead<SendLog[]>(LOG_BLOB)) ?? [];
}

export async function appendLog(log: SendLog): Promise<void> {
  const all = await getLogs();
  all.unshift(log); // newest first
  await blobWrite(LOG_BLOB, all.slice(0, 200)); // keep last 200
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
