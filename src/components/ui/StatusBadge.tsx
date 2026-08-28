import { statusDefinition } from "@/lib/status";
import { cx } from "@/lib/format";
import type { RadarStatus } from "@/lib/types";

/**
 * Statusauszeichnung. Auf Papier steht ein farbiger Punkt vor der Versalzeile
 * statt einer Farbfläche – die Statusfarbe bleibt dieselbe wie im Radar.
 */
export function StatusBadge({
  status,
  tone = "paper",
  className,
}: {
  status: RadarStatus;
  tone?: "paper" | "night";
  className?: string;
}) {
  const definition = statusDefinition(status);
  return (
    <span
      title={definition.definition}
      className={cx(
        "inline-flex items-center gap-1.5 font-mono text-[10px] font-bold uppercase tracking-[0.16em]",
        tone === "night" ? "text-paper-200" : "text-ink-700",
        className,
      )}
    >
      <span
        aria-hidden
        className="size-2 shrink-0 rounded-full ring-1 ring-inset ring-black/20"
        style={{ backgroundColor: definition.accent }}
      />
      {definition.label}
    </span>
  );
}

/** Kennzeichnung für Beispiel-/Platzhalterinhalte. */
export function DemoBadge({ className }: { className?: string }) {
  return (
    <span
      title="Beispielinhalt zur Demonstration der Plattform – keine Meldung."
      className={cx(
        "inline-flex items-center border border-current/35 px-1.5 py-0.5 font-mono text-[9px] font-bold uppercase tracking-[0.16em] text-ink-400",
        className,
      )}
    >
      Beispiel
    </span>
  );
}
