import type { Metadata } from "next";
import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { SITE } from "@/lib/site";
import { LEGAL, impressumVollstaendig } from "@/lib/legal";
import { activeProgrammes } from "@/lib/partners";
import { pageMetadata } from "@/lib/seo";

export const metadata: Metadata = pageMetadata({
  title: "Datenschutzerklärung",
  description:
    "Welche Daten der Leonida Kurier verarbeitet – und welche nicht. Ohne Cookies, ohne Tracking, mit lokal eingebundenen Schriften.",
  path: "/datenschutz",
});

export default function DatenschutzPage() {
  const programme = activeProgrammes();
  const anbieterBekannt = impressumVollstaendig();

  return (
    <Container width="narrow">
      <div className="py-12 sm:py-16">
        <span className="rubric">Pflichtangaben</span>
        <h1 className="headline mt-4 text-[2.4rem] sm:text-[3.2rem]">
          Datenschutz
        </h1>
        <p className="standfirst mt-4">
          Was diese Seite verarbeitet – und vor allem, was sie nicht verarbeitet.
        </p>

        {/* Der Kern zuerst: die Auslassungen sind hier die eigentliche Aussage. */}
        <section className="mt-8 border-2 border-ink-900 bg-paper-50">
          <div className="border-b border-ink-900/15 px-4 py-3">
            <p className="meta text-lagoon-700">Kurzfassung</p>
            <h2 className="subhead mt-1 text-[19px]">Was hier nicht passiert</h2>
          </div>
          <ul className="divide-y divide-ink-900/10">
            {[
              ["Keine Cookies", "Die Seite setzt keine eigenen Cookies. Es gibt deshalb auch kein Einwilligungsbanner."],
              ["Keine Analyse", "Kein Google Analytics, kein Matomo, kein Pixel, keine Reichweitenmessung."],
              ["Keine Schriften von fremden Servern", "Alle Schriften liegen auf demselben Server wie die Seite. Beim Aufruf geht keine Anfrage an Google."],
              ["Keine Konten", "Es gibt keine Registrierung, keinen Login und keinen Newsletter."],
              ["Keine Weitergabe", "Daten werden nicht verkauft und nicht zu Werbezwecken weitergegeben."],
            ].map(([titel, text]) => (
              <li key={titel} className="px-4 py-3">
                <p className="subhead text-[15px]">{titel}</p>
                <p className="mt-0.5 font-serif text-[14px] leading-snug text-ink-600">
                  {text}
                </p>
              </li>
            ))}
          </ul>
        </section>

        <div className="body-text mt-10">
          <h2>Verantwortlicher</h2>
          {anbieterBekannt ? (
            <p>
              {LEGAL.anbieter}
              {LEGAL.strasse ? <>, {LEGAL.strasse}</> : null}
              {LEGAL.plzOrt ? <>, {LEGAL.plzOrt}</> : null}
              {LEGAL.land ? <>, {LEGAL.land}</> : null}
              {LEGAL.email ? (
                <>
                  {" "}
                  · <a href={`mailto:${LEGAL.email}`}>{LEGAL.email}</a>
                </>
              ) : null}
            </p>
          ) : (
            <p>
              Die vollständigen Angaben zum Verantwortlichen werden im{" "}
              <Link href="/impressum">Impressum</Link> ergänzt. Bis dahin ist diese
              Erklärung unvollständig.
            </p>
          )}

          <h2>Aufruf der Seite</h2>
          <p>
            Beim Abruf überträgt dein Browser technisch notwendige Daten, die der
            Hostinganbieter in Serverprotokollen speichert: IP-Adresse, Zeitpunkt,
            abgerufene Adresse, übertragene Datenmenge, Statuscode sowie die von
            deinem Browser gemeldete Kennung und die zuvor besuchte Seite. Ohne
            diese Übertragung lässt sich eine Seite technisch nicht ausliefern.
          </p>
          <p>
            Rechtsgrundlage ist Art. 6 Abs. 1 lit. f DSGVO. Das berechtigte
            Interesse liegt im sicheren und stabilen Betrieb des Angebots. Diese
            Protokolle werden nicht mit anderen Daten zusammengeführt und nicht zur
            Wiedererkennung einzelner Personen ausgewertet.
          </p>

          <h2>Hosting</h2>
          <p>
            Die Seite wird bei Vercel Inc., 440 N Barranca Ave #4133, Covina, CA
            91723, USA betrieben. Vercel verarbeitet die oben genannten
            Zugriffsdaten als Auftragsverarbeiter für den Betrieb des Angebots.
            Dabei findet eine Übermittlung in die Vereinigten Staaten statt;
            Grundlage sind die Standardvertragsklauseln der Europäischen Kommission
            sowie die Zertifizierung unter dem EU-US Data Privacy Framework.
          </p>

          <h2>Schriften</h2>
          <p>
            Die verwendeten Schriften sind fest in die Seite eingebaut und werden
            vom selben Server ausgeliefert. Beim Aufruf entsteht keine Verbindung zu
            Servern von Google oder anderen Schriftanbietern, und es wird keine
            IP-Adresse dorthin übertragen.
          </p>

          <h2>Speicherung im Browser</h2>
          <p>
            Derzeit speichert die Seite nichts in deinem Browser. Sollte später ein
            Fortschritts-Tracker hinzukommen, bliebe der gespeicherte Stand
            ausschließlich lokal auf deinem Gerät: Er würde nicht übertragen, nicht
            ausgewertet und wäre für den Betreiber nicht einsehbar. Diese Erklärung
            wird dann entsprechend ergänzt.
          </p>

          <h2>Verweise auf andere Seiten</h2>
          <p>
            Der Kurier verlinkt Quellen und Bezugsquellen. Mit dem Klick verlässt du
            dieses Angebot; ab dann gilt die Datenschutzerklärung des jeweiligen
            Anbieters. Auf deren Verarbeitung hat der Leonida Kurier keinen
            Einfluss.
          </p>

          {programme.length > 0 ? (
            <>
              <h2>Provisionslinks</h2>
              <p>
                Einzelne Verweise auf Händler sind Provisionslinks; sie sind
                unmittelbar am Link als solche gekennzeichnet. Wird ein solcher Link
                angeklickt, kann der Händler eine Kennung setzen, um einen späteren
                Kauf der Vermittlung zuzuordnen. Das geschieht erst beim Klick und
                erst auf der Seite des Händlers, nicht hier. Beteiligt sind derzeit:{" "}
                {programme.join(", ")}.
              </p>
            </>
          ) : null}

          <h2>Deine Rechte</h2>
          <p>
            Dir stehen die Rechte auf Auskunft (Art. 15 DSGVO), Berichtigung
            (Art. 16), Löschung (Art. 17), Einschränkung der Verarbeitung (Art. 18)
            und Datenübertragbarkeit (Art. 20) zu. Gegen Verarbeitungen auf
            Grundlage berechtigter Interessen kannst du nach Art. 21 DSGVO
            Widerspruch einlegen.
          </p>
          <p>
            Außerdem besteht ein Beschwerderecht bei einer Aufsichtsbehörde
            (Art. 77 DSGVO). Zuständig ist die Datenschutzaufsicht des Bundeslandes,
            in dem der Verantwortliche seinen Sitz hat.
          </p>

          <h2>Kontakt</h2>
          <p>
            {LEGAL.email ? (
              <>
                Anfragen zum Datenschutz an{" "}
                <a href={`mailto:${LEGAL.email}`}>{LEGAL.email}</a>.
              </>
            ) : (
              <>
                Die Kontaktadresse für Datenschutzanfragen wird mit dem{" "}
                <Link href="/impressum">Impressum</Link> ergänzt.
              </>
            )}
          </p>

          <h2>Stand</h2>
          <p>
            Diese Erklärung beschreibt den technischen Stand des Angebots. Ändert
            sich daran etwas – etwa durch den Fortschritts-Tracker oder neue
            Partnerprogramme –, wird sie angepasst. {SITE.name} ist ein
            unabhängiges Fanprojekt; die Hinweise ersetzen keine Rechtsberatung.
          </p>
        </div>
      </div>
    </Container>
  );
}
