import { fromGeo } from "./geography";
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
    id: "sig-extended-look",
    title: "Extended Look offiziell veröffentlicht",
    summary:
      "Rockstar Games hat das neue Langformat am 27. August veröffentlicht. Gezeigte Inhalte werden nun einzeln in Kurier, Datenbank und Kompass ausgewertet.",
    status: "bestaetigt",
    channel: "Rockstar Newswire",
    observedAt: "2026-08-27",
    sourceIds: ["src-extended-look", "src-extended-look-watch"],
    related: [{ type: "article", slug: "extended-look-jetzt-verfuegbar" }],
  },
  {
    id: "sig-vorbestellung",
    title: "Vorbestellung und Release bestätigt",
    summary:
      "Rockstar und Take-Two nennen den 19. November 2026, PlayStation 5 und Xbox Series X|S sowie 79,99 US-Dollar für die Standard Edition.",
    status: "bestaetigt",
    channel: "Rockstar / Take-Two",
    observedAt: "2026-06-24",
    sourceIds: ["src-preorder-newswire", "src-taketwo-preorder"],
    related: [{ type: "article", slug: "vorbestellung-preis-release" }],
  },
  {
    id: "sig-bildrate",
    title: "30 Bilder pro Sekunde auf Konsole",
    summary:
      "Eine technische Analyse misst am offiziellen Material rund 30 Bilder pro Sekunde; ein Rockstar-Entwickler nennt gegenueber der Presse denselben Wert. Ein 60-Bild-Modus ist nicht angekuendigt.",
    status: "wahrscheinlich",
    channel: "Fachpresse / Digital Foundry",
    observedAt: "2026-08-28",
    sourceIds: ["src-presse-30fps", "src-digital-foundry"],
    related: [{ type: "article", slug: "dreissig-bilder-pro-sekunde" }],
  },
  {
    id: "sig-unautorisierte-videos",
    title: "Unautorisierte Spielaufnahmen kursieren",
    summary:
      "Rockstar Games hat am 26. August die Echtheit verbreiteter Aufnahmen eingeraeumt; Take-Two hat Auskunftsersuchen eingereicht. Der Vorgang wird berichtet, das Material wird hier nicht gezeigt und nicht als Quelle gefuehrt.",
    status: "bestaetigt",
    channel: "Rockstar Games",
    observedAt: "2026-08-26",
    sourceIds: ["src-rockstar-leak-statement", "src-presse-leaks"],
    related: [{ type: "article", slug: "warum-hier-keine-leaks-stehen" }],
  },
  {
    id: "sig-kartenrekonstruktion",
    title: "Community-Kartenrekonstruktionen gewinnen an Reichweite",
    summary:
      "State of Leonida und die GTA VI Mapping Community aktualisieren ihre Rekonstruktion mit neuem offiziellen Material. Die Karte ist relevant, aber nicht offiziell.",
    status: "hinweis",
    channel: "Community-Mapping",
    observedAt: "2026-08-28",
    sourceIds: [
      "src-state-of-leonida",
      "src-gtaforums-mapping",
      "src-mapping-discord",
    ],
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
 * Zur Spielkarte von Grand Theft Auto VI gibt es keine offiziellen Geodaten.
 * Verortet wird deshalb nur dort, wo ein reales Vorbild nachvollziehbar ist –
 * mit `precision: "grob"` und einer Begründung im Feld `note`. Alles andere
 * bleibt `platzhalter` und wird auf der Karte gesondert ausgewiesen, statt eine
 * Position zu behaupten.
 */
export const mapMarkers: MapMarker[] = [
  {
    id: "mm-leonida",
    slug: "leonida",
    title: "Leonida",
    summary:
      "Der Bundesstaat, in dem Grand Theft Auto VI spielt. Er umfasst die gesamte dargestellte Landmasse.",
    layer: "regionen",
    status: "bestaetigt",
    sourceIds: ["src-rockstar-gta6"],
    updatedAt: "2026-08-01",
    position: {
      ...fromGeo(-81.9, 28.6),
      precision: "grob",
      note: "Der Bundesstaat umfasst die gesamte Landmasse; der Marker sitzt in ihrer Mitte.",
    },
    target: { type: "region", slug: "leonida" },
  },
  {
    id: "mm-vice-city",
    slug: "vice-city",
    title: "Vice City",
    summary: "Metropole des Bundesstaates Leonida.",
    layer: "orte",
    status: "bestaetigt",
    sourceIds: ["src-rockstar-gta6"],
    updatedAt: "2026-08-01",
    position: {
      ...fromGeo(-80.19, 25.77),
      precision: "grob",
      note: "Verortet nach dem realen Vorbild Miami. Rockstar Games hat keine Kartenposition veröffentlicht.",
    },
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
    position: {
      ...fromGeo(-81.1, 24.72),
      precision: "grob",
      note: "Verortet nach dem realen Vorbild der Florida Keys, auf die der Name verweist.",
    },
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
    position: { x: 0.3, y: 0.34, precision: "platzhalter" },
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
