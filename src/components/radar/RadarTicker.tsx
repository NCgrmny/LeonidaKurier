import Link from "next/link";
import { statusDefinition } from "@/lib/status";
import type { RadarSignal } from "@/lib/types";

/**
 * Laufstreifen unter dem Zeitungskopf: die jüngsten Signale in einer Zeile,
 * je mit Statusfarbe. Auf schmalen Viewports horizontal scrollbar statt
 * umbrechend, damit der Streifen flach bleibt.
 */
export function RadarTicker({ signals }: { signals: RadarSignal[] }) {
  if (signals.length === 0) return null;

  return (
    <div className="night border-y border-night-700">
      <div className="flex items-stretch">
        <p className="flex shrink-0 items-center gap-2 bg-coral-500 px-3 py-2 font-mono text-[10px] font-bold uppercase tracking-[0.18em] text-paper-50 sm:px-4">
          <span aria-hidden className="size-1.5 animate-pulse rounded-full bg-paper-50" />
          Radar
        </p>
        <ul className="flex flex-1 items-center gap-6 overflow-x-auto px-4 py-2 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
          {signals.slice(0, 6).map((signal) => (
            <li key={signal.id} className="flex shrink-0 items-center gap-2">
              <span
                aria-hidden
                className="size-1.5 shrink-0 rounded-full"
                style={{ backgroundColor: statusDefinition(signal.status).accent }}
              />
              <span className="font-mono text-[10px] uppercase tracking-[0.12em] text-paper-400">
                {statusDefinition(signal.status).label}
              </span>
              <span className="whitespace-nowrap font-serif text-[13px] text-paper-200">
                {signal.title}
              </span>
            </li>
          ))}
        </ul>
        <Link
          href="/radar"
          className="hidden shrink-0 items-center border-l border-night-700 px-4 font-mono text-[10px] font-bold uppercase tracking-[0.16em] text-lagoon-300 hover:text-lagoon-200 md:flex"
        >
          Alle →
        </Link>
      </div>
    </div>
  );
}
