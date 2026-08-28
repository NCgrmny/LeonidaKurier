import type { Metadata } from "next";
import { Container } from "@/components/ui/Container";
import { StatusLegend } from "@/components/radar/RadarBoard";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { SITE } from "@/lib/site";
import { pageMetadata } from "@/lib/seo";

export const metadata: Metadata = pageMetadata({
  title: "Redaktion & Standards",
  description:
    "Die redaktionellen Standards des Leonida Kurier: Statuslogik, Umgang mit Quellen, Community-Signalen und automatisierten Verfahren.",
  path: "/redaktion",
});

const PRINCIPLES = [
  {
    title: "Status vor Schlagzeile",
    text: "Jede Information erhält einen Verifizierungsgrad. Spekulation wird nie als Fakt dargestellt – auch dann nicht, wenn sie plausibel klingt.",
  },
  {
    title: "Quelle vor Reichweite",
    text: "Offizielle Kanäle von Rockstar Games und Take-Two stehen über allem. Reddit, X und YouTube sind Signalquellen für die Recherche.",
  },
  {
    title: "Eigene Texte",
    text: "Fremde Beiträge werden verlinkt und eingeordnet, nicht gespiegelt. Fremde Datenbanken werden nicht kopiert.",
  },
  {
    title: "Kein Leak-Material",
    text: "Unrechtmäßig verbreitete Dateien werden weder gehostet noch ausgewertet noch verlinkt.",
  },
  {
    title: "Korrekturen sichtbar",
    text: "Ändert sich der Wissensstand, ändert sich der Status – nachvollziehbar mit Datum statt stiller Anpassung.",
  },
  {
    title: "Automatisierung mit Freigabe",
    text: "Automatisierte Verfahren dürfen Signale vorsortieren und zusammenfassen. Veröffentlicht wird erst nach redaktioneller Freigabe.",
  },
];

export default function RedaktionPage() {
  return (
    <Container width="wide">
      <header className="border-b-2 border-ink-900 py-10 sm:py-14">
        <span className="rubric">Transparenz</span>
        <h1 className="headline mt-4 text-[2.4rem] sm:text-[3.2rem]">
          Redaktion &amp; Standards
        </h1>
        <p className="standfirst mt-3 max-w-2xl text-[16px]">
          {SITE.name} ist ein unabhängiges Fanprojekt von {SITE.operator}. Diese Seite legt
          offen, nach welchen Regeln hier gearbeitet wird.
        </p>
      </header>

      <section className="pb-16">
        <div className="grid gap-px border border-ink-900/15 bg-ink-900/15 sm:grid-cols-2 lg:grid-cols-3">
          {PRINCIPLES.map((principle) => (
            <div key={principle.title} className="bg-paper-100 p-5">
              <h2 className="subhead text-[19px]">{principle.title}</h2>
              <p className="standfirst mt-2 text-[13px]">{principle.text}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="pb-20">
        <SectionHeading ressort="Statuslogik" title="Die fünf Stufen im Detail" />
        <div className="mt-6 border border-ink-900/15">
          <StatusLegend />
        </div>
      </section>
    </Container>
  );
}
