import Link from "next/link";
import { formatDate } from "@/lib/format";
import type { Ausgabe } from "@/lib/types";

/**
 * Das Ausgabenregal.
 *
 * Eine gebundene Zeitung liegt im Archiv als Stapel, nicht als Kachelraster.
 * Deshalb steht hier pro Ausgabe eine Zeile mit breitem Rücken: links die
 * Nummer wie auf einem Buchrücken, in der Mitte Titel und Zeitraum, rechts
 * der Umfang. Gelesen wird von oben nach unten, neueste Ausgabe zuerst.
 */
export function AusgabenRegal({ ausgaben }: { ausgaben: Ausgabe[] }) {
  return (
    <ol className="mt-6 border-t border-ink-900/20">
      {ausgaben.map((ausgabe) => (
        <li key={ausgabe.slug} className="border-b border-ink-900/20">
          <Link
            href={`/archiv/ausgabe/${ausgabe.slug}`}
            className="group flex flex-col gap-3 py-5 transition-colors hover:bg-ink-900/[0.03] sm:flex-row sm:items-baseline sm:gap-6"
          >
            <span
              aria-hidden
              className="font-title text-[2.6rem] leading-none text-coral-600 sm:w-24 sm:shrink-0 sm:text-right sm:text-[3.2rem]"
            >
              {ausgabe.nummer}
            </span>
            <span className="min-w-0 flex-1">
              <span className="meta block">
                Ausgabe Nr. {ausgabe.nummer} · {formatDate(ausgabe.von)} bis{" "}
                {formatDate(ausgabe.bis)}
              </span>
              <span className="subhead mt-1 block text-[1.35rem] leading-tight group-hover:text-coral-700 sm:text-[1.6rem]">
                {ausgabe.titel}
              </span>
              <span className="standfirst mt-1 block font-editorial text-[15px] italic">
                {ausgabe.untertitel}
              </span>
            </span>
            <span className="font-mono text-[11px] uppercase tracking-[0.18em] text-ink-700 sm:shrink-0 sm:text-right">
              {ausgabe.beitraege.length + 1}{" "}
              {ausgabe.beitraege.length + 1 === 1 ? "Beitrag" : "Beiträge"}
              <span aria-hidden className="ml-2 inline-block transition-transform group-hover:translate-x-0.5">
                →
              </span>
            </span>
          </Link>
        </li>
      ))}
    </ol>
  );
}
