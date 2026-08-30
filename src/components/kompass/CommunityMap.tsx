"use client";

import { useState } from "react";

/**
 * Einbindung der Community-Rekonstruktion „State of Leonida“.
 *
 * Drei Entscheidungen stecken darin:
 *
 * 1. Click-to-load. Die externe Karte wird erst geladen, wenn jemand sie
 *    ausdrücklich anfordert. Vorher geht keine Verbindung zu einem fremden
 *    Server, es wird keine IP-Adresse übertragen und es liegt kein Fall vor,
 *    für den eine Einwilligung nötig wäre.
 * 2. Urhebernennung im Rahmen, nicht im Kleingedruckten. Die Karte ist fremde
 *    Arbeit; der Kurier spiegelt sie nicht, sondern verweist auf sie.
 * 3. Kein fremdes Bildmaterial als Hintergrund. Die frühere Fassung dieser
 *    Sektion legte einen Rockstar-Screenshot darunter. Solange die
 *    Nutzungsrechte ungeklärt sind, steht hier eigenes Material.
 */

const KARTE_URL = "https://map.stateofleonida.net/?lang=en";

export function CommunityMap() {
  const [geladen, setGeladen] = useState(false);

  return (
    <section
      aria-labelledby="community-karte"
      className="border-y-2 border-ink-900 bg-paper-50"
    >
      <div className="grid gap-4 px-4 py-4 lg:grid-cols-[minmax(0,22rem)_minmax(0,1fr)] lg:gap-8 lg:px-6 lg:py-6">
        <div>
          <p className="meta text-lagoon-700">Reale Community-Rekonstruktion</p>
          <h2 id="community-karte" className="subhead mt-1 text-[1.6rem] leading-tight">
            State of Leonida
          </h2>
          <p className="mt-2 font-serif text-[14px] leading-relaxed text-ink-700">
            Die Mapping Community setzt Leonida aus offiziellen Trailern und
            Screenshots zusammen. Das ist die beste verfügbare Arbeitskarte – aber
            keine offizielle Rockstar-Karte.
          </p>
          <a
            href={KARTE_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-3 inline-flex items-center gap-1.5 border-b-2 border-coral-500 pb-0.5 font-mono text-[11px] font-bold uppercase tracking-[0.16em] text-ink-900 transition-colors hover:text-coral-600"
          >
            Originalkarte öffnen <span aria-hidden>↗</span>
          </a>
          <p className="mt-4 border-t border-ink-900/15 pt-3 font-serif text-[12px] leading-snug text-ink-600">
            Karte und Kartendaten: GTA VI Mapping Community / State of Leonida.
            Externe Inhalte werden erst nach deinem Klick geladen.
          </p>
        </div>

        <div className="relative min-h-[16rem] border-2 border-ink-900 bg-paper-200 lg:min-h-[26rem]">
          {geladen ? (
            <iframe
              src={KARTE_URL}
              title="State of Leonida – interaktive Community-Karte"
              loading="lazy"
              referrerPolicy="no-referrer"
              className="absolute inset-0 size-full"
            />
          ) : (
            <button
              type="button"
              onClick={() => setGeladen(true)}
              className="group absolute inset-0 flex flex-col items-center justify-center gap-2 p-6 text-center transition-colors hover:bg-paper-300/60"
            >
              {/* Eigene Andeutung einer Karte – kein fremdes Bildmaterial. */}
              <svg viewBox="0 0 120 80" aria-hidden className="h-16 w-auto text-ink-900/25">
                <path
                  d="M8 62 L34 12 L58 44 L78 20 L112 62 Z"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                />
                <circle cx="34" cy="12" r="4" fill="currentColor" />
                <circle cx="78" cy="20" r="4" fill="currentColor" />
                <circle cx="58" cy="44" r="4" fill="currentColor" />
              </svg>
              <span className="meta text-lagoon-700">Interaktiv · externe Verbindung</span>
              <span className="subhead text-[1.15rem] group-hover:text-coral-600">
                Community-Karte hier laden
              </span>
              <span className="max-w-sm font-serif text-[13px] leading-snug text-ink-600">
                Straßen, Landmarken, Bildpositionen und fortlaufende Rekonstruktion
                direkt von State of Leonida. Beim Laden wird eine Verbindung zu einem
                fremden Server hergestellt.
              </span>
            </button>
          )}
        </div>
      </div>
    </section>
  );
}
