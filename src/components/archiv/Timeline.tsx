import Link from "next/link";
import { entityHref } from "@/lib/content/collections";
import { formatByPrecision } from "@/lib/format";
import { statusDefinition } from "@/lib/status";
import type { TimelineEntry } from "@/lib/types";
import { StatusBadge } from "@/components/ui/StatusBadge";

/** Chronologie des Wissensstands – das Gedächtnis der Plattform. */
export function Timeline({ entries }: { entries: TimelineEntry[] }) {
  return (
    <ol className="relative grid">
      {entries.map((entry, index) => (
        <li
          key={entry.id}
          className="relative grid gap-3 pl-8 sm:grid-cols-[9rem_1fr] sm:gap-8 sm:pl-10"
        >
          {index < entries.length - 1 ? (
            <span
              aria-hidden
              className="absolute left-[7px] top-3 bottom-0 w-px bg-ink-900/20 sm:left-[9px]"
            />
          ) : null}
          <span
            aria-hidden
            className="absolute left-0 top-1.5 size-4 rounded-full ring-2 ring-paper-100"
            style={{ backgroundColor: statusDefinition(entry.status).accent }}
          />

          <p className="pt-0.5 font-mono text-[11px] font-bold uppercase tracking-[0.16em] text-coral-600">
            {formatByPrecision(entry.date, entry.datePrecision)}
          </p>

          <div className="pb-9">
            <div className="flex flex-wrap items-center gap-3">
              <h3 className="subhead text-[1.35rem]">{entry.title}</h3>
              <StatusBadge status={entry.status} />
            </div>
            <p className="standfirst mt-2 max-w-2xl text-[15px]">{entry.summary}</p>
            {entry.related && entry.related.length > 0 ? (
              <ul className="mt-3 flex flex-wrap gap-2">
                {entry.related.map((ref) => (
                  <li key={`${ref.type}-${ref.slug}`}>
                    <Link
                      href={entityHref(ref.type, ref.slug)}
                      className="inline-block border border-ink-900/20 px-2.5 py-1 font-mono text-[10px] uppercase tracking-[0.12em] text-ink-600 transition-colors hover:border-coral-500 hover:text-coral-600"
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
