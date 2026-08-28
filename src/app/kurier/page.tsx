import type { Metadata } from "next";
import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { Masthead } from "@/components/kurier/Masthead";
import { articleCategoryLabel } from "@/components/kurier/ArticleCard";
import { EmptyState } from "@/components/ui/EmptyState";
import { DemoBadge, StatusBadge } from "@/components/ui/StatusBadge";
import { JsonLd } from "@/components/ui/JsonLd";
import { content } from "@/lib/content";
import { formatDate } from "@/lib/format";
import { statusDefinition } from "@/lib/status";
import { breadcrumbJsonLd, pageMetadata } from "@/lib/seo";
import type { Article } from "@/lib/types";

export const metadata: Metadata = pageMetadata({
  title: "Kurier – Meldungen und Analysen zu GTA VI",
  description:
    "Alle Beiträge des Leonida Kurier: Meldungen, Analysen, Einordnungen und Faktenchecks zu Grand Theft Auto VI – mit Quellen und klarem Status.",
  path: "/kurier",
  keywords: ["GTA 6 News deutsch", "GTA VI Analyse", "GTA 6 Faktencheck"],
});

export default async function KurierPage() {
  const [articles, signals] = await Promise.all([
    content.listArticles(),
    content.listRadarSignals(),
  ]);
  const [lead, ...rest] = articles;
  const secondLead = rest[0];
  const remaining = rest.slice(1);

  if (articles.length === 0) {
    return (
      <Container width="wide">
        <div className="py-16">
          <EmptyState
            title="Noch keine Beiträge veröffentlicht"
            description="Sobald geprüfte Informationen vorliegen, erscheinen sie hier."
          />
        </div>
      </Container>
    );
  }

  return (
    <Container width="wide">
      <Masthead editionDate={lead.publishedAt} />

      {/* Titelseite: Aufmacher in der Mitte, Meldungsspalten links und rechts. */}
      <div className="grid gap-x-9 gap-y-10 py-10 lg:grid-cols-[13rem_minmax(0,1fr)_14rem]">
        {/* Linke Spalte: Kurz gemeldet */}
        <aside className="order-2 lg:order-1 lg:border-r lg:border-[var(--rule)] lg:pr-8">
          <h2 className="border-b border-paper-400/30 pb-2 font-mono text-[11px] uppercase tracking-[0.18em] text-paper-50">
            Kurz gemeldet
          </h2>
          <ul className="mt-4 grid gap-4">
            {signals.slice(0, 5).map((signal) => (
              <li key={signal.id} className="border-b border-[var(--rule)] pb-4 last:border-0">
                <span
                  className="font-mono text-[9px] uppercase tracking-[0.16em]"
                  style={{ color: statusDefinition(signal.status).accent }}
                >
                  {statusDefinition(signal.status).label}
                </span>
                <p className="headline mt-1.5 text-base leading-snug text-paper-50">
                  {signal.title}
                </p>
                <p className="mt-1.5 text-xs leading-relaxed text-paper-400">
                  {signal.summary}
                </p>
              </li>
            ))}
          </ul>
          <Link
            href="/radar"
            className="mt-2 inline-block font-mono text-[10px] uppercase tracking-[0.16em] text-lagoon-300 hover:text-lagoon-400"
          >
            Alle Signale im Radar →
          </Link>
        </aside>

        {/* Aufmacher */}
        <article className="order-1 lg:order-2">
          <div className="flex flex-wrap items-center justify-center gap-2">
            <span className="kicker">{articleCategoryLabel(lead.category)}</span>
            <StatusBadge status={lead.status} size="sm" />
            {lead.demo ? <DemoBadge /> : null}
          </div>

          <h2 className="headline mt-4 text-center text-[2.1rem] leading-[1.06] text-paper-50 sm:text-[3.1rem]">
            <Link href={`/kurier/${lead.slug}`} className="hover:text-coral-300">
              {lead.title}
            </Link>
          </h2>

          <p className="standfirst mx-auto mt-4 max-w-2xl text-center text-lg leading-relaxed sm:text-xl">
            {lead.standfirst}
          </p>

          <p className="mt-5 border-y border-[var(--rule)] py-2 text-center font-mono text-[10px] uppercase tracking-[0.16em] text-paper-500">
            Von {lead.author} · {formatDate(lead.publishedAt)} · {lead.readingMinutes} Min.
          </p>

          {/* Anriss im Spaltensatz mit Initial */}
          <div className="newspaper-columns newspaper-columns-2 mt-6">
            {lead.body
              .filter((block) => block.type === "paragraph")
              .slice(0, 3)
              .map((block, index) => (
                <p key={index} className={index === 0 ? "dropcap" : undefined}>
                  {block.type === "paragraph" ? block.text : null}
                </p>
              ))}
          </div>

          <Link
            href={`/kurier/${lead.slug}`}
            className="mt-6 inline-flex items-center gap-2 border-b border-coral-400/50 pb-0.5 font-mono text-[11px] uppercase tracking-[0.16em] text-coral-300 hover:border-coral-300 hover:text-coral-400"
          >
            Vollständigen Beitrag lesen <span aria-hidden>→</span>
          </Link>
        </article>

        {/* Rechte Spalte: zweiter Aufmacher */}
        {secondLead ? (
          <aside className="order-3 lg:border-l lg:border-[var(--rule)] lg:pl-8">
            <h2 className="border-b border-paper-400/30 pb-2 font-mono text-[11px] uppercase tracking-[0.18em] text-paper-50">
              Ebenfalls im Blatt
            </h2>
            <article className="mt-4">
              <span className="kicker">{articleCategoryLabel(secondLead.category)}</span>
              <h3 className="headline mt-1.5 text-xl leading-snug text-paper-50">
                <Link href={`/kurier/${secondLead.slug}`} className="hover:text-coral-300">
                  {secondLead.title}
                </Link>
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-paper-400">
                {secondLead.standfirst}
              </p>
              <p className="mt-3 font-mono text-[10px] uppercase tracking-[0.14em] text-paper-500">
                {formatDate(secondLead.publishedAt)}
              </p>
            </article>
          </aside>
        ) : null}
      </div>

      {/* Weitere Beiträge im Spaltensatz */}
      {remaining.length > 0 ? (
        <section className="border-t-2 border-paper-400/30 py-10">
          <h2 className="mb-6 text-center font-mono text-[11px] uppercase tracking-[0.22em] text-paper-400">
            Weitere Beiträge
          </h2>
          <div className="newspaper-columns newspaper-columns-2 newspaper-columns-3">
            {remaining.map((article) => (
              <NewspaperItem key={article.id} article={article} />
            ))}
          </div>
        </section>
      ) : null}

      <JsonLd
        data={breadcrumbJsonLd([
          { name: "Start", path: "/" },
          { name: "Kurier", path: "/kurier" },
        ])}
      />
    </Container>
  );
}

/** Einspaltiger Zeitungsartikel im Fließsatz. */
function NewspaperItem({ article }: { article: Article }) {
  return (
    <article className="column-item mb-8 border-b border-[var(--rule)] pb-6 last:border-0">
      <div className="flex flex-wrap items-center gap-2">
        <span className="kicker">{articleCategoryLabel(article.category)}</span>
        <StatusBadge status={article.status} size="sm" />
      </div>
      <h3 className="headline mt-2 text-xl leading-snug text-paper-50">
        <Link href={`/kurier/${article.slug}`} className="hover:text-coral-300">
          {article.title}
        </Link>
      </h3>
      <p className="mt-2 text-sm leading-relaxed text-paper-400">{article.standfirst}</p>
      <p className="mt-3 font-mono text-[10px] uppercase tracking-[0.14em] text-paper-500">
        {formatDate(article.publishedAt)} · {article.readingMinutes} Min.
        {article.demo ? " · Beispielinhalt" : ""}
      </p>
    </article>
  );
}
