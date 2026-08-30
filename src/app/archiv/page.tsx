import type { Metadata } from "next";
import { Container } from "@/components/ui/Container";
import { Timeline } from "@/components/archiv/Timeline";
import { AusgabenRegal } from "@/components/blatt/AusgabenRegal";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { JsonLd } from "@/components/ui/JsonLd";
import { Scene } from "@/components/art/Scene";
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
  const [entries, ausgaben] = await Promise.all([
    content.listTimeline(),
    content.listAusgaben(),
  ]);
  const reversed = [...entries].reverse();

  return (
    <>
      <div className="relative isolate overflow-hidden bg-night-950">
        <div className="absolute inset-0">
          <Scene variant="sumpfland" />
        </div>
        <div
          aria-hidden
          className="absolute inset-0 bg-gradient-to-t from-night-950 via-night-950/60 to-night-950/12"
        />
        <Container width="wide">
          <div className="relative py-12 sm:py-16">
            <span className="rubric">Wie kam es dazu?</span>
            <h1 className="headline mt-4 text-[2.4rem] text-paper-50 sm:text-[3.4rem]">
              Das Archiv
            </h1>
            <p className="mt-4 max-w-2xl font-serif text-[1.05rem] leading-relaxed text-paper-200">
              Hier steht nicht, was gerade diskutiert wird, sondern wann welche
              Information erstmals belegbar war – und ob sie Bestand hatte.
            </p>
          </div>
        </Container>
      </div>

      <Container width="wide">
        {/* Das Blatt: dieselben Beitraege, zu Ausgaben gebunden. */}
        {ausgaben.length > 0 ? (
          <section className="py-12">
            <SectionHeading
              ressort="Leonida Blatt"
              title="Die Ausgaben"
              description="Das Blatt ist keine zweite Zeitung, sondern der gebundene Kurier: Jede Ausgabe fasst einen Zeitraum zusammen und zieht Bilanz, was in ihm belegbar wurde."
            />
            <AusgabenRegal ausgaben={ausgaben} />
          </section>
        ) : null}

        <section className="border-t border-ink-900/15 py-12">
          <SectionHeading
            ressort="Chronologie"
            title="Wann was belegbar wurde"
            description="Jede Zeile steht für ein Ereignis mit benennbarer Quelle – nicht für eine Vermutung."
          />
          <div className="mt-6">
            <Timeline entries={reversed} />
          </div>
        </section>

        <section className="pb-16">
          <SectionHeading
            ressort="Grundsatz"
            title="Was ins Archiv aufgenommen wird"
            description="Das Archiv ist eine Chronologie belegter Ereignisse, keine Sammlung von Gerüchten."
          />
          <div className="mt-6 grid gap-px border border-ink-900/15 bg-ink-900/15 sm:grid-cols-3">
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
              <div key={item.title} className="bg-paper-100 p-5">
                <p className="subhead text-[19px]">{item.title}</p>
                <p className="standfirst mt-2 text-[13px]">{item.text}</p>
              </div>
            ))}
          </div>
        </section>
      </Container>

      <JsonLd
        data={breadcrumbJsonLd([
          { name: "Start", path: "/" },
          { name: "Archiv", path: "/archiv" },
        ])}
      />
    </>
  );
}
