import type { Ausgabe } from "@/lib/types";

/**
 * Ausgaben des Leonida Blatts.
 *
 * Das Leonida Blatt ist keine zweite Website, sondern die kuratierte Ebene
 * über dem Bestand des Leonida Kurier: Der Kurier ist die fortlaufende
 * Rechercheplattform, das Blatt fasst Zeiträume zu Ausgaben zusammen.
 *
 * Deshalb enthält eine Ausgabe nur Verweise auf vorhandene Beiträge, nie
 * eigenen Text zum Sachverhalt. Ändert sich die Beleglage eines Beitrags,
 * ändert sie sich überall – eine Ausgabe kann nicht veralten, weil sie nichts
 * doppelt speichert. Eigen ist ihr allein die Bilanz: die Einordnung dessen,
 * was in diesem Zeitraum belegbar wurde.
 */
export const ausgaben: Ausgabe[] = [
  {
    nummer: 1,
    slug: "leonida-nimmt-form-an",
    titel: "Leonida nimmt Form an",
    untertitel: "Termin, Preis und die Grenzen des Wissens",
    von: "2026-06-01",
    bis: "2026-08-25",
    aufmacher: "vorbestellung-preis-release",
    beitraege: ["was-ueber-leonida-gesichert-ist", "zwei-trailer-zwei-wissensstaende"],
    bilanz:
      "In diesem Zeitraum wurde aus einem angekündigten Spiel ein terminierter Kauf: Rockstar Games und Take-Two nannten Datum, Plattformen und Preis. Am Wissen über die Spielwelt änderte das nichts – die sechs benannten Gebiete standen bereits, eine Karte gab es weiterhin nicht.",
  },
  {
    nummer: 2,
    slug: "der-extended-look",
    titel: "Der Extended Look",
    untertitel: "26 Minuten, die den Wissensstand verschieben",
    von: "2026-08-26",
    bis: "2026-08-30",
    aufmacher: "was-der-extended-look-zeigt",
    beitraege: [
      "extended-look-jetzt-verfuegbar",
      "dreissig-bilder-pro-sekunde",
      "warum-hier-keine-leaks-stehen",
      "70-offizielle-screenshots",
      "die-community-karte-von-leonida",
    ],
    bilanz:
      "Fünf Tage, in denen sich mehr änderte als in den Monaten davor. Rockstar räumte am 26. August die Echtheit unautorisiert verbreiteter Aufnahmen ein und veröffentlichte einen Tag später 26 Minuten offizielles Spielmaterial. Erstmals ließen sich Mechaniken belegen statt vermuten – die Geografie blieb offen.",
  },
];
