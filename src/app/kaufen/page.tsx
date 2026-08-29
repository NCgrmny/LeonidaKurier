import type { Metadata } from "next";
import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { Bezugsquellen } from "@/components/kurier/Bezugsquellen";
import { RELEASE } from "@/lib/site";
import { pageMetadata } from "@/lib/seo";

export const metadata: Metadata = pageMetadata({
  title: "GTA 6 kaufen und vorbestellen – Termin, Preis und Editionen",
  description:
    "Wann Grand Theft Auto VI in Deutschland erscheint, was es kostet, ab wann der Vorabdownload läuft und welche Editionen angekündigt sind.",
  path: "/kaufen",
  keywords: [
    "GTA 6 kaufen",
    "GTA 6 vorbestellen",
    "GTA 6 Preis",
    "GTA 6 Release Deutschland",
    "GTA 6 Ultimate Edition",
  ],
});

export default function KaufenPage() {
  return (
    <Container width="narrow">
      <div className="py-12 sm:py-16">
        <span className="rubric">Service</span>
        <h1 className="headline mt-4 text-[2.4rem] sm:text-[3.2rem]">
          GTA 6 kaufen
        </h1>
        <p className="standfirst mt-4">
          Termin, Preis, Plattformen und Vorabdownload – die offiziellen Angaben für
          Deutschland auf einer Seite.
        </p>

        <dl className="mt-10 grid gap-px border border-ink-900/20 bg-ink-900/20 sm:grid-cols-2">
          {[
            ["Erscheint am", RELEASE.labelDe],
            ["In Deutschland ab", "Mitternacht, Nacht vom 18. auf den 19. November"],
            ["Plattformen", RELEASE.platforms.join(" · ")],
            ["Standard Edition", `${RELEASE.priceEur} (${RELEASE.priceUsd} laut Take-Two)`],
            ["Vorabdownload ab", RELEASE.preloadLabelDe],
            ["Weitere Edition", "Ultimate Edition, angekündigt"],
          ].map(([label, value]) => (
            <div key={label} className="bg-paper-50 px-4 py-3">
              <dt className="meta text-ink-500">{label}</dt>
              <dd className="subhead mt-1 text-[16px] leading-tight">{value}</dd>
            </div>
          ))}
        </dl>

        <div className="mt-8">
          <Bezugsquellen />
        </div>

        <div className="body-text mt-10">
          <h2>Warum hier keine Schlüsselhändler stehen</h2>
          <p>
            Aufgeführt sind ausschließlich autorisierte Händler. Anbieter, die
            Aktivierungsschlüssel aus Drittquellen weiterverkaufen, bleiben außen vor –
            Herkunft und Regionsbindung solcher Schlüssel sind für Käuferinnen und
            Käufer nicht überprüfbar, und Rückabwicklungen gehen regelmäßig zulasten
            der Kundschaft. Eine Seite, die Belegbarkeit zum Prinzip erklärt, kann
            schlecht Bezugsquellen empfehlen, deren Ware sie nicht einordnen kann.
          </p>

          <h2>Preisangaben</h2>
          <p>
            Der offizielle Preis stammt von Take-Two beziehungsweise aus dem deutschen
            Handel. Tagespreise einzelner Händler stehen hier bewusst nicht: Sie ändern
            sich laufend, und eine eingefrorene Zahl wäre nach kurzer Zeit falsch.
          </p>

          <p className="mt-8">
            Die vollständige Einordnung mit Quellen steht im{" "}
            <Link href="/kurier/vorbestellung-preis-release">
              Beitrag zu Vorbestellung, Preis und Termin
            </Link>
            . Wie der Kurier mit Werbung umgeht, steht unter{" "}
            <Link href="/rechtliches">Rechtliches</Link>.
          </p>
        </div>
      </div>
    </Container>
  );
}
