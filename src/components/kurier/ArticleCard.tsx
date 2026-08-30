import Link from "next/link";
import { Scene, motifForSlug } from "@/components/art/Scene";
import { formatDate } from "@/lib/format";
import type { Article, MotifVariant } from "@/lib/types";
import { DemoBadge, StatusBadge } from "@/components/ui/StatusBadge";
import { Schlagzeile } from "./Schlagzeile";
import { BildBefunde } from "./BildBefunde";

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
  motif,
}: {
  article: Article;
  sourceLabel?: string;
  /** Von der Seite zugeteilte Motivflaeche – verhindert Doppelbilder. */
  motif?: MotifVariant;
}) {
  return (
    /**
     * Aufmacher im Titelseitensatz: Das Motiv steht ungetrübt in seiner
     * eigenen Spalte, die Schlagzeile daneben auf Papier. Ein Verlauf über
     * dem Bild – damit weiße Schrift darauf lesbar wird – nimmt der
     * Illustration genau die Farbe, für die sie gebaut ist. Im Druck löst
     * das niemand so; dort steht der Text neben dem Bild.
     */
    <article className="group relative isolate border-y-2 border-ink-900 bg-paper-50">
      <div className="grid lg:grid-cols-[minmax(0,1fr)_minmax(0,1.05fr)]">
        {/* Textspalte */}
        <div className="order-2 flex flex-col justify-between p-6 sm:p-8 lg:order-1 lg:p-10">
          <div>
            <div className="flex flex-wrap items-center gap-3">
              <span className="rubric">{CATEGORY_LABEL[article.category]}</span>
              <StatusBadge status={article.status} />
              {article.demo ? <DemoBadge /> : null}
            </div>

            <h2 className="headline mt-4 text-[2.15rem] leading-[0.92] text-ink-900 sm:text-[2.9rem] lg:text-[3.5rem]">
              <Link
                href={`/kurier/${article.slug}`}
                className="after:absolute after:inset-0"
              >
                <Schlagzeile text={article.title} />
              </Link>
            </h2>

            <p className="standfirst mt-4 max-w-prose text-[1.05rem] leading-relaxed sm:text-[1.15rem]">
              {article.standfirst}
            </p>

            {/* Anreisser aus dem ersten Absatz – Spaltenzentimeter statt Weissraum. */}
            {article.body[0]?.type === "paragraph" ? (
              <p className="body-text mt-4 hidden max-w-prose text-[15px] leading-relaxed text-ink-700 lg:block">
                {article.body[0].text}
              </p>
            ) : null}
          </div>

          <div className="mt-6 flex flex-wrap items-center gap-x-5 gap-y-2 border-t-2 border-ink-900 pt-3">
            <span className="meta">{formatDate(article.publishedAt)}</span>
            <span className="meta">{article.author}</span>
            {sourceLabel ? (
              <span className="meta text-lagoon-700">Quelle: {sourceLabel}</span>
            ) : null}
            <span className="ml-auto inline-flex items-center gap-2 bg-ink-900 px-4 py-2 font-mono text-[10px] font-bold uppercase tracking-[0.18em] text-paper-50 transition-colors group-hover:bg-coral-600">
              Bericht lesen <span aria-hidden>→</span>
            </span>
          </div>
        </div>

        {/* Bildspalte: volle Farbe, kein Schleier. */}
        <figure className="order-1 m-0 flex flex-col lg:order-2 lg:border-l-2 lg:border-ink-900">
          <div className="relative min-h-[15rem] flex-1 overflow-hidden bg-night-950 sm:min-h-[20rem] lg:min-h-[22rem]">
            <Scene variant={motif ?? article.motif ?? motifForSlug(article.slug)} />
            <figcaption className="absolute bottom-0 right-0 bg-ink-900/85 px-2.5 py-1 font-mono text-[8px] uppercase tracking-[0.14em] text-paper-200">
              Illustration · Leonida Kurier
            </figcaption>
          </div>
          {article.bildbefunde ? <BildBefunde befunde={article.bildbefunde} /> : null}
        </figure>
      </div>
    </article>
  );
}

/** Nebenmeldung mit Motivstreifen. */
export function StoryCard({
  article,
  withImage = true,
  motif,
}: {
  article: Article;
  withImage?: boolean;
  /** Von der Seite zugeteilte Motivflaeche – verhindert Doppelbilder. */
  motif?: MotifVariant;
}) {
  return (
    <article className="group relative flex h-full flex-col">
      {withImage ? (
        <div className="relative mb-3 aspect-[16/10] overflow-hidden bg-night-900">
          <Scene variant={motif ?? article.motif ?? motifForSlug(article.slug)} />
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
