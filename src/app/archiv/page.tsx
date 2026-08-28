import type { Metadata } from "next";
import { Container } from "@/components/ui/Container";
import { Timeline } from "@/components/archiv/Timeline";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { JsonLd } from "@/components/ui/JsonLd";
import { content } from "@/lib/content";
import { breadcrumbJsonLd, pageMetadata } from "@/lib/seo";

export const metadata: Metadata = pageMetadata({
  title: "Archiv – die Chronologie von GTA VI",
  description:
    "Das Leonida-Archiv dokumentiert, wie sich der öffentlich belegbare Wissensstand zu Grand Theft Auto VI entwickelt hat: von der ersten Bestätigung über die Trailer bis heute.",
  path: "/archiv",
  keywords: ["GTA 6 Chronologie", "GTA VI Trailer Übersicht", "GTA 6 Entwicklung"],
});

export default async function ArchivPage() {
  const entries = await content.listTimeline();
  const reversed = [...entries].reverse();

  return (
    <Container width="wide">
      <header className="py-12 sm:py-16">
        <p className="kicker">Wie kam es dazu?</p>
        <h1 className="headline mt-3 text-4xl text-paper-50 sm:text-5xl">Archiv</h1>
        <p className="standfirst mt-4 max-w-2xl text-base sm:text-lg">
          Das Gedächtnis der Plattform. Hier steht nicht, was gerade diskutiert wird,
          sondern wann welche Information erstmals belegbar war – und ob sie Bestand hatte.
        </p>
      </header>

      <section className="pb-16">
        <Timeline entries={reversed} />
      </section>

      <section className="pb-20">
        <SectionHeading
          kicker="Grundsatz"
          title="Was ins Archiv aufgenommen wird"
          description="Das Archiv ist eine Chronologie belegter Ereignisse, keine Sammlung von Gerüchten."
        />
        <div className="mt-6 grid gap-4 sm:grid-cols-3">
          {[
            {
              title: "Belegte Ereignisse",
              text: "Aufgenommen wird, was aus einer benennbaren Quelle hervorgeht – mit Datum und Genauigkeitsangabe.",
            },
            {
              title: "Statusverlauf",
              text: "Ändert sich der Status einer Information, bleibt der frühere Stand nachvollziehbar.",
            },
            {
              title: "Kein Leak-Material",
              text: "Unrechtmäßig verbreitetes Material wird weder gehostet noch ausgewertet; erfasst wird höchstens das Ereignis selbst.",
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
          { name: "Archiv", path: "/archiv" },
        ])}
      />
    </Container>
  );
}
