import { cx } from "@/lib/format";
import type { MotifVariant } from "@/lib/types";

/**
 * Bildsprache des Leonida Kurier.
 *
 * Alle Motive sind eigene grafische Kompositionen – kein Spielmaterial, keine
 * fremden Artworks, keine geleakten Inhalte. Sie tragen die Atmosphäre der
 * Küste: Hitze, Sonne, Meer, Asphalt, Palmen, Motels und Nachtleben, und sie
 * zeigen bereits Komposition und Farbwirkung, in die später dokumentierte
 * offizielle Motive treten können.
 *
 * Die Motive sind bewusst deterministisch aufgebaut (feste Werte, kein Zufall),
 * damit Server- und Client-Darstellung identisch sind.
 */

/** Die Motivnamen kommen aus dem Domänenmodell, damit Inhalte sie setzen können. */
export type SceneVariant = MotifVariant;

/** Fallback, wenn ein Inhalt kein Motiv gesetzt hat – deterministisch aus dem Slug. */
export function motifForSlug(slug: string): SceneVariant {
  const variants: SceneVariant[] = [
    "skyline-sonnenuntergang",
    "kuestenstrasse",
    "nachtviertel",
    "inselkette",
    "sumpfland",
  ];
  const sum = [...slug].reduce((total, char) => total + char.charCodeAt(0), 0);
  return variants[sum % variants.length];
}

const BUILDINGS = [
  { x: 40, w: 70, h: 210, windows: 5 },
  { x: 118, w: 46, h: 300, windows: 7 },
  { x: 170, w: 92, h: 168, windows: 4 },
  { x: 268, w: 54, h: 258, windows: 6 },
  { x: 328, w: 74, h: 350, windows: 8 },
  { x: 408, w: 44, h: 196, windows: 5 },
  { x: 458, w: 108, h: 268, windows: 6 },
  { x: 572, w: 58, h: 410, windows: 9 },
  { x: 636, w: 80, h: 232, windows: 5 },
  { x: 722, w: 50, h: 320, windows: 7 },
  { x: 778, w: 96, h: 186, windows: 4 },
  { x: 880, w: 62, h: 292, windows: 7 },
  { x: 948, w: 86, h: 224, windows: 5 },
  { x: 1040, w: 48, h: 372, windows: 8 },
  { x: 1094, w: 78, h: 200, windows: 5 },
  { x: 1178, w: 56, h: 286, windows: 6 },
  { x: 1240, w: 100, h: 172, windows: 4 },
  { x: 1346, w: 52, h: 248, windows: 6 },
  { x: 1404, w: 88, h: 316, windows: 7 },
  { x: 1498, w: 64, h: 204, windows: 5 },
];

/** Palmensilhouette. `flip` spiegelt sie, `lean` neigt den Stamm. */
function Palm({
  x,
  y,
  scale = 1,
  lean = 0,
  flip = false,
  fill = "#050d17",
}: {
  x: number;
  y: number;
  scale?: number;
  lean?: number;
  flip?: boolean;
  fill?: string;
}) {
  return (
    <g
      transform={`translate(${x} ${y}) scale(${flip ? -scale : scale} ${scale}) rotate(${lean})`}
      fill={fill}
    >
      {/* Stamm */}
      <path d="M-6 0 C-3 -60 2 -120 12 -184 L22 -182 C12 -120 8 -60 6 0 Z" />
      {/* Wedel */}
      <path d="M16 -186 C46 -216 92 -222 126 -206 C92 -212 56 -200 24 -178 Z" />
      <path d="M16 -186 C44 -232 88 -256 128 -256 C92 -244 52 -220 22 -180 Z" />
      <path d="M16 -186 C10 -232 24 -276 58 -300 C34 -268 22 -230 22 -182 Z" />
      <path d="M14 -186 C-16 -222 -60 -236 -96 -228 C-62 -228 -26 -212 6 -180 Z" />
      <path d="M14 -186 C-14 -238 -58 -266 -98 -268 C-62 -254 -24 -226 4 -180 Z" />
      <path d="M14 -186 C4 -226 -14 -260 -44 -282 C-22 -252 -6 -220 4 -182 Z" />
      {/* Kokosnüsse */}
      <circle cx="20" cy="-178" r="7" />
      <circle cx="6" cy="-174" r="6" />
    </g>
  );
}

/** Retro-Sonne mit Querbändern. */
function BandedSun({ cx: x, cy: y, r }: { cx: number; cy: number; r: number }) {
  const bands = [0.22, 0.38, 0.52, 0.64, 0.74, 0.84];
  return (
    <g>
      <circle cx={x} cy={y} r={r} fill="url(#sc-sun)" />
      {bands.map((offset, index) => (
        <rect
          key={offset}
          x={x - r - 4}
          y={y + r * offset}
          width={r * 2 + 8}
          height={3 + index * 2.2}
          fill="url(#sc-sky)"
          opacity="0.92"
        />
      ))}
    </g>
  );
}

function Halftone() {
  return (
    <>
      <rect width="1600" height="1000" fill="url(#sc-halftone)" opacity="0.16" />
      <rect width="1600" height="1000" fill="url(#sc-grain)" opacity="0.2" />
    </>
  );
}

function SharedDefs({ skyId }: { skyId: string }) {
  return (
    <defs>
      <linearGradient id="sc-sun" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0%" stopColor="#fff0b8" />
        <stop offset="45%" stopColor="#ffc978" />
        <stop offset="100%" stopColor="#f0913e" />
      </linearGradient>

      <linearGradient id="sc-sky" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0%" stopColor="#0b2035" />
        <stop offset="34%" stopColor="#4a3a6b" />
        <stop offset="58%" stopColor="#c05a7d" />
        <stop offset="76%" stopColor="#e8578c" />
        <stop offset="88%" stopColor="#f0913e" />
        <stop offset="100%" stopColor="#ffc978" />
      </linearGradient>

      <linearGradient id="sc-night" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0%" stopColor="#050d17" />
        <stop offset="55%" stopColor="#0b2035" />
        <stop offset="100%" stopColor="#2a2a55" />
      </linearGradient>

      <linearGradient id="sc-sea" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0%" stopColor="#f7ad5c" />
        <stop offset="18%" stopColor="#b06a72" />
        <stop offset="52%" stopColor="#17a2a2" />
        <stop offset="100%" stopColor="#0d6f75" />
      </linearGradient>

      <linearGradient id="sc-lagoon" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0%" stopColor="#a8ebe3" />
        <stop offset="45%" stopColor="#2bbdb6" />
        <stop offset="100%" stopColor="#0d6f75" />
      </linearGradient>

      <linearGradient id="sc-asphalt" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0%" stopColor="#5c5241" />
        <stop offset="100%" stopColor="#241f16" />
      </linearGradient>

      <linearGradient id="sc-marsh" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0%" stopColor="#f7ad5c" />
        <stop offset="30%" stopColor="#c08a4e" />
        <stop offset="100%" stopColor="#1f3a2c" />
      </linearGradient>

      <pattern id="sc-halftone" width="6" height="6" patternUnits="userSpaceOnUse">
        <circle cx="1.6" cy="1.6" r="1.15" fill="#16130d" />
      </pattern>

      <filter id="sc-grain-f">
        <feTurbulence type="fractalNoise" baseFrequency="0.85" numOctaves="4" seed="11" />
        <feColorMatrix values="0 0 0 0 0.1 0 0 0 0 0.09 0 0 0 0 0.07 0 0 0 0.55 0" />
      </filter>
      <pattern id="sc-grain" width="1600" height="1000" patternUnits="userSpaceOnUse">
        <rect width="1600" height="1000" filter="url(#sc-grain-f)" />
      </pattern>

      <filter id="sc-glow" x="-40%" y="-40%" width="180%" height="180%">
        <feGaussianBlur stdDeviation="14" />
      </filter>

      <clipPath id={skyId}>
        <rect width="1600" height="1000" />
      </clipPath>
    </defs>
  );
}

/** Sonnenuntergang über der Skyline – der Aufmacher-Klassiker. */
function SkylineSunset() {
  return (
    <>
      <rect width="1600" height="1000" fill="url(#sc-sky)" />

      {/* Wolkenbänder */}
      <g fill="#e8578c" opacity="0.4">
        <ellipse cx="300" cy="210" rx="230" ry="18" />
        <ellipse cx="420" cy="258" rx="150" ry="12" />
        <ellipse cx="1180" cy="170" rx="270" ry="20" />
        <ellipse cx="1020" cy="228" rx="160" ry="13" />
      </g>
      <g fill="#ffc978" opacity="0.32">
        <ellipse cx="880" cy="300" rx="320" ry="16" />
        <ellipse cx="520" cy="340" rx="200" ry="11" />
      </g>

      <BandedSun cx={800} cy={430} r={210} />

      {/* Meer */}
      <rect y="600" width="1600" height="400" fill="url(#sc-sea)" />
      {/* Sonnenspiegelung */}
      <g fill="#ffc978" opacity="0.55">
        {[615, 638, 664, 694, 728, 766, 808, 854, 904, 958].map((y, index) => (
          <rect
            key={y}
            x={800 - (26 + index * 13)}
            y={y}
            width={52 + index * 26}
            height={4 + index * 0.9}
            rx="2"
          />
        ))}
      </g>

      {/* Skyline */}
      <g fill="#071523">
        {BUILDINGS.map((building) => (
          <rect
            key={building.x}
            x={building.x}
            y={600 - building.h}
            width={building.w}
            height={building.h}
          />
        ))}
        {/* Antennen */}
        <rect x="595" y="150" width="4" height="46" />
        <rect x="1060" y="196" width="4" height="36" />
      </g>
      {/* Beleuchtete Fenster */}
      <g fill="#ffc978" opacity="0.75">
        {BUILDINGS.flatMap((building) =>
          Array.from({ length: building.windows }, (_, row) =>
            Array.from({ length: Math.max(2, Math.round(building.w / 26)) }, (_, col) => {
              const wx = building.x + 9 + col * 22;
              const wy = 600 - building.h + 24 + row * 30;
              if (wx > building.x + building.w - 12) return null;
              // Deterministisches Muster statt Zufall.
              if ((row + col + building.windows) % 3 === 0) return null;
              return (
                <rect
                  key={`${building.x}-${row}-${col}`}
                  x={wx}
                  y={wy}
                  width="8"
                  height="12"
                />
              );
            }),
          ),
        )}
      </g>

      {/* Uferlinie */}
      <rect y="596" width="1600" height="8" fill="#050d17" opacity="0.6" />

      {/* Palmen im Vordergrund */}
      <Palm x={150} y={1010} scale={1.5} lean={-5} />
      <Palm x={310} y={1030} scale={1.05} lean={4} flip />
      <Palm x={1420} y={1015} scale={1.6} lean={6} flip />
      <Palm x={1270} y={1035} scale={1.0} lean={-4} />

      {/* Vögel */}
      <g stroke="#071523" strokeWidth="3" fill="none" opacity="0.65">
        <path d="M420 180 q14 -12 28 0 q14 -12 28 0" />
        <path d="M1140 250 q10 -9 20 0 q10 -9 20 0" />
      </g>
    </>
  );
}

/** Küstenstraße mit Motelschild – Hitze und Asphalt. */
function CoastRoad() {
  return (
    <>
      <rect width="1600" height="1000" fill="url(#sc-sky)" />
      <BandedSun cx={860} cy={470} r={165} />

      <g fill="#e8578c" opacity="0.35">
        <ellipse cx="380" cy="230" rx="240" ry="16" />
        <ellipse cx="1260" cy="200" rx="220" ry="14" />
      </g>

      {/* Landstreifen */}
      <rect y="600" width="1600" height="400" fill="#2c3a2a" />
      <rect y="600" width="1600" height="60" fill="#7d7260" opacity="0.5" />

      {/* Straße in Fluchtperspektive */}
      <path d="M700 600 L900 600 L1320 1000 L280 1000 Z" fill="url(#sc-asphalt)" />
      {/* Mittelmarkierung */}
      <g fill="#f8f2e6" opacity="0.85">
        <path d="M792 604 L808 604 L812 640 L788 640 Z" />
        <path d="M786 664 L814 664 L820 716 L780 716 Z" />
        <path d="M776 748 L824 748 L832 826 L768 826 Z" />
        <path d="M762 866 L838 866 L850 984 L750 984 Z" />
      </g>
      {/* Fahrbahnränder */}
      <path d="M700 600 L280 1000 L318 1000 L716 600 Z" fill="#f8f2e6" opacity="0.35" />
      <path d="M900 600 L1320 1000 L1282 1000 L884 600 Z" fill="#f8f2e6" opacity="0.35" />

      {/* Motelschild */}
      <g>
        <rect x="1120" y="330" width="14" height="290" fill="#241f16" />
        <rect x="1046" y="250" width="162" height="120" rx="6" fill="#c8412a" />
        <rect x="1058" y="262" width="138" height="96" rx="4" fill="none" stroke="#ffc978" strokeWidth="4" />
        <g fill="#fdfaf3">
          <rect x="1074" y="286" width="106" height="9" rx="4" />
          <rect x="1074" y="308" width="78" height="9" rx="4" />
          <rect x="1074" y="330" width="94" height="9" rx="4" />
        </g>
        <circle cx="1127" cy="238" r="13" fill="#ffc978" filter="url(#sc-glow)" />
        <circle cx="1127" cy="238" r="9" fill="#fff0b8" />
      </g>

      {/* Palmenallee */}
      <Palm x={210} y={1000} scale={1.45} lean={-4} />
      <Palm x={430} y={880} scale={0.85} lean={3} />
      <Palm x={560} y={800} scale={0.55} lean={-3} />
      <Palm x={1420} y={1010} scale={1.5} lean={5} flip />
      <Palm x={1210} y={880} scale={0.85} lean={-3} flip />
      <Palm x={1046} y={798} scale={0.55} lean={4} flip />

      {/* Hitzeflimmern über dem Asphalt */}
      <g stroke="#fdfaf3" strokeWidth="3" fill="none" opacity="0.18">
        <path d="M660 690 q40 -10 80 0 q40 10 80 0 q40 -10 80 0" />
        <path d="M620 730 q46 -12 92 0 q46 12 92 0 q46 -12 92 0" />
      </g>
    </>
  );
}

/** Nachtviertel mit Neon – Nachtleben und Recherche. */
function NightDistrict() {
  return (
    <>
      <rect width="1600" height="1000" fill="url(#sc-night)" />

      {/* Sterne */}
      <g fill="#f8f2e6" opacity="0.5">
        {[
          [120, 90],
          [300, 150],
          [520, 70],
          [760, 130],
          [980, 88],
          [1220, 160],
          [1420, 96],
          [640, 210],
          [1100, 230],
        ].map(([x, y]) => (
          <circle key={`${x}-${y}`} cx={x} cy={y} r="2.5" />
        ))}
      </g>
      <circle cx="1330" cy="180" r="62" fill="#f1e8d7" opacity="0.9" />
      <circle cx="1305" cy="164" r="62" fill="#050d17" />

      {/* Skyline mit Leuchtreklamen */}
      <g fill="#071523">
        {BUILDINGS.map((building) => (
          <rect
            key={building.x}
            x={building.x}
            y={640 - building.h}
            width={building.w}
            height={building.h}
          />
        ))}
      </g>
      <g fill="#67d9cf" opacity="0.8">
        {BUILDINGS.flatMap((building) =>
          Array.from({ length: building.windows }, (_, row) =>
            Array.from({ length: Math.max(2, Math.round(building.w / 26)) }, (_, col) => {
              const wx = building.x + 9 + col * 22;
              const wy = 640 - building.h + 24 + row * 30;
              if (wx > building.x + building.w - 12) return null;
              if ((row * 2 + col + building.windows) % 4 === 0) return null;
              return (
                <rect key={`${building.x}-${row}-${col}`} x={wx} y={wy} width="8" height="12" />
              );
            }),
          ),
        )}
      </g>

      {/* Neonschriftzüge */}
      <g filter="url(#sc-glow)" opacity="0.85">
        <rect x="230" y="300" width="170" height="14" rx="7" fill="#e8578c" />
        <rect x="230" y="330" width="110" height="14" rx="7" fill="#e8578c" />
        <rect x="1150" y="360" width="150" height="14" rx="7" fill="#2bbdb6" />
        <rect x="1150" y="390" width="96" height="14" rx="7" fill="#2bbdb6" />
        <circle cx="700" cy="330" r="46" fill="none" stroke="#f0913e" strokeWidth="12" />
      </g>
      <g>
        <rect x="230" y="300" width="170" height="14" rx="7" fill="#f47aa7" />
        <rect x="230" y="330" width="110" height="14" rx="7" fill="#f47aa7" />
        <rect x="1150" y="360" width="150" height="14" rx="7" fill="#a8ebe3" />
        <rect x="1150" y="390" width="96" height="14" rx="7" fill="#a8ebe3" />
        <circle cx="700" cy="330" r="46" fill="none" stroke="#ffc978" strokeWidth="5" />
      </g>

      {/* Nasse Straße mit Spiegelungen */}
      <rect y="640" width="1600" height="360" fill="#0b2035" />
      <g opacity="0.4">
        <rect x="230" y="700" width="170" height="120" fill="#e8578c" filter="url(#sc-glow)" />
        <rect x="1150" y="740" width="150" height="140" fill="#2bbdb6" filter="url(#sc-glow)" />
        <rect x="654" y="690" width="92" height="160" fill="#f0913e" filter="url(#sc-glow)" />
      </g>
      <g fill="#f8f2e6" opacity="0.16">
        {[680, 730, 790, 860, 940].map((y, index) => (
          <rect key={y} x={0} y={y} width="1600" height={2 + index} />
        ))}
      </g>

      <Palm x={180} y={1010} scale={1.4} lean={-6} fill="#050d17" />
      <Palm x={1450} y={1020} scale={1.5} lean={5} flip fill="#050d17" />
    </>
  );
}

/** Inselkette – Türkis, Boote, flaches Wasser. */
function KeysWater() {
  return (
    <>
      <rect width="1600" height="1000" fill="url(#sc-sky)" />
      <BandedSun cx={1180} cy={330} r={130} />
      <rect y="430" width="1600" height="570" fill="url(#sc-lagoon)" />

      {/* Sandbänke und Inseln */}
      <g>
        <ellipse cx="330" cy="560" rx="270" ry="52" fill="#f1e8d7" opacity="0.55" />
        <ellipse cx="330" cy="552" rx="200" ry="34" fill="#e5d9c3" />
        <ellipse cx="330" cy="546" rx="150" ry="24" fill="#c9d3a0" />
        <ellipse cx="1010" cy="700" rx="300" ry="60" fill="#f1e8d7" opacity="0.5" />
        <ellipse cx="1010" cy="690" rx="220" ry="40" fill="#e5d9c3" />
        <ellipse cx="1010" cy="684" rx="164" ry="27" fill="#c9d3a0" />
        <ellipse cx="480" cy="860" rx="330" ry="66" fill="#f1e8d7" opacity="0.45" />
        <ellipse cx="480" cy="850" rx="240" ry="44" fill="#e5d9c3" />
      </g>

      <Palm x={300} y={548} scale={0.5} lean={-6} fill="#1f3a2c" />
      <Palm x={370} y={552} scale={0.42} lean={5} flip fill="#1f3a2c" />
      <Palm x={980} y={686} scale={0.62} lean={-4} fill="#1f3a2c" />
      <Palm x={1070} y={690} scale={0.52} lean={6} flip fill="#1f3a2c" />
      <Palm x={430} y={848} scale={0.72} lean={-5} fill="#1f3a2c" />

      {/* Brücke über das Wasser */}
      <g fill="#e5d9c3">
        <rect x="0" y="612" width="1600" height="14" opacity="0.9" />
        {Array.from({ length: 17 }, (_, index) => (
          <rect key={index} x={index * 100 + 20} y="626" width="12" height="46" opacity="0.75" />
        ))}
      </g>

      {/* Boote mit Kielwasser */}
      <g fill="#fdfaf3">
        <path d="M700 790 l46 0 l-8 18 l-30 0 Z" />
        <rect x="716" y="770" width="4" height="22" />
        <path d="M718 770 l24 16 l-24 0 Z" />
      </g>
      <g stroke="#fdfaf3" strokeWidth="3" fill="none" opacity="0.4">
        <path d="M700 800 q-70 12 -140 34" />
        <path d="M746 800 q-60 20 -120 46" />
      </g>

      {/* Wellenzeichen */}
      <g stroke="#fdfaf3" strokeWidth="3" fill="none" opacity="0.28">
        {[500, 600, 760, 900, 960].map((y, index) => (
          <path
            key={y}
            d={`M${120 + index * 90} ${y} q26 -9 52 0 q26 9 52 0 q26 -9 52 0`}
          />
        ))}
      </g>
    </>
  );
}

/** Sumpfland – Everglades, Gras, Dunst. */
function Wetland() {
  return (
    <>
      <rect width="1600" height="1000" fill="url(#sc-marsh)" />
      <BandedSun cx={620} cy={330} r={150} />

      {/* Dunstbänder */}
      <g fill="#f1e8d7" opacity="0.22">
        <ellipse cx="800" cy="470" rx="900" ry="34" />
        <ellipse cx="600" cy="530" rx="700" ry="26" />
      </g>

      {/* Wasserflächen */}
      <rect y="560" width="1600" height="440" fill="#1f3a2c" />
      <g fill="#2bbdb6" opacity="0.35">
        <ellipse cx="420" cy="700" rx="330" ry="46" />
        <ellipse cx="1180" cy="800" rx="380" ry="54" />
        <ellipse cx="700" cy="920" rx="440" ry="60" />
      </g>

      {/* Baumsilhouetten am Horizont */}
      <g fill="#16281f">
        {[80, 240, 360, 520, 900, 1080, 1240, 1420, 1540].map((x, index) => (
          <ellipse key={x} cx={x} cy={556} rx={44 + (index % 3) * 18} ry={26 + (index % 2) * 12} />
        ))}
        <rect y="552" width="1600" height="24" />
      </g>

      {/* Sumpfgras im Vordergrund */}
      <g stroke="#16281f" strokeWidth="5" fill="none" strokeLinecap="round">
        {Array.from({ length: 46 }, (_, index) => {
          const x = index * 36 + 12;
          const height = 120 + ((index * 37) % 130);
          const bend = ((index % 5) - 2) * 22;
          return (
            <path key={x} d={`M${x} 1000 C${x + bend * 0.4} ${1000 - height * 0.6} ${x + bend} ${1000 - height * 0.9} ${x + bend * 1.3} ${1000 - height}`} />
          );
        })}
      </g>

      {/* Reiher */}
      <g fill="#fdfaf3" opacity="0.9">
        <path d="M1300 700 q10 -34 26 -44 l6 8 q-14 12 -20 40 Z" />
        <rect x="1316" y="700" width="4" height="34" />
        <path d="M1332 654 l18 -6 l-14 12 Z" />
      </g>
    </>
  );
}

const SCENES: Record<SceneVariant, () => React.JSX.Element> = {
  "skyline-sonnenuntergang": SkylineSunset,
  kuestenstrasse: CoastRoad,
  nachtviertel: NightDistrict,
  inselkette: KeysWater,
  sumpfland: Wetland,
};

/**
 * Motivfläche. Füllt den Container vollständig und schneidet mittig zu, damit
 * sie sich in jedes Seitenverhältnis einfügt.
 */
export function Scene({
  variant,
  className,
  print = true,
}: {
  variant: SceneVariant;
  className?: string;
  /** Druckraster und Korn – für die Zeitungsanmutung. */
  print?: boolean;
}) {
  const Motif = SCENES[variant];
  const skyId = `sc-clip-${variant}`;

  return (
    <svg
      viewBox="0 0 1600 1000"
      preserveAspectRatio="xMidYMid slice"
      className={cx("size-full", className)}
      aria-hidden
    >
      <SharedDefs skyId={skyId} />
      <g clipPath={`url(#${skyId})`}>
        <Motif />
        {print ? <Halftone /> : null}
      </g>
    </svg>
  );
}
