"use client";
import { useState, useEffect } from "react";

export interface SendCredentials {
  fromName: string;
  gmailUser: string;
  gmailAppPassword: string;
}

const STORAGE_KEY = "bh_send_creds";

export function loadCredentials(): SendCredentials | null {
  if (typeof window === "undefined") return null;
  try {
    const raw = sessionStorage.getItem(STORAGE_KEY);
    if (!raw) return null;
    return JSON.parse(raw) as SendCredentials;
  } catch {
    return null;
  }
}

function saveCredentials(creds: SendCredentials) {
  sessionStorage.setItem(STORAGE_KEY, JSON.stringify(creds));
}

export interface CcPerson { name: string; email: string; }

export type CcBehavior = "cc" | "bcc" | "none";

interface Props {
  ccList: CcPerson[];
  onConfirm: (creds: SendCredentials, cc: string[], scheduledAt: string | null, ccBehavior: CcBehavior) => void;
  onCancel: () => void;
}

export default function CredentialsModal({ ccList, onConfirm, onCancel }: Props) {
  // Pre-populate credentials from sessionStorage if already saved
  const saved = loadCredentials();
  const [fromName, setFromName] = useState(saved?.fromName || "");
  const [gmailUser, setGmailUser] = useState(saved?.gmailUser || "");
  const [gmailAppPassword, setGmailAppPassword] = useState(saved?.gmailAppPassword || "");
  const [remember, setRemember] = useState(true);
  const [showPass, setShowPass] = useState(false);
  const [ccBehavior, setCcBehavior] = useState<CcBehavior>("cc");
  const [ccVisible, setCcVisible] = useState(true);

  // CC — start with everyone in ccList selected; may be overridden by settings below
  const [ccEmails, setCcEmails] = useState<string[]>(() => ccList.map((p) => p.email));

  // Fetch settings to pre-fill From Name and apply ccMode
  useEffect(() => {
    fetch("/api/settings")
      .then((r) => r.json())
      .then((s) => {
        if (!fromName) setFromName(s.fromName || "The HR Team");
        const mode: string = s.ccMode || "all";
        if (mode === "none") {
          setCcVisible(false);
          setCcEmails([]);
        } else if (mode === "custom") {
          setCcEmails(s.customCCList || []);
        }
        // mode === "all" → keep initial state (all employees selected)
      })
      .catch(() => {
        if (!fromName) setFromName("The HR Team");
      });
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Schedule state
  const [scheduled, setScheduled] = useState(false);
  const [scheduleDate, setScheduleDate] = useState(() => {
    const d = new Date();
    d.setDate(d.getDate() + 1);
    return d.toISOString().split("T")[0];         // "YYYY-MM-DD"
  });
  const [scheduleTime, setScheduleTime] = useState("09:00");

  // toggleAll only applies in "all employees" mode
  const allEmployeeEmails = ccList.map((p) => p.email);
  const allSelected = ccEmails.length > 0 && ccEmails.length === allEmployeeEmails.length &&
    allEmployeeEmails.every((e) => ccEmails.includes(e));

  function toggleAll() {
    setCcEmails(allSelected ? [] : allEmployeeEmails);
  }

  function removeChip(email: string) {
    setCcEmails((prev) => prev.filter((e) => e !== email));
  }

  function handleConfirm() {
    if (!gmailUser.trim() || !gmailAppPassword.trim()) return;
    const creds: SendCredentials = {
      fromName: fromName.trim() || "The HR Team",
      gmailUser: gmailUser.trim(),
      gmailAppPassword: gmailAppPassword.trim(),
    };
    if (remember) saveCredentials(creds);

    let scheduledAt: string | null = null;
    if (scheduled) {
      const dt = new Date(`${scheduleDate}T${scheduleTime}:00`);
      if (!isNaN(dt.getTime()) && dt > new Date()) {
        scheduledAt = dt.toISOString();
      }
    }

    onConfirm(creds, ccEmails, scheduledAt, ccBehavior);
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md mx-4 overflow-hidden max-h-[90vh] flex flex-col">
        {/* Header */}
        <div className="bg-[#2D1B69] px-6 py-5 shrink-0">
          <h2 className="text-white font-semibold text-lg">Send Birthday Email</h2>
          <p className="text-white/60 text-xs mt-0.5">
            Credentials are never stored on the server
          </p>
        </div>

        {/* Scrollable body */}
        <div className="px-6 py-5 space-y-4 overflow-y-auto">

          {/* From name */}
          <div>
            <label className="text-xs font-medium text-gray-600 block mb-1.5">
              Your name or team name
            </label>
            <input
              type="text"
              value={fromName}
              onChange={(e) => setFromName(e.target.value)}
              placeholder="The HR Team"
              className="w-full border border-gray-200 rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:border-[#2D1B69]/50"
            />
          </div>

          {/* CC section — hidden when ccMode=none in Settings */}
          {ccVisible && (
            <div>
              <div className="flex items-center justify-between mb-1.5">
                <label className="text-xs font-medium text-gray-600">
                  CC
                  <span className="ml-1.5 font-normal text-gray-400">
                    ({ccEmails.length} selected)
                  </span>
                </label>
                {ccList.length > 0 && (
                  <button
                    type="button"
                    onClick={toggleAll}
                    className="text-xs text-[#2D1B69] hover:underline underline-offset-2"
                  >
                    {allSelected ? "Remove all" : "Select all"}
                  </button>
                )}
              </div>

              <div className="min-h-[40px] max-h-32 overflow-y-auto rounded-lg border border-gray-100 bg-gray-50 p-2">
                <div className="flex flex-wrap gap-1.5">
                  {ccEmails.map((email) => {
                    // Show name for known employees, raw email for custom addresses
                    const person = ccList.find((p) => p.email === email);
                    return (
                      <span
                        key={email}
                        className="inline-flex items-center gap-1 bg-[#EEEDFE] text-[#2D1B69] px-2.5 py-1 rounded-full text-xs font-medium"
                      >
                        {person ? person.name : email}
                        <button
                          type="button"
                          onClick={() => removeChip(email)}
                          className="leading-none opacity-60 hover:opacity-100 text-sm font-bold"
                          aria-label={`Remove ${person?.name ?? email}`}
                        >
                          ×
                        </button>
                      </span>
                    );
                  })}
                  {ccEmails.length === 0 && (
                    <p className="text-xs text-gray-400 italic p-0.5">
                      No CC recipients
                    </p>
                  )}
                </div>
              </div>
            </div>
          )}

          {/* CC behavior */}
          <div>
            <label className="text-xs font-medium text-gray-600 block mb-1.5">
              CC behavior
            </label>
            <div className="flex gap-2">
              {(["cc", "bcc", "none"] as CcBehavior[]).map((opt) => (
                <label
                  key={opt}
                  className={`flex-1 flex items-center justify-center gap-1.5 text-xs font-medium px-3 py-2 rounded-lg border cursor-pointer transition-colors ${
                    ccBehavior === opt
                      ? "bg-[#EEEDFE] text-[#2D1B69] border-[#2D1B69]/30"
                      : "text-gray-500 border-gray-200 hover:bg-gray-50"
                  }`}
                >
                  <input
                    type="radio"
                    className="sr-only"
                    name="ccBehavior"
                    value={opt}
                    checked={ccBehavior === opt}
                    onChange={() => setCcBehavior(opt)}
                  />
                  {opt === "cc" ? "CC" : opt === "bcc" ? "BCC" : "None"}
                </label>
              ))}
            </div>
            <p className="text-xs text-gray-400 mt-1.5">
              Override default from Settings. &gt;50 recipients are always BCCd.
            </p>
          </div>

          {/* Schedule toggle */}
          <div>
            <label className="flex items-center gap-2.5 cursor-pointer select-none">
              <div
                onClick={() => setScheduled((v) => !v)}
                className={`relative w-9 h-5 rounded-full transition-colors cursor-pointer ${
                  scheduled ? "bg-[#2D1B69]" : "bg-gray-200"
                }`}
              >
                <span className={`absolute top-0.5 w-4 h-4 rounded-full bg-white shadow transition-transform ${
                  scheduled ? "translate-x-4" : "translate-x-0.5"
                }`} />
              </div>
              <span className="text-xs font-medium text-gray-700">Schedule Send</span>
            </label>

            {scheduled && (
              <div className="mt-2.5 space-y-2">
                <div className="flex gap-2">
                  <div className="flex-1">
                    <label className="text-xs text-gray-500 block mb-1">Date</label>
                    <input
                      type="date"
                      value={scheduleDate}
                      min={new Date().toISOString().split("T")[0]}
                      onChange={(e) => setScheduleDate(e.target.value)}
                      className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-[#2D1B69]/50"
                    />
                  </div>
                  <div className="w-28">
                    <label className="text-xs text-gray-500 block mb-1">Time</label>
                    <input
                      type="time"
                      value={scheduleTime}
                      onChange={(e) => setScheduleTime(e.target.value)}
                      className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-[#2D1B69]/50"
                    />
                  </div>
                </div>
                <p className="text-xs text-gray-400 leading-relaxed">
                  The email sends when Birthday Hub is open in your browser at the scheduled time, or by 8 AM the next morning via auto-send.
                </p>
              </div>
            )}
          </div>

          {/* Gmail address */}
          <div>
            <label className="text-xs font-medium text-gray-600 block mb-1.5">
              Gmail address
            </label>
            <input
              type="email"
              value={gmailUser}
              onChange={(e) => setGmailUser(e.target.value)}
              placeholder="you@gmail.com"
              className="w-full border border-gray-200 rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:border-[#2D1B69]/50"
            />
          </div>

          {/* App password */}
          <div>
            <label className="text-xs font-medium text-gray-600 block mb-1.5">
              Gmail App Password
              <a
                href="https://myaccount.google.com/apppasswords"
                target="_blank"
                rel="noreferrer"
                className="ml-1.5 text-[#2D1B69] underline underline-offset-2"
              >
                generate one ↗
              </a>
            </label>
            <div className="relative">
              <input
                type={showPass ? "text" : "password"}
                value={gmailAppPassword}
                onChange={(e) => setGmailAppPassword(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && handleConfirm()}
                placeholder="xxxx xxxx xxxx xxxx"
                className="w-full border border-gray-200 rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:border-[#2D1B69]/50 pr-12"
              />
              <button
                type="button"
                onClick={() => setShowPass((v) => !v)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 text-xs"
              >
                {showPass ? "hide" : "show"}
              </button>
            </div>
          </div>

          {/* Remember */}
          <label className="flex items-center gap-2.5 cursor-pointer select-none">
            <input
              type="checkbox"
              checked={remember}
              onChange={(e) => setRemember(e.target.checked)}
              className="w-4 h-4 accent-[#2D1B69]"
            />
            <span className="text-xs text-gray-600">Remember credentials for this browser session</span>
          </label>
        </div>

        {/* Footer */}
        <div className="px-6 pb-5 flex justify-end gap-2.5 shrink-0 border-t border-gray-100 pt-4">
          <button
            onClick={onCancel}
            className="px-4 py-2 text-sm text-gray-600 border border-gray-200 rounded-lg hover:bg-gray-50"
          >
            Cancel
          </button>
          <button
            onClick={handleConfirm}
            disabled={!gmailUser.trim() || !gmailAppPassword.trim()}
            className="px-5 py-2 text-sm text-white bg-[#2D1B69] rounded-lg hover:bg-[#3d2580] disabled:opacity-40 font-medium"
          >
            {scheduled ? "⏰ Schedule" : "✉ Send Now"}
          </button>
        </div>
      </div>
    </div>
  );
}
