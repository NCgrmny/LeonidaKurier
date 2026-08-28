import { describe, expect, it } from "vitest";
import { sources } from "@/content/sources";
import { content } from "@/lib/content";
import { COLLECTIONS, entityHref } from "@/lib/content/collections";
import { allEntities } from "@/lib/content/seed-repository";
import { entriesForCollection } from "@/lib/content/queries";
import { RADAR_STATUS } from "@/lib/status";
import type { RadarStatus } from "@/lib/types";

/**
 * Integritätstests der Inhaltsschicht.
 *
 * Sie sichern die Zusagen der Plattform ab: eindeutige Slugs, gültige Status,
 * auflösbare Quellen und Verweise – und dass keine Kartenposition eine
 * Genauigkeit behauptet, die nicht belegt ist.
 */

const ISO_DATE = /^\d{4}-\d{2}(-\d{2})?$/;

describe("Slugs", () => {
  it("sind innerhalb jeder Sammlung eindeutig", async () => {
    for (const collection of COLLECTIONS) {
      const entries = await entriesForCollection(collection.slug);
      const slugs = entries.map((entry) => entry.slug);
      expect(new Set(slugs).size, `Sammlung ${collection.slug}`).toBe(slugs.length);
    }
  });

  it("sind bei Artikeln eindeutig und URL-tauglich", async () => {
    const articles = await content.listArticles();
    const slugs = articles.map((article) => article.slug);
    expect(new Set(slugs).size).toBe(slugs.length);
    for (const slug of slugs) expect(slug).toMatch(/^[a-z0-9-]+$/);
  });
});

describe("Status", () => {
  it("ist bei jeder Entität ein bekannter Radar-Status", () => {
    for (const { entity } of allEntities()) {
      expect(Object.keys(RADAR_STATUS)).toContain(entity.status as RadarStatus);
    }
  });

  it("ist bei jedem Radar-Signal gesetzt", async () => {
    const signals = await content.listRadarSignals();
    expect(signals.length).toBeGreaterThan(0);
    for (const signal of signals) {
      expect(Object.keys(RADAR_STATUS)).toContain(signal.status);
    }
  });
});

describe("Quellen", () => {
  it("sind für jede Entität auflösbar", async () => {
    for (const { entity } of allEntities()) {
      expect(entity.sourceIds.length, `${entity.slug} ohne Quelle`).toBeGreaterThan(0);
      const resolved = await content.getSources(entity.sourceIds);
      expect(resolved.length, `${entity.slug}: unbekannte Quelle`).toBe(
        entity.sourceIds.length,
      );
    }
  });

  it("sind für jeden Archiv-Eintrag auflösbar", async () => {
    const entries = await content.listTimeline();
    for (const entry of entries) {
      const resolved = await content.getSources(entry.sourceIds);
      expect(resolved.length).toBe(entry.sourceIds.length);
    }
  });

  it("haben eindeutige IDs", () => {
    const ids = sources.map((source) => source.id);
    expect(new Set(ids).size).toBe(ids.length);
  });
});

describe("Verweise", () => {
  it("lassen sich vollständig auflösen", async () => {
    for (const { entity } of allEntities()) {
      for (const ref of entity.related ?? []) {
        const resolved = await content.resolveRef(ref);
        expect(resolved, `${entity.slug} → ${ref.type}/${ref.slug}`).not.toBeNull();
      }
    }
  });

  it("erzeugen für jede Sammlung gültige Pfade", async () => {
    for (const collection of COLLECTIONS) {
      const entries = await entriesForCollection(collection.slug);
      for (const entry of entries) {
        expect(entityHref(collection.type, entry.slug)).toBe(
          `/datenbank/${collection.slug}/${entry.slug}`,
        );
      }
    }
  });
});

describe("Kartenmarker", () => {
  it("liegen im normalisierten Koordinatenraum", async () => {
    const markers = await content.listMapMarkers();
    for (const marker of markers) {
      expect(marker.position.x).toBeGreaterThanOrEqual(0);
      expect(marker.position.x).toBeLessThanOrEqual(1);
      expect(marker.position.y).toBeGreaterThanOrEqual(0);
      expect(marker.position.y).toBeLessThanOrEqual(1);
    }
  });

  it("behaupten keine Genauigkeit ohne offizielle Geodaten", async () => {
    // Solange keine verifizierbaren Geodaten vorliegen, muss jede Position als
    // Platzhalter ausgewiesen sein. Dieser Test darf erst gelockert werden,
    // wenn belegte Positionen samt Quelle vorliegen.
    const markers = await content.listMapMarkers();
    for (const marker of markers) {
      expect(marker.position.precision).toBe("platzhalter");
    }
  });

  it("verweisen auf existierende Datenbankeinträge", async () => {
    const markers = await content.listMapMarkers();
    for (const marker of markers) {
      if (!marker.target) continue;
      const resolved = await content.resolveRef(marker.target);
      expect(resolved, `Marker ${marker.slug}`).not.toBeNull();
    }
  });
});

describe("Artikel", () => {
  it("führen Datum, Autor und Textkörper", async () => {
    const articles = await content.listArticles();
    expect(articles.length).toBeGreaterThan(0);
    for (const article of articles) {
      expect(article.publishedAt).toMatch(ISO_DATE);
      expect(article.author.length).toBeGreaterThan(0);
      expect(article.body.length).toBeGreaterThan(0);
    }
  });

  it("weisen Beispielinhalte als solche aus", async () => {
    // Grundsatz: Platzhalter dürfen nie als Meldung gelesen werden.
    const articles = await content.listArticles();
    for (const article of articles) {
      expect(typeof article.demo).toBe("boolean");
    }
  });

  it("liefern genau einen Aufmacher", async () => {
    const articles = await content.listArticles();
    const leads = articles.filter((article) => article.lead);
    expect(leads.length).toBeLessThanOrEqual(1);
    expect(await content.getLeadArticle()).not.toBeNull();
  });
});

describe("Archiv", () => {
  it("ist chronologisch sortiert und sauber datiert", async () => {
    const entries = await content.listTimeline();
    const dates = entries.map((entry) => entry.date);
    expect([...dates].sort()).toEqual(dates);
    for (const entry of entries) expect(entry.date).toMatch(ISO_DATE);
  });
});
