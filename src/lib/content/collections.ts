import type { EntityType } from "@/lib/types";

/**
 * Registry der Datenbank-Sammlungen.
 *
 * Jede Sammlung erhält eine eigene, indexierbare URL unterhalb von /datenbank.
 * Slugs sind deutsch, weil die Plattform auf deutschsprachige Suchanfragen
 * ausgerichtet ist.
 */
export interface CollectionDefinition {
  /** URL-Segment, z. B. /datenbank/orte */
  slug: string;
  type: EntityType;
  label: string;
  singular: string;
  description: string;
  /** Kurzer Hinweis, wenn noch keine belegten Einträge vorliegen. */
  emptyHint: string;
}

export const COLLECTIONS: CollectionDefinition[] = [
  {
    slug: "regionen",
    type: "region",
    label: "Regionen",
    singular: "Region",
    description:
      "Bundesstaat, Städte und Gebiete – die räumliche Gliederung der Spielwelt.",
    emptyHint: "Es sind noch keine belegten Regionen erfasst.",
  },
  {
    slug: "orte",
    type: "location",
    label: "Orte",
    singular: "Ort",
    description:
      "Städte, Gebiete, Landmarken und Schauplätze, die offiziell benannt wurden.",
    emptyHint: "Es sind noch keine belegten Orte erfasst.",
  },
  {
    slug: "charaktere",
    type: "character",
    label: "Charaktere",
    singular: "Charakter",
    description: "Figuren, die offiziell vorgestellt oder gezeigt wurden.",
    emptyHint: "Es sind noch keine belegten Charaktere erfasst.",
  },
  {
    slug: "fahrzeuge",
    type: "vehicle",
    label: "Fahrzeuge",
    singular: "Fahrzeug",
    description: "Fahrzeuge mit belegter Herkunft aus offiziellem Material.",
    emptyHint:
      "Zu einzelnen Fahrzeugen liegen bislang keine belastbar belegten Angaben vor. Sobald Rockstar Games Fahrzeuge offiziell benennt, entstehen hier eigene Einträge.",
  },
  {
    slug: "missionen",
    type: "mission",
    label: "Missionen",
    singular: "Mission",
    description: "Missionen und Kapitel der Handlung.",
    emptyHint:
      "Zu Missionen liegen vor Veröffentlichung des Spiels keine belegbaren Angaben vor.",
  },
  {
    slug: "geschaefte",
    type: "business",
    label: "Geschäfte",
    singular: "Geschäft",
    description: "Läden, Betriebe und Dienstleistungen in der Spielwelt.",
    emptyHint: "Es sind noch keine belegten Geschäfte erfasst.",
  },
  {
    slug: "geheimnisse",
    type: "collectible",
    label: "Geheimnisse & Sammelobjekte",
    singular: "Eintrag",
    description: "Easter Eggs, Sammelobjekte und Fundstücke.",
    emptyHint:
      "Geheimnisse und Sammelobjekte lassen sich erst nach Veröffentlichung des Spiels belegen.",
  },
  {
    slug: "theorien",
    type: "theory",
    label: "Theorien",
    singular: "Theorie",
    description:
      "Geprüfte Community-Thesen mit Argumenten dafür und dagegen – klar als Spekulation ausgewiesen.",
    emptyHint: "Es sind noch keine Theorien erfasst.",
  },
];

export const collectionBySlug = new Map(
  COLLECTIONS.map((collection) => [collection.slug, collection]),
);

export const collectionByType = new Map(
  COLLECTIONS.map((collection) => [collection.type, collection]),
);

/** Kanonischer Pfad einer Entität. */
export function entityHref(type: EntityType, slug: string): string {
  if (type === "article") return `/kurier/${slug}`;
  if (type === "mapMarker") return `/kompass?marker=${slug}`;
  const collection = collectionByType.get(type);
  return collection ? `/datenbank/${collection.slug}/${slug}` : "/datenbank";
}
