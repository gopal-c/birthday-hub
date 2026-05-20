// ── Pollinations image prompts ────────────────────────────────────────────────
const PROMPTS = [
  "birthday celebration flatlay, soft pastel pink and cream background, macarons roses gold confetti, aesthetic minimal, studio lighting, top down view",
  "elegant birthday setup soft lavender and white background, candles flowers ribbon bokeh, dreamy pastel aesthetic, soft focus",
  "birthday cake close up sage green and blush pink pastel background, flowers berries gold leaf, aesthetic food photography, soft natural light",
  "festive celebration still life, soft peach and ivory background, champagne flowers confetti ribbons, luxury minimal aesthetic",
  "birthday morning flatlay, soft blue and white pastel, coffee flowers small gifts wrapped in ribbon, cozy aesthetic editorial",
  "colorful balloons bouquet against soft yellow cream gradient background, minimal modern aesthetic, studio shot airy light",
];

function imageUrl(idx: number): string {
  const seed   = Math.floor(Math.random() * 1000);
  const prompt = encodeURIComponent(PROMPTS[idx]);
  return `https://image.pollinations.ai/prompt/${prompt}?width=560&height=220&nologo=true&seed=${seed}`;
}

// ── Helpers ───────────────────────────────────────────────────────────────────

/** Trim the AI message to at most 2 sentences so it never runs long in the email. */
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
  illustrationIndex?: number
): string {
  const idx =
    illustrationIndex !== undefined &&
    illustrationIndex >= 0 &&
    illustrationIndex < PROMPTS.length
      ? illustrationIndex
      : Math.floor(Math.random() * PROMPTS.length);

  const escaped = {
    name: esc(name),
    msg:  esc(twoSentences(message)).replace(/\n/g, "<br>"),
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
             box-shadow:0 8px 40px rgba(45,27,105,0.15);">

      <!-- ── Header ── -->
      <tr>
        <td style="background:#2D1B69;padding:60px 48px 48px;text-align:center;
                   border-radius:0 0 40px 40px;">

          <!-- Balloon row (decorative; stripped gracefully if unsupported) -->
          <table cellpadding="0" cellspacing="0" align="center" style="margin:0 auto 20px;">
            <tr>
              <td style="font-size:32px;letter-spacing:6px;line-height:1;">
                🎈&nbsp;🎈&nbsp;🎈&nbsp;🎈&nbsp;🎈
              </td>
            </tr>
          </table>

          <p style="margin:0 0 8px;color:rgba(255,255,255,0.65);font-size:13px;
                    letter-spacing:2.5px;text-transform:uppercase;font-family:Georgia,serif;">
            Happy Birthday
          </p>
          <h1 style="margin:0;color:#FFC23E;font-size:42px;font-weight:700;
                     letter-spacing:-1px;font-family:Georgia,serif;line-height:1.1;">
            ${escaped.name}! 🎂
          </h1>
        </td>
      </tr>

      <!-- ── Pollinations image ── -->
      <tr>
        <td style="padding:0 20px;line-height:0;background:#ffffff;">
          <img src="${imageUrl(idx)}"
               width="560" height="220"
               alt="Birthday celebration"
               style="display:block;width:560px;max-width:100%;height:220px;
                      object-fit:cover;border-radius:0 0 12px 12px;" />
        </td>
      </tr>

      <!-- ── Message ── -->
      <tr>
        <td style="padding:48px 48px 44px;text-align:center;">
          <table width="400" cellpadding="0" cellspacing="0" align="center"
            style="margin:0 auto;">
            <tr>
              <td align="center"
                style="color:#2D1B69;font-size:16px;line-height:1.8;
                       font-family:Georgia,serif;text-align:center;">
                ${escaped.msg}
              </td>
            </tr>
          </table>
        </td>
      </tr>

      <!-- ── Divider ── -->
      <tr>
        <td style="padding:0 48px;">
          <div style="height:1px;background:#f0ebf8;"></div>
        </td>
      </tr>

      <!-- ── Footer ── -->
      <tr>
        <td style="padding:32px 48px 48px;text-align:center;">
          <p style="margin:0 0 4px;color:#aaa;font-size:13px;font-family:Georgia,serif;">
            With warmth &amp; celebration,
          </p>
          <p style="margin:0 0 24px;color:#2D1B69;font-size:16px;font-weight:700;
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
