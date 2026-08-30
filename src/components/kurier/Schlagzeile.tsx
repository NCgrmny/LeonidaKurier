import { cx } from "@/lib/format";

/**
 * Zweifarbige Schlagzeile.
 *
 * Im Blattsatz wechselt der zweite Teil einer zweiteiligen Schlagzeile die
 * Schrift: fette Grotesk in Versalien oben, kursive Serife in gemischter
 * Schreibung darunter. Das ist ruhiger als ein Farbwechsel und liest sich
 * schneller. Getrennt wird am Doppelpunkt, ersatzweise am Gedankenstrich oder
 * Fragezeichen – also dort, wo die Zeile ohnehin ihren Sinn wechselt.
 * Findet sich keine solche Stelle, bleibt die Zeile einfarbig; ein erzwungener
 * Umbruch in der Wortmitte waere schlechter als gar keiner.
 */
export function Schlagzeile({
  text,
  className,
}: {
  text: string;
  className?: string;
}) {
  const teile = teilen(text);

  return (
    <span className={cx("block", className)}>
      <span className="block">{teile.kopf}</span>
      {teile.akzent ? (
        <span className="mt-1 block font-editorial text-[0.72em] font-medium normal-case italic leading-[1.1] tracking-normal text-ink-800">
          {teile.akzent}
        </span>
      ) : null}
    </span>
  );
}

function teilen(text: string): { kopf: string; akzent?: string } {
  for (const zeichen of [":", " – ", "?"]) {
    const index = text.indexOf(zeichen);
    // Nicht direkt am Anfang oder Ende trennen – sonst steht ein Wort allein.
    if (index > 8 && index < text.length - 8) {
      return {
        kopf: text.slice(0, index + (zeichen === "?" ? 1 : 0)).trim(),
        akzent: text.slice(index + zeichen.length).trim(),
      };
    }
  }
  return { kopf: text };
}
