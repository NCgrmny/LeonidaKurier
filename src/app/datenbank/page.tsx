import type { Metadata } from "next";
import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { EntityCard } from "@/components/datenbank/EntityCard";
import { JsonLd } from "@/components/ui/JsonLd";
import { Scene } from "@/components/art/Scene";
import { content } from "@/lib/content";
import { COLLECTIONS, entityHref } from "@/lib/content/collections";
import { collectionCounts } from "@/lib/content/queries";
import { breadcrumbJsonLd, pageMetadata } from "@/lib/seo";

export const metadata: Metadata = pageMetadata({
  title: "Datenbank – Orte, Charaktere und Fahrzeuge aus GTA VI",
  description:
    "Die Leonida-Datenbank sammelt belegte Informationen zu Grand Theft Auto VI: Regionen, Orte, Charaktere, Fahrzeuge, Missionen, Geschäfte, Geheimnisse und geprüfte Theorien.",
  path: "/datenbank",
  keywords: [
    "GTA 6 Fahrzeuge",
    "GTA 6 Charaktere",
    "GTA 6 Missionen",
    "GTA 6 Orte",
    "GTA 6 Geheimnisse",
  ],
});

export default async function DatenbankPage() {
  const [counts, locations, characters] = await Promise.all([
    collectionCounts(),
    content.listLocations(),
    content.listCharacters(),
  ]);

  return (
    <>
      <div className="relative isolate overflow-hidden bg-night-950">
        <div className="absolute inset-0">
          <Scene variant="inselkette" />
        </div>
        <div
          aria-hidden
          className="absolute inset-0 bg-gradient-to-t from-night-950 via-night-950/60 to-night-950/12"
        />
        <Container width="wide">
          <div className="relative py-12 sm:py-16">
            <span className="rubric">Was wissen wir wirklich?</span>
            <h1 className="headline mt-4 text-[2.4rem] text-paper-50 sm:text-[3.4rem]">
              Die Datenbank
            </h1>
            <p className="mt-4 max-w-2xl font-serif text-[1.05rem] leading-relaxed text-paper-200">
              Jeder Eintrag trägt Status, Quelle und Datum – und ist mit Kurier und
              Kompass verknüpft. Leere Sammlungen bleiben leer, bis belegte Daten
              vorliegen.
            </p>
          </div>
        </Container>
      </div>

      <Container width="wide">
        <section className="py-12">
          <SectionHeading ressort="Sammlungen" />
          <ul className="mt-6 grid gap-px border border-ink-900/15 bg-ink-900/15 sm:grid-cols-2 lg:grid-cols-4">
            {COLLECTIONS.map((collection) => (
              <li key={collection.slug} className="bg-paper-100">
                <Link
                  href={`/datenbank/${collection.slug}`}
                  className="flex h-full flex-col p-5 transition-colors hover:bg-paper-200"
                >
                  <span className="font-mono text-[26px] font-bold leading-none text-lagoon-700">
                    {counts[collection.slug] ?? 0}
                  </span>
                  <span className="subhead mt-2 text-[19px]">{collection.label}</span>
                  <span className="standfirst mt-1.5 text-[13px]">
                    {collection.description}
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        </section>

        {locations.length > 0 ? (
          <section className="pb-12">
            <SectionHeading
              ressort="Orte"
              action={{ href: "/datenbank/orte", label: "Alle Orte" }}
            />
            <ul className="mt-6 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {locations.slice(0, 6).map((entity) => (
                <li key={entity.id}>
                  <EntityCard entity={entity} href={entityHref("location", entity.slug)} />
                </li>
              ))}
            </ul>
          </section>
        ) : null}

        {characters.length > 0 ? (
          <section className="pb-14">
            <SectionHeading
              ressort="Charaktere"
              action={{ href: "/datenbank/charaktere", label: "Alle Charaktere" }}
            />
            <ul className="mt-6 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
              {characters.map((entity) => (
                <li key={entity.id}>
                  <EntityCard entity={entity} href={entityHref("character", entity.slug)} />
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
        ])}
      />
    </>
  );
}
