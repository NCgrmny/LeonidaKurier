/**
 * Angaben für Impressum und Datenschutzerklärung.
 *
 * Die Werte kommen aus Umgebungsvariablen, damit sie ohne Commit gesetzt
 * werden können. Solange die Pflichtangaben fehlen, weist die Seite das
 * offen aus, statt ein unvollständiges Impressum als vollständiges
 * auszugeben – ein falsches Impressum ist schlechter als ein erkennbar
 * unfertiges.
 *
 * Pflichtangaben nach § 5 DDG (vormals § 5 TMG). Weil der Leonida Kurier ein
 * journalistisch-redaktionelles Angebot ist, kommt § 18 Abs. 2 MStV hinzu:
 * ein benannter Verantwortlicher mit Anschrift.
 */

export const LEGAL = {
  /** Anbieter im Sinne des § 5 DDG – Name oder Firma. */
  anbieter: process.env.NEXT_PUBLIC_LEGAL_ANBIETER ?? "",
  /** Rechtsform, falls es eine Gesellschaft ist. */
  rechtsform: process.env.NEXT_PUBLIC_LEGAL_RECHTSFORM ?? "",
  /** Vertretungsberechtigte Person bei Gesellschaften. */
  vertretenDurch: process.env.NEXT_PUBLIC_LEGAL_VERTRETEN ?? "",
  strasse: process.env.NEXT_PUBLIC_LEGAL_STRASSE ?? "",
  plzOrt: process.env.NEXT_PUBLIC_LEGAL_PLZ_ORT ?? "",
  land: process.env.NEXT_PUBLIC_LEGAL_LAND ?? "Deutschland",
  email: process.env.NEXT_PUBLIC_LEGAL_EMAIL ?? "",
  telefon: process.env.NEXT_PUBLIC_LEGAL_TELEFON ?? "",
  registergericht: process.env.NEXT_PUBLIC_LEGAL_REGISTERGERICHT ?? "",
  registernummer: process.env.NEXT_PUBLIC_LEGAL_REGISTERNUMMER ?? "",
  ustId: process.env.NEXT_PUBLIC_LEGAL_UST_ID ?? "",
  /** Verantwortlicher nach § 18 Abs. 2 MStV; ohne Angabe gilt der Anbieter. */
  medienverantwortlich: process.env.NEXT_PUBLIC_LEGAL_MSTV ?? "",
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
