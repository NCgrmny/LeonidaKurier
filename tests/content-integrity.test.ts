import { existsSync } from "node:fs";
import { join } from "node:path";
import { describe, expect, it } from "vitest";
import { abgelehnteBilder, bilder } from "@/content/bilder";
import { brauchtUrhebernennung } from "@/lib/bilder";
import {
  fehlendeBilddateien,
  fotoFuer,
  verfuegbareBilder,
} from "@/lib/content/bildzuordnung";
import { sources } from "@/content/sources";
import { content } from "@/lib/content";
import { COLLECTIONS, entityHref } from "@/lib/content/collections";
import { allEntities } from "@/lib/content/seed-repository";
import { entriesForCollection } from "@/lib/content/queries";
import { RADAR_STATUS } from "@/lib/status";
import { MOTIF_VARIANTS, verteileMotive } from "@/lib/motifs";
import type { RadarStatus } from "@/lib/types";

/**
 * Integritätstests der Inhaltsschicht.
 *
 * Sie sichern die Zusagen der Plattform ab: eindeutige Slugs, gültige Status,
 * auflösbare Quellen und Verweise – und dass keine Kartenposition eine
 * Genauigkeit behauptet, die nicht belegt ist.
 */

const ISO_DATE = /^\d{4}-\d{2}(-\d{2})?$/;

describe("Zusammenfassungen", () => {
  it("sind über alle Sammlungen hinweg eindeutig", async () => {
    // Zwei Einträge mit identischem Text bedeuten fast immer, dass ein Text
    // beim Bearbeiten in den falschen Eintrag gerutscht ist.
    const gesehen = new Map<string, string>();
    // Kartenmarker sind abgeleitete Eintraege mit bewusst knappen,
    // gleichartigen Texten – sie gehoeren nicht in diese Pruefung.
    for (const { type, entity } of allEntities()) {
      if (type === "mapMarker") continue;
      const vorher = gesehen.get(entity.summary);
      expect(
        vorher,
        `"${entity.id}" und "${vorher}" teilen sich dieselbe Zusammenfassung`,
      ).toBeUndefined();
      gesehen.set(entity.summary, entity.id);
    }
  });

  it("sagen mehr als den Titel", async () => {
    for (const { type, entity } of allEntities()) {
      if (type === "mapMarker") continue;
      expect(entity.summary.length, entity.id).toBeGreaterThan(40);
      expect(entity.summary.trim(), entity.id).not.toBe(entity.title);
    }
  });
});

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

  it("behaupten keine Genauigkeit ohne verifizierte In-Game-Daten", async () => {
    // `genau` ist erst nach verifizierten In-Game-Daten zulaessig. Solange das
    // Spiel nicht veroeffentlicht ist, darf kein Marker diese Stufe fuehren.
    const markers = await content.listMapMarkers();
    for (const marker of markers) {
      expect(marker.position.precision).not.toBe("genau");
    }
  });

  it("begruenden jede Verortung, die keine Platzhalterposition ist", async () => {
    // Wer eine Position behauptet, muss sagen, worauf sie beruht.
    const markers = await content.listMapMarkers();
    for (const marker of markers) {
      if (marker.position.precision === "platzhalter") continue;
      expect(marker.position.note, `Marker ${marker.slug} ohne Begruendung`).toBeTruthy();
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

describe("Ausgaben", () => {
  it("verweisen ausschließlich auf vorhandene Beiträge", async () => {
    // Eine Ausgabe speichert nur Verweise. Zeigt ein Verweis ins Leere, fehlt
    // der Ausgabe stillschweigend ihr Aufmacher – das darf nicht passieren.
    const ausgaben = await content.listAusgaben();
    expect(ausgaben.length).toBeGreaterThan(0);

    for (const ausgabe of ausgaben) {
      for (const slug of [ausgabe.aufmacher, ...ausgabe.beitraege]) {
        expect(
          await content.getArticle(slug),
          `Ausgabe Nr. ${ausgabe.nummer} verweist auf "${slug}"`,
        ).not.toBeNull();
      }
    }
  });

  it("führen jeden Beitrag höchstens einmal", async () => {
    const ausgaben = await content.listAusgaben();
    for (const ausgabe of ausgaben) {
      const slugs = [ausgabe.aufmacher, ...ausgabe.beitraege];
      expect(new Set(slugs).size, `Ausgabe Nr. ${ausgabe.nummer}`).toBe(slugs.length);
    }
  });

  it("haben eindeutige Nummern, Slugs und gültige Zeiträume", async () => {
    const ausgaben = await content.listAusgaben();
    expect(new Set(ausgaben.map((a) => a.nummer)).size).toBe(ausgaben.length);
    expect(new Set(ausgaben.map((a) => a.slug)).size).toBe(ausgaben.length);

    for (const ausgabe of ausgaben) {
      expect(ausgabe.von).toMatch(ISO_DATE);
      expect(ausgabe.bis).toMatch(ISO_DATE);
      expect(ausgabe.von <= ausgabe.bis).toBe(true);
    }
  });

  it("werden vollständig aufgelöst ausgeliefert", async () => {
    const [erste] = await content.listAusgaben();
    const aufgeloest = await content.getAusgabeMitBeitraegen(erste.slug);
    expect(aufgeloest).not.toBeNull();
    expect(aufgeloest?.aufmacher?.slug).toBe(erste.aufmacher);
    expect(aufgeloest?.beitraege.map((a) => a.slug)).toEqual(erste.beitraege);
    expect(await content.getAusgabeMitBeitraegen("gibt-es-nicht")).toBeNull();
  });
});

describe("Motivverteilung", () => {
  it("zeigt nie zweimal dieselbe Flaeche nebeneinander", async () => {
    // Zwei identische Bilder nebeneinander lesen sich als Platzhalter.
    const articles = await content.listArticles();
    const zugeteilt = verteileMotive(articles);
    const folge = articles.map((article) => zugeteilt.get(article.slug));

    expect(folge).toHaveLength(articles.length);
    for (let i = 1; i < folge.length; i += 1) {
      expect(folge[i], `Position ${i} wiederholt ${folge[i]}`).not.toBe(folge[i - 1]);
    }
  });

  it("nutzt alle Flaechen, bevor sie eine wiederholt", async () => {
    const articles = await content.listArticles();
    const zugeteilt = verteileMotive(articles);
    const ersten = articles
      .slice(0, MOTIF_VARIANTS.length)
      .map((article) => zugeteilt.get(article.slug));
    expect(new Set(ersten).size).toBe(Math.min(articles.length, MOTIF_VARIANTS.length));
  });

  it("ist bei gleicher Eingabe stabil", async () => {
    const articles = await content.listArticles();
    expect([...verteileMotive(articles)]).toEqual([...verteileMotive(articles)]);
  });
});

describe("Bildbestand", () => {
  it("nennt zu jedem Foto Urheber und Lizenz", () => {
    // Ohne Zuschreibung erlischt eine CC-BY-Lizenz, und § 13 UrhG verlangt
    // die Urhebernennung ohnehin. Ein Bild ohne diese Angaben darf nicht in
    // den Bestand.
    for (const bild of bilder) {
      expect(bild.urheber.trim(), `Bild ${bild.datei} ohne Urheber`).not.toBe("");
      expect(bild.beschreibung.trim(), `Bild ${bild.datei} ohne Beschreibung`).not.toBe("");
      expect(bild.aufnahmeort.trim(), `Bild ${bild.datei} ohne Aufnahmeort`).not.toBe("");
      if (brauchtUrhebernennung(bild.lizenz)) {
        expect(bild.lizenzUrl, `Bild ${bild.datei} ohne Lizenzlink`).toBeTruthy();
        expect(bild.quelleUrl, `Bild ${bild.datei} ohne Quellenlink`).toBeTruthy();
      }
    }
  });

  it("verweist auf eigene Dateien, nicht auf fremde Server", () => {
    // Hotlinking wuerde die Auslieferung fremden Servern ueberlassen und
    // waere bei CC-Bildern zudem eine Nutzung ohne eigene Kopie.
    for (const bild of bilder) {
      expect(bild.datei).not.toMatch(/^https?:/);
      expect(bild.datei).toMatch(/^[a-z0-9-]+\.(jpg|jpeg|png|webp|avif)$/i);
    }
  });

  it("zeigt nur Bilder an, deren Datei vorhanden ist", () => {
    // Der Bestand ist die recherchierte Liste, die Dateien kommen davon
    // unabhaengig hinzu. Angezeigt wird nur, was wirklich da ist – sonst
    // stuende eine kaputte Bildflaeche auf der Seite.
    for (const bild of verfuegbareBilder()) {
      expect(
        existsSync(join(process.cwd(), "public", "bilder", bild.datei)),
        `Datei public/bilder/${bild.datei} fehlt`,
      ).toBe(true);
    }
    for (const bild of fehlendeBilddateien()) {
      expect(fotoFuer(bild.fuer[0])).toBeNull();
    }
  });

  it("benennt den Bezug zum Spielort und behauptet kein Vorbild ohne Beleg", async () => {
    // Ein Foto darf nur dann als Vorbild ausgewiesen werden, wenn der
    // Eintrag selbst ein reales Vorbild nennt. Sonst waere die Bildzeile
    // eine Behauptung ueber das Spiel.
    const orte = await content.listLocations();
    for (const bild of bilder) {
      expect(["vorbild", "region"]).toContain(bild.bezug);
      if (bild.bezug !== "vorbild") continue;
      for (const slug of bild.fuer) {
        const ort = orte.find((eintrag) => eintrag.slug === slug);
        expect(
          ort?.marker?.note ?? "",
          `Bild ${bild.datei} behauptet ein Vorbild, das "${slug}" nicht fuehrt`,
        ).toMatch(/Vorbild/i);
      }
    }
  });

  it("kennzeichnet Bearbeitungen, wo die Lizenz es verlangt", () => {
    // CC BY-SA verlangt, dass eine Bearbeitung kenntlich ist. Die Darstellung
    // beschneidet jedes Bild auf das Seitenverhaeltnis seiner Flaeche.
    for (const bild of bilder) {
      if (bild.lizenz !== "CC BY-SA 4.0" && bild.lizenz !== "CC BY 4.0") continue;
      expect(bild.bearbeitung, `Bild ${bild.datei} ohne Bearbeitungsvermerk`).toBeTruthy();
    }
  });

  it("ordnet jeden Slug hoechstens einem Bild zu", () => {
    const gesehen = new Map<string, string>();
    for (const bild of bilder) {
      for (const slug of bild.fuer) {
        expect(
          gesehen.get(slug),
          `Slug "${slug}" ist ${gesehen.get(slug)} und ${bild.datei} zugeordnet`,
        ).toBeUndefined();
        gesehen.set(slug, bild.datei);
      }
    }
  });

  it("verweist nur auf vorhandene Beitraege oder Eintraege", async () => {
    const bekannt = new Set([
      ...(await content.listArticles()).map((eintrag) => eintrag.slug),
      ...allEntities().map(({ entity }) => entity.slug),
    ]);
    for (const bild of bilder) {
      for (const slug of bild.fuer) {
        expect(bekannt.has(slug), `Bild ${bild.datei} verweist auf "${slug}"`).toBe(true);
      }
    }
  });
});

describe("Abgelehnte Bilder", () => {
  it("bleiben aus dem Bestand heraus", () => {
    // Eine Ablehnung, die nur als Kommentar existiert, geht beim naechsten
    // Rechercheanlauf verloren. Dieser Test macht sie haltbar.
    const imBestand = new Set(bilder.map((bild) => bild.datei));
    for (const abgelehnt of abgelehnteBilder) {
      expect(
        imBestand.has(abgelehnt.datei),
        `${abgelehnt.datei} wurde abgelehnt: ${abgelehnt.grund}`,
      ).toBe(false);
    }
  });

  it("nennen einen Grund und die geprüfte Quelle", () => {
    for (const abgelehnt of abgelehnteBilder) {
      expect(abgelehnt.grund.length).toBeGreaterThan(20);
      expect(abgelehnt.quelleUrl).toMatch(/^https:\/\//);
    }
  });
});
