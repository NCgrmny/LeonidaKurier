import Link from "next/link";
import type { ReactNode } from "react";

/** Ressortkopf mit kräftiger Linie und optionalem Weiterlesen-Verweis. */
export function SectionHeading({
  ressort,
  title,
  description,
  action,
  id,
}: {
  ressort: string;
  title?: ReactNode;
  description?: string;
  action?: { href: string; label: string };
  id?: string;
}) {
  return (
    <div id={id}>
      <div className="flex items-end justify-between gap-6 border-b-2 border-current pb-2">
        <p className="font-mono text-[11px] font-bold uppercase tracking-[0.24em]">
          {ressort}
        </p>
        {action ? (
          <Link
            href={action.href}
            className="group shrink-0 font-mono text-[10px] font-bold uppercase tracking-[0.18em] text-coral-600 hover:text-coral-500"
          >
            {action.label}{" "}
            <span aria-hidden className="inline-block transition-transform group-hover:translate-x-0.5">
              →
            </span>
          </Link>
        ) : null}
      </div>
      {title ? (
        <h2 className="subhead mt-4 text-2xl sm:text-3xl">{title}</h2>
      ) : null}
      {description ? (
        <p className="standfirst mt-2 max-w-2xl text-[15px]">{description}</p>
      ) : null}
    </div>
  );
}
