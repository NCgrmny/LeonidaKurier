import Link from "next/link";
import { cx } from "@/lib/format";

/**
 * Wortmarke des Kurier. Bewusst typografisch statt bildhaft: keine
 * Anlehnung an fremde Markenassets.
 */
export function Wordmark({
  className,
  compact = false,
}: {
  className?: string;
  compact?: boolean;
}) {
  return (
    <Link
      href="/"
      className={cx("group inline-flex items-center gap-2.5", className)}
      aria-label="Leonida Kurier – Startseite"
    >
      <span
        aria-hidden
        className="relative grid size-8 place-items-center rounded-[9px] border border-coral-400/40 bg-ink-900"
      >
        <span className="block size-2 rotate-45 bg-coral-400 transition-transform duration-500 group-hover:rotate-[225deg]" />
      </span>
      <span className="leading-none">
        <span className="block font-mono text-[11px] uppercase tracking-[0.3em] text-coral-300">
          Leonida
        </span>
        <span className="headline block text-[15px] tracking-[0.02em] text-paper-50">
          Kurier
        </span>
      </span>
      {compact ? null : (
        <span className="sr-only">Dein unabhängiger Begleiter durch Leonida.</span>
      )}
    </Link>
  );
}
