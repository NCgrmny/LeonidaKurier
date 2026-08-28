import { statusDefinition } from "@/lib/status";
import { cx } from "@/lib/format";
import type { RadarStatus } from "@/lib/types";

export function StatusBadge({
  status,
  size = "md",
  className,
}: {
  status: RadarStatus;
  size?: "sm" | "md";
  className?: string;
}) {
  const definition = statusDefinition(status);
  return (
    <span
      title={definition.definition}
      className={cx(
        "inline-flex items-center gap-1.5 rounded-full border font-mono uppercase tracking-[0.14em]",
        size === "sm" ? "px-2 py-0.5 text-[10px]" : "px-2.5 py-1 text-[11px]",
        definition.className,
        className,
      )}
    >
      <span
        aria-hidden
        className="size-1.5 rounded-full"
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
        "inline-flex items-center rounded-full border border-paper-400/25 bg-paper-400/10 px-2 py-0.5 font-mono text-[10px] uppercase tracking-[0.14em] text-paper-400",
        className,
      )}
    >
      Beispielinhalt
    </span>
  );
}
