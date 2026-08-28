import type { Source } from "@/lib/types";

/**
 * Quellenverzeichnis.
 *
 * Grundsatz der Plattform: Fremde Artikel und Community-Beitraege werden nicht
 * gespiegelt, sondern verlinkt und eingeordnet. Reddit, X und YouTube gelten
 * als Signalquellen, nicht automatisch als Beleg.
 */
export const sources: Source[] = [
  {
    id: "src-rockstar-gta6",
    title: "Offizielle Grand-Theft-Auto-VI-Seite",
    publisher: "Rockstar Games",
    tier: "offiziell",
    url: "https://www.rockstargames.com/gta-vi",
    note: "Primärquelle für alles, was als bestätigt gilt.",
  },
  {
    id: "src-rockstar-newswire",
    title: "Rockstar Newswire",
    publisher: "Rockstar Games",
    tier: "offiziell",
    url: "https://www.rockstargames.com/newswire",
    note: "Offizieller Ankündigungskanal des Entwicklers.",
  },
  {
    id: "src-trailer-1",
    title: "Grand Theft Auto VI – Trailer 1",
    publisher: "Rockstar Games",
    tier: "offiziell",
    url: "https://www.youtube.com/watch?v=QdBZY2fkU-0",
    publishedAt: "2023-12-04",
    note: "Erste offizielle Bewegtbildquelle zu Setting und Hauptfiguren.",
  },
  {
    id: "src-trailer-2",
    title: "Grand Theft Auto VI – Trailer 2",
    publisher: "Rockstar Games",
    tier: "offiziell",
    url: "https://www.rockstargames.com/newswire",
    publishedAt: "2025-05-06",
    note: "Zweiter offizieller Trailer mit weiteren Schauplätzen.",
  },
  {
    id: "src-taketwo-ir",
    title: "Take-Two Interactive – Investor Relations",
    publisher: "Take-Two Interactive",
    tier: "offiziell",
    url: "https://ir.take2games.com",
    note: "Verbindliche Aussagen zu Terminen und Geschäftszahlen.",
  },
  {
    id: "src-community-signal",
    title: "Community-Signal (Sammelquelle)",
    publisher: "Reddit / X / YouTube",
    tier: "community",
    note: "Aggregiertes Community-Aufkommen. Signal für die Recherche, kein Beleg.",
  },
  {
    id: "src-redaktion",
    title: "Eigene Recherche der Redaktion",
    publisher: "Leonida Kurier",
    tier: "eigene",
    note: "Eigenständige Auswertung und Einordnung öffentlich zugänglicher Quellen.",
  },
];

export const sourceById = new Map(sources.map((source) => [source.id, source]));
