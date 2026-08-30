import Link from "next/link";
import { cx, formatDate } from "@/lib/format";
import { SITE } from "@/lib/site";
import { BlattMarke, PalmGlyph, Seal } from "./Seal";

/**
 * Ressortleiste des Blattkopfs. Jedes Ressort traegt seine eigene Farbe –
 * gedruckte Blaetter machen das, damit man beim Blaettern weiss, wo man ist.
 */
const RESSORTS = [
  { href: "/kurier", label: "Kurier", tone: "ressort-kurier" },
  { href: "/kompass", label: "Kompass", tone: "ressort-kompass" },
  { href: "/radar", label: "Radar", tone: "ressort-radar" },
  { href: "/datenbank", label: "Datenbank", tone: "ressort-datenbank" },
  { href: "/archiv", label: "Archiv", tone: "ressort-archiv" },
];

/**
 * Zeitungskopf der Titelseite.
 *
 * Aufbau wie im Druck: Kennzeile links, Wortmarke mit Palmen-Glyphe in der
 * Mitte, Signet und Verbreitungsgebiet rechts, darunter Leitzeile und
 * Ressortband. Das Ausgabedatum ist das Datum des jüngsten Beitrags – so
 * behauptet der Kopf keine Aktualität, die die Redaktion nicht hat.
 */
export function Masthead({
  editionDate,
  edition = 1,
  editionHref,
}: {
  editionDate: string;
  /** Verweis auf die gebundene Ausgabe dieser Nummer, falls vorhanden. */
  editionHref?: string;
  edition?: number;
}) {
  return (
    <div className="pt-3 sm:pt-5">
      {/* Kennzeile über dem Titel – Haltung links, Urheber mittig, Adresse rechts */}
      <div className="flex items-center justify-between gap-3 border-b border-ink-900 pb-1.5 font-mono text-[8px] font-bold uppercase tracking-[0.16em] text-ink-700 sm:text-[9px]">
        <span>Unabhängig · Überparteilich · Für Leonida</span>
        <span className="hidden items-center gap-1.5 sm:inline-flex">
          <PalmGlyph className="h-3 w-auto text-coral-600" />
          A project by <strong className="font-bold text-ink-900">{SITE.operator}</strong>
        </span>
        <span className="hidden text-right md:inline">
          Keine Verbindung zu Rockstar Games oder Take-Two Interactive
        </span>
      </div>

      {/* Blattkopf */}
      <h1 className="masthead mt-3 flex flex-wrap items-center justify-center gap-x-2 gap-y-0 text-center text-[clamp(2.6rem,12vw,7.2rem)] text-ink-900 sm:gap-x-4">
        <span>Leonida</span>
        <BlattMarke className="h-[0.92em] w-auto shrink-0 text-coral-500" />
        <span>Kurier</span>
      </h1>

      {/* Zeile unter dem Titel: Ausgabe, Anspruch, Preis – wie im Druck */}
      <div className="mt-3 flex flex-wrap items-center justify-between gap-x-4 gap-y-1 border-y border-ink-900 py-1.5">
        {editionHref ? (
          <Link
            href={editionHref}
            className="font-mono text-[9px] font-bold uppercase tracking-[0.14em] text-ink-900 underline-offset-4 hover:text-coral-600 hover:underline sm:text-[10px]"
            title="Diese Ausgabe im Archiv"
          >
            Nr. {String(edition).padStart(3, "0")}
          </Link>
        ) : (
          <span className="font-mono text-[9px] font-bold uppercase tracking-[0.14em] text-ink-900 sm:text-[10px]">
            Nr. {String(edition).padStart(3, "0")}
          </span>
        )}
        <span className="order-3 w-full text-center font-mono text-[9px] font-bold uppercase tracking-[0.2em] text-ink-800 sm:order-none sm:w-auto sm:text-[10px] sm:tracking-[0.26em]">
          Die Zeitung des Bundesstaates Leonida
        </span>
        <span className="font-mono text-[9px] font-bold uppercase tracking-[0.14em] text-ink-900 sm:text-[10px]">
          2,50 $
        </span>
      </div>

      {/* Datumszeile und farbige Ressortleiste */}
      <div className="flex flex-wrap items-center justify-between gap-x-5 gap-y-2 border-b-2 border-ink-900 py-2">
        <span className="font-mono text-[9px] font-bold uppercase tracking-[0.12em] text-ink-700 sm:text-[10px]">
          {formatDate(editionDate)} · 1. Jahrgang
        </span>
        <nav aria-label="Ressorts">
          <ul className="flex flex-wrap items-center gap-x-4 gap-y-1 sm:gap-x-6">
            {RESSORTS.map((ressort) => (
              <li key={ressort.href}>
                <Link
                  href={ressort.href}
                  className={cx(
                    "font-mono text-[10px] font-bold uppercase tracking-[0.18em] transition-opacity hover:opacity-70 sm:text-[11px]",
                    ressort.tone,
                  )}
                >
                  {ressort.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
        <Seal className="hidden size-9 shrink-0 text-coral-600/85 sm:block" />
      </div>

      <p className="sr-only">{SITE.tagline}</p>
    </div>
  );
}
