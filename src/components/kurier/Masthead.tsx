import { formatDate } from "@/lib/format";
import { SITE } from "@/lib/site";
import { PalmGlyph, Seal } from "./Seal";

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
}: {
  editionDate: string;
  edition?: number;
}) {
  return (
    <div className="pt-5 sm:pt-8">
      <div className="grid items-center gap-4 border-b border-ink-900/15 pb-4 sm:grid-cols-[1fr_auto_1fr]">
        {/* Kennzeile */}
        <div className="order-2 hidden sm:order-1 sm:block">
          <p className="font-mono text-[11px] font-bold uppercase tracking-[0.14em] text-ink-900">
            {formatDate(editionDate)}
          </p>
          <p className="meta mt-1">
            Ausgabe {String(edition).padStart(3, "0")} · 1. Jahrgang
          </p>
          <p className="meta mt-3 text-coral-600">Unabhängiges Fanprojekt</p>
        </div>

        {/* Wortmarke */}
        <div className="order-1 sm:order-2">
          <h1 className="masthead flex items-center justify-center gap-1 text-center text-[clamp(2.9rem,12vw,7.5rem)] text-ink-900 sm:gap-2">
            <span>Leonida</span>
            <PalmGlyph className="h-[0.78em] w-auto shrink-0 text-coral-600" />
            <span>Kurier</span>
          </h1>
          <p className="mt-2 text-center font-mono text-[9px] font-bold uppercase tracking-[0.32em] text-ink-600 sm:text-[11px]">
            Die Stimme Leonidas · Unabhängig · Nachprüfbar
          </p>
        </div>

        {/* Signet und Verbreitungsgebiet */}
        <div className="order-3 hidden items-center justify-end gap-4 sm:flex">
          <Seal className="size-[74px] shrink-0 text-coral-600/85" />
          <ul className="text-right">
            <li className="font-mono text-[11px] font-bold uppercase tracking-[0.14em] text-ink-900">
              Vice City
            </li>
            {["Leonida Keys", "Port Gellhorn", "Ambrosia", "Grassrivers"].map((place) => (
              <li key={place} className="meta">
                {place}
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Zeile für schmale Viewports */}
      <div className="flex items-center justify-between gap-3 border-b border-ink-900/15 py-2 sm:hidden">
        <span className="font-mono text-[10px] font-bold uppercase tracking-[0.12em] text-ink-900">
          {formatDate(editionDate)}
        </span>
        <span className="meta">Ausgabe {String(edition).padStart(3, "0")}</span>
        <Seal className="size-8 shrink-0 text-coral-600/85" />
      </div>

      <p className="sr-only">{SITE.tagline}</p>
    </div>
  );
}
