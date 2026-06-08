// ── Background palettes ───────────────────────────────────────────────────────
// Six interchangeable gradient palettes. All keep #3a1a2a ink + #d96a3a accent
// readable. Randomised per generate; locked for edits (same as heroImageUrl).

interface Palette { id: string; label: string; bg: string; }

export const SUNRISE_PALETTES: Palette[] = [
  { id: "sunrise",
    label: "Sunrise",
    bg: "linear-gradient(180deg,#ffe4d6 0%,#ffd4c2 35%,#f9c4d4 70%,#e8c8ec 100%)" },
  { id: "mint-marine",
    label: "Mint Marine",
    bg: "linear-gradient(180deg,#e6f5e6 0%,#c8ecdf 40%,#b8dde8 75%,#c8d4f0 100%)" },
  { id: "honey-gold",
    label: "Honey Gold",
    bg: "linear-gradient(180deg,#fff4d6 0%,#fae0a0 35%,#e8b870 70%,#c08838 100%)" },
  { id: "lilac-dawn",
    label: "Lilac Dawn",
    bg: "linear-gradient(180deg,#f5e8ff 0%,#e0d0f5 35%,#c8bce8 70%,#a8b0d8 100%)" },
  { id: "citrus-sky",
    label: "Citrus Sky",
    bg: "linear-gradient(180deg,#fef8d6 0%,#fae8a8 30%,#d8e8c0 65%,#b8d4e8 100%)" },
  { id: "ember",
    label: "Ember",
    bg: "linear-gradient(180deg,#ffe0d0 0%,#ff9c80 35%,#d8485c 70%,#6a1d34 100%)" },
];

/** Pick a palette by id, or a random one if id is missing/unknown. */
export function resolvePalette(id?: string): Palette {
  return (
    (id && SUNRISE_PALETTES.find((p) => p.id === id)) ||
    SUNRISE_PALETTES[Math.floor(Math.random() * SUNRISE_PALETTES.length)]
  );
}

// ── Fallback SVG hero images (used when Gemini generation fails) ──────────────
const FALLBACK_SVGS = [
  // Cake — pink/peach
  `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 360"><defs><linearGradient id="fb0" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stop-color="#ffe8e0"/><stop offset="100%" stop-color="#ffd0e8"/></linearGradient></defs><rect width="640" height="360" fill="url(#fb0)"/><circle cx="80" cy="60" r="12" fill="#f9c4d4" opacity=".55"/><circle cx="570" cy="90" r="16" fill="#d4e8f4" opacity=".5"/><circle cx="110" cy="295" r="9" fill="#c4f4d4" opacity=".55"/><circle cx="535" cy="270" r="12" fill="#f4d4a0" opacity=".55"/><circle cx="490" cy="50" r="8" fill="#d4c4f4" opacity=".5"/><circle cx="155" cy="155" r="7" fill="#f4c4b4" opacity=".5"/><rect x="170" y="250" width="300" height="82" rx="14" fill="#f7bdc8"/><rect x="170" y="247" width="300" height="18" rx="9" fill="white" opacity=".65"/><rect x="205" y="182" width="230" height="72" rx="14" fill="#fbc7d0"/><rect x="205" y="179" width="230" height="18" rx="9" fill="white" opacity=".65"/><rect x="245" y="138" width="150" height="48" rx="14" fill="#fdd5dc"/><rect x="245" y="135" width="150" height="18" rx="9" fill="white" opacity=".65"/><circle cx="233" cy="288" r="9" fill="#f4a5b9"/><circle cx="320" cy="288" r="9" fill="#f4a5b9"/><circle cx="407" cy="288" r="9" fill="#f4a5b9"/><rect x="279" y="108" width="11" height="32" rx="5.5" fill="#d96a3a"/><rect x="314" y="103" width="11" height="37" rx="5.5" fill="#7ec8e3"/><rect x="350" y="108" width="11" height="32" rx="5.5" fill="#b5e8c0"/><ellipse cx="284" cy="104" rx="7" ry="10" fill="#ffcc44" opacity=".9"/><ellipse cx="319" cy="99" rx="7" ry="10" fill="#ffcc44" opacity=".9"/><ellipse cx="355" cy="104" rx="7" ry="10" fill="#ffcc44" opacity=".9"/><path d="M118 58l3-7 3 7 7 3-7 3-3 7-3-7-7-3z" fill="#ffd700" opacity=".75"/><path d="M512 46l2-6 2 6 6 2-6 2-2 6-2-6-6-2z" fill="#ffd700" opacity=".65"/><path d="M556 198l2-5 2 5 5 2-5 2-2 5-2-5-5-2z" fill="#f4a5b9" opacity=".65"/></svg>`,

  // Balloons — lavender/gold
  `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 360"><defs><linearGradient id="fb1" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stop-color="#f5e8ff"/><stop offset="100%" stop-color="#ddd0f8"/></linearGradient></defs><rect width="640" height="360" fill="url(#fb1)"/><ellipse cx="200" cy="160" rx="48" ry="62" fill="#c9a6f0" opacity=".85"/><path d="M200 222 Q198 250 196 270" stroke="#c9a6f0" stroke-width="2" fill="none"/><ellipse cx="295" cy="130" rx="52" ry="68" fill="#f9c46a" opacity=".85"/><path d="M295 198 Q293 230 290 260" stroke="#f9c46a" stroke-width="2" fill="none"/><ellipse cx="395" cy="145" rx="48" ry="64" fill="#a8d8ea" opacity=".85"/><path d="M395 209 Q393 238 391 265" stroke="#a8d8ea" stroke-width="2" fill="none"/><ellipse cx="480" cy="170" rx="44" ry="58" fill="#f4a5b9" opacity=".85"/><path d="M480 228 Q478 255 476 278" stroke="#f4a5b9" stroke-width="2" fill="none"/><path d="M196 270 Q240 285 290 260 Q340 245 391 265 Q430 278 476 278" stroke="#8a6a9a" stroke-width="1.5" fill="none" opacity=".4"/><ellipse cx="200" cy="155" rx="18" ry="22" fill="white" opacity=".25"/><ellipse cx="295" cy="123" rx="20" ry="24" fill="white" opacity=".25"/><ellipse cx="395" cy="138" rx="18" ry="22" fill="white" opacity=".25"/><ellipse cx="480" cy="163" rx="17" ry="21" fill="white" opacity=".25"/><circle cx="100" cy="80" r="7" fill="#f9c46a" opacity=".6"/><circle cx="560" cy="70" r="9" fill="#c9a6f0" opacity=".55"/><circle cx="80" cy="290" r="6" fill="#a8d8ea" opacity=".55"/><circle cx="575" cy="300" r="8" fill="#f4a5b9" opacity=".55"/><path d="M540 130l3-7 3 7 7 3-7 3-3 7-3-7-7-3z" fill="#ffd700" opacity=".7"/><path d="M95 190l2-5 2 5 5 2-5 2-2 5-2-5-5-2z" fill="#ffd700" opacity=".65"/></svg>`,

  // Gifts — sage green / blush
  `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 360"><defs><linearGradient id="fb2" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stop-color="#e8f5e9"/><stop offset="100%" stop-color="#dce8d8"/></linearGradient></defs><rect width="640" height="360" fill="url(#fb2)"/><rect x="240" y="230" width="160" height="110" rx="10" fill="#a8c5a0"/><rect x="232" y="220" width="176" height="24" rx="8" fill="#bcd4b4"/><rect x="312" y="220" width="16" height="120" fill="white" opacity=".45"/><path d="M320 220 Q290 195 270 175 Q255 160 280 158 Q305 156 320 180" fill="#f4a5b9" opacity=".75"/><path d="M320 220 Q350 195 370 175 Q385 160 360 158 Q335 156 320 180" fill="#f4a5b9" opacity=".75"/><rect x="370" y="255" width="115" height="85" rx="10" fill="#c8b4d8"/><rect x="363" y="246" width="129" height="22" rx="8" fill="#d8c4e8"/><rect x="421" y="246" width="14" height="94" fill="white" opacity=".4"/><path d="M428 246 Q408 226 393 210 Q380 197 400 196 Q420 195 428 218" fill="#f9c46a" opacity=".7"/><path d="M428 246 Q448 226 463 210 Q476 197 456 196 Q436 195 428 218" fill="#f9c46a" opacity=".7"/><rect x="155" y="265" width="100" height="75" rx="10" fill="#a8c5d8"/><rect x="148" y="256" width="114" height="20" rx="8" fill="#b8d4e8"/><rect x="200" y="256" width="12" height="84" fill="white" opacity=".4"/><path d="M206 256 Q190 240 178 226 Q167 215 183 214 Q199 213 206 234" fill="#f4a5b9" opacity=".7"/><path d="M206 256 Q222 240 234 226 Q245 215 229 214 Q213 213 206 234" fill="#f4a5b9" opacity=".7"/><circle cx="90" cy="80" r="11" fill="#a8c5a0" opacity=".55"/><circle cx="555" cy="95" r="14" fill="#c8b4d8" opacity=".5"/><circle cx="115" cy="290" r="8" fill="#f9c46a" opacity=".55"/><circle cx="530" cy="280" r="10" fill="#a8c5d8" opacity=".55"/><path d="M505 55l3-8 3 8 8 3-8 3-3 8-3-8-8-3z" fill="#ffd700" opacity=".7"/><path d="M132 145l2-6 2 6 6 2-6 2-2 6-2-6-6-2z" fill="#ffd700" opacity=".65"/></svg>`,

  // Stars & sparkles — amber/cream
  `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 360"><defs><linearGradient id="fb3" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stop-color="#fff8e8"/><stop offset="100%" stop-color="#fae0b8"/></linearGradient></defs><rect width="640" height="360" fill="url(#fb3)"/><path d="M320 80 L332 112 L368 112 L340 132 L352 164 L320 144 L288 164 L300 132 L272 112 L308 112 Z" fill="#ffd700" opacity=".85"/><path d="M160 140 L168 163 L194 163 L173 177 L181 200 L160 186 L139 200 L147 177 L126 163 L152 163 Z" fill="#f9c46a" opacity=".75"/><path d="M480 120 L488 143 L514 143 L493 157 L501 180 L480 166 L459 180 L467 157 L446 143 L472 143 Z" fill="#f4a5b9" opacity=".75"/><path d="M100 240 L106 258 L125 258 L110 268 L116 286 L100 276 L84 286 L90 268 L75 258 L94 258 Z" fill="#c9a6f0" opacity=".7"/><path d="M545 230 L551 248 L570 248 L555 258 L561 276 L545 266 L529 276 L535 258 L520 248 L539 248 Z" fill="#7ec8e3" opacity=".7"/><circle cx="420" cy="260" r="9" fill="#ffd700" opacity=".6"/><circle cx="215" cy="250" r="7" fill="#ffd700" opacity=".6"/><circle cx="580" cy="160" r="8" fill="#f9c46a" opacity=".55"/><circle cx="60" cy="155" r="10" fill="#f4a5b9" opacity=".55"/><circle cx="350" cy="300" r="12" fill="#c9a6f0" opacity=".5"/><circle cx="290" cy="50" r="8" fill="#7ec8e3" opacity=".5"/><path d="M75 60l2-5 2 5 5 2-5 2-2 5-2-5-5-2z" fill="#ffd700" opacity=".7"/><path d="M570 290l2-5 2 5 5 2-5 2-2 5-2-5-5-2z" fill="#ffd700" opacity=".65"/><path d="M440 50l3-6 3 6 6 3-6 3-3 6-3-6-6-3z" fill="#f9c46a" opacity=".65"/><path d="M185 310l2-5 2 5 5 2-5 2-2 5-2-5-5-2z" fill="#f4a5b9" opacity=".6"/></svg>`,
];

/** Returns a base64 data URL for a random fallback SVG. */
export function getFallbackImageUrl(): string {
  const svg = FALLBACK_SVGS[Math.floor(Math.random() * FALLBACK_SVGS.length)];
  return `data:image/svg+xml;base64,${Buffer.from(svg).toString("base64")}`;
}

// ── Helpers ───────────────────────────────────────────────────────────────────

function formatDate(): string {
  const now = new Date();
  const day = now.getDate();
  const months = ["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"];
  return `${day} ${months[now.getMonth()]} ${now.getFullYear()}`;
}

/** Keep at most 2 sentences so the message never overflows the card. */
function twoSentences(text: string): string {
  const sentences = text.match(/[^.!?]+[.!?]+(\s|$)/g);
  if (!sentences) return text;
  return sentences.slice(0, 2).join("").trim();
}

function esc(str: string): string {
  return (str || "")
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

// ── Template ──────────────────────────────────────────────────────────────────

export function buildEmailHTML(
  name: string,
  department: string,
  message: string,
  fromName = "The HR Team",
  illustrationIndex?: number,
  mood = "Sunny",
  fuel = "Coffee",
  logoUrl?: string,
  heroImageUrl?: string,       // base64 data URL or external URL; empty/undefined → SVG fallback
  paletteId?: string           // if provided, looked up in SUNRISE_PALETTES; else random
): string {
  const resolvedImageUrl = heroImageUrl || getFallbackImageUrl();

  const palette = resolvePalette(paletteId);

  const escaped = {
    name:    esc(name),
    msg:     esc(twoSentences(message)).replace(/\n/g, "<br>"),
    from:    esc(fromName),
    date:    esc(formatDate()),
    imgUrl:  resolvedImageUrl,
    mood:    esc(mood),
    fuel:    esc(fuel),
  };

  // ── Logo: gif if URL provided, else text pill ─────────────────────────────
  const logoPill = logoUrl
    ? `<span style="display:inline-block;background:#ffffff;border-radius:12px;
                    padding:8px 12px;
                    box-shadow:0 4px 16px -6px rgba(58,26,42,0.18),0 1px 0 rgba(255,255,255,0.7) inset;">
         <img src="${esc(logoUrl)}" alt="Rezolve" height="22"
              style="display:block;height:22px;width:auto;border:0;" />
       </span>`
    : `<span style="display:inline-block;background:#ffffff;border-radius:12px;
                    padding:8px 14px;
                    box-shadow:0 4px 16px -6px rgba(58,26,42,0.18),0 1px 0 rgba(255,255,255,0.7) inset;
                    font-size:13px;font-weight:700;color:#3a1a2a;
                    font-family:'Inter Tight',system-ui,sans-serif;letter-spacing:-0.01em;">
         🎈 Rezolve
       </span>`;

  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width,initial-scale=1.0">
  <title>Happy Birthday, ${escaped.name}!</title>
  <link href="https://fonts.googleapis.com/css2?family=Inter+Tight:wght@400;500;600;700;800&display=swap" rel="stylesheet">
</head>
<body style="margin:0;padding:0;background:#f5e8e0;font-family:'Inter Tight',system-ui,-apple-system,sans-serif;">

<table width="100%" cellpadding="0" cellspacing="0" role="presentation">
  <tr>
    <td align="center" style="padding:32px 16px;">

      <!-- ── Gradient card ── -->
      <table width="640" cellpadding="0" cellspacing="0" role="presentation"
        style="background:${palette.bg};border-radius:32px;overflow:hidden;">
        <tr>
          <td style="padding:32px 28px 28px;">

            <!-- ── Header row: logo pill + date pill ── -->
            <table width="100%" cellpadding="0" cellspacing="0" role="presentation"
              style="margin-bottom:28px;">
              <tr>
                <td>
                  ${logoPill}
                </td>
                <td align="right">
                  <span style="display:inline-block;background:rgba(255,255,255,0.6);
                               border-radius:999px;padding:8px 14px;
                               font-size:12px;font-weight:600;color:#3a1a2a;
                               font-family:'Inter Tight',system-ui,sans-serif;
                               letter-spacing:0.04em;">
                    ${escaped.date}
                  </span>
                </td>
              </tr>
            </table>

            <!-- ── Hero image ── -->
            <table width="100%" cellpadding="0" cellspacing="0" role="presentation">
              <tr>
                <td style="border-radius:24px;overflow:hidden;line-height:0;
                           height:360px;
                           box-shadow:0 20px 60px -20px rgba(58,26,42,0.25);
                           border:1px solid rgba(255,255,255,0.6);">
                  <img src="${escaped.imgUrl}"
                       alt="Birthday Celebration"
                       style="display:block;width:100%;height:100%;
                              object-fit:cover;border-radius:24px;border:0;" />
                </td>
              </tr>
            </table>

            <!-- ── Glass card ── -->
            <table width="100%" cellpadding="0" cellspacing="0" role="presentation"
              style="background:rgba(255,255,255,0.88);border-radius:28px;
                     border:1px solid rgba(255,255,255,0.7);
                     box-shadow:0 20px 60px -20px rgba(58,26,42,0.18);
                     margin-top:24px;">
              <tr>
                <td style="padding:32px 32px 28px;">

                  <!-- Heading -->
                  <div style="font-size:32px;font-weight:600;color:#3a1a2a;
                              letter-spacing:-0.025em;line-height:1.1;
                              font-family:'Inter Tight',system-ui,sans-serif;">
                    Happy birthday,<span style="color:#d96a3a;font-style:italic;font-weight:500;"> ${escaped.name}.</span>
                  </div>

                  <!-- Message -->
                  <div style="font-size:15.5px;line-height:1.6;color:#4a2a3a;
                              margin-top:22px;
                              font-family:'Inter Tight',system-ui,sans-serif;">
                    ${escaped.msg}
                  </div>

                  <!-- ── Stats row ── -->
                  <table width="100%" cellpadding="0" cellspacing="0" role="presentation"
                    style="margin-top:28px;">
                    <tr>
                      <td width="33%" style="padding-right:5px;vertical-align:top;">
                        <table width="100%" cellpadding="0" cellspacing="0" role="presentation"
                          style="background:rgba(255,255,255,0.55);border-radius:14px;
                                 border:1px solid rgba(255,255,255,0.8);">
                          <tr><td style="padding:12px 14px;">
                            <div style="font-size:10px;letter-spacing:0.16em;text-transform:uppercase;
                                        color:#3a1a2a;opacity:0.55;font-weight:600;
                                        font-family:'Inter Tight',system-ui,sans-serif;">Today</div>
                            <div style="font-size:22px;margin-top:4px;line-height:1;">🎂</div>
                          </td></tr>
                        </table>
                      </td>
                      <td width="33%" style="padding:0 5px;vertical-align:top;">
                        <table width="100%" cellpadding="0" cellspacing="0" role="presentation"
                          style="background:rgba(255,255,255,0.55);border-radius:14px;
                                 border:1px solid rgba(255,255,255,0.8);">
                          <tr><td style="padding:12px 14px;">
                            <div style="font-size:10px;letter-spacing:0.16em;text-transform:uppercase;
                                        color:#3a1a2a;opacity:0.55;font-weight:600;
                                        font-family:'Inter Tight',system-ui,sans-serif;">Mood</div>
                            <div style="font-size:14px;font-weight:700;color:#3a1a2a;margin-top:4px;
                                        letter-spacing:-0.01em;
                                        font-family:'Inter Tight',system-ui,sans-serif;">${escaped.mood}</div>
                          </td></tr>
                        </table>
                      </td>
                      <td width="33%" style="padding-left:5px;vertical-align:top;">
                        <table width="100%" cellpadding="0" cellspacing="0" role="presentation"
                          style="background:rgba(255,255,255,0.55);border-radius:14px;
                                 border:1px solid rgba(255,255,255,0.8);">
                          <tr><td style="padding:12px 14px;">
                            <div style="font-size:10px;letter-spacing:0.16em;text-transform:uppercase;
                                        color:#3a1a2a;opacity:0.55;font-weight:600;
                                        font-family:'Inter Tight',system-ui,sans-serif;">Fuel</div>
                            <div style="font-size:14px;font-weight:700;color:#3a1a2a;margin-top:4px;
                                        letter-spacing:-0.01em;
                                        font-family:'Inter Tight',system-ui,sans-serif;">${escaped.fuel}</div>
                          </td></tr>
                        </table>
                      </td>
                    </tr>
                  </table>

                  <!-- ── Sign-off ── -->
                  <table width="100%" cellpadding="0" cellspacing="0" role="presentation"
                    style="margin-top:28px;border-top:1px dashed rgba(58,26,42,0.2);">
                    <tr>
                      <td style="padding-top:20px;">
                        <div style="font-size:11px;color:#3a1a2a;opacity:0.55;font-weight:500;
                                    letter-spacing:0.02em;
                                    font-family:'Inter Tight',system-ui,sans-serif;">
                          With warm regards,
                        </div>
                        <div style="font-size:17px;font-weight:700;color:#3a1a2a;
                                    letter-spacing:-0.015em;margin-top:4px;
                                    font-family:'Inter Tight',system-ui,sans-serif;">
                          ${escaped.from}
                        </div>
                      </td>
                    </tr>
                  </table>

                </td>
              </tr>
            </table>

            <!-- ── Footer ── -->
            <table width="100%" cellpadding="0" cellspacing="0" role="presentation"
              style="margin-top:20px;">
              <tr>
                <td align="center">
                  <span style="font-size:11px;color:#3a1a2a;opacity:0.5;font-weight:500;
                               letter-spacing:0.02em;
                               font-family:'Inter Tight',system-ui,sans-serif;">
                    Automated with Care ✦ Design Team
                  </span>
                </td>
              </tr>
            </table>

          </td>
        </tr>
      </table>

    </td>
  </tr>
</table>

</body>
</html>`;
}
