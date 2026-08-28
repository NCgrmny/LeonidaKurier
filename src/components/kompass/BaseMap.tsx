import {
  FORESTS,
  HIGHWAYS,
  INLAND_LAKE,
  KEYS_CHAIN,
  MAINLAND,
  MAP_VIEWBOX,
  RIVERS,
  toSmoothPath,
  toViewBox,
  URBAN_AREAS,
  WATER_LABELS,
  WETLANDS,
} from "@/content/geography";

/**
 * Farbwelt der Karte: Sonnenuntergang über der Küste – Türkis für das Wasser,
 * Sand für das Land, Koralle für die Achsen, Magenta für die Ballungsräume.
 *
 * Die Karte ist bewusst hell und liegt als eigene Fläche in der ansonsten
 * dunklen Oberfläche, wie eine gedruckte Karte auf einem Tisch. Alle Werte an
 * einer Stelle, damit sich die Anmutung ohne Eingriff in die Geometrie ändern
 * lässt.
 */
export const MAP_PALETTE = {
  waterDeep: "#127f92",
  waterMid: "#1f9aa8",
  waterShelf: "#4cc2c4",
  waterShallow: "#8fdedb",
  landHigh: "#f6e6c8",
  landMid: "#efd9b1",
  landLow: "#e8cfa4",
  beach: "#fdf4e2",
  forest: "#b7cf9c",
  marsh: "#9ecab4",
  marshLine: "#4f9c8a",
  river: "#2f9fb4",
  roadMajor: "#ff6a55",
  roadMinor: "#ff9b76",
  roadCasing: "#fff6ea",
  urban: "#ff5fa2",
  coast: "#ffffff",
  frame: "#0f6b7a",
  label: "#0c5f70",
  /** Dunkle Schrift auf hellem Grund – für Marker und Kartenzubehör. */
  ink: "#123038",
} as const;

/**
 * Grundkarte des Leonida Kompass.
 *
 * Gezeichnet wird die vereinfachte reale Geografie Floridas – öffentlich
 * bekannte Realgeografie, kein Spielmaterial und kein fremdes Kartenasset.
 * Sie dient als geografische Orientierung, weil Leonida erkennbar an Florida
 * angelehnt ist. Die Spielkarte selbst ist unveröffentlicht; darauf weist die
 * Oberfläche an der Karte hin.
 *
 * Aufbau wie bei einer gedruckten Karte, von unten nach oben: Wasser mit
 * Tiefenzonen, Gradnetz, Landmasse mit Textur, Naturräume, Gewässer,
 * Verkehrsnetz, Küstenlinie, Kartenrahmen.
 */
export function BaseMap() {
  // Geringe Spannung: Die Küste läuft rund, gerade Grenzen bleiben gerade.
  const coast = toSmoothPath(MAINLAND, true, 0.32);
  const keys = toSmoothPath(KEYS_CHAIN, false, 0.4);
  const lake = toSmoothPath(INLAND_LAKE);
  const wetlands = toSmoothPath(WETLANDS);

  return (
    <svg
      viewBox={`0 0 ${MAP_VIEWBOX.width} ${MAP_VIEWBOX.height}`}
      preserveAspectRatio="none"
      className="absolute inset-0 size-full"
      aria-hidden
    >
      <defs>
        <linearGradient id="lk-water" x1="0.1" y1="0" x2="0.85" y2="1">
          <stop offset="0%" stopColor={MAP_PALETTE.waterMid} />
          <stop offset="55%" stopColor={MAP_PALETTE.waterDeep} />
          <stop offset="100%" stopColor="#0d6b7d" />
        </linearGradient>

        <linearGradient id="lk-land" x1="0.15" y1="0" x2="0.8" y2="1">
          <stop offset="0%" stopColor={MAP_PALETTE.landHigh} />
          <stop offset="45%" stopColor={MAP_PALETTE.landMid} />
          <stop offset="100%" stopColor={MAP_PALETTE.landLow} />
        </linearGradient>

        {/* Sandsaum, der vom Strand nach innen ausläuft. */}
        <linearGradient id="lk-shore" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor={MAP_PALETTE.beach} stopOpacity="0.9" />
          <stop offset="100%" stopColor={MAP_PALETTE.beach} stopOpacity="0.35" />
        </linearGradient>

        <radialGradient id="lk-urban">
          <stop offset="0%" stopColor={MAP_PALETTE.urban} stopOpacity="0.5" />
          <stop offset="45%" stopColor={MAP_PALETTE.urban} stopOpacity="0.2" />
          <stop offset="100%" stopColor={MAP_PALETTE.urban} stopOpacity="0" />
        </radialGradient>

        {/* Feinkörnige Papiertextur – nimmt der Fläche das Vektorhafte. */}
        <filter id="lk-grain" x="0%" y="0%" width="100%" height="100%">
          <feTurbulence
            type="fractalNoise"
            baseFrequency="0.9"
            numOctaves="4"
            seed="7"
            result="noise"
          />
          <feColorMatrix
            in="noise"
            type="matrix"
            values="0 0 0 0 0.35 0 0 0 0 0.28 0 0 0 0 0.16 0 0 0 0.45 0"
          />
        </filter>

        <filter id="lk-deep" x="-25%" y="-25%" width="150%" height="150%">
          <feGaussianBlur stdDeviation="24" />
        </filter>
        <filter id="lk-shelf" x="-25%" y="-25%" width="150%" height="150%">
          <feGaussianBlur stdDeviation="8" />
        </filter>
        <filter id="lk-inner" x="-25%" y="-25%" width="150%" height="150%">
          <feGaussianBlur stdDeviation="3" />
        </filter>

        {/* Sumpfsignatur: Schraffur wie in gedruckten Karten. */}
        <pattern
          id="lk-marsh"
          width="9"
          height="9"
          patternUnits="userSpaceOnUse"
          patternTransform="rotate(35)"
        >
          <line
            x1="0"
            y1="3"
            x2="9"
            y2="3"
            stroke={MAP_PALETTE.marshLine}
            strokeOpacity="0.5"
            strokeWidth="0.8"
          />
          <line
            x1="0"
            y1="6.5"
            x2="4"
            y2="6.5"
            stroke={MAP_PALETTE.marshLine}
            strokeOpacity="0.3"
            strokeWidth="0.8"
          />
        </pattern>

        <clipPath id="lk-landclip">
          <path d={coast} />
        </clipPath>

        <pattern id="lk-graticule" width="65" height="65" patternUnits="userSpaceOnUse">
          <path
            d="M65 0H0V65"
            fill="none"
            stroke="#ffffff"
            strokeOpacity="0.1"
            strokeWidth="1"
          />
        </pattern>
      </defs>

      {/* --- Wasser ---------------------------------------------------------- */}
      <rect width="100%" height="100%" fill="url(#lk-water)" />

      {/* Tiefenzonen: drei Säume um die Landmasse, von tief nach flach. */}
      <g fill="none" strokeLinejoin="round">
        <path
          d={coast}
          stroke={MAP_PALETTE.waterShelf}
          strokeWidth="58"
          filter="url(#lk-deep)"
          opacity="0.32"
        />
        <path
          d={coast}
          stroke={MAP_PALETTE.waterShallow}
          strokeWidth="20"
          filter="url(#lk-shelf)"
          opacity="0.42"
        />
        <path
          d={coast}
          stroke="#b6ece5"
          strokeWidth="5"
          filter="url(#lk-inner)"
          opacity="0.38"
        />
        <path
          d={keys}
          stroke={MAP_PALETTE.waterShallow}
          strokeWidth="24"
          filter="url(#lk-shelf)"
          opacity="0.45"
        />
      </g>

      <rect width="100%" height="100%" fill="url(#lk-graticule)" />

      {/* Beschriftung der Wasserflächen */}
      <g
        style={{ fontFamily: "var(--font-serif), Georgia, serif" }}
        fill={MAP_PALETTE.label}
        fillOpacity="0.65"
        textAnchor="middle"
      >
        {WATER_LABELS.map((label) => {
          const [x, y] = toViewBox(...label.at);
          return (
            <text
              key={label.id}
              x={x}
              y={y}
              fontSize={label.size}
              fontStyle="italic"
              letterSpacing={label.size * 0.22}
            >
              {label.text}
            </text>
          );
        })}
      </g>

      {/* --- Land ------------------------------------------------------------ */}
      <path d={coast} fill="url(#lk-land)" />

      <g clipPath="url(#lk-landclip)">
        {/* Strandsaum: heller Streifen unmittelbar an der Küste */}
        <path
          d={coast}
          fill="none"
          stroke={MAP_PALETTE.beach}
          strokeOpacity="0.85"
          strokeWidth="5"
        />
        <path d={coast} fill="none" stroke="url(#lk-shore)" strokeWidth="22" opacity="0.7" />

        {/* Waldflächen */}
        <g fill={MAP_PALETTE.forest} fillOpacity="0.8">
          {FORESTS.map((forest) => (
            <path key={forest.id} d={toSmoothPath(forest.points)} />
          ))}
        </g>

        {/* Feuchtgebiet mit Schraffursignatur */}
        <path d={wetlands} fill={MAP_PALETTE.marsh} fillOpacity="0.85" />
        <path d={wetlands} fill="url(#lk-marsh)" />

        {/* Siedlungsflächen */}
        <g>
          {URBAN_AREAS.map((area) => {
            const [x, y] = toViewBox(...area.center);
            return (
              <circle key={area.id} cx={x} cy={y} r={area.radius * 130} fill="url(#lk-urban)" />
            );
          })}
        </g>

        {/* Flüsse */}
        <g
          fill="none"
          stroke={MAP_PALETTE.river}
          strokeOpacity="0.8"
          strokeWidth="2"
          strokeLinecap="round"
        >
          {RIVERS.map((river) => (
            <path key={river.id} d={toSmoothPath(river.points, false)} />
          ))}
        </g>

        {/* Binnensee */}
        <path
          d={lake}
          fill={MAP_PALETTE.waterMid}
          stroke={MAP_PALETTE.waterDeep}
          strokeOpacity="0.5"
          strokeWidth="1.6"
        />

        {/* Papiertextur ganz oben in der Landgruppe */}
        <rect
          width="100%"
          height="100%"
          filter="url(#lk-grain)"
          opacity="0.12"
          style={{ mixBlendMode: "multiply" }}
        />
      </g>

      {/* --- Verkehrsnetz ----------------------------------------------------- */}
      <g fill="none" strokeLinecap="round" strokeLinejoin="round">
        {/* Helles Casing zuerst, damit die Achsen auf dem Sand stehen. */}
        {HIGHWAYS.map((road) => (
          <path
            key={`casing-${road.id}`}
            d={toSmoothPath(road.points, false)}
            stroke={MAP_PALETTE.roadCasing}
            strokeOpacity="0.9"
            strokeWidth={road.rank === 1 ? 5.5 : 4}
          />
        ))}
        {HIGHWAYS.map((road) => (
          <path
            key={`core-${road.id}`}
            d={toSmoothPath(road.points, false)}
            stroke={road.rank === 1 ? MAP_PALETTE.roadMajor : MAP_PALETTE.roadMinor}
            strokeOpacity={road.rank === 1 ? 0.95 : 0.8}
            strokeWidth={road.rank === 1 ? 2.4 : 1.5}
          />
        ))}
      </g>

      {/* --- Inselkette ------------------------------------------------------- */}
      <path
        d={keys}
        fill="none"
        stroke={MAP_PALETTE.beach}
        strokeWidth="10"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeOpacity="0.9"
      />
      <path
        d={keys}
        fill="none"
        stroke={MAP_PALETTE.landLow}
        strokeOpacity="0.95"
        strokeWidth="7"
        strokeLinecap="round"
        strokeDasharray="2 7"
      />

      {/* --- Küstenlinie ------------------------------------------------------ */}
      <path
        d={coast}
        fill="none"
        stroke={MAP_PALETTE.coast}
        strokeOpacity="0.65"
        strokeWidth="1.4"
        strokeLinejoin="round"
      />

      {/* --- Kartenrahmen mit Teilung ----------------------------------------- */}
      <g stroke={MAP_PALETTE.frame} strokeOpacity="0.4" fill="none">
        <rect
          x="6"
          y="6"
          width={MAP_VIEWBOX.width - 12}
          height={MAP_VIEWBOX.height - 12}
          strokeWidth="2"
        />
        {Array.from({ length: 17 }, (_, index) => {
          const x = 6 + ((MAP_VIEWBOX.width - 12) / 16) * index;
          return (
            <path
              key={`tick-x-${index}`}
              d={`M${x} 6 v10 M${x} ${MAP_VIEWBOX.height - 6} v-10`}
              strokeWidth="1.5"
            />
          );
        })}
        {Array.from({ length: 13 }, (_, index) => {
          const y = 6 + ((MAP_VIEWBOX.height - 12) / 12) * index;
          return (
            <path
              key={`tick-y-${index}`}
              d={`M6 ${y} h10 M${MAP_VIEWBOX.width - 6} ${y} h-10`}
              strokeWidth="1.5"
            />
          );
        })}
      </g>
    </svg>
  );
}

/** Maßstabsleiste und Nordpfeil – Standardausstattung einer Karte. */
export function MapFurniture({ scale }: { scale: number }) {
  // Der Ausschnitt ist rund 890 km breit; die Leiste zeigt 100 km davon und
  // wächst mit dem Zoom, weil dieselbe Strecke dann mehr Fläche einnimmt.
  const barWidth = Math.min(38, (100 / 890) * 100 * scale);

  return (
    <div className="pointer-events-none absolute inset-0">
      <div className="absolute bottom-3 left-3 right-3 flex items-end justify-between gap-3">
        <div className="min-w-0">
          <div className="inline-block rounded-md bg-[#fdf4e2]/90 px-2.5 py-2 shadow-sm">
            <div
              className="relative h-1.5 border-x border-b border-[#123038]/70"
              style={{ width: `${barWidth}vw`, maxWidth: "9rem", minWidth: "2.5rem" }}
            />
            <p className="mt-1 font-mono text-[9px] uppercase tracking-[0.12em] text-[#123038]/80">
              ca. 100 km
            </p>
          </div>
          {/* Auf schmalen Viewports weggelassen: Der Hinweis steht dort ohnehin
              direkt über der Karte und würde Marker verdecken. */}
          <p className="mt-1.5 hidden max-w-[20rem] rounded-md bg-[#fdf4e2]/90 px-2.5 py-1.5 font-mono text-[9px] leading-relaxed uppercase tracking-[0.1em] text-[#123038]/75 shadow-sm sm:block">
            Geografische Basis: reale Küste Floridas · Spielkarte unveröffentlicht
          </p>
        </div>

        <div className="flex shrink-0 items-center gap-2">
          <span className="grid size-9 place-items-center rounded-md bg-[#fdf4e2]/90 shadow-sm">
            <svg viewBox="0 0 24 24" className="size-5" aria-hidden>
              <path d="M12 2.5 L15.2 13 L12 10.8 L8.8 13 Z" fill="#ff6a55" />
              <path d="M12 21.5 L8.8 13 L12 15.2 L15.2 13 Z" fill="#123038" opacity="0.4" />
            </svg>
          </span>
          <p className="rounded-md bg-[#fdf4e2]/90 px-2.5 py-1.5 font-mono text-[10px] text-[#123038]/80 shadow-sm">
            {Math.round(scale * 100)} %
          </p>
        </div>
      </div>
    </div>
  );
}
