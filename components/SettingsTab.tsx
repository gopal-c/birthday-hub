"use client";
import { useState, useEffect } from "react";
import type { AppSettings } from "@/lib/types";

// ── IST ↔ UTC helpers ─────────────────────────────────────────────────────────

function istToUtc(ist: string): { utc: string; cron: string } {
  const [h, m] = ist.split(":").map(Number);
  let mins = h * 60 + m - (5 * 60 + 30); // subtract IST offset (UTC+5:30)
  mins = ((mins % 1440) + 1440) % 1440;   // keep in [0, 1440)
  const utcH = Math.floor(mins / 60);
  const utcM = mins % 60;
  const utc  = `${String(utcH).padStart(2, "0")}:${String(utcM).padStart(2, "0")}`;
  const cron = `${utcM} ${utcH} * * *`;
  return { utc, cron };
}

// ── Defaults ──────────────────────────────────────────────────────────────────

const DEFAULT: AppSettings = {
  fromName: "The HR Team",
  replyTo: "",
  autoSendEnabled: true,
  sendTimeIST: "09:00",
  sendTimeUTC: "03:30",
  cronExpression: "30 3 * * *",
  ccMode: "all",
  customCCList: [],
  bccOverride: true,
};

// ── Sub-components ────────────────────────────────────────────────────────────

function Toggle({ on, onToggle }: { on: boolean; onToggle: () => void }) {
  return (
    <div
      onClick={onToggle}
      className={`relative w-9 h-5 rounded-full transition-colors cursor-pointer flex-shrink-0 ${
        on ? "bg-[#2D1B69]" : "bg-gray-200"
      }`}
    >
      <span
        className={`absolute top-0.5 w-4 h-4 rounded-full bg-white shadow transition-transform ${
          on ? "translate-x-4" : "translate-x-0.5"
        }`}
      />
    </div>
  );
}

function SectionCard({ children, danger }: { children: React.ReactNode; danger?: boolean }) {
  return (
    <section
      className={`bg-white rounded-xl border p-5 ${
        danger ? "border-red-100" : "border-gray-100"
      }`}
    >
      {children}
    </section>
  );
}

function SectionHeader({
  title,
  desc,
  danger,
}: {
  title: string;
  desc: string;
  danger?: boolean;
}) {
  return (
    <div className="mb-4">
      <h3
        className={`text-sm font-semibold mb-0.5 ${
          danger ? "text-red-700" : "text-gray-800"
        }`}
      >
        {title}
      </h3>
      <p className="text-xs text-gray-400">{desc}</p>
    </div>
  );
}

function InfoBox({ children }: { children: React.ReactNode }) {
  return (
    <p className="text-xs text-gray-400 bg-gray-50 rounded-lg px-3 py-2.5 leading-relaxed">
      {children}
    </p>
  );
}

function Skeleton() {
  return (
    <div className="space-y-4">
      {[1, 2, 3, 4].map((i) => (
        <div
          key={i}
          className="bg-white rounded-xl border border-gray-100 p-5 animate-pulse"
        >
          <div className="h-4 bg-gray-100 rounded w-1/4 mb-1.5" />
          <div className="h-3 bg-gray-50 rounded w-2/3 mb-4" />
          <div className="h-9 bg-gray-100 rounded" />
        </div>
      ))}
    </div>
  );
}

// ── Main component ────────────────────────────────────────────────────────────

export default function SettingsTab() {
  const [settings, setSettings] = useState<AppSettings>(DEFAULT);
  const [loading, setLoading]   = useState(true);
  const [saving, setSaving]     = useState(false);
  const [saved, setSaved]       = useState(false);
  const [confirmClear, setConfirmClear] = useState(false);
  const [clearing, setClearing]         = useState(false);
  const [newCCEmail, setNewCCEmail]     = useState("");
  const [copiedCron, setCopiedCron]     = useState(false);

  useEffect(() => {
    fetch("/api/settings")
      .then((r) => r.json())
      .then((s: AppSettings) => { setSettings({ ...DEFAULT, ...s }); setLoading(false); })
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

  function handleISTChange(ist: string) {
    const { utc, cron } = istToUtc(ist);
    setSettings((s) => ({ ...s, sendTimeIST: ist, sendTimeUTC: utc, cronExpression: cron }));
  }

  function copyCron() {
    navigator.clipboard.writeText(settings.cronExpression).catch(() => {});
    setCopiedCron(true);
    setTimeout(() => setCopiedCron(false), 2000);
  }

  function addCCEmail() {
    const email = newCCEmail.trim().toLowerCase();
    if (!email || settings.customCCList.includes(email)) return;
    set("customCCList", [...settings.customCCList, email]);
    setNewCCEmail("");
  }

  function removeCCEmail(email: string) {
    set("customCCList", settings.customCCList.filter((e) => e !== email));
  }

  if (loading) return <Skeleton />;

  return (
    <div className="space-y-4">

      {/* ── Sender Identity ── */}
      <SectionCard>
        <SectionHeader
          title="Sender Identity"
          desc="Displayed in the From line of all birthday emails."
        />
        <div className="grid grid-cols-2 gap-3">
          <div>
            <label className="text-xs font-medium text-gray-600 block mb-1.5">
              From Name
            </label>
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

        {/* Toggle */}
        <label className="flex items-start gap-3 cursor-pointer select-none mb-4">
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

        {/* Send time */}
        <div className="border-t border-gray-100 pt-4">
          <label className="text-xs font-medium text-gray-600 block mb-1.5">
            Daily send time{" "}
            <span className="font-normal text-gray-400">(India Standard Time)</span>
          </label>
          <input
            type="time"
            value={settings.sendTimeIST}
            onChange={(e) => handleISTChange(e.target.value)}
            className="border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-[#2D1B69]/50 bg-white"
          />

          {/* Live UTC conversion */}
          <div className="flex items-center gap-2 mt-2">
            <p className="text-xs text-gray-500">
              ={" "}
              <span className="font-medium text-gray-700">
                {settings.sendTimeUTC} UTC
              </span>
              {" · runs as "}
              <code className="font-mono bg-gray-100 px-1.5 py-0.5 rounded text-gray-600">
                {settings.cronExpression}
              </code>
            </p>
            <button
              onClick={copyCron}
              className="text-xs text-[#2D1B69] border border-[#2D1B69]/20 px-2 py-0.5 rounded hover:bg-[#EEEDFE] transition-colors flex-shrink-0"
            >
              {copiedCron ? "✓ Copied" : "Copy"}
            </button>
          </div>

          <p className="text-xs text-gray-400 mt-2 leading-relaxed">
            After changing, update{" "}
            <code className="font-mono bg-gray-100 px-1 rounded">vercel.json</code>
            {" "}with the new cron expression and redeploy.
          </p>
        </div>
      </SectionCard>

      {/* ── CC Configuration ── */}
      <SectionCard>
        <SectionHeader
          title="CC Configuration"
          desc="Who gets CC'd on automated birthday emails."
        />

        {/* Segmented control */}
        <div className="flex rounded-lg border border-gray-200 overflow-hidden mb-4">
          {(["all", "custom", "none"] as const).map((mode, i) => (
            <button
              key={mode}
              onClick={() => set("ccMode", mode)}
              className={`flex-1 text-xs font-medium py-2 transition-colors ${
                i < 2 ? "border-r border-gray-200" : ""
              } ${
                settings.ccMode === mode
                  ? "bg-[#2D1B69] text-white"
                  : "bg-white text-gray-600 hover:bg-gray-50"
              }`}
            >
              {mode === "all" ? "All Employees" : mode === "custom" ? "Custom List" : "None"}
            </button>
          ))}
        </div>

        {/* All mode */}
        {settings.ccMode === "all" && (
          <div className="space-y-2">
            <p className="text-xs text-gray-500">
              All team members except the recipient are CC'd on every birthday email.
            </p>
            <InfoBox>
              Automatically switches to BCC for teams over 50 people.
            </InfoBox>
          </div>
        )}

        {/* Custom mode */}
        {settings.ccMode === "custom" && (
          <div className="space-y-3">
            {/* Add email row */}
            <div className="flex gap-2">
              <input
                type="email"
                value={newCCEmail}
                onChange={(e) => setNewCCEmail(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && addCCEmail()}
                placeholder="alias@company.com"
                className="flex-1 border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-[#2D1B69]/50"
              />
              <button
                onClick={addCCEmail}
                disabled={!newCCEmail.trim()}
                className="px-4 py-2 text-sm text-white bg-[#2D1B69] rounded-lg hover:bg-[#3d2580] disabled:opacity-40"
              >
                Add
              </button>
            </div>

            {/* Chips */}
            {settings.customCCList.length > 0 ? (
              <div className="flex flex-wrap gap-1.5">
                {settings.customCCList.map((email) => (
                  <span
                    key={email}
                    className="inline-flex items-center gap-1 bg-[#EEEDFE] text-[#2D1B69] px-2.5 py-1 rounded-full text-xs font-medium"
                  >
                    {email}
                    <button
                      type="button"
                      onClick={() => removeCCEmail(email)}
                      className="leading-none opacity-60 hover:opacity-100 text-sm font-bold"
                      aria-label={`Remove ${email}`}
                    >
                      ×
                    </button>
                  </span>
                ))}
              </div>
            ) : (
              <p className="text-xs text-gray-400 italic">
                No emails added yet — add at least one above.
              </p>
            )}

            <InfoBox>
              Use group or alias emails like{" "}
              <code className="font-mono bg-gray-100 px-1 rounded">team@company.com</code>{" "}
              for broadcast lists.
            </InfoBox>
          </div>
        )}

        {/* None mode */}
        {settings.ccMode === "none" && (
          <p className="text-xs text-gray-500">
            Birthday emails are sent only to the recipient. No CC or BCC.
          </p>
        )}
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
