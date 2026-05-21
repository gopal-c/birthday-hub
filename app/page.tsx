"use client";
import { useState, useEffect, useCallback, useRef } from "react";
import type { Employee, SendLog, ScheduledSend } from "@/lib/types";
import Dashboard from "@/components/Dashboard";
import TeamTab from "@/components/TeamTab";
import ComposeTab from "@/components/ComposeTab";
import ScheduledTab from "@/components/ScheduledTab";
import SettingsTab from "@/components/SettingsTab";
import ImportModal from "@/components/ImportModal";

type Tab = "dashboard" | "team" | "compose" | "scheduled" | "settings";

export default function Home() {
  const [tab, setTab] = useState<Tab>("dashboard");
  const [employees, setEmployees] = useState<Employee[]>([]);
  const [logs, setLogs] = useState<SendLog[]>([]);
  const [loading, setLoading] = useState(true);
  const [composeTarget, setComposeTarget] = useState<Employee | null>(null);
  const [showImport, setShowImport] = useState(false);
  const [scheduledRefreshKey, setScheduledRefreshKey] = useState(0);
  const [toasts, setToasts] = useState<{ id: string; text: string }[]>([]);
  const checkingRef = useRef(false);

  function addToast(text: string) {
    const id = Math.random().toString(36).slice(2);
    setToasts((prev) => [...prev, { id, text }]);
    setTimeout(() => setToasts((prev) => prev.filter((t) => t.id !== id)), 5000);
  }

  const checkScheduled = useCallback(async () => {
    if (checkingRef.current) return;
    checkingRef.current = true;
    try {
      const res = await fetch("/api/schedule/due");
      if (!res.ok) return;
      const due: ScheduledSend[] = await res.json();
      if (due.length === 0) return;

      let sentCount = 0;
      await Promise.all(
        due.map(async (job) => {
          try {
            const sendRes = await fetch("/api/send", {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({
                employeeId: job.employeeId,
                message: job.message,
                gmailUser: job.gmailUser,
                gmailAppPassword: job.gmailAppPassword,
                fromName: job.fromName,
                mood: job.mood,
                fuel: job.fuel,
                heroImageUrl: job.heroImageUrl,
                paletteId: job.paletteId,
                cc: job.cc,
                ccBehavior: job.ccBehavior || "cc",
                scheduledJobId: job.id,
              }),
            });
            if (sendRes.ok) {
              addToast(`✅ Scheduled email sent to ${job.employeeName}`);
              sentCount++;
            }
          } catch {
            /* silent — cron will retry */
          }
        })
      );

      if (sentCount > 0) {
        setScheduledRefreshKey((k) => k + 1);
      }
    } catch {
      /* silent */
    } finally {
      checkingRef.current = false;
    }
  }, []);

  const fetchData = useCallback(async () => {
    const [empRes, logRes] = await Promise.all([
      fetch("/api/employees"),
      fetch("/api/logs"),
    ]);
    setEmployees(await empRes.json());
    setLogs(await logRes.json());
    setLoading(false);
  }, []);

  useEffect(() => { fetchData(); }, [fetchData]);

  // Check for due scheduled sends on mount and whenever the tab regains focus
  useEffect(() => {
    checkScheduled();
    window.addEventListener("focus", checkScheduled);
    return () => window.removeEventListener("focus", checkScheduled);
  }, [checkScheduled]);

  async function handleAdd(data: Omit<Employee, "id" | "createdAt">) {
    const res = await fetch("/api/employees", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });
    if (!res.ok) { alert(`Failed to add employee: ${res.status} ${await res.text()}`); return; }
    const created: Employee = await res.json();
    setEmployees((prev) => [...prev, created]);
  }

  async function handleEdit(id: string, data: Omit<Employee, "id" | "createdAt">) {
    const res = await fetch(`/api/employees/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });
    if (!res.ok) { alert(`Failed to update employee: ${res.status} ${await res.text()}`); return; }
    const updated: Employee = await res.json();
    setEmployees((prev) => prev.map((e) => e.id === id ? updated : e));
  }

  async function handleDelete(id: string) {
    const res = await fetch(`/api/employees/${id}`, { method: "DELETE" });
    if (!res.ok) { alert(`Failed to delete employee: ${res.status} ${await res.text()}`); return; }
    setEmployees((prev) => prev.filter((e) => e.id !== id));
  }

  function handleCompose(emp: Employee) {
    setComposeTarget(emp);
    setTab("compose");
  }

  const tabs: { key: Tab; label: string; icon: string }[] = [
    { key: "dashboard", label: "Dashboard", icon: "🏠" },
    { key: "team",      label: "Team",      icon: "👥" },
    { key: "compose",   label: "Compose",   icon: "✉️" },
    { key: "scheduled", label: "Scheduled", icon: "⏰" },
    { key: "settings",  label: "Settings",  icon: "⚙️" },
  ];

  const todayCount = employees.filter((e) => {
    const n = new Date();
    const today = String(n.getMonth() + 1).padStart(2, "0") + "-" + String(n.getDate()).padStart(2, "0");
    return e.birthday === today;
  }).length;

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Top nav */}
      <header className="bg-white border-b border-gray-100 sticky top-0 z-40">
        <div className="max-w-3xl mx-auto px-6 h-14 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg flex items-center justify-center text-base"
              style={{ background: "#2D1B69" }}>
              🎂
            </div>
            <span className="font-semibold text-gray-900 text-sm">Birthday Hub</span>
          </div>

          {/* Tabs */}
          <nav className="flex items-center gap-1 bg-gray-100 rounded-full p-1">
            {tabs.map(({ key, label, icon }) => (
              <button
                key={key}
                onClick={() => { setTab(key); if (key !== "compose") setComposeTarget(null); }}
                className={`flex items-center gap-1.5 px-4 py-1.5 rounded-full text-sm font-medium transition-all ${
                  tab === key
                    ? "bg-white text-gray-900 shadow-sm"
                    : "text-gray-500 hover:text-gray-800"
                }`}
              >
                <span>{icon}</span>
                {label}
                {key === "dashboard" && todayCount > 0 && (
                  <span className="w-4 h-4 rounded-full text-white text-[10px] flex items-center justify-center font-semibold"
                    style={{ background: "#EF9F27" }}>
                    {todayCount}
                  </span>
                )}
              </button>
            ))}
          </nav>

          <div className="text-xs text-gray-400">
            {new Date().toLocaleDateString("en-US", { weekday: "short", month: "short", day: "numeric" })}
          </div>
        </div>
      </header>

      {/* Main content */}
      <main className="max-w-3xl mx-auto px-6 py-8">
        {loading ? (
          <div className="flex items-center justify-center py-24 gap-3">
            <span className="spin text-2xl">🎂</span>
            <p className="text-sm text-gray-500">Loading Birthday Hub…</p>
          </div>
        ) : (
          <>
            {tab === "dashboard" && (
              <Dashboard employees={employees} logs={logs} onCompose={handleCompose} />
            )}
            {tab === "team" && (
              <TeamTab
                employees={employees}
                onAdd={handleAdd}
                onEdit={handleEdit}
                onDelete={handleDelete}
                onImport={() => setShowImport(true)}
                onCompose={handleCompose}
              />
            )}
            {tab === "compose" && (
              <ComposeTab
                employees={employees}
                initialEmployee={composeTarget}
                onSent={fetchData}
                onScheduled={() => {
                  setScheduledRefreshKey((k) => k + 1);
                  setTab("scheduled");
                }}
              />
            )}
            {tab === "scheduled" && (
              <ScheduledTab refreshKey={scheduledRefreshKey} />
            )}
            {tab === "settings" && (
              <SettingsTab />
            )}
          </>
        )}
      </main>

      {/* Import modal */}
      {showImport && (
        <ImportModal
          onClose={() => setShowImport(false)}
          onImported={async (count) => {
            await fetchData();
            setShowImport(false);
          }}
        />
      )}

      {/* Footer */}
      <footer className="text-center py-6 text-xs text-gray-300">
        Birthday Hub · Automated with ♥ Design Team
      </footer>

      {/* Toast notifications */}
      {toasts.length > 0 && (
        <div className="fixed bottom-6 right-6 z-50 flex flex-col gap-2">
          {toasts.map((t) => (
            <div
              key={t.id}
              className="bg-gray-900 text-white text-sm px-4 py-3 rounded-xl shadow-lg flex items-center gap-2.5 animate-fade-in"
            >
              {t.text}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
