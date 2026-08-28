import type { TimelineEntry } from "@/lib/types";

/**
 * Archiv-Chronologie: Wie hat sich der öffentlich belegbare Wissensstand zu
 * Grand Theft Auto VI entwickelt?
 *
 * Aufgenommen werden nur Ereignisse, die öffentlich dokumentiert sind. Zu
 * Vorgängen rund um unrechtmäßig verbreitetes Material wird das Ereignis als
 * solches eingeordnet – Inhalte daraus werden weder gezeigt noch ausgewertet.
 */
export const timeline: TimelineEntry[] = [
  {
    id: "tl-2022-ankuendigung",
    date: "2022-02-04",
    datePrecision: "tag",
    title: "Rockstar Games bestätigt die Entwicklung",
    summary:
      "Rockstar Games bestätigt öffentlich, dass die Arbeit am nächsten Teil der Grand-Theft-Auto-Reihe läuft. Details zu Setting oder Figuren werden nicht genannt.",
    status: "bestaetigt",
    sourceIds: ["src-rockstar-newswire"],
  },
  {
    id: "tl-2022-leak",
    date: "2022-09",
    datePrecision: "monat",
    title: "Unrechtmäßig verbreitetes Entwicklungsmaterial",
    summary:
      "Umfangreiches, nicht freigegebenes Entwicklungsmaterial gelangt an die Öffentlichkeit. Der Leonida Kurier wertet dieses Material weder aus noch verlinkt er darauf; erfasst wird ausschließlich das Ereignis selbst.",
    status: "bestaetigt",
    sourceIds: ["src-rockstar-newswire"],
  },
  {
    id: "tl-2023-trailer1",
    date: "2023-12-04",
    datePrecision: "tag",
    title: "Trailer 1: Leonida, Vice City, Lucia und Jason",
    summary:
      "Mit dem ersten offiziellen Trailer bestätigt Rockstar Games den Bundesstaat Leonida als Schauplatz sowie die beiden Hauptfiguren. Erstmals liegt eine belastbare Primärquelle zum Setting vor.",
    status: "bestaetigt",
    sourceIds: ["src-trailer-1", "src-rockstar-gta6"],
    related: [
      { type: "region", slug: "leonida" },
      { type: "character", slug: "lucia-caminos" },
      { type: "character", slug: "jason-duval" },
    ],
  },
  {
    id: "tl-2025-trailer2",
    date: "2025-05-06",
    datePrecision: "tag",
    title: "Trailer 2 erweitert den bestätigten Schauplatzbestand",
    summary:
      "Der zweite offizielle Trailer zeigt weitere Schauplätze des Bundesstaates und ergänzt das Umfeld der beiden Hauptfiguren.",
    status: "bestaetigt",
    sourceIds: ["src-trailer-2"],
    related: [
      { type: "location", slug: "port-gellhorn" },
      { type: "location", slug: "grassrivers" },
    ],
  },
  {
    id: "tl-2026-plattform",
    date: "2026-08",
    datePrecision: "monat",
    title: "Leonida Kurier startet",
    summary:
      "Die Plattform geht mit Kurier, Radar, Kompass, Datenbank und Archiv in der ersten Ausbaustufe an den Start. Das Archiv wird fortlaufend um belegte Ereignisse ergänzt.",
    status: "bestaetigt",
    sourceIds: ["src-redaktion"],
  },
];
