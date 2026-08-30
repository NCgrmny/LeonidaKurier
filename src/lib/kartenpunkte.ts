import type { Kartenpunkt } from "@/components/kompass/Standortkarte";
import type { Article, BaseEntity, GameLocation } from "./types";

/**
 * Welche Orte trägt ein Beitrag?
 *
 * Der Kurier bebildert Beiträge mit der Lage dessen, worüber sie berichten.
 * Die Verweise stehen ohnehin im Beitrag – daraus ergibt sich der Ausschnitt,
 * ohne dass jemand ein Motiv zuordnen müsste. Orte ohne belegte Position
 * bleiben draußen: Sie würden den Ausschnitt auf einen Punkt ziehen, den
 * niemand belegt hat.
 */
export function kartenpunkteFuerArtikel(
  article: Article,
  orte: GameLocation[],
): Kartenpunkt[] {
  const slugs = (article.related ?? [])
    .filter((ref) => ref.type === "location")
    .map((ref) => ref.slug);

  return slugs
    .map((slug) => orte.find((ort) => ort.slug === slug))
    .filter(
      (ort): ort is GameLocation =>
        Boolean(ort?.marker) && ort!.marker!.precision !== "platzhalter",
    )
    .map((ort) => ({ name: ort.title, position: ort.marker! }));
}

/** Alle verorteten Orte – für Übersichtskarten ohne konkreten Bezug. */
export function alleKartenpunkte(orte: GameLocation[]): Kartenpunkt[] {
  return orte
    .filter((ort) => ort.marker && ort.marker.precision !== "platzhalter")
    .map((ort) => ({ name: ort.title, position: ort.marker! }));
}

/** Trägt eine Entität eine belegte Kartenposition? */
export function istVerortet(
  entity: BaseEntity,
): entity is GameLocation & { marker: NonNullable<GameLocation["marker"]> } {
  return "marker" in entity && Boolean((entity as GameLocation).marker);
}
