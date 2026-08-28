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
    url: "https://www.rockstargames.com/VI/",
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
    url: "https://www.rockstargames.com/VI/videos/trailer2",
    publishedAt: "2025-05-06",
    note: "Zweiter offizieller Trailer mit weiteren Schauplätzen.",
  },
  {
    id: "src-taketwo-ir",
    title: "Take-Two Interactive – Investor Relations",
    publisher: "Take-Two Interactive",
    tier: "offiziell",
    url: "https://www.take2games.com/ir",
    note: "Verbindliche Aussagen zu Terminen und Geschäftszahlen.",
  },
  {
    id: "src-extended-look",
    title: "Grand Theft Auto VI: An Extended Look",
    publisher: "Rockstar Newswire",
    tier: "offiziell",
    url: "https://www.rockstargames.com/newswire/article/4k138k8okkk483/grand-theft-auto-vi-an-extended-look-now-playing",
    publishedAt: "2026-08-27",
    note: "Offizielle Rockstar-Veröffentlichung und Primärquelle zum neuen Langformat.",
  },
  {
    id: "src-extended-look-watch",
    title: "Grand Theft Auto VI: An Extended Look – Watch",
    publisher: "Rockstar Games",
    tier: "offiziell",
    url: "https://www.rockstargames.com/VI/en-US/an-extended-look",
    publishedAt: "2026-08-27",
    note: "Offizielle Videoseite. Rockstar weist das Material vollständig als In-Game-Aufnahmen von PlayStation 5 aus.",
  },
  {
    id: "src-rockstar-screenshots",
    title: "Grand Theft Auto VI – offizielle Screenshots",
    publisher: "Rockstar Games",
    tier: "offiziell",
    url: "https://www.rockstargames.com/VI/media/screenshots",
    note: "Offizieller Medienbereich mit 70 herunterladbaren Screenshots.",
  },
  {
    id: "src-preorder-newswire",
    title: "Pre-Order Grand Theft Auto VI on June 25",
    publisher: "Rockstar Newswire",
    tier: "offiziell",
    url: "https://www.rockstargames.com/newswire/article/5171972o3ak5oa/pre-order-grand-theft-auto-vi-on-june-25",
    publishedAt: "2026-06-24",
    note: "Offizielle Ankündigung des Vorbestellstarts.",
  },
  {
    id: "src-taketwo-preorder",
    title: "Rockstar Games Announces Pre-Orders for Grand Theft Auto VI",
    publisher: "Take-Two Interactive",
    tier: "offiziell",
    url: "https://www.take2games.com/ir/news/rockstar-games-announces-pre-orders-grand-theft-auto-vi",
    publishedAt: "2026-06-24",
    note: "Unternehmensmitteilung mit Preisangabe zur Standard Edition.",
  },
  {
    id: "src-state-of-leonida",
    title: "State of Leonida – Interactive Map",
    publisher: "GTA VI Mapping Community",
    tier: "community",
    url: "https://map.stateofleonida.net/?lang=en",
    note: "Community-Rekonstruktion aus offiziellem Material; keine offizielle Rockstar-Karte.",
  },
  {
    id: "src-gtaforums-mapping",
    title: "Mapping Vice City – Map Discussion Thread",
    publisher: "GTAForums",
    tier: "community",
    url: "https://gtaforums.com/topic/985670-mapping-vice-city-map-discussion-thread-no-leak-footage-allowed/",
    note: "Öffentliche Methodendiskussion der Mapping Community; Signal- und Recherchequelle.",
  },
  {
    id: "src-mapping-discord",
    title: "GTA VI Mapping Community",
    publisher: "Discord",
    tier: "community",
    url: "https://discord.com/invite/gtamapping",
    note: "Arbeitsraum der Mapping Community; einzelne Angaben benötigen zusätzliche Prüfung.",
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
