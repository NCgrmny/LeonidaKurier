"use client";

import { useSyncExternalStore } from "react";
import { RELEASE } from "@/lib/site";

/**
 * Zeitquelle im Halbminutentakt.
 *
 * Die Anzeige nennt Tage, Stunden und Minuten – ein Sekundentakt waere
 * Rechenarbeit fuer eine Zahl, die niemand sieht.
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
    }, 30000);
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

  return (
    /**
     * Redaktionelle Zeile statt Zaehlwerk.
     *
     * Vier grosse Ziffernkaesten lesen sich als Web-Widget. Eine Zeitung
     * schreibt "Noch 80 Tage bis Leonida" – die Zahl steht im Satz, nicht in
     * einer Kachel. Stunden und Minuten bleiben erhalten, aber klein und
     * nachgeordnet: Sie sind Beiwerk, nicht die Aussage.
     */
    <section
      aria-labelledby="countdown-title"
      className="border-y-2 border-ink-900 bg-paper-50"
    >
      <div className="flex flex-wrap items-baseline justify-between gap-x-8 gap-y-2 px-4 py-3">
        <div className="min-w-0">
          <h2 id="countdown-title" className="headline text-[1.7rem] leading-none sm:text-[2.1rem]">
            {remaining ? (
              <>
                Noch{" "}
                <span className="tabular-nums text-coral-600">{remaining.tage}</span>{" "}
                {remaining.tage === 1 ? "Tag" : "Tage"} bis Leonida
              </>
            ) : now === 0 ? (
              "Bis Leonida"
            ) : (
              "Leonida ist da"
            )}
          </h2>
          <p className="mt-1 font-serif text-[13px] leading-snug text-ink-700">
            Angekündigter Erscheinungstermin{" "}
            <strong className="font-semibold">{RELEASE.labelDe}</strong>.{" "}
            {RELEASE.midnightNote}
            {remaining ? (
              <span className="text-ink-500">
                {" "}
                Genauer: noch {remaining.std} Stunden und {remaining.min} Minuten.
              </span>
            ) : null}
          </p>
        </div>

        {/* Kein shrink-0: die Zeile ist auf 390px breiter als der Platz und
            wuerde sonst am Rand abgeschnitten statt umzubrechen. */}
        <p className="meta text-ink-500">
          Vorabdownload ab {RELEASE.preloadLabelDe} · {RELEASE.priceEur}
        </p>
      </div>
    </section>
  );
}
