// ── Background palettes ───────────────────────────────────────────────────────
interface Palette { id: string; label: string; bg: string; }

export const SUNRISE_PALETTES: Palette[] = [
  { id: "sunrise",    label: "Sunrise",    bg: "linear-gradient(180deg,#ffe4d6 0%,#ffd4c2 35%,#f9c4d4 70%,#e8c8ec 100%)" },
  { id: "mint-marine",label: "Mint Marine",bg: "linear-gradient(180deg,#e6f5e6 0%,#c8ecdf 40%,#b8dde8 75%,#c8d4f0 100%)" },
  { id: "honey-gold", label: "Honey Gold", bg: "linear-gradient(180deg,#fff4d6 0%,#fae0a0 35%,#e8b870 70%,#c08838 100%)" },
  { id: "lilac-dawn", label: "Lilac Dawn", bg: "linear-gradient(180deg,#f5e8ff 0%,#e0d0f5 35%,#c8bce8 70%,#a8b0d8 100%)" },
  { id: "citrus-sky", label: "Citrus Sky", bg: "linear-gradient(180deg,#fef8d6 0%,#fae8a8 30%,#d8e8c0 65%,#b8d4e8 100%)" },
  { id: "ember",      label: "Ember",      bg: "linear-gradient(180deg,#ffe0d0 0%,#ff9c80 35%,#d8485c 70%,#6a1d34 100%)" },
];

export function resolvePalette(id?: string): Palette {
  return (id && SUNRISE_PALETTES.find((p) => p.id === id)) ||
    SUNRISE_PALETTES[Math.floor(Math.random() * SUNRISE_PALETTES.length)];
}

// ── Premium SVG illustrations ─────────────────────────────────────────────────

const svg1 = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 600 240" width="100%" height="240" style="display:block;">
  <rect width="560" height="220" fill="#FDF0F0"/>
  <!-- dotted borders -->
  <line x1="0" y1="7" x2="560" y2="7" stroke="#F9C8C8" stroke-width="2" stroke-dasharray="4,7" opacity=".9"/>
  <line x1="0" y1="213" x2="560" y2="213" stroke="#F9C8C8" stroke-width="2" stroke-dasharray="4,7" opacity=".9"/>
  <!-- confetti rects -->
  <rect x="28" y="22" width="11" height="6" rx="2" fill="#FF9B9B" opacity=".7" transform="rotate(-22,33,25)"/>
  <rect x="488" y="18" width="9" height="5" rx="2" fill="#B5EAD7" opacity=".7" transform="rotate(18,492,21)"/>
  <rect x="58" y="168" width="10" height="6" rx="2" fill="#C7CEEA" opacity=".65" transform="rotate(-35,63,171)"/>
  <rect x="462" y="162" width="11" height="6" rx="2" fill="#FFD4A3" opacity=".65" transform="rotate(28,467,165)"/>
  <rect x="100" y="200" width="9" height="5" rx="2" fill="#FF9B9B" opacity=".55" transform="rotate(-15,104,202)"/>
  <rect x="430" y="195" width="10" height="5" rx="2" fill="#C7CEEA" opacity=".55" transform="rotate(22,435,198)"/>
  <rect x="245" y="10" width="8" height="5" rx="2" fill="#B5EAD7" opacity=".6" transform="rotate(10,249,12)"/>
  <rect x="305" y="205" width="9" height="5" rx="2" fill="#FFD4A3" opacity=".55" transform="rotate(-18,309,208)"/>
  <!-- confetti circles -->
  <circle cx="52" cy="48" r="5" fill="#FFD4A3" opacity=".65"/>
  <circle cx="505" cy="60" r="6" fill="#C7CEEA" opacity=".6"/>
  <circle cx="38" cy="140" r="4" fill="#B5EAD7" opacity=".6"/>
  <circle cx="516" cy="148" r="5" fill="#FF9B9B" opacity=".6"/>
  <circle cx="322" cy="14" r="4" fill="#FF9B9B" opacity=".55"/>
  <circle cx="148" cy="210" r="5" fill="#FFD4A3" opacity=".5"/>
  <circle cx="412" cy="210" r="4" fill="#B5EAD7" opacity=".5"/>
  <!-- BOTTOM TIER — scalloped top path + body -->
  <path d="M138,143 Q146,133 154,143 Q162,133 170,143 Q178,133 186,143 Q194,133 202,143 Q210,133 218,143 Q226,133 234,143 Q242,133 250,143 Q258,133 266,143 Q274,133 282,143 Q290,133 298,143 Q306,133 314,143 Q322,133 330,143 Q338,133 346,143 Q354,133 362,143 Q370,133 378,143 Q386,133 394,143 Q402,133 410,143 Q416,138 422,143 L422,208 L138,208 Z" fill="#F9C8C8"/>
  <path d="M138,143 Q146,133 154,143 Q162,133 170,143 Q178,133 186,143 Q194,133 202,143 Q210,133 218,143 Q226,133 234,143 Q242,133 250,143 Q258,133 266,143 Q274,133 282,143 Q290,133 298,143 Q306,133 314,143 Q322,133 330,143 Q338,133 346,143 Q354,133 362,143 Q370,133 378,143 Q386,133 394,143 Q402,133 410,143 Q416,138 422,143" fill="none" stroke="white" stroke-width="3" opacity=".7"/>
  <!-- bottom tier pearl dots -->
  <circle cx="175" cy="174" r="6" fill="#FADDD0" opacity=".85"/>
  <circle cx="218" cy="165" r="5" fill="#FADDD0" opacity=".8"/>
  <circle cx="280" cy="176" r="7" fill="#FADDD0" opacity=".85"/>
  <circle cx="342" cy="165" r="5" fill="#FADDD0" opacity=".8"/>
  <circle cx="385" cy="174" r="6" fill="#FADDD0" opacity=".85"/>
  <!-- MIDDLE TIER -->
  <path d="M173,96 Q181,86 189,96 Q197,86 205,96 Q213,86 221,96 Q229,86 237,96 Q245,86 253,96 Q261,86 269,96 Q277,86 285,96 Q293,86 301,96 Q309,86 317,96 Q325,86 333,96 Q341,86 349,96 Q357,86 365,96 Q371,90 375,96 L375,146 L173,146 Z" fill="#FADDD0"/>
  <path d="M173,96 Q181,86 189,96 Q197,86 205,96 Q213,86 221,96 Q229,86 237,96 Q245,86 253,96 Q261,86 269,96 Q277,86 285,96 Q293,86 301,96 Q309,86 317,96 Q325,86 333,96 Q341,86 349,96 Q357,86 365,96 Q371,90 375,96" fill="none" stroke="white" stroke-width="3" opacity=".7"/>
  <!-- TOP TIER -->
  <path d="M210,55 Q218,45 226,55 Q234,45 242,55 Q250,45 258,55 Q266,45 274,55 Q282,45 290,55 Q298,45 306,55 Q314,45 322,55 Q330,45 338,55 Q344,50 348,55 L348,99 L210,99 Z" fill="#FCF0E8"/>
  <path d="M210,55 Q218,45 226,55 Q234,45 242,55 Q250,45 258,55 Q266,45 274,55 Q282,45 290,55 Q298,45 306,55 Q314,45 322,55 Q330,45 338,55 Q344,50 348,55" fill="none" stroke="white" stroke-width="2.5" opacity=".7"/>
  <!-- CANDLES: 5, alternating coral #FF8C7A and amber #FFC857 -->
  <rect x="222" y="26" width="8" height="31" rx="4" fill="#FF8C7A"/>
  <rect x="242" y="20" width="8" height="37" rx="4" fill="#FFC857"/>
  <rect x="276" y="17" width="8" height="40" rx="4" fill="#FF8C7A"/>
  <rect x="310" y="20" width="8" height="37" rx="4" fill="#FFC857"/>
  <rect x="330" y="26" width="8" height="31" rx="4" fill="#FF8C7A"/>
  <!-- FLAMES: glow + teardrop -->
  <circle cx="226" cy="23" r="6" fill="#FFEF88" opacity=".45"/>
  <path d="M226,24 Q229,18 226,13 Q223,18 226,24Z" fill="#FFEF88"/>
  <path d="M226,23 Q228,19 226,15 Q224,19 226,23Z" fill="white" opacity=".65"/>
  <circle cx="246" cy="17" r="6" fill="#FFEF88" opacity=".45"/>
  <path d="M246,18 Q249,12 246,7 Q243,12 246,18Z" fill="#FFEF88"/>
  <path d="M246,17 Q248,13 246,9 Q244,13 246,17Z" fill="white" opacity=".65"/>
  <circle cx="280" cy="14" r="7" fill="#FFEF88" opacity=".4"/>
  <path d="M280,15 Q284,8 280,3 Q276,8 280,15Z" fill="#FFEF88"/>
  <path d="M280,14 Q283,9 280,5 Q277,9 280,14Z" fill="white" opacity=".65"/>
  <circle cx="314" cy="17" r="6" fill="#FFEF88" opacity=".45"/>
  <path d="M314,18 Q317,12 314,7 Q311,12 314,18Z" fill="#FFEF88"/>
  <path d="M314,17 Q316,13 314,9 Q312,13 314,17Z" fill="white" opacity=".65"/>
  <circle cx="334" cy="23" r="6" fill="#FFEF88" opacity=".45"/>
  <path d="M334,24 Q337,18 334,13 Q331,18 334,24Z" fill="#FFEF88"/>
  <path d="M334,23 Q336,19 334,15 Q332,19 334,23Z" fill="white" opacity=".65"/>
  <!-- SPARKLES -->
  <path d="M82,38 L84,31 L86,38 L93,40 L86,42 L84,49 L82,42 L75,40Z" fill="#F4C430" opacity=".85"/>
  <path d="M468,22 L470,16 L472,22 L478,24 L472,26 L470,32 L468,26 L462,24Z" fill="#F4C430" opacity=".8"/>
  <path d="M506,155 L508,150 L510,155 L515,157 L510,159 L508,164 L506,159 L501,157Z" fill="#F4C430" opacity=".75"/>
  <path d="M50,178 L52,173 L54,178 L59,180 L54,182 L52,187 L50,182 L45,180Z" fill="#F4C430" opacity=".7"/>
  <path d="M348,208 L350,203 L352,208 L357,210 L352,212 L350,217 L348,212 L343,210Z" fill="#F4C430" opacity=".6"/>
</svg>`;

const svg2 = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 600 240" width="100%" height="240" style="display:block;">
  <defs>
    <radialGradient id="b2bg" cx="50%" cy="50%" r="60%">
      <stop offset="0%" stop-color="#FFFFFF" stop-opacity="0"/>
      <stop offset="100%" stop-color="#F5EFE0" stop-opacity="0.5"/>
    </radialGradient>
  </defs>
  <rect width="560" height="220" fill="#FEFAF5"/>
  <rect width="560" height="220" fill="url(#b2bg)"/>
  <!-- BALLOONS (ellipse + highlight + triangle knot) -->
  <!-- 1 Lavender -->
  <ellipse cx="108" cy="108" rx="38" ry="50" fill="#E8C4E8"/>
  <ellipse cx="96" cy="93" rx="14" ry="18" fill="white" opacity=".28"/>
  <polygon points="108,158 103,168 113,168" fill="#E8C4E8"/>
  <!-- 2 Peach -->
  <ellipse cx="188" cy="78" rx="42" ry="55" fill="#FFD4A3"/>
  <ellipse cx="175" cy="61" rx="15" ry="20" fill="white" opacity=".28"/>
  <polygon points="188,133 183,144 193,144" fill="#FFD4A3"/>
  <!-- 3 Mint -->
  <ellipse cx="270" cy="92" rx="38" ry="50" fill="#B5EAD7"/>
  <ellipse cx="258" cy="77" rx="14" ry="18" fill="white" opacity=".28"/>
  <polygon points="270,142 265,152 275,152" fill="#B5EAD7"/>
  <!-- 4 Periwinkle -->
  <ellipse cx="352" cy="72" rx="44" ry="57" fill="#C7CEEA"/>
  <ellipse cx="338" cy="55" rx="16" ry="21" fill="white" opacity=".28"/>
  <polygon points="352,129 347,140 357,140" fill="#C7CEEA"/>
  <!-- 5 Salmon -->
  <ellipse cx="430" cy="88" rx="38" ry="50" fill="#FFB7B2"/>
  <ellipse cx="418" cy="73" rx="14" ry="18" fill="white" opacity=".28"/>
  <polygon points="430,138 425,148 435,148" fill="#FFB7B2"/>
  <!-- 6 Light orange -->
  <ellipse cx="497" cy="112" rx="33" ry="44" fill="#FFDAC1"/>
  <ellipse cx="486" cy="98" rx="12" ry="16" fill="white" opacity=".28"/>
  <polygon points="497,156 492,165 502,165" fill="#FFDAC1"/>
  <!-- 7 Green (lower, clustered) -->
  <ellipse cx="160" cy="148" rx="30" ry="39" fill="#E2F0CB"/>
  <ellipse cx="150" cy="136" rx="11" ry="14" fill="white" opacity=".28"/>
  <polygon points="160,187 156,196 164,196" fill="#E2F0CB"/>
  <!-- STRINGS — curvy bezier to knot at (280,215) -->
  <path d="M108,168 Q165,195 280,215" stroke="#E8C4E8" stroke-width="1.5" fill="none"/>
  <path d="M188,144 Q230,185 280,215" stroke="#FFD4A3" stroke-width="1.5" fill="none"/>
  <path d="M270,152 Q275,185 280,215" stroke="#B5EAD7" stroke-width="1.5" fill="none"/>
  <path d="M352,140 Q320,180 280,215" stroke="#C7CEEA" stroke-width="1.5" fill="none"/>
  <path d="M430,148 Q375,185 280,215" stroke="#FFB7B2" stroke-width="1.5" fill="none"/>
  <path d="M497,165 Q415,195 280,215" stroke="#FFDAC1" stroke-width="1.5" fill="none"/>
  <path d="M160,196 Q215,208 280,215" stroke="#E2F0CB" stroke-width="1.5" fill="none"/>
  <!-- HEARTS -->
  <circle cx="230" cy="128" r="4" fill="#FF9B9B" opacity=".75"/>
  <circle cx="238" cy="128" r="4" fill="#FF9B9B" opacity=".75"/>
  <polygon points="226,131 242,131 234,139" fill="#FF9B9B" opacity=".75"/>
  <circle cx="306" cy="145" r="3.5" fill="#FF69B4" opacity=".7"/>
  <circle cx="313" cy="145" r="3.5" fill="#FF69B4" opacity=".7"/>
  <polygon points="302,148 317,148 310,155" fill="#FF69B4" opacity=".7"/>
  <circle cx="465" cy="62" r="3" fill="#FF9B9B" opacity=".65"/>
  <circle cx="471" cy="62" r="3" fill="#FF9B9B" opacity=".65"/>
  <polygon points="462,65 474,65 468,71" fill="#FF9B9B" opacity=".65"/>
  <circle cx="62" cy="160" r="3" fill="#FF69B4" opacity=".6"/>
  <circle cx="68" cy="160" r="3" fill="#FF69B4" opacity=".6"/>
  <polygon points="59,163 71,163 65,169" fill="#FF69B4" opacity=".6"/>
  <!-- GOLD STARS -->
  <path d="M520,38 L522,32 L524,38 L530,40 L524,42 L522,48 L520,42 L514,40Z" fill="#F4C430" opacity=".8"/>
  <path d="M38,52 L40,46 L42,52 L48,54 L42,56 L40,62 L38,56 L32,54Z" fill="#F4C430" opacity=".75"/>
  <path d="M136,28 L138,23 L140,28 L145,30 L140,32 L138,37 L136,32 L131,30Z" fill="#F4C430" opacity=".7"/>
  <path d="M400,180 L402,175 L404,180 L409,182 L404,184 L402,189 L400,184 L395,182Z" fill="#F4C430" opacity=".65"/>
  <circle cx="76" cy="200" r="4" fill="#F4C430" opacity=".55"/>
  <circle cx="484" cy="200" r="4" fill="#F4C430" opacity=".55"/>
</svg>`;

const svg3 = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 600 240" width="100%" height="240" style="display:block;">
  <rect width="560" height="220" fill="#F0F7F4"/>
  <!-- border frame -->
  <rect x="6" y="6" width="548" height="208" rx="10" fill="none" stroke="#A5D6A7" stroke-width="1.5" opacity=".6"/>
  <!-- background confetti dots -->
  <circle cx="42" cy="38" r="5" fill="#C8E6C9" opacity=".6"/>
  <circle cx="518" cy="45" r="6" fill="#FCE4EC" opacity=".55"/>
  <circle cx="65" cy="182" r="4" fill="#E8EAF6" opacity=".55"/>
  <circle cx="492" cy="175" r="5" fill="#C8E6C9" opacity=".55"/>
  <circle cx="150" cy="205" r="4" fill="#FCE4EC" opacity=".5"/>
  <circle cx="400" cy="205" r="4" fill="#E8EAF6" opacity=".5"/>
  <rect x="30" y="90" width="8" height="5" rx="2" fill="#C8E6C9" opacity=".5" transform="rotate(-20,34,92)"/>
  <rect x="516" y="95" width="8" height="5" rx="2" fill="#FCE4EC" opacity=".5" transform="rotate(20,520,97)"/>
  <rect x="50" y="145" width="7" height="4" rx="2" fill="#FFD700" opacity=".45" transform="rotate(30,53,147)"/>
  <rect x="505" y="148" width="7" height="4" rx="2" fill="#FFD700" opacity=".45" transform="rotate(-25,508,150)"/>
  <!-- MINI CORNER GIFTS -->
  <rect x="20" y="170" width="32" height="26" rx="3" fill="#B5EAD7" opacity=".6"/>
  <rect x="20" y="178" width="32" height="4" fill="white" opacity=".5"/>
  <rect x="34" y="170" width="4" height="26" fill="white" opacity=".5"/>
  <rect x="508" y="170" width="32" height="26" rx="3" fill="#FADDD0" opacity=".6"/>
  <rect x="508" y="178" width="32" height="4" fill="white" opacity=".5"/>
  <rect x="522" y="170" width="4" height="26" fill="white" opacity=".5"/>
  <!-- LARGE BOTTOM BOX (green) -->
  <rect x="155" y="125" width="250" height="82" rx="8" fill="#C8E6C9"/>
  <!-- ribbon H -->
  <rect x="155" y="157" width="250" height="14" fill="#81C784"/>
  <!-- ribbon V -->
  <rect x="273" y="125" width="14" height="82" fill="#81C784"/>
  <!-- bow left loop -->
  <path d="M280,157 C255,138 218,132 228,150 C233,162 265,162 280,157Z" fill="#4CAF50"/>
  <!-- bow right loop -->
  <path d="M280,157 C305,138 342,132 332,150 C327,162 295,162 280,157Z" fill="#4CAF50"/>
  <!-- bow center knot -->
  <circle cx="280" cy="157" r="7" fill="#388E3C"/>
  <!-- MEDIUM MIDDLE BOX (blush) -->
  <rect x="188" y="76" width="184" height="54" rx="8" fill="#FCE4EC"/>
  <!-- ribbon H -->
  <rect x="188" y="97" width="184" height="12" fill="#FFD700" opacity=".85"/>
  <!-- ribbon V -->
  <rect x="274" y="76" width="12" height="54" fill="#FFD700" opacity=".85"/>
  <!-- bow -->
  <path d="M280,97 C260,82 232,78 240,92 C244,101 268,100 280,97Z" fill="#FBC02D"/>
  <path d="M280,97 C300,82 328,78 320,92 C316,101 292,100 280,97Z" fill="#FBC02D"/>
  <circle cx="280" cy="97" r="6" fill="#F9A825"/>
  <!-- SMALL TOP BOX (lavender) -->
  <rect x="220" y="36" width="120" height="44" rx="8" fill="#E8EAF6"/>
  <!-- ribbon H -->
  <rect x="220" y="54" width="120" height="10" fill="#FF8A65" opacity=".85"/>
  <!-- ribbon V -->
  <rect x="275" y="36" width="10" height="44" fill="#FF8A65" opacity=".85"/>
  <!-- bow -->
  <path d="M280,54 C265,42 244,39 250,51 C253,58 270,57 280,54Z" fill="#F4511E"/>
  <path d="M280,54 C295,42 316,39 310,51 C307,58 290,57 280,54Z" fill="#F4511E"/>
  <circle cx="280" cy="54" r="5" fill="#BF360C"/>
  <!-- SPARKLES -->
  <path d="M128,60 L130,54 L132,60 L138,62 L132,64 L130,70 L128,64 L122,62Z" fill="#F4C430" opacity=".85"/>
  <path d="M424,48 L426,42 L428,48 L434,50 L428,52 L426,58 L424,52 L418,50Z" fill="#F4C430" opacity=".8"/>
  <path d="M108,155 L110,150 L112,155 L117,157 L112,159 L110,164 L108,159 L103,157Z" fill="#F4C430" opacity=".75"/>
  <path d="M444,158 L446,153 L448,158 L453,160 L448,162 L446,167 L444,162 L439,160Z" fill="#F4C430" opacity=".75"/>
  <circle cx="165" cy="108" r="5" fill="white" opacity=".7"/>
  <circle cx="390" cy="112" r="4" fill="white" opacity=".65"/>
</svg>`;

const svg4 = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 600 240" width="100%" height="240" style="display:block;">
  <defs>
    <linearGradient id="s4bg" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0%" stop-color="#FDFBF0"/>
      <stop offset="100%" stop-color="#FAF4DC"/>
    </linearGradient>
    <linearGradient id="s4liq" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0%" stop-color="#FFE082"/>
      <stop offset="100%" stop-color="#FFB300" stop-opacity=".6"/>
    </linearGradient>
  </defs>
  <rect width="560" height="220" fill="url(#s4bg)"/>
  <!-- subtle shimmer lines -->
  <line x1="0" y1="40" x2="560" y2="40" stroke="#FFD700" stroke-width=".8" opacity=".15"/>
  <line x1="0" y1="100" x2="560" y2="100" stroke="#FFD700" stroke-width=".8" opacity=".1"/>
  <line x1="0" y1="160" x2="560" y2="160" stroke="#FFD700" stroke-width=".8" opacity=".1"/>
  <!-- thin gold border -->
  <rect x="5" y="5" width="550" height="210" rx="10" fill="none" stroke="#FFD700" stroke-width="1.5" opacity=".35"/>
  <!-- LEFT FLUTE — rotated ~24deg clockwise around base -->
  <g transform="rotate(24,192,210)">
    <!-- base -->
    <rect x="180" y="202" width="24" height="8" rx="4" fill="#FFFDE7"/>
    <!-- stem -->
    <rect x="189" y="132" width="6" height="72" fill="#FFFDE7"/>
    <!-- bowl body (trapezoid: narrow at 132, wide at top 48) -->
    <path d="M184,132 L178,80 L175,48 L209,48 L206,80 L200,132 Z" fill="#FFFDE7"/>
    <!-- champagne fill -->
    <path d="M185,132 L180,90 Q192,84 204,90 L200,132 Z" fill="url(#s4liq)" opacity=".75"/>
    <!-- gold rim -->
    <line x1="175" y1="48" x2="209" y2="48" stroke="#FFD700" stroke-width="2.5"/>
    <!-- bubbles -->
    <circle cx="190" cy="115" r="2.5" fill="white" opacity=".7"/>
    <circle cx="195" cy="100" r="2" fill="white" opacity=".65"/>
    <circle cx="188" cy="85" r="1.8" fill="white" opacity=".7"/>
    <circle cx="197" cy="72" r="2" fill="white" opacity=".65"/>
    <circle cx="192" cy="60" r="1.5" fill="white" opacity=".6"/>
  </g>
  <!-- RIGHT FLUTE — mirrored tilt -->
  <g transform="rotate(-24,368,210)">
    <!-- base -->
    <rect x="356" y="202" width="24" height="8" rx="4" fill="#FFFDE7"/>
    <!-- stem -->
    <rect x="365" y="132" width="6" height="72" fill="#FFFDE7"/>
    <!-- bowl -->
    <path d="M360,132 L354,80 L351,48 L385,48 L382,80 L376,132 Z" fill="#FFFDE7"/>
    <!-- champagne fill -->
    <path d="M361,132 L356,90 Q368,84 380,90 L376,132 Z" fill="url(#s4liq)" opacity=".75"/>
    <!-- gold rim -->
    <line x1="351" y1="48" x2="385" y2="48" stroke="#FFD700" stroke-width="2.5"/>
    <!-- bubbles -->
    <circle cx="366" cy="115" r="2.5" fill="white" opacity=".7"/>
    <circle cx="371" cy="100" r="2" fill="white" opacity=".65"/>
    <circle cx="364" cy="85" r="1.8" fill="white" opacity=".7"/>
    <circle cx="373" cy="72" r="2" fill="white" opacity=".65"/>
    <circle cx="368" cy="60" r="1.5" fill="white" opacity=".6"/>
  </g>
  <!-- CLINK BURST at center-top -->
  <circle cx="280" cy="52" r="18" fill="#FFD700" opacity=".18"/>
  <circle cx="280" cy="52" r="10" fill="#FFD700" opacity=".22"/>
  <path d="M280,30 L282,44 L296,46 L282,48 L280,62 L278,48 L264,46 L278,44Z" fill="#FFD700" opacity=".9"/>
  <path d="M262,36 L264,44 L272,46 L264,48 L262,56 L260,48 L252,46 L260,44Z" fill="#FFD700" opacity=".75"/>
  <path d="M298,36 L300,44 L308,46 L300,48 L298,56 L296,48 L288,46 L296,44Z" fill="#FFD700" opacity=".75"/>
  <!-- gold confetti streamers -->
  <path d="M60,10 Q140,55 200,35 Q260,15 300,60" stroke="#FFD700" stroke-width="2" fill="none" opacity=".4" stroke-dasharray="6,4"/>
  <path d="M500,10 Q420,55 360,35 Q300,15 260,60" stroke="#FFD700" stroke-width="2" fill="none" opacity=".4" stroke-dasharray="6,4"/>
  <path d="M30,80 Q100,60 160,90 Q200,110 250,80" stroke="#FFA000" stroke-width="1.5" fill="none" opacity=".3" stroke-dasharray="5,4"/>
  <path d="M530,80 Q460,60 400,90 Q360,110 310,80" stroke="#FFA000" stroke-width="1.5" fill="none" opacity=".3" stroke-dasharray="5,4"/>
  <!-- scattered gold stars + circles -->
  <path d="M75,155 L77,149 L79,155 L85,157 L79,159 L77,165 L75,159 L69,157Z" fill="#F4C430" opacity=".75"/>
  <path d="M480,150 L482,144 L484,150 L490,152 L484,154 L482,160 L480,154 L474,152Z" fill="#F4C430" opacity=".75"/>
  <circle cx="115" cy="38" r="5" fill="#FFD700" opacity=".5"/>
  <circle cx="440" cy="35" r="5" fill="#FFD700" opacity=".5"/>
  <circle cx="50" cy="190" r="4" fill="#FFD700" opacity=".45"/>
  <circle cx="510" cy="190" r="4" fill="#FFD700" opacity=".45"/>
  <circle cx="175" cy="185" r="3" fill="#FFD700" opacity=".4"/>
  <circle cx="385" cy="185" r="3" fill="#FFD700" opacity=".4"/>
</svg>`;

const svg5 = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 600 240" width="100%" height="240" style="display:block;">
  <rect width="560" height="220" fill="#FDFFFE"/>
  <!-- scattered petals outside wreath -->
  <ellipse cx="95" cy="55" rx="8" ry="5" fill="#FFB7C5" opacity=".5" transform="rotate(-30,95,55)"/>
  <ellipse cx="460" cy="48" rx="7" ry="4" fill="#FFE4B5" opacity=".5" transform="rotate(25,460,48)"/>
  <ellipse cx="80" cy="165" rx="7" ry="4" fill="#98FB98" opacity=".5" transform="rotate(15,80,165)"/>
  <ellipse cx="478" cy="168" rx="8" ry="5" fill="#FFB7C5" opacity=".5" transform="rotate(-20,478,168)"/>
  <ellipse cx="280" cy="12" rx="6" ry="4" fill="#FFE4B5" opacity=".45" transform="rotate(5,280,12)"/>
  <ellipse cx="128" cy="208" rx="7" ry="4" fill="#98FB98" opacity=".4" transform="rotate(-10,128,208)"/>
  <ellipse cx="430" cy="210" rx="7" ry="4" fill="#FFB7C5" opacity=".4" transform="rotate(20,430,210)"/>
  <!-- WREATH ring — leaves and botanicals arranged around a circle (cx=280, cy=110, r=80) -->
  <!-- Leaves at various angles -->
  <ellipse cx="280" cy="30" rx="10" ry="22" fill="#90EE90" opacity=".85" transform="rotate(0,280,30)"/>
  <ellipse cx="337" cy="47" rx="10" ry="22" fill="#98FB98" opacity=".85" transform="rotate(40,337,47)"/>
  <ellipse cx="349" cy="110" rx="10" ry="22" fill="#3CB371" opacity=".8" transform="rotate(90,349,110)"/>
  <ellipse cx="337" cy="173" rx="10" ry="22" fill="#90EE90" opacity=".85" transform="rotate(130,337,173)"/>
  <ellipse cx="280" cy="190" rx="10" ry="22" fill="#98FB98" opacity=".85" transform="rotate(180,280,190)"/>
  <ellipse cx="223" cy="173" rx="10" ry="22" fill="#3CB371" opacity=".8" transform="rotate(220,223,173)"/>
  <ellipse cx="211" cy="110" rx="10" ry="22" fill="#90EE90" opacity=".85" transform="rotate(270,211,110)"/>
  <ellipse cx="223" cy="47" rx="10" ry="22" fill="#98FB98" opacity=".85" transform="rotate(310,223,47)"/>
  <!-- extra small leaves filling gaps -->
  <ellipse cx="313" cy="36" rx="7" ry="16" fill="#90EE90" opacity=".7" transform="rotate(20,313,36)"/>
  <ellipse cx="344" cy="80" rx="7" ry="16" fill="#3CB371" opacity=".7" transform="rotate(65,344,80)"/>
  <ellipse cx="344" cy="140" rx="7" ry="16" fill="#98FB98" opacity=".7" transform="rotate(115,344,140)"/>
  <ellipse cx="313" cy="184" rx="7" ry="16" fill="#90EE90" opacity=".7" transform="rotate(160,313,184)"/>
  <ellipse cx="247" cy="184" rx="7" ry="16" fill="#3CB371" opacity=".7" transform="rotate(200,247,184)"/>
  <ellipse cx="216" cy="140" rx="7" ry="16" fill="#98FB98" opacity=".7" transform="rotate(250,216,140)"/>
  <ellipse cx="216" cy="80" rx="7" ry="16" fill="#90EE90" opacity=".7" transform="rotate(295,216,80)"/>
  <ellipse cx="247" cy="36" rx="7" ry="16" fill="#3CB371" opacity=".7" transform="rotate(340,247,36)"/>
  <!-- ROSES at 12, 3, 6, 9 o'clock -->
  <!-- 12 o'clock rose (top) -->
  <circle cx="280" cy="30" r="14" fill="#FF8FAB"/>
  <circle cx="273" cy="24" r="9" fill="#FFB7C5"/>
  <circle cx="287" cy="24" r="9" fill="#FFB7C5"/>
  <circle cx="280" cy="36" r="9" fill="#FFB7C5"/>
  <circle cx="280" cy="30" r="6" fill="#FF8FAB"/>
  <!-- 3 o'clock rose (right) -->
  <circle cx="360" cy="110" r="14" fill="#FF8FAB"/>
  <circle cx="353" cy="104" r="9" fill="#FFB7C5"/>
  <circle cx="367" cy="104" r="9" fill="#FFB7C5"/>
  <circle cx="360" cy="116" r="9" fill="#FFB7C5"/>
  <circle cx="360" cy="110" r="6" fill="#FF8FAB"/>
  <!-- 6 o'clock rose (bottom) -->
  <circle cx="280" cy="190" r="14" fill="#FFB7C5"/>
  <circle cx="273" cy="184" r="9" fill="#FFCDD8"/>
  <circle cx="287" cy="184" r="9" fill="#FFCDD8"/>
  <circle cx="280" cy="196" r="9" fill="#FFCDD8"/>
  <circle cx="280" cy="190" r="6" fill="#FFB7C5"/>
  <!-- 9 o'clock rose (left) -->
  <circle cx="200" cy="110" r="14" fill="#FF8FAB"/>
  <circle cx="193" cy="104" r="9" fill="#FFB7C5"/>
  <circle cx="207" cy="104" r="9" fill="#FFB7C5"/>
  <circle cx="200" cy="116" r="9" fill="#FFB7C5"/>
  <circle cx="200" cy="110" r="6" fill="#FF8FAB"/>
  <!-- DAISIES between roses -->
  <!-- between 12 and 3 -->
  <circle cx="336" cy="55" r="5" fill="#FFFACD"/>
  <circle cx="330" cy="50" r="4" fill="#FFFACD"/><circle cx="342" cy="50" r="4" fill="#FFFACD"/>
  <circle cx="336" cy="60" r="4" fill="#FFFACD"/><circle cx="336" cy="48" r="4" fill="#FFFACD"/>
  <circle cx="336" cy="55" r="3" fill="#FFE4B5"/>
  <!-- between 3 and 6 -->
  <circle cx="336" cy="165" r="5" fill="#FFFACD"/>
  <circle cx="330" cy="160" r="4" fill="#FFFACD"/><circle cx="342" cy="160" r="4" fill="#FFFACD"/>
  <circle cx="336" cy="170" r="4" fill="#FFFACD"/><circle cx="336" cy="158" r="4" fill="#FFFACD"/>
  <circle cx="336" cy="165" r="3" fill="#FFE4B5"/>
  <!-- between 9 and 12 -->
  <circle cx="224" cy="55" r="5" fill="#FFFACD"/>
  <circle cx="218" cy="50" r="4" fill="#FFFACD"/><circle cx="230" cy="50" r="4" fill="#FFFACD"/>
  <circle cx="224" cy="60" r="4" fill="#FFFACD"/><circle cx="224" cy="48" r="4" fill="#FFFACD"/>
  <circle cx="224" cy="55" r="3" fill="#FFE4B5"/>
  <!-- between 6 and 9 -->
  <circle cx="224" cy="165" r="5" fill="#FFFACD"/>
  <circle cx="218" cy="160" r="4" fill="#FFFACD"/><circle cx="230" cy="160" r="4" fill="#FFFACD"/>
  <circle cx="224" cy="170" r="4" fill="#FFFACD"/><circle cx="224" cy="158" r="4" fill="#FFFACD"/>
  <circle cx="224" cy="165" r="3" fill="#FFE4B5"/>
  <!-- BERRIES in small clusters -->
  <circle cx="307" cy="192" r="5" fill="#DC143C" opacity=".85"/>
  <circle cx="318" cy="196" r="4" fill="#8B0000" opacity=".8"/>
  <circle cx="313" cy="185" r="4" fill="#DC143C" opacity=".8"/>
  <circle cx="243" cy="192" r="5" fill="#DC143C" opacity=".85"/>
  <circle cx="252" cy="196" r="4" fill="#8B0000" opacity=".8"/>
  <circle cx="248" cy="185" r="4" fill="#DC143C" opacity=".8"/>
  <!-- 3 CANDLES inside wreath at bottom -->
  <rect x="264" y="142" width="9" height="36" rx="4.5" fill="#FFFFF0"/>
  <rect x="275.5" y="135" width="9" height="43" rx="4.5" fill="#FFE4E1"/>
  <rect x="287" y="142" width="9" height="36" rx="4.5" fill="#FFFFF0"/>
  <!-- candle flames -->
  <circle cx="268.5" cy="139" r="5" fill="#FFEF88" opacity=".4"/>
  <path d="M268.5,141 Q271,135 268.5,130 Q266,135 268.5,141Z" fill="#FFEF88"/>
  <circle cx="280" cy="132" r="6" fill="#FFEF88" opacity=".35"/>
  <path d="M280,134 Q283,127 280,122 Q277,127 280,134Z" fill="#FFEF88"/>
  <circle cx="291.5" cy="139" r="5" fill="#FFEF88" opacity=".4"/>
  <path d="M291.5,141 Q294,135 291.5,130 Q289,135 291.5,141Z" fill="#FFEF88"/>
</svg>`;

const svg6 = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 600 240" width="100%" height="240" style="display:block;">
  <rect width="560" height="220" fill="#FFFFFF"/>
  <!-- CONFETTI EXPLOSION from center ~(280,85) -->
  <!-- Rectangles – coral, purple, blue, pink, teal, orange, yellow -->
  <rect x="278" y="40" width="14" height="7" rx="2" fill="#FF6B9D" transform="rotate(10,285,44)"/>
  <rect x="298" y="28" width="12" height="6" rx="2" fill="#FF9F43" transform="rotate(30,304,31)"/>
  <rect x="322" y="38" width="14" height="7" rx="2" fill="#54A0FF" transform="rotate(50,329,42)"/>
  <rect x="340" y="55" width="12" height="6" rx="2" fill="#5F27CD" transform="rotate(70,346,58)"/>
  <rect x="348" y="78" width="14" height="7" rx="2" fill="#00D2D3" transform="rotate(90,355,82)"/>
  <rect x="340" y="102" width="12" height="6" rx="2" fill="#FF9FF3" transform="rotate(110,346,105)"/>
  <rect x="326" y="122" width="14" height="7" rx="2" fill="#FECA57" transform="rotate(130,333,126)"/>
  <rect x="304" y="138" width="12" height="6" rx="2" fill="#FF6B9D" transform="rotate(150,310,141)"/>
  <rect x="278" y="145" width="14" height="7" rx="2" fill="#FF9F43" transform="rotate(170,285,149)"/>
  <rect x="252" y="138" width="12" height="6" rx="2" fill="#54A0FF" transform="rotate(200,258,141)"/>
  <rect x="230" y="122" width="14" height="7" rx="2" fill="#5F27CD" transform="rotate(220,237,126)"/>
  <rect x="216" y="102" width="12" height="6" rx="2" fill="#00D2D3" transform="rotate(240,222,105)"/>
  <rect x="210" y="78" width="14" height="7" rx="2" fill="#FF9FF3" transform="rotate(260,217,82)"/>
  <rect x="218" y="55" width="12" height="6" rx="2" fill="#FECA57" transform="rotate(280,224,58)"/>
  <rect x="234" y="38" width="14" height="7" rx="2" fill="#FF6B9D" transform="rotate(310,241,42)"/>
  <rect x="258" y="28" width="12" height="6" rx="2" fill="#FF9F43" transform="rotate(340,264,31)"/>
  <!-- mid-range rects -->
  <rect x="360" y="38" width="13" height="7" rx="2" fill="#54A0FF" transform="rotate(45,367,42)"/>
  <rect x="388" y="72" width="14" height="7" rx="2" fill="#FF6B9D" transform="rotate(80,395,76)"/>
  <rect x="385" y="118" width="13" height="6" rx="2" fill="#FECA57" transform="rotate(115,392,121)"/>
  <rect x="356" y="156" width="14" height="7" rx="2" fill="#5F27CD" transform="rotate(145,363,160)"/>
  <rect x="196" y="38" width="13" height="7" rx="2" fill="#00D2D3" transform="rotate(-45,203,42)"/>
  <rect x="168" y="72" width="14" height="7" rx="2" fill="#FF9F43" transform="rotate(-80,175,76)"/>
  <rect x="171" y="118" width="13" height="6" rx="2" fill="#FF9FF3" transform="rotate(-115,178,121)"/>
  <rect x="200" y="156" width="14" height="7" rx="2" fill="#FF6B9D" transform="rotate(-145,207,160)"/>
  <!-- far-out rects -->
  <rect x="430" y="25" width="15" height="7" rx="2" fill="#FF9F43" transform="rotate(35,438,29)"/>
  <rect x="470" y="80" width="14" height="7" rx="2" fill="#5F27CD" transform="rotate(75,477,84)"/>
  <rect x="455" y="155" width="15" height="7" rx="2" fill="#54A0FF" transform="rotate(110,463,159)"/>
  <rect x="120" y="25" width="15" height="7" rx="2" fill="#FECA57" transform="rotate(-35,128,29)"/>
  <rect x="80" y="80" width="14" height="7" rx="2" fill="#FF6B9D" transform="rotate(-75,87,84)"/>
  <rect x="95" y="155" width="15" height="7" rx="2" fill="#00D2D3" transform="rotate(-110,103,159)"/>
  <!-- partially off-edge -->
  <rect x="540" y="55" width="30" height="7" rx="2" fill="#FF9FF3" transform="rotate(60,555,59)"/>
  <rect x="-10" y="55" width="30" height="7" rx="2" fill="#FECA57" transform="rotate(-60,5,59)"/>
  <rect x="545" y="148" width="28" height="7" rx="2" fill="#FF6B9D" transform="rotate(-40,559,152)"/>
  <rect x="-8" y="148" width="28" height="7" rx="2" fill="#54A0FF" transform="rotate(40,6,152)"/>
  <!-- CIRCLES -->
  <circle cx="310" cy="45" r="6" fill="#FF6B9D" opacity=".9"/>
  <circle cx="344" cy="68" r="5" fill="#FF9F43" opacity=".85"/>
  <circle cx="352" cy="100" r="6" fill="#5F27CD" opacity=".85"/>
  <circle cx="338" cy="130" r="5" fill="#00D2D3" opacity=".85"/>
  <circle cx="310" cy="150" r="6" fill="#FECA57" opacity=".85"/>
  <circle cx="248" cy="150" r="5" fill="#FF9FF3" opacity=".85"/>
  <circle cx="220" cy="130" r="6" fill="#54A0FF" opacity=".85"/>
  <circle cx="206" cy="100" r="5" fill="#FF6B9D" opacity=".85"/>
  <circle cx="214" cy="68" r="6" fill="#5F27CD" opacity=".85"/>
  <circle cx="248" cy="45" r="5" fill="#FF9F43" opacity=".9"/>
  <circle cx="380" cy="52" r="5" fill="#54A0FF" opacity=".8"/>
  <circle cx="408" cy="100" r="6" fill="#FECA57" opacity=".8"/>
  <circle cx="390" cy="148" r="5" fill="#FF6B9D" opacity=".8"/>
  <circle cx="170" cy="52" r="5" fill="#FF9FF3" opacity=".8"/>
  <circle cx="148" cy="100" r="6" fill="#00D2D3" opacity=".8"/>
  <circle cx="165" cy="148" r="5" fill="#FF9F43" opacity=".8"/>
  <circle cx="448" cy="70" r="5" fill="#5F27CD" opacity=".75"/>
  <circle cx="462" cy="135" r="4" fill="#FF6B9D" opacity=".75"/>
  <circle cx="100" cy="70" r="5" fill="#FECA57" opacity=".75"/>
  <circle cx="88" cy="135" r="4" fill="#54A0FF" opacity=".75"/>
  <!-- SMALL STARS -->
  <path d="M330,32 L331.5,27 L333,32 L338,33.5 L333,35 L331.5,40 L330,35 L325,33.5Z" fill="#F4C430" opacity=".9"/>
  <path d="M370,92 L371.5,87 L373,92 L378,93.5 L373,95 L371.5,100 L370,95 L365,93.5Z" fill="#FFD700" opacity=".85"/>
  <path d="M362,140 L363.5,135 L365,140 L370,141.5 L365,143 L363.5,148 L362,143 L357,141.5Z" fill="#F4C430" opacity=".85"/>
  <path d="M188,90 L189.5,85 L191,90 L196,91.5 L191,93 L189.5,98 L188,93 L183,91.5Z" fill="#FFD700" opacity=".85"/>
  <path d="M196,140 L197.5,135 L199,140 L204,141.5 L199,143 L197.5,148 L196,143 L191,141.5Z" fill="#F4C430" opacity=".85"/>
  <path d="M226,35 L227.5,30 L229,35 L234,36.5 L229,38 L227.5,43 L226,38 L221,36.5Z" fill="#FFD700" opacity=".9"/>
  <!-- CURLY STREAMERS -->
  <path d="M280,85 Q310,60 340,75 Q370,90 360,120 Q350,145 380,150" stroke="#FF6B9D" stroke-width="2.5" fill="none" opacity=".7" stroke-linecap="round"/>
  <path d="M280,85 Q250,60 220,75 Q190,90 200,120 Q210,145 180,150" stroke="#5F27CD" stroke-width="2.5" fill="none" opacity=".65" stroke-linecap="round"/>
  <path d="M280,85 Q295,45 330,40 Q365,38 380,20" stroke="#FF9F43" stroke-width="2" fill="none" opacity=".6" stroke-linecap="round"/>
  <path d="M280,85 Q265,45 230,40 Q195,38 180,20" stroke="#54A0FF" stroke-width="2" fill="none" opacity=".6" stroke-linecap="round"/>
  <!-- TRIANGLES -->
  <polygon points="420,45 430,62 410,62" fill="#FF6B9D" opacity=".8"/>
  <polygon points="135,45 145,62 125,62" fill="#00D2D3" opacity=".8"/>
  <polygon points="468,130 478,148 458,148" fill="#FECA57" opacity=".75"/>
  <polygon points="82,130 92,148 72,148" fill="#FF9F43" opacity=".75"/>
  <polygon points="340,175 350,192 330,192" fill="#54A0FF" opacity=".7"/>
  <polygon points="220,175 230,192 210,192" fill="#5F27CD" opacity=".7"/>
  <!-- LARGE CENTER SPARKLES -->
  <path d="M280,50 L283,66 L299,69 L283,72 L280,88 L277,72 L261,69 L277,66Z" fill="#F4C430" opacity=".95"/>
  <path d="M245,65 L247,76 L258,78 L247,80 L245,91 L243,80 L232,78 L243,76Z" fill="#FFD700" opacity=".88"/>
  <path d="M315,65 L317,76 L328,78 L317,80 L315,91 L313,80 L302,78 L313,76Z" fill="#FFD700" opacity=".88"/>
</svg>`;

// ── Helpers ───────────────────────────────────────────────────────────────────

function formatDate(): string {
  const now = new Date();
  const day = now.getDate();
  const months = ["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"];
  return `${day} ${months[now.getMonth()]} ${now.getFullYear()}`;
}

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
  illustrationIndex?: number,   // unused — kept for call-site compatibility
  mood = "Sunny",
  fuel = "Coffee",
  logoUrl?: string,
  heroImageUrl?: string,        // unused — kept for call-site compatibility
  paletteId?: string
): string {
  const svgs = [svg1, svg2, svg3, svg4, svg5, svg6];
  const randomSVG = svgs[Math.floor(Math.random() * svgs.length)];
  const palette = resolvePalette(paletteId);

  const escaped = {
    name: esc(name),
    msg:  esc(twoSentences(message)).replace(/\n/g, "<br>"),
    from: esc(fromName),
    date: esc(formatDate()),
    mood: esc(mood),
    fuel: esc(fuel),
  };

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

      <!-- Gradient card -->
      <table width="640" cellpadding="0" cellspacing="0" role="presentation"
        style="background:${palette.bg};border-radius:32px;overflow:hidden;">
        <tr>
          <td style="padding:32px 28px 28px;">

            <!-- Header row: logo + date -->
            <table width="100%" cellpadding="0" cellspacing="0" role="presentation"
              style="margin-bottom:24px;">
              <tr>
                <td>${logoPill}</td>
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

            <!-- Hero illustration -->
            <div style="border-radius:16px;overflow:hidden;box-shadow:0 4px 24px rgba(0,0,0,0.08);">
              ${randomSVG}
            </div>

            <!-- Glass card -->
            <table width="100%" cellpadding="0" cellspacing="0" role="presentation"
              style="background:rgba(255,255,255,0.88);border-radius:28px;
                     border:1px solid rgba(255,255,255,0.7);
                     box-shadow:0 20px 60px -20px rgba(58,26,42,0.18);
                     margin-top:24px;">
              <tr>
                <td style="padding:32px 32px 28px;">

                  <div style="font-size:32px;font-weight:600;color:#3a1a2a;
                              letter-spacing:-0.025em;line-height:1.1;
                              font-family:'Inter Tight',system-ui,sans-serif;">
                    Happy birthday,<span style="color:#d96a3a;font-style:italic;font-weight:500;"> ${escaped.name}.</span>
                  </div>

                  <div style="font-size:15.5px;line-height:1.6;color:#4a2a3a;
                              margin-top:22px;
                              font-family:'Inter Tight',system-ui,sans-serif;">
                    ${escaped.msg}
                  </div>

                  <!-- Stats row -->
                  <table width="100%" cellpadding="0" cellspacing="0" role="presentation"
                    style="margin-top:28px;">
                    <tr>
                      <td width="33%" style="padding-right:5px;vertical-align:top;">
                        <table width="100%" cellpadding="0" cellspacing="0" role="presentation"
                          style="background:rgba(255,255,255,0.55);border-radius:14px;border:1px solid rgba(255,255,255,0.8);">
                          <tr><td style="padding:12px 14px;">
                            <div style="font-size:10px;letter-spacing:0.16em;text-transform:uppercase;color:#3a1a2a;opacity:0.55;font-weight:600;font-family:'Inter Tight',system-ui,sans-serif;">Today</div>
                            <div style="font-size:22px;margin-top:4px;line-height:1;">🎂</div>
                          </td></tr>
                        </table>
                      </td>
                      <td width="33%" style="padding:0 5px;vertical-align:top;">
                        <table width="100%" cellpadding="0" cellspacing="0" role="presentation"
                          style="background:rgba(255,255,255,0.55);border-radius:14px;border:1px solid rgba(255,255,255,0.8);">
                          <tr><td style="padding:12px 14px;">
                            <div style="font-size:10px;letter-spacing:0.16em;text-transform:uppercase;color:#3a1a2a;opacity:0.55;font-weight:600;font-family:'Inter Tight',system-ui,sans-serif;">Mood</div>
                            <div style="font-size:14px;font-weight:700;color:#3a1a2a;margin-top:4px;letter-spacing:-0.01em;font-family:'Inter Tight',system-ui,sans-serif;">${escaped.mood}</div>
                          </td></tr>
                        </table>
                      </td>
                      <td width="33%" style="padding-left:5px;vertical-align:top;">
                        <table width="100%" cellpadding="0" cellspacing="0" role="presentation"
                          style="background:rgba(255,255,255,0.55);border-radius:14px;border:1px solid rgba(255,255,255,0.8);">
                          <tr><td style="padding:12px 14px;">
                            <div style="font-size:10px;letter-spacing:0.16em;text-transform:uppercase;color:#3a1a2a;opacity:0.55;font-weight:600;font-family:'Inter Tight',system-ui,sans-serif;">Fuel</div>
                            <div style="font-size:14px;font-weight:700;color:#3a1a2a;margin-top:4px;letter-spacing:-0.01em;font-family:'Inter Tight',system-ui,sans-serif;">${escaped.fuel}</div>
                          </td></tr>
                        </table>
                      </td>
                    </tr>
                  </table>

                  <!-- Sign-off -->
                  <table width="100%" cellpadding="0" cellspacing="0" role="presentation"
                    style="margin-top:28px;border-top:1px dashed rgba(58,26,42,0.2);">
                    <tr>
                      <td style="padding-top:20px;">
                        <div style="font-size:11px;color:#3a1a2a;opacity:0.55;font-weight:500;letter-spacing:0.02em;font-family:'Inter Tight',system-ui,sans-serif;">
                          With warm regards,
                        </div>
                        <div style="font-size:17px;font-weight:700;color:#3a1a2a;letter-spacing:-0.015em;margin-top:4px;font-family:'Inter Tight',system-ui,sans-serif;">
                          ${escaped.from}
                        </div>
                      </td>
                    </tr>
                  </table>

                </td>
              </tr>
            </table>

            <!-- Footer -->
            <table width="100%" cellpadding="0" cellspacing="0" role="presentation"
              style="margin-top:20px;">
              <tr>
                <td align="center">
                  <span style="font-size:11px;color:#3a1a2a;opacity:0.5;font-weight:500;letter-spacing:0.02em;font-family:'Inter Tight',system-ui,sans-serif;">
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
