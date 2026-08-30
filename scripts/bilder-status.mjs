/**
 * Zeigt, welche recherchierten Bilder noch als Datei fehlen – und den
 * Befehl, mit dem sie geholt werden.
 *
 * Aufruf: npm run bilder
 */
import { readFileSync, existsSync } from "node:fs";
import { join } from "node:path";

const quelle = readFileSync("src/content/bilder.ts", "utf8");

// Bewusst eine schlichte Auswertung statt eines TypeScript-Laufs: Das Skript
// soll ohne Buildschritt funktionieren.
const eintraege = [...quelle.matchAll(/\{\s*(?:\/\/[^\n]*\n\s*)*datei:\s*"([^"]+)"[\s\S]*?quelleUrl:\s*\n?\s*"([^"]+)"[\s\S]*?fuer:\s*\[([^\]]*)\]/g)].map(
  ([, datei, quelleUrl, fuer]) => ({
    datei,
    quelleUrl,
    fuer: fuer.replace(/["\s]/g, ""),
  }),
);

const fehlend = eintraege.filter(
  (eintrag) => !existsSync(join("public", "bilder", eintrag.datei)),
);

console.log(`Bildbestand: ${eintraege.length} recherchiert, ${eintraege.length - fehlend.length} vorhanden, ${fehlend.length} offen.\n`);

if (fehlend.length === 0) {
  console.log("Alle recherchierten Bilder liegen im Repository.");
} else {
  console.log("Noch zu beschaffen – Datei jeweils unter diesem Namen ablegen:\n");
  for (const eintrag of fehlend) {
    console.log(`  public/bilder/${eintrag.datei}`);
    console.log(`     fuer:   ${eintrag.fuer}`);
    console.log(`     quelle: ${eintrag.quelleUrl}\n`);
  }
  console.log("Bis dahin zeigen die betroffenen Flaechen die Standortkarte.");
}
