import Link from "next/link";
import { formatDate } from "@/lib/format";
import type { Article } from "@/lib/types";
import { DemoBadge, StatusBadge } from "@/components/ui/StatusBadge";

const CATEGORY_LABEL: Record<Article["category"], string> = {
  meldung: "Meldung",
  analyse: "Analyse",
  einordnung: "Einordnung",
  hintergrund: "Hintergrund",
  faktencheck: "Faktencheck",
};

export function articleCategoryLabel(category: Article["category"]): string {
  return CATEGORY_LABEL[category];
}

/** Aufmacher: grosse Meldung im oberen Bereich der Startseite. */
export function LeadArticle({ article }: { article: Article }) {
  return (
    <article className="group relative overflow-hidden rounded-2xl border border-[var(--rule)] bg-ink-900/70">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-coral-400/60 to-transparent"
      />
      <div className="grid gap-8 p-6 sm:p-9 lg:grid-cols-[minmax(0,1.6fr)_minmax(0,1fr)] lg:gap-12">
        <div>
          <div className="flex flex-wrap items-center gap-2">
            <span className="kicker">{CATEGORY_LABEL[article.category]}</span>
            <StatusBadge status={article.status} size="sm" />
            {article.demo ? <DemoBadge /> : null}
          </div>
          <h3 className="headline mt-4 text-3xl text-paper-50 sm:text-4xl lg:text-[2.75rem]">
            <Link href={`/kurier/${article.slug}`} className="after:absolute after:inset-0">
              {article.title}
            </Link>
          </h3>
          <p className="standfirst mt-4 max-w-2xl text-base sm:text-lg">
            {article.standfirst}
          </p>
          <p className="mt-6 font-mono text-[11px] uppercase tracking-[0.14em] text-paper-500">
            {formatDate(article.publishedAt)} · {article.author} · {article.readingMinutes} Min.
          </p>
        </div>

        {article.facts && article.facts.length > 0 ? (
          <aside className="rounded-xl border border-[var(--rule)] bg-ink-850/70 p-5">
            <p className="kicker mb-3">Was gesichert ist</p>
            <ul className="grid gap-2.5">
              {article.facts.slice(0, 3).map((fact) => (
                <li key={fact} className="flex gap-2.5 text-sm leading-relaxed text-paper-200">
                  <span aria-hidden className="mt-2 block size-1 shrink-0 rounded-full bg-lagoon-400" />
                  {fact}
                </li>
              ))}
            </ul>
          </aside>
        ) : null}
      </div>
    </article>
  );
}

export function ArticleCard({ article }: { article: Article }) {
  return (
    <article className="group relative flex h-full flex-col rounded-xl border border-[var(--rule)] bg-ink-900/50 p-5 transition-colors hover:border-coral-400/35 hover:bg-ink-850">
      <div className="flex flex-wrap items-center gap-2">
        <span className="kicker">{CATEGORY_LABEL[article.category]}</span>
        <StatusBadge status={article.status} size="sm" />
      </div>
      <h3 className="headline mt-3 text-xl text-paper-50">
        <Link href={`/kurier/${article.slug}`} className="after:absolute after:inset-0">
          {article.title}
        </Link>
      </h3>
      <p className="standfirst mt-2 line-clamp-3 text-sm">{article.standfirst}</p>
      <p className="mt-auto pt-5 font-mono text-[10px] uppercase tracking-[0.14em] text-paper-500">
        {formatDate(article.publishedAt)} · {article.readingMinutes} Min.
        {article.demo ? " · Beispielinhalt" : ""}
      </p>
    </article>
  );
}
