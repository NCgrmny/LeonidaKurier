import type { Metadata } from "next";
import { Container } from "@/components/ui/Container";
import { RadarBoard, StatusLegend } from "@/components/radar/RadarBoard";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { SourceList } from "@/components/ui/SourceList";
import { JsonLd } from "@/components/ui/JsonLd";
import { content } from "@/lib/content";
import { breadcrumbJsonLd, pageMetadata } from "@/lib/seo";

export const metadata: Metadata = pageMetadata({
  title: "Radar – Gerüchte, Hinweise und Signale zu GTA VI",
  description:
    "Das Leonida Radar bewertet jede Information zu Grand Theft Auto VI mit einem von fünf Statuswerten: bestätigt, wahrscheinlich, Hinweis, Spekulation oder widerlegt.",
  path: "/radar",
  keywords: ["GTA 6 Gerüchte", "GTA 6 Leaks Einordnung", "GTA VI Status"],
});

const PIPELINE = [
  { step: "Signal erkannt", detail: "Auffälliges Aufkommen in beobachteten Kanälen." },
  { step: "Im Radar markiert", detail: "Thema wird erfasst – noch ohne Bewertung." },
  { step: "Redaktionelle Prüfung", detail: "Herkunft, Plausibilität und Widersprüche." },
  { step: "Quellen gesucht", detail: "Primärquelle vor Sekundärquelle vor Signal." },
  { step: "Status gesetzt", detail: "Einordnung in eine der fünf Stufen." },
  { step: "Veröffentlichung", detail: "Beitrag, Datenbankeintrag oder beides." },
];

export default async function RadarPage() {
  const [signals, sources] = await Promise.all([
    content.listRadarSignals(),
    content.listSources(),
  ]);

  return (
    <Container width="wide">
      <header className="py-12 sm:py-16">
        <p className="kicker">Was könnte passieren?</p>
        <h1 className="headline mt-3 text-4xl text-paper-50 sm:text-5xl">
          Leonida Radar
        </h1>
        <p className="standfirst mt-4 max-w-2xl text-base sm:text-lg">
          Das Frühwarnsystem der Plattform. Beobachtete Entwicklungen werden erfasst,
          geprüft und mit einem Verifizierungsgrad versehen – Spekulation wird nie als
          Fakt dargestellt.
        </p>
      </header>

      <section className="pb-16">
        <RadarBoard signals={signals} />
      </section>

      <section className="pb-16">
        <SectionHeading
          kicker="Statuslogik"
          title="Fünf Stufen, eine klare Aussage"
          description="Der Status beschreibt nicht, wie spannend eine Information ist – sondern wie gut sie belegt ist."
        />
        <div className="mt-6">
          <StatusLegend />
        </div>
      </section>

      <section className="pb-16">
        <SectionHeading
          kicker="Arbeitsweise"
          title="Vom Signal zur Veröffentlichung"
          description="Automatisierte Vorsortierung ist vorgesehen, die Freigabe bleibt redaktionell."
        />
        <ol className="mt-6 grid gap-px overflow-hidden rounded-xl border border-[var(--rule)] bg-[var(--rule)] sm:grid-cols-2 lg:grid-cols-3">
          {PIPELINE.map((entry, index) => (
            <li key={entry.step} className="bg-ink-900/70 p-5">
              <span className="font-mono text-[10px] uppercase tracking-[0.16em] text-coral-300">
                Schritt {String(index + 1).padStart(2, "0")}
              </span>
              <p className="mt-2 text-sm font-medium text-paper-50">{entry.step}</p>
              <p className="mt-1.5 text-xs leading-relaxed text-paper-400">
                {entry.detail}
              </p>
            </li>
          ))}
        </ol>
      </section>

      <section className="pb-20">
        <SectionHeading
          kicker="Quellen"
          title="Was wir beobachten"
          description="Offizielle Kanäle stehen über allem. Community-Plattformen liefern Signale, keine Belege."
        />
        <div className="mt-6 max-w-3xl">
          <SourceList sources={sources} />
        </div>
      </section>

      <JsonLd
        data={breadcrumbJsonLd([
          { name: "Start", path: "/" },
          { name: "Radar", path: "/radar" },
        ])}
      />
    </Container>
  );
}
