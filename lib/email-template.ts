// ── Illustrations ─────────────────────────────────────────────────────────────
// Email-safe HTML+emoji panels (SVG is stripped by Gmail/Outlook).
// Each is a self-contained table cell, ~240px wide, centered in the email.

const ILLUSTRATIONS: { bg: string; html: string }[] = [

  // 0 — Birthday cake with candles
  {
    bg: "#FFF0F5",
    html: `
      <div style="font-size:26px;letter-spacing:10px;margin-bottom:6px;">🕯️&nbsp;🕯️&nbsp;🕯️</div>
      <div style="font-size:80px;line-height:1;margin-bottom:8px;">🎂</div>
      <div style="font-size:22px;letter-spacing:8px;">⭐&nbsp;✨&nbsp;⭐&nbsp;✨&nbsp;⭐</div>`,
  },

  // 1 — Confetti & streamers
  {
    bg: "#F5F0FF",
    html: `
      <div style="font-size:22px;letter-spacing:6px;margin-bottom:6px;">🎊&nbsp;🎉&nbsp;🎊&nbsp;🎉</div>
      <div style="font-size:76px;line-height:1;margin-bottom:8px;">🎉</div>
      <div style="font-size:22px;letter-spacing:8px;">✨&nbsp;🌟&nbsp;✨&nbsp;🌟&nbsp;✨</div>`,
  },

  // 2 — Gift boxes
  {
    bg: "#F0F8FF",
    html: `
      <div style="font-size:22px;letter-spacing:8px;margin-bottom:6px;">✨&nbsp;🎀&nbsp;✨</div>
      <div style="font-size:76px;line-height:1;margin-bottom:8px;">🎁</div>
      <div style="font-size:22px;letter-spacing:6px;">🎁&nbsp;🎀&nbsp;🎁&nbsp;🎀&nbsp;🎁</div>`,
  },

  // 3 — Champagne glasses
  {
    bg: "#FFFBF0",
    html: `
      <div style="font-size:22px;letter-spacing:8px;margin-bottom:6px;">🌟&nbsp;✨&nbsp;🌟</div>
      <div style="font-size:76px;line-height:1;margin-bottom:8px;">🥂</div>
      <div style="font-size:22px;letter-spacing:6px;">🍾&nbsp;✨&nbsp;🥂&nbsp;✨&nbsp;🍾</div>`,
  },

  // 4 — Balloons & flowers
  {
    bg: "#F0FFF5",
    html: `
      <div style="font-size:22px;letter-spacing:6px;margin-bottom:6px;">🌸&nbsp;🌼&nbsp;🌸&nbsp;🌼</div>
      <div style="font-size:76px;line-height:1;margin-bottom:8px;">🎈</div>
      <div style="font-size:22px;letter-spacing:6px;">🎈&nbsp;🌟&nbsp;🎈&nbsp;🌟&nbsp;🎈</div>`,
  },

  // 5 — Party hat & fireworks
  {
    bg: "#FFF5F0",
    html: `
      <div style="font-size:22px;letter-spacing:6px;margin-bottom:6px;">🎆&nbsp;✨&nbsp;🎇</div>
      <div style="font-size:76px;line-height:1;margin-bottom:8px;">🎉</div>
      <div style="font-size:22px;letter-spacing:6px;">🎆&nbsp;🌟&nbsp;🎉&nbsp;🌟&nbsp;🎇</div>`,
  },

];

// ── Header balloon SVG ────────────────────────────────────────────────────────
// Kept only in the purple header where SVG *does* render (rendered by the
// mail client's HTML engine in the body — some clients support it there,
// and if not, it's decorative-only so stripping it is harmless).
const HEADER_SVG = `
  <svg viewBox="0 0 280 96" xmlns="http://www.w3.org/2000/svg"
       style="width:220px;display:block;margin:0 auto 22px;">
    <ellipse cx="28"  cy="38" rx="14" ry="18" fill="#FF6B9D" opacity=".92"/>
    <path d="M28 56Q26 70 25 82"   stroke="#FF6B9D" stroke-width="1.5" fill="none"/>
    <ellipse cx="62"  cy="26" rx="14" ry="18" fill="#FFC23E" opacity=".92"/>
    <path d="M62 44Q60 58 59 82"   stroke="#FFC23E" stroke-width="1.5" fill="none"/>
    <ellipse cx="98"  cy="32" rx="14" ry="18" fill="#6ECFFF" opacity=".92"/>
    <path d="M98 50Q96 64 95 82"   stroke="#6ECFFF" stroke-width="1.5" fill="none"/>
    <ellipse cx="134" cy="26" rx="14" ry="18" fill="#A8FF78" opacity=".92"/>
    <path d="M134 44Q132 58 131 82" stroke="#A8FF78" stroke-width="1.5" fill="none"/>
    <ellipse cx="168" cy="33" rx="14" ry="18" fill="#FF8C42" opacity=".92"/>
    <path d="M168 51Q166 65 165 82" stroke="#FF8C42" stroke-width="1.5" fill="none"/>
    <ellipse cx="202" cy="28" rx="13" ry="17" fill="#C77DFF" opacity=".92"/>
    <path d="M202 45Q200 59 199 82" stroke="#C77DFF" stroke-width="1.5" fill="none"/>
    <ellipse cx="248" cy="36" rx="12" ry="16" fill="#FF6B9D" opacity=".78"/>
    <path d="M248 52Q246 66 245 82" stroke="#FF6B9D" stroke-width="1.5" fill="none"/>
  </svg>`;

// ── Template ──────────────────────────────────────────────────────────────────

export function buildEmailHTML(
  name: string,
  department: string,
  message: string,
  fromName = "The HR Team",
  illustrationIndex?: number
): string {
  const idx =
    illustrationIndex !== undefined &&
    illustrationIndex >= 0 &&
    illustrationIndex < ILLUSTRATIONS.length
      ? illustrationIndex
      : Math.floor(Math.random() * ILLUSTRATIONS.length);

  const { bg, html: illoHtml } = ILLUSTRATIONS[idx];

  const escaped = {
    name: esc(name),
    dept: esc(department),
    msg:  esc(message).replace(/\n/g, "<br>"),
    from: esc(fromName),
  };

  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width,initial-scale=1.0">
  <title>Happy Birthday, ${escaped.name}!</title>
</head>
<body style="margin:0;padding:0;background:#f0ebf8;font-family:'Georgia',Georgia,serif;">
<table width="100%" cellpadding="0" cellspacing="0" role="presentation">
  <tr><td align="center" style="padding:32px 16px;">

    <table width="600" cellpadding="0" cellspacing="0" role="presentation"
      style="background:#ffffff;border-radius:16px;overflow:hidden;
             box-shadow:0 4px 32px rgba(45,27,105,0.12);">

      <!-- ── Header ── -->
      <tr>
        <td style="background:#2D1B69;padding:48px 40px 40px;text-align:center;">
          ${HEADER_SVG}
          <p style="margin:0 0 6px;color:rgba(255,255,255,0.65);font-size:13px;
                    letter-spacing:2.5px;text-transform:uppercase;font-family:Georgia,serif;">
            Happy Birthday
          </p>
          <h1 style="margin:0;color:#FFC23E;font-size:40px;font-weight:700;
                     letter-spacing:-1px;font-family:Georgia,serif;line-height:1.1;">
            ${escaped.name}! 🎂
          </h1>
        </td>
      </tr>

      <!-- ── Illustration + message ── -->
      <tr>
        <td style="padding:48px 40px 44px;text-align:center;">

          <!-- Illustration panel -->
          <table width="240" cellpadding="0" cellspacing="0" align="center"
            style="margin:0 auto 32px;">
            <tr>
              <td align="center"
                style="background:${bg};border-radius:20px;padding:28px 24px;
                       line-height:1.3;">
                ${illoHtml}
              </td>
            </tr>
          </table>

          <!-- Message -->
          <table width="400" cellpadding="0" cellspacing="0" align="center"
            style="margin:0 auto;">
            <tr>
              <td align="center"
                style="color:#2D1B69;font-size:17px;line-height:1.9;
                       font-family:Georgia,serif;text-align:center;">
                ${escaped.msg}
              </td>
            </tr>
          </table>

        </td>
      </tr>

      <!-- ── Divider ── -->
      <tr>
        <td style="padding:0 44px;">
          <div style="height:1px;background:linear-gradient(to right,transparent,#d8d0ee,transparent);"></div>
        </td>
      </tr>

      <!-- ── Footer ── -->
      <tr>
        <td style="padding:28px 44px 40px;text-align:center;">
          <p style="margin:0 0 4px;color:#aaa;font-size:13px;font-family:Georgia,serif;">
            With warmth &amp; celebration,
          </p>
          <p style="margin:0 0 22px;color:#2D1B69;font-size:16px;font-weight:700;
                    font-family:Georgia,serif;">
            ${escaped.from}
          </p>
          <span style="display:inline-block;background:#f0ebf8;padding:12px 28px;
                       border-radius:50px;color:#2D1B69;font-size:13px;font-weight:600;
                       font-family:Georgia,serif;">
            🎈 Today is your day — make it unforgettable!
          </span>
        </td>
      </tr>

    </table>

    <p style="color:#bbb;font-size:11px;margin-top:20px;font-family:Georgia,serif;">
      This email was sent by Birthday Hub &bull; automated with care ✦
    </p>

  </td></tr>
</table>
</body>
</html>`;
}

function esc(str: string): string {
  return (str || "")
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}
