import Link from "next/link";
import { statusDefinition } from "@/lib/status";
import type { RadarSignal } from "@/lib/types";

/**
 * Laufband unter dem Zeitungskopf: die jüngsten Signale in einer Zeile, je mit
 * farbigem Statuschip. Auf schmalen Viewports horizontal scrollbar statt
 * umbrechend, damit das Band flach bleibt.
 */
export function RadarTicker({ signals }: { signals: RadarSignal[] }) {
  if (signals.length === 0) return null;

  return (
    <div className="flex items-stretch bg-night-950 text-paper-100">
      <p className="flex shrink-0 items-center gap-2 bg-coral-500 px-3 py-2 font-mono text-[10px] font-bold uppercase tracking-[0.16em] text-paper-50 sm:px-4">
        <span aria-hidden className="size-1.5 animate-pulse rounded-full bg-paper-50" />
        Liveticker
      </p>

      <ul className="flex flex-1 items-center gap-5 overflow-x-auto px-3 py-2 [scrollbar-width:none] sm:gap-7 sm:px-4 [&::-webkit-scrollbar]:hidden">
        {signals.slice(0, 6).map((signal) => {
          const definition = statusDefinition(signal.status);
          return (
            <li key={signal.id} className="flex shrink-0 items-center gap-2.5">
              <span
                className="status-chip"
                style={{ backgroundColor: definition.accent }}
              >
                {definition.label}
              </span>
              <span className="whitespace-nowrap font-serif text-[13px] text-paper-200">
                {signal.title}
              </span>
            </li>
          );
        })}
      </ul>

      <Link
        href="/radar"
        className="hidden shrink-0 items-center gap-1.5 border-l border-white/15 px-4 font-mono text-[10px] font-bold uppercase tracking-[0.16em] text-lagoon-300 transition-colors hover:text-lagoon-200 md:flex"
      >
        Mehr <span aria-hidden>→</span>
      </Link>
    </div>
  );
}
