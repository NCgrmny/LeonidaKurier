import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Container } from "@/components/ui/Container";
import { Scene, motifForSlug } from "@/components/art/Scene";
import { Standortkarte } from "@/components/kompass/Standortkarte";
import { istVerortet } from "@/lib/kartenpunkte";
import { Pressefoto } from "@/components/ui/Pressefoto";
import { fotoFuer } from "@/lib/content/bildzuordnung";
import { DemoBadge, StatusBadge } from "@/components/ui/StatusBadge";
import { SourceList } from "@/components/ui/SourceList";
import { RelatedRefs } from "@/components/ui/RelatedRefs";
import { EntityCard } from "@/components/datenbank/EntityCard";
import { JsonLd } from "@/components/ui/JsonLd";
import { content } from "@/lib/content";
import { COLLECTIONS, collectionBySlug, entityHref } from "@/lib/content/collections";
import { entriesForCollection, resolveRefs } from "@/lib/content/queries";
import { formatDate } from "@/lib/format";
import { statusDefinition } from "@/lib/status";
import { precisionDefinition } from "@/lib/precision";
import { breadcrumbJsonLd, pageMetadata } from "@/lib/seo";
import type { BaseEntity, GameLocation, Theory } from "@/lib/types";

export async function generateStaticParams() {
  const params = await Promise.all(
    COLLECTIONS.map(async (collection) => {
      const entries = await entriesForCollection(collection.slug);
      return entries.map((entry) => ({
        collection: collection.slug,
        slug: entry.slug,
      }));
    }),
  );
  return params.flat();
}

async function loadEntity(collectionSlug: string, slug: string) {
  const collection = collectionBySlug.get(collectionSlug);
  if (!collection) return null;
  const entries = await entriesForCollection(collection.slug);
  const entity = entries.find((entry) => entry.slug === slug);
  return entity ? { collection, entity, siblings: entries } : null;
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ collection: string; slug: string }>;
}): Promise<Metadata> {
  const { collection, slug } = await params;
  const found = await loadEntity(collection, slug);
  if (!found) return { title: "Eintrag nicht gefunden" };

  return pageMetadata({
    title: `${found.entity.title} – ${found.collection.singular}`,
    description: found.entity.summary,
    path: `/datenbank/${found.collection.slug}/${found.entity.slug}`,
    keywords: [`GTA 6 ${found.entity.title}`, `GTA VI ${found.entity.title}`],
  });
}

function hasMarker(entity: BaseEntity): entity is GameLocation {
  return "marker" in entity && Boolean((entity as GameLocation).marker);
}

function isTheory(entity: BaseEntity): entity is Theory {
  return "claim" in entity;
}

export default async function EntityPage({
  params,
}: {
  params: Promise<{ collection: string; slug: string }>;
}) {
  const { collection: collectionSlug, slug } = await params;
  const found = await loadEntity(collectionSlug, slug);
  if (!found) notFound();

  const { collection, entity, siblings } = found;
  const [sources, related] = await Promise.all([
    content.getSources(entity.sourceIds),
    resolveRefs(entity.related),
  ]);
  const status = statusDefinition(entity.status);
  const foto = fotoFuer(entity.slug);
  const more = siblings.filter((item) => item.slug !== entity.slug).slice(0, 3);

  return (
    <>
      {/* Aktenkopf.
          Verortete Eintraege bekommen ihre Karte in eine eigene Spalte statt
          als abgedunkelten Hintergrund: Eine Standortkarte, die man nicht
          lesen kann, zeigt nichts. Alles Uebrige behaelt das dunkle Band. */}
      {istVerortet(entity) ? (
        <div className="border-b-2 border-ink-900 bg-paper-50">
          <Container width="wide">
            <div className="grid gap-0 lg:grid-cols-[minmax(0,1fr)_minmax(0,1fr)]">
              <div className="py-8 pr-0 sm:py-10 lg:py-12 lg:pr-10">
                <nav aria-label="Brotkrumen" className="meta mb-5">
                  <Link href="/datenbank" className="hover:text-coral-600">
                    Datenbank
                  </Link>
                  <span aria-hidden> / </span>
                  <Link
                    href={`/datenbank/${collection.slug}`}
                    className="hover:text-coral-600"
                  >
                    {collection.label}
                  </Link>
                </nav>

                <div className="flex flex-wrap items-center gap-3">
                  <span className="rubric">{collection.singular}</span>
                  <StatusBadge status={entity.status} />
                  {entity.demo ? <DemoBadge /> : null}
                </div>

                <h1 className="headline mt-5 text-[2.3rem] sm:text-[3.2rem]">
                  {entity.title}
                </h1>
                <p className="standfirst mt-4 max-w-2xl text-[1.05rem]">
                  {entity.summary}
                </p>
                <p className="mt-6 border-t-2 border-ink-900 pt-3 font-mono text-[10px] uppercase tracking-[0.16em] text-ink-600">
                  Aktualisiert {formatDate(entity.updatedAt)}
                </p>
              </div>

              {/* Liegt ein Foto vor, traegt es den Kopf – die Karte rueckt
                  darunter als schmaler Streifen. Ein Foto zeigt den Ort, die
                  Karte sagt, wo er liegt; beides zusammen ist mehr als eines
                  davon allein. */}
              <figure className="m-0 flex flex-col border-ink-900 lg:border-l-2">
                {foto ? (
                  <>
                    <div className="relative min-h-[16rem] flex-1 lg:min-h-[17rem]">
                      <Pressefoto bild={foto} prioritaet />
                    </div>
                    <div className="relative h-28 border-t-2 border-ink-900 sm:h-32">
                      <Standortkarte
                        punkte={[{ name: entity.title, position: entity.marker }]}
                        zoom={0.62}
                        kompakt
                      />
                    </div>
                  </>
                ) : (
                  <div className="relative min-h-[16rem] flex-1 lg:min-h-[22rem]">
                    <Standortkarte
                      punkte={[{ name: entity.title, position: entity.marker }]}
                    />
                  </div>
                )}
              </figure>
            </div>
          </Container>
        </div>
      ) : (
      <div className="relative isolate overflow-hidden bg-night-950">
        <div className="absolute inset-0">
          <Scene variant={entity.motif ?? motifForSlug(entity.slug)} />
        </div>
        <div
          aria-hidden
          className="absolute inset-0 bg-gradient-to-t from-night-950 via-night-950/60 to-night-950/12"
        />
        <Container width="wide">
          <div className="relative flex min-h-[20rem] flex-col justify-end py-10 sm:min-h-[24rem] sm:py-14">
            <nav aria-label="Brotkrumen" className="meta mb-5 text-paper-300">
              <Link href="/datenbank" className="hover:text-coral-400">
                Datenbank
              </Link>
              <span aria-hidden> / </span>
              <Link
                href={`/datenbank/${collection.slug}`}
                className="hover:text-coral-400"
              >
                {collection.label}
              </Link>
            </nav>

            <div className="flex flex-wrap items-center gap-3">
              <span className="rubric">{collection.singular}</span>
              <StatusBadge status={entity.status} tone="night" />
              {entity.demo ? <DemoBadge className="text-paper-300" /> : null}
            </div>

            <h1 className="headline mt-5 max-w-3xl text-[2.3rem] text-paper-50 sm:text-[3.4rem]">
              {entity.title}
            </h1>
            <p className="mt-4 max-w-2xl font-serif text-[1.05rem] leading-relaxed text-paper-200">
              {entity.summary}
            </p>
            <p className="mt-6 border-t border-paper-100/20 pt-4 font-mono text-[10px] uppercase tracking-[0.16em] text-paper-300">
              Aktualisiert {formatDate(entity.updatedAt)}
            </p>
          </div>
        </Container>
      </div>
      )}

      <Container width="wide">
        <div className="grid gap-10 py-10 lg:grid-cols-[minmax(0,1fr)_19rem] lg:gap-14 lg:py-14">
          <div className="min-w-0 max-w-3xl">
            {isTheory(entity) ? (
              <>
                <section className="border-y-2 border-ink-900 py-6">
                  <p className="ressort inline-block">Behauptung</p>
                  <p className="subhead mt-3 text-[1.5rem]">„{entity.claim}“</p>
                </section>
                {entity.arguments ? (
                  <div className="mt-6 grid gap-6 sm:grid-cols-2">
                    <section>
                      <p className="ressort inline-block">Dafür spricht</p>
                      <ul className="mt-3 grid gap-2.5">
                        {entity.arguments.pro.map((item) => (
                          <li
                            key={item}
                            className="font-serif text-[15px] leading-relaxed text-ink-800"
                          >
                            {item}
                          </li>
                        ))}
                      </ul>
                    </section>
                    <section>
                      <p className="ressort inline-block">Dagegen spricht</p>
                      <ul className="mt-3 grid gap-2.5">
                        {entity.arguments.contra.map((item) => (
                          <li
                            key={item}
                            className="font-serif text-[15px] leading-relaxed text-ink-800"
                          >
                            {item}
                          </li>
                        ))}
                      </ul>
                    </section>
                  </div>
                ) : null}
              </>
            ) : (
              <section className="border-y-2 border-ink-900 py-6">
                <p className="ressort inline-block">Eintrag</p>
                <p className="mt-3 font-serif text-[1.05rem] leading-relaxed text-ink-800">
                  {entity.summary}
                </p>
                <p className="mt-3 font-serif text-[14px] italic leading-relaxed text-ink-500">
                  Weitere Angaben werden ergänzt, sobald sie aus einer benennbaren Quelle
                  hervorgehen. Bis dahin bleibt dieser Eintrag bewusst knapp.
                </p>
              </section>
            )}

            {hasMarker(entity) && entity.marker ? (
              <section className="mt-8 border border-ink-900/15 bg-paper-200/60 p-5">
                <p className="ressort inline-block">Auf der Karte</p>
                {/* Kein roher Datenbankwert: 'grob' sagt dem Leser nichts,
                    die Definition der Stufe schon. */}
                <p className="mt-3 font-serif text-[15px] leading-relaxed text-ink-700">
                  Dieser Eintrag ist im Leonida Kompass verzeichnet. Genauigkeit der
                  Position:{" "}
                  <span className="font-mono text-[12px] font-bold uppercase tracking-[0.1em] text-ink-900">
                    {precisionDefinition(entity.marker.precision).label}
                  </span>
                  {" – "}
                  {precisionDefinition(entity.marker.precision).definition}
                </p>
                {entity.marker.note ? (
                  <p className="mt-2 border-l-2 border-lagoon-600 pl-3 font-serif text-[13px] italic text-ink-600">
                    {entity.marker.note}
                  </p>
                ) : null}
                <Link
                  href={`/kompass?marker=${entity.slug}`}
                  className="mt-4 inline-flex items-center gap-2 bg-night-900 px-4 py-2.5 font-mono text-[10px] font-bold uppercase tracking-[0.18em] text-paper-100 transition-colors hover:bg-lagoon-700"
                >
                  Im Kompass anzeigen →
                </Link>
              </section>
            ) : null}

            {related.length > 0 ? (
              <section className="mt-8">
                <p className="ressort mb-4 inline-block">Verwandte Inhalte</p>
                <RelatedRefs refs={related} />
              </section>
            ) : null}
          </div>

          <aside className="lg:sticky lg:top-20 lg:self-start">
            <div className="border-t-2 border-ink-900 pt-4">
              <p className="ressort inline-block">Status</p>
              <div className="mt-3">
                <StatusBadge status={entity.status} />
              </div>
              <p className="mt-2 font-serif text-[13px] leading-snug text-ink-600">
                {status.definition}
              </p>
            </div>

            <div className="mt-8">
              <p className="ressort mb-4">Quellen</p>
              <SourceList sources={sources} />
            </div>
          </aside>
        </div>

        {more.length > 0 ? (
          <section className="border-t-2 border-ink-900 py-10">
            <p className="ressort inline-block">Weitere {collection.label}</p>
            <ul className="mt-6 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {more.map((item) => (
                <li key={item.id}>
                  <EntityCard entity={item} href={entityHref(collection.type, item.slug)} />
                </li>
              ))}
            </ul>
          </section>
        ) : null}
      </Container>

      <JsonLd
        data={breadcrumbJsonLd([
          { name: "Start", path: "/" },
          { name: "Datenbank", path: "/datenbank" },
          { name: collection.label, path: `/datenbank/${collection.slug}` },
          {
            name: entity.title,
            path: `/datenbank/${collection.slug}/${entity.slug}`,
          },
        ])}
      />
    </>
  );
}
