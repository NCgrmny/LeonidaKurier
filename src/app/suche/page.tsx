import type { Metadata } from "next";
import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { StatusBadge } from "@/components/ui/StatusBadge";
import { EmptyState } from "@/components/ui/EmptyState";
import { suche } from "@/lib/content/search";
import { collectionCounts } from "@/lib/content/queries";
import { content } from "@/lib/content";
import { pageMetadata } from "@/lib/seo";

export const metadata: Metadata = pageMetadata({
  title: "Suche",
  description:
    "Durchsuche Meldungen, Datenbank und Radar des Leonida Kurier – jeder Treffer mit seinem Belegstatus.",
  path: "/suche",
  keywords: ["GTA 6 Suche", "GTA 6 Datenbank durchsuchen"],
});

export default async function SuchePage({
  searchParams,
}: {
  searchParams: Promise<{ q?: string }>;
}) {
  const { q } = await searchParams;
  const query = (q ?? "").trim();
  const [treffer, counts, artikel] = await Promise.all([
    query ? suche(query) : Promise.resolve([]),
    collectionCounts(),
    content.listArticles(),
  ]);

  const bestand =
    Object.values(counts).reduce((summe, n) => summe + n, 0) + artikel.length;

  return (
    <Container width="narrow">
      <div className="py-12 sm:py-16">
        <span className="rubric">Suche</span>
        <h1 className="headline mt-4 text-[2.4rem] sm:text-[3.2rem]">
          Im Bestand suchen
        </h1>
        <p className="standfirst mt-4">
          Meldungen, Datenbank und Radar auf einmal. Jeder Treffer trägt den
          Status, mit dem der Kurier ihn führt.
        </p>

        {/* Ohne JavaScript nutzbar: ein gewöhnliches GET-Formular. */}
        <form action="/suche" method="get" className="mt-8 flex gap-2">
          <input
            type="search"
            name="q"
            defaultValue={query}
            autoFocus
            placeholder="Vice City, Lucia, Airboat, Extended Look …"
            aria-label="Suchbegriff"
            className="min-w-0 flex-1 border-2 border-ink-900 bg-paper-50 px-3 py-2.5 font-serif text-[16px] text-ink-900 outline-none placeholder:text-ink-500 focus:border-coral-600"
          />
          <button
            type="submit"
            className="shrink-0 bg-ink-900 px-5 py-2.5 font-mono text-[11px] font-bold uppercase tracking-[0.18em] text-paper-50 transition-colors hover:bg-coral-600"
          >
            Suchen
          </button>
        </form>

        {query ? (
          <p className="meta mt-4">
            {treffer.length === 0
              ? `Keine Treffer für „${query}“`
              : `${treffer.length} ${treffer.length === 1 ? "Treffer" : "Treffer"} für „${query}“`}
          </p>
        ) : (
          <p className="meta mt-4">{bestand} Einträge durchsuchbar</p>
        )}

        {query && treffer.length === 0 ? (
          <div className="mt-8">
            <EmptyState
              title="Dazu ist nichts erfasst"
              description="Der Kurier nimmt nur auf, was belegt ist. Findet sich hier nichts, liegt entweder noch keine belastbare Quelle vor – oder der Begriff wird anders geschrieben."
            />
          </div>
        ) : null}

        {treffer.length > 0 ? (
          <ul className="mt-8 border-t border-ink-900/15">
            {treffer.map((hit) => (
              <li key={`${hit.type}-${hit.href}-${hit.title}`}>
                <Link
                  href={hit.href}
                  className="group block border-b border-ink-900/15 py-4 transition-colors hover:bg-paper-50"
                >
                  <div className="flex flex-wrap items-center gap-x-3 gap-y-1">
                    <span className="rubric">{hit.bereich}</span>
                    <StatusBadge status={hit.status} />
                  </div>
                  <p className="subhead mt-1.5 text-[19px] leading-tight group-hover:text-coral-600">
                    {hit.title}
                  </p>
                  <p className="mt-1 line-clamp-2 font-serif text-[14px] leading-snug text-ink-600">
                    {hit.summary}
                  </p>
                </Link>
              </li>
            ))}
          </ul>
        ) : null}

        {!query ? (
          <div className="mt-10">
            <p className="ressort">Häufig gesucht</p>
            <ul className="mt-4 flex flex-wrap gap-2">
              {[
                "Vice City",
                "Lucia",
                "Jason",
                "Leonida Keys",
                "Airboat",
                "Extended Look",
                "Release",
                "Grassrivers",
              ].map((begriff) => (
                <li key={begriff}>
                  {/* Ohne Prefetch: Jeder Vorschlag ist eine dynamische Seite,
                      acht davon vorab zu laden kostet acht Serveranfragen fuer
                      Treffer, die niemand angeklickt hat. */}
                  <Link
                    href={`/suche?q=${encodeURIComponent(begriff)}`}
                    prefetch={false}
                    className="inline-block border border-ink-900/25 px-3 py-1.5 font-mono text-[11px] font-bold uppercase tracking-[0.14em] text-ink-800 transition-colors hover:border-coral-500 hover:text-coral-600"
                  >
                    {begriff}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        ) : null}
      </div>
    </Container>
  );
}
