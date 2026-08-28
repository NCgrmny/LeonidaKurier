import type { BaseEntity, EntityRef, RadarStatus } from "@/lib/types";
import { content } from "./index";
import type { ResolvedRef } from "./repository";

/** Löst eine Liste von Verweisen auf und verwirft nicht auflösbare Einträge. */
export async function resolveRefs(refs: EntityRef[] = []): Promise<ResolvedRef[]> {
  const resolved = await Promise.all(refs.map((ref) => content.resolveRef(ref)));
  return resolved.filter((entry): entry is ResolvedRef => entry !== null);
}

/** Gruppiert beliebige Einträge nach Radar-Status. */
export function groupByStatus<T extends { status: RadarStatus }>(
  items: T[],
): Record<RadarStatus, T[]> {
  const groups: Record<RadarStatus, T[]> = {
    bestaetigt: [],
    wahrscheinlich: [],
    hinweis: [],
    spekulation: [],
    widerlegt: [],
  };
  for (const item of items) groups[item.status].push(item);
  return groups;
}

/** Zählt die Einträge je Sammlung – für die Datenbank-Übersicht. */
export async function collectionCounts(): Promise<Record<string, number>> {
  const [
    regions,
    locations,
    characters,
    vehicles,
    missions,
    businesses,
    collectibles,
    theories,
  ] = await Promise.all([
    content.listRegions(),
    content.listLocations(),
    content.listCharacters(),
    content.listVehicles(),
    content.listMissions(),
    content.listBusinesses(),
    content.listCollectibles(),
    content.listTheories(),
  ]);

  return {
    regionen: regions.length,
    orte: locations.length,
    charaktere: characters.length,
    fahrzeuge: vehicles.length,
    missionen: missions.length,
    geschaefte: businesses.length,
    geheimnisse: collectibles.length,
    theorien: theories.length,
  };
}

/** Liefert die Einträge einer Sammlung anhand ihres URL-Slugs. */
export async function entriesForCollection(slug: string): Promise<BaseEntity[]> {
  switch (slug) {
    case "regionen":
      return content.listRegions();
    case "orte":
      return content.listLocations();
    case "charaktere":
      return content.listCharacters();
    case "fahrzeuge":
      return content.listVehicles();
    case "missionen":
      return content.listMissions();
    case "geschaefte":
      return content.listBusinesses();
    case "geheimnisse":
      return content.listCollectibles();
    case "theorien":
      return content.listTheories();
    default:
      return [];
  }
}
