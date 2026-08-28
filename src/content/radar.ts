import type { MapMarker, RadarSignal } from "@/lib/types";

/**
 * Radar-Signale: Beobachtungen, bevor daraus ein Beitrag wird.
 *
 * Ein Signal ist ausdrücklich kein Beleg. Es dokumentiert, dass ein Thema in
 * beobachteten Kanälen Aufkommen erzeugt – und mit welchem Status die Redaktion
 * es derzeit führt.
 */
export const radarSignals: RadarSignal[] = [
  {
    id: "sig-schauplatznamen",
    title: "Offiziell benannte Schauplätze",
    summary:
      "Rockstar Games hat mehrere Schauplätze im Bundesstaat Leonida namentlich genannt. Diese Namen sind belegt und in der Datenbank erfasst.",
    status: "bestaetigt",
    channel: "Rockstar Games",
    observedAt: "2026-08-01",
    sourceIds: ["src-rockstar-gta6"],
    related: [
      { type: "location", slug: "vice-city" },
      { type: "location", slug: "mount-kalaga" },
    ],
  },
  {
    id: "sig-hauptfiguren",
    title: "Zwei spielbare Hauptfiguren",
    summary:
      "Lucia Caminos und Jason Duval sind offiziell als Hauptfiguren vorgestellt worden.",
    status: "bestaetigt",
    channel: "Rockstar Games",
    observedAt: "2026-08-01",
    sourceIds: ["src-rockstar-gta6", "src-trailer-1"],
    related: [{ type: "character", slug: "lucia-caminos" }],
  },
  {
    id: "sig-kartenrekonstruktion",
    title: "Community-Kartenrekonstruktionen gewinnen an Reichweite",
    summary:
      "Mapping-Projekte veröffentlichen laufend Entwürfe der Spielwelt, die aus Trailermaterial abgeleitet sind. Als Recherchehinweis relevant, als Beleg nicht belastbar.",
    status: "hinweis",
    channel: "Community-Mapping",
    observedAt: "2026-08-12",
    sourceIds: ["src-community-signal"],
    demo: true,
    related: [{ type: "theory", slug: "wie-gross-wird-leonida" }],
  },
  {
    id: "sig-weltgroesse",
    title: "Flächenangaben zur Spielwelt kursieren",
    summary:
      "In sozialen Netzwerken werden konkrete Quadratkilometer-Angaben zur Spielwelt geteilt. Eine offizielle Angabe existiert nicht.",
    status: "spekulation",
    channel: "Reddit / X",
    observedAt: "2026-08-14",
    sourceIds: ["src-community-signal"],
    demo: true,
    related: [{ type: "article", slug: "wie-gross-wird-leonida" }],
  },
  {
    id: "sig-offizielle-angaben",
    title: "Angebliche Angaben aus nicht benannten Quellen",
    summary:
      "Wiederkehrend werden Detailangaben verbreitet, die sich auf nicht überprüfbare Quellen berufen. Ohne benennbare Herkunft führt der Kurier solche Angaben als widerlegt, sobald eine Primärquelle ihnen widerspricht oder sie nachweislich frei erfunden sind.",
    status: "widerlegt",
    channel: "Diverse",
    observedAt: "2026-08-16",
    sourceIds: ["src-redaktion"],
    demo: true,
  },
];

/**
 * Kartenmarker für den Leonida Kompass.
 *
 * Wichtig: Es liegen keine offiziellen Geodaten zu Leonida vor. Alle Positionen
 * sind daher als `platzhalter` gekennzeichnet und dienen ausschließlich dazu,
 * die Kartenarchitektur zu betreiben. Die Oberfläche weist das sichtbar aus.
 */
export const mapMarkers: MapMarker[] = [
  {
    id: "mm-vice-city",
    slug: "vice-city",
    title: "Vice City",
    summary: "Metropole des Bundesstaates Leonida.",
    layer: "orte",
    status: "bestaetigt",
    sourceIds: ["src-rockstar-gta6"],
    updatedAt: "2026-08-01",
    position: { x: 0.44, y: 0.62, precision: "platzhalter" },
    target: { type: "location", slug: "vice-city" },
  },
  {
    id: "mm-leonida-keys",
    slug: "leonida-keys",
    title: "Leonida Keys",
    summary: "Vorgelagerte Inselkette im Süden.",
    layer: "orte",
    status: "bestaetigt",
    sourceIds: ["src-rockstar-gta6"],
    updatedAt: "2026-08-01",
    position: { x: 0.38, y: 0.86, precision: "platzhalter" },
    target: { type: "location", slug: "leonida-keys" },
  },
  {
    id: "mm-port-gellhorn",
    slug: "port-gellhorn",
    title: "Port Gellhorn",
    summary: "Benannter Schauplatz im Bundesstaat Leonida.",
    layer: "orte",
    status: "bestaetigt",
    sourceIds: ["src-rockstar-gta6"],
    updatedAt: "2026-08-01",
    position: { x: 0.28, y: 0.34, precision: "platzhalter" },
    target: { type: "location", slug: "port-gellhorn" },
  },
  {
    id: "mm-ambrosia",
    slug: "ambrosia",
    title: "Ambrosia",
    summary: "Benannter Schauplatz im Bundesstaat Leonida.",
    layer: "orte",
    status: "bestaetigt",
    sourceIds: ["src-rockstar-gta6"],
    updatedAt: "2026-08-01",
    position: { x: 0.58, y: 0.3, precision: "platzhalter" },
    target: { type: "location", slug: "ambrosia" },
  },
  {
    id: "mm-grassrivers",
    slug: "grassrivers",
    title: "Grassrivers",
    summary: "Benannter Schauplatz im Bundesstaat Leonida.",
    layer: "orte",
    status: "bestaetigt",
    sourceIds: ["src-rockstar-gta6"],
    updatedAt: "2026-08-01",
    position: { x: 0.63, y: 0.55, precision: "platzhalter" },
    target: { type: "location", slug: "grassrivers" },
  },
  {
    id: "mm-mount-kalaga",
    slug: "mount-kalaga",
    title: "Mount Kalaga",
    summary: "Als Nationalpark ausgewiesener Schauplatz.",
    layer: "orte",
    status: "bestaetigt",
    sourceIds: ["src-rockstar-gta6"],
    updatedAt: "2026-08-01",
    position: { x: 0.7, y: 0.2, precision: "platzhalter" },
    target: { type: "location", slug: "mount-kalaga" },
  },
];
