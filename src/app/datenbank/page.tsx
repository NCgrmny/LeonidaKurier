import type { Metadata } from "next";
import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { JsonLd } from "@/components/ui/JsonLd";
import { COLLECTIONS } from "@/lib/content/collections";
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
  const counts = await collectionCounts();

  return (
    <Container width="wide">
      <header className="py-12 sm:py-16">
        <p className="kicker">Was wissen wir wirklich?</p>
        <h1 className="headline mt-3 text-4xl text-paper-50 sm:text-5xl">Datenbank</h1>
        <p className="standfirst mt-4 max-w-2xl text-base sm:text-lg">
          Die Wissensbasis der Plattform. Jeder Eintrag trägt Status, Quelle und Datum –
          und ist mit Kurier und Kompass verknüpft. Leere Sammlungen bleiben leer, bis
          belegte Daten vorliegen.
        </p>
      </header>

      <section className="pb-16">
        <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {COLLECTIONS.map((collection) => {
            const count = counts[collection.slug] ?? 0;
            return (
              <li key={collection.slug}>
                <Link
                  href={`/datenbank/${collection.slug}`}
                  className="group flex h-full flex-col rounded-xl border border-[var(--rule)] bg-ink-900/50 p-5 transition-colors hover:border-lagoon-400/35 hover:bg-ink-850"
                >
                  <div className="flex items-start justify-between gap-4">
                    <h2 className="headline text-xl text-paper-50 group-hover:text-lagoon-300">
                      {collection.label}
                    </h2>
                    <span className="font-mono text-sm text-paper-500">{count}</span>
                  </div>
                  <p className="mt-2 text-sm leading-relaxed text-paper-400">
                    {collection.description}
                  </p>
                </Link>
              </li>
            );
          })}
        </ul>
      </section>

      <section className="pb-20">
        <SectionHeading
          kicker="Datenmodell"
          title="Auf Wachstum ausgelegt"
          description="Inhalte stehen nicht in Komponenten, sondern in einer eigenen Datenschicht. Jeder Eintrag kann Beziehungen zu anderen Entitäten führen."
        />
        <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {[
            {
              title: "Einheitliches Schema",
              text: "Titel, Beschreibung, Kategorie, Status, Quelle, Datum, Region, Position und Verweise.",
            },
            {
              title: "Eigene Seiten",
              text: "Jede Entität bekommt eine indexierbare Detailseite unterhalb ihrer Sammlung.",
            },
            {
              title: "Verknüpfungen",
              text: "Beitrag ↔ Ort ↔ Kartenmarker ↔ Region – auswertbar in beide Richtungen.",
            },
            {
              title: "Austauschbare Quelle",
              text: "Die Datenschicht liegt hinter einem Repository-Interface; PostgreSQL ersetzt sie ohne Änderung an den Seiten.",
            },
          ].map((item) => (
            <div
              key={item.title}
              className="rounded-xl border border-[var(--rule)] bg-ink-900/50 p-5"
            >
              <h3 className="font-mono text-[11px] uppercase tracking-[0.14em] text-coral-300">
                {item.title}
              </h3>
              <p className="mt-2.5 text-sm leading-relaxed text-paper-400">{item.text}</p>
            </div>
          ))}
        </div>
      </section>

      <JsonLd
        data={breadcrumbJsonLd([
          { name: "Start", path: "/" },
          { name: "Datenbank", path: "/datenbank" },
        ])}
      />
    </Container>
  );
}
