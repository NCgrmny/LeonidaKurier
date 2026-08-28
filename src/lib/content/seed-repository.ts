import { articles } from "@/content/articles";
import { mapMarkers, radarSignals } from "@/content/radar";
import { sources } from "@/content/sources";
import { timeline } from "@/content/timeline";
import {
  businesses,
  characters,
  collectibles,
  locations,
  missions,
  regions,
  theories,
  vehicles,
} from "@/content/world";
import type { BaseEntity, EntityRef, EntityType } from "@/lib/types";
import { entityHref } from "./collections";
import type { ContentRepository, ResolvedRef } from "./repository";

function byDateDesc<T extends { publishedAt?: string; updatedAt?: string }>(
  a: T,
  b: T,
): number {
  const left = a.publishedAt ?? a.updatedAt ?? "";
  const right = b.publishedAt ?? b.updatedAt ?? "";
  return right.localeCompare(left);
}

const entityIndex: Record<EntityType, BaseEntity[]> = {
  article: articles,
  region: regions,
  location: locations,
  character: characters,
  vehicle: vehicles,
  mission: missions,
  business: businesses,
  collectible: collectibles,
  activity: [],
  weapon: [],
  theory: theories,
  mapMarker: mapMarkers,
};

/**
 * Implementierung des Repository-Interfaces auf Basis der versionierten
 * Seed-Inhalte. Sie ist synchron im Kern, gibt aber Promises zurück, damit der
 * spätere Wechsel auf PostgreSQL keine Seitenänderung erfordert.
 */
export const seedRepository: ContentRepository = {
  async listArticles({ limit } = {}) {
    const sorted = [...articles].sort(byDateDesc);
    return limit ? sorted.slice(0, limit) : sorted;
  },

  async getLeadArticle() {
    const sorted = [...articles].sort(byDateDesc);
    return sorted.find((article) => article.lead) ?? sorted[0] ?? null;
  },

  async getArticle(slug) {
    return articles.find((article) => article.slug === slug) ?? null;
  },

  async listRadarSignals() {
    return [...radarSignals].sort((a, b) => b.observedAt.localeCompare(a.observedAt));
  },

  async listRegions() {
    return regions;
  },
  async listLocations() {
    return locations;
  },
  async listCharacters() {
    return characters;
  },
  async listVehicles() {
    return vehicles;
  },
  async listMissions() {
    return missions;
  },
  async listBusinesses() {
    return businesses;
  },
  async listCollectibles() {
    return collectibles;
  },
  async listTheories() {
    return theories;
  },

  async listMapMarkers() {
    return mapMarkers;
  },

  async listTimeline() {
    return [...timeline].sort((a, b) => a.date.localeCompare(b.date));
  },

  async listSources() {
    return sources;
  },

  async getSources(ids) {
    return ids
      .map((id) => sources.find((source) => source.id === id))
      .filter((source): source is (typeof sources)[number] => Boolean(source));
  },

  async resolveRef(ref: EntityRef): Promise<ResolvedRef | null> {
    const entity = entityIndex[ref.type]?.find((item) => item.slug === ref.slug);
    if (!entity) return null;
    return {
      ref,
      entity,
      href: entityHref(ref.type, ref.slug),
      title: entity.title,
      summary: entity.summary,
    };
  },
};

/** Alle Entitäten – wird für Sitemap und Integritätstests benötigt. */
export function allEntities(): { type: EntityType; entity: BaseEntity }[] {
  return (Object.keys(entityIndex) as EntityType[]).flatMap((type) =>
    entityIndex[type].map((entity) => ({ type, entity })),
  );
}
