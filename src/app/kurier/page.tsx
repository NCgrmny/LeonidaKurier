import type { Metadata } from "next";
import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { Masthead } from "@/components/kurier/Masthead";
import { RadarTicker } from "@/components/radar/RadarTicker";
import {
  HeroStory,
  StoryCard,
  articleCategoryLabel,
} from "@/components/kurier/ArticleCard";
import { EmptyState } from "@/components/ui/EmptyState";
import { StatusBadge } from "@/components/ui/StatusBadge";
import { JsonLd } from "@/components/ui/JsonLd";
import { content } from "@/lib/content";
import { formatDate } from "@/lib/format";
import { RADAR_STATUS_ORDER } from "@/lib/status";
import { breadcrumbJsonLd, pageMetadata } from "@/lib/seo";

export const metadata: Metadata = pageMetadata({
  title: "Kurier – Berichte und Analysen aus Leonida",
  description:
    "Alle Berichte des Leonida Kurier: Meldungen, Analysen, Einordnungen und Faktenchecks zu Grand Theft Auto VI – mit Quellen und klarem Status.",
  path: "/kurier",
  keywords: ["GTA 6 News deutsch", "GTA VI Analyse", "GTA 6 Faktencheck"],
});

export default async function KurierPage() {
  const [articles, signals] = await Promise.all([
    content.listArticles(),
    content.listRadarSignals(),
  ]);

  if (articles.length === 0) {
    return (
      <Container width="wide">
        <div className="py-16">
          <EmptyState
            title="Noch keine Berichte veröffentlicht"
            description="Sobald geprüfte Informationen vorliegen, erscheinen sie hier."
          />
        </div>
      </Container>
    );
  }

  const [lead, ...rest] = articles;
  const leadSource = (await content.getSources(lead.sourceIds))[0];
  const secondary = rest.slice(0, 2);
  const briefs = rest.slice(2);

  return (
    <>
      <Container width="wide">
        <Masthead editionDate={lead.publishedAt} />
      </Container>

      <Container width="wide">
        <RadarTicker signals={signals} />
      </Container>

      <Container width="wide">
        <div className="mt-6">
          <HeroStory article={lead} sourceLabel={leadSource?.publisher} />
        </div>

        {/* Titelseite: Meldungsschiene, Hauptspalten, Statusschlüssel */}
        <div className="mt-10 grid gap-8 lg:grid-cols-[13rem_minmax(0,1fr)] lg:gap-10">
          <aside className="order-2 lg:order-1 lg:border-r lg:border-ink-900/15 lg:pr-8">
            <p className="ressort">Kurz gemeldet</p>
            <div className="mt-5 grid gap-3.5">
              {signals.slice(0, 5).map((signal) => (
                <div
                  key={signal.id}
                  className="border-b border-ink-900/12 pb-3.5 last:border-0"
                >
                  <StatusBadge status={signal.status} />
                  <p className="subhead mt-1 text-[17px] leading-tight">{signal.title}</p>
                  <p className="mt-1 font-serif text-[13px] leading-snug text-ink-500">
                    {signal.summary}
                  </p>
                  <p className="meta mt-1.5">{signal.channel}</p>
                </div>
              ))}
            </div>

            <p className="ressort mt-8">Statusschlüssel</p>
            <ul className="mt-4 grid gap-2">
              {RADAR_STATUS_ORDER.map((status) => (
                <li key={status}>
                  <StatusBadge status={status} />
                </li>
              ))}
            </ul>

            <Link
              href="/radar"
              className="mt-6 inline-block font-mono text-[10px] font-bold uppercase tracking-[0.18em] text-coral-600 hover:underline"
            >
              Alle Signale im Radar →
            </Link>
          </aside>

          <div className="order-1 lg:order-2">
            {secondary.length > 0 ? (
              <>
                <p className="ressort">Weitere Berichte</p>
                <div className="mt-6 grid gap-x-7 gap-y-9 sm:grid-cols-2">
                  {secondary.map((article) => (
                    <StoryCard key={article.id} article={article} />
                  ))}
                </div>
              </>
            ) : null}

            {briefs.length > 0 ? (
              <section className="mt-10 border-t-2 border-ink-900 pt-6">
                <p className="ressort">Im Blatt</p>
                <div className="columns-news columns-news-2 mt-6">
                  {briefs.map((article) => (
                    <article
                      key={article.id}
                      className="column-item relative mb-6 border-b border-ink-900/12 pb-5"
                    >
                      <div className="flex flex-wrap items-center gap-2.5">
                        <span className="font-mono text-[10px] font-bold uppercase tracking-[0.2em] text-coral-600">
                          {articleCategoryLabel(article.category)}
                        </span>
                        <StatusBadge status={article.status} />
                      </div>
                      <h3 className="subhead mt-1.5 text-[1.35rem] leading-tight">
                        <Link
                          href={`/kurier/${article.slug}`}
                          className="after:absolute after:inset-0 hover:text-coral-600"
                        >
                          {article.title}
                        </Link>
                      </h3>
                      <p className="standfirst mt-2 text-[14px]">{article.standfirst}</p>
                      <p className="meta mt-3">
                        {formatDate(article.publishedAt)} · {article.readingMinutes} Min.
                        {article.demo ? " · Beispiel" : ""}
                      </p>
                    </article>
                  ))}
                </div>
              </section>
            ) : null}
          </div>
        </div>
      </Container>

      <JsonLd
        data={breadcrumbJsonLd([
          { name: "Start", path: "/" },
          { name: "Kurier", path: "/kurier" },
        ])}
      />
    </>
  );
}
