import { existsSync } from "node:fs";
import { join } from "node:path";
import { bilder } from "@/content/bilder";
import type { Pressebild } from "@/lib/bilder";

/**
 * Bilder, deren Datei tatsächlich im Repository liegt.
 *
 * Der Bestand in `src/content/bilder.ts` ist die recherchierte und
 * lizenzgeprüfte Liste; die Dateien kommen davon unabhängig hinzu. Damit ein
 * fehlendes Bild keine kaputte Fläche erzeugt, prüft diese Stelle beim Bauen,
 * was da ist – die Oberfläche fällt sonst auf Standortkarte oder Satzplatte
 * zurück.
 *
 * Praktischer Nebeneffekt: Wer eine Datei nach `public/bilder/` legt und neu
 * baut, sieht sie sofort. Es ist keine Codeänderung nötig.
 *
 * Läuft nur auf dem Server. Die Aufrufer sind Server-Komponenten; ein
 * Client-Bundle darf diese Datei nicht importieren.
 */
const verfuegbar = bilder.filter((bild) =>
  existsSync(join(process.cwd(), "public", "bilder", bild.datei)),
);

/** Alle einsatzbereiten Bilder. */
export function verfuegbareBilder(): Pressebild[] {
  return verfuegbar;
}

/** Bilder, die recherchiert sind, deren Datei aber noch fehlt. */
export function fehlendeBilddateien(): Pressebild[] {
  return bilder.filter((bild) => !verfuegbar.includes(bild));
}

/**
 * Welches Foto gehört zu diesem Slug? Nur einsatzbereite Bilder kommen
 * infrage – ein Eintrag ohne Datei bleibt unsichtbar.
 */
export function fotoFuer(slug: string): Pressebild | null {
  return verfuegbar.find((bild) => bild.fuer.includes(slug)) ?? null;
}
