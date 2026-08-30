/**
 * Angaben für Impressum und Datenschutzerklärung.
 *
 * Die Angaben stehen hier im Klartext, nicht nur in Umgebungsvariablen: Ein
 * Impressum muss vom ersten Tag an vollständig sein, und diese Daten sind
 * ohnehin öffentlich – sie zu veröffentlichen ist gesetzliche Pflicht, nicht
 * Preisgabe. Umgebungsvariablen überschreiben die Vorgaben weiterhin, damit
 * sich eine Anschrift ohne Commit ändern lässt.
 *
 * Quelle der Angaben: das Impressum von saimor.world, also derselbe
 * Betreiber. Solange Pflichtangaben fehlen, weist die Seite das offen aus,
 * statt ein unvollständiges Impressum als vollständiges auszugeben – ein
 * falsches Impressum ist schlechter als ein erkennbar unfertiges.
 *
 * Pflichtangaben nach § 5 DDG (vormals § 5 TMG). Weil der Leonida Kurier ein
 * journalistisch-redaktionelles Angebot ist, kommt § 18 Abs. 2 MStV hinzu:
 * ein benannter Verantwortlicher mit Anschrift.
 */

/** Wert aus der Umgebung, sonst die hinterlegte Vorgabe. */
function wert(variable: string | undefined, vorgabe = ""): string {
  return (variable ?? "").trim() || vorgabe;
}

export const LEGAL = {
  /** Anbieter im Sinne des § 5 DDG – Name oder Firma. */
  anbieter: wert(process.env.NEXT_PUBLIC_LEGAL_ANBIETER, "NextChapter"),
  /** Rechtsform, falls es eine Gesellschaft ist. */
  rechtsform: wert(process.env.NEXT_PUBLIC_LEGAL_RECHTSFORM),
  /** Vertretungsberechtigte Person bzw. Inhaber. */
  vertretenDurch: wert(process.env.NEXT_PUBLIC_LEGAL_VERTRETEN, "Marius Fahrländer"),
  strasse: wert(process.env.NEXT_PUBLIC_LEGAL_STRASSE, "Wallmerstraße 30"),
  plzOrt: wert(process.env.NEXT_PUBLIC_LEGAL_PLZ_ORT, "70327 Stuttgart"),
  land: wert(process.env.NEXT_PUBLIC_LEGAL_LAND, "Deutschland"),
  email: wert(process.env.NEXT_PUBLIC_LEGAL_EMAIL, "contact@saimor.world"),
  /** Auf saimor.world nicht angegeben – bleibt leer, statt erfunden zu werden. */
  telefon: wert(process.env.NEXT_PUBLIC_LEGAL_TELEFON),
  registergericht: wert(process.env.NEXT_PUBLIC_LEGAL_REGISTERGERICHT),
  registernummer: wert(process.env.NEXT_PUBLIC_LEGAL_REGISTERNUMMER),
  ustId: wert(process.env.NEXT_PUBLIC_LEGAL_UST_ID),
  /** Verantwortlicher nach § 18 Abs. 2 MStV; ohne Angabe gilt der Anbieter. */
  medienverantwortlich: wert(
    process.env.NEXT_PUBLIC_LEGAL_MSTV,
    "Marius Fahrländer",
  ),
} as const;

/** Ohne diese Angaben ist das Impressum nicht rechtsgültig. */
const PFLICHT = ["anbieter", "strasse", "plzOrt", "email"] as const;

export function fehlendePflichtangaben(): string[] {
  const namen: Record<(typeof PFLICHT)[number], string> = {
    anbieter: "Name oder Firma",
    strasse: "Straße und Hausnummer",
    plzOrt: "Postleitzahl und Ort",
    email: "E-Mail-Adresse",
  };
  return PFLICHT.filter((feld) => LEGAL[feld].trim() === "").map((feld) => namen[feld]);
}

export function impressumVollstaendig(): boolean {
  return fehlendePflichtangaben().length === 0;
}

/**
 * Der Verantwortliche nach § 18 Abs. 2 MStV. Ist niemand gesondert benannt,
 * ist es der Anbieter selbst.
 */
export function medienverantwortlich(): string {
  return LEGAL.medienverantwortlich.trim() || LEGAL.anbieter;
}
