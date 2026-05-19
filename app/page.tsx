"use client";
import { useState, useEffect, useCallback } from "react";
import type { Employee, SendLog } from "@/lib/types";
import Dashboard from "@/components/Dashboard";
import TeamTab from "@/components/TeamTab";
import ComposeTab from "@/components/ComposeTab";
import ImportModal from "@/components/ImportModal";

type Tab = "dashboard" | "team" | "compose";

export default function Home() {
  const [tab, setTab] = useState<Tab>("dashboard");
  const [employees, setEmployees] = useState<Employee[]>([]);
  const [logs, setLogs] = useState<SendLog[]>([]);
  const [loading, setLoading] = useState(true);
  const [composeTarget, setComposeTarget] = useState<Employee | null>(null);
  const [showImport, setShowImport] = useState(false);

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

  async function handleAdd(data: Omit<Employee, "id" | "createdAt">) {
    await fetch("/api/employees", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });
    await fetchData();
  }

  async function handleEdit(id: string, data: Omit<Employee, "id" | "createdAt">) {
    await fetch(`/api/employees/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });
    await fetchData();
  }

  async function handleDelete(id: string) {
    await fetch(`/api/employees/${id}`, { method: "DELETE" });
    await fetchData();
  }

  function handleCompose(emp: Employee) {
    setComposeTarget(emp);
    setTab("compose");
  }

  const tabs: { key: Tab; label: string; icon: string }[] = [
    { key: "dashboard", label: "Dashboard", icon: "🏠" },
    { key: "team",      label: "Team",      icon: "👥" },
    { key: "compose",   label: "Compose",   icon: "✉️" },
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
            {new Date().toLocaleDateString(undefined, { weekday: "short", month: "short", day: "numeric" })}
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
              />
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
        Birthday Hub · Automated with ♥ and Claude AI
      </footer>
    </div>
  );
}
