/**
 * Signet des Kurier: runder Stempel mit umlaufender Schrift, Palme und
 * Gründungsjahr. Rein typografisch-grafisch aufgebaut, kein fremdes Markenasset.
 */
export function Seal({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 120 120" className={className} role="img" aria-label="Signet des Leonida Kurier">
      <defs>
        <path
          id="seal-arc-top"
          d="M60 60 m-44 0 a44 44 0 1 1 88 0"
          fill="none"
        />
        <path
          id="seal-arc-bottom"
          d="M60 60 m44 0 a44 44 0 1 1 -88 0"
          fill="none"
        />
      </defs>

      <g fill="none" stroke="currentColor" strokeOpacity="0.75">
        <circle cx="60" cy="60" r="56" strokeWidth="1.5" />
        <circle cx="60" cy="60" r="51" strokeWidth="3" />
        <circle cx="60" cy="60" r="33" strokeWidth="1" strokeDasharray="2 3" />
      </g>

      <g
        fill="currentColor"
        fillOpacity="0.9"
        style={{ fontFamily: "var(--font-mono), monospace" }}
        fontSize="10"
        fontWeight="700"
        letterSpacing="2.4"
      >
        <text>
          <textPath href="#seal-arc-top" startOffset="50%" textAnchor="middle">
            LEONIDA KURIER
          </textPath>
        </text>
        <text>
          <textPath href="#seal-arc-bottom" startOffset="50%" textAnchor="middle">
            EST. 2026
          </textPath>
        </text>
      </g>

      {/* Palme in der Mitte */}
      <g fill="currentColor" transform="translate(60 76) scale(0.135)">
        <path d="M-6 0 C-3 -60 2 -120 12 -184 L22 -182 C12 -120 8 -60 6 0 Z" />
        <path d="M16 -186 C46 -216 92 -222 126 -206 C92 -212 56 -200 24 -178 Z" />
        <path d="M16 -186 C10 -232 24 -276 58 -300 C34 -268 22 -230 22 -182 Z" />
        <path d="M14 -186 C-16 -222 -60 -236 -96 -228 C-62 -228 -26 -212 6 -180 Z" />
        <path d="M14 -186 C4 -226 -14 -260 -44 -282 C-22 -252 -6 -220 4 -182 Z" />
        <circle cx="20" cy="-178" r="7" />
      </g>
      <g fill="currentColor" fillOpacity="0.6">
        <circle cx="34" cy="60" r="1.6" />
        <circle cx="86" cy="60" r="1.6" />
      </g>
    </svg>
  );
}

/** Kleine Palmen-Glyphe als Trennzeichen im Zeitungskopf. */
export function PalmGlyph({
  className,
  doppelt = false,
}: {
  className?: string;
  /** Zwei Palmen fuer den Blattkopf, eine einzelne fuer Fliesstext. */
  doppelt?: boolean;
}) {
  const wedel = (
    <>
      <path d="M-6 0 C-3 -60 2 -120 12 -184 L22 -182 C12 -120 8 -60 6 0 Z" />
      <path d="M16 -186 C46 -216 92 -222 126 -206 C92 -212 56 -200 24 -178 Z" />
      <path d="M16 -186 C44 -232 88 -256 128 -256 C92 -244 52 -220 22 -180 Z" />
      <path d="M16 -186 C10 -232 24 -276 58 -300 C34 -268 22 -230 22 -182 Z" />
      <path d="M14 -186 C-16 -222 -60 -236 -96 -228 C-62 -228 -26 -212 6 -180 Z" />
      <path d="M14 -186 C-14 -238 -58 -266 -98 -268 C-62 -254 -24 -226 4 -180 Z" />
      <path d="M14 -186 C4 -226 -14 -260 -44 -282 C-22 -252 -6 -220 4 -182 Z" />
      <circle cx="20" cy="-178" r="7" />
      <circle cx="6" cy="-174" r="6" />
    </>
  );

  if (!doppelt) {
    return (
      <svg viewBox="0 0 60 120" className={className} aria-hidden fill="currentColor">
        <g transform="translate(24 116) scale(0.32)">{wedel}</g>
      </svg>
    );
  }

  // Zwei Palmen, versetzt in Hoehe und Neigung – ein Paar, kein Spiegelbild.
  return (
    <svg viewBox="0 0 132 120" className={className} aria-hidden fill="currentColor">
      <g transform="translate(44 118) scale(0.335) rotate(-4)">{wedel}</g>
      <g transform="translate(96 118) scale(0.27) rotate(6)">{wedel}</g>
    </svg>
  );
}
