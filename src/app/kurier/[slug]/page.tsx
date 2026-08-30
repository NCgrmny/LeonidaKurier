import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Container } from "@/components/ui/Container";
import { Scene, motifForSlug } from "@/components/art/Scene";
import { Standortkarte } from "@/components/kompass/Standortkarte";
import { kartenpunkteFuerArtikel } from "@/lib/kartenpunkte";
import { ArticleBody } from "@/components/kurier/ArticleBody";
import { articleCategoryLabel, StoryCard } from "@/components/kurier/ArticleCard";
import { DemoBadge, StatusBadge } from "@/components/ui/StatusBadge";
import { SourceList } from "@/components/ui/SourceList";
import { RelatedRefs } from "@/components/ui/RelatedRefs";
import { JsonLd } from "@/components/ui/JsonLd";
import { content } from "@/lib/content";
import { resolveRefs } from "@/lib/content/queries";
import { formatDate } from "@/lib/format";
import { articleJsonLd, breadcrumbJsonLd, pageMetadata } from "@/lib/seo";
import { statusDefinition } from "@/lib/status";

export async function generateStaticParams() {
  const articles = await content.listArticles();
  return articles.map((article) => ({ slug: article.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const article = await content.getArticle(slug);
  if (!article) return { title: "Bericht nicht gefunden" };

  return pageMetadata({
    title: article.title,
    description: article.summary,
    path: `/kurier/${article.slug}`,
    type: "article",
    publishedTime: article.publishedAt,
    modifiedTime: article.updatedAt,
  });
}

export default async function ArticlePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const article = await content.getArticle(slug);
  if (!article) notFound();

  const [sources, related, all, orte] = await Promise.all([
    content.getSources(article.sourceIds),
    resolveRefs(article.related),
    content.listArticles(),
    content.listLocations(),
  ]);
  const punkte = kartenpunkteFuerArtikel(article, orte);
  const status = statusDefinition(article.status);
  const more = all.filter((entry) => entry.slug !== article.slug).slice(0, 3);

  return (
    <article>
      {/* Aufmacherbild mit überlagerter Rubrik und Schlagzeile */}
      <div className="relative isolate overflow-hidden bg-night-950">
        <div className="absolute inset-0">
          {/* Geht es im Bericht um Orte, steht deren Lage im Kopf. */}
          {punkte.length > 0 ? (
            <Standortkarte punkte={punkte} kompakt />
          ) : (
            <Scene variant={article.motif ?? motifForSlug(article.slug)} />
          )}
        </div>
        {/* Ueber einer Karte liegt ein staerkerer Verlauf nur unten: Die
            Schlagzeile braucht Grund, die Karte oben bleibt lesbar. */}
        <div
          aria-hidden
          className={
            punkte.length > 0
              ? "absolute inset-0 bg-gradient-to-t from-night-950 via-night-950/72 to-transparent"
              : "absolute inset-0 bg-gradient-to-t from-night-950 via-night-950/58 to-night-950/8"
          }
        />
        <Container width="wide">
          <div className="relative flex min-h-[22rem] flex-col justify-end py-10 sm:min-h-[28rem] sm:py-14">
            <nav aria-label="Brotkrumen" className="meta mb-5 text-paper-300">
              <Link href="/kurier" className="hover:text-coral-400">
                Kurier
              </Link>
              <span aria-hidden> / </span>
              <span>{articleCategoryLabel(article.category)}</span>
            </nav>

            <div className="flex flex-wrap items-center gap-3">
              <span className="rubric">{articleCategoryLabel(article.category)}</span>
              <StatusBadge status={article.status} tone="night" />
              {article.demo ? <DemoBadge className="text-paper-300" /> : null}
            </div>

            <h1 className="headline mt-5 max-w-4xl text-[2.1rem] text-paper-50 sm:text-[3.1rem] lg:text-[3.6rem]">
              {article.title}
            </h1>
            <p className="mt-4 max-w-2xl font-serif text-[1.05rem] leading-relaxed text-paper-200 sm:text-[1.2rem]">
              {article.standfirst}
            </p>
            <p className="mt-6 border-t border-paper-100/20 pt-4 font-mono text-[10px] uppercase tracking-[0.16em] text-paper-300">
              {formatDate(article.publishedAt)} · {article.author} ·{" "}
              {article.readingMinutes} Min. Lesezeit
            </p>
          </div>
        </Container>
      </div>

      <Container width="wide">
        <div className="grid gap-10 py-10 lg:grid-cols-[minmax(0,1fr)_19rem] lg:gap-14 lg:py-14">
          <div className="min-w-0 max-w-3xl">
            {article.demo ? (
              <p className="mb-8 border-l-4 border-ink-400 bg-paper-200/70 px-4 py-3 font-serif text-[13px] leading-relaxed text-ink-600">
                Dieser Bericht ist ein redaktioneller Beispielinhalt der ersten
                Ausbaustufe. Er enthält ausschließlich öffentlich belegte Aussagen und
                keine unbestätigten Behauptungen.
              </p>
            ) : null}

            <div className="body-text">
              <ArticleBody blocks={article.body} />
            </div>

            {article.facts && article.facts.length > 0 ? (
              <section className="mt-12 border-y-2 border-ink-900 py-6">
                <p className="ressort inline-block">Was gesichert ist</p>
                <ul className="mt-4 grid gap-3">
                  {article.facts.map((fact) => (
                    <li
                      key={fact}
                      className="flex gap-3 font-serif text-[15px] leading-relaxed text-ink-800"
                    >
                      <span
                        aria-hidden
                        className="mt-2.5 block h-0.5 w-3 shrink-0 bg-lagoon-600"
                      />
                      {fact}
                    </li>
                  ))}
                </ul>
              </section>
            ) : null}

            <div className="mt-6 grid gap-6 sm:grid-cols-2">
              {article.assessment ? (
                <section className="border-t border-ink-900/20 pt-4">
                  <p className="ressort inline-block">Einordnung</p>
                  <p className="mt-3 font-serif text-[15px] leading-relaxed text-ink-800">
                    {article.assessment}
                  </p>
                </section>
              ) : null}

              {article.communityReaction ? (
                <section className="border-t border-ink-900/20 pt-4">
                  <p className="ressort inline-block">Community</p>
                  <p className="mt-3 font-serif text-[15px] leading-relaxed text-ink-800">
                    {article.communityReaction}
                  </p>
                  <p className="mt-2 font-serif text-[12px] italic text-ink-500">
                    Community-Aufkommen ist ein Signal für die Recherche – kein Beleg.
                  </p>
                </section>
              ) : null}
            </div>
          </div>

          <aside className="lg:sticky lg:top-20 lg:self-start">
            <div className="border-t-2 border-ink-900 pt-4">
              <p className="ressort inline-block">Status</p>
              <div className="mt-3">
                <StatusBadge status={article.status} />
              </div>
              <p className="mt-2 font-serif text-[13px] leading-snug text-ink-600">
                {status.definition}
              </p>
            </div>

            <div className="mt-8">
              <p className="ressort mb-4">Quellen</p>
              <SourceList sources={sources} />
            </div>

            {related.length > 0 ? (
              <div className="mt-8">
                <p className="ressort mb-4">Verknüpft</p>
                <div className="[&_ul]:grid-cols-1">
                  <RelatedRefs refs={related} />
                </div>
              </div>
            ) : null}
          </aside>
        </div>

        {more.length > 0 ? (
          <section className="border-t-2 border-ink-900 py-10">
            <p className="ressort inline-block">Weiter im Kurier</p>
            <div className="mt-6 grid gap-x-7 gap-y-8 sm:grid-cols-2 lg:grid-cols-3">
              {more.map((entry) => (
                <StoryCard key={entry.id} article={entry} />
              ))}
            </div>
          </section>
        ) : null}
      </Container>

      <JsonLd
        data={articleJsonLd({
          title: article.title,
          description: article.summary,
          path: `/kurier/${article.slug}`,
          author: article.author,
          publishedAt: article.publishedAt,
          updatedAt: article.updatedAt,
        })}
      />
      <JsonLd
        data={breadcrumbJsonLd([
          { name: "Start", path: "/" },
          { name: "Kurier", path: "/kurier" },
          { name: article.title, path: `/kurier/${article.slug}` },
        ])}
      />
    </article>
  );
}
