import Link from "next/link";

/**
 * Kennzahlenzeile der Ausgabe.
 *
 * Anders als die Rubrik „Aus Leonida“ ist hier nichts erfunden: Jede Zahl
 * wird aus dem tatsächlichen Bestand gezählt. Das ist der Unterschied, auf
 * dem die Plattform besteht – atmosphärische Elemente dürfen die Beweislogik
 * nicht aushöhlen. Wo eine Zahl eine Aussage über Grand Theft Auto VI
 * darstellt, muss sie zählbar sein.
 */
export function HeuteInLeonida({
  quellenGesamt,
  quellenPrimaer,
  markerVerortet,
  markerGesamt,
  offeneSignale,
  datenbankEintraege,
}: {
  quellenGesamt: number;
  quellenPrimaer: number;
  markerVerortet: number;
  markerGesamt: number;
  offeneSignale: number;
  datenbankEintraege: number;
}) {
  const felder: { label: string; wert: string; zusatz: string; href: string; tone: string }[] = [
    {
      label: "Quellenlage",
      wert: String(quellenGesamt),
      zusatz: `${quellenPrimaer} offizielle Primärquellen`,
      href: "/radar",
      tone: "text-lagoon-700",
    },
    {
      label: "Kartenlage",
      wert: `${markerVerortet} / ${markerGesamt}`,
      zusatz: "Positionen belegt begründet",
      href: "/kompass",
      tone: "text-sun-500",
    },
    {
      label: "Radar",
      wert: String(offeneSignale),
      zusatz: "Signale ohne Bestätigung",
      href: "/radar",
      tone: "text-coral-600",
    },
    {
      label: "Datenbank",
      wert: String(datenbankEintraege),
      zusatz: "Einträge mit Quelle",
      href: "/datenbank",
      tone: "text-night-700",
    },
  ];

  return (
    <section aria-labelledby="heute-titel" className="border-y-2 border-ink-900 bg-paper-50">
      <p
        id="heute-titel"
        className="border-b border-ink-900/20 px-4 py-1.5 font-mono text-[9px] font-bold uppercase tracking-[0.2em] text-ink-700"
      >
        Heute in Leonida · gezählt aus dem eigenen Bestand
      </p>
      <div className="grid divide-y divide-ink-900/15 sm:grid-cols-2 sm:divide-y-0 lg:grid-cols-4 lg:divide-x lg:divide-ink-900/15">
        {felder.map((feld) => (
          <Link
            key={feld.label}
            href={feld.href}
            className="group flex items-baseline gap-3 px-4 py-3 transition-colors hover:bg-paper-200/50"
          >
            <span className={`headline shrink-0 text-[2rem] leading-none tabular-nums ${feld.tone}`}>
              {feld.wert}
            </span>
            <span className="min-w-0">
              <span className="meta block text-ink-800 group-hover:text-coral-600">
                {feld.label}
              </span>
              <span className="mt-0.5 block font-serif text-[12px] leading-snug text-ink-600">
                {feld.zusatz}
              </span>
            </span>
          </Link>
        ))}
      </div>
    </section>
  );
}
