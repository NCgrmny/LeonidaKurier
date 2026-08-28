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
    <ol className="grid divide-y divide-ink-900/10 border-y border-ink-900/15">
      {sources.map((source) => (
        <li key={source.id} className="py-3">
          <p className="font-mono text-[9px] font-bold uppercase tracking-[0.18em] text-lagoon-700">
            {TIER_LABEL[source.tier]}
          </p>
          <p className="mt-1 font-serif text-[15px] leading-snug text-ink-900">
            {source.title}
          </p>
          <p className="mt-0.5 text-xs text-ink-500">
            {source.publisher}
            {source.publishedAt ? ` · ${source.publishedAt}` : ""}
          </p>
          {source.note ? (
            <p className="mt-1 font-serif text-xs italic leading-snug text-ink-500">
              {source.note}
            </p>
          ) : null}
          {source.url ? (
            <a
              href={source.url}
              target="_blank"
              rel="noopener noreferrer nofollow"
              className="mt-1.5 inline-block font-mono text-[10px] font-bold uppercase tracking-[0.14em] text-coral-600 hover:underline"
            >
              Quelle öffnen ↗
            </a>
          ) : null}
        </li>
      ))}
    </ol>
  );
}
