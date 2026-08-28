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
      <header className="py-12 sm:py-16">
        <p className="kicker">Transparenz</p>
        <h1 className="headline mt-3 text-4xl text-paper-50 sm:text-5xl">
          Redaktion &amp; Standards
        </h1>
        <p className="standfirst mt-4 max-w-2xl text-base sm:text-lg">
          {SITE.name} ist ein unabhängiges Fanprojekt von {SITE.operator}. Diese Seite legt
          offen, nach welchen Regeln hier gearbeitet wird.
        </p>
      </header>

      <section className="pb-16">
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {PRINCIPLES.map((principle) => (
            <div
              key={principle.title}
              className="rounded-xl border border-[var(--rule)] bg-ink-900/50 p-5"
            >
              <h2 className="headline text-lg text-paper-50">{principle.title}</h2>
              <p className="mt-2.5 text-sm leading-relaxed text-paper-400">
                {principle.text}
              </p>
            </div>
          ))}
        </div>
      </section>

      <section className="pb-20">
        <SectionHeading
          kicker="Statuslogik"
          title="Die fünf Stufen im Detail"
        />
        <div className="mt-6">
          <StatusLegend />
        </div>
      </section>
    </Container>
  );
}
