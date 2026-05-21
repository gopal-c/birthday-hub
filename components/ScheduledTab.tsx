"use client";
import { useState, useEffect, useCallback } from "react";
import type { ScheduledSend } from "@/lib/types";

interface Props {
  refreshKey?: number;
}

function fmtDatetime(iso: string): string {
  return new Date(iso).toLocaleString("en-US", {
    weekday: "short", month: "short", day: "numeric",
    hour: "numeric", minute: "2-digit", hour12: true,
  });
}

export default function ScheduledTab({ refreshKey = 0 }: Props) {
  const [jobs, setJobs]     = useState<ScheduledSend[]>([]);
  const [loading, setLoading] = useState(true);
  const [cancelling, setCancelling] = useState<string | null>(null);

  const fetchJobs = useCallback(async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/schedule");
      if (res.ok) setJobs(await res.json());
    } catch { /* silent */ }
    setLoading(false);
  }, []);

  useEffect(() => { fetchJobs(); }, [fetchJobs, refreshKey]);

  async function handleCancel(id: string) {
    setCancelling(id);
    try {
      const res = await fetch(`/api/schedule/${id}`, { method: "DELETE" });
      if (res.ok) setJobs((prev) => prev.filter((j) => j.id !== id));
    } catch { /* silent */ }
    setCancelling(null);
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center py-24 gap-3">
        <span className="spin text-2xl">⏰</span>
        <p className="text-sm text-gray-500">Loading scheduled sends…</p>
      </div>
    );
  }

  if (jobs.length === 0) {
    return (
      <div className="bg-white rounded-xl border border-gray-100 p-12 text-center">
        <p className="text-4xl mb-3">⏰</p>
        <p className="text-sm font-medium text-gray-600 mb-1">No scheduled sends</p>
        <p className="text-xs text-gray-400">
          Use the Compose tab and toggle "Schedule Send" to queue an email for a future date.
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="text-sm font-semibold text-gray-700">
          Pending scheduled sends
          <span className="ml-2 px-2 py-0.5 rounded-full text-xs font-medium bg-[#EEEDFE] text-[#2D1B69]">
            {jobs.length}
          </span>
        </h2>
        <button
          onClick={fetchJobs}
          className="text-xs text-gray-400 hover:text-gray-600 border border-gray-200 rounded-lg px-3 py-1.5 hover:bg-gray-50"
        >
          ↻ Refresh
        </button>
      </div>

      <div className="bg-white rounded-xl border border-gray-100 overflow-hidden">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-gray-100 bg-gray-50">
              <th className="text-left px-5 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wide">Recipient</th>
              <th className="text-left px-5 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wide">Scheduled for</th>
              <th className="text-left px-5 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wide">From</th>
              <th className="text-left px-5 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wide">CC</th>
              <th className="px-5 py-3" />
            </tr>
          </thead>
          <tbody>
            {jobs.map((job, i) => (
              <tr
                key={job.id}
                className={`border-b border-gray-50 last:border-0 hover:bg-gray-50/50 transition-colors ${
                  i % 2 === 0 ? "" : "bg-gray-50/30"
                }`}
              >
                {/* Recipient */}
                <td className="px-5 py-4">
                  <div className="font-medium text-gray-800">{job.employeeName}</div>
                  <div className="text-xs text-gray-400 mt-0.5">{job.employeeEmail}</div>
                </td>

                {/* Scheduled time */}
                <td className="px-5 py-4">
                  <div className="flex items-center gap-1.5 text-gray-700">
                    <span className="text-base leading-none">⏰</span>
                    {fmtDatetime(job.scheduledAt)}
                  </div>
                  <div className="text-xs text-gray-400 mt-0.5">
                    {(() => {
                      const diff = new Date(job.scheduledAt).getTime() - Date.now();
                      if (diff < 0) return "Due now";
                      const h = Math.floor(diff / 3600000);
                      const d = Math.floor(h / 24);
                      return d > 0 ? `in ${d}d ${h % 24}h` : `in ${h}h`;
                    })()}
                  </div>
                </td>

                {/* From */}
                <td className="px-5 py-4">
                  <div className="text-gray-700">{job.fromName}</div>
                  <div className="text-xs text-gray-400 mt-0.5 truncate max-w-[140px]">{job.gmailUser}</div>
                </td>

                {/* CC count */}
                <td className="px-5 py-4">
                  {job.cc?.length > 0 ? (
                    <span className="inline-block bg-[#EEEDFE] text-[#2D1B69] text-xs font-medium px-2 py-0.5 rounded-full">
                      +{job.cc.length}
                    </span>
                  ) : (
                    <span className="text-xs text-gray-300">—</span>
                  )}
                </td>

                {/* Cancel */}
                <td className="px-5 py-4 text-right">
                  <button
                    onClick={() => handleCancel(job.id)}
                    disabled={cancelling === job.id}
                    className="text-xs text-red-400 hover:text-red-600 border border-red-100 hover:border-red-200 rounded-lg px-3 py-1.5 hover:bg-red-50 transition-colors disabled:opacity-40"
                  >
                    {cancelling === job.id ? "Cancelling…" : "Cancel"}
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
