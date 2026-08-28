import type { RadarStatus } from "./types";

export interface StatusDefinition {
  id: RadarStatus;
  label: string;
  /** Kurzdefinition – erscheint im Radar und in Tooltips. */
  definition: string;
  /** Tailwind-Klassen fuer Badge-Darstellung. */
  className: string;
  /** CSS-Variable fuer Akzentflaechen (Radar-Spalten, Kartenmarker). */
  accent: string;
  order: number;
}

export const RADAR_STATUS: Record<RadarStatus, StatusDefinition> = {
  bestaetigt: {
    id: "bestaetigt",
    label: "Bestätigt",
    definition:
      "Rockstar Games oder Take-Two hat es offiziell bestätigt oder eindeutig gezeigt.",
    className: "border-emerald-400/30 bg-emerald-400/10 text-emerald-300",
    accent: "var(--status-bestaetigt)",
    order: 0,
  },
  wahrscheinlich: {
    id: "wahrscheinlich",
    label: "Wahrscheinlich",
    definition: "Mehrere belastbare Hinweise sprechen dafür, offen bleibt die Bestätigung.",
    className: "border-sky-400/30 bg-sky-400/10 text-sky-300",
    accent: "var(--status-wahrscheinlich)",
    order: 1,
  },
  hinweis: {
    id: "hinweis",
    label: "Hinweis",
    definition: "Interessanter Fund, aber noch nicht ausreichend belegt.",
    className: "border-amber-400/30 bg-amber-400/10 text-amber-300",
    accent: "var(--status-hinweis)",
    order: 2,
  },
  spekulation: {
    id: "spekulation",
    label: "Spekulation",
    definition: "Community-Theorie oder Interpretation ohne belastbaren Beleg.",
    className: "border-violet-400/30 bg-violet-400/10 text-violet-300",
    accent: "var(--status-spekulation)",
    order: 3,
  },
  widerlegt: {
    id: "widerlegt",
    label: "Widerlegt",
    definition: "Eine frühere Annahme hat sich als unzutreffend erwiesen.",
    className: "border-rose-400/30 bg-rose-400/10 text-rose-300",
    accent: "var(--status-widerlegt)",
    order: 4,
  },
};

export const RADAR_STATUS_ORDER: RadarStatus[] = Object.values(RADAR_STATUS)
  .sort((a, b) => a.order - b.order)
  .map((entry) => entry.id);

export function statusDefinition(status: RadarStatus): StatusDefinition {
  return RADAR_STATUS[status];
}
