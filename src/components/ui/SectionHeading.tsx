import Link from "next/link";
import type { ReactNode } from "react";

/** Abschnittskopf im Zeitungslayout: Kicker, Titel, optionaler Weiterlesen-Link. */
export function SectionHeading({
  kicker,
  title,
  description,
  action,
  id,
}: {
  kicker?: string;
  title: ReactNode;
  description?: string;
  action?: { href: string; label: string };
  id?: string;
}) {
  return (
    <div
      id={id}
      className="flex flex-col gap-3 border-t border-[var(--rule)] pt-5 sm:flex-row sm:items-end sm:justify-between sm:gap-8"
    >
      <div className="max-w-2xl">
        {kicker ? <p className="kicker mb-2">{kicker}</p> : null}
        <h2 className="headline text-2xl text-paper-50 sm:text-3xl">{title}</h2>
        {description ? (
          <p className="standfirst mt-2 text-sm sm:text-base">{description}</p>
        ) : null}
      </div>
      {action ? (
        <Link
          href={action.href}
          className="group inline-flex shrink-0 items-center gap-2 font-mono text-[11px] uppercase tracking-[0.16em] text-lagoon-300 transition-colors hover:text-lagoon-400"
        >
          {action.label}
          <span aria-hidden className="transition-transform group-hover:translate-x-0.5">
            →
          </span>
        </Link>
      ) : null}
    </div>
  );
}
