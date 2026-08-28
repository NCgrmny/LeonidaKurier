/** Zentrale Marken- und Navigationskonfiguration. */

export const SITE = {
  name: "Leonida Kurier",
  shortName: "Kurier",
  tagline: "Dein unabhängiger Begleiter durch Leonida.",
  description:
    "Leonida Kurier ist eine unabhängige deutschsprachige Plattform zu GTA VI: redaktionelle Meldungen, ein Radar mit klarem Status je Information, die interaktive Karte Leonida Kompass, eine wachsende Datenbank und ein Archiv der Entwicklung.",
  operator: "Saimôr",
  locale: "de_DE",
  disclaimerShort:
    "Unabhängiges Fanprojekt. Nicht verbunden mit Rockstar Games oder Take-Two Interactive.",
  disclaimerLong:
    "Leonida Kurier ist ein unabhängiges Fanprojekt und steht in keiner Verbindung zu Rockstar Games, Take-Two Interactive oder deren Partnern. Alle genannten Marken gehören ihren jeweiligen Inhabern.",
} as const;

/** Basis-URL – in Vercel ueber NEXT_PUBLIC_SITE_URL gesetzt. */
export const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/$/, "") ?? "https://leonidakurier.de";

/** Zweiter Einstieg: leonidakompass.de fuehrt direkt in den Kartenbereich. */
export const COMPASS_HOST =
  process.env.NEXT_PUBLIC_COMPASS_HOST ?? "leonidakompass.de";

export interface NavItem {
  href: string;
  label: string;
  /** Antwort auf die Leitfrage, die dieser Bereich beantwortet. */
  question: string;
  description: string;
}

export const MAIN_NAV: NavItem[] = [
  {
    href: "/kurier",
    label: "Kurier",
    question: "Was ist passiert?",
    description: "Redaktionelle Meldungen, Analysen und Einordnungen.",
  },
  {
    href: "/kompass",
    label: "Kompass",
    question: "Wo ist es?",
    description: "Die interaktive Karte von Leonida.",
  },
  {
    href: "/radar",
    label: "Radar",
    question: "Was könnte passieren?",
    description: "Signale, Gerüchte und Entwicklungen mit klarem Status.",
  },
  {
    href: "/datenbank",
    label: "Datenbank",
    question: "Was wissen wir wirklich?",
    description: "Orte, Charaktere, Fahrzeuge, Missionen und mehr.",
  },
  {
    href: "/archiv",
    label: "Archiv",
    question: "Wie kam es dazu?",
    description: "Die Chronologie unseres Wissensstands.",
  },
];

export const FOOTER_LINKS: { href: string; label: string }[] = [
  { href: "/redaktion", label: "Redaktion & Standards" },
  { href: "/rechtliches", label: "Rechtliches" },
];
