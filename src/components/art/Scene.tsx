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

/**
 * Silhouetten der Skyline.
 *
 * Drei Tiefenebenen: `fern` liegt im Dunst und ist niedrig kontrastiert,
 * `mitte` traegt die Masse, `nah` steht scharf im Vordergrund. Jedes Gebaeude
 * bekommt eine Form (Rueckstaffelung, Krone, Antenne), damit keine Reihe
 * gleicher Rechtecke entsteht.
 */
type BuildingSpec = {
  x: number;
  w: number;
  h: number;
  /** flach | zurueckgestaffelt | mit Krone | mit Antenne */
  form: "flach" | "staffel" | "krone" | "antenne";
  windows: number;
};

const SKYLINE_FAR: BuildingSpec[] = [
  { x: 20, w: 58, h: 168, form: "flach", windows: 4 },
  { x: 92, w: 40, h: 232, form: "antenne", windows: 6 },
  { x: 146, w: 74, h: 140, form: "flach", windows: 3 },
  { x: 236, w: 46, h: 268, form: "staffel", windows: 7 },
  { x: 300, w: 62, h: 186, form: "flach", windows: 4 },
  { x: 382, w: 38, h: 300, form: "krone", windows: 8 },
  { x: 436, w: 86, h: 152, form: "flach", windows: 3 },
  { x: 540, w: 44, h: 246, form: "antenne", windows: 6 },
  { x: 604, w: 68, h: 178, form: "flach", windows: 4 },
  { x: 692, w: 40, h: 288, form: "staffel", windows: 7 },
  { x: 752, w: 78, h: 160, form: "flach", windows: 4 },
  { x: 848, w: 48, h: 264, form: "krone", windows: 6 },
  { x: 914, w: 70, h: 146, form: "flach", windows: 3 },
  { x: 1002, w: 42, h: 296, form: "antenne", windows: 8 },
  { x: 1062, w: 82, h: 172, form: "flach", windows: 4 },
  { x: 1162, w: 46, h: 254, form: "staffel", windows: 6 },
  { x: 1226, w: 74, h: 138, form: "flach", windows: 3 },
  { x: 1318, w: 40, h: 282, form: "krone", windows: 7 },
  { x: 1376, w: 88, h: 164, form: "flach", windows: 4 },
  { x: 1482, w: 52, h: 236, form: "antenne", windows: 6 },
];

const SKYLINE_MID: BuildingSpec[] = [
  { x: 0, w: 84, h: 244, form: "flach", windows: 6 },
  { x: 96, w: 54, h: 352, form: "staffel", windows: 9 },
  { x: 164, w: 106, h: 196, form: "flach", windows: 5 },
  { x: 284, w: 62, h: 300, form: "krone", windows: 8 },
  { x: 360, w: 88, h: 410, form: "antenne", windows: 11 },
  { x: 462, w: 50, h: 226, form: "flach", windows: 6 },
  { x: 526, w: 124, h: 312, form: "staffel", windows: 8 },
  { x: 664, w: 66, h: 470, form: "antenne", windows: 12 },
  { x: 744, w: 92, h: 268, form: "flach", windows: 7 },
  { x: 850, w: 58, h: 372, form: "krone", windows: 10 },
  { x: 922, w: 110, h: 214, form: "flach", windows: 5 },
  { x: 1046, w: 72, h: 336, form: "staffel", windows: 9 },
  { x: 1132, w: 98, h: 256, form: "flach", windows: 6 },
  { x: 1244, w: 56, h: 428, form: "antenne", windows: 11 },
  { x: 1314, w: 90, h: 230, form: "flach", windows: 6 },
  { x: 1418, w: 64, h: 328, form: "krone", windows: 9 },
  { x: 1496, w: 104, h: 208, form: "flach", windows: 5 },
];

const SKYLINE_NEAR: BuildingSpec[] = [
  { x: -30, w: 150, h: 190, form: "flach", windows: 4 },
  { x: 140, w: 96, h: 132, form: "flach", windows: 3 },
  { x: 1180, w: 118, h: 148, form: "flach", windows: 3 },
  { x: 1330, w: 170, h: 202, form: "staffel", windows: 4 },
];

/** Erzeugt den Umriss eines Gebaeudes samt Aufbau. */
function buildingPath(b: BuildingSpec, groundY: number): string {
  const top = groundY - b.h;
  const parts = [`M${b.x} ${groundY} L${b.x} ${top} L${b.x + b.w} ${top} L${b.x + b.w} ${groundY} Z`];

  if (b.form === "staffel") {
    const inset = b.w * 0.22;
    const extra = b.h * 0.16;
    parts.push(
      `M${b.x + inset} ${top} L${b.x + inset} ${top - extra} L${b.x + b.w - inset} ${top - extra} L${b.x + b.w - inset} ${top} Z`,
    );
  }
  if (b.form === "krone") {
    const mid = b.x + b.w / 2;
    parts.push(`M${b.x + 3} ${top} L${mid} ${top - b.w * 0.62} L${b.x + b.w - 3} ${top} Z`);
  }
  if (b.form === "antenne") {
    const mid = b.x + b.w / 2;
    parts.push(`M${mid - 2.2} ${top} L${mid - 2.2} ${top - 54} L${mid + 2.2} ${top - 54} L${mid + 2.2} ${top} Z`);
  }
  return parts.join(" ");
}

/** Beleuchtete Fenster eines Gebaeudes – deterministisch verteilt. */
function windowRects(b: BuildingSpec, groundY: number, seed: number) {
  const cols = Math.max(1, Math.floor((b.w - 14) / 20));
  const rows = b.windows;
  const cells: { x: number; y: number }[] = [];
  for (let row = 0; row < rows; row += 1) {
    for (let col = 0; col < cols; col += 1) {
      // Pseudozufall aus festen Werten: gleiche Ausgabe auf Server und Client.
      if ((row * 7 + col * 13 + seed + b.x) % 5 < 2) continue;
      cells.push({
        x: b.x + 9 + col * 20,
        y: groundY - b.h + 20 + row * 26,
      });
    }
  }
  return cells;
}

/** Zeichnet eine Skyline-Ebene inklusive Fensterlicht. */
function SkylineLayer({
  buildings,
  groundY,
  fill,
  windowFill,
  windowOpacity = 0.8,
  seed = 0,
  opacity = 1,
  lit,
}: {
  buildings: BuildingSpec[];
  groundY: number;
  fill: string;
  windowFill?: string;
  windowOpacity?: number;
  seed?: number;
  opacity?: number;
  /** Farbe des Streiflichts auf den Fassaden. */
  lit?: string;
}) {
  return (
    <g opacity={opacity}>
      <g fill={fill}>
        {buildings.map((b) => (
          <path key={b.x} d={buildingPath(b, groundY)} />
        ))}
      </g>
      {/* Fassaden: leichte Aufhellung nach oben und eine belichtete Kante zur
          Lichtquelle hin. Ohne das bleiben es flache Silhouetten. */}
      {lit ? (
        <>
          <g fill={lit} opacity="0.14">
            {buildings.map((b) => (
              <rect key={`f-${b.x}`} x={b.x} y={groundY - b.h} width={b.w} height={b.h * 0.55} />
            ))}
          </g>
          <g fill={lit} opacity="0.3">
            {buildings.map((b) => (
              <rect key={`e-${b.x}`} x={b.x} y={groundY - b.h} width="2.5" height={b.h} />
            ))}
          </g>
          <g fill="#000000" opacity="0.22">
            {buildings.map((b) => (
              <rect key={`s-${b.x}`} x={b.x + b.w - 4} y={groundY - b.h} width="4" height={b.h} />
            ))}
          </g>
        </>
      ) : null}
      {windowFill ? (
        <g fill={windowFill} opacity={windowOpacity}>
          {buildings.flatMap((b) =>
            windowRects(b, groundY, seed).map((cell) => (
              <rect key={`${b.x}-${cell.x}-${cell.y}`} x={cell.x} y={cell.y} width="7" height="11" />
            )),
          )}
        </g>
      ) : null}
    </g>
  );
}

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
      <rect width="1600" height="1000" fill="url(#sc-halftone)" opacity="0.26" />
      <rect width="1600" height="1000" fill="url(#sc-grain)" opacity="0.28" />
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

      <linearGradient id="sc-sky" x1="0" y1="0" x2="0.15" y2="1">
        <stop offset="0%" stopColor="#0a1b30" />
        <stop offset="18%" stopColor="#2b2a55" />
        <stop offset="38%" stopColor="#6b3f74" />
        <stop offset="55%" stopColor="#a94f79" />
        <stop offset="70%" stopColor="#d95f78" />
        <stop offset="83%" stopColor="#f2874f" />
        <stop offset="93%" stopColor="#f9b25e" />
        <stop offset="100%" stopColor="#ffe0a3" />
      </linearGradient>

      {/* Heisse Nacht: Vice City glueht von unten, statt blau abzukuehlen. */}
      <linearGradient id="sc-night" x1="0" y1="0" x2="0.1" y2="1">
        <stop offset="0%" stopColor="#12061f" />
        <stop offset="26%" stopColor="#2a0b3d" />
        <stop offset="48%" stopColor="#4d0f4a" />
        <stop offset="66%" stopColor="#8a1a55" />
        <stop offset="82%" stopColor="#c8355e" />
        <stop offset="94%" stopColor="#e8578c" />
        <stop offset="100%" stopColor="#f7a06a" />
      </linearGradient>

      <linearGradient id="sc-sea" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0%" stopColor="#f7b96a" />
        <stop offset="12%" stopColor="#c07a72" />
        <stop offset="34%" stopColor="#5c6d8e" />
        <stop offset="62%" stopColor="#15707f" />
        <stop offset="100%" stopColor="#062b3a" />
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

      {/* Streulicht um Lichtquellen – nimmt der Flaeche das Plakative. */}
      <filter id="sc-bloom" x="-50%" y="-50%" width="200%" height="200%">
        <feGaussianBlur stdDeviation="22" />
      </filter>

      {/* Dunst zwischen den Tiefenebenen: unten dicht, oben offen. */}
      <linearGradient id="sc-haze" x1="0" y1="1" x2="0" y2="0">
        <stop offset="0%" stopColor="#f6a978" stopOpacity="0.5" />
        <stop offset="55%" stopColor="#d4738c" stopOpacity="0.22" />
        <stop offset="100%" stopColor="#d4738c" stopOpacity="0" />
      </linearGradient>
      <linearGradient id="sc-haze-night" x1="0" y1="1" x2="0" y2="0">
        <stop offset="0%" stopColor="#1d4a6b" stopOpacity="0.55" />
        <stop offset="60%" stopColor="#123049" stopOpacity="0.2" />
        <stop offset="100%" stopColor="#123049" stopOpacity="0" />
      </linearGradient>

      {/* Randabdunklung, damit die Flaeche nicht wie ein Sticker wirkt. */}
      <radialGradient id="sc-vignette" cx="0.5" cy="0.46" r="0.78">
        <stop offset="55%" stopColor="#000000" stopOpacity="0" />
        <stop offset="100%" stopColor="#000000" stopOpacity="0.42" />
      </radialGradient>

      <clipPath id={skyId}>
        <rect width="1600" height="1000" />
      </clipPath>
    </defs>
  );
}

/** Küstenstraße mit Motelschild – Hitze und Asphalt. */
function CoastRoad() {
  return (
    <>
      <rect width="1600" height="1000" fill="url(#sc-sky)" />
      <circle cx="860" cy="500" r="280" fill="#ffb45c" opacity="0.24" filter="url(#sc-bloom)" />
      <BandedSun cx={860} cy={500} r={158} />

      <g fill="#e8578c" opacity="0.3">
        <ellipse cx="380" cy="214" rx="250" ry="14" />
        <ellipse cx="1270" cy="186" rx="230" ry="13" />
      </g>

      {/* Ferne Skyline am Horizont */}
      <SkylineLayer
        buildings={SKYLINE_FAR}
        groundY={604}
        fill="#7a5570"
        windowFill="#ffd9a0"
        windowOpacity={0.25}
        seed={5}
        opacity={0.4}
      />

      {/* Land */}
      <rect y="600" width="1600" height="400" fill="#2f3b2c" />
      <rect y="600" width="1600" height="46" fill="#8a7a5e" opacity="0.45" />
      <rect y="600" width="1600" height="180" fill="url(#sc-haze)" opacity="0.5" />

      {/* Straße in Fluchtperspektive */}
      <path d="M700 600 L900 600 L1360 1000 L240 1000 Z" fill="url(#sc-asphalt)" />
      <path d="M700 600 L900 600 L940 640 L660 640 Z" fill="#8a7a5e" opacity="0.25" />
      <g fill="#f8f2e6" opacity="0.85">
        <path d="M793 604 L807 604 L811 638 L789 638 Z" />
        <path d="M787 662 L813 662 L819 714 L781 714 Z" />
        <path d="M777 746 L823 746 L831 824 L769 824 Z" />
        <path d="M763 864 L837 864 L849 982 L751 982 Z" />
      </g>
      <path d="M700 600 L240 1000 L282 1000 L718 600 Z" fill="#f8f2e6" opacity="0.3" />
      <path d="M900 600 L1360 1000 L1318 1000 L882 600 Z" fill="#f8f2e6" opacity="0.3" />

      {/* Motelschild */}
      <g>
        <rect x="1122" y="330" width="12" height="290" fill="#1c1710" />
        <rect x="1044" y="244" width="166" height="126" rx="5" fill="#c8412a" />
        <rect x="1056" y="256" width="142" height="102" rx="3" fill="none" stroke="#ffc978" strokeWidth="4" />
        <g fill="#fdfaf3">
          <rect x="1072" y="282" width="110" height="9" rx="4" />
          <rect x="1072" y="304" width="80" height="9" rx="4" />
          <rect x="1072" y="326" width="96" height="9" rx="4" />
        </g>
        <circle cx="1127" cy="230" r="18" fill="#ffc978" filter="url(#sc-bloom)" />
        <circle cx="1127" cy="230" r="9" fill="#fff6d8" />
      </g>

      {/* Palmenallee, nach hinten kleiner und blasser */}
      <Palm x={200} y={1010} scale={1.5} lean={-4} fill="#0f1610" />
      <Palm x={432} y={884} scale={0.86} lean={3} fill="#16211a" />
      <Palm x={566} y={800} scale={0.54} lean={-3} fill="#1d2a22" />
      <Palm x={1428} y={1018} scale={1.55} lean={5} flip fill="#0f1610" />
      <Palm x={1206} y={884} scale={0.86} lean={-3} flip fill="#16211a" />
      <Palm x={1042} y={798} scale={0.54} lean={4} flip fill="#1d2a22" />

      {/* Hitzeflimmern über dem Asphalt */}
      <g stroke="#fdfaf3" strokeWidth="3" fill="none" opacity="0.16">
        <path d="M650 700 q42 -10 84 0 q42 10 84 0 q42 -10 84 0" />
        <path d="M606 744 q48 -12 96 0 q48 12 96 0 q48 -12 96 0" />
      </g>

      <rect width="1600" height="1000" fill="url(#sc-vignette)" />
    </>
  );
}

/** Nachtviertel mit Neon – Nachtleben und Recherche. */
function NightDistrict() {
  const horizon = 660;
  return (
    <>
      <rect width="1600" height="1000" fill="url(#sc-night)" />

      <g fill="#ffd9a0" opacity="0.22">
        {[
          [120, 88],
          [304, 148],
          [522, 68],
          [764, 126],
          [982, 86],
          [1224, 158],
          [1418, 94],
          [642, 206],
          [1104, 226],
          [396, 112],
          [1330, 268],
        ].map(([x, y]) => (
          <circle key={`${x}-${y}`} cx={x} cy={y} r="2.2" />
        ))}
      </g>
      {/* Kein Mond: Der Lichtdom der Stadt uebernimmt die Rolle der Lichtquelle. */}
      <ellipse cx="880" cy="700" rx="720" ry="300" fill="#f0913e" opacity="0.2" filter="url(#sc-bloom)" />
      <ellipse cx="420" cy="690" rx="360" ry="210" fill="#e8578c" opacity="0.22" filter="url(#sc-bloom)" />
      <ellipse cx="1280" cy="700" rx="330" ry="190" fill="#17a2a2" opacity="0.16" filter="url(#sc-bloom)" />

      {/* Ferne Skyline im Nachtdunst */}
      <SkylineLayer
        buildings={SKYLINE_FAR}
        groundY={horizon}
        fill="#3d1140"
        windowFill="#ffd0a8"
        windowOpacity={0.32}
        seed={2}
        opacity={0.72}
      />
      <rect y={horizon - 240} width="1600" height="240" fill="url(#sc-haze-night)" />

      <SkylineLayer
        buildings={SKYLINE_MID}
        groundY={horizon}
        fill="#14061c"
        windowFill="#ffc478"
        windowOpacity={0.85}
        seed={4}
        lit="#c8355e"
      />
      <g filter="url(#sc-bloom)" opacity="0.45">
        <SkylineLayer buildings={SKYLINE_MID} groundY={horizon} fill="none" windowFill="#ffa94f" seed={4} />
      </g>

      {/* Leuchtreklamen */}
      <g filter="url(#sc-bloom)" opacity="0.9">
        <rect x="232" y="322" width="172" height="13" rx="6" fill="#e8578c" />
        <rect x="232" y="350" width="112" height="13" rx="6" fill="#e8578c" />
        <rect x="1150" y="378" width="152" height="13" rx="6" fill="#2bbdb6" />
        <rect x="1150" y="406" width="96" height="13" rx="6" fill="#2bbdb6" />
        <circle cx="700" cy="348" r="44" fill="none" stroke="#f0913e" strokeWidth="13" />
      </g>
      <g>
        <rect x="232" y="322" width="172" height="13" rx="6" fill="#ffa7c8" />
        <rect x="232" y="350" width="112" height="13" rx="6" fill="#ffa7c8" />
        <rect x="1150" y="378" width="152" height="13" rx="6" fill="#c6f5ee" />
        <rect x="1150" y="406" width="96" height="13" rx="6" fill="#c6f5ee" />
        <circle cx="700" cy="348" r="44" fill="none" stroke="#ffdca8" strokeWidth="5" />
      </g>

      {/* Nasse Straße */}
      <rect y={horizon} width="1600" height={1000 - horizon} fill="#1a0722" />
      <g opacity="0.5">
        <rect x="232" y="700" width="172" height="150" fill="#e8578c" filter="url(#sc-bloom)" />
        <rect x="1150" y="740" width="152" height="170" fill="#2bbdb6" filter="url(#sc-bloom)" />
        <rect x="656" y="690" width="88" height="190" fill="#f0913e" filter="url(#sc-bloom)" />
      </g>
      <g fill="#c6f5ee" opacity="0.1">
        {[688, 730, 782, 846, 922].map((y, index) => (
          <rect key={y} x={0} y={y} width="1600" height={2 + index} />
        ))}
      </g>

      <SkylineLayer buildings={SKYLINE_NEAR} groundY={1000} fill="#0b0210" opacity={0.97} />
      <Palm x={186} y={1020} scale={1.46} lean={-6} fill="#0b0210" />
      <Palm x={470} y={1044} scale={0.94} lean={4} flip fill="#0b0210" />
      <Palm x={1452} y={1030} scale={1.54} lean={5} flip fill="#0b0210" />
      <Palm x={1180} y={1048} scale={0.9} lean={-5} fill="#0b0210" />

      <rect width="1600" height="1000" fill="url(#sc-vignette)" />
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

/** Sonnenscheibe mit hartem Rand und Querbändern – Plakat, nicht Verlauf. */
function PosterSun({ cx: x, cy: y, r }: { cx: number; cy: number; r: number }) {
  const bands = [0.3, 0.46, 0.6, 0.72, 0.82, 0.9];
  return (
    <g>
      <circle cx={x} cy={y} r={r * 1.5} fill="#ffb45c" opacity="0.22" filter="url(#sc-bloom)" />
      <circle cx={x} cy={y} r={r} fill="#ffe6a8" />
      <circle cx={x} cy={y} r={r * 0.72} fill="#fff6d8" />
      {bands.map((offset, index) => (
        <rect
          key={offset}
          x={x - r - 6}
          y={y + r * offset}
          width={r * 2 + 12}
          height={4 + index * 3}
          fill="url(#sc-sky)"
        />
      ))}
    </g>
  );
}

/**
 * Titelmotiv: Figur vor der Sonne, Stadt als flache Silhouette dahinter.
 *
 * Die Stadt ist bewusst klein und dunkel gehalten. Sie ist Hintergrund, nicht
 * Gegenstand – anders als in den bisherigen Motiven, in denen die Skyline das
 * ganze Bild füllte und deshalb wie ein Kulissenbild wirkte.
 */
function LeonidaPoster() {
  const horizon = 690;
  return (
    <>
      <rect width="1600" height="1000" fill="url(#sc-sky)" />

      <PosterSun cx={950} cy={506} r={236} />

      {/* Wolkenbaender als harte Streifen, nicht als Weichzeichnung */}
      <g fill="#3c1240" opacity="0.5">
        <rect x="60" y="196" width="520" height="16" rx="8" />
        <rect x="200" y="244" width="360" height="12" rx="6" />
        <rect x="1120" y="168" width="440" height="14" rx="7" />
        <rect x="1240" y="214" width="300" height="10" rx="5" />
      </g>

      {/* Stadt als flache Silhouette: eine Linie, keine Fensterraster */}
      <SkylineLayer
        buildings={SKYLINE_MID}
        groundY={horizon}
        fill="#2a0c33"
        windowFill="#ffcf87"
        windowOpacity={0.55}
        seed={7}
        opacity={0.95}
      />
      <SkylineLayer
        buildings={SKYLINE_FAR}
        groundY={horizon}
        fill="#4a1244"
        windowFill="#ffd9a0"
        windowOpacity={0.2}
        seed={5}
        opacity={0.55}
      />

      {/* Wasser mit hartem Sonnenpfad */}
      <rect y={horizon} width="1600" height={1000 - horizon} fill="url(#sc-sea)" />
      <rect y={horizon} width="1600" height="5" fill="#1b0820" opacity="0.8" />
      <g fill="#ffe0a3" opacity="0.55">
        {[700, 718, 740, 766, 796, 830, 868, 910].map((y, index) => (
          <rect key={y} x={950 - (30 + index * 22)} y={y} width={60 + index * 44} height={4 + index} rx="2" />
        ))}
      </g>

      {/* Uferkante */}
      <path d="M0 862 q380 -26 800 -22 q420 -4 800 22 L1600 1000 L0 1000 Z" fill="#1a0722" />

      {/* Wedel als Rahmen – innerhalb des sichtbaren Fensters angesetzt */}
      <g fill="#0d0410">
        <path d="M300 -20 C470 -6 596 96 646 238 C584 122 460 44 300 50 Z" />
        <path d="M300 76 C462 108 560 200 596 322 C542 218 434 152 300 142 Z" />
        <path d="M1300 -20 C1130 -6 1004 96 954 238 C1016 122 1140 44 1300 50 Z" />
        <path d="M1300 86 C1146 116 1048 206 1012 326 C1064 224 1166 160 1300 150 Z" />
      </g>

      <Palm x={1224} y={926} scale={1.42} lean={7} flip fill="#0d0410" />
      <Palm x={392} y={946} scale={0.9} lean={-6} fill="#0d0410" />

      <rect width="1600" height="1000" fill="url(#sc-vignette)" />
    </>
  );
}

const SCENES: Record<SceneVariant, () => React.JSX.Element> = {
  "skyline-sonnenuntergang": LeonidaPoster,
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
