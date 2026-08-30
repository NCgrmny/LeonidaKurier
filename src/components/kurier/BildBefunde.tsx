import type { Bildbefund } from "@/lib/types";
import { statusDefinition } from "@/lib/status";

/**
 * Befundliste zum offiziellen Material.
 *
 * Andere Seiten setzen ein Bild darunter und schreiben eine Zeile dazu. Der
 * Kurier nummeriert, was aus Rockstars Material hervorgeht, und gibt jedem
 * Punkt seinen Belegstatus.
 *
 * Wichtig ist, worauf sich die Befunde beziehen: auf das offizielle Material,
 * nicht auf die Grafik daneben. Die stammt aus dieser Redaktion und kann
 * nichts belegen. Die frühere Überschrift „Was auf dem Bild zu sehen ist"
 * legte genau das nahe – spätestens neben einer Standortkarte wurde daraus
 * eine falsche Aussage.
 *
 * Bewusst zurückhaltend gesetzt: dünne Linien, kleine Ziffern, keine
 * Aktenoptik. Es bleibt eine Bildunterschrift, nur eine genaue.
 */
export function BildBefunde({ befunde }: { befunde: Bildbefund[] }) {
  if (befunde.length === 0) return null;

  return (
    <div className="border-t border-ink-900/20 bg-paper-100/60">
      <p className="border-b border-ink-900/15 px-3 py-1.5 font-mono text-[9px] font-bold uppercase tracking-[0.16em] text-ink-600">
        Was das offizielle Material zeigt
      </p>
      <ol className="grid sm:grid-cols-2">
        {befunde.map((befund, index) => {
          const definition = statusDefinition(befund.status);
          return (
            <li
              key={befund.titel}
              className="flex gap-2.5 border-b border-ink-900/10 px-3 py-2 last:border-b-0 sm:odd:border-r sm:odd:border-ink-900/10 sm:[&:nth-last-child(2)]:border-b-0"
            >
              <span className="mt-0.5 shrink-0 font-mono text-[11px] font-bold tabular-nums text-coral-600">
                {String(index + 1).padStart(2, "0")}
              </span>
              <span className="min-w-0">
                <span className="flex flex-wrap items-baseline gap-x-2">
                  <span className="font-mono text-[10px] font-bold uppercase tracking-[0.12em] text-ink-900">
                    {befund.titel}
                  </span>
                  <span
                    className="inline-flex items-center gap-1 font-mono text-[9px] uppercase tracking-[0.1em] text-ink-600"
                    title={definition.definition}
                  >
                    <span
                      aria-hidden
                      className="size-1.5 rounded-full"
                      style={{ backgroundColor: definition.accent }}
                    />
                    {definition.label}
                  </span>
                </span>
                <span className="mt-0.5 block font-serif text-[12px] leading-snug text-ink-600">
                  {befund.beobachtung}
                </span>
              </span>
            </li>
          );
        })}
      </ol>
    </div>
  );
}
