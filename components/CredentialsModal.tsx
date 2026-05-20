"use client";
import { useState } from "react";

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

interface Props {
  onConfirm: (creds: SendCredentials) => void;
  onCancel: () => void;
}

export default function CredentialsModal({ onConfirm, onCancel }: Props) {
  const [fromName, setFromName] = useState("The HR Team");
  const [gmailUser, setGmailUser] = useState("");
  const [gmailAppPassword, setGmailAppPassword] = useState("");
  const [remember, setRemember] = useState(true);
  const [showPass, setShowPass] = useState(false);

  function handleConfirm() {
    if (!gmailUser.trim() || !gmailAppPassword.trim()) return;
    const creds: SendCredentials = {
      fromName: fromName.trim() || "The HR Team",
      gmailUser: gmailUser.trim(),
      gmailAppPassword: gmailAppPassword.trim(),
    };
    if (remember) saveCredentials(creds);
    onConfirm(creds);
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md mx-4 overflow-hidden">
        {/* Header */}
        <div className="bg-[#2D1B69] px-6 py-5">
          <h2 className="text-white font-semibold text-lg">Gmail Credentials</h2>
          <p className="text-white/60 text-xs mt-0.5">
            Used only to send this email — never stored on the server
          </p>
        </div>

        {/* Body */}
        <div className="px-6 py-5 space-y-4">
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
            <span className="text-xs text-gray-600">Remember for this browser session</span>
          </label>
        </div>

        {/* Footer */}
        <div className="px-6 pb-5 flex justify-end gap-2.5">
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
            Send Email
          </button>
        </div>
      </div>
    </div>
  );
}
