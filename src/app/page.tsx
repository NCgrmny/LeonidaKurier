import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { ArticleCard, LeadArticle } from "@/components/kurier/ArticleCard";
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
      {/* Kopfbereich: Marke, Anspruch, Einstiege ---------------------------- */}
      <section className="relative overflow-hidden">
        <Container width="wide">
          <div className="grid gap-10 py-14 sm:py-20 lg:grid-cols-[minmax(0,1.15fr)_minmax(0,1fr)] lg:items-end lg:gap-16">
            <div>
              <p className="kicker">Unabhängige Plattform zur Welt von GTA VI</p>
              <h1 className="headline mt-4 text-[2.6rem] leading-[1.02] text-paper-50 sm:text-6xl lg:text-7xl">
                Leonida
                <span className="block text-coral-400">Kurier</span>
              </h1>
              <p className="standfirst mt-6 max-w-xl text-lg sm:text-xl">
                {SITE.tagline} Meldungen, Karte, Datenbank und Archiv – mit sichtbarem
                Status hinter jeder Information.
              </p>
              <div className="mt-8 flex flex-wrap gap-3">
                <Link
                  href="/kompass"
                  className="rounded-md bg-coral-500 px-5 py-3 font-mono text-[11px] uppercase tracking-[0.16em] text-ink-950 transition-colors hover:bg-coral-400"
                >
                  Kompass öffnen
                </Link>
                <Link
                  href="/kurier"
                  className="rounded-md border border-[var(--rule)] px-5 py-3 font-mono text-[11px] uppercase tracking-[0.16em] text-paper-200 transition-colors hover:border-paper-400/40 hover:text-paper-50"
                >
                  Zum Kurier
                </Link>
              </div>
            </div>

            {/* Informationsarchitektur als Leitfragen */}
            <ul className="grid gap-px overflow-hidden rounded-xl border border-[var(--rule)] bg-[var(--rule)] sm:grid-cols-2 lg:grid-cols-1">
              {MAIN_NAV.map((item) => (
                <li key={item.href} className="bg-ink-900/80">
                  <Link
                    href={item.href}
                    className="group flex items-baseline justify-between gap-4 px-4 py-3.5 transition-colors hover:bg-ink-850"
                  >
                    <span className="font-mono text-[11px] uppercase tracking-[0.16em] text-paper-50">
                      {item.label}
                    </span>
                    <span className="text-right text-xs text-paper-500 group-hover:text-lagoon-300">
                      {item.question}
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </Container>
      </section>

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
              <div
                aria-hidden
                className="absolute inset-0 opacity-70 transition-opacity group-hover:opacity-100"
                style={{
                  backgroundImage: [
                    "linear-gradient(to right, rgba(154,166,182,0.07) 1px, transparent 1px)",
                    "linear-gradient(to bottom, rgba(154,166,182,0.07) 1px, transparent 1px)",
                    "radial-gradient(60% 60% at 30% 70%, rgba(30,162,148,0.18), transparent 70%)",
                    "radial-gradient(45% 45% at 80% 20%, rgba(242,96,58,0.14), transparent 70%)",
                  ].join(","),
                  backgroundSize: "3rem 3rem, 3rem 3rem, 100% 100%, 100% 100%",
                }}
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
