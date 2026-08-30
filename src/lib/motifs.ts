import type { MotifVariant } from "./types";

/** Alle Motivflächen in fester Reihenfolge – bestimmt die Ersatzwahl. */
export const MOTIF_VARIANTS: MotifVariant[] = [
  "skyline-sonnenuntergang",
  "kuestenstrasse",
  "nachtviertel",
  "inselkette",
  "sumpfland",
];

/** Ableitung aus dem Slug, wenn ein Beitrag kein eigenes Motiv führt. */
export function motifFromSlug(slug: string): MotifVariant {
  const sum = [...slug].reduce((total, char) => total + char.charCodeAt(0), 0);
  return MOTIF_VARIANTS[sum % MOTIF_VARIANTS.length];
}

/**
 * Verteilt Motive über eine Liste, die gemeinsam auf einer Seite steht.
 *
 * Es gibt fünf Motivflächen und mehr Beiträge – Wiederholungen sind also
 * unvermeidlich. Unmittelbar nebeneinander darf dieselbe Fläche trotzdem nicht
 * zweimal erscheinen: zwei identische Bilder nebeneinander lesen sich als
 * Platzhalter, nicht als Bebilderung.
 *
 * Deshalb bekommt jeder Beitrag zunächst sein eigenes Motiv. Wiederholt es
 * sich in dieser Auswahl, weicht der spätere Beitrag auf die bisher am
 * seltensten verwendete Fläche aus – bei Gleichstand auf die in
 * `MOTIF_VARIANTS` zuerst genannte. Das Ergebnis haengt allein von der
 * uebergebenen Liste ab, ist also bei jedem Aufruf und auf Server wie Client
 * identisch.
 */
export function verteileMotive<T extends { slug: string; motif?: MotifVariant }>(
  eintraege: T[],
): Map<string, MotifVariant> {
  const zugeteilt = new Map<string, MotifVariant>();
  const anzahl = new Map<MotifVariant, number>(
    MOTIF_VARIANTS.map((variant) => [variant, 0]),
  );
  let vorheriges: MotifVariant | null = null;

  for (const eintrag of eintraege) {
    const gewuenscht = eintrag.motif ?? motifFromSlug(eintrag.slug);
    const frei: boolean = anzahl.get(gewuenscht) === 0 && gewuenscht !== vorheriges;

    const motiv: MotifVariant = frei
      ? gewuenscht
      : MOTIF_VARIANTS.filter((variant) => variant !== vorheriges).reduce(
          (beste, variant) =>
            (anzahl.get(variant) ?? 0) < (anzahl.get(beste) ?? 0) ? variant : beste,
        );

    zugeteilt.set(eintrag.slug, motiv);
    anzahl.set(motiv, (anzahl.get(motiv) ?? 0) + 1);
    vorheriges = motiv;
  }

  return zugeteilt;
}
