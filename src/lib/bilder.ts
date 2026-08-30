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

/**
 * Wie stark ist der Bezug zum Spielort?
 *
 * `vorbild` – der Eintrag nennt genau diesen realen Ort als Vorbild; die
 * Zuordnung steht in unseren eigenen Daten (Feld `note` am Marker).
 * `region` – die Aufnahme stammt aus derselben Landschaft, ohne dass ein
 * Vorbild belegt wäre. Ein Waldbild aus Nordflorida ist kein Beleg dafür,
 * wie ein Nationalpark im Spiel aussieht.
 *
 * Der Unterschied steht sichtbar unter dem Bild. Er ist der Grund, warum
 * dieses Feld Pflicht ist und keinen Vorgabewert hat.
 */
export type Bildbezug = "vorbild" | "region";

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
  /** Belegter Vorbildbezug oder nur dieselbe Region. */
  bezug: Bildbezug;
  /**
   * Bearbeitungsvermerk. Die Darstellung beschneidet jedes Bild auf das
   * Seitenverhältnis der Fläche; bei CC-BY-SA gehört das in den Nachweis.
   */
  bearbeitung?: string;
  /**
   * Slugs von Beiträgen oder Einträgen, für die dieses Bild passt.
   * Ein Bild kann mehreren zugeordnet sein, ein Slug nur einem Bild –
   * der erste Treffer gewinnt.
   */
  fuer: string[];
}

/** Bildunterschrift mit Pflichtangaben, wie sie unter dem Bild steht. */
export function bildnachweis(bild: Pressebild): string {
  const ort = bild.jahr ? `${bild.aufnahmeort}, ${bild.jahr}` : bild.aufnahmeort;
  const lizenz =
    bild.lizenz === "Eigene Aufnahme"
      ? "Eigene Aufnahme"
      : `${bild.urheber} · ${bild.lizenz}`;
  const bearbeitung = bild.bearbeitung ? ` ${bild.bearbeitung}.` : "";
  return `${ort}. ${lizenz}.${bearbeitung}`;
}

/**
 * Der Satz, der den Bezug zum Spiel klärt. Er steht unter jedem Foto, weil
 * ein Bild sonst als Aufnahme aus dem Spiel gelesen werden kann.
 */
export function bezugshinweis(bild: Pressebild): string {
  return bild.bezug === "vorbild"
    ? "Reale Aufnahme des im Eintrag genannten Vorbilds · kein Material aus Grand Theft Auto VI"
    : "Reale Aufnahme aus derselben Landschaft · kein belegtes Vorbild, kein Material aus Grand Theft Auto VI";
}

/** Braucht diese Lizenz eine Urhebernennung? Alle ausser CC0 und PD. */
export function brauchtUrhebernennung(lizenz: Bildlizenz): boolean {
  return lizenz !== "CC0" && lizenz !== "Public Domain";
}
