import { formatDate } from "@/lib/format";
import { SITE } from "@/lib/site";
import { cx } from "@/lib/format";

/**
 * Zeitungskopf des Kurier.
 *
 * Aufbau wie im Druck: Kennzeile, Titel, Doppellinie, Datumszeile. Das
 * Ausgabedatum ist bewusst das Datum des jüngsten Beitrags – so behauptet der
 * Kopf keine Aktualität, die die Redaktion nicht hat.
 *
 * `variant` steuert, ob der Kopf auf dem dunklen Seitengrund steht (Startseite)
 * oder auf dem hellen Zeitungsbogen (Kurier).
 */
export function Masthead({
  editionDate,
  variant = "dark",
}: {
  editionDate: string;
  variant?: "dark" | "paper";
}) {
  const paper = variant === "paper";

  return (
    <div className={paper ? "pt-8 sm:pt-10" : "pt-8 sm:pt-12"}>
      <div
        className={cx(
          "flex items-center justify-between gap-4 pb-2 font-mono text-[10px] uppercase tracking-[0.18em]",
          paper
            ? "border-b border-[var(--paper-rule)] text-[var(--paper-muted)]"
            : "border-b border-[var(--rule)] text-paper-500",
        )}
      >
        <span className="hidden sm:inline">Unabhängiges Fanprojekt</span>
        <span className={paper ? "text-[var(--paper-accent)]" : "text-coral-300"}>
          Leonidakurier.de
        </span>
        <span className="hidden sm:inline">Ausgabe {formatDate(editionDate)}</span>
      </div>

      <h1
        className={cx(
          "masthead-title mt-5 text-center",
          paper
            ? "text-[2.6rem] text-[var(--paper-ink)] sm:text-7xl"
            : "text-[2.9rem] text-paper-50 sm:text-7xl lg:text-8xl",
        )}
      >
        Leonida{" "}
        <span className={paper ? "text-[var(--paper-accent)]" : "text-coral-400"}>
          Kurier
        </span>
      </h1>

      <p
        className={cx(
          "mt-4 text-center font-mono text-[10px] uppercase tracking-[0.28em] sm:text-[11px]",
          paper ? "text-[var(--paper-muted)]" : "text-paper-400",
        )}
      >
        {SITE.tagline}
      </p>

      <div className={cx("mt-5", paper ? "paper-rule-double" : "rule-double")} />

      <div
        className={cx(
          "flex flex-wrap items-center justify-center gap-x-5 gap-y-1 py-2.5 text-center font-mono text-[10px] uppercase tracking-[0.16em]",
          paper ? "text-[var(--paper-muted)]" : "text-paper-500",
        )}
      >
        <span className="sm:hidden">Ausgabe {formatDate(editionDate)}</span>
        <span>Kurier · Kompass · Radar</span>
        <span aria-hidden className="hidden opacity-40 sm:inline">
          ◆
        </span>
        <span>Datenbank · Archiv</span>
        <span aria-hidden className="hidden opacity-40 sm:inline">
          ◆
        </span>
        <span className={paper ? "text-[var(--paper-ink)]" : "text-paper-400"}>
          Jede Meldung mit Status und Quelle
        </span>
      </div>

      <div
        className={cx(
          paper ? "border-b border-[var(--paper-rule-strong)]" : "border-b border-[var(--rule)]",
        )}
      />
    </div>
  );
}
