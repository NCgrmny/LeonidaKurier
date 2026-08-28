import Link from "next/link";
import { RADAR_STATUS, RADAR_STATUS_ORDER, statusDefinition } from "@/lib/status";
import { entityHref } from "@/lib/content/collections";
import { formatDate } from "@/lib/format";
import type { RadarSignal } from "@/lib/types";

/**
 * Das Radar-Board: fünf Spalten, eine je Verifizierungsgrad. Die Statusspalte
 * ist die zentrale Aussage – nicht die Überschrift des Signals.
 */
export function RadarBoard({
  signals,
  compact = false,
}: {
  signals: RadarSignal[];
  compact?: boolean;
}) {
  return (
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
      {RADAR_STATUS_ORDER.map((status) => {
        const definition = RADAR_STATUS[status];
        const column = signals.filter((signal) => signal.status === status);
        return (
          <section
            key={status}
            aria-label={definition.label}
            className="flex flex-col rounded-xl border border-[var(--rule)] bg-ink-900/45 p-4"
          >
            <header className="border-b border-[var(--rule)] pb-3">
              <span
                aria-hidden
                className="mb-2.5 block h-1 w-8 rounded-full"
                style={{ backgroundColor: definition.accent }}
              />
              <h3 className="font-mono text-[11px] uppercase tracking-[0.16em] text-paper-50">
                {definition.label}
              </h3>
              <p className="mt-1.5 text-[11px] leading-relaxed text-paper-500">
                {definition.definition}
              </p>
            </header>

            <ul className="mt-3 grid gap-2.5">
              {column.length === 0 ? (
                <li className="rounded-lg border border-dashed border-[var(--rule)] px-3 py-4 text-center text-[11px] text-paper-500">
                  Aktuell kein Eintrag
                </li>
              ) : (
                column.map((signal) => (
                  <li
                    key={signal.id}
                    className="rounded-lg border border-[var(--rule)] bg-ink-850/70 px-3 py-3"
                  >
                    <p className="text-sm leading-snug font-medium text-paper-50">
                      {signal.title}
                    </p>
                    {compact ? null : (
                      <p className="mt-1.5 text-xs leading-relaxed text-paper-400">
                        {signal.summary}
                      </p>
                    )}
                    <p className="mt-2.5 font-mono text-[10px] uppercase tracking-[0.12em] text-paper-500">
                      {signal.channel} · {formatDate(signal.observedAt)}
                    </p>
                    {signal.related && signal.related.length > 0 ? (
                      <Link
                        href={entityHref(signal.related[0].type, signal.related[0].slug)}
                        className="mt-2 inline-block font-mono text-[10px] uppercase tracking-[0.12em] text-lagoon-300 hover:text-lagoon-400"
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

/** Kompakte Statuslegende, z. B. für Erklärabschnitte. */
export function StatusLegend() {
  return (
    <dl className="grid gap-3 sm:grid-cols-2 lg:grid-cols-5">
      {RADAR_STATUS_ORDER.map((status) => {
        const definition = statusDefinition(status);
        return (
          <div
            key={status}
            className="rounded-lg border border-[var(--rule)] bg-ink-900/40 p-4"
          >
            <dt className="flex items-center gap-2 font-mono text-[11px] uppercase tracking-[0.14em] text-paper-50">
              <span
                aria-hidden
                className="size-2 rounded-full"
                style={{ backgroundColor: definition.accent }}
              />
              {definition.label}
            </dt>
            <dd className="mt-2 text-xs leading-relaxed text-paper-400">
              {definition.definition}
            </dd>
          </div>
        );
      })}
    </dl>
  );
}
