import type { EntityType, RadarStatus } from "@/lib/types";
import { content } from "./index";
import { COLLECTIONS, entityHref } from "./collections";
import { entriesForCollection } from "./queries";

/**
 * Suche über alle Bereiche.
 *
 * Bewusst keine Suchmaschine als Abhängigkeit: Der Bestand ist klein genug,
 * dass ein serverseitiger Durchlauf schneller ist als jeder Index-Aufbau – und
 * er bleibt nachvollziehbar. Kommt später eine Datenbank hinter das Repository,
 * wandert diese Funktion in eine Volltextabfrage, ohne dass die Oberfläche
 * etwas davon merkt.
 */

export interface SearchHit {
  type: EntityType | "radar";
  /** Anzeigename der Herkunft, z. B. „Orte“ oder „Kurier“. */
  bereich: string;
  title: string;
  summary: string;
  href: string;
  status: RadarStatus;
  /** Trefferstärke – höher ist besser. */
  score: number;
}

/** Zerlegt die Eingabe in einzelne, normalisierte Begriffe. */
function begriffe(query: string): string[] {
  return query
    .toLowerCase()
    .normalize("NFD")
    .replace(/[̀-ͯ]/g, "")
    .split(/[^a-z0-9äöüß]+/i)
    .filter((teil) => teil.length >= 2);
}

function normalisiert(text: string): string {
  return text
    .toLowerCase()
    .normalize("NFD")
    .replace(/[̀-ͯ]/g, "");
}

/**
 * Bewertet einen Eintrag gegen die Suchbegriffe.
 *
 * Ein Treffer im Titel wiegt schwerer als einer im Text, und ein Titel, der
 * mit dem Begriff beginnt, schwerer als einer, der ihn irgendwo enthält.
 * Gefordert wird, dass jeder Begriff irgendwo vorkommt – sonst liefert eine
 * Suche nach zwei Wörtern alles, was eines davon enthält.
 */
function bewerte(titel: string, text: string, terms: string[]): number {
  const t = normalisiert(titel);
  const b = normalisiert(text);
  let score = 0;

  for (const term of terms) {
    const imTitel = t.includes(term);
    const imText = b.includes(term);
    if (!imTitel && !imText) return 0;
    if (t.startsWith(term)) score += 12;
    else if (imTitel) score += 7;
    if (imText) score += 2;
  }

  // Exakte Titelgleichheit schlägt alles andere.
  if (t === normalisiert(terms.join(" "))) score += 25;
  return score;
}

export async function suche(query: string, limit = 40): Promise<SearchHit[]> {
  const terms = begriffe(query);
  if (terms.length === 0) return [];

  const treffer: SearchHit[] = [];

  const artikel = await content.listArticles();
  for (const eintrag of artikel) {
    const text = [eintrag.standfirst, eintrag.summary, ...(eintrag.facts ?? [])].join(" ");
    const score = bewerte(eintrag.title, text, terms);
    if (score > 0) {
      treffer.push({
        type: "article",
        bereich: "Kurier",
        title: eintrag.title,
        summary: eintrag.standfirst,
        href: entityHref("article", eintrag.slug),
        status: eintrag.status,
        score,
      });
    }
  }

  for (const sammlung of COLLECTIONS) {
    const eintraege = await entriesForCollection(sammlung.slug);
    for (const eintrag of eintraege) {
      const score = bewerte(eintrag.title, eintrag.summary, terms);
      if (score > 0) {
        treffer.push({
          type: sammlung.type,
          bereich: sammlung.label,
          title: eintrag.title,
          summary: eintrag.summary,
          href: entityHref(sammlung.type, eintrag.slug),
          status: eintrag.status,
          score,
        });
      }
    }
  }

  const signale = await content.listRadarSignals();
  for (const signal of signale) {
    const score = bewerte(signal.title, signal.summary, terms);
    if (score > 0) {
      treffer.push({
        type: "radar",
        bereich: "Radar",
        title: signal.title,
        summary: signal.summary,
        href: "/radar",
        status: signal.status,
        score,
      });
    }
  }

  return treffer.sort((a, b) => b.score - a.score || a.title.localeCompare(b.title)).slice(0, limit);
}
