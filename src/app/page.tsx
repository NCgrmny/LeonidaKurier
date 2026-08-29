import type { Metadata } from "next";
import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Masthead } from "@/components/kurier/Masthead";
import { BriefItem, HeroStory, StoryCard } from "@/components/kurier/ArticleCard";
import { SourceDesk } from "@/components/kurier/SourceDesk";
import { ReleaseCountdown } from "@/components/kurier/ReleaseCountdown";
import { RadarTicker } from "@/components/radar/RadarTicker";
import { Scene, motifForSlug } from "@/components/art/Scene";
import { BaseMap } from "@/components/kompass/BaseMap";
import { StatusBadge } from "@/components/ui/StatusBadge";
import { MAP_VIEWBOX } from "@/content/geography";
import { content } from "@/lib/content";
import { COLLECTIONS, entityHref } from "@/lib/content/collections";
import { collectionCounts } from "@/lib/content/queries";
import { formatByPrecision, formatDate } from "@/lib/format";
import { statusDefinition } from "@/lib/status";
import { MAIN_NAV, SITE } from "@/lib/site";
import { pageMetadata } from "@/lib/seo";

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
  const [lead, latest, signals, timeline, counts, locations, characters, allSources] =
    await Promise.all([
      content.getLeadArticle(),
      content.listArticles(),
      content.listRadarSignals(),
      content.listTimeline(),
      collectionCounts(),
      content.listLocations(),
      content.listCharacters(),
      content.listSources(),
    ]);

  const rest = latest.filter((article) => article.slug !== lead?.slug);
  const secondary = rest.slice(0, 2);
  const briefs = rest.slice(2, 5);
  const leadSource = lead ? (await content.getSources(lead.sourceIds))[0] : null;
  const recentTimeline = [...timeline].reverse().slice(0, 3);
  const discoveries = [...locations.slice(0, 3), ...characters.slice(0, 1)];

  // Quellenlage: juengste datierte Primaerquelle, Umfang des offiziellen
  // Registers und die ausgewiesene Herkunft der Kartenrekonstruktion.
  const officialSources = allSources.filter((source) => source.tier === "offiziell");
  const newestPrimary = officialSources
    .filter((source) => source.publishedAt)
    // Bei gleichem Datum bleibt die Reihenfolge des Quellenregisters erhalten,
    // damit die Newswire-Meldung vor der Videoseite steht.
    .sort((a, b) => b.publishedAt!.localeCompare(a.publishedAt!))[0];
  const mapSource = allSources.find((source) => source.id === "src-state-of-leonida");
  const checkedAt = [lead?.updatedAt, ...latest.map((a) => a.updatedAt)]
    .filter(Boolean)
    .sort()
    .at(-1)!;

  return (
    <>
      {/* ================= Zeitungskopf ================= */}
      <Container width="wide">
        <Masthead editionDate={lead?.publishedAt ?? new Date().toISOString()} />
      </Container>

      {/* ================= Countdown ================= */}
      <Container width="wide">
        <div className="mt-4">
          <ReleaseCountdown />
        </div>
      </Container>

      {/* ================= Radar-Laufstreifen ================= */}
      <div className="mt-0">
        <Container width="wide">
          <RadarTicker signals={signals} />
        </Container>
      </div>

      {/* ================= Aufmacher ================= */}
      {lead ? (
        <Container width="wide">
          <div className="mt-6">
            <HeroStory article={lead} sourceLabel={leadSource?.publisher} />
            <SourceDesk
              checkedAt={checkedAt}
              primary={newestPrimary}
              officialCount={officialSources.length}
              mapSource={mapSource}
            />
          </div>
        </Container>
      ) : null}

      {/* ================= Editorial Grid ================= */}
      <Container width="wide">
        <section className="mt-10 grid gap-8 lg:grid-cols-[minmax(0,1fr)_17rem] lg:gap-10">
          <div>
            <SectionHeading ressort="Der Kurier" action={{ href: "/kurier", label: "Alle Berichte" }} />
            <div className="mt-6 grid gap-x-7 gap-y-8 sm:grid-cols-2">
              {secondary.map((article) => (
                <StoryCard key={article.id} article={article} />
              ))}
            </div>
          </div>

          {/* Meldungsspalte */}
          <aside className="lg:border-l lg:border-ink-900/15 lg:pl-8">
            <p className="ressort">Kurz gemeldet</p>
            <div className="mt-5 grid gap-3.5">
              {briefs.map((article) => (
                <BriefItem key={article.id} article={article} />
              ))}
              {signals.slice(0, 3).map((signal) => (
                <div key={signal.id} className="border-b border-ink-900/12 pb-3.5 last:border-0">
                  <StatusBadge status={signal.status} />
                  <p className="subhead mt-1 text-[17px] leading-tight">{signal.title}</p>
                  <p className="mt-1 line-clamp-2 font-serif text-[13px] leading-snug text-ink-500">
                    {signal.summary}
                  </p>
                </div>
              ))}
            </div>
          </aside>
        </section>
      </Container>

      {/* ================= Radar ================= */}
      <div className="night mt-16 py-14">
        <Container width="wide">
          <SectionHeading
            ressort="Leonida Radar"
            title="Was wir beobachten"
            description="Jedes Signal trägt einen Verifizierungsgrad. Spekulation wird nie als Fakt dargestellt."
            action={{ href: "/radar", label: "Radar öffnen" }}
          />
          <ul className="mt-8 grid gap-px bg-night-700 sm:grid-cols-2 lg:grid-cols-3">
            {signals.slice(0, 6).map((signal) => (
              <li key={signal.id} className="bg-night-900 p-5">
                <span
                  aria-hidden
                  className="mb-3 block h-1 w-10"
                  style={{ backgroundColor: statusDefinition(signal.status).accent }}
                />
                <StatusBadge status={signal.status} tone="night" />
                <p className="subhead mt-2 text-[19px] text-paper-50">{signal.title}</p>
                <p className="mt-2 font-serif text-[14px] leading-snug text-paper-300">
                  {signal.summary}
                </p>
                <p className="meta mt-3">
                  {signal.channel} · {formatDate(signal.observedAt)}
                </p>
              </li>
            ))}
            {/* Fuellt die letzte Zelle, damit das Raster geschlossen bleibt. */}
            <li className="bg-night-800">
              <Link
                href="/radar"
                className="flex h-full flex-col justify-between gap-6 p-5 transition-colors hover:bg-night-700"
              >
                <span className="font-mono text-[10px] font-bold uppercase tracking-[0.18em] text-lagoon-300">
                  Vollständiges Radar
                </span>
                <span className="subhead text-[21px] text-paper-50">
                  Alle Signale mit Statuslogik und Quellenverzeichnis
                  <span aria-hidden className="ml-2 text-coral-400">
                    →
                  </span>
                </span>
              </Link>
            </li>
          </ul>
        </Container>
      </div>

      {/* ================= Kompass ================= */}
      <Container width="wide">
        <section className="mt-16">
          <SectionHeading
            ressort="Leonida Kompass"
            action={{ href: "/kompass", label: "Karte öffnen" }}
          />
          <Link
            href="/kompass"
            className="group mt-6 grid overflow-hidden border border-ink-900/15 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.15fr)]"
          >
            <div className="flex flex-col justify-center bg-paper-200 p-6 sm:p-9">
              <p className="meta text-lagoon-700">leonidakompass.de</p>
              <h2 className="headline mt-3 text-[1.9rem] sm:text-[2.5rem]">
                Vom Marker direkt in die Datenbank
              </h2>
              <p className="standfirst mt-3 max-w-md text-[15px]">
                Redaktionelle Rekonstruktion der Küstenregion: Ebenen für Orte, Regionen,
                Geschäfte und Geheimnisse. Jeder Marker führt zu Beschreibung, Quelle und
                verknüpften Berichten.
              </p>
              <ul className="mt-5 flex flex-wrap gap-x-4 gap-y-2">
                {["Orte", "Regionen", "Geschäfte", "Geheimnisse", "Community"].map((layer) => (
                  <li key={layer} className="meta">
                    {layer}
                  </li>
                ))}
              </ul>
              <span className="mt-6 inline-flex w-fit items-center gap-2 bg-night-900 px-4 py-2.5 font-mono text-[10px] font-bold uppercase tracking-[0.18em] text-paper-100 transition-colors group-hover:bg-lagoon-700">
                Kompass öffnen <span aria-hidden>→</span>
              </span>
            </div>
            <div
              className="relative overflow-hidden"
              style={{ aspectRatio: `${MAP_VIEWBOX.width} / ${MAP_VIEWBOX.height}` }}
            >
              <BaseMap />
            </div>
          </Link>
        </section>
      </Container>

      {/* ================= Archiv ================= */}
      <Container width="wide">
        <section className="mt-16">
          <SectionHeading
            ressort="Aus dem Archiv"
            action={{ href: "/archiv", label: "Archiv öffnen" }}
          />
          <ul className="mt-6 grid gap-px bg-ink-900/15 sm:grid-cols-3">
            {recentTimeline.map((entry) => (
              <li key={entry.id} className="bg-paper-100 p-5">
                <p className="font-mono text-[11px] font-bold uppercase tracking-[0.18em] text-coral-600">
                  {formatByPrecision(entry.date, entry.datePrecision)}
                </p>
                <p className="subhead mt-2 text-[19px]">{entry.title}</p>
                <p className="standfirst mt-2 line-clamp-3 text-[14px]">{entry.summary}</p>
              </li>
            ))}
          </ul>
        </section>
      </Container>

      {/* ================= Datenbank ================= */}
      <Container width="wide">
        <section className="mt-16">
          <SectionHeading
            ressort="Datenbank"
            title="Entdeckungen aus Leonida"
            description="Belegte Einträge mit Status, Quelle und Verknüpfung in Karte und Kurier."
            action={{ href: "/datenbank", label: "Datenbank öffnen" }}
          />

          <ul className="mt-6 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {discoveries.map((entity) => {
              const type = "role" in entity ? "character" : "location";
              return (
                <li key={entity.id} className="group relative">
                  <div className="relative aspect-[4/3] overflow-hidden bg-night-900">
                    <Scene variant={entity.motif ?? motifForSlug(entity.slug)} />
                  </div>
                  <div className="mt-3">
                    <StatusBadge status={entity.status} />
                    <h3 className="subhead mt-1 text-[19px]">
                      <Link
                        href={entityHref(type, entity.slug)}
                        className="after:absolute after:inset-0 hover:text-coral-600"
                      >
                        {entity.title}
                      </Link>
                    </h3>
                    <p className="standfirst mt-1 line-clamp-2 text-[13px]">{entity.summary}</p>
                  </div>
                </li>
              );
            })}
          </ul>

          <ul className="mt-8 grid gap-px border border-ink-900/15 bg-ink-900/15 sm:grid-cols-4 lg:grid-cols-8">
            {COLLECTIONS.map((collection) => (
              <li key={collection.slug} className="bg-paper-100">
                <Link
                  href={`/datenbank/${collection.slug}`}
                  className="flex h-full flex-col gap-1 px-3 py-4 transition-colors hover:bg-paper-200"
                >
                  <span className="font-mono text-[22px] font-bold leading-none text-lagoon-700">
                    {counts[collection.slug] ?? 0}
                  </span>
                  <span className="meta">{collection.label}</span>
                </Link>
              </li>
            ))}
          </ul>
        </section>
      </Container>

      {/* ================= Leitfragen ================= */}
      <Container width="wide">
        <section className="mt-16">
          <ul className="grid gap-px border-y-2 border-ink-900 bg-ink-900/15 sm:grid-cols-3 lg:grid-cols-5">
            {MAIN_NAV.map((item) => (
              <li key={item.href} className="bg-paper-100">
                <Link
                  href={item.href}
                  className="flex h-full flex-col gap-1 px-4 py-5 transition-colors hover:bg-paper-200"
                >
                  <span className="font-mono text-[11px] font-bold uppercase tracking-[0.2em] text-coral-600">
                    {item.label}
                  </span>
                  <span className="font-serif text-[15px] italic text-ink-700">
                    {item.question}
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
