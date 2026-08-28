import type { Metadata } from "next";
import { Container } from "@/components/ui/Container";
import { RadarBoard, StatusLegend } from "@/components/radar/RadarBoard";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { SourceList } from "@/components/ui/SourceList";
import { JsonLd } from "@/components/ui/JsonLd";
import { Scene } from "@/components/art/Scene";
import { content } from "@/lib/content";
import { breadcrumbJsonLd, pageMetadata } from "@/lib/seo";

export const metadata: Metadata = pageMetadata({
  title: "Radar – Gerüchte, Hinweise und Signale",
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
  { step: "Veröffentlichung", detail: "Bericht, Datenbankeintrag oder beides." },
];

export default async function RadarPage() {
  const [signals, sources] = await Promise.all([
    content.listRadarSignals(),
    content.listSources(),
  ]);

  return (
    <>
      {/* Kopfbereich mit Motiv */}
      <div className="relative isolate overflow-hidden bg-night-950">
        <div className="absolute inset-0">
          <Scene variant="nachtviertel" />
        </div>
        <div
          aria-hidden
          className="absolute inset-0 bg-gradient-to-t from-night-950 via-night-950/62 to-night-950/15"
        />
        <Container width="wide">
          <div className="relative py-12 sm:py-16">
            <span className="rubric">Frühwarnsystem</span>
            <h1 className="headline mt-4 text-[2.4rem] text-paper-50 sm:text-[3.4rem]">
              Leonida Radar
            </h1>
            <p className="mt-4 max-w-2xl font-serif text-[1.05rem] leading-relaxed text-paper-200">
              Beobachtete Entwicklungen werden erfasst, geprüft und mit einem
              Verifizierungsgrad versehen. Spekulation wird nie als Fakt dargestellt.
            </p>
          </div>
        </Container>
      </div>

      <div className="night py-10">
        <Container width="wide">
          <RadarBoard signals={signals} />
        </Container>
      </div>

      <Container width="wide">
        <section className="py-14">
          <SectionHeading
            ressort="Statuslogik"
            title="Fünf Stufen, eine klare Aussage"
            description="Der Status beschreibt nicht, wie spannend eine Information ist – sondern wie gut sie belegt ist."
          />
          <div className="mt-6 border border-ink-900/15">
            <StatusLegend />
          </div>
        </section>

        <section className="pb-14">
          <SectionHeading
            ressort="Arbeitsweise"
            title="Vom Signal zur Veröffentlichung"
            description="Automatisierte Vorsortierung ist vorgesehen, die Freigabe bleibt redaktionell."
          />
          <ol className="mt-6 grid gap-px border border-ink-900/15 bg-ink-900/15 sm:grid-cols-2 lg:grid-cols-3">
            {PIPELINE.map((entry, index) => (
              <li key={entry.step} className="bg-paper-100 p-5">
                <span className="font-mono text-[10px] font-bold uppercase tracking-[0.18em] text-coral-600">
                  Schritt {String(index + 1).padStart(2, "0")}
                </span>
                <p className="subhead mt-2 text-[19px]">{entry.step}</p>
                <p className="standfirst mt-1.5 text-[13px]">{entry.detail}</p>
              </li>
            ))}
          </ol>
        </section>

        <section className="pb-16">
          <SectionHeading
            ressort="Quellen"
            title="Was wir beobachten"
            description="Offizielle Kanäle stehen über allem. Community-Plattformen liefern Signale, keine Belege."
          />
          <div className="mt-6 max-w-3xl">
            <SourceList sources={sources} />
          </div>
        </section>
      </Container>

      <JsonLd
        data={breadcrumbJsonLd([
          { name: "Start", path: "/" },
          { name: "Radar", path: "/radar" },
        ])}
      />
    </>
  );
}
