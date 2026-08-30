import type {
  Article,
  Ausgabe,
  BaseEntity,
  Business,
  Character,
  Collectible,
  EntityRef,
  GameLocation,
  MapMarker,
  Mission,
  RadarSignal,
  Region,
  Source,
  Theory,
  TimelineEntry,
  Vehicle,
} from "@/lib/types";

/**
 * Zugriffsschicht auf alle Inhalte.
 *
 * Alle Methoden sind asynchron, damit die aktuelle Seed-Implementierung später
 * ohne Änderung an den Seiten gegen eine PostgreSQL-Implementierung getauscht
 * werden kann (siehe `prisma/schema.prisma`).
 */
export interface ContentRepository {
  listArticles(options?: { limit?: number }): Promise<Article[]>;
  getLeadArticle(): Promise<Article | null>;
  getArticle(slug: string): Promise<Article | null>;

  /** Ausgaben des Leonida Blatts, neueste zuerst. */
  listAusgaben(): Promise<Ausgabe[]>;
  getAusgabe(slug: string): Promise<Ausgabe | null>;
  /**
   * Löst eine Ausgabe zu ihren tatsächlichen Beiträgen auf. Fehlende Slugs
   * werden übersprungen, damit ein umbenannter Beitrag keine Seite zerstört.
   */
  getAusgabeMitBeitraegen(slug: string): Promise<AufgeloesteAusgabe | null>;

  listRadarSignals(): Promise<RadarSignal[]>;

  listRegions(): Promise<Region[]>;
  listLocations(): Promise<GameLocation[]>;
  listCharacters(): Promise<Character[]>;
  listVehicles(): Promise<Vehicle[]>;
  listMissions(): Promise<Mission[]>;
  listBusinesses(): Promise<Business[]>;
  listCollectibles(): Promise<Collectible[]>;
  listTheories(): Promise<Theory[]>;

  listMapMarkers(): Promise<MapMarker[]>;
  listTimeline(): Promise<TimelineEntry[]>;

  listSources(): Promise<Source[]>;
  getSources(ids: string[]): Promise<Source[]>;

  /** Löst einen Verweis auf einen darstellbaren Eintrag auf. */
  resolveRef(ref: EntityRef): Promise<ResolvedRef | null>;
}

export interface AufgeloesteAusgabe {
  ausgabe: Ausgabe;
  aufmacher: Article | null;
  beitraege: Article[];
}

export interface ResolvedRef {
  ref: EntityRef;
  href: string;
  title: string;
  summary: string;
  entity: BaseEntity;
}
