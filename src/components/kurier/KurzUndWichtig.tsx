import Link from "next/link";
import type { Article } from "@/lib/types";
import { StatusBadge } from "@/components/ui/StatusBadge";

/**
 * Spalte „Kurz & Wichtig“ neben dem Aufmacher.
 *
 * Eine Titelseite lebt davon, dass neben der grossen Sache mehrere kleine
 * stehen – sonst bleibt viel Weissraum und wenig Anlass weiterzulesen. Die
 * Eintraege sind bewusst knapp: Schlagzeile, zwei Zeilen, Verweis.
 */
export function KurzUndWichtig({ artikel }: { artikel: Article[] }) {
  if (artikel.length === 0) return null;

  return (
    <aside aria-labelledby="kurz-wichtig" className="lg:border-l lg:border-ink-900/20 lg:pl-6">
      <div className="border-b-2 border-ink-900 pb-1.5">
        <h2 id="kurz-wichtig" className="subhead text-[1.35rem] italic text-coral-600">
          Kurz &amp; wichtig
        </h2>
      </div>

      <ul className="divide-y divide-ink-900/15">
        {artikel.map((eintrag) => (
          <li key={eintrag.id} className="group relative py-3.5">
            <StatusBadge status={eintrag.status} />
            <h3 className="subhead mt-1 text-[1.05rem] leading-tight">
              <Link
                href={`/kurier/${eintrag.slug}`}
                className="after:absolute after:inset-0 group-hover:text-coral-600"
              >
                {eintrag.title}
              </Link>
            </h3>
            <p className="mt-1 line-clamp-3 font-serif text-[13px] leading-snug text-ink-600">
              {eintrag.summary}
            </p>
          </li>
        ))}
      </ul>
    </aside>
  );
}
