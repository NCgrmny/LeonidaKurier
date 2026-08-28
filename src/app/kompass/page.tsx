import type { Metadata } from "next";
import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { CompassMap } from "@/components/kompass/CompassMap";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { JsonLd } from "@/components/ui/JsonLd";
import { content } from "@/lib/content";
import { breadcrumbJsonLd, pageMetadata } from "@/lib/seo";

export const metadata: Metadata = pageMetadata({
  title: "Leonida Kompass – die interaktive GTA-6-Karte",
  description:
    "Der Leonida Kompass ist die interaktive Karte zur Welt von Grand Theft Auto VI: Ebenen für Orte, Regionen, Geschäfte und Geheimnisse, jeder Marker mit Datenbankeintrag und Quelle.",
  path: "/kompass",
  keywords: ["GTA 6 Karte", "GTA 6 Map", "GTA VI Karte deutsch", "Leonida Karte"],
});

const ROADMAP = [
  {
    title: "Ausbaustufe 1 – jetzt",
    items: [
      "Kartenmechanik mit Zoom, Verschieben und Ebenen",
      "Marker mit Status, Quelle und Datenbankverknüpfung",
      "Positionen sichtbar als Platzhalter gekennzeichnet",
    ],
  },
  {
    title: "Ausbaustufe 2",
    items: [
      "Belegte Positionen, sobald Geodaten verifizierbar sind",
      "Ebenen für Geschäfte, Immobilien und Aktivitäten",
      "Filter nach Status, Region und Kategorie",
    ],
  },
  {
    title: "Ausbaustufe 3",
    items: [
      "Community-Einreichungen mit Moderation",
      "Eigene Marker, Routen und Fortschritt",
      "Sammlungs- und Missionstracker",
    ],
  },
];

export default async function KompassPage({
  searchParams,
}: {
  searchParams: Promise<{ marker?: string }>;
}) {
  const [markers, { marker }] = await Promise.all([
    content.listMapMarkers(),
    searchParams,
  ]);

  return (
    <Container width="wide">
      <header className="pb-6 pt-8 sm:pb-8 sm:pt-12">
        <p className="kicker">Wo ist es?</p>
        <h1 className="headline mt-3 text-4xl text-paper-50 sm:text-5xl">
          Leonida Kompass
        </h1>
        <p className="standfirst mt-3 max-w-2xl text-base sm:text-lg">
          Die interaktive Karte der Plattform. Jeder Marker ist mit der Datenbank
          verbunden – von der Beschreibung über die Quelle bis zu verknüpften Beiträgen.
        </p>
      </header>

      {/* Grundlage der Karte offenlegen: real vs. unveroeffentlicht. */}
      <details className="group mb-4 rounded-xl border border-sand-400/25 bg-sand-400/5 px-4 py-3 sm:px-5">
        <summary className="cursor-pointer list-none text-sm leading-relaxed text-paper-200 marker:content-['']">
          <strong className="font-medium text-sand-300">
            Grundkarte: reale Geografie Floridas.
          </strong>{" "}
          Die Spielkarte von GTA VI ist unveröffentlicht.
          <span className="ml-1.5 font-mono text-[10px] uppercase tracking-[0.12em] text-paper-500 group-open:hidden">
            Mehr
          </span>
        </summary>
        <p className="mt-2.5 text-sm leading-relaxed text-paper-400">
          Leonida ist erkennbar an Florida angelehnt. Als Orientierung zeigt der Kompass
          deshalb die vereinfachte reale Küstenlinie Floridas – öffentlich bekannte
          Realgeografie, kein nachgezeichnetes Spielmaterial und kein fremdes Kartenasset.
          Verortet werden nur Einträge mit nachvollziehbarem realem Vorbild; die
          Begründung steht an jedem Marker. Alles Übrige liegt sichtbar getrennt unter
          „ohne belegte Position“. Sobald die Spielkarte belegbar ist, tritt eine eigene
          Leonida-Geometrie an diese Stelle.
        </p>
      </details>

      <CompassMap markers={markers} initialMarkerSlug={marker} />

      <section className="py-16">
        <SectionHeading
          kicker="Ausbau"
          title="Wohin der Kompass wächst"
          description="Die Kartenarchitektur ist auf Erweiterung ausgelegt: Neue Ebenen und Marker entstehen als Daten, nicht als Code."
        />
        <div className="mt-6 grid gap-4 lg:grid-cols-3">
          {ROADMAP.map((phase) => (
            <div
              key={phase.title}
              className="rounded-xl border border-[var(--rule)] bg-ink-900/50 p-5"
            >
              <h3 className="font-mono text-[11px] uppercase tracking-[0.14em] text-coral-300">
                {phase.title}
              </h3>
              <ul className="mt-3 grid gap-2.5">
                {phase.items.map((item) => (
                  <li key={item} className="flex gap-2.5 text-sm leading-relaxed text-paper-400">
                    <span
                      aria-hidden
                      className="mt-2 block size-1 shrink-0 rounded-full bg-lagoon-400"
                    />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        <p className="mt-6 text-sm text-paper-400">
          Die Karte ist auch direkt über{" "}
          <Link href="/kompass" className="text-lagoon-300 hover:text-lagoon-400">
            leonidakompass.de
          </Link>{" "}
          erreichbar – als zweiter Einstieg in dieselbe Plattform.
        </p>
      </section>

      <JsonLd
        data={breadcrumbJsonLd([
          { name: "Start", path: "/" },
          { name: "Kompass", path: "/kompass" },
        ])}
      />
    </Container>
  );
}
