/**
 * Bezugsquellen und Partnerprogramme.
 *
 * Grundsatz: Ein Link wird erst dann zum Provisionslink, wenn für seinen
 * Partner tatsächlich eine Kennung hinterlegt ist. Ohne Kennung bleibt der
 * Eintrag ein gewöhnlicher Verweis auf den Händler – er wird dann auch nicht
 * als Werbung gekennzeichnet, weil er keine ist.
 *
 * Rechtlicher Rahmen (Deutschland): Sobald eine Provision fließen kann, ist
 * der Link kennzeichnungspflichtige kommerzielle Kommunikation nach § 5a
 * Abs. 6 UWG. Die Kennzeichnung muss unmittelbar am Link stehen und deutsch
 * sein – „Anzeige“, „Werbung“ oder „Provisionslink“. Englische Begriffe wie
 * „sponsored“ oder „Ad“ genügen nicht, ein Einkaufswagen-Symbol ebenso wenig
 * (LG Berlin II, Urteil vom 02.08.2024). Deshalb steht das Wort hier fest im
 * Bauteil und ist nicht abschaltbar.
 *
 * Die Kennungen kommen aus Umgebungsvariablen, nicht aus dem Repository. Sie
 * sind ohnehin öffentlich, weil sie in der Ziel-URL stehen – sie gehören aber
 * dem Betreiber und nicht dem Quelltext.
 */

export type PartnerId = "amazon" | "mediamarkt" | "otto";

/**
 * Wie kommt die Kennung an den Link?
 *
 * `parameter` – das Programm hängt eine Kennung als Query-Parameter an
 * (Amazon PartnerNet: `tag`). Der Link lässt sich hier zusammensetzen.
 *
 * `deeplink` – das Netzwerk erzeugt die Adresse selbst und kodiert das Ziel
 * darin (Awin für Otto, EasyMarketing für MediaMarkt und Saturn). Einen
 * Parameter zu erfinden ergäbe einen Link, der nach Tracking aussieht, aber
 * keines ist – deshalb wird hier eine Vorlage aus der Umgebung erwartet, in
 * der `{ziel}` durch die URL-kodierte Zieladresse ersetzt wird. Fehlt sie,
 * bleibt der Verweis ein gewöhnlicher Händlerlink.
 */
type Verknuepfung =
  | { art: "parameter"; param: string }
  | { art: "deeplink" };

interface PartnerConfig {
  id: PartnerId;
  /** Anzeigename des Händlers. */
  name: string;
  /** Name des Partnerprogramms, für die Offenlegung unter /rechtliches. */
  programme: string;
  /**
   * Kennung bzw. Deeplink-Vorlage des Betreibers. Fehlt sie, bleibt der Link
   * provisionsfrei und wird nicht als Werbung gekennzeichnet.
   */
  tag?: string;
  verknuepfung: Verknuepfung;
}

const PARTNERS: PartnerConfig[] = [
  {
    id: "amazon",
    name: "Amazon.de",
    programme: "Amazon PartnerNet",
    tag: process.env.NEXT_PUBLIC_PARTNER_AMAZON,
    verknuepfung: { art: "parameter", param: "tag" },
  },
  {
    id: "mediamarkt",
    name: "MediaMarkt",
    programme: "MediaMarktSaturn Partnerprogramm (EasyMarketing)",
    tag: process.env.NEXT_PUBLIC_PARTNER_MEDIAMARKT,
    verknuepfung: { art: "deeplink" },
  },
  {
    id: "otto",
    name: "Otto",
    programme: "Otto Partnerprogramm (Awin)",
    tag: process.env.NEXT_PUBLIC_PARTNER_OTTO,
    verknuepfung: { art: "deeplink" },
  },
];

const partnerById = new Map(PARTNERS.map((partner) => [partner.id, partner]));

export interface Offer {
  partnerId: PartnerId;
  /** Was genau dort zu haben ist. */
  edition: string;
  platform: string;
  /** Zielseite beim Händler, ohne Kennung. */
  url: string;
}

/**
 * Bezugsquellen für Grand Theft Auto VI.
 *
 * Bewusst keine Preise je Händler: Die ändern sich täglich, und eine hier
 * eingefrorene Zahl wäre nach einer Woche schlicht falsch. Der offizielle
 * Preis steht in RELEASE und im Vorbestellungsbeitrag.
 */
export const OFFERS: Offer[] = [
  {
    partnerId: "amazon",
    edition: "Standard Edition",
    platform: "PlayStation 5",
    url: "https://www.amazon.de/s?k=Grand+Theft+Auto+VI+PlayStation+5",
  },
  {
    partnerId: "amazon",
    edition: "Standard Edition",
    platform: "Xbox Series X|S",
    url: "https://www.amazon.de/s?k=Grand+Theft+Auto+VI+Xbox+Series+X",
  },
  {
    partnerId: "mediamarkt",
    edition: "Standard Edition",
    platform: "PlayStation 5 · Xbox Series X|S",
    url: "https://www.mediamarkt.de/de/search.html?query=Grand%20Theft%20Auto%20VI",
  },
  {
    partnerId: "otto",
    edition: "Standard Edition",
    platform: "PlayStation 5 · Xbox Series X|S",
    url: "https://www.otto.de/suche/grand-theft-auto-vi/",
  },
];

export interface ResolvedOffer extends Offer {
  partnerName: string;
  /** Endgültige Adresse – mit Kennung, sofern eine hinterlegt ist. */
  href: string;
  /** Steuert Kennzeichnung und rel-Attribut. */
  isAffiliate: boolean;
}

/**
 * Baut die Zieladresse.
 *
 * Ohne hinterlegte Kennung bleibt die Adresse unverändert – dann ist der Link
 * kein Provisionslink und wird auch nicht als solcher gekennzeichnet.
 */
function mitKennung(url: string, partner: PartnerConfig): string {
  if (!partner.tag) return url;

  if (partner.verknuepfung.art === "deeplink") {
    // Die Vorlage stammt aus dem Netzwerk; ohne Platzhalter ist sie unbrauchbar.
    if (!partner.tag.includes("{ziel}")) return url;
    return partner.tag.replace("{ziel}", encodeURIComponent(url));
  }

  try {
    const parsed = new URL(url);
    parsed.searchParams.set(partner.verknuepfung.param, partner.tag);
    return parsed.toString();
  } catch {
    // Unbrauchbare Adresse: lieber unveraendert lassen als kaputt ausliefern.
    return url;
  }
}

/** Zählt als Provisionslink nur, was tatsächlich verknüpft werden konnte. */
function istProvisionslink(url: string, partner: PartnerConfig): boolean {
  return mitKennung(url, partner) !== url;
}

export function resolveOffers(): ResolvedOffer[] {
  return OFFERS.flatMap((offer) => {
    const partner = partnerById.get(offer.partnerId);
    if (!partner) return [];
    return [
      {
        ...offer,
        partnerName: partner.name,
        href: mitKennung(offer.url, partner),
        isAffiliate: istProvisionslink(offer.url, partner),
      },
    ];
  });
}

/** Partnerprogramme, über die tatsächlich Provisionslinks ausgeliefert werden. */
export function activeProgrammes(): string[] {
  return PARTNERS.filter((partner) =>
    OFFERS.some(
      (offer) => offer.partnerId === partner.id && istProvisionslink(offer.url, partner),
    ),
  ).map((partner) => partner.programme);
}
