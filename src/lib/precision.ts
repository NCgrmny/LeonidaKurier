import type { MapMarkerPosition } from "./types";

export type MapPrecision = MapMarkerPosition["precision"];

export interface PrecisionDefinition {
  id: MapPrecision;
  label: string;
  /** Was die Angabe bedeutet – erscheint in Legende und Markerdetail. */
  definition: string;
  /** Farbe des Ringes um den Marker und des Punktes in der Legende. */
  accent: string;
}

/**
 * Genauigkeitsstufen der Verortung.
 *
 * Der Kompass weist die Genauigkeit pro Marker aus, nicht pauschal für die
 * Karte. Ohne diese Angabe würde eine Rekonstruktion wie eine Messung
 * aussehen – genau das soll sie nicht.
 */
export const MAP_PRECISION: Record<MapPrecision, PrecisionDefinition> = {
  genau: {
    id: "genau",
    label: "Genau",
    definition:
      "Position aus verifizierten In-Game-Daten. Wird erst nach Erscheinen des Spiels vergeben.",
    accent: "var(--status-bestaetigt)",
  },
  grob: {
    id: "grob",
    label: "Grob",
    definition:
      "Verortet nach einem nachvollziehbaren realen Vorbild. Die Lage im Spiel kann abweichen.",
    accent: "var(--status-hinweis)",
  },
  platzhalter: {
    id: "platzhalter",
    label: "Ohne belegte Position",
    definition:
      "Zur Lage liegt nichts Belegbares vor. Der Eintrag steht getrennt und wird nicht auf der Fläche platziert.",
    accent: "var(--color-ink-500, #8d7f6d)",
  },
};

export function precisionDefinition(precision: MapPrecision): PrecisionDefinition {
  return MAP_PRECISION[precision];
}

/** Reihenfolge für Legenden: von der stärksten zur schwächsten Aussage. */
export const PRECISION_ORDER: MapPrecision[] = ["genau", "grob", "platzhalter"];
