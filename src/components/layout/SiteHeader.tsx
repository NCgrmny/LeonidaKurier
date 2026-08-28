"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { MAIN_NAV } from "@/lib/site";
import { cx } from "@/lib/format";
import { Container } from "@/components/ui/Container";
import { Wordmark } from "./Wordmark";

export function SiteHeader() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 border-b border-[var(--rule)] bg-ink-950/85 backdrop-blur-md">
      <Container width="wide">
        <div className="flex h-16 items-center justify-between gap-4">
          <Wordmark />

          <nav aria-label="Hauptnavigation" className="hidden lg:block">
            <ul className="flex items-center gap-1">
              {MAIN_NAV.map((item) => {
                const active =
                  pathname === item.href || pathname.startsWith(`${item.href}/`);
                return (
                  <li key={item.href}>
                    <Link
                      href={item.href}
                      aria-current={active ? "page" : undefined}
                      className={cx(
                        "relative rounded-md px-3 py-2 font-mono text-[11px] uppercase tracking-[0.16em] transition-colors",
                        active
                          ? "text-paper-50"
                          : "text-paper-400 hover:text-paper-50",
                      )}
                    >
                      {item.label}
                      {active ? (
                        <span
                          aria-hidden
                          className="absolute inset-x-3 -bottom-px h-px bg-coral-400"
                        />
                      ) : null}
                    </Link>
                  </li>
                );
              })}
            </ul>
          </nav>

          <div className="flex items-center gap-2">
            <Link
              href="/kompass"
              className="hidden rounded-md border border-lagoon-400/35 bg-lagoon-500/10 px-3.5 py-2 font-mono text-[11px] uppercase tracking-[0.16em] text-lagoon-300 transition-colors hover:bg-lagoon-500/20 sm:inline-block"
            >
              Karte öffnen
            </Link>
            <button
              type="button"
              onClick={() => setOpen((value) => !value)}
              aria-expanded={open}
              aria-controls="mobile-nav"
              className="inline-flex size-10 items-center justify-center rounded-md border border-[var(--rule)] text-paper-200 lg:hidden"
            >
              <span className="sr-only">Navigation {open ? "schließen" : "öffnen"}</span>
              <span aria-hidden className="grid gap-1">
                <span
                  className={cx(
                    "block h-px w-5 bg-current transition-transform",
                    open && "translate-y-[5px] rotate-45",
                  )}
                />
                <span
                  className={cx("block h-px w-5 bg-current transition-opacity", open && "opacity-0")}
                />
                <span
                  className={cx(
                    "block h-px w-5 bg-current transition-transform",
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
          className="border-t border-[var(--rule)] bg-ink-950 lg:hidden"
        >
          <Container width="wide">
            <ul className="grid gap-1 py-3">
              {MAIN_NAV.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    // Nach der Navigation schliesst sich die mobile Ebene wieder.
                    onClick={() => setOpen(false)}
                    className="flex items-baseline justify-between gap-4 rounded-lg px-3 py-3 hover:bg-ink-850"
                  >
                    <span className="font-mono text-xs uppercase tracking-[0.16em] text-paper-50">
                      {item.label}
                    </span>
                    <span className="text-right text-xs text-paper-500">
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
