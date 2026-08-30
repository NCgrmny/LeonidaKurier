/**
 * Bildnachweis-Modell.
 *
 * Der Kurier zeigt nur Bildmaterial, dessen Herkunft und Lizenz er nennen
 * kann. Deshalb gibt es kein Feld "Bild" an einem Beitrag, sondern einen
 * Nachweis: Ohne Urheber und Lizenz existiert das Bild für die Oberfläche
 * nicht. Das ist keine Förmlichkeit – § 13 UrhG verlangt die Urhebernennung,
 * und CC-Lizenzen erlöschen bei fehlender Zuschreibung.
 */
export type Bildlizenz =
  | "CC0"
  | "Public Domain"
  | "CC BY 4.0"
  | "CC BY-SA 4.0"
  | "Eigene Aufnahme";

export interface Pressebild {
  /** Dateiname unterhalb von /public/bilder/. */
  datei: string;
  /** Was zu sehen ist – wird zur Bildunterschrift und zum alt-Text. */
  beschreibung: string;
  /** Ort der Aufnahme. Reale Geografie, kein Spielort. */
  aufnahmeort: string;
  urheber: string;
  lizenz: Bildlizenz;
  /** Seite der Lizenz. Bei eigenen Aufnahmen leer. */
  lizenzUrl?: string;
  /** Seite, von der das Bild stammt. Bei eigenen Aufnahmen leer. */
  quelleUrl?: string;
  /** Jahr der Aufnahme, wenn bekannt. */
  jahr?: number;
  /**
   * Slugs von Beiträgen oder Einträgen, für die dieses Bild passt.
   * Ein Bild kann mehreren zugeordnet sein, ein Slug nur einem Bild –
   * der erste Treffer gewinnt.
   */
  fuer: string[];
}

/** Bildunterschrift mit Pflichtangaben, wie sie unter dem Bild steht. */
export function bildnachweis(bild: Pressebild): string {
  const teile = [bild.aufnahmeort];
  if (bild.jahr) teile.push(String(bild.jahr));
  const ort = teile.join(", ");
  const lizenz =
    bild.lizenz === "Eigene Aufnahme"
      ? "Eigene Aufnahme"
      : `${bild.urheber} · ${bild.lizenz}`;
  return `${ort}. ${lizenz}.`;
}

/** Braucht diese Lizenz eine Urhebernennung? Alle ausser CC0 und PD. */
export function brauchtUrhebernennung(lizenz: Bildlizenz): boolean {
  return lizenz !== "CC0" && lizenz !== "Public Domain";
}
