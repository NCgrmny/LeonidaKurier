"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { MAIN_NAV } from "@/lib/site";
import { cx } from "@/lib/format";
import { Container } from "@/components/ui/Container";
import { Wordmark } from "./Wordmark";

/**
 * Schmale Ressortleiste im Zeitungsstil: Versalien, kräftige Trennlinie,
 * durchgehend sichtbar. Der große Zeitungskopf steht darunter auf der
 * Titelseite und tritt hier bewusst nicht in Konkurrenz.
 */
export function SiteHeader() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const onHome = pathname === "/";

  return (
    <header className="sticky top-0 z-50 border-b-2 border-ink-900 bg-paper-100/95 backdrop-blur-sm">
      <Container width="wide">
        <div className="flex h-12 items-center justify-between gap-4">
          <Wordmark className={onHome ? "lg:opacity-0 lg:transition-opacity" : ""} />

          <nav aria-label="Hauptnavigation" className="hidden lg:block">
            <ul className="flex items-center gap-7">
              {MAIN_NAV.map((item) => {
                const active =
                  pathname === item.href || pathname.startsWith(`${item.href}/`);
                return (
                  <li key={item.href}>
                    <Link
                      href={item.href}
                      aria-current={active ? "page" : undefined}
                      className={cx(
                        "relative block py-3 font-mono text-[11px] font-bold uppercase tracking-[0.2em] transition-colors",
                        active ? "text-coral-600" : "text-ink-700 hover:text-coral-600",
                      )}
                    >
                      {item.label}
                      {active ? (
                        <span
                          aria-hidden
                          className="absolute inset-x-0 bottom-0 h-[3px] bg-coral-500"
                        />
                      ) : null}
                    </Link>
                  </li>
                );
              })}
            </ul>
          </nav>

          <div className="flex items-center gap-2">
            {/* Suche als Symbol: nimmt in der Leiste keinen Platz, fuehrt aber
                auf eine vollwertige Seite und funktioniert ohne JavaScript. */}
            <Link
              href="/suche"
              aria-label="Suche"
              title="Suche"
              className="inline-flex size-9 items-center justify-center border border-ink-900/25 text-ink-900 transition-colors hover:border-coral-500 hover:text-coral-600"
            >
              <svg viewBox="0 0 20 20" aria-hidden="true" className="size-4">
                <circle
                  cx="8.5"
                  cy="8.5"
                  r="5.25"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.9"
                />
                <path
                  d="M12.6 12.6 17 17"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.9"
                  strokeLinecap="round"
                />
              </svg>
            </Link>
            <Link
              href="/kompass"
              className="hidden bg-night-900 px-3.5 py-1.5 font-mono text-[10px] font-bold uppercase tracking-[0.18em] text-paper-100 transition-colors hover:bg-lagoon-700 sm:inline-block"
            >
              Karte öffnen
            </Link>
            <button
              type="button"
              onClick={() => setOpen((value) => !value)}
              aria-expanded={open}
              aria-controls="mobile-nav"
              className="inline-flex size-9 items-center justify-center border border-ink-900/25 text-ink-900 lg:hidden"
            >
              <span className="sr-only">Navigation {open ? "schließen" : "öffnen"}</span>
              <span aria-hidden className="grid gap-[3px]">
                <span
                  className={cx(
                    "block h-[2px] w-4 bg-current transition-transform",
                    open && "translate-y-[5px] rotate-45",
                  )}
                />
                <span
                  className={cx("block h-[2px] w-4 bg-current transition-opacity", open && "opacity-0")}
                />
                <span
                  className={cx(
                    "block h-[2px] w-4 bg-current transition-transform",
                    open && "-translate-y-[5px] -rotate-45",
                  )}
                />
              </span>
            </button>
          </div>
        </div>
      </Container>

      {open ? (
        <nav
          id="mobile-nav"
          aria-label="Hauptnavigation (mobil)"
          className="border-t border-ink-900/20 bg-paper-50 lg:hidden"
        >
          <Container width="wide">
            <ul className="grid divide-y divide-ink-900/10 py-1">
              {MAIN_NAV.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    onClick={() => setOpen(false)}
                    className="flex items-baseline justify-between gap-4 py-3"
                  >
                    <span className="font-mono text-xs font-bold uppercase tracking-[0.2em] text-ink-900">
                      {item.label}
                    </span>
                    <span className="text-right font-serif text-xs italic text-ink-500">
                      {item.question}
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          </Container>
        </nav>
      ) : null}
    </header>
  );
}
