/**
 * Fiktionale Rubriken aus der Welt des Spiels.
 *
 * ACHTUNG – Sonderstellung im Bestand: Alles in dieser Datei ist erfunden.
 * Es sind keine Aussagen über Grand Theft Auto VI, sondern Zeitungsinventar
 * aus dem Bundesstaat Leonida: Wetter, Polizeimeldungen, Börsenkurse,
 * Kleinanzeigen.
 *
 * Der Leonida Kurier verspricht, keine erfundenen Fakten zu berichten. Dieses
 * Versprechen gilt Aussagen über das Spiel. Eine Zeitung besteht aber nicht
 * nur aus Meldungen – sie hat Wetter, Anzeigen und Kurse, und ohne die wirkt
 * sie wie ein Nachrichtenportal mit Zeitungskopf.
 *
 * Der Widerspruch löst sich durch Kennzeichnung: Die Rubrik trägt sichtbar
 * den Hinweis, dass sie erfunden ist. Deshalb steht dieser Inhalt auch
 * bewusst NICHT in der Datenbank, hat keinen Radar-Status und keine
 * Quellen-IDs – er würde das Belegsystem sonst aushöhlen.
 */

export interface Wetterlage {
  ort: string;
  gradCelsius: number;
  lage: string;
  hinweis: string;
  aussicht: { tag: string; hoch: number; tief: number; lage: string }[];
}

export const WETTER: Wetterlage = {
  ort: "Vice City",
  gradCelsius: 31,
  lage: "Sonnig",
  hinweis: "Heiß und schwül. Leichte Brise aus Osten, abends Gewitterneigung über den Grassrivers.",
  aussicht: [
    { tag: "Fr", hoch: 32, tief: 26, lage: "wolkig" },
    { tag: "Sa", hoch: 31, tief: 25, lage: "schauer" },
    { tag: "So", hoch: 30, tief: 24, lage: "wolkig" },
  ],
};

export interface TickerMeldung {
  zeit: string;
  text: string;
}

export const POLIZEITICKER: TickerMeldung[] = [
  { zeit: "07:42", text: "Verkehrskontrollen auf dem Ocean Drive – mehrere Fahrer ohne Führerschein." },
  { zeit: "09:15", text: "Einbruch in ein Juweliergeschäft in Little Cuba. Zeugen gesucht." },
  { zeit: "11:03", text: "Hafenbehörde meldet ein herrenloses Airboat in den Grassrivers." },
  { zeit: "14:20", text: "Ruhestörung am Tisha-Wocka-Flohmarkt, Platzverweise ausgesprochen." },
];

export interface Kurs {
  kuerzel: string;
  name: string;
  veraenderung: number;
}

export const BOERSE: Kurs[] = [
  { kuerzel: "LCB", name: "Leonida Coastal Bank", veraenderung: 2.41 },
  { kuerzel: "VCM", name: "Vice City Motors", veraenderung: 1.17 },
  { kuerzel: "ACR", name: "Allied Crystal Refining", veraenderung: 3.08 },
  { kuerzel: "GLO", name: "GlobOil Energy", veraenderung: -0.64 },
  { kuerzel: "EVC", name: "Everglades Carbon", veraenderung: 0.21 },
];

export interface Kleinanzeige {
  titel: string;
  text: string;
  kontakt: string;
}

export const KLEINANZEIGEN: Kleinanzeige[] = [
  {
    titel: "Boot zu verkaufen",
    text: "29 ft, guter Zustand, Liegeplatz in der Vice Marina inklusive.",
    kontakt: "Tel. 555-0198",
  },
  {
    titel: "Job gesucht",
    text: "Mechaniker mit Erfahrung in Performance & Tuning. Kurzfristig verfügbar.",
    kontakt: "Tel. 555-0421",
  },
  {
    titel: "Zimmer in Port Gellhorn",
    text: "Möbliert, über dem Diner, Miete in bar. Keine Fragen.",
    kontakt: "Tel. 555-0733",
  },
];
