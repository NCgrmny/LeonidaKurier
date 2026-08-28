import { seedRepository } from "./seed-repository";
import type { ContentRepository } from "./repository";

/**
 * Einstiegspunkt für alle Seiten.
 *
 * Phase 1 liest aus der versionierten Seed-Schicht. Sobald `DATABASE_URL`
 * gesetzt ist und eine Postgres-Implementierung vorliegt, wird sie hier
 * eingehängt – die Seiten bleiben unverändert.
 */
export const content: ContentRepository = seedRepository;

export type { ContentRepository, ResolvedRef } from "./repository";
export { COLLECTIONS, collectionBySlug, collectionByType, entityHref } from "./collections";
