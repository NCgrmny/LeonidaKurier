/**
 * Domaenenmodell des Leonida Kurier.
 *
 * Das Modell ist bewusst datenbanknah geschnitten: Jede Entitaet besitzt eine
 * stabile ID, einen Slug (fuer indexierbare Detailseiten), einen Radar-Status
 * und Quellenverweise. Die aktuelle Implementierung liest aus der Seed-Schicht
 * (`src/content`), spaeter kann dieselbe Struktur 1:1 aus PostgreSQL kommen –
 * siehe `prisma/schema.prisma` und `src/lib/content/repository.ts`.
 */

/** Verifizierungsgrad einer Information. Kern des Radar-Systems. */
export type RadarStatus =
  | "bestaetigt"
  | "wahrscheinlich"
  | "hinweis"
  | "spekulation"
  | "widerlegt";

/** Einordnung der Verlaesslichkeit einer Quelle. */
export type SourceTier =
  | "offiziell" // Rockstar Games / Take-Two / offizielle Kanaele
  | "medien" // etablierte Fach- und Wirtschaftsmedien
  | "community" // Reddit, X, YouTube, Mapping-Projekte
  | "eigene"; // eigene Recherche der Redaktion

export interface Source {
  id: string;
  /** Bezeichnung, wie sie im Quellenapparat erscheint. */
  title: string;
  /** Herausgeber bzw. Plattform, z. B. "Rockstar Newswire". */
  publisher: string;
  tier: SourceTier;
  url?: string;
  /** ISO-Datum der Veroeffentlichung der Quelle. */
  publishedAt?: string;
  /** Redaktionelle Einordnung: Warum ist diese Quelle belastbar (oder nicht)? */
  note?: string;
}

/** Verweis von einem Inhalt auf eine beliebige andere Entitaet. */
export interface EntityRef {
  type: EntityType;
  slug: string;
}

export type EntityType =
  | "article"
  | "region"
  | "location"
  | "character"
  | "vehicle"
  | "mission"
  | "business"
  | "collectible"
  | "activity"
  | "weapon"
  | "theory"
  | "mapMarker";

/**
 * Bildmotiv eines Inhalts. Die Motive sind eigene grafische Kompositionen
 * (siehe `src/components/art/Scene.tsx`) und tragen die Atmosphäre der Küste,
 * bis dokumentierte offizielle Motive an ihre Stelle treten können.
 */
export type MotifVariant =
  | "skyline-sonnenuntergang"
  | "kuestenstrasse"
  | "nachtviertel"
  | "inselkette"
  | "sumpfland";

/** Gemeinsame Basis aller inhaltlichen Entitaeten. */
export interface BaseEntity {
  id: string;
  slug: string;
  title: string;
  /** Kurzbeschreibung fuer Karten, Listen und Meta-Descriptions. */
  summary: string;
  status: RadarStatus;
  /** IDs aus `sources`. */
  sourceIds: string[];
  /** ISO-Datum der letzten redaktionellen Aktualisierung. */
  updatedAt: string;
  /** Verwandte Inhalte – erzeugt die Verzahnung Kurier ↔ Kompass ↔ Datenbank. */
  related?: EntityRef[];
  /** Bildmotiv für Aufmacher und Karten. */
  motif?: MotifVariant;
  /**
   * Kennzeichnet Beispiel-/Platzhalterinhalte. Wird in der UI sichtbar
   * ausgewiesen, damit nie Platzhalter als Fakt gelesen wird.
   */
  demo?: boolean;
}

export type ArticleCategory =
  | "meldung"
  | "analyse"
  | "einordnung"
  | "hintergrund"
  | "faktencheck";

export interface Article extends BaseEntity {
  /** Unterzeile im Zeitungsstil. */
  standfirst: string;
  category: ArticleCategory;
  author: string;
  publishedAt: string;
  /** Artikeltext als Blockstruktur – bewusst kein HTML im Content. */
  body: ArticleBlock[];
  /** Was gilt als gesichert? */
  facts?: string[];
  /** Redaktionelle Einordnung des Sachverhalts. */
  assessment?: string;
  /** Beobachtete Community-Reaktion (Signal, nicht Beleg). */
  communityReaction?: string;
  /** Steuert die Platzierung als Aufmacher auf der Startseite. */
  lead?: boolean;
  readingMinutes: number;
}

export type ArticleBlock =
  | { type: "paragraph"; text: string }
  | { type: "heading"; text: string }
  | { type: "quote"; text: string; attribution?: string }
  | { type: "list"; items: string[] };

export interface Region extends BaseEntity {
  /** Offizielle bzw. gebraeuchliche Bezeichnung im Spiel. */
  kind: "bundesstaat" | "stadt" | "landschaft" | "inselgruppe" | "gebiet";
  parentSlug?: string;
}

export type LocationCategory =
  | "stadt"
  | "gebiet"
  | "landmarke"
  | "geschaeft"
  | "immobilie"
  | "geheimnis";

export interface GameLocation extends BaseEntity {
  category: LocationCategory;
  regionSlug?: string;
  /** Optionale Kartenposition. Fehlt sie, ist keine Position belegt. */
  marker?: MapMarkerPosition;
}

export interface Character extends BaseEntity {
  role?: string;
  regionSlug?: string;
}

export interface Vehicle extends BaseEntity {
  vehicleClass?: string;
}

export interface Mission extends BaseEntity {
  chapter?: string;
  characterSlugs?: string[];
}

export interface Business extends BaseEntity {
  businessType?: string;
  regionSlug?: string;
}

export interface Collectible extends BaseEntity {
  collectibleType?: string;
  count?: number;
}

export interface Theory extends BaseEntity {
  /** Kurzfassung der These, die geprueft wird. */
  claim: string;
  /** Was spricht dafuer, was dagegen. */
  arguments?: { pro: string[]; contra: string[] };
}

/**
 * Normalisierte Kartenposition (0–1 in beiden Achsen).
 *
 * Bewusst KEIN Weltkoordinatensystem: Es liegen keine offiziellen Geodaten zu
 * Leonida vor. `precision` dokumentiert, wie belastbar eine Position ist.
 */
export interface MapMarkerPosition {
  x: number;
  y: number;
  /**
   * `platzhalter` – keine belegbare Position, wird auf der Karte gesondert
   * behandelt. `grob` – Verortung nach einem nachvollziehbaren realen Vorbild.
   * `genau` – erst nach verifizierten In-Game-Daten zulaessig.
   */
  precision: "platzhalter" | "grob" | "genau";
  /** Begruendung der Verortung. Pflicht, sobald `precision` nicht `platzhalter` ist. */
  note?: string;
}

export type MapLayerId =
  | "regionen"
  | "orte"
  | "geschaefte"
  | "geheimnisse"
  | "community";

export interface MapMarker extends BaseEntity {
  layer: MapLayerId;
  position: MapMarkerPosition;
  /** Verknuepfte Datenbank-Entitaet, die beim Klick geoeffnet wird. */
  target?: EntityRef;
}

/** Eintrag der Archiv-Chronologie. */
export interface TimelineEntry {
  id: string;
  /** ISO-Datum oder Jahresangabe. */
  date: string;
  /** Genauigkeit der Datierung. */
  datePrecision: "tag" | "monat" | "jahr";
  title: string;
  summary: string;
  status: RadarStatus;
  sourceIds: string[];
  related?: EntityRef[];
}

/** Ein Signal aus einer beobachteten Quelle, bevor es redaktionell geprueft ist. */
export interface RadarSignal {
  id: string;
  title: string;
  summary: string;
  status: RadarStatus;
  /** Beobachtungskanal, z. B. "Reddit", "Rockstar Newswire". */
  channel: string;
  observedAt: string;
  sourceIds: string[];
  related?: EntityRef[];
  demo?: boolean;
}
