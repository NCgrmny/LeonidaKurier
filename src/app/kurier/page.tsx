import type { Metadata } from "next";
import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { Masthead } from "@/components/kurier/Masthead";
import { PaperStatus } from "@/components/kurier/PaperStatus";
import { articleCategoryLabel } from "@/components/kurier/ArticleCard";
import { EmptyState } from "@/components/ui/EmptyState";
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

  const [lead, ...rest] = articles;
  const secondLead = rest[0];
  const remaining = rest.slice(1);

  return (
    <div className="py-6 sm:py-10">
      <Container width="wide">
        {/* Der Kurier liegt als heller Zeitungsbogen auf der dunklen Seite. */}
        <div className="paper rounded-sm px-5 pb-10 sm:px-9 lg:px-12">
          <Masthead editionDate={lead.publishedAt} variant="paper" />

          {/* Titelseite: Aufmacher in der Mitte, Spalten links und rechts. */}
          <div className="grid gap-x-7 gap-y-9 py-8 lg:grid-cols-[12rem_minmax(0,1fr)_13rem]">
            {/* Linke Spalte: Kurz gemeldet */}
            <aside className="order-2 lg:order-1 lg:border-r lg:border-[var(--paper-rule)] lg:pr-6">
              <h2 className="paper-ressort">Kurz gemeldet</h2>
              <ul className="mt-4 grid gap-3.5">
                {signals.slice(0, 5).map((signal) => (
                  <li
                    key={signal.id}
                    className="border-b border-[var(--paper-rule)] pb-3.5 last:border-0"
                  >
                    <PaperStatus status={signal.status} />
                    <p className="mt-1 text-[15px] font-semibold leading-tight text-[var(--paper-ink)]">
                      {signal.title}
                    </p>
                    <p className="mt-1 text-[13px] leading-snug text-[var(--paper-muted)]">
                      {signal.summary}
                    </p>
                  </li>
                ))}
              </ul>
              <Link
                href="/radar"
                className="mt-1 inline-block font-mono text-[10px] uppercase tracking-[0.16em] text-[var(--paper-accent)] hover:underline"
              >
                Alle Signale im Radar →
              </Link>
            </aside>

            {/* Aufmacher */}
            <article className="order-1 lg:order-2">
              <div className="flex flex-wrap items-center justify-center gap-x-4 gap-y-1">
                <span className="font-mono text-[10px] uppercase tracking-[0.22em] text-[var(--paper-muted)]">
                  {articleCategoryLabel(lead.category)}
                </span>
                <PaperStatus status={lead.status} />
                {lead.demo ? (
                  <span className="font-mono text-[10px] uppercase tracking-[0.18em] text-[var(--paper-faint)]">
                    Beispielinhalt
                  </span>
                ) : null}
              </div>

              <h2 className="mt-3 text-center text-[2rem] font-semibold leading-[1.05] tracking-[-0.015em] text-[var(--paper-ink)] sm:text-[2.9rem]">
                <Link href={`/kurier/${lead.slug}`} className="hover:text-[var(--paper-accent)]">
                  {lead.title}
                </Link>
              </h2>

              <p className="mx-auto mt-3 max-w-2xl text-center text-[1.05rem] leading-relaxed text-[var(--paper-muted)] sm:text-[1.15rem]">
                {lead.standfirst}
              </p>

              <p className="mt-4 border-y border-[var(--paper-rule)] py-2 text-center font-mono text-[10px] uppercase tracking-[0.16em] text-[var(--paper-muted)]">
                Von {lead.author} · {formatDate(lead.publishedAt)} · {lead.readingMinutes} Min.
              </p>

              {/* Anriss im engen Blocksatz mit Initial */}
              <div className="paper-columns paper-columns-2 paper-body mt-5">
                {lead.body
                  .filter((block) => block.type === "paragraph")
                  .slice(0, 3)
                  .map((block, index) => (
                    <p key={index} className={index === 0 ? "paper-dropcap" : undefined}>
                      {block.type === "paragraph" ? block.text : null}
                    </p>
                  ))}
              </div>

              <Link
                href={`/kurier/${lead.slug}`}
                className="mt-5 inline-flex items-center gap-2 border-b border-[var(--paper-accent)] pb-0.5 font-mono text-[11px] uppercase tracking-[0.16em] text-[var(--paper-accent)]"
              >
                Vollständigen Beitrag lesen <span aria-hidden>→</span>
              </Link>
            </article>

            {/* Rechte Spalte: zweiter Aufmacher */}
            {secondLead ? (
              <aside className="order-3 lg:border-l lg:border-[var(--paper-rule)] lg:pl-6">
                <h2 className="paper-ressort">Ebenfalls im Blatt</h2>
                <article className="mt-4">
                  <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-[var(--paper-muted)]">
                    {articleCategoryLabel(secondLead.category)}
                  </span>
                  <h3 className="mt-1 text-[1.3rem] font-semibold leading-tight text-[var(--paper-ink)]">
                    <Link
                      href={`/kurier/${secondLead.slug}`}
                      className="hover:text-[var(--paper-accent)]"
                    >
                      {secondLead.title}
                    </Link>
                  </h3>
                  <p className="mt-2 text-[14px] leading-snug text-[var(--paper-muted)]">
                    {secondLead.standfirst}
                  </p>
                  <p className="mt-3 border-t border-[var(--paper-rule)] pt-2 font-mono text-[10px] uppercase tracking-[0.14em] text-[var(--paper-faint)]">
                    {formatDate(secondLead.publishedAt)}
                  </p>
                </article>

                <div className="mt-6">
                  <h2 className="paper-ressort">Statusschlüssel</h2>
                  <ul className="mt-3 grid gap-1.5">
                    {(["bestaetigt", "wahrscheinlich", "hinweis", "spekulation", "widerlegt"] as const).map(
                      (status) => (
                        <li key={status} className="flex items-center gap-2">
                          <span
                            aria-hidden
                            className="size-1.5 shrink-0 rounded-full"
                            style={{
                              backgroundColor: statusDefinition(status).accent,
                              outline: "1px solid #16130e33",
                            }}
                          />
                          <span className="font-mono text-[9px] uppercase tracking-[0.16em] text-[var(--paper-muted)]">
                            {statusDefinition(status).label}
                          </span>
                        </li>
                      ),
                    )}
                  </ul>
                </div>
              </aside>
            ) : null}
          </div>

          {/* Weitere Beiträge im engen Spaltensatz */}
          {remaining.length > 0 ? (
            <section className="paper-rule-strong pt-6">
              <h2 className="mb-5 text-center font-mono text-[10px] uppercase tracking-[0.24em] text-[var(--paper-muted)]">
                Weitere Beiträge
              </h2>
              <div className="paper-columns paper-columns-2 paper-columns-3">
                {remaining.map((article) => (
                  <NewspaperItem key={article.id} article={article} />
                ))}
              </div>
            </section>
          ) : null}

          {/* Fußleiste des Bogens */}
          <div className="paper-hairline mt-6 flex flex-wrap items-center justify-between gap-2 pt-3 font-mono text-[9px] uppercase tracking-[0.16em] text-[var(--paper-faint)]">
            <span>Leonida Kurier · A project by Saimôr</span>
            <span className="text-right">
              Unabhängiges Fanprojekt · nicht verbunden mit Rockstar Games
            </span>
          </div>
        </div>
      </Container>

      <JsonLd
        data={breadcrumbJsonLd([
          { name: "Start", path: "/" },
          { name: "Kurier", path: "/kurier" },
        ])}
      />
    </div>
  );
}

/** Einspaltiger Zeitungsartikel im Fließsatz. */
function NewspaperItem({ article }: { article: Article }) {
  return (
    <article className="column-item mb-6 border-b border-[var(--paper-rule)] pb-5 last:border-0">
      <div className="flex flex-wrap items-center gap-x-3 gap-y-1">
        <span className="font-mono text-[9px] uppercase tracking-[0.2em] text-[var(--paper-muted)]">
          {articleCategoryLabel(article.category)}
        </span>
        <PaperStatus status={article.status} />
      </div>
      <h3 className="mt-1.5 text-[1.2rem] font-semibold leading-tight text-[var(--paper-ink)]">
        <Link href={`/kurier/${article.slug}`} className="hover:text-[var(--paper-accent)]">
          {article.title}
        </Link>
      </h3>
      <p className="mt-1.5 text-[13.5px] leading-snug text-[var(--paper-muted)]">
        {article.standfirst}
      </p>
      <p className="mt-2.5 font-mono text-[9px] uppercase tracking-[0.14em] text-[var(--paper-faint)]">
        {formatDate(article.publishedAt)} · {article.readingMinutes} Min.
        {article.demo ? " · Beispielinhalt" : ""}
      </p>
    </article>
  );
}
