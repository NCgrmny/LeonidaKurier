import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Container } from "@/components/ui/Container";
import { ArticleBody } from "@/components/kurier/ArticleBody";
import { articleCategoryLabel } from "@/components/kurier/ArticleCard";
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
  if (!article) return { title: "Beitrag nicht gefunden" };

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

  const [sources, related] = await Promise.all([
    content.getSources(article.sourceIds),
    resolveRefs(article.related),
  ]);
  const status = statusDefinition(article.status);

  return (
    <Container width="wide">
      <article className="py-12 sm:py-16">
        <nav aria-label="Brotkrumen" className="kicker mb-8">
          <Link href="/kurier" className="hover:text-paper-200">
            Kurier
          </Link>
          <span aria-hidden> / </span>
          <span>{articleCategoryLabel(article.category)}</span>
        </nav>

        <div className="grid gap-12 lg:grid-cols-[minmax(0,1fr)_18rem] lg:gap-16">
          <div className="min-w-0">
            <header className="max-w-3xl">
              <div className="flex flex-wrap items-center gap-2">
                <StatusBadge status={article.status} />
                {article.demo ? <DemoBadge /> : null}
              </div>
              <h1 className="headline mt-4 text-4xl text-paper-50 sm:text-5xl">
                {article.title}
              </h1>
              <p className="standfirst mt-5 text-lg sm:text-xl">{article.standfirst}</p>
              <p className="mt-6 border-t border-[var(--rule)] pt-4 font-mono text-[11px] uppercase tracking-[0.14em] text-paper-500">
                {formatDate(article.publishedAt)} · {article.author} ·{" "}
                {article.readingMinutes} Min. Lesezeit
              </p>
            </header>

            {article.demo ? (
              <p className="mt-8 rounded-lg border border-[var(--rule)] bg-ink-900/60 px-4 py-3 text-xs leading-relaxed text-paper-400">
                Dieser Beitrag ist ein redaktioneller Beispielinhalt der ersten
                Ausbaustufe. Er enthält ausschließlich öffentlich belegte Aussagen und
                keine unbestätigten Behauptungen.
              </p>
            ) : null}

            <div className="mt-10 max-w-3xl">
              <ArticleBody blocks={article.body} />
            </div>

            {article.facts && article.facts.length > 0 ? (
              <section className="mt-12 max-w-3xl rounded-xl border border-[var(--rule)] bg-ink-900/50 p-6">
                <h2 className="kicker mb-4">Fakten</h2>
                <ul className="grid gap-3">
                  {article.facts.map((fact) => (
                    <li key={fact} className="flex gap-3 text-sm leading-relaxed text-paper-200">
                      <span
                        aria-hidden
                        className="mt-2 block size-1 shrink-0 rounded-full bg-lagoon-400"
                      />
                      {fact}
                    </li>
                  ))}
                </ul>
              </section>
            ) : null}

            {article.assessment ? (
              <section className="mt-4 max-w-3xl rounded-xl border border-[var(--rule)] bg-ink-900/50 p-6">
                <h2 className="kicker mb-3">Einordnung</h2>
                <p className="text-sm leading-relaxed text-paper-200">
                  {article.assessment}
                </p>
              </section>
            ) : null}

            {article.communityReaction ? (
              <section className="mt-4 max-w-3xl rounded-xl border border-[var(--rule)] bg-ink-900/50 p-6">
                <h2 className="kicker mb-3">Community-Reaktion</h2>
                <p className="text-sm leading-relaxed text-paper-200">
                  {article.communityReaction}
                </p>
                <p className="mt-3 text-xs text-paper-500">
                  Community-Aufkommen ist ein Signal für die Recherche – kein Beleg.
                </p>
              </section>
            ) : null}
          </div>

          <aside className="lg:sticky lg:top-24 lg:self-start">
            <section className="rounded-xl border border-[var(--rule)] bg-ink-900/50 p-5">
              <h2 className="kicker mb-3">Status</h2>
              <StatusBadge status={article.status} />
              <p className="mt-3 text-xs leading-relaxed text-paper-400">
                {status.definition}
              </p>
            </section>

            <section className="mt-4">
              <h2 className="kicker mb-3">Quellen</h2>
              <SourceList sources={sources} />
            </section>

            {related.length > 0 ? (
              <section className="mt-6">
                <h2 className="kicker mb-3">Verknüpfte Inhalte</h2>
                <div className="[&_ul]:grid-cols-1">
                  <RelatedRefs refs={related} />
                </div>
              </section>
            ) : null}
          </aside>
        </div>
      </article>

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
    </Container>
  );
}
