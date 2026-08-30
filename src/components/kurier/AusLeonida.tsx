import { BOERSE, KLEINANZEIGEN, POLIZEITICKER, WETTER } from "@/content/leonida";

/**
 * Die Zeitungsleiste am Fuß der Titelseite: Wetter, Polizei-Ticker,
 * Börsenkurse, Kleinanzeigen.
 *
 * Diese Rubrik ist erfunden, und das steht auch darüber. Sie macht aus dem
 * Nachrichtenangebot ein Blatt – eine Zeitung besteht nicht nur aus
 * Meldungen. Weil der Leonida Kurier sonst ausschließlich Belegtes führt,
 * ist die Abgrenzung hier nicht Zierrat, sondern Bedingung: Ohne den
 * Hinweis wäre es genau die Sorte erfundener Inhalt, die die Plattform
 * ausschließt.
 */
export function AusLeonida() {
  return (
    <section aria-labelledby="aus-leonida-titel" className="border-y-2 border-ink-900">
      <div className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1 border-b border-ink-900/20 px-4 py-2">
        <h2 id="aus-leonida-titel" className="ressort text-flamingo-500">
          Aus Leonida
        </h2>
        <p className="font-serif text-[11px] italic leading-snug text-ink-600">
          Erfundene Rubrik aus der Welt des Spiels. Keine Aussagen über Grand
          Theft Auto VI.
        </p>
      </div>

      <div className="grid divide-y divide-ink-900/15 sm:grid-cols-2 sm:divide-y-0 lg:grid-cols-4 lg:divide-x lg:divide-ink-900/15">
        {/* Wetter */}
        <div className="p-4">
          <p className="meta text-lagoon-700">Wetter in Leonida</p>
          <div className="mt-2 flex items-baseline gap-2">
            <span className="headline text-[2.6rem] leading-none">{WETTER.gradCelsius}°</span>
            <span className="font-mono text-[10px] font-bold uppercase tracking-[0.16em] text-ink-700">
              {WETTER.lage}
            </span>
          </div>
          <p className="mt-1.5 font-serif text-[12px] leading-snug text-ink-600">
            {WETTER.hinweis}
          </p>
          <ul className="mt-3 flex gap-4 border-t border-ink-900/15 pt-2">
            {WETTER.aussicht.map((tag) => (
              <li key={tag.tag}>
                <p className="font-mono text-[10px] font-bold uppercase tracking-[0.12em] text-ink-800">
                  {tag.tag}
                </p>
                <p className="font-mono text-[11px] tabular-nums text-ink-700">
                  {tag.hoch}° / {tag.tief}°
                </p>
              </li>
            ))}
          </ul>
        </div>

        {/* Polizei-Ticker */}
        <div className="p-4">
          <p className="meta text-night-700">Polizei-Ticker</p>
          <ul className="mt-2 grid gap-2">
            {POLIZEITICKER.map((meldung) => (
              <li key={meldung.zeit} className="flex gap-2.5">
                <span className="shrink-0 font-mono text-[11px] font-bold tabular-nums text-coral-600">
                  {meldung.zeit}
                </span>
                <span className="font-serif text-[12px] leading-snug text-ink-700">
                  {meldung.text}
                </span>
              </li>
            ))}
          </ul>
        </div>

        {/* Börse */}
        <div className="p-4">
          <p className="meta text-sun-500">Leonida Markt</p>
          <table className="mt-2 w-full">
            <tbody>
              {BOERSE.map((kurs) => (
                <tr key={kurs.kuerzel} className="border-b border-ink-900/10 last:border-0">
                  <td className="py-1 font-mono text-[11px] font-bold text-ink-900">
                    {kurs.kuerzel}
                  </td>
                  <td className="py-1 pl-2 font-serif text-[11px] leading-tight text-ink-600">
                    {kurs.name}
                  </td>
                  <td
                    className={`py-1 pl-2 text-right font-mono text-[11px] font-bold tabular-nums ${
                      kurs.veraenderung >= 0 ? "text-lagoon-700" : "text-coral-600"
                    }`}
                  >
                    {kurs.veraenderung >= 0 ? "▲" : "▼"}{" "}
                    {Math.abs(kurs.veraenderung).toFixed(2).replace(".", ",")} %
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Kleinanzeigen */}
        <div className="p-4">
          <p className="meta text-flamingo-500">Kleinanzeigen</p>
          <ul className="mt-2 grid gap-2.5">
            {KLEINANZEIGEN.map((anzeige) => (
              <li key={anzeige.titel}>
                <p className="font-mono text-[10px] font-bold uppercase tracking-[0.12em] text-ink-900">
                  › {anzeige.titel}
                </p>
                <p className="font-serif text-[12px] leading-snug text-ink-600">
                  {anzeige.text} <span className="whitespace-nowrap">{anzeige.kontakt}</span>
                </p>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
