import type { Metadata } from "next";
import { Container } from "@/components/ui/Container";
import { SITE } from "@/lib/site";
import { pageMetadata } from "@/lib/seo";

export const metadata: Metadata = pageMetadata({
  title: "Rechtliches",
  description:
    "Rechtliche Hinweise zum Leonida Kurier: unabhängiges Fanprojekt ohne Verbindung zu Rockstar Games oder Take-Two Interactive.",
  path: "/rechtliches",
});

export default function RechtlichesPage() {
  return (
    <Container width="narrow">
      <div className="py-12 sm:py-16">
        <span className="rubric">Hinweise</span>
        <h1 className="headline mt-4 text-[2.4rem] sm:text-[3.2rem]">Rechtliches</h1>

        <div className="body-text mt-10">
          <h2>Unabhängiges Fanprojekt</h2>
          <p>{SITE.disclaimerLong}</p>
          <p>
            Grand Theft Auto und alle zugehörigen Marken sind Eigentum von Rockstar Games
            und Take-Two Interactive. Die Nennung erfolgt ausschließlich zur Beschreibung
            der behandelten Inhalte.
          </p>

          <h2>Inhalte und Quellen</h2>
          <p>
            Alle redaktionellen Texte dieser Plattform sind eigenständig verfasst. Fremde
            Beiträge werden nicht gespiegelt, sondern verlinkt und eingeordnet. Fremde
            Datenbanken werden nicht übernommen.
          </p>
          <p>
            Unrechtmäßig verbreitetes Material wird auf dieser Plattform weder gehostet
            noch ausgewertet noch verlinkt.
          </p>

          <h2>Keine Gewähr</h2>
          <p>
            Informationen zu einem unveröffentlichten Spiel sind naturgemäß vorläufig. Der
            Status jeder Information ist auf der Plattform ausgewiesen. Für Vollständigkeit
            und Richtigkeit kann keine Gewähr übernommen werden.
          </p>

          <h2>Betrieb</h2>
          <p>
            Betrieben wird das Projekt von {SITE.operator}. Ein vollständiges Impressum
            sowie eine Datenschutzerklärung nach den geltenden Vorgaben werden vor dem
            öffentlichen Start ergänzt.
          </p>
        </div>
      </div>
    </Container>
  );
}
