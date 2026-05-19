import { put, list } from "@vercel/blob";
import type { Employee, SendLog } from "./types";

const EMP_BLOB = "bh-employees.json";
const LOG_BLOB = "bh-logs.json";

// In-memory fallback for local dev without a Blob token.
const memStore: Record<string, unknown> = {};

function hasBlobToken(): boolean {
  return !!process.env.BLOB_READ_WRITE_TOKEN;
}

// With addRandomSuffix: false the URL is deterministic:
// https://<storeId>.public.blob.vercel-storage.com/<pathname>
// The store ID is the segment between "vercel_blob_rw_" and the next "_".
function blobUrl(pathname: string): string {
  const token = process.env.BLOB_READ_WRITE_TOKEN!;
  const storeId = token.match(/^vercel_blob_rw_([^_]+)_/)?.[1];
  if (!storeId) throw new Error("Cannot parse store ID from BLOB_READ_WRITE_TOKEN");
  return `https://${storeId}.public.blob.vercel-storage.com/${pathname}`;
}

async function blobRead<T>(pathname: string): Promise<T | null> {
  if (!hasBlobToken()) {
    return (memStore[pathname] as T) ?? null;
  }

  const url = blobUrl(pathname);
  const res = await fetch(url, { cache: "no-store" });
  if (res.status === 404) return null;
  if (!res.ok) throw new Error(`Blob read failed: ${res.status} ${url}`);
  return (await res.json()) as T;
}

async function blobWrite(pathname: string, value: unknown): Promise<void> {
  if (!hasBlobToken()) {
    memStore[pathname] = value;
    return;
  }

  await put(pathname, JSON.stringify(value), {
    access: "public",
    addRandomSuffix: false,
    contentType: "application/json",
    cacheControlMaxAge: 0,
  });
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
