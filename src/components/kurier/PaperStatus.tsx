import { statusDefinition } from "@/lib/status";
import type { RadarStatus } from "@/lib/types";

/**
 * Statusauszeichnung auf dem Zeitungsbogen.
 *
 * Auf Papier wirken gefüllte Farbflächen aufdringlich; hier steht deshalb ein
 * farbiger Punkt vor der Versalzeile – die Statusfarbe bleibt dieselbe wie im
 * Radar, nur zurückhaltender gesetzt.
 */
export function PaperStatus({ status }: { status: RadarStatus }) {
  const definition = statusDefinition(status);
  return (
    <span className="paper-status" title={definition.definition}>
      <span
        aria-hidden
        className="size-1.5 rounded-full"
        style={{ backgroundColor: definition.accent, outline: "1px solid #16130e33" }}
      />
      {definition.label}
    </span>
  );
}
