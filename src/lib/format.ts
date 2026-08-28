const DATE_FORMAT = new Intl.DateTimeFormat("de-DE", {
  day: "2-digit",
  month: "long",
  year: "numeric",
  timeZone: "Europe/Berlin",
});

const MONTH_FORMAT = new Intl.DateTimeFormat("de-DE", {
  month: "long",
  year: "numeric",
  timeZone: "Europe/Berlin",
});

export function formatDate(iso: string): string {
  const date = new Date(iso);
  if (Number.isNaN(date.getTime())) return iso;
  return DATE_FORMAT.format(date);
}

export function formatMonth(iso: string): string {
  const date = new Date(iso);
  if (Number.isNaN(date.getTime())) return iso;
  return MONTH_FORMAT.format(date);
}

export function formatYear(iso: string): string {
  const date = new Date(iso);
  if (Number.isNaN(date.getTime())) return iso.slice(0, 4);
  return String(date.getUTCFullYear());
}

export function formatByPrecision(
  iso: string,
  precision: "tag" | "monat" | "jahr",
): string {
  if (precision === "jahr") return formatYear(iso);
  if (precision === "monat") return formatMonth(iso);
  return formatDate(iso);
}

/** Kleine Klassen-Utility, damit keine zusaetzliche Abhaengigkeit noetig ist. */
export function cx(...values: (string | false | null | undefined)[]): string {
  return values.filter(Boolean).join(" ");
}
