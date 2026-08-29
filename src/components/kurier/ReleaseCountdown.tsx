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
    <section
      aria-labelledby="countdown-title"
      className="night border-y-2 border-ink-900"
    >
      <div className="flex flex-col gap-4 px-4 py-4 sm:flex-row sm:items-center sm:justify-between sm:gap-6">
        <div className="sm:max-w-[19rem]">
          <p className="meta text-sun-400">Angekündigter Erscheinungstermin</p>
          <p
            id="countdown-title"
            className="subhead mt-1 text-[1.35rem] leading-tight text-paper-50"
          >
            {RELEASE.labelDe}
          </p>
          <p className="mt-1 font-serif text-[12px] leading-snug text-paper-300">
            {RELEASE.midnightNote}
          </p>
        </div>

        {remaining ? (
          <ul className="flex items-stretch gap-2 sm:gap-3">
            {cells.map(([label, value]) => (
              <li
                key={label}
                className="min-w-[3.6rem] flex-1 border border-paper-100/25 bg-paper-50/5 px-2 py-2 text-center sm:min-w-[4.4rem]"
              >
                <span className="headline block text-[1.9rem] leading-none tabular-nums text-paper-50 sm:text-[2.4rem]">
                  {String(value).padStart(2, "0")}
                </span>
                <span className="meta mt-1 block text-paper-300">{label}</span>
              </li>
            ))}
          </ul>
        ) : (
          <p className="font-mono text-[10px] uppercase tracking-[0.16em] text-paper-300">
            {now === 0 ? "Zähler startet …" : "Der Termin ist erreicht."}
          </p>
        )}

        <div className="sm:text-right">
          <p className="meta text-paper-300">Vorabdownload</p>
          <p className="mt-1 font-mono text-[12px] font-bold text-paper-50">
            {RELEASE.preloadLabelDe}
          </p>
          <p className="mt-1 font-serif text-[12px] text-paper-300">
            {RELEASE.priceEur} · Standard Edition
          </p>
        </div>
      </div>
    </section>
  );
}
