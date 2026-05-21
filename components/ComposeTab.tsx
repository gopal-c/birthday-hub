"use client";
import { useState, useEffect } from "react";
import type { Employee } from "@/lib/types";
import CredentialsModal, { type CcPerson, type SendCredentials } from "./CredentialsModal";

interface Props {
  employees: Employee[];
  initialEmployee?: Employee | null;
  onSent: () => void;
  onScheduled?: () => void;
}

export default function ComposeTab({ employees, initialEmployee, onSent, onScheduled }: Props) {
  const [selectedId, setSelectedId] = useState(initialEmployee?.id || "");
  const [message, setMessage] = useState("");
  const [emailHTML, setEmailHTML] = useState("");
  const [generating, setGenerating] = useState(false);
  const [sending, setSending] = useState(false);
  const [sendStatus, setSendStatus] = useState<"idle" | "sent" | "scheduled" | "error">("idle");
  const [copied, setCopied] = useState(false);
  const [previewMode, setPreviewMode] = useState<"html" | "text">("html");
  const [showCredsModal, setShowCredsModal] = useState(false);
  const [pendingSend, setPendingSend] = useState(false);
  const [mood, setMood] = useState("Sunny");
  const [fuel, setFuel] = useState("Coffee");
  const [heroImageUrl, setHeroImageUrl] = useState("");
  const [paletteId, setPaletteId] = useState("");

  const selected = employees.find((e) => e.id === selectedId) || null;

  useEffect(() => {
    if (initialEmployee) {
      setSelectedId(initialEmployee.id);
      generate(initialEmployee);
    }
  }, [initialEmployee?.id]);

  async function generate(emp?: Employee) {
    const target = emp || selected;
    if (!target) return;
    setGenerating(true);
    setMessage("");
    setEmailHTML("");
    setHeroImageUrl("");   // clear so the next preview gets a fresh image + palette
    setPaletteId("");
    setSendStatus("idle");
    try {
      const res = await fetch("/api/generate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name: target.name, department: target.department, notes: target.notes }),
      });
      const data = await res.json();
      const text = data.message || "";
      // Capture new mood/fuel locally before setting state so fetchPreview
      // (called immediately below) doesn't see stale closure values.
      const newMood = data.mood || "Sunny";
      const newFuel = data.fuel || "Coffee";
      setMood(newMood);
      setFuel(newFuel);
      setMessage(text);
      if (text) {
        try {
          // Pass "" for imageUrl + paletteId → server generates fresh values
          // and returns them; we then lock both in state for subsequent edits.
          await fetchPreview(target, text, "", newMood, newFuel, "");
        } catch (previewErr) {
          console.error("fetchPreview failed:", previewErr);
        }
      }
    } catch (err) {
      console.error("generate failed:", err);
      setMessage(`Dear ${target.name}, wishing you a wonderful birthday — your contributions to the ${target.department || "team"} are truly valued and we hope today is as amazing as you are!`);
    }
    setGenerating(false);
  }

  // Pass empty strings for lockedImageUrl / lockedPaletteId to get fresh values
  // (used by generate()). Pass the stored state values to lock them (edit mode).
  async function fetchPreview(
    emp: Employee,
    msg: string,
    lockedImageUrl: string,
    currentMood: string,
    currentFuel: string,
    lockedPaletteId: string
  ) {
    const res = await fetch("/api/preview", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        name: emp.name,
        department: emp.department,
        message: msg,
        imageUrl: lockedImageUrl,     // empty → server generates new URL
        paletteId: lockedPaletteId,   // empty → server picks random palette
        mood: currentMood,
        fuel: currentFuel,
      }),
    });
    const data = await res.json();
    setEmailHTML(data.html || "");
    if (data.imageUrl)  setHeroImageUrl(data.imageUrl);
    if (data.paletteId) setPaletteId(data.paletteId);
  }

  async function handleMessageChange(val: string) {
    setMessage(val);
    if (selected) await fetchPreview(selected, val, heroImageUrl, mood, fuel, paletteId);
  }

  async function doSend(creds: SendCredentials, cc: string[], scheduledAt: string | null) {
    if (!selected || !message) return;
    setSending(true);
    setPendingSend(false);

    const payload = {
      employeeId:       selected.id,
      employeeName:     selected.name,
      employeeEmail:    selected.email,
      message,
      gmailUser:        creds.gmailUser,
      gmailAppPassword: creds.gmailAppPassword,
      fromName:         creds.fromName,
      mood,
      fuel,
      heroImageUrl,
      paletteId,
      cc,
    };

    try {
      if (scheduledAt) {
        // ── Schedule for later ──────────────────────────────────────────────
        const res = await fetch("/api/schedule", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ ...payload, scheduledAt }),
        });
        if (res.ok) {
          setSendStatus("scheduled");
          onScheduled?.();
        } else {
          setSendStatus("error");
        }
      } else {
        // ── Send immediately ────────────────────────────────────────────────
        const res = await fetch("/api/send", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        });
        if (res.ok) {
          setSendStatus("sent");
          onSent();
        } else {
          setSendStatus("error");
        }
      }
    } catch {
      setSendStatus("error");
    }
    setSending(false);
  }

  function handleSend() {
    if (!selected || !message) return;
    // Always show the modal so the user can review / adjust CC recipients.
    // Credentials will be pre-filled from sessionStorage if previously saved.
    setPendingSend(true);
    setShowCredsModal(true);
  }

  function handleCredsConfirm(creds: SendCredentials, cc: string[], scheduledAt: string | null) {
    setShowCredsModal(false);
    if (pendingSend) doSend(creds, cc, scheduledAt);
  }

  /** Everyone except the current recipient, for the CC pre-population. */
  function buildCcList(): CcPerson[] {
    if (!selected) return [];
    return employees
      .filter((e) => e.id !== selected.id)
      .map((e) => ({ name: e.name, email: e.email }));
  }

  async function copyHTML() {
    if (!emailHTML) return;
    try {
      await navigator.clipboard.writeText(emailHTML);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {}
  }

  function fmtBirthday(mmdd: string) {
    const [m, d] = mmdd.split("-");
    const months = ["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"];
    return `${months[parseInt(m) - 1]} ${parseInt(d)}`;
  }

  return (
    <div className="space-y-5">
      {showCredsModal && (
        <CredentialsModal
          ccList={buildCcList()}
          onConfirm={handleCredsConfirm}
          onCancel={() => { setShowCredsModal(false); setPendingSend(false); }}
        />
      )}
      {/* Employee selector */}
      <div>
        <label className="text-xs font-medium text-gray-500 block mb-1.5">Select employee</label>
        <select
          value={selectedId}
          onChange={(e) => {
            setSelectedId(e.target.value);
            const emp = employees.find((em) => em.id === e.target.value);
            if (emp) generate(emp);
          }}
          className="w-full border border-gray-200 rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:border-[#2D1B69]/50 bg-white"
        >
          <option value="">— choose a team member —</option>
          {employees.map((e) => (
            <option key={e.id} value={e.id}>
              {e.name} — {e.department || "no dept"} ({fmtBirthday(e.birthday)})
            </option>
          ))}
        </select>
      </div>

      {!selected && (
        <div className="bg-white rounded-xl border border-gray-100 p-10 text-center">
          <p className="text-3xl mb-3">🎂</p>
          <p className="text-sm text-gray-400">Choose a team member above to generate their birthday email.</p>
        </div>
      )}

      {selected && (
        <>
          {/* Message editor */}
          <div className="bg-white rounded-xl border border-gray-100 p-5">
            <div className="flex items-center justify-between mb-3">
              <label className="text-sm font-medium text-gray-700">
                Birthday Message
                <span className="ml-2 text-xs text-gray-400 font-normal">AI-generated — edit freely</span>
              </label>
              <button
                onClick={() => generate()}
                disabled={generating}
                className="flex items-center gap-1.5 text-xs border border-gray-200 rounded-lg px-3 py-1.5 hover:bg-gray-50 disabled:opacity-40"
              >
                {generating ? <><span className="spin">⟳</span> Generating…</> : "⟳ Regenerate"}
              </button>
            </div>

            {generating ? (
              <div className="flex items-center gap-3 py-8 justify-center">
                <span className="spin text-xl">🎂</span>
                <p className="text-sm text-gray-500">Crafting a personal message for {selected.name}…</p>
              </div>
            ) : (
              <textarea
                value={message}
                onChange={(e) => handleMessageChange(e.target.value)}
                rows={5}
                placeholder="Message will appear here…"
                className="w-full border border-gray-100 rounded-lg px-3 py-2.5 text-sm text-gray-700 resize-none focus:outline-none focus:border-[#2D1B69]/40 bg-gray-50"
              />
            )}
          </div>

          {/* Email preview */}
          {emailHTML && (
            <div className="bg-white rounded-xl border border-gray-100 overflow-hidden">
              {/* Preview chrome */}
              <div className="flex items-center justify-between px-4 py-3 bg-gray-50 border-b border-gray-100">
                <div className="flex items-center gap-2">
                  <div className="flex gap-1.5">
                    <div className="w-3 h-3 rounded-full bg-[#ff5f57]" />
                    <div className="w-3 h-3 rounded-full bg-[#febc2e]" />
                    <div className="w-3 h-3 rounded-full bg-[#28c840]" />
                  </div>
                  <span className="text-xs text-gray-400 ml-2">
                    Preview — Birthday Wishes for {selected.name}
                  </span>
                </div>
                <div className="flex gap-2">
                  {(["html", "text"] as const).map((m) => (
                    <button key={m} onClick={() => setPreviewMode(m)}
                      className={`text-xs px-2.5 py-1 rounded transition-colors ${previewMode === m ? "bg-white border border-gray-200 text-gray-700" : "text-gray-400 hover:text-gray-600"}`}>
                      {m === "html" ? "Preview" : "Source"}
                    </button>
                  ))}
                </div>
              </div>

              {previewMode === "html" ? (
                <iframe
                  srcDoc={emailHTML}
                  className="email-preview"
                  title="Email preview"
                  sandbox="allow-same-origin"
                />
              ) : (
                <pre className="text-xs text-gray-600 p-4 overflow-x-auto max-h-96 font-mono leading-relaxed">
                  {emailHTML}
                </pre>
              )}
            </div>
          )}

          {/* Actions */}
          {emailHTML && (
            <div className="flex items-center gap-3">
              <button onClick={copyHTML}
                className="flex items-center gap-1.5 px-4 py-2.5 text-sm border border-gray-200 rounded-lg hover:bg-gray-50">
                {copied ? "✓ Copied!" : "📋 Copy HTML"}
              </button>

              <button
                onClick={() => {
                  const sub = encodeURIComponent(`🎂 Happy Birthday, ${selected.name}!`);
                  const to = encodeURIComponent(selected.email);
                  window.open(`https://mail.google.com/mail/?view=cm&to=${to}&su=${sub}`, "_blank");
                }}
                className="flex items-center gap-1.5 px-4 py-2.5 text-sm border border-gray-200 rounded-lg hover:bg-gray-50">
                📧 Open Gmail Draft ↗
              </button>

              <div className="flex-1" />

              {sendStatus === "sent" && (
                <span className="text-sm text-teal-600 font-medium">✅ Email sent to {selected.email}!</span>
              )}
              {sendStatus === "scheduled" && (
                <span className="text-sm text-[#2D1B69] font-medium">⏰ Email scheduled!</span>
              )}
              {sendStatus === "error" && (
                <span className="text-sm text-red-500">⚠️ Send failed — check your Gmail config</span>
              )}

              <button
                onClick={handleSend}
                disabled={sending || !message || sendStatus === "sent" || sendStatus === "scheduled"}
                className="flex items-center gap-2 px-5 py-2.5 text-sm text-white bg-[#2D1B69] rounded-lg hover:bg-[#3d2580] disabled:opacity-40 font-medium"
              >
                {sending ? <><span className="spin">⟳</span> Sending…</> : "✉ Send Birthday Email"}
              </button>
            </div>
          )}
        </>
      )}
    </div>
  );
}
