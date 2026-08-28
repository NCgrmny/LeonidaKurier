import { formatDate } from "@/lib/format";
import { SITE } from "@/lib/site";

/**
 * Zeitungskopf des Kurier.
 *
 * Aufbau wie im Druck: Kennzeile, Titel, Doppellinie, Datumszeile. Das
 * Ausgabedatum ist bewusst das Datum des jüngsten Beitrags – so behauptet der
 * Kopf keine Aktualität, die die Redaktion nicht hat.
 */
export function Masthead({
  editionDate,
  compact = false,
}: {
  editionDate: string;
  compact?: boolean;
}) {
  return (
    <div className="pt-8 sm:pt-12">
      <div className="flex items-center justify-between gap-4 border-b border-[var(--rule)] pb-2 font-mono text-[10px] uppercase tracking-[0.18em] text-paper-500">
        <span className="hidden sm:inline">Unabhängiges Fanprojekt</span>
        <span className="text-coral-300">Leonidakurier.de</span>
        <span className="hidden sm:inline">Ausgabe {formatDate(editionDate)}</span>
      </div>

      <h1
        className={
          compact
            ? "masthead-title mt-5 text-center text-[2.6rem] text-paper-50 sm:text-6xl"
            : "masthead-title mt-6 text-center text-[2.9rem] text-paper-50 sm:text-7xl lg:text-8xl"
        }
      >
        Leonida <span className="text-coral-400">Kurier</span>
      </h1>

      <p className="mt-4 text-center font-mono text-[10px] uppercase tracking-[0.28em] text-paper-400 sm:text-[11px]">
        {SITE.tagline}
      </p>

      <div className="rule-double mt-5" />

      <div className="flex flex-wrap items-center justify-center gap-x-5 gap-y-1 py-2.5 text-center font-mono text-[10px] uppercase tracking-[0.16em] text-paper-500">
        <span className="sm:hidden">Ausgabe {formatDate(editionDate)}</span>
        <span>Kurier · Kompass · Radar</span>
        <span aria-hidden className="hidden text-paper-400/40 sm:inline">
          ◆
        </span>
        <span>Datenbank · Archiv</span>
        <span aria-hidden className="hidden text-paper-400/40 sm:inline">
          ◆
        </span>
        <span className="text-paper-400">Jede Meldung mit Status und Quelle</span>
      </div>

      <div className="border-b border-[var(--rule)]" />
    </div>
  );
}
