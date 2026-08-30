import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Container } from "@/components/ui/Container";
import { Scene, motifForSlug } from "@/components/art/Scene";
import { articleCategoryLabel } from "@/components/kurier/ArticleCard";
import { Schlagzeile } from "@/components/kurier/Schlagzeile";
import { BildBefunde } from "@/components/kurier/BildBefunde";
import { BlattMarke } from "@/components/kurier/Seal";
import { StatusBadge } from "@/components/ui/StatusBadge";
import { JsonLd } from "@/components/ui/JsonLd";
import { content } from "@/lib/content";
import { formatDate } from "@/lib/format";
import { breadcrumbJsonLd, pageMetadata } from "@/lib/seo";
import type { Article } from "@/lib/types";

export async function generateStaticParams() {
  const ausgaben = await content.listAusgaben();
  return ausgaben.map((ausgabe) => ({ slug: ausgabe.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const ausgabe = await content.getAusgabe(slug);
  if (!ausgabe) return { title: "Ausgabe nicht gefunden" };

  return pageMetadata({
    title: `Ausgabe Nr. ${ausgabe.nummer} – ${ausgabe.titel}`,
    description: ausgabe.untertitel,
    path: `/archiv/ausgabe/${ausgabe.slug}`,
  });
}

export default async function AusgabePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const aufgeloest = await content.getAusgabeMitBeitraegen(slug);
  if (!aufgeloest) notFound();

  const { ausgabe, aufmacher, beitraege } = aufgeloest;

  return (
    <article>
      {/* Ausgabenkopf – der gefaltete Titel, nicht die laufende Website */}
      <div className="border-b-4 border-double border-ink-900 bg-paper-100">
        <Container width="wide">
          <div className="py-8 sm:py-12">
            <Link
              href="/archiv"
              className="font-mono text-[10px] font-bold uppercase tracking-[0.2em] text-coral-600 hover:text-coral-500"
            >
              <span aria-hidden>←</span> Zurück ins Archiv
            </Link>

            <div className="mt-6 flex flex-col gap-1 border-y border-ink-900/25 py-2 font-mono text-[10px] uppercase tracking-[0.18em] text-ink-700 sm:flex-row sm:items-center sm:justify-between sm:gap-4">
              <span className="whitespace-nowrap">Ausgabe Nr. {ausgabe.nummer}</span>
              <span className="hidden sm:inline">Leonida Blatt</span>
              <span className="whitespace-nowrap">
                {formatDate(ausgabe.von)} – {formatDate(ausgabe.bis)}
              </span>
            </div>

            <div className="mt-6 flex items-center gap-4">
              <BlattMarke className="h-12 w-12 shrink-0 text-coral-600" />
              <div className="min-w-0">
                <h1 className="masthead text-[2.2rem] leading-[0.95] sm:text-[3.4rem]">
                  {ausgabe.titel}
                </h1>
                <p className="mt-2 font-editorial text-[1.05rem] italic leading-snug text-ink-800">
                  {ausgabe.untertitel}
                </p>
              </div>
            </div>
          </div>
        </Container>
      </div>

      <Container width="wide">
        {aufmacher ? (
          <section className="border-b border-ink-900/20 py-10">
            <p className="rubric">Seite 1 · Aufmacher</p>
            <div className="mt-4 grid gap-8 lg:grid-cols-[1.15fr_1fr]">
              <div>
                <Link href={`/kurier/${aufmacher.slug}`} className="group block">
                  <h2 className="headline text-[2rem] leading-[1.02] group-hover:text-coral-700 sm:text-[2.8rem]">
                    <Schlagzeile text={aufmacher.title} />
                  </h2>
                </Link>
                <p className="standfirst mt-4 text-[1.05rem]">{aufmacher.standfirst}</p>
                <div className="mt-4 flex flex-wrap items-center gap-3">
                  <StatusBadge status={aufmacher.status} />
                  <span className="font-mono text-[10px] uppercase tracking-[0.18em] text-ink-700">
                    {articleCategoryLabel(aufmacher.category)} ·{" "}
                    {formatDate(aufmacher.publishedAt)}
                  </span>
                </div>
                <Link
                  href={`/kurier/${aufmacher.slug}`}
                  className="mt-5 inline-block font-mono text-[11px] font-bold uppercase tracking-[0.18em] text-coral-600 hover:text-coral-500"
                >
                  Ganzen Bericht lesen <span aria-hidden>→</span>
                </Link>
              </div>
              <figure className="border border-ink-900/20 bg-paper-50 p-2">
                <div className="relative aspect-[4/3] overflow-hidden">
                  <Scene variant={aufmacher.motif ?? motifForSlug(aufmacher.slug)} />
                </div>
                <figcaption className="mt-2 px-1 font-mono text-[10px] uppercase tracking-[0.14em] text-ink-600">
                  Eigene Illustration der Redaktion. Kein Material von Rockstar Games.
                </figcaption>
                {aufmacher.bildbefunde?.length ? (
                  <div className="px-1">
                    <BildBefunde befunde={aufmacher.bildbefunde} />
                  </div>
                ) : null}
              </figure>
            </div>
          </section>
        ) : null}

        {beitraege.length > 0 ? (
          <section className="border-b border-ink-900/20 py-10">
            <p className="rubric">
              {seitenBereich(beitraege.length)} · Weitere Beiträge dieser Ausgabe
            </p>
            <ol className="mt-5 grid gap-px bg-ink-900/15 sm:grid-cols-2 [&>li:last-child:nth-child(odd)]:sm:col-span-2">
              {beitraege.map((beitrag, index) => (
                <li key={beitrag.slug} className="bg-paper-100 p-5">
                  <InnenseiteBeitrag beitrag={beitrag} seite={index + 2} />
                </li>
              ))}
            </ol>
          </section>
        ) : null}

        {/* Die Bilanz ist der einzige eigene Text einer Ausgabe. */}
        <section className="py-10">
          <div className="max-w-3xl border-l-4 border-coral-600 pl-5 sm:pl-7">
            <p className="rubric">Bilanz der Ausgabe</p>
            <p className="mt-3 font-editorial text-[1.15rem] leading-relaxed text-ink-900 sm:text-[1.3rem]">
              {ausgabe.bilanz}
            </p>
            <p className="mt-4 font-mono text-[10px] uppercase tracking-[0.16em] text-ink-600">
              Redaktionelle Einordnung des Zeitraums. Die einzelnen Beiträge führen
              die Belege.
            </p>
          </div>
        </section>
      </Container>

      <JsonLd
        data={breadcrumbJsonLd([
          { name: "Start", path: "/" },
          { name: "Archiv", path: "/archiv" },
          { name: `Ausgabe Nr. ${ausgabe.nummer}`, path: `/archiv/ausgabe/${ausgabe.slug}` },
        ])}
      />
    </article>
  );
}

function InnenseiteBeitrag({ beitrag, seite }: { beitrag: Article; seite: number }) {
  return (
    <Link href={`/kurier/${beitrag.slug}`} className="group block">
      <span className="flex items-baseline gap-3">
        <span
          aria-hidden
          className="font-mono text-[10px] font-bold uppercase tracking-[0.16em] text-coral-600"
        >
          Seite {seite}
        </span>
        <span className="font-mono text-[10px] uppercase tracking-[0.16em] text-ink-600">
          {articleCategoryLabel(beitrag.category)}
        </span>
      </span>
      <span className="subhead mt-2 block text-[1.15rem] leading-tight group-hover:text-coral-700">
        {beitrag.title}
      </span>
      <span className="standfirst mt-2 block text-[14px]">{beitrag.summary}</span>
      <span className="mt-3 flex items-center gap-3">
        <StatusBadge status={beitrag.status} />
        <span className="font-mono text-[10px] uppercase tracking-[0.14em] text-ink-600">
          {formatDate(beitrag.publishedAt)}
        </span>
      </span>
    </Link>
  );
}

/** "Seite 2" bei einem Beitrag, "Seiten 2–4" bei mehreren. */
function seitenBereich(anzahl: number): string {
  if (anzahl <= 1) return "Seite 2";
  return `Seiten 2–${anzahl + 1}`;
}
