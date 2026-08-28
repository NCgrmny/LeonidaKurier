import Link from "next/link";
import { cx } from "@/lib/format";

/**
 * Wortmarke für die Navigationsleiste. Rein typografisch – keine Anlehnung an
 * fremde Markenassets. Der große Zeitungskopf steht auf der Titelseite selbst.
 */
export function Wordmark({ className }: { className?: string }) {
  return (
    <Link
      href="/"
      className={cx("group inline-flex items-baseline gap-2", className)}
      aria-label="Leonida Kurier – Startseite"
    >
      <span className="masthead text-[17px] text-ink-900 transition-colors group-hover:text-coral-600">
        Leonida
      </span>
      <span className="masthead text-[17px] text-coral-600">Kurier</span>
    </Link>
  );
}
