import type { Metadata } from "next";
import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { SITE } from "@/lib/site";
import {
  LEGAL,
  fehlendePflichtangaben,
  impressumVollstaendig,
  medienverantwortlich,
} from "@/lib/legal";
import { pageMetadata } from "@/lib/seo";

export const metadata: Metadata = pageMetadata({
  title: "Impressum",
  description: `Anbieterkennzeichnung nach § 5 DDG für ${SITE.name}.`,
  path: "/impressum",
});

function Zeile({ label, wert }: { label: string; wert: string }) {
  if (!wert.trim()) return null;
  return (
    <div className="grid gap-0.5 border-b border-ink-900/10 py-2.5 sm:grid-cols-[13rem_minmax(0,1fr)] sm:gap-4">
      <dt className="meta text-ink-500">{label}</dt>
      <dd className="font-serif text-[15px]">{wert}</dd>
    </div>
  );
}

export default function ImpressumPage() {
  const fehlend = fehlendePflichtangaben();
  const vollstaendig = impressumVollstaendig();

  return (
    <Container width="narrow">
      <div className="py-12 sm:py-16">
        <span className="rubric">Pflichtangaben</span>
        <h1 className="headline mt-4 text-[2.4rem] sm:text-[3.2rem]">Impressum</h1>
        <p className="standfirst mt-4">
          Anbieterkennzeichnung nach § 5 DDG und Verantwortlichkeit nach § 18
          Abs. 2 MStV.
        </p>

        {!vollstaendig ? (
          <div className="mt-8 border-2 border-coral-600 bg-paper-50 p-4">
            <p className="meta text-coral-600">Noch nicht vollständig</p>
            <p className="mt-2 font-serif text-[15px] leading-snug">
              Diese Seite ist noch keine gültige Anbieterkennzeichnung. Es fehlen:{" "}
              <strong className="font-semibold">{fehlend.join(", ")}</strong>. Bis die
              Angaben eingetragen sind, ist der Betrieb als öffentliches Angebot in
              Deutschland nicht zulässig.
            </p>
          </div>
        ) : null}

        <dl className="mt-8 border-t border-ink-900/10">
          <Zeile label="Anbieter" wert={LEGAL.anbieter} />
          <Zeile label="Rechtsform" wert={LEGAL.rechtsform} />
          <Zeile label="Vertreten durch" wert={LEGAL.vertretenDurch} />
          <Zeile label="Anschrift" wert={[LEGAL.strasse, LEGAL.plzOrt, LEGAL.land].filter(Boolean).join(", ")} />
          <Zeile label="E-Mail" wert={LEGAL.email} />
          <Zeile label="Telefon" wert={LEGAL.telefon} />
          <Zeile label="Registergericht" wert={LEGAL.registergericht} />
          <Zeile label="Registernummer" wert={LEGAL.registernummer} />
          <Zeile label="Umsatzsteuer-ID" wert={LEGAL.ustId} />
          <Zeile
            label="Verantwortlich nach § 18 Abs. 2 MStV"
            wert={
              medienverantwortlich()
                ? [medienverantwortlich(), LEGAL.strasse, LEGAL.plzOrt]
                    .filter(Boolean)
                    .join(", ")
                : ""
            }
          />
        </dl>

        <div className="body-text mt-10">
          <h2>Redaktionelle Verantwortung</h2>
          <p>
            Der Leonida Kurier ist ein journalistisch-redaktionelles Angebot. Alle
            Beiträge sind eigenständig verfasst. Der Status jeder Information ist
            am Inhalt selbst ausgewiesen; wie die Redaktion arbeitet, steht unter{" "}
            <Link href="/redaktion">Redaktion &amp; Standards</Link>.
          </p>

          <h2>Marken Dritter</h2>
          <p>{SITE.disclaimerLong}</p>

          <h2>Verbraucherschlichtung</h2>
          <p>
            Der Leonida Kurier ist weder bereit noch verpflichtet, an
            Streitbeilegungsverfahren vor einer Verbraucherschlichtungsstelle
            teilzunehmen.
          </p>

          <p className="mt-8">
            Wie mit personenbezogenen Daten umgegangen wird, steht in der{" "}
            <Link href="/datenschutz">Datenschutzerklärung</Link>. Weitere
            rechtliche Hinweise unter <Link href="/rechtliches">Rechtliches</Link>.
          </p>
        </div>
      </div>
    </Container>
  );
}
