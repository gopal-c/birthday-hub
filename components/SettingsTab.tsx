"use client";
import { useState, useEffect } from "react";
import type { AppSettings } from "@/lib/types";

const DEFAULT: AppSettings = {
  fromName: "The HR Team",
  replyTo: "",
  autoSendEnabled: true,
  ccBehavior: "cc",
};

function Toggle({ on, onToggle }: { on: boolean; onToggle: () => void }) {
  return (
    <div
      onClick={onToggle}
      className={`relative w-9 h-5 rounded-full transition-colors cursor-pointer flex-shrink-0 ${on ? "bg-[#2D1B69]" : "bg-gray-200"}`}
    >
      <span className={`absolute top-0.5 w-4 h-4 rounded-full bg-white shadow transition-transform ${on ? "translate-x-4" : "translate-x-0.5"}`} />
    </div>
  );
}

function SectionCard({ children, danger }: { children: React.ReactNode; danger?: boolean }) {
  return (
    <section className={`bg-white rounded-xl border p-5 ${danger ? "border-red-100" : "border-gray-100"}`}>
      {children}
    </section>
  );
}

function SectionHeader({ title, desc, danger }: { title: string; desc: string; danger?: boolean }) {
  return (
    <div className="mb-4">
      <h3 className={`text-sm font-semibold mb-0.5 ${danger ? "text-red-700" : "text-gray-800"}`}>{title}</h3>
      <p className="text-xs text-gray-400">{desc}</p>
    </div>
  );
}

function Skeleton() {
  return (
    <div className="space-y-4">
      {[1, 2, 3, 4].map((i) => (
        <div key={i} className="bg-white rounded-xl border border-gray-100 p-5 animate-pulse">
          <div className="h-4 bg-gray-100 rounded w-1/4 mb-1.5" />
          <div className="h-3 bg-gray-50 rounded w-2/3 mb-4" />
          <div className="h-9 bg-gray-100 rounded" />
        </div>
      ))}
    </div>
  );
}

const CC_OPTIONS: { value: AppSettings["ccBehavior"]; label: string; desc: string }[] = [
  { value: "cc",   label: "CC all team members",  desc: "Recipients can see each other's addresses" },
  { value: "bcc",  label: "BCC all team members", desc: "Recipients are hidden from each other"     },
  { value: "none", label: "No CC / BCC",           desc: "Email goes only to the birthday person"   },
];

export default function SettingsTab() {
  const [settings, setSettings] = useState<AppSettings>(DEFAULT);
  const [loading, setLoading]   = useState(true);
  const [saving, setSaving]     = useState(false);
  const [saved, setSaved]       = useState(false);
  const [confirmClear, setConfirmClear] = useState(false);
  const [clearing, setClearing]         = useState(false);

  useEffect(() => {
    fetch("/api/settings")
      .then((r) => r.json())
      .then((s: AppSettings) => { setSettings(s); setLoading(false); })
      .catch(() => setLoading(false));
  }, []);

  async function handleSave() {
    setSaving(true);
    try {
      const res = await fetch("/api/settings", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(settings),
      });
      if (res.ok) {
        setSaved(true);
        setTimeout(() => setSaved(false), 2000);
      }
    } catch { /* silent */ }
    setSaving(false);
  }

  async function handleClearLogs() {
    setClearing(true);
    try { await fetch("/api/logs", { method: "DELETE" }); } catch { /* silent */ }
    setConfirmClear(false);
    setClearing(false);
  }

  function set<K extends keyof AppSettings>(key: K, val: AppSettings[K]) {
    setSettings((s) => ({ ...s, [key]: val }));
  }

  if (loading) return <Skeleton />;

  return (
    <div className="space-y-4 max-w-2xl">

      {/* ── Sender Identity ── */}
      <SectionCard>
        <SectionHeader
          title="Sender Identity"
          desc="Displayed in the From line of all birthday emails."
        />
        <div className="grid grid-cols-2 gap-3">
          <div>
            <label className="text-xs font-medium text-gray-600 block mb-1.5">From Name</label>
            <input
              value={settings.fromName}
              onChange={(e) => set("fromName", e.target.value)}
              placeholder="The HR Team"
              className="w-full border border-gray-200 rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:border-[#2D1B69]/50"
            />
          </div>
          <div>
            <label className="text-xs font-medium text-gray-600 block mb-1.5">
              Reply-To Email{" "}
              <span className="font-normal text-gray-400">(optional)</span>
            </label>
            <input
              type="email"
              value={settings.replyTo}
              onChange={(e) => set("replyTo", e.target.value)}
              placeholder="hr@company.com"
              className="w-full border border-gray-200 rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:border-[#2D1B69]/50"
            />
          </div>
        </div>
      </SectionCard>

      {/* ── Auto-Send ── */}
      <SectionCard>
        <SectionHeader
          title="Auto-Send"
          desc="Controls the daily automated birthday email job."
        />
        <label className="flex items-start gap-3 cursor-pointer select-none mb-3.5">
          <Toggle
            on={settings.autoSendEnabled}
            onToggle={() => set("autoSendEnabled", !settings.autoSendEnabled)}
          />
          <div>
            <p className="text-sm font-medium text-gray-700 leading-tight">
              Automatically send birthday emails
            </p>
            {!settings.autoSendEnabled && (
              <p className="text-xs text-amber-600 mt-0.5">
                Auto-send is off — birthdays must be sent manually via Compose.
              </p>
            )}
          </div>
        </label>
        <p className="text-xs text-gray-400 bg-gray-50 rounded-lg px-3 py-2.5 leading-relaxed">
          Emails are sent daily at{" "}
          <span className="font-medium text-gray-600">8:00 AM UTC</span>. To
          change the time, update the schedule in{" "}
          <code className="font-mono bg-gray-100 px-1 rounded text-gray-500">
            vercel.json
          </code>
          .
        </p>
      </SectionCard>

      {/* ── CC Behavior ── */}
      <SectionCard>
        <SectionHeader
          title="CC Behavior"
          desc="How team members are included on automated birthday emails."
        />
        <div className="space-y-3 mb-3.5">
          {CC_OPTIONS.map((opt) => {
            const active = settings.ccBehavior === opt.value;
            return (
              <label
                key={opt.value}
                className="flex items-start gap-3 cursor-pointer group"
                onClick={() => set("ccBehavior", opt.value)}
              >
                <div
                  className={`mt-0.5 w-4 h-4 rounded-full border-2 flex items-center justify-center flex-shrink-0 transition-colors ${
                    active
                      ? "border-[#2D1B69] bg-[#2D1B69]"
                      : "border-gray-300 group-hover:border-[#2D1B69]/40"
                  }`}
                >
                  {active && <span className="w-1.5 h-1.5 rounded-full bg-white" />}
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-700 leading-tight">{opt.label}</p>
                  <p className="text-xs text-gray-400 mt-0.5">{opt.desc}</p>
                </div>
              </label>
            );
          })}
        </div>
        <p className="text-xs text-gray-400 bg-gray-50 rounded-lg px-3 py-2.5">
          Teams over 50 people are always BCCd regardless of this setting.
        </p>
      </SectionCard>

      {/* ── Danger Zone ── */}
      <SectionCard danger>
        <SectionHeader
          title="Danger Zone"
          desc="Destructive actions that cannot be undone."
          danger
        />
        <div className="flex items-center justify-between gap-4">
          <div>
            <p className="text-sm font-medium text-gray-700">Clear all send logs</p>
            <p className="text-xs text-gray-400 mt-0.5">
              Removes the history of all sent and failed emails. This also resets
              the "already sent this year" guard.
            </p>
          </div>
          {confirmClear ? (
            <div className="flex gap-2 flex-shrink-0">
              <button
                onClick={() => setConfirmClear(false)}
                className="px-3 py-1.5 text-xs border border-gray-200 rounded-lg hover:bg-gray-50"
              >
                Cancel
              </button>
              <button
                onClick={handleClearLogs}
                disabled={clearing}
                className="px-3 py-1.5 text-xs text-white bg-red-500 hover:bg-red-600 rounded-lg disabled:opacity-40"
              >
                {clearing ? "Clearing…" : "Yes, clear all"}
              </button>
            </div>
          ) : (
            <button
              onClick={() => setConfirmClear(true)}
              className="flex-shrink-0 px-4 py-2 text-xs text-red-600 border border-red-200 rounded-lg hover:bg-red-50 transition-colors"
            >
              Clear Logs
            </button>
          )}
        </div>
      </SectionCard>

      {/* ── Save ── */}
      <div className="flex justify-end pt-1">
        <button
          onClick={handleSave}
          disabled={saving}
          className={`px-6 py-2.5 text-sm font-medium text-white rounded-lg disabled:opacity-40 transition-colors flex items-center gap-2 ${
            saved ? "bg-teal-600" : "bg-[#2D1B69] hover:bg-[#3d2580]"
          }`}
        >
          {saving ? "Saving…" : saved ? "✓ Saved" : "Save Settings"}
        </button>
      </div>
    </div>
  );
}
