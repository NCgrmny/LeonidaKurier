import Link from "next/link";
import { entityHref } from "@/lib/content/collections";
import { formatByPrecision } from "@/lib/format";
import { statusDefinition } from "@/lib/status";
import type { TimelineEntry } from "@/lib/types";
import { StatusBadge } from "@/components/ui/StatusBadge";

/** Chronologie des Wissensstands – das Gedächtnis der Plattform. */
export function Timeline({ entries }: { entries: TimelineEntry[] }) {
  return (
    <ol className="relative grid gap-0">
      {entries.map((entry, index) => (
        <li key={entry.id} className="relative grid gap-4 pl-8 sm:grid-cols-[8rem_1fr] sm:gap-8 sm:pl-10">
          <span
            aria-hidden
            className="absolute left-[7px] top-2 bottom-0 w-px bg-[var(--rule)] sm:left-[9px]"
            style={{ display: index === entries.length - 1 ? "none" : undefined }}
          />
          <span
            aria-hidden
            className="absolute left-0 top-1.5 size-[15px] rounded-full border-2 border-ink-950 sm:left-0.5"
            style={{ backgroundColor: statusDefinition(entry.status).accent }}
          />

          <p className="pt-0.5 font-mono text-[11px] uppercase tracking-[0.14em] text-paper-500">
            {formatByPrecision(entry.date, entry.datePrecision)}
          </p>

          <div className="pb-10">
            <div className="flex flex-wrap items-center gap-2">
              <h3 className="headline text-xl text-paper-50">{entry.title}</h3>
              <StatusBadge status={entry.status} size="sm" />
            </div>
            <p className="standfirst mt-2 max-w-2xl text-sm leading-relaxed">
              {entry.summary}
            </p>
            {entry.related && entry.related.length > 0 ? (
              <ul className="mt-3 flex flex-wrap gap-2">
                {entry.related.map((ref) => (
                  <li key={`${ref.type}-${ref.slug}`}>
                    <Link
                      href={entityHref(ref.type, ref.slug)}
                      className="inline-block rounded-full border border-[var(--rule)] px-2.5 py-1 font-mono text-[10px] uppercase tracking-[0.12em] text-paper-400 transition-colors hover:border-lagoon-400/40 hover:text-lagoon-300"
                    >
                      {ref.slug.replace(/-/g, " ")}
                    </Link>
                  </li>
                ))}
              </ul>
            ) : null}
          </div>
        </li>
      ))}
    </ol>
  );
}
