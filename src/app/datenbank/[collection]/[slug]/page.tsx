import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Container } from "@/components/ui/Container";
import { DemoBadge, StatusBadge } from "@/components/ui/StatusBadge";
import { SourceList } from "@/components/ui/SourceList";
import { RelatedRefs } from "@/components/ui/RelatedRefs";
import { JsonLd } from "@/components/ui/JsonLd";
import { content } from "@/lib/content";
import { COLLECTIONS, collectionBySlug } from "@/lib/content/collections";
import { entriesForCollection, resolveRefs } from "@/lib/content/queries";
import { formatDate } from "@/lib/format";
import { statusDefinition } from "@/lib/status";
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
  return entity ? { collection, entity } : null;
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

  const { collection, entity } = found;
  const [sources, related] = await Promise.all([
    content.getSources(entity.sourceIds),
    resolveRefs(entity.related),
  ]);
  const status = statusDefinition(entity.status);

  return (
    <Container width="wide">
      <article className="py-12 sm:py-16">
        <nav aria-label="Brotkrumen" className="kicker mb-8">
          <Link href="/datenbank" className="hover:text-paper-200">
            Datenbank
          </Link>
          <span aria-hidden> / </span>
          <Link href={`/datenbank/${collection.slug}`} className="hover:text-paper-200">
            {collection.label}
          </Link>
        </nav>

        <div className="grid gap-12 lg:grid-cols-[minmax(0,1fr)_18rem] lg:gap-16">
          <div className="min-w-0">
            <header className="max-w-3xl">
              <div className="flex flex-wrap items-center gap-2">
                <StatusBadge status={entity.status} />
                {entity.demo ? <DemoBadge /> : null}
              </div>
              <h1 className="headline mt-4 text-4xl text-paper-50 sm:text-5xl">
                {entity.title}
              </h1>
              <p className="standfirst mt-5 text-lg">{entity.summary}</p>
              <p className="mt-6 border-t border-[var(--rule)] pt-4 font-mono text-[11px] uppercase tracking-[0.14em] text-paper-500">
                {collection.singular} · Aktualisiert {formatDate(entity.updatedAt)}
              </p>
            </header>

            {isTheory(entity) ? (
              <section className="mt-10 max-w-3xl">
                <div className="rounded-xl border border-[var(--rule)] bg-ink-900/50 p-6">
                  <h2 className="kicker mb-3">Behauptung</h2>
                  <p className="headline text-xl text-paper-50">„{entity.claim}“</p>
                </div>
                {entity.arguments ? (
                  <div className="mt-4 grid gap-4 sm:grid-cols-2">
                    <div className="rounded-xl border border-[var(--rule)] bg-ink-900/50 p-6">
                      <h3 className="kicker mb-3">Dafür spricht</h3>
                      <ul className="grid gap-2.5">
                        {entity.arguments.pro.map((item) => (
                          <li key={item} className="text-sm leading-relaxed text-paper-200">
                            {item}
                          </li>
                        ))}
                      </ul>
                    </div>
                    <div className="rounded-xl border border-[var(--rule)] bg-ink-900/50 p-6">
                      <h3 className="kicker mb-3">Dagegen spricht</h3>
                      <ul className="grid gap-2.5">
                        {entity.arguments.contra.map((item) => (
                          <li key={item} className="text-sm leading-relaxed text-paper-200">
                            {item}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                ) : null}
              </section>
            ) : null}

            {hasMarker(entity) && entity.marker ? (
              <section className="mt-10 max-w-3xl rounded-xl border border-[var(--rule)] bg-ink-900/50 p-6">
                <h2 className="kicker mb-3">Auf der Karte</h2>
                <p className="text-sm leading-relaxed text-paper-400">
                  Dieser Eintrag ist im Leonida Kompass verzeichnet. Genauigkeit der
                  Position:{" "}
                  <span className="font-mono text-xs text-paper-200">
                    {entity.marker.precision}
                  </span>
                  . Solange keine offiziellen Geodaten vorliegen, dient die Position
                  ausschließlich der Orientierung innerhalb der Kartenarchitektur.
                </p>
                <Link
                  href={`/kompass?marker=${entity.slug}`}
                  className="mt-4 inline-flex items-center gap-2 rounded-md border border-lagoon-400/35 bg-lagoon-500/10 px-3.5 py-2 font-mono text-[11px] uppercase tracking-[0.14em] text-lagoon-300 hover:bg-lagoon-500/20"
                >
                  Im Kompass anzeigen →
                </Link>
              </section>
            ) : null}

            {related.length > 0 ? (
              <section className="mt-10 max-w-3xl">
                <h2 className="kicker mb-3">Verwandte Inhalte</h2>
                <RelatedRefs refs={related} />
              </section>
            ) : null}
          </div>

          <aside className="lg:sticky lg:top-24 lg:self-start">
            <section className="rounded-xl border border-[var(--rule)] bg-ink-900/50 p-5">
              <h2 className="kicker mb-3">Status</h2>
              <StatusBadge status={entity.status} />
              <p className="mt-3 text-xs leading-relaxed text-paper-400">
                {status.definition}
              </p>
            </section>
            <section className="mt-4">
              <h2 className="kicker mb-3">Quellen</h2>
              <SourceList sources={sources} />
            </section>
          </aside>
        </div>
      </article>

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
    </Container>
  );
}
