"use client";

import { useSyncExternalStore } from "react";
import { RELEASE } from "@/lib/site";

/**
 * Sekundentakt als externe Quelle.
 *
 * Der Zeitstempel wird zwischengespeichert und nur im Intervall fortgeschrieben.
 * `getSnapshot` muss bei unveraendertem Zustand denselben Wert liefern – ein
 * direktes `Date.now()` waehrend des Renderns wuerde React in eine Endlosschleife
 * schicken. Vor der ersten Subscription steht der Wert auf 0; Server und Client
 * rendern damit dasselbe und die Hydration bleibt still.
 */
let currentNow = 0;
const listeners = new Set<() => void>();
let timer: number | undefined;

function subscribe(onStoreChange: () => void) {
  listeners.add(onStoreChange);
  if (timer === undefined) {
    currentNow = Date.now();
    timer = window.setInterval(() => {
      currentNow = Date.now();
      for (const listener of listeners) listener();
    }, 1000);
  }
  // Der erste Wert liegt jetzt vor – Abonnenten einmal wecken.
  onStoreChange();
  return () => {
    listeners.delete(onStoreChange);
    if (listeners.size === 0 && timer !== undefined) {
      window.clearInterval(timer);
      timer = undefined;
    }
  };
}

const getSnapshot = () => currentNow;
const getServerSnapshot = () => 0;

interface Remaining {
  tage: number;
  std: number;
  min: number;
  sek: number;
}

function remainingFrom(target: number, now: number): Remaining | null {
  if (now === 0) return null;
  const diff = target - now;
  if (diff <= 0) return null;
  const s = Math.floor(diff / 1000);
  return {
    tage: Math.floor(s / 86400),
    std: Math.floor((s % 86400) / 3600),
    min: Math.floor((s % 3600) / 60),
    sek: s % 60,
  };
}

/**
 * Countdown auf den offiziellen Erscheinungstermin.
 *
 * Der Kasten nennt ausdruecklich, worauf er zaehlt: auf den von Rockstar Games
 * angekuendigten Termin. Er behauptet nicht, dass dieser Termin haelt.
 */
export function ReleaseCountdown() {
  const now = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
  const target = new Date(RELEASE.isoUtc).getTime();
  const remaining = remainingFrom(target, now);

  const cells: [string, number][] = remaining
    ? [
        ["Tage", remaining.tage],
        ["Std", remaining.std],
        ["Min", remaining.min],
        ["Sek", remaining.sek],
      ]
    : [];

  return (
    /**
     * Der Zaehler stand bisher in einem dunkelblauen Kasten – ein Rest aus
     * der Zeit, als die Seite wie ein Dashboard gebaut war. In einem Blatt
     * gibt es keine dunklen Kaesten: Es gibt Papier, schwarze Druckfarbe,
     * Linien und eine Schmuckfarbe. Der Zaehler ist deshalb ein
     * Zeitungsstreifen wie jeder andere.
     */
    <section
      aria-labelledby="countdown-title"
      className="border-y-2 border-ink-900 bg-paper-50"
    >
      <div className="grid gap-y-3 px-4 py-3 sm:grid-cols-[minmax(0,1fr)_auto_minmax(0,auto)] sm:items-center sm:gap-x-6">
        <div>
          <p className="meta text-coral-600">Angekündigter Erscheinungstermin</p>
          <p id="countdown-title" className="subhead mt-0.5 text-[1.4rem] leading-tight">
            {RELEASE.labelDe}
          </p>
          <p className="mt-0.5 font-serif text-[12px] leading-snug text-ink-600">
            {RELEASE.midnightNote}
          </p>
        </div>

        {remaining ? (
          <ul className="flex items-stretch divide-x divide-ink-900/25 border-x-2 border-ink-900">
            {cells.map(([label, value]) => (
              <li key={label} className="min-w-[3.4rem] px-3 py-0.5 text-center sm:min-w-[4rem]">
                <span className="headline block text-[2rem] leading-none tabular-nums text-ink-900 sm:text-[2.5rem]">
                  {String(value).padStart(2, "0")}
                </span>
                <span className="meta mt-0.5 block text-ink-500">{label}</span>
              </li>
            ))}
          </ul>
        ) : (
          <p className="font-mono text-[10px] uppercase tracking-[0.16em] text-ink-500">
            {now === 0 ? "Zähler startet …" : "Der Termin ist erreicht."}
          </p>
        )}

        <div className="sm:text-right">
          <p className="meta text-lagoon-700">Vorabdownload</p>
          <p className="mt-0.5 font-mono text-[12px] font-bold text-ink-900">
            {RELEASE.preloadLabelDe}
          </p>
          <p className="mt-0.5 font-serif text-[12px] text-ink-600">
            {RELEASE.priceEur} · Standard Edition
          </p>
        </div>
      </div>
    </section>
  );
}
