"use client";
import type { Employee, SendLog } from "@/lib/types";

const DEPT_COLORS: Record<string, { bg: string; text: string }> = {
  Engineering: { bg: "#EEEDFE", text: "#2D1B69" },
  Marketing:   { bg: "#FAECE7", text: "#993C1D" },
  Design:      { bg: "#E1F5EE", text: "#0F6E56" },
  Sales:       { bg: "#FAEEDA", text: "#854F0B" },
  HR:          { bg: "#FBEAF0", text: "#993556" },
  Finance:     { bg: "#E6F1FB", text: "#185FA5" },
  Product:     { bg: "#EAF3DE", text: "#3B6D11" },
};
const DEFAULT_COLOR = { bg: "#F1EFE8", text: "#5F5E5A" };

function deptColor(dept: string) {
  return DEPT_COLORS[dept] || DEFAULT_COLOR;
}
function initials(name: string) {
  return name.split(" ").map((w) => w[0]).join("").slice(0, 2).toUpperCase();
}
function fmtBirthday(mmdd: string) {
  const [m, d] = mmdd.split("-");
  const months = ["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"];
  return `${months[parseInt(m) - 1]} ${parseInt(d)}`;
}
function daysUntil(mmdd: string): number {
  const today = new Date(); today.setHours(0, 0, 0, 0);
  const [m, d] = mmdd.split("-");
  const next = new Date(today.getFullYear(), parseInt(m) - 1, parseInt(d));
  if (next < today) next.setFullYear(today.getFullYear() + 1);
  return Math.round((next.getTime() - today.getTime()) / (1000 * 60 * 60 * 24));
}
function todayMMDD() {
  const n = new Date();
  return String(n.getMonth() + 1).padStart(2, "0") + "-" + String(n.getDate()).padStart(2, "0");
}
function currentMonth() {
  return String(new Date().getMonth() + 1).padStart(2, "0");
}

interface Props {
  employees: Employee[];
  logs: SendLog[];
  onCompose: (emp: Employee) => void;
}

export default function Dashboard({ employees, logs, onCompose }: Props) {
  const today = todayMMDD();
  const month = currentMonth();

  const todayBdays  = employees.filter((e) => e.birthday === today);
  const upcoming    = employees
    .filter((e) => e.birthday !== today)
    .map((e) => ({ ...e, days: daysUntil(e.birthday) }))
    .sort((a, b) => a.days - b.days)
    .slice(0, 6);

  const thisMonthCount = employees.filter((e) => e.birthday.startsWith(month)).length;
  const sentThisYear   = logs.filter((l) => l.year === new Date().getFullYear() && l.status === "sent").length;
  const recentLogs     = logs.slice(0, 5);

  return (
    <div className="space-y-6">
      {/* Stat row */}
      <div className="grid grid-cols-3 gap-4">
        {[
          { label: "Team Members", value: employees.length, icon: "👥" },
          { label: "This Month",   value: thisMonthCount,    icon: "📅" },
          { label: "Sent This Year",value: sentThisYear,    icon: "✉️" },
        ].map(({ label, value, icon }) => (
          <div key={label} className="bg-white rounded-xl border border-gray-100 p-4">
            <p className="text-xs text-gray-500 flex items-center gap-1.5"><span>{icon}</span>{label}</p>
            <p className="text-2xl font-semibold text-gray-900 mt-1">{value}</p>
          </div>
        ))}
      </div>

      {/* Today's birthdays */}
      {todayBdays.length > 0 && (
        <div className="rounded-2xl overflow-hidden" style={{ background: "linear-gradient(135deg,#2D1B69 0%,#4a2d9c 100%)" }}>
          <div className="px-6 pt-5 pb-1">
            <p className="text-xs text-white/60 tracking-widest uppercase font-medium">🎉 Today&apos;s Celebrations</p>
          </div>
          <div className="px-6 pb-5 space-y-4 mt-2">
            {todayBdays.map((e) => {
              const c = deptColor(e.department);
              const alreadySent = logs.some(
                (l) => l.employeeId === e.id && l.year === new Date().getFullYear() && l.status === "sent"
              );
              return (
                <div key={e.id} className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full flex items-center justify-center text-sm font-semibold flex-shrink-0"
                      style={{ background: "rgba(255,255,255,0.15)", color: "#fff" }}>
                      {initials(e.name)}
                    </div>
                    <div>
                      <p className="text-white font-medium text-sm">{e.name}</p>
                      <p className="text-white/60 text-xs">{e.department}</p>
                    </div>
                  </div>
                  {alreadySent ? (
                    <span className="text-xs bg-white/10 text-white/70 px-3 py-1.5 rounded-full">✓ Sent</span>
                  ) : (
                    <button
                      onClick={() => onCompose(e)}
                      className="text-xs bg-[#FFC23E] text-[#2D1B69] font-semibold px-4 py-1.5 rounded-full hover:bg-[#ffd060] transition-colors"
                    >
                      ✉ Send Wishes
                    </button>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      )}

      {todayBdays.length === 0 && (
        <div className="bg-white rounded-xl border border-gray-100 p-5 text-center">
          <p className="text-2xl mb-2">🗓</p>
          <p className="text-sm text-gray-500">No birthdays today — but some are coming up!</p>
        </div>
      )}

      {/* Upcoming */}
      <div>
        <h3 className="text-xs font-semibold text-gray-400 tracking-widest uppercase mb-3">Upcoming Birthdays</h3>
        <div className="bg-white rounded-xl border border-gray-100 divide-y divide-gray-50">
          {upcoming.length === 0 && (
            <p className="text-sm text-gray-400 text-center py-8">No team members added yet.</p>
          )}
          {upcoming.map((e) => {
            const c = deptColor(e.department);
            return (
              <div key={e.id}
                className="flex items-center gap-3 px-4 py-3 hover:bg-gray-50/80 cursor-pointer transition-colors"
                onClick={() => onCompose(e)}>
                <div className="w-9 h-9 rounded-full flex items-center justify-center text-xs font-semibold flex-shrink-0"
                  style={{ background: c.bg, color: c.text }}>
                  {initials(e.name)}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-gray-800 truncate">{e.name}</p>
                  <p className="text-xs text-gray-400">{e.department || "—"}</p>
                </div>
                <div className="text-right flex-shrink-0">
                  <p className="text-sm font-medium text-gray-700">{fmtBirthday(e.birthday)}</p>
                  <p className="text-xs text-gray-400">
                    {e.days === 1 ? "tomorrow" : `in ${e.days} days`}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Recent logs */}
      {recentLogs.length > 0 && (
        <div>
          <h3 className="text-xs font-semibold text-gray-400 tracking-widest uppercase mb-3">Recent Emails</h3>
          <div className="bg-white rounded-xl border border-gray-100 divide-y divide-gray-50">
            {recentLogs.map((log) => (
              <div key={log.id} className="flex items-center gap-3 px-4 py-3">
                <span className="text-sm">{log.status === "sent" ? "✅" : "❌"}</span>
                <div className="flex-1 min-w-0">
                  <p className="text-sm text-gray-700 truncate">{log.employeeName}</p>
                  <p className="text-xs text-gray-400">{new Date(log.sentAt).toLocaleDateString(undefined, { month: "short", day: "numeric", year: "numeric" })}</p>
                </div>
                <span className={`text-xs px-2 py-0.5 rounded-full ${log.status === "sent" ? "bg-teal-50 text-teal-700" : "bg-red-50 text-red-600"}`}>
                  {log.status}
                </span>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
