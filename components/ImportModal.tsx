"use client";
import { useState, useRef } from "react";
import Papa from "papaparse";

interface Props {
  onClose: () => void;
  onImported: (count: number) => void;
}

export default function ImportModal({ onClose, onImported }: Props) {
  const [tab, setTab] = useState<"csv" | "paste">("csv");
  const [csvText, setCsvText] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "done" | "error">("idle");
  const [result, setResult] = useState<{ imported: number; skipped: number; errors: string[] } | null>(null);
  const fileRef = useRef<HTMLInputElement>(null);

  const EXAMPLE_CSV = `name,email,department,birthday,notes
Sarah Chen,sarah.chen@company.com,Engineering,05-19,Team lead
Marcus Williams,marcus.w@company.com,Marketing,08-14,
Priya Patel,priya.p@company.com,Design,March 25,`;

  async function handleImport(text: string) {
    setStatus("loading");
    const parsed = Papa.parse<Record<string, string>>(text.trim(), {
      header: true,
      skipEmptyLines: true,
    });

    if (parsed.errors.length && !parsed.data.length) {
      setStatus("error");
      setResult({ imported: 0, skipped: 0, errors: parsed.errors.map((e) => e.message) });
      return;
    }

    const res = await fetch("/api/import", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ rows: parsed.data }),
    });
    const data = await res.json();
    setResult(data);
    setStatus(data.imported > 0 ? "done" : "error");
    if (data.imported > 0) onImported(data.imported);
  }

  function handleFile(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (ev) => {
      const text = ev.target?.result as string;
      setCsvText(text);
      handleImport(text);
    };
    reader.readAsText(file);
  }

  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-xl overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100">
          <div>
            <h2 className="text-base font-semibold text-gray-900">Import Birthday List</h2>
            <p className="text-xs text-gray-500 mt-0.5">CSV with columns: name, email, department, birthday, notes</p>
          </div>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-600 text-xl font-light leading-none">✕</button>
        </div>

        {/* Tabs */}
        <div className="flex border-b border-gray-100">
          {(["csv", "paste"] as const).map((t) => (
            <button
              key={t}
              onClick={() => setTab(t)}
              className={`flex-1 py-2.5 text-sm font-medium transition-colors ${tab === t ? "text-[#2D1B69] border-b-2 border-[#2D1B69]" : "text-gray-500 hover:text-gray-700"}`}
            >
              {t === "csv" ? "📂 Upload CSV File" : "📋 Paste CSV Text"}
            </button>
          ))}
        </div>

        <div className="p-6">
          {status === "idle" || status === "loading" ? (
            <>
              {tab === "csv" ? (
                <div
                  className="border-2 border-dashed border-gray-200 rounded-xl p-8 text-center cursor-pointer hover:border-[#2D1B69]/40 hover:bg-brand-50/30 transition-colors"
                  onClick={() => fileRef.current?.click()}
                >
                  <div className="text-3xl mb-2">📄</div>
                  <p className="text-sm font-medium text-gray-700">Click to select a CSV file</p>
                  <p className="text-xs text-gray-400 mt-1">or drag and drop</p>
                  <input ref={fileRef} type="file" accept=".csv,.txt" onChange={handleFile} className="hidden" />
                </div>
              ) : (
                <textarea
                  value={csvText}
                  onChange={(e) => setCsvText(e.target.value)}
                  placeholder={EXAMPLE_CSV}
                  rows={7}
                  className="w-full border border-gray-200 rounded-xl p-3 text-sm font-mono text-gray-700 resize-none focus:outline-none focus:border-[#2D1B69]/50"
                />
              )}

              {/* Example */}
              <div className="mt-4 bg-gray-50 rounded-lg p-3">
                <p className="text-xs font-medium text-gray-500 mb-1.5">Accepted birthday formats</p>
                <div className="flex flex-wrap gap-2">
                  {["05-19", "2000-05-19", "05/19", "March 25", "25 March"].map((f) => (
                    <span key={f} className="text-xs bg-white border border-gray-200 rounded px-2 py-0.5 font-mono text-gray-600">{f}</span>
                  ))}
                </div>
              </div>

              {tab === "paste" && (
                <div className="flex justify-end mt-4 gap-2">
                  <button onClick={onClose} className="px-4 py-2 text-sm text-gray-600 border border-gray-200 rounded-lg hover:bg-gray-50">Cancel</button>
                  <button
                    onClick={() => handleImport(csvText)}
                    disabled={!csvText.trim() || status === "loading"}
                    className="px-4 py-2 text-sm text-white bg-[#2D1B69] rounded-lg hover:bg-[#3d2580] disabled:opacity-40"
                  >
                    {status === "loading" ? <><span className="spin inline-block mr-1">⟳</span> Importing…</> : "Import"}
                  </button>
                </div>
              )}
            </>
          ) : (
            <div className={`rounded-xl p-5 ${status === "done" ? "bg-teal-50" : "bg-red-50"}`}>
              <div className="flex items-start gap-3">
                <span className="text-2xl">{status === "done" ? "✅" : "⚠️"}</span>
                <div className="flex-1">
                  {result && (
                    <>
                      <p className={`font-semibold text-sm ${status === "done" ? "text-teal-800" : "text-red-800"}`}>
                        {status === "done"
                          ? `${result.imported} people imported successfully${result.skipped ? ` (${result.skipped} skipped — already exist)` : ""}`
                          : "Import failed"}
                      </p>
                      {result.errors.length > 0 && (
                        <ul className="mt-2 space-y-1">
                          {result.errors.map((e, i) => (
                            <li key={i} className="text-xs text-red-700">• {e}</li>
                          ))}
                        </ul>
                      )}
                    </>
                  )}
                </div>
              </div>
              <div className="flex gap-2 mt-4 justify-end">
                {status === "error" && (
                  <button onClick={() => { setStatus("idle"); setResult(null); }} className="px-4 py-2 text-sm border border-gray-200 rounded-lg hover:bg-white">Try again</button>
                )}
                <button onClick={onClose} className="px-4 py-2 text-sm text-white bg-[#2D1B69] rounded-lg hover:bg-[#3d2580]">Done</button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
