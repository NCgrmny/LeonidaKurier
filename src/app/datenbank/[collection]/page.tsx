import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Container } from "@/components/ui/Container";
import { EntityCard } from "@/components/datenbank/EntityCard";
import { EmptyState } from "@/components/ui/EmptyState";
import { JsonLd } from "@/components/ui/JsonLd";
import { COLLECTIONS, collectionBySlug, entityHref } from "@/lib/content/collections";
import { entriesForCollection } from "@/lib/content/queries";
import { formatDate } from "@/lib/format";
import { breadcrumbJsonLd, pageMetadata } from "@/lib/seo";

export async function generateStaticParams() {
  return COLLECTIONS.map((collection) => ({ collection: collection.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ collection: string }>;
}): Promise<Metadata> {
  const { collection: slug } = await params;
  const collection = collectionBySlug.get(slug);
  if (!collection) return { title: "Sammlung nicht gefunden" };

  return pageMetadata({
    title: `${collection.label} – Datenbank`,
    description: `${collection.description} Alle Einträge mit Status, Quelle und Verknüpfungen im Leonida Kurier.`,
    path: `/datenbank/${collection.slug}`,
    keywords: [`GTA 6 ${collection.label}`, `GTA VI ${collection.label}`],
  });
}

export default async function CollectionPage({
  params,
}: {
  params: Promise<{ collection: string }>;
}) {
  const { collection: slug } = await params;
  const collection = collectionBySlug.get(slug);
  if (!collection) notFound();

  const entries = await entriesForCollection(collection.slug);

  return (
    <Container width="wide">
      <header className="border-b-2 border-ink-900 py-10 sm:py-12">
        <nav aria-label="Brotkrumen" className="meta mb-5">
          <Link href="/datenbank" className="hover:text-coral-600">
            Datenbank
          </Link>
          <span aria-hidden> / </span>
          <span className="text-coral-600">{collection.label}</span>
        </nav>
        <h1 className="headline text-[2.4rem] sm:text-[3.2rem]">{collection.label}</h1>
        <p className="standfirst mt-3 max-w-2xl text-[16px]">{collection.description}</p>
        <p className="meta mt-4">
          {entries.length} {entries.length === 1 ? "Eintrag" : "Einträge"}
        </p>
      </header>

      <section className="pb-20">
        {entries.length === 0 ? (
          <EmptyState
            title={`Keine belegten ${collection.label}`}
            description={collection.emptyHint}
          />
        ) : (
          <ul className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {entries.map((entity) => (
              <li key={entity.id}>
                <EntityCard
                  entity={entity}
                  href={entityHref(collection.type, entity.slug)}
                  meta={`Aktualisiert ${formatDate(entity.updatedAt)}`}
                />
              </li>
            ))}
          </ul>
        )}
      </section>

      <JsonLd
        data={breadcrumbJsonLd([
          { name: "Start", path: "/" },
          { name: "Datenbank", path: "/datenbank" },
          { name: collection.label, path: `/datenbank/${collection.slug}` },
        ])}
      />
    </Container>
  );
}
