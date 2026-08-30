import Link from "next/link";
import { Scene, motifForSlug } from "@/components/art/Scene";
import { formatDate } from "@/lib/format";
import type { Article, MotifVariant } from "@/lib/types";
import { DemoBadge, StatusBadge } from "@/components/ui/StatusBadge";
import { Standortkarte, type Kartenpunkt } from "@/components/kompass/Standortkarte";
import { Pressefoto } from "@/components/ui/Pressefoto";
import { fotoFuer } from "@/lib/content/bildzuordnung";
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
  punkte,
}: {
  article: Article;
  sourceLabel?: string;
  /** Von der Seite zugeteilte Motivflaeche – verhindert Doppelbilder. */
  motif?: MotifVariant;
  /** Orte, um die es im Beitrag geht. Sind welche da, steht die Karte statt des Motivs. */
  punkte?: Kartenpunkt[];
}) {
  const foto = fotoFuer(article.slug);

  return (
    /**
     * Aufmacher im Titelseitensatz: Das Motiv steht ungetrübt in seiner
     * eigenen Spalte, die Schlagzeile daneben auf Papier. Ein Verlauf über
     * dem Bild – damit weiße Schrift darauf lesbar wird – nimmt der
     * Illustration genau die Farbe, für die sie gebaut ist. Im Druck löst
     * das niemand so; dort steht der Text neben dem Bild.
     */
    <article className="group relative isolate border-y-2 border-ink-900 bg-paper-50">
      {/* Keine order-Umkehr: auf schmalen Geraeten steht die Schlagzeile
          zuerst, dann das Bild. Ein Aufmacher, der mit vier nummerierten
          Bildbefunden beginnt, laesst den Leser Belege lesen, bevor er weiss,
          worum es geht. */}
      <div className="grid lg:grid-cols-[minmax(0,1fr)_minmax(0,1.05fr)]">
        {/* Textspalte */}
        <div className="flex flex-col justify-between p-6 sm:p-8 lg:p-10">
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
        <figure className="m-0 flex flex-col lg:border-l-2 lg:border-ink-900">
          <div className="relative min-h-[15rem] flex-1 overflow-hidden bg-night-950 sm:min-h-[20rem] lg:min-h-[22rem]">
            {/* Rangfolge der Bildflaeche: belegtes Foto, sonst Karte, sonst
                Motiv. Der Bildbestand ist noch leer – die Reihenfolge steht
                trotzdem hier, damit ein spaeteres Foto ohne Umbau greift. */}
            {foto ? (
              <Pressefoto bild={foto} prioritaet />
            ) : punkte && punkte.length > 0 ? (
              <Standortkarte punkte={punkte} />
            ) : (
              <>
                <Scene variant={motif ?? article.motif ?? motifForSlug(article.slug)} />
                <figcaption className="absolute bottom-0 right-0 bg-ink-900/85 px-2.5 py-1 font-mono text-[8px] uppercase tracking-[0.14em] text-paper-200">
                  Illustration · Leonida Kurier
                </figcaption>
              </>
            )}
          </div>
          {article.bildbefunde ? <BildBefunde befunde={article.bildbefunde} /> : null}
        </figure>
      </div>
    </article>
  );
}

/**
 * Nebenmeldung.
 *
 * `spalte` setzt sie als gesetzte Spalte statt als Bildkarte: Balkenlinie,
 * grosse Zeile, Initiale im Anreisser. Das ist die Antwort einer Zeitung auf
 * eine Meldung, zu der es kein Bild gibt – sie erfindet keines, sie gibt der
 * Geschichte mehr Satz. Bilder stehen dort, wo sie etwas zeigen: die
 * Standortkarte im Aufmacher, die Karten und Satzplatten in der Datenbank.
 */
export function StoryCard({
  article,
  withImage = true,
  motif,
  punkte,
  spalte = false,
}: {
  article: Article;
  withImage?: boolean;
  /** Von der Seite zugeteilte Motivflaeche – verhindert Doppelbilder. */
  motif?: MotifVariant;
  /** Orte, um die es im Beitrag geht. Sind welche da, steht die Karte statt des Motivs. */
  punkte?: Kartenpunkt[];
  /** Gesetzte Spalte statt Bildkarte. */
  spalte?: boolean;
}) {
  if (spalte) return <SpaltenStory article={article} />;

  return (
    <article className="group relative flex h-full flex-col">
      {withImage ? (
        <div className="relative mb-3 aspect-[16/10] overflow-hidden bg-night-900">
          {fotoFuer(article.slug) ? (
            <Pressefoto bild={fotoFuer(article.slug)!} />
          ) : punkte && punkte.length > 0 ? (
            <Standortkarte punkte={punkte} kompakt />
          ) : (
            <Scene variant={motif ?? article.motif ?? motifForSlug(article.slug)} />
          )}
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

function SpaltenStory({ article }: { article: Article }) {
  const anreisser =
    article.body.find((block) => block.type === "paragraph")?.text ?? article.summary;

  return (
    <article className="group relative flex h-full flex-col border-t-2 border-ink-900 pt-3">
      <div className="flex flex-wrap items-center gap-3">
        <span className="font-mono text-[10px] font-bold uppercase tracking-[0.2em] text-coral-600">
          {CATEGORY_LABEL[article.category]}
        </span>
        <StatusBadge status={article.status} />
        {article.demo ? <DemoBadge /> : null}
      </div>

      <h3 className="headline mt-3 text-[1.55rem] leading-[0.98] sm:text-[1.9rem]">
        <Link
          href={`/kurier/${article.slug}`}
          className="after:absolute after:inset-0 group-hover:text-coral-700"
        >
          <Schlagzeile text={article.title} />
        </Link>
      </h3>

      <p className="standfirst mt-3 text-[15px] leading-relaxed">{article.standfirst}</p>

      <p className="dropcap body-text mt-3 line-clamp-4 text-[14.5px] leading-relaxed text-ink-700">
        {anreisser}
      </p>

      <p className="meta mt-auto border-t border-ink-900/15 pt-3">
        {formatDate(article.publishedAt)} · {article.readingMinutes} Min. Lesezeit
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
