import Link from "next/link";
import { Scene, motifForSlug } from "@/components/art/Scene";
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

/**
 * Aufmacher der Titelseite: großes Motiv, überlagerte Rubrik, dominante
 * Schlagzeile, Einordnung, Status und Quelle.
 */
export function HeroStory({
  article,
  sourceLabel,
}: {
  article: Article;
  sourceLabel?: string;
}) {
  return (
    <article className="group relative isolate overflow-hidden bg-night-950">
      <div className="absolute inset-0">
        <Scene variant={article.motif ?? motifForSlug(article.slug)} />
      </div>
      {/* Verlauf, damit die Schlagzeile auf dem Motiv steht statt daneben. */}
      <div
        aria-hidden
        className="absolute inset-0 bg-gradient-to-t from-night-950 via-night-950/55 to-night-950/5"
      />
      <div
        aria-hidden
        className="absolute inset-0 bg-gradient-to-r from-night-950/80 via-transparent to-transparent"
      />

      <div className="relative flex min-h-[26rem] flex-col justify-end p-6 sm:min-h-[32rem] sm:p-9 lg:min-h-[36rem] lg:p-12">
        <div className="flex flex-wrap items-center gap-3">
          <span className="rubric">{CATEGORY_LABEL[article.category]}</span>
          <StatusBadge status={article.status} tone="night" />
          {article.demo ? <DemoBadge className="text-paper-300" /> : null}
        </div>

        <h2 className="headline mt-5 max-w-4xl text-[2.1rem] text-paper-50 sm:text-[3.2rem] lg:text-[4rem]">
          <Link href={`/kurier/${article.slug}`} className="after:absolute after:inset-0">
            {article.title}
          </Link>
        </h2>

        <p className="mt-4 max-w-2xl font-serif text-[1.05rem] leading-relaxed text-paper-200 sm:text-[1.2rem]">
          {article.standfirst}
        </p>

        <div className="mt-6 flex flex-wrap items-center gap-x-5 gap-y-2 border-t border-paper-100/20 pt-4">
          <span className="font-mono text-[10px] uppercase tracking-[0.16em] text-paper-300">
            {formatDate(article.publishedAt)}
          </span>
          <span className="font-mono text-[10px] uppercase tracking-[0.16em] text-paper-300">
            {article.author}
          </span>
          {sourceLabel ? (
            <span className="font-mono text-[10px] uppercase tracking-[0.16em] text-lagoon-300">
              Quelle: {sourceLabel}
            </span>
          ) : null}
          <span className="ml-auto inline-flex items-center gap-2 bg-coral-500 px-4 py-2 font-mono text-[10px] font-bold uppercase tracking-[0.18em] text-paper-50 transition-colors group-hover:bg-coral-400">
            Bericht lesen <span aria-hidden>→</span>
          </span>
        </div>
      </div>
    </article>
  );
}

/** Nebenmeldung mit Motivstreifen. */
export function StoryCard({
  article,
  withImage = true,
}: {
  article: Article;
  withImage?: boolean;
}) {
  return (
    <article className="group relative flex h-full flex-col">
      {withImage ? (
        <div className="relative mb-3 aspect-[16/10] overflow-hidden bg-night-900">
          <Scene variant={article.motif ?? motifForSlug(article.slug)} />
          <span className="absolute left-0 top-0 rubric text-[9px]">
            {CATEGORY_LABEL[article.category]}
          </span>
        </div>
      ) : null}

      <div className="flex flex-wrap items-center gap-2.5">
        {!withImage ? (
          <span className="font-mono text-[10px] font-bold uppercase tracking-[0.2em] text-coral-600">
            {CATEGORY_LABEL[article.category]}
          </span>
        ) : null}
        <StatusBadge status={article.status} />
      </div>

      <h3 className="subhead mt-1.5 text-xl leading-tight sm:text-[1.4rem]">
        <Link href={`/kurier/${article.slug}`} className="after:absolute after:inset-0 hover:text-coral-600">
          {article.title}
        </Link>
      </h3>

      <p className="standfirst mt-2 line-clamp-3 text-[14px]">{article.standfirst}</p>

      <p className="meta mt-auto pt-3">
        {formatDate(article.publishedAt)} · {article.readingMinutes} Min.
        {article.demo ? " · Beispiel" : ""}
      </p>
    </article>
  );
}

/** Kurzmeldung für die Meldungsspalte – ohne Bild, eng gesetzt. */
export function BriefItem({ article }: { article: Article }) {
  return (
    <article className="group relative border-b border-ink-900/12 pb-3.5 last:border-0">
      <StatusBadge status={article.status} />
      <h3 className="subhead mt-1 text-[17px] leading-tight">
        <Link href={`/kurier/${article.slug}`} className="after:absolute after:inset-0 hover:text-coral-600">
          {article.title}
        </Link>
      </h3>
      <p className="mt-1 line-clamp-2 font-serif text-[13px] leading-snug text-ink-500">
        {article.standfirst}
      </p>
    </article>
  );
}
