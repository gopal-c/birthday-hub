// ── Illustrations ─────────────────────────────────────────────────────────────
// Each is a self-contained SVG at 200×160 viewBox, colorful, email-safe.

const ILLUSTRATIONS = [

  // 0 — Birthday cake with candles
  `<svg viewBox="0 0 200 160" xmlns="http://www.w3.org/2000/svg">
    <!-- Tiers -->
    <rect x="30" y="108" width="140" height="40" rx="6" fill="#FFB3C6"/>
    <rect x="50" y="78" width="100" height="35" rx="5" fill="#FFC8DD"/>
    <rect x="68" y="57" width="64" height="26" rx="5" fill="#FF85A1"/>
    <!-- Frosting drips -->
    <ellipse cx="52" cy="108" rx="9" ry="5" fill="#fff" opacity=".7"/>
    <ellipse cx="82" cy="108" rx="9" ry="5" fill="#fff" opacity=".7"/>
    <ellipse cx="112" cy="108" rx="9" ry="5" fill="#fff" opacity=".7"/>
    <ellipse cx="142" cy="108" rx="9" ry="5" fill="#fff" opacity=".7"/>
    <ellipse cx="62" cy="78" rx="8" ry="4" fill="#fff" opacity=".6"/>
    <ellipse cx="88" cy="78" rx="8" ry="4" fill="#fff" opacity=".6"/>
    <ellipse cx="114" cy="78" rx="8" ry="4" fill="#fff" opacity=".6"/>
    <!-- Candles -->
    <rect x="82" y="39" width="8" height="21" rx="3" fill="#FF6B6B"/>
    <rect x="96" y="39" width="8" height="21" rx="3" fill="#4ECDC4"/>
    <rect x="110" y="39" width="8" height="21" rx="3" fill="#FFE66D"/>
    <!-- Flames -->
    <ellipse cx="86"  cy="37" rx="4" ry="6" fill="#FF9500" opacity=".9"/>
    <ellipse cx="86"  cy="34" rx="2" ry="4" fill="#FFE234"/>
    <ellipse cx="100" cy="37" rx="4" ry="6" fill="#FF9500" opacity=".9"/>
    <ellipse cx="100" cy="34" rx="2" ry="4" fill="#FFE234"/>
    <ellipse cx="114" cy="37" rx="4" ry="6" fill="#FF9500" opacity=".9"/>
    <ellipse cx="114" cy="34" rx="2" ry="4" fill="#FFE234"/>
    <!-- Stars -->
    <text x="12"  y="72"  font-size="14" fill="#FFE66D" font-family="serif">✦</text>
    <text x="172" y="58"  font-size="11" fill="#FF6B6B" font-family="serif">✦</text>
    <text x="22"  y="42"  font-size="9"  fill="#4ECDC4" font-family="serif">✦</text>
    <text x="162" y="98"  font-size="8"  fill="#C77DFF" font-family="serif">✦</text>
    <text x="14"  y="125" font-size="9"  fill="#FF9500" font-family="serif">★</text>
    <text x="174" y="130" font-size="10" fill="#FFB3C6" font-family="serif">✦</text>
  </svg>`,

  // 1 — Confetti explosion
  `<svg viewBox="0 0 200 160" xmlns="http://www.w3.org/2000/svg">
    <!-- Burst lines -->
    <line x1="100" y1="80" x2="100" y2="12" stroke="#FFE66D" stroke-width="1.5" opacity=".3"/>
    <line x1="100" y1="80" x2="168" y2="32" stroke="#FF6B9D" stroke-width="1.5" opacity=".3"/>
    <line x1="100" y1="80" x2="32"  y2="32" stroke="#4ECDC4" stroke-width="1.5" opacity=".3"/>
    <line x1="100" y1="80" x2="188" y2="80" stroke="#C77DFF" stroke-width="1.5" opacity=".3"/>
    <line x1="100" y1="80" x2="12"  y2="80" stroke="#A8FF78" stroke-width="1.5" opacity=".3"/>
    <line x1="100" y1="80" x2="168" y2="128" stroke="#FF8C42" stroke-width="1.5" opacity=".3"/>
    <line x1="100" y1="80" x2="32"  y2="128" stroke="#6ECFFF" stroke-width="1.5" opacity=".3"/>
    <!-- Rectangle confetti -->
    <rect x="93" y="18" width="10" height="6" rx="1" fill="#FF6B6B"  transform="rotate(15 98 21)"/>
    <rect x="58" y="33" width="9"  height="5" rx="1" fill="#4ECDC4"  transform="rotate(-20 63 36)"/>
    <rect x="128" y="28" width="10" height="5" rx="1" fill="#FFE66D" transform="rotate(35 133 31)"/>
    <rect x="38" y="58" width="9"  height="5" rx="1" fill="#C77DFF"  transform="rotate(-30 43 61)"/>
    <rect x="153" y="53" width="8" height="5" rx="1" fill="#FF6B9D"  transform="rotate(45 157 56)"/>
    <rect x="73" y="13" width="10" height="5" rx="1" fill="#A8FF78"  transform="rotate(-15 78 16)"/>
    <rect x="118" y="63" width="9" height="5" rx="1" fill="#6ECFFF"  transform="rotate(25 123 66)"/>
    <rect x="28" y="83" width="10" height="6" rx="1" fill="#FF8C42"  transform="rotate(-40 33 86)"/>
    <rect x="163" y="78" width="8" height="5" rx="1" fill="#FF6B6B"  transform="rotate(30 167 81)"/>
    <rect x="48" y="108" width="9" height="5" rx="1" fill="#FFE66D"  transform="rotate(20 53 111)"/>
    <rect x="143" y="103" width="10" height="5" rx="1" fill="#4ECDC4" transform="rotate(-25 148 106)"/>
    <rect x="83" y="128" width="8" height="5" rx="1" fill="#C77DFF"  transform="rotate(40 87 131)"/>
    <rect x="113" y="123" width="9" height="6" rx="1" fill="#A8FF78" transform="rotate(-10 118 126)"/>
    <rect x="18" y="128" width="8" height="5" rx="1" fill="#6ECFFF"  transform="rotate(50 22 131)"/>
    <rect x="168" y="123" width="9" height="5" rx="1" fill="#FF8C42" transform="rotate(-35 173 126)"/>
    <!-- Circle confetti -->
    <circle cx="53"  cy="43"  r="5" fill="#FF6B9D" opacity=".85"/>
    <circle cx="143" cy="38"  r="4" fill="#A8FF78" opacity=".85"/>
    <circle cx="33"  cy="98"  r="5" fill="#FFE66D" opacity=".85"/>
    <circle cx="168" cy="98"  r="4" fill="#6ECFFF" opacity=".85"/>
    <circle cx="100" cy="48"  r="6" fill="#FF8C42" opacity=".75"/>
    <circle cx="78"  cy="118" r="4" fill="#C77DFF" opacity=".85"/>
    <circle cx="128" cy="113" r="5" fill="#FF6B6B" opacity=".85"/>
    <!-- Centre star -->
    <text x="100" y="88" font-size="18" fill="#FFE66D" font-family="serif" text-anchor="middle">✦</text>
    <text x="18"  y="53" font-size="10" fill="#FF6B6B" font-family="serif">✦</text>
    <text x="173" y="63" font-size="10" fill="#4ECDC4" font-family="serif">✦</text>
  </svg>`,

  // 2 — Gift boxes
  `<svg viewBox="0 0 200 160" xmlns="http://www.w3.org/2000/svg">
    <!-- Big gift -->
    <rect x="55"  y="92"  width="90" height="55" rx="5" fill="#FF6B6B"/>
    <rect x="55"  y="78"  width="90" height="19" rx="4" fill="#FF4757"/>
    <rect x="95"  y="78"  width="10" height="69" fill="#FFE234"/>
    <rect x="55"  y="93"  width="90" height="10" fill="#FFE234"/>
    <ellipse cx="87"  cy="74" rx="15" ry="9" fill="#FFE234" transform="rotate(-20 87 74)"/>
    <ellipse cx="113" cy="74" rx="15" ry="9" fill="#FFE234" transform="rotate(20 113 74)"/>
    <circle  cx="100" cy="78" r="7"            fill="#FFC200"/>
    <!-- Small gift left -->
    <rect x="13" y="112" width="52" height="36" rx="4" fill="#C77DFF"/>
    <rect x="13" y="101" width="52" height="17" rx="3" fill="#9D4EDD"/>
    <rect x="35" y="101" width="8"  height="47" fill="#FFB3C6"/>
    <rect x="13" y="114" width="52" height="8"  fill="#FFB3C6"/>
    <ellipse cx="31" cy="98" rx="11" ry="6" fill="#FFB3C6" transform="rotate(-15 31 98)"/>
    <ellipse cx="51" cy="98" rx="11" ry="6" fill="#FFB3C6" transform="rotate(15 51 98)"/>
    <circle  cx="41" cy="101" r="5"           fill="#FF85A1"/>
    <!-- Small gift right -->
    <rect x="135" y="117" width="52" height="31" rx="4" fill="#4ECDC4"/>
    <rect x="135" y="106" width="52" height="17" rx="3" fill="#2EB8AD"/>
    <rect x="157" y="106" width="8"  height="42" fill="#FFE66D"/>
    <rect x="135" y="119" width="52" height="8"  fill="#FFE66D"/>
    <ellipse cx="151" cy="103" rx="11" ry="6" fill="#FFE66D" transform="rotate(-15 151 103)"/>
    <ellipse cx="171" cy="103" rx="11" ry="6" fill="#FFE66D" transform="rotate(15 171 103)"/>
    <circle  cx="161" cy="106" r="5"            fill="#FFC200"/>
    <!-- Stars -->
    <text x="10"  y="80" font-size="13" fill="#FFE66D" font-family="serif">✦</text>
    <text x="177" y="73" font-size="11" fill="#FF6B9D" font-family="serif">✦</text>
    <text x="88"  y="35" font-size="10" fill="#C77DFF" font-family="serif">✦</text>
    <text x="43"  y="58" font-size="9"  fill="#4ECDC4" font-family="serif">★</text>
    <text x="153" y="53" font-size="9"  fill="#FF6B6B" font-family="serif">★</text>
  </svg>`,

  // 3 — Champagne glasses clinking
  `<svg viewBox="0 0 200 160" xmlns="http://www.w3.org/2000/svg">
    <!-- Left flute -->
    <polygon points="65,28 85,28 80,103 70,103" fill="#FFE99A" opacity=".65"/>
    <polygon points="65,28 85,28 80,103 70,103" fill="none" stroke="#D4AF37" stroke-width="2"/>
    <rect x="74"  y="103" width="4"  height="26" fill="#D4AF37"/>
    <rect x="60"  y="126" width="32" height="5"  rx="2" fill="#D4AF37"/>
    <circle cx="72" cy="88" r="2"   fill="#fff" opacity=".7"/>
    <circle cx="76" cy="72" r="1.5" fill="#fff" opacity=".7"/>
    <circle cx="79" cy="55" r="2"   fill="#fff" opacity=".7"/>
    <circle cx="74" cy="43" r="1.5" fill="#fff" opacity=".6"/>
    <!-- Right flute -->
    <polygon points="115,28 135,28 130,103 120,103" fill="#FFE99A" opacity=".65"/>
    <polygon points="115,28 135,28 130,103 120,103" fill="none" stroke="#D4AF37" stroke-width="2"/>
    <rect x="122" y="103" width="4"  height="26" fill="#D4AF37"/>
    <rect x="108" y="126" width="32" height="5"  rx="2" fill="#D4AF37"/>
    <circle cx="122" cy="86" r="2"   fill="#fff" opacity=".7"/>
    <circle cx="126" cy="68" r="1.5" fill="#fff" opacity=".7"/>
    <circle cx="129" cy="52" r="2"   fill="#fff" opacity=".7"/>
    <circle cx="124" cy="41" r="1.5" fill="#fff" opacity=".6"/>
    <!-- Clink -->
    <line x1="85"  y1="28" x2="115" y2="28" stroke="#D4AF37"  stroke-width="2"/>
    <line x1="90"  y1="20" x2="88"  y2="8"  stroke="#FFD700"  stroke-width="2" opacity=".9"/>
    <line x1="100" y1="16" x2="100" y2="4"  stroke="#FFD700"  stroke-width="2" opacity=".9"/>
    <line x1="110" y1="20" x2="112" y2="8"  stroke="#FFD700"  stroke-width="2" opacity=".9"/>
    <ellipse cx="100" cy="27" rx="13" ry="5" fill="#FFE99A" opacity=".5"/>
    <!-- Floating bubbles -->
    <circle cx="40"  cy="68"  r="5" fill="#FFE99A" opacity=".35"/>
    <circle cx="165" cy="63"  r="4" fill="#FFE99A" opacity=".35"/>
    <circle cx="22"  cy="118" r="3" fill="#D4AF37"  opacity=".35"/>
    <circle cx="180" cy="112" r="4" fill="#D4AF37"  opacity=".35"/>
    <!-- Stars -->
    <text x="13"  y="48"  font-size="15" fill="#FFD700"  font-family="serif">✦</text>
    <text x="172" y="43"  font-size="12" fill="#FF6B9D"  font-family="serif">✦</text>
    <text x="28"  y="98"  font-size="10" fill="#C77DFF"  font-family="serif">✦</text>
    <text x="162" y="93"  font-size="9"  fill="#4ECDC4"  font-family="serif">✦</text>
    <text x="48"  y="142" font-size="9"  fill="#FF8C42"  font-family="serif">★</text>
    <text x="145" y="142" font-size="9"  fill="#6ECFFF"  font-family="serif">★</text>
  </svg>`,

  // 4 — Balloon wreath with flowers
  `<svg viewBox="0 0 200 160" xmlns="http://www.w3.org/2000/svg">
    <!-- Balloons -->
    <ellipse cx="35"  cy="102" rx="16" ry="20" fill="#FF6B9D" opacity=".92"/>
    <path d="M35 122 Q33 137 32 150"  stroke="#FF6B9D" stroke-width="1.5" fill="none"/>
    <ellipse cx="25"  cy="70"  rx="14" ry="18" fill="#FFE234"  opacity=".92"/>
    <path d="M25 88 Q23 103 22 118"   stroke="#FFE234"  stroke-width="1.5" fill="none"/>
    <ellipse cx="48"  cy="43"  rx="14" ry="18" fill="#4ECDC4"  opacity=".92"/>
    <path d="M48 61 Q46 76 45 91"     stroke="#4ECDC4"  stroke-width="1.5" fill="none"/>
    <ellipse cx="100" cy="22"  rx="17" ry="21" fill="#C77DFF"  opacity=".92"/>
    <path d="M100 43 Q98 58 97 73"    stroke="#C77DFF"  stroke-width="1.5" fill="none"/>
    <ellipse cx="152" cy="43"  rx="14" ry="18" fill="#FF8C42"  opacity=".92"/>
    <path d="M152 61 Q150 76 149 91"  stroke="#FF8C42"  stroke-width="1.5" fill="none"/>
    <ellipse cx="170" cy="72"  rx="14" ry="18" fill="#A8FF78"  opacity=".92"/>
    <path d="M170 90 Q168 105 167 120" stroke="#A8FF78"  stroke-width="1.5" fill="none"/>
    <ellipse cx="160" cy="104" rx="16" ry="20" fill="#6ECFFF"  opacity=".92"/>
    <path d="M160 124 Q158 139 157 150" stroke="#6ECFFF" stroke-width="1.5" fill="none"/>
    <!-- Flower left -->
    <circle cx="70" cy="30" r="4" fill="#FF6B9D"/>
    <circle cx="70" cy="23" r="4" fill="#FF6B9D"/>
    <circle cx="77" cy="27" r="4" fill="#FF6B9D"/>
    <circle cx="77" cy="35" r="4" fill="#FF6B9D"/>
    <circle cx="70" cy="39" r="4" fill="#FF6B9D"/>
    <circle cx="63" cy="35" r="4" fill="#FF6B9D"/>
    <circle cx="63" cy="27" r="4" fill="#FF6B9D"/>
    <circle cx="70" cy="31" r="5" fill="#FFE234"/>
    <!-- Flower right -->
    <circle cx="130" cy="30" r="4" fill="#A8FF78"/>
    <circle cx="130" cy="23" r="4" fill="#A8FF78"/>
    <circle cx="137" cy="27" r="4" fill="#A8FF78"/>
    <circle cx="137" cy="35" r="4" fill="#A8FF78"/>
    <circle cx="130" cy="39" r="4" fill="#A8FF78"/>
    <circle cx="123" cy="35" r="4" fill="#A8FF78"/>
    <circle cx="123" cy="27" r="4" fill="#A8FF78"/>
    <circle cx="130" cy="31" r="5" fill="#FFE234"/>
    <!-- Stars -->
    <text x="84"  y="78" font-size="10" fill="#FFE234" font-family="serif">✦</text>
    <text x="106" y="72" font-size="8"  fill="#FF6B9D" font-family="serif">✦</text>
    <text x="8"   y="43" font-size="9"  fill="#C77DFF" font-family="serif">✦</text>
    <text x="180" y="33" font-size="9"  fill="#FF8C42" font-family="serif">✦</text>
  </svg>`,

  // 5 — Party hat with fireworks
  `<svg viewBox="0 0 200 160" xmlns="http://www.w3.org/2000/svg">
    <!-- Hat -->
    <polygon points="100,14 54,122 146,122" fill="#FF6B6B"/>
    <polygon points="100,14 90,46 110,46"   fill="#FFE234" opacity=".85"/>
    <polygon points="100,14 76,82 124,82"   fill="#FF6B9D" opacity=".4"/>
    <!-- Dots -->
    <circle cx="92"  cy="57"  r="5" fill="#FFE234" opacity=".9"/>
    <circle cx="108" cy="57"  r="5" fill="#4ECDC4"  opacity=".9"/>
    <circle cx="84"  cy="80"  r="5" fill="#C77DFF"  opacity=".9"/>
    <circle cx="100" cy="80"  r="5" fill="#FFE234"  opacity=".9"/>
    <circle cx="116" cy="80"  r="5" fill="#FF8C42"  opacity=".9"/>
    <circle cx="73"  cy="105" r="5" fill="#6ECFFF"  opacity=".9"/>
    <circle cx="89"  cy="105" r="5" fill="#A8FF78"  opacity=".9"/>
    <circle cx="111" cy="105" r="5" fill="#FF6B9D"  opacity=".9"/>
    <circle cx="127" cy="105" r="5" fill="#FFE234"  opacity=".9"/>
    <!-- Brim -->
    <ellipse cx="100" cy="122" rx="47" ry="8" fill="#FF4757"/>
    <!-- Pom -->
    <circle cx="100" cy="14" r="10" fill="#FFE234"/>
    <circle cx="100" cy="14" r="5"  fill="#FFC200"/>
    <!-- Streamers -->
    <path d="M100 14 Q80 32 68 22 Q58 12 48 26" stroke="#4ECDC4" stroke-width="2" fill="none"/>
    <path d="M100 14 Q120 32 132 22 Q142 12 152 26" stroke="#FF6B9D" stroke-width="2" fill="none"/>
    <!-- Left firework -->
    <line x1="30" y1="62" x2="30" y2="42"  stroke="#FFE234" stroke-width="2"/>
    <line x1="30" y1="62" x2="15" y2="52"  stroke="#FFE234" stroke-width="2"/>
    <line x1="30" y1="62" x2="45" y2="52"  stroke="#FFE234" stroke-width="2"/>
    <line x1="30" y1="62" x2="15" y2="72"  stroke="#FFE234" stroke-width="2"/>
    <line x1="30" y1="62" x2="45" y2="72"  stroke="#FFE234" stroke-width="2"/>
    <line x1="30" y1="62" x2="22" y2="44"  stroke="#FFE234" stroke-width="2"/>
    <line x1="30" y1="62" x2="38" y2="44"  stroke="#FFE234" stroke-width="2"/>
    <circle cx="30" cy="62" r="4"           fill="#FFE234"/>
    <!-- Right firework -->
    <line x1="170" y1="52" x2="170" y2="32" stroke="#FF6B9D" stroke-width="2"/>
    <line x1="170" y1="52" x2="155" y2="42" stroke="#FF6B9D" stroke-width="2"/>
    <line x1="170" y1="52" x2="185" y2="42" stroke="#FF6B9D" stroke-width="2"/>
    <line x1="170" y1="52" x2="155" y2="64" stroke="#FF6B9D" stroke-width="2"/>
    <line x1="170" y1="52" x2="185" y2="64" stroke="#FF6B9D" stroke-width="2"/>
    <line x1="170" y1="52" x2="162" y2="34" stroke="#FF6B9D" stroke-width="2"/>
    <line x1="170" y1="52" x2="178" y2="34" stroke="#FF6B9D" stroke-width="2"/>
    <circle cx="170" cy="52" r="4"            fill="#FF6B9D"/>
    <!-- Small top-right firework -->
    <line x1="158" y1="20" x2="158" y2="8"   stroke="#4ECDC4" stroke-width="1.5"/>
    <line x1="158" y1="20" x2="148" y2="13"  stroke="#4ECDC4" stroke-width="1.5"/>
    <line x1="158" y1="20" x2="168" y2="13"  stroke="#4ECDC4" stroke-width="1.5"/>
    <line x1="158" y1="20" x2="148" y2="27"  stroke="#4ECDC4" stroke-width="1.5"/>
    <line x1="158" y1="20" x2="168" y2="27"  stroke="#4ECDC4" stroke-width="1.5"/>
    <circle cx="158" cy="20" r="3"             fill="#4ECDC4"/>
  </svg>`,

];

// ── Template ──────────────────────────────────────────────────────────────────

export function buildEmailHTML(
  name: string,
  department: string,
  message: string,
  fromName = "The HR Team",
  illustrationIndex?: number
): string {
  const idx =
    illustrationIndex !== undefined && illustrationIndex >= 0 && illustrationIndex < ILLUSTRATIONS.length
      ? illustrationIndex
      : Math.floor(Math.random() * ILLUSTRATIONS.length);

  const svg = ILLUSTRATIONS[idx];

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
          <svg viewBox="0 0 280 96" xmlns="http://www.w3.org/2000/svg"
               style="width:220px;display:block;margin:0 auto 22px;">
            <ellipse cx="28"  cy="38" rx="14" ry="18" fill="#FF6B9D" opacity=".92"/>
            <path d="M28 56Q26 70 25 82"  stroke="#FF6B9D" stroke-width="1.5" fill="none"/>
            <ellipse cx="62"  cy="26" rx="14" ry="18" fill="#FFC23E" opacity=".92"/>
            <path d="M62 44Q60 58 59 82"  stroke="#FFC23E" stroke-width="1.5" fill="none"/>
            <ellipse cx="98"  cy="32" rx="14" ry="18" fill="#6ECFFF" opacity=".92"/>
            <path d="M98 50Q96 64 95 82"  stroke="#6ECFFF" stroke-width="1.5" fill="none"/>
            <ellipse cx="134" cy="26" rx="14" ry="18" fill="#A8FF78" opacity=".92"/>
            <path d="M134 44Q132 58 131 82" stroke="#A8FF78" stroke-width="1.5" fill="none"/>
            <ellipse cx="168" cy="33" rx="14" ry="18" fill="#FF8C42" opacity=".92"/>
            <path d="M168 51Q166 65 165 82" stroke="#FF8C42" stroke-width="1.5" fill="none"/>
            <ellipse cx="202" cy="28" rx="13" ry="17" fill="#C77DFF" opacity=".92"/>
            <path d="M202 45Q200 59 199 82" stroke="#C77DFF" stroke-width="1.5" fill="none"/>
            <ellipse cx="248" cy="36" rx="12" ry="16" fill="#FF6B9D" opacity=".78"/>
            <path d="M248 52Q246 66 245 82" stroke="#FF6B9D" stroke-width="1.5" fill="none"/>
            <text x="8"   y="18" font-size="9" fill="#FFC23E" font-family="serif">✦</text>
            <text x="43"  y="10" font-size="7" fill="#FF6B9D" font-family="serif">✦</text>
            <text x="116" y="8"  font-size="9" fill="#6ECFFF" font-family="serif">✦</text>
            <text x="152" y="12" font-size="7" fill="#A8FF78" font-family="serif">✦</text>
            <text x="222" y="14" font-size="8" fill="#FFC23E" font-family="serif">✦</text>
            <text x="264" y="10" font-size="7" fill="#FF6B9D" font-family="serif">✦</text>
          </svg>
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
        <td style="padding:52px 40px 44px;text-align:center;">
          <!-- Illustration -->
          <div style="display:inline-block;width:200px;height:160px;">
            ${svg}
          </div>
          <!-- Message -->
          <p style="margin:32px auto 0;max-width:400px;color:#2D1B69;font-size:17px;
                    line-height:1.9;font-family:Georgia,serif;text-align:center;">
            ${escaped.msg}
          </p>
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
