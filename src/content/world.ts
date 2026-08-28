import { fromGeo } from "./geography";
import type {
  Business,
  Character,
  Collectible,
  GameLocation,
  Mission,
  Region,
  Theory,
  Vehicle,
} from "@/lib/types";

/**
 * Weltdaten (Datenbank-Seed).
 *
 * Aufgenommen wird nur, was offiziell gezeigt oder benannt wurde. Wo nichts
 * Belastbares vorliegt, bleibt die Sammlung bewusst leer – die Oberfläche
 * zeigt dann einen ehrlichen Leerzustand statt erfundener Einträge.
 */

export const regions: Region[] = [
  {
    id: "reg-leonida",
    slug: "leonida",
    title: "Leonida",
    summary:
      "Der Bundesstaat, in dem Grand Theft Auto VI spielt. Rockstar Games hat Leonida als Schauplatz offiziell bestätigt.",
    kind: "bundesstaat",
    status: "bestaetigt",
    sourceIds: ["src-rockstar-gta6", "src-trailer-1"],
    updatedAt: "2026-08-01",
    related: [
      { type: "location", slug: "vice-city" },
      { type: "location", slug: "leonida-keys" },
    ],
  },
];

export const locations: GameLocation[] = [
  {
    id: "loc-vice-city",
    slug: "vice-city",
    title: "Vice City",
    summary:
      "Die Metropole des Bundesstaates Leonida und zentraler Schauplatz von Grand Theft Auto VI.",
    category: "stadt",
    regionSlug: "leonida",
    status: "bestaetigt",
    sourceIds: ["src-rockstar-gta6", "src-trailer-1"],
    updatedAt: "2026-08-01",
    marker: {
      ...fromGeo(-80.19, 25.77),
      precision: "grob",
      note: "Verortet nach dem realen Vorbild Miami.",
    },
    related: [
      { type: "region", slug: "leonida" },
      { type: "character", slug: "lucia-caminos" },
    ],
  },
  {
    id: "loc-leonida-keys",
    slug: "leonida-keys",
    title: "Leonida Keys",
    summary:
      "Vorgelagerte Inselkette im Süden des Bundesstaates, von Rockstar Games namentlich genannt.",
    category: "gebiet",
    regionSlug: "leonida",
    status: "bestaetigt",
    sourceIds: ["src-rockstar-gta6"],
    updatedAt: "2026-08-01",
    marker: {
      ...fromGeo(-81.1, 24.72),
      precision: "grob",
      note: "Verortet nach dem realen Vorbild der Florida Keys.",
    },
    related: [{ type: "region", slug: "leonida" }],
  },
  {
    id: "loc-port-gellhorn",
    slug: "port-gellhorn",
    title: "Port Gellhorn",
    summary: "Von Rockstar Games benannter Schauplatz im Bundesstaat Leonida.",
    category: "stadt",
    regionSlug: "leonida",
    status: "bestaetigt",
    sourceIds: ["src-rockstar-gta6"],
    updatedAt: "2026-08-01",
    marker: { x: 0.28, y: 0.34, precision: "platzhalter" },
    related: [{ type: "region", slug: "leonida" }],
  },
  {
    id: "loc-ambrosia",
    slug: "ambrosia",
    title: "Ambrosia",
    summary: "Von Rockstar Games benannter Schauplatz im Bundesstaat Leonida.",
    category: "gebiet",
    regionSlug: "leonida",
    status: "bestaetigt",
    sourceIds: ["src-rockstar-gta6"],
    updatedAt: "2026-08-01",
    marker: { x: 0.58, y: 0.3, precision: "platzhalter" },
    related: [{ type: "region", slug: "leonida" }],
  },
  {
    id: "loc-grassrivers",
    slug: "grassrivers",
    title: "Grassrivers",
    summary: "Von Rockstar Games benannter Schauplatz im Bundesstaat Leonida.",
    category: "gebiet",
    regionSlug: "leonida",
    status: "bestaetigt",
    sourceIds: ["src-rockstar-gta6"],
    updatedAt: "2026-08-01",
    marker: { x: 0.63, y: 0.55, precision: "platzhalter" },
    related: [{ type: "region", slug: "leonida" }],
  },
  {
    id: "loc-mount-kalaga",
    slug: "mount-kalaga",
    title: "Mount Kalaga",
    summary:
      "Von Rockstar Games benannter Schauplatz im Bundesstaat Leonida, ausgewiesen als Nationalpark.",
    category: "landmarke",
    regionSlug: "leonida",
    status: "bestaetigt",
    sourceIds: ["src-rockstar-gta6"],
    updatedAt: "2026-08-01",
    marker: { x: 0.7, y: 0.2, precision: "platzhalter" },
    related: [{ type: "region", slug: "leonida" }],
  },
];

export const characters: Character[] = [
  {
    id: "chr-lucia-caminos",
    slug: "lucia-caminos",
    title: "Lucia Caminos",
    summary:
      "Eine der beiden Hauptfiguren von Grand Theft Auto VI, offiziell von Rockstar Games vorgestellt.",
    role: "Hauptfigur",
    regionSlug: "leonida",
    status: "bestaetigt",
    sourceIds: ["src-rockstar-gta6", "src-trailer-1"],
    updatedAt: "2026-08-01",
    related: [
      { type: "character", slug: "jason-duval" },
      { type: "location", slug: "vice-city" },
    ],
  },
  {
    id: "chr-jason-duval",
    slug: "jason-duval",
    title: "Jason Duval",
    summary:
      "Die zweite Hauptfigur von Grand Theft Auto VI, offiziell von Rockstar Games vorgestellt.",
    role: "Hauptfigur",
    regionSlug: "leonida",
    status: "bestaetigt",
    sourceIds: ["src-rockstar-gta6", "src-trailer-2"],
    updatedAt: "2026-08-01",
    related: [
      { type: "character", slug: "lucia-caminos" },
      { type: "location", slug: "vice-city" },
    ],
  },
];

/**
 * Für die folgenden Sammlungen liegen derzeit keine belastbaren, offiziell
 * belegten Einzeleinträge vor. Sie bleiben leer, bis geprüfte Daten vorliegen.
 */
export const vehicles: Vehicle[] = [];
export const missions: Mission[] = [];
export const businesses: Business[] = [];
export const collectibles: Collectible[] = [];

export const theories: Theory[] = [
  {
    id: "thr-kartenumfang",
    slug: "wie-gross-wird-leonida",
    title: "Wie groß wird Leonida?",
    summary:
      "Die Community vergleicht Trailerbilder und offizielle Ortsnamen, um den Umfang der Spielwelt abzuschätzen. Belastbare Angaben von Rockstar Games gibt es dazu nicht.",
    claim:
      "Aus den bislang benannten Schauplätzen lässt sich die Größe der Spielwelt ableiten.",
    status: "spekulation",
    sourceIds: ["src-community-signal", "src-redaktion"],
    updatedAt: "2026-08-01",
    arguments: {
      pro: [
        "Rockstar Games hat mehrere räumlich getrennte Schauplätze benannt.",
        "Trailermaterial zeigt sowohl dichte Stadt- als auch weite Naturräume.",
      ],
      contra: [
        "Trailer sind geschnittenes Marketingmaterial und erlauben keine Maßstabsberechnung.",
        "Zur Fläche der Spielwelt existiert bislang keine offizielle Angabe.",
      ],
    },
    related: [
      { type: "region", slug: "leonida" },
      { type: "location", slug: "vice-city" },
    ],
  },
];
