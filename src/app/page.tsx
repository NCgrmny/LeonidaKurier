import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { ArticleCard, LeadArticle } from "@/components/kurier/ArticleCard";
import { Masthead } from "@/components/kurier/Masthead";
import { BaseMap } from "@/components/kompass/BaseMap";
import { RadarBoard } from "@/components/radar/RadarBoard";
import { Timeline } from "@/components/archiv/Timeline";
import { content } from "@/lib/content";
import { COLLECTIONS } from "@/lib/content/collections";
import { collectionCounts } from "@/lib/content/queries";
import { MAIN_NAV, SITE } from "@/lib/site";
import { pageMetadata } from "@/lib/seo";
import type { Metadata } from "next";

export const metadata: Metadata = pageMetadata({
  title: `${SITE.name} – ${SITE.tagline}`,
  description: SITE.description,
  path: "/",
  keywords: [
    "GTA 6",
    "GTA VI",
    "Leonida",
    "Vice City",
    "GTA 6 Karte",
    "GTA 6 News deutsch",
  ],
});

export default async function HomePage() {
  const [lead, latest, signals, timeline, counts] = await Promise.all([
    content.getLeadArticle(),
    content.listArticles({ limit: 4 }),
    content.listRadarSignals(),
    content.listTimeline(),
    collectionCounts(),
  ]);

  const secondary = latest.filter((article) => article.slug !== lead?.slug).slice(0, 3);
  const recentTimeline = [...timeline].reverse().slice(0, 4).reverse();

  return (
    <>
      {/* Zeitungskopf ------------------------------------------------------ */}
      <Container width="wide">
        <Masthead editionDate={lead?.publishedAt ?? new Date().toISOString()} />

        {/* Leitfragen-Leiste direkt unter dem Kopf, wie ein Ressortband. */}
        <nav aria-label="Bereiche" className="border-b border-[var(--rule)]">
          <ul className="grid grid-cols-2 gap-px bg-[var(--rule)] sm:grid-cols-3 lg:grid-cols-5">
            {MAIN_NAV.map((item) => (
              <li key={item.href} className="bg-ink-950">
                <Link
                  href={item.href}
                  className="group flex h-full flex-col gap-1 px-3 py-3.5 transition-colors hover:bg-ink-900"
                >
                  <span className="font-mono text-[11px] uppercase tracking-[0.16em] text-paper-50">
                    {item.label}
                  </span>
                  <span className="text-xs text-paper-500 group-hover:text-lagoon-300">
                    {item.question}
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <div className="flex flex-wrap items-center justify-between gap-4 py-5">
          <p className="standfirst max-w-xl text-sm sm:text-base">
            Meldungen, Karte, Datenbank und Archiv – mit sichtbarem Status hinter jeder
            Information.
          </p>
          <div className="flex flex-wrap gap-2.5">
            <Link
              href="/kompass"
              className="rounded-md bg-coral-500 px-4 py-2.5 font-mono text-[11px] uppercase tracking-[0.16em] text-ink-950 transition-colors hover:bg-coral-400"
            >
              Kompass öffnen
            </Link>
            <Link
              href="/kurier"
              className="rounded-md border border-[var(--rule)] px-4 py-2.5 font-mono text-[11px] uppercase tracking-[0.16em] text-paper-200 transition-colors hover:border-paper-400/40 hover:text-paper-50"
            >
              Zum Kurier
            </Link>
          </div>
        </div>
      </Container>

      {/* Heute in Leonida -------------------------------------------------- */}
      {lead ? (
        <Container width="wide">
          <section className="pb-16">
            <SectionHeading
              kicker="Heute in Leonida"
              title="Der Aufmacher"
              action={{ href: "/kurier", label: "Alle Meldungen" }}
            />
            <div className="mt-6">
              <LeadArticle article={lead} />
            </div>
          </section>
        </Container>
      ) : null}

      {/* Der Kurier -------------------------------------------------------- */}
      {secondary.length > 0 ? (
        <Container width="wide">
          <section className="pb-16">
            <SectionHeading
              kicker="Der Kurier"
              title="Neueste Meldungen"
              description="Recherche, Analyse und Einordnung – jede Meldung mit Quellen und Status."
              action={{ href: "/kurier", label: "Zum Kurier" }}
            />
            <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {secondary.map((article) => (
                <ArticleCard key={article.id} article={article} />
              ))}
            </div>
          </section>
        </Container>
      ) : null}

      {/* Radar -------------------------------------------------------------- */}
      <Container width="wide">
        <section className="pb-16">
          <SectionHeading
            kicker="Leonida Radar"
            title="Was wir beobachten"
            description="Jedes Signal trägt einen Verifizierungsgrad. Spekulation wird nie als Fakt dargestellt."
            action={{ href: "/radar", label: "Radar öffnen" }}
          />
          <div className="mt-6">
            <RadarBoard signals={signals} compact />
          </div>
        </section>
      </Container>

      {/* Kompass ------------------------------------------------------------ */}
      <Container width="wide">
        <section className="pb-16">
          <SectionHeading
            kicker="Leonida Kompass"
            title="Die interaktive Karte"
            description="Jeder Marker ist mit der Datenbank verbunden. Positionen sind derzeit Platzhalter – offizielle Geodaten liegen nicht vor."
            action={{ href: "/kompass", label: "Kompass öffnen" }}
          />
          <Link
            href="/kompass"
            className="group mt-6 block overflow-hidden rounded-2xl border border-[var(--rule)] bg-ink-950"
          >
            <div className="relative grid gap-8 p-6 sm:p-9 lg:grid-cols-[minmax(0,1fr)_minmax(0,1fr)] lg:items-center">
              {/* Echte Grundkarte als Vorschau, nicht als Dekoration. */}
              <div
                aria-hidden
                className="absolute inset-0 opacity-60 transition-opacity group-hover:opacity-80"
              >
                <BaseMap />
              </div>
              <div
                aria-hidden
                className="absolute inset-0 bg-gradient-to-r from-ink-950 via-ink-950/85 to-ink-950/35"
              />
              <div className="relative">
                <p className="kicker">leonidakompass.de</p>
                <h3 className="headline mt-3 text-2xl text-paper-50 sm:text-3xl">
                  Vom Marker direkt in die Datenbank
                </h3>
                <p className="standfirst mt-3 max-w-md text-sm">
                  Ebenen für Orte, Regionen, Geschäfte und Geheimnisse. Jeder Marker führt
                  zu Beschreibung, Quelle und verknüpften Beiträgen.
                </p>
                <span className="mt-6 inline-flex items-center gap-2 font-mono text-[11px] uppercase tracking-[0.16em] text-lagoon-300">
                  Karte öffnen <span aria-hidden>→</span>
                </span>
              </div>
              <ul className="relative grid grid-cols-2 gap-px overflow-hidden rounded-xl border border-[var(--rule)] bg-[var(--rule)]">
                {["Orte", "Regionen", "Geschäfte", "Geheimnisse"].map((layer) => (
                  <li
                    key={layer}
                    className="bg-ink-900/85 px-4 py-4 font-mono text-[11px] uppercase tracking-[0.14em] text-paper-400"
                  >
                    {layer}
                  </li>
                ))}
              </ul>
            </div>
          </Link>
        </section>
      </Container>

      {/* Archiv -------------------------------------------------------------- */}
      <Container width="wide">
        <section className="pb-16">
          <SectionHeading
            kicker="Aus Leonidas Archiv"
            title="Wie sich unser Wissen entwickelt hat"
            description="Vom ersten offiziellen Signal bis heute – nachvollziehbar, mit Datum und Quelle."
            action={{ href: "/archiv", label: "Archiv öffnen" }}
          />
          <div className="mt-8">
            <Timeline entries={recentTimeline} />
          </div>
        </section>
      </Container>

      {/* Datenbank ----------------------------------------------------------- */}
      <Container width="wide">
        <section className="pb-20">
          <SectionHeading
            kicker="Datenbank"
            title="Was wir wirklich wissen"
            description="Jede Sammlung wächst mit belegten Einträgen. Wo nichts belegt ist, steht das auch so da."
            action={{ href: "/datenbank", label: "Datenbank öffnen" }}
          />
          <ul className="mt-6 grid gap-px overflow-hidden rounded-xl border border-[var(--rule)] bg-[var(--rule)] sm:grid-cols-2 lg:grid-cols-4">
            {COLLECTIONS.map((collection) => (
              <li key={collection.slug} className="bg-ink-900/70">
                <Link
                  href={`/datenbank/${collection.slug}`}
                  className="flex h-full flex-col justify-between gap-6 p-5 transition-colors hover:bg-ink-850"
                >
                  <span className="font-mono text-[11px] uppercase tracking-[0.14em] text-paper-50">
                    {collection.label}
                  </span>
                  <span className="font-mono text-2xl text-lagoon-300">
                    {counts[collection.slug] ?? 0}
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        </section>
      </Container>
    </>
  );
}
