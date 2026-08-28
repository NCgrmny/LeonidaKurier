import type { Metadata } from "next";
import { Container } from "@/components/ui/Container";
import { ArticleCard, LeadArticle } from "@/components/kurier/ArticleCard";
import { EmptyState } from "@/components/ui/EmptyState";
import { JsonLd } from "@/components/ui/JsonLd";
import { content } from "@/lib/content";
import { breadcrumbJsonLd, pageMetadata } from "@/lib/seo";

export const metadata: Metadata = pageMetadata({
  title: "Kurier – Meldungen und Analysen zu GTA VI",
  description:
    "Alle Beiträge des Leonida Kurier: Meldungen, Analysen, Einordnungen und Faktenchecks zu Grand Theft Auto VI – mit Quellen und klarem Status.",
  path: "/kurier",
  keywords: ["GTA 6 News deutsch", "GTA VI Analyse", "GTA 6 Faktencheck"],
});

export default async function KurierPage() {
  const articles = await content.listArticles();
  const [lead, ...rest] = articles;

  return (
    <Container width="wide">
      <header className="py-12 sm:py-16">
        <p className="kicker">Was ist passiert?</p>
        <h1 className="headline mt-3 text-4xl text-paper-50 sm:text-5xl">Der Kurier</h1>
        <p className="standfirst mt-4 max-w-2xl text-base sm:text-lg">
          Redaktionelle Beiträge zur Welt von Grand Theft Auto VI. Kein Hype, keine
          Schlagzeilen ohne Deckung: Jeder Beitrag nennt seine Quellen und trägt einen
          Status.
        </p>
      </header>

      {articles.length === 0 ? (
        <EmptyState
          title="Noch keine Beiträge veröffentlicht"
          description="Sobald geprüfte Informationen vorliegen, erscheinen sie hier."
        />
      ) : (
        <>
          <LeadArticle article={lead} />
          {rest.length > 0 ? (
            <div className="mt-4 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {rest.map((article) => (
                <ArticleCard key={article.id} article={article} />
              ))}
            </div>
          ) : null}
        </>
      )}

      <JsonLd
        data={breadcrumbJsonLd([
          { name: "Start", path: "/" },
          { name: "Kurier", path: "/kurier" },
        ])}
      />
    </Container>
  );
}
