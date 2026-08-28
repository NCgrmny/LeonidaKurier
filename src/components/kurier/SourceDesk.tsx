import Link from "next/link";
import type { Source } from "@/lib/types";
import { formatDate } from "@/lib/format";

/**
 * Redaktionsstand: die Quellenlage des Tages als schmaler Zeitungsstreifen.
 *
 * Der Streifen macht ohne Umweg sichtbar, worauf der aktuelle Wissensstand
 * beruht – die jüngste Primärquelle, der Umfang des offiziellen
 * Quellenregisters und die Herkunft der Kartenlage. Community-Karten werden
 * dabei ausdrücklich als Rekonstruktion und nicht als offizielle Geodaten
 * ausgewiesen.
 */
export function SourceDesk({
  checkedAt,
  primary,
  officialCount,
  mapSource,
}: {
  checkedAt: string;
  primary?: Source;
  officialCount: number;
  mapSource?: Source;
}) {
  return (
    <section
      aria-labelledby="source-desk-title"
      className="mt-5 border-y-2 border-ink-900 bg-paper-50"
    >
      <div className="grid lg:grid-cols-[13rem_minmax(0,1.25fr)_minmax(0,0.8fr)_minmax(0,1fr)]">
        <div className="border-b border-ink-900/15 p-4 lg:border-b-0 lg:border-r">
          <p className="meta text-coral-600">Redaktionsstand</p>
          <h2 id="source-desk-title" className="subhead mt-1 text-[21px]">
            Quellenlage heute
          </h2>
          <p className="mt-2 font-mono text-[9px] uppercase tracking-[0.16em] text-ink-500">
            geprüft am {formatDate(checkedAt)}
          </p>
        </div>

        {primary ? (
          <div className="border-b border-ink-900/15 p-4 lg:border-b-0 lg:border-r">
            <p className="meta text-lagoon-700">Neueste Primärquelle</p>
            <p className="subhead mt-1 text-[17px] leading-tight">{primary.title}</p>
            <p className="mt-1 font-serif text-[12px] leading-snug text-ink-500">
              {primary.publisher}
              {primary.publishedAt ? ` · ${formatDate(primary.publishedAt)}` : null}
            </p>
            {primary.url ? (
              <a
                href={primary.url}
                target="_blank"
                rel="noopener noreferrer nofollow"
                className="mt-2 inline-flex font-mono text-[9px] font-bold uppercase tracking-[0.16em] text-coral-600 hover:underline"
              >
                Original öffnen ↗
              </a>
            ) : null}
          </div>
        ) : null}

        <div className="border-b border-ink-900/15 p-4 lg:border-b-0 lg:border-r">
          <p className="meta text-lagoon-700">Quellenregister</p>
          <p className="headline mt-1 text-[2.4rem] leading-none">{officialCount}</p>
          <p className="mt-1 font-serif text-[12px] leading-snug text-ink-500">
            offizielle Rockstar- und Take-Two-Quellen
          </p>
          <Link
            href="/radar"
            className="mt-2 inline-flex font-mono text-[9px] font-bold uppercase tracking-[0.16em] text-coral-600 hover:underline"
          >
            Prüfstatus ansehen →
          </Link>
        </div>

        <div className="p-4">
          <p className="meta text-sun-500">Kartenlage</p>
          <p className="subhead mt-1 text-[17px] leading-tight">
            {mapSource?.title ?? "Eigene Kartenrekonstruktion"}
          </p>
          <p className="mt-1 font-serif text-[12px] leading-snug text-ink-500">
            Community-Rekonstruktion, sichtbar getrennt von offiziellen Geodaten.
          </p>
          <Link
            href="/kompass"
            className="mt-2 inline-flex font-mono text-[9px] font-bold uppercase tracking-[0.16em] text-coral-600 hover:underline"
          >
            Zum Kompass →
          </Link>
        </div>
      </div>
    </section>
  );
}
