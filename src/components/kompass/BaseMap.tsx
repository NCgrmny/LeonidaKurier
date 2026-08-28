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
  // Geringe Spannung: Die Kueste laeuft rund, gerade Grenzen bleiben gerade.
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
        <linearGradient id="lk-water" x1="0.15" y1="0" x2="0.8" y2="1">
          <stop offset="0%" stopColor="#020a11" />
          <stop offset="45%" stopColor="#04121c" />
          <stop offset="100%" stopColor="#020810" />
        </linearGradient>

        <linearGradient id="lk-land" x1="0.2" y1="0" x2="0.75" y2="1">
          <stop offset="0%" stopColor="#4a5539" />
          <stop offset="35%" stopColor="#414c32" />
          <stop offset="70%" stopColor="#3b4632" />
          <stop offset="100%" stopColor="#364235" />
        </linearGradient>

        {/* Warmer Küstensaum: Strand- und Sandzone am Landrand. */}
        <linearGradient id="lk-shore" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#e2bd6b" stopOpacity="0.3" />
          <stop offset="100%" stopColor="#e2bd6b" stopOpacity="0.12" />
        </linearGradient>

        <radialGradient id="lk-urban">
          <stop offset="0%" stopColor="#ffb08e" stopOpacity="0.3" />
          <stop offset="45%" stopColor="#ff8a63" stopOpacity="0.11" />
          <stop offset="100%" stopColor="#ff7a55" stopOpacity="0" />
        </radialGradient>

        {/* Feinkörnige Landtextur – nimmt der Fläche das Vektorhafte. */}
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
            values="0 0 0 0 0.55 0 0 0 0 0.58 0 0 0 0 0.42 0 0 0 0.5 0"
          />
        </filter>

        <filter id="lk-deep" x="-25%" y="-25%" width="150%" height="150%">
          <feGaussianBlur stdDeviation="26" />
        </filter>
        <filter id="lk-shelf" x="-25%" y="-25%" width="150%" height="150%">
          <feGaussianBlur stdDeviation="9" />
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
          <line x1="0" y1="3" x2="9" y2="3" stroke="#6fe3d4" strokeOpacity="0.13" strokeWidth="0.8" />
          <line x1="0" y1="6.5" x2="4" y2="6.5" stroke="#6fe3d4" strokeOpacity="0.07" strokeWidth="0.8" />
        </pattern>

        <clipPath id="lk-landclip">
          <path d={coast} />
        </clipPath>

        <pattern id="lk-graticule" width="65" height="65" patternUnits="userSpaceOnUse">
          <path d="M65 0H0V65" fill="none" stroke="#9aa6b6" strokeOpacity="0.05" strokeWidth="1" />
        </pattern>
      </defs>

      {/* --- Wasser ---------------------------------------------------------- */}
      <rect width="100%" height="100%" fill="url(#lk-water)" />

      {/* Tiefenzonen: drei Säume um die Landmasse, von tief nach flach. */}
      <g fill="none" strokeLinejoin="round">
        <path d={coast} stroke="#062230" strokeWidth="64" filter="url(#lk-deep)" opacity="0.55" />
        <path d={coast} stroke="#0b3a4a" strokeWidth="26" filter="url(#lk-shelf)" opacity="0.55" />
        <path d={coast} stroke="#14596a" strokeWidth="7" filter="url(#lk-inner)" opacity="0.4" />
        <path d={keys} stroke="#0b3a4a" strokeWidth="30" filter="url(#lk-shelf)" opacity="0.45" />
      </g>

      <rect width="100%" height="100%" fill="url(#lk-graticule)" />

      {/* Beschriftung der Wasserflächen */}
      <g
        style={{ fontFamily: "var(--font-serif), Georgia, serif" }}
        fill="#4d8092"
        fillOpacity="0.55"
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
        <path d={coast} fill="none" stroke="#c9bb87" strokeOpacity="0.32" strokeWidth="4.5" />
        <path d={coast} fill="none" stroke="url(#lk-shore)" strokeWidth="22" opacity="0.55" />

        {/* Waldflächen */}
        <g fill="#2b3a22" fillOpacity="0.65">
          {FORESTS.map((forest) => (
            <path key={forest.id} d={toSmoothPath(forest.points)} />
          ))}
        </g>

        {/* Feuchtgebiet mit Schraffursignatur */}
        <path d={wetlands} fill="#233a2f" fillOpacity="0.8" />
        <path d={wetlands} fill="url(#lk-marsh)" />

        {/* Siedlungsflächen */}
        <g>
          {URBAN_AREAS.map((area) => {
            const [x, y] = toViewBox(...area.center);
            return (
              <circle
                key={area.id}
                cx={x}
                cy={y}
                r={area.radius * 130}
                fill="url(#lk-urban)"
              />
            );
          })}
        </g>

        {/* Flüsse */}
        <g fill="none" stroke="#2a6274" strokeOpacity="0.6" strokeWidth="1.8" strokeLinecap="round">
          {RIVERS.map((river) => (
            <path key={river.id} d={toSmoothPath(river.points, false)} />
          ))}
        </g>

        {/* Binnensee */}
        <path d={lake} fill="#08202e" stroke="#2f7f92" strokeOpacity="0.6" strokeWidth="1.6" />

        {/* Landtextur ganz oben in der Landgruppe */}
        <rect
          width="100%"
          height="100%"
          filter="url(#lk-grain)"
          opacity="0.1"
          style={{ mixBlendMode: "overlay" }}
        />
      </g>

      {/* --- Verkehrsnetz ----------------------------------------------------- */}
      <g fill="none" strokeLinecap="round" strokeLinejoin="round">
        {/* Dunkles Casing zuerst, damit die Achsen sich vom Untergrund lösen. */}
        {HIGHWAYS.map((road) => (
          <path
            key={`casing-${road.id}`}
            d={toSmoothPath(road.points, false)}
            stroke="#10180f"
            strokeOpacity="0.75"
            strokeWidth={road.rank === 1 ? 5.5 : 4}
          />
        ))}
        {HIGHWAYS.map((road) => (
          <path
            key={`core-${road.id}`}
            d={toSmoothPath(road.points, false)}
            stroke={road.rank === 1 ? "#f5e2b0" : "#cdb27a"}
            strokeOpacity={road.rank === 1 ? 0.78 : 0.5}
            strokeWidth={road.rank === 1 ? 2.2 : 1.4}
          />
        ))}
      </g>

      {/* --- Inselkette ------------------------------------------------------- */}
      <path
        d={keys}
        fill="none"
        stroke="#3b4632"
        strokeWidth="9"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d={keys}
        fill="none"
        stroke="#c9bb87"
        strokeOpacity="0.55"
        strokeWidth="10"
        strokeLinecap="round"
        strokeDasharray="1.5 8"
      />

      {/* --- Küstenlinie ------------------------------------------------------ */}
      <path
        d={coast}
        fill="none"
        stroke="#8fd8cb"
        strokeOpacity="0.4"
        strokeWidth="1.1"
        strokeLinejoin="round"
      />

      {/* --- Kartenrahmen mit Teilung ----------------------------------------- */}
      <g stroke="#9aa6b6" strokeOpacity="0.25" fill="none">
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
  // waechst mit dem Zoom, weil dieselbe Strecke dann mehr Flaeche einnimmt.
  const barWidth = Math.min(38, (100 / 890) * 100 * scale);

  return (
    <div className="pointer-events-none absolute inset-0">
      <div className="absolute bottom-3 left-3 right-3 flex items-end justify-between gap-3">
        <div className="min-w-0">
          <div className="inline-block rounded-md bg-ink-950/75 px-2.5 py-2 backdrop-blur">
            <div
              className="relative h-1.5 border-x border-b border-paper-400/70"
              style={{ width: `${barWidth}vw`, maxWidth: "9rem", minWidth: "2.5rem" }}
            />
            <p className="mt-1 font-mono text-[9px] uppercase tracking-[0.12em] text-paper-400">
              ca. 100 km
            </p>
          </div>
          {/* Auf schmalen Viewports weggelassen: Der Hinweis steht dort ohnehin
              direkt ueber der Karte und wuerde Marker verdecken. */}
          <p className="mt-1.5 hidden max-w-[20rem] rounded-md bg-ink-950/75 px-2.5 py-1.5 font-mono text-[9px] leading-relaxed uppercase tracking-[0.1em] text-paper-500 backdrop-blur sm:block">
            Geografische Basis: reale Küste Floridas · Spielkarte unveröffentlicht
          </p>
        </div>

        <div className="flex shrink-0 items-center gap-2">
          <span className="grid size-9 place-items-center rounded-md bg-ink-950/75 backdrop-blur">
            <svg viewBox="0 0 24 24" className="size-5" aria-hidden>
              <path d="M12 2.5 L15.2 13 L12 10.8 L8.8 13 Z" fill="#ff7a55" />
              <path d="M12 21.5 L8.8 13 L12 15.2 L15.2 13 Z" fill="#9aa6b6" opacity="0.45" />
              <text
                x="12"
                y="7.6"
                textAnchor="middle"
                fontSize="5"
                fill="#0b0f16"
                style={{ fontFamily: "var(--font-mono), monospace" }}
              >
                N
              </text>
            </svg>
          </span>
          <p className="rounded-md bg-ink-950/75 px-2.5 py-1.5 font-mono text-[10px] text-paper-500 backdrop-blur">
            {Math.round(scale * 100)} %
          </p>
        </div>
      </div>
    </div>
  );
}
