import { formatDate } from "@/lib/format";
import { SITE } from "@/lib/site";

/**
 * Zeitungskopf der Titelseite.
 *
 * Groß und selbstbewusst gesetzt, wie im Druck: Kennzeile, Wortmarke,
 * Doppellinie, Ausgabezeile. Das Ausgabedatum ist das Datum des jüngsten
 * Beitrags – so behauptet der Kopf keine Aktualität, die die Redaktion nicht
 * hat.
 */
export function Masthead({ editionDate }: { editionDate: string }) {
  return (
    <div className="pt-6 sm:pt-10">
      <div className="flex items-center justify-between gap-4 border-b border-ink-900/15 pb-2">
        <span className="meta hidden sm:inline">Unabhängiges Fanprojekt</span>
        <span className="meta text-coral-600">leonidakurier.de</span>
        <span className="meta hidden sm:inline">Nr. 001</span>
      </div>

      <h1 className="masthead mt-5 text-center text-[clamp(2.6rem,13vw,10rem)] text-ink-900">
        Leonida <span className="text-coral-600">Kurier</span>
      </h1>

      <div className="rule-double mt-5" />

      <div className="flex flex-col items-center gap-1 py-2.5 text-center sm:flex-row sm:justify-between">
        <span className="meta">{formatDate(editionDate)}</span>
        <span className="font-serif text-[13px] italic text-ink-600">
          {SITE.tagline}
        </span>
        <span className="meta">Unabhängiger Bericht aus Leonida</span>
      </div>

      <div className="border-b-2 border-ink-900" />
    </div>
  );
}
