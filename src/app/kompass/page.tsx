import type { Metadata } from "next";
import Link from "next/link";
import { CompassMap } from "@/components/kompass/CompassMap";
import { Container } from "@/components/ui/Container";
import { JsonLd } from "@/components/ui/JsonLd";
import { content } from "@/lib/content";
import { breadcrumbJsonLd, pageMetadata } from "@/lib/seo";

export const metadata: Metadata = pageMetadata({
  title: "Leonida Kompass – die interaktive Karte",
  description:
    "Der Leonida Kompass ist das Entdeckungswerkzeug zur Welt von Grand Theft Auto VI: Ebenen für Orte, Regionen, Geschäfte und Geheimnisse, jeder Marker mit Datenbankeintrag und Quelle.",
  path: "/kompass",
  keywords: ["GTA 6 Karte", "GTA 6 Map", "GTA VI Karte deutsch", "Leonida Karte"],
});

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
    <>
      {/* Sehr kompakte Kopfzeile – die Karte beginnt unmittelbar darunter. */}
      <div className="border-b-2 border-ink-900 bg-paper-200">
        <Container width="wide">
          <div className="flex flex-wrap items-baseline justify-between gap-x-6 gap-y-1 py-2.5">
            <div className="flex items-baseline gap-3">
              <h1 className="masthead text-[19px] text-ink-900">
                Leonida <span className="text-lagoon-700">Kompass</span>
              </h1>
              <span className="meta hidden sm:inline">Redaktionelle Rekonstruktion</span>
            </div>
            <p className="meta">
              <Link href="/datenbank" className="hover:text-coral-600">
                Datenbank
              </Link>
              <span aria-hidden> · </span>
              <Link href="/kurier" className="hover:text-coral-600">
                Kurier
              </Link>
            </p>
          </div>
        </Container>
      </div>

      <CompassMap markers={markers} initialMarkerSlug={marker} />

      <JsonLd
        data={breadcrumbJsonLd([
          { name: "Start", path: "/" },
          { name: "Kompass", path: "/kompass" },
        ])}
      />
    </>
  );
}
