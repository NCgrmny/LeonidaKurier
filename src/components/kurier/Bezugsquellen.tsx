import { RELEASE } from "@/lib/site";
import { resolveOffers } from "@/lib/partners";

/**
 * Bezugsquellen-Kasten.
 *
 * Jeder Provisionslink traegt das Wort „Provisionslink“ unmittelbar neben
 * sich – nicht als Symbol, nicht als englischer Begriff, nicht nur in einem
 * Sammelhinweis am Seitenende. Links ohne hinterlegte Partnerkennung sind
 * keine Werbung und werden deshalb auch nicht so gekennzeichnet.
 *
 * Preise je Haendler stehen bewusst nicht drin; genannt wird nur der
 * offizielle Preis, der aus RELEASE kommt.
 */
export function Bezugsquellen({ compact = false }: { compact?: boolean }) {
  const offers = resolveOffers();
  if (offers.length === 0) return null;

  const hasAffiliate = offers.some((offer) => offer.isAffiliate);

  return (
    <section
      aria-labelledby="bezugsquellen-title"
      className="border-2 border-ink-900 bg-paper-100"
    >
      <div className="border-b border-ink-900/15 px-4 py-3">
        <p className="meta text-coral-600">Bezugsquellen</p>
        <h2 id="bezugsquellen-title" className="subhead mt-1 text-[19px]">
          Wo es Grand Theft Auto VI gibt
        </h2>
        {!compact ? (
          <p className="mt-1 font-serif text-[13px] leading-snug text-ink-600">
            Erscheint am {RELEASE.labelDe} für {RELEASE.platforms.join(" und ")}.
            Take-Two nennt {RELEASE.priceUsd} für die Standard Edition, im deutschen
            Handel liegt sie bei {RELEASE.priceEur}. Händlerpreise können abweichen.
          </p>
        ) : null}
      </div>

      <ul className="divide-y divide-ink-900/10">
        {offers.map((offer) => (
          <li
            key={`${offer.partnerId}-${offer.platform}-${offer.edition}`}
            className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1 px-4 py-3"
          >
            <span className="min-w-0">
              <a
                href={offer.href}
                target="_blank"
                rel={
                  offer.isAffiliate
                    ? "sponsored nofollow noopener noreferrer"
                    : "nofollow noopener noreferrer"
                }
                className="subhead text-[16px] text-ink-900 underline decoration-coral-500/50 underline-offset-4 hover:text-coral-600"
              >
                {offer.partnerName} ↗
              </a>
              {offer.isAffiliate ? (
                <span className="ml-2 whitespace-nowrap border border-ink-900/25 px-1.5 py-0.5 font-mono text-[9px] font-bold uppercase tracking-[0.12em] text-ink-700">
                  Provisionslink
                </span>
              ) : null}
            </span>
            {/* Kein shrink-0: Auf schmalen Viewports muss die Plattformzeile
                umbrechen duerfen, sonst schiebt sie die Seite auf. */}
            <span className="meta">
              {offer.edition} · {offer.platform}
            </span>
          </li>
        ))}
      </ul>

      {hasAffiliate ? (
        <p className="border-t border-ink-900/15 px-4 py-3 font-serif text-[12px] leading-snug text-ink-600">
          Als <strong className="font-semibold">Provisionslink</strong> gekennzeichnete
          Verweise sind Werbung: Bei einem Kauf über diesen Link erhält der Leonida
          Kurier eine Provision vom Händler. Für dich ändert sich der Preis dadurch
          nicht. Welche Bezugsquelle hier steht, entscheidet die Redaktion – nicht die
          Höhe einer Provision.
        </p>
      ) : (
        <p className="border-t border-ink-900/15 px-4 py-3 font-serif text-[12px] leading-snug text-ink-600">
          Verweise ohne Provision. Der Leonida Kurier verdient an diesen Links nichts.
        </p>
      )}
    </section>
  );
}
