import Link from "next/link";
import { RADAR_STATUS, RADAR_STATUS_ORDER, statusDefinition } from "@/lib/status";
import { entityHref } from "@/lib/content/collections";
import { formatDate } from "@/lib/format";
import type { RadarSignal } from "@/lib/types";

/**
 * Das Radar-Board: fünf Spalten, eine je Verifizierungsgrad. Die Statusspalte
 * ist die zentrale Aussage – nicht die Überschrift des Signals.
 */
export function RadarBoard({ signals }: { signals: RadarSignal[] }) {
  return (
    <div className="grid gap-px bg-night-700 sm:grid-cols-2 lg:grid-cols-5">
      {RADAR_STATUS_ORDER.map((status) => {
        const definition = RADAR_STATUS[status];
        const column = signals.filter((signal) => signal.status === status);
        return (
          <section key={status} aria-label={definition.label} className="bg-night-900 p-4">
            <header className="border-b border-[var(--rule)] pb-3">
              <span
                aria-hidden
                className="mb-2.5 block h-1.5 w-10"
                style={{ backgroundColor: definition.accent }}
              />
              <h3 className="font-mono text-[11px] font-bold uppercase tracking-[0.18em] text-paper-50">
                {definition.label}
              </h3>
              <p className="mt-1.5 font-serif text-[12px] leading-snug text-paper-400">
                {definition.definition}
              </p>
            </header>

            <ul className="mt-3 grid gap-3">
              {column.length === 0 ? (
                <li className="border border-dashed border-[var(--rule)] px-3 py-4 text-center font-mono text-[10px] uppercase tracking-[0.14em] text-paper-400">
                  Kein Eintrag
                </li>
              ) : (
                column.map((signal) => (
                  <li key={signal.id} className="border-b border-[var(--rule)] pb-3 last:border-0">
                    <p className="subhead text-[16px] leading-tight text-paper-50">
                      {signal.title}
                    </p>
                    <p className="mt-1.5 font-serif text-[13px] leading-snug text-paper-300">
                      {signal.summary}
                    </p>
                    <p className="meta mt-2">
                      {signal.channel} · {formatDate(signal.observedAt)}
                    </p>
                    {signal.related && signal.related.length > 0 ? (
                      <Link
                        href={entityHref(signal.related[0].type, signal.related[0].slug)}
                        className="mt-2 inline-block font-mono text-[10px] font-bold uppercase tracking-[0.14em] text-lagoon-300 hover:text-lagoon-200"
                      >
                        Verknüpfung →
                      </Link>
                    ) : null}
                  </li>
                ))
              )}
            </ul>
          </section>
        );
      })}
    </div>
  );
}

/** Statuslegende für Erklärabschnitte. */
export function StatusLegend({ tone = "paper" }: { tone?: "paper" | "night" }) {
  const night = tone === "night";
  return (
    <dl
      className={`grid gap-px sm:grid-cols-2 lg:grid-cols-5 ${night ? "bg-night-700" : "bg-ink-900/15"}`}
    >
      {RADAR_STATUS_ORDER.map((status) => {
        const definition = statusDefinition(status);
        return (
          <div key={status} className={night ? "bg-night-900 p-4" : "bg-paper-100 p-4"}>
            <dt className="flex items-center gap-2 font-mono text-[11px] font-bold uppercase tracking-[0.16em]">
              <span
                aria-hidden
                className="size-2.5"
                style={{ backgroundColor: definition.accent }}
              />
              {definition.label}
            </dt>
            <dd
              className={`mt-2 font-serif text-[13px] leading-snug ${night ? "text-paper-300" : "text-ink-600"}`}
            >
              {definition.definition}
            </dd>
          </div>
        );
      })}
    </dl>
  );
}
