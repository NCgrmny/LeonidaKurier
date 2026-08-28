import type { Source } from "@/lib/types";

const TIER_LABEL: Record<Source["tier"], string> = {
  offiziell: "Offiziell",
  medien: "Medien",
  community: "Community-Signal",
  eigene: "Eigene Recherche",
};

/** Quellenapparat. Fremdinhalte werden verlinkt, nicht gespiegelt. */
export function SourceList({ sources }: { sources: Source[] }) {
  if (sources.length === 0) return null;
  return (
    <ol className="grid gap-3">
      {sources.map((source) => (
        <li
          key={source.id}
          className="rounded-lg border border-[var(--rule)] bg-ink-900/50 px-4 py-3"
        >
          <div className="flex flex-wrap items-center gap-x-3 gap-y-1">
            <span className="font-mono text-[10px] uppercase tracking-[0.14em] text-lagoon-300">
              {TIER_LABEL[source.tier]}
            </span>
            <span className="text-sm text-paper-50">{source.title}</span>
          </div>
          <p className="mt-1 text-xs text-paper-500">
            {source.publisher}
            {source.publishedAt ? ` · ${source.publishedAt}` : ""}
          </p>
          {source.note ? (
            <p className="mt-1.5 text-xs text-paper-400">{source.note}</p>
          ) : null}
          {source.url ? (
            <a
              href={source.url}
              target="_blank"
              rel="noopener noreferrer nofollow"
              className="mt-2 inline-flex items-center gap-1 font-mono text-[11px] text-coral-300 hover:text-coral-400"
            >
              Quelle öffnen <span aria-hidden>↗</span>
            </a>
          ) : null}
        </li>
      ))}
    </ol>
  );
}
