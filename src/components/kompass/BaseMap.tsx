import {
  HIGHWAYS,
  INLAND_LAKE,
  KEYS_CHAIN,
  MAINLAND,
  MAP_VIEWBOX,
  toPath,
} from "@/content/geography";

/**
 * Grundkarte des Leonida Kompass.
 *
 * Gezeichnet wird die vereinfachte reale Küstenlinie Floridas – öffentlich
 * bekannte Realgeografie, kein Spielmaterial und kein fremdes Kartenasset.
 * Sie dient als geografische Orientierung, weil Leonida erkennbar an Florida
 * angelehnt ist. Die Spielkarte selbst ist unveröffentlicht; darauf weist die
 * Oberfläche an der Karte hin.
 */
export function BaseMap() {
  const mainland = toPath(MAINLAND);
  const keys = toPath(KEYS_CHAIN, false);
  const lake = toPath(INLAND_LAKE);

  return (
    <svg
      viewBox={`0 0 ${MAP_VIEWBOX.width} ${MAP_VIEWBOX.height}`}
      preserveAspectRatio="xMidYMid slice"
      className="absolute inset-0 size-full"
      aria-hidden
    >
      <defs>
        <linearGradient id="water" x1="0" y1="0" x2="0.4" y2="1">
          <stop offset="0%" stopColor="#040c14" />
          <stop offset="55%" stopColor="#05121a" />
          <stop offset="100%" stopColor="#030f16" />
        </linearGradient>

        <linearGradient id="land" x1="0.1" y1="0" x2="0.7" y2="1">
          <stop offset="0%" stopColor="#22332a" />
          <stop offset="45%" stopColor="#1d2c24" />
          <stop offset="100%" stopColor="#1a2a28" />
        </linearGradient>

        {/* Flachwasserzone entlang der Küste */}
        <filter id="shelf" x="-20%" y="-20%" width="140%" height="140%">
          <feGaussianBlur stdDeviation="9" />
        </filter>

        <filter id="coastGlow" x="-20%" y="-20%" width="140%" height="140%">
          <feGaussianBlur stdDeviation="2.5" />
        </filter>

        <pattern id="grid" width="52" height="52" patternUnits="userSpaceOnUse">
          <path
            d="M52 0H0V52"
            fill="none"
            stroke="rgba(154,166,182,0.07)"
            strokeWidth="1"
          />
        </pattern>
      </defs>

      {/* Wasser + Gradnetz */}
      <rect width="100%" height="100%" fill="url(#water)" />
      <rect width="100%" height="100%" fill="url(#grid)" />

      {/* Kontinentalschelf: weicher Saum um die Landmasse */}
      <g filter="url(#shelf)" opacity="0.55">
        <path d={mainland} fill="#0e3a40" />
        <path d={keys} fill="none" stroke="#0e3a40" strokeWidth="26" strokeLinecap="round" />
      </g>

      {/* Festland */}
      <path
        d={mainland}
        fill="url(#land)"
        stroke="#35c4b4"
        strokeOpacity="0.5"
        strokeWidth="1.6"
        strokeLinejoin="round"
      />
      <path
        d={mainland}
        fill="none"
        stroke="#6fe3d4"
        strokeOpacity="0.28"
        strokeWidth="3"
        filter="url(#coastGlow)"
      />

      {/* Inselkette */}
      <path
        d={keys}
        fill="none"
        stroke="#1a2b26"
        strokeWidth="9"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d={keys}
        fill="none"
        stroke="#35c4b4"
        strokeOpacity="0.45"
        strokeWidth="10.5"
        strokeLinecap="round"
        strokeDasharray="1 13"
      />

      {/* Binnensee */}
      <path d={lake} fill="#07161f" stroke="#35c4b4" strokeOpacity="0.3" strokeWidth="1.2" />

      {/* Reale Verkehrsachsen als Orientierung */}
      <g fill="none" stroke="#e2bd6b" strokeOpacity="0.3" strokeWidth="1.6">
        {HIGHWAYS.map((highway) => (
          <path key={highway.id} d={toPath(highway.points, false)} />
        ))}
      </g>
    </svg>
  );
}

/** Maßstabsleiste und Nordpfeil – Standardausstattung einer Karte. */
export function MapFurniture({ scale }: { scale: number }) {
  // Der Ausschnitt ist rund 850 km breit; die Leiste zeigt 100 km davon und
  // waechst mit dem Zoom, weil dieselbe Strecke dann mehr Flaeche einnimmt.
  const barWidth = Math.min(38, (100 / 850) * 100 * scale);

  return (
    <div className="pointer-events-none absolute inset-0">
      <div className="absolute bottom-3 left-3 right-3 flex items-end justify-between gap-3">
        <div className="min-w-0">
          <div className="inline-block rounded-md bg-ink-950/80 px-2.5 py-2 backdrop-blur">
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
          <p className="mt-1.5 hidden max-w-[20rem] rounded-md bg-ink-950/80 px-2.5 py-1.5 font-mono text-[9px] leading-relaxed uppercase tracking-[0.1em] text-paper-500 backdrop-blur sm:block">
            Geografische Basis: reale Küste Floridas · Spielkarte unveröffentlicht
          </p>
        </div>

        <div className="flex shrink-0 items-center gap-2">
          <span className="grid size-8 place-items-center rounded-md bg-ink-950/80 backdrop-blur">
            <svg viewBox="0 0 24 24" className="size-5" aria-hidden>
              <path d="M12 3 L15 13 L12 11 L9 13 Z" fill="#ff7a55" />
              <path d="M12 21 L9 13 L12 15 L15 13 Z" fill="#9aa6b6" opacity="0.5" />
            </svg>
          </span>
          <p className="rounded-md bg-ink-950/80 px-2.5 py-1.5 font-mono text-[10px] text-paper-500 backdrop-blur">
            {Math.round(scale * 100)} %
          </p>
        </div>
      </div>
    </div>
  );
}
