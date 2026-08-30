import { fromGeo } from "./geography";
import type {
  Business,
  Character,
  Collectible,
  GameLocation,
  Mission,
  Region,
  Theory,
  Vehicle,
} from "@/lib/types";

/**
 * Weltdaten (Datenbank-Seed).
 *
 * Aufgenommen wird nur, was offiziell gezeigt oder benannt wurde. Wo nichts
 * Belastbares vorliegt, bleibt die Sammlung bewusst leer – die Oberfläche
 * zeigt dann einen ehrlichen Leerzustand statt erfundener Einträge.
 */

export const regions: Region[] = [
  {
    id: "reg-leonida",
    slug: "leonida",
    motif: "skyline-sonnenuntergang",
    title: "Leonida",
    summary:
      "Der Bundesstaat, in dem Grand Theft Auto VI spielt. Rockstar Games hat Leonida als Schauplatz offiziell bestätigt.",
    kind: "bundesstaat",
    status: "bestaetigt",
    sourceIds: ["src-rockstar-gta6", "src-trailer-1"],
    updatedAt: "2026-08-01",
    related: [
      { type: "location", slug: "vice-city" },
      { type: "location", slug: "leonida-keys" },
    ],
  },
];

export const locations: GameLocation[] = [
  {
    id: "loc-vice-city",
    slug: "vice-city",
    motif: "nachtviertel",
    title: "Vice City",
    summary:
      "Die Metropole des Bundesstaates Leonida und zentraler Schauplatz von Grand Theft Auto VI.",
    category: "stadt",
    regionSlug: "leonida",
    status: "bestaetigt",
    sourceIds: ["src-rockstar-gta6", "src-trailer-1"],
    updatedAt: "2026-08-01",
    marker: {
      ...fromGeo(-80.19, 25.77),
      precision: "grob",
      note: "Verortet nach dem realen Vorbild Miami.",
    },
    related: [
      { type: "region", slug: "leonida" },
      { type: "character", slug: "lucia-caminos" },
    ],
  },
  {
    id: "loc-leonida-keys",
    slug: "leonida-keys",
    motif: "inselkette",
    title: "Leonida Keys",
    summary:
      "Die Inselkette im Süden des Bundesstaates. Hier liegt die Wohnung, in der Jason und Lucia zu Beginn leben.",
    category: "gebiet",
    regionSlug: "leonida",
    status: "bestaetigt",
    sourceIds: ["src-rockstar-regionen", "src-rockstar-gta6"],
    updatedAt: "2026-08-30",
    marker: {
      ...fromGeo(-81.1, 24.72),
      precision: "grob",
      note: "Verortet nach dem realen Vorbild der Florida Keys.",
    },
    related: [{ type: "region", slug: "leonida" }],
  },
  {
    id: "loc-port-gellhorn",
    slug: "port-gellhorn",
    motif: "kuestenstrasse",
    title: "Port Gellhorn",
    summary:
      "Leonidas vergessene Küste: heruntergekommene Motels und leere Einkaufszeilen rund um einen arbeitenden Hafen. Rockstar Games beschreibt die örtliche Wirtschaft als getragen von Malzbier, Schmerzmitteln und Energydrinks vom Rasthof.",
    category: "stadt",
    regionSlug: "leonida",
    status: "bestaetigt",
    sourceIds: ["src-rockstar-gta6"],
    updatedAt: "2026-08-01",
    marker: { x: 0.28, y: 0.34, precision: "platzhalter" },
    related: [{ type: "region", slug: "leonida" }],
  },
  {
    id: "loc-ambrosia",
    slug: "ambrosia",
    motif: "sumpfland",
    title: "Ambrosia",
    summary:
      "Ort am Ufer des Lake Leonida. Die Zuckerraffinerie Allied Crystal bestimmt die Silhouette und stellt die Arbeitsplätze – fast alles Übrige, so Rockstar Games, besorgt die örtliche Rockergruppe.",
    category: "gebiet",
    regionSlug: "leonida",
    status: "bestaetigt",
    sourceIds: ["src-rockstar-gta6"],
    updatedAt: "2026-08-01",
    marker: { x: 0.58, y: 0.3, precision: "platzhalter" },
    related: [{ type: "region", slug: "leonida" }],
  },
  {
    id: "loc-grassrivers",
    slug: "grassrivers",
    motif: "sumpfland",
    title: "Grassrivers",
    summary:
      "Die Feuchtgebiete im Südwesten des Bundesstaates. Für das flache Sumpfwasser führt Grand Theft Auto VI Airboats als eigene Fahrzeugklasse ein.",
    category: "gebiet",
    regionSlug: "leonida",
    status: "bestaetigt",
    sourceIds: ["src-rockstar-gta6"],
    updatedAt: "2026-08-01",
    marker: { x: 0.63, y: 0.55, precision: "platzhalter" },
    related: [{ type: "region", slug: "leonida" }],
  },
  {
    id: "loc-mount-kalaga",
    slug: "mount-kalaga",
    motif: "sumpfland",
    title: "Mount Kalaga",
    summary:
      "Nationalpark an der nördlichen Grenze des Bundesstaates, mit zerklüfteten Wäldern, Schluchten und Flüssen.",
    category: "landmarke",
    regionSlug: "leonida",
    status: "bestaetigt",
    sourceIds: ["src-rockstar-gta6"],
    updatedAt: "2026-08-01",
    marker: { x: 0.7, y: 0.2, precision: "platzhalter" },
    related: [{ type: "region", slug: "leonida" }],
  },
  {
    id: "loc-ocean-beach",
    slug: "ocean-beach",
    motif: "skyline-sonnenuntergang",
    title: "Ocean Beach",
    summary:
      "Der Strandabschnitt von Vice City mit Art-déco-Hotels in Pastell und hellem Sand. Von Rockstar Games namentlich beschrieben.",
    category: "gebiet",
    regionSlug: "leonida",
    status: "bestaetigt",
    sourceIds: ["src-rockstar-regionen", "src-rockstar-screenshots"],
    updatedAt: "2026-08-29",
    marker: {
      ...fromGeo(-80.13, 25.78),
      precision: "grob",
      note: "Verortet nach dem realen Vorbild South Beach in Miami.",
    },
    related: [
      { type: "location", slug: "vice-city" },
      { type: "region", slug: "leonida" },
    ],
  },
  {
    id: "loc-little-cuba",
    slug: "little-cuba",
    motif: "kuestenstrasse",
    title: "Little Cuba",
    summary:
      "Kulturelles Herz im Inneren von Vice City. Rockstar Games hebt in der Beschreibung die Bäckereien des Viertels hervor.",
    category: "gebiet",
    regionSlug: "leonida",
    status: "bestaetigt",
    sourceIds: ["src-rockstar-regionen"],
    updatedAt: "2026-08-29",
    marker: {
      ...fromGeo(-80.22, 25.765),
      precision: "grob",
      note: "Verortet nach dem realen Vorbild Little Havana in Miami.",
    },
    related: [{ type: "location", slug: "vice-city" }],
  },
  {
    id: "loc-vc-port",
    slug: "vc-port",
    motif: "nachtviertel",
    title: "VC Port",
    summary:
      "Der Hafen von Vice City, von Rockstar Games als „Kreuzfahrthauptstadt der Welt“ beschrieben.",
    category: "gebiet",
    regionSlug: "leonida",
    status: "bestaetigt",
    sourceIds: ["src-rockstar-regionen"],
    updatedAt: "2026-08-29",
    marker: {
      ...fromGeo(-80.16, 25.78),
      precision: "grob",
      note: "Verortet nach dem realen Vorbild PortMiami.",
    },
    related: [{ type: "location", slug: "vice-city" }],
  },
  {
    id: "loc-tisha-wocka",
    slug: "tisha-wocka",
    motif: "kuestenstrasse",
    title: "Tisha-Wocka",
    summary:
      "Flohmarkt in Vice City, den Rockstar Games über seine gefälschten Markenwaren einführt.",
    category: "landmarke",
    regionSlug: "leonida",
    status: "bestaetigt",
    sourceIds: ["src-rockstar-regionen"],
    updatedAt: "2026-08-29",
    related: [{ type: "location", slug: "vice-city" }],
  },
  {
    id: "loc-lake-leonida",
    slug: "lake-leonida",
    motif: "sumpfland",
    title: "Lake Leonida",
    summary:
      "Der große Binnensee des Bundesstaates. Ambrosia liegt an seinem Ufer.",
    category: "landmarke",
    regionSlug: "leonida",
    status: "bestaetigt",
    sourceIds: ["src-rockstar-regionen"],
    updatedAt: "2026-08-29",
    marker: {
      ...fromGeo(-80.79, 26.95),
      precision: "grob",
      note: "Verortet nach dem realen Vorbild Lake Okeechobee.",
    },
    related: [
      { type: "location", slug: "ambrosia" },
      { type: "region", slug: "leonida" },
    ],
  },
  {
    id: "loc-leonida-penitentiary",
    slug: "leonida-penitentiary",
    motif: "sumpfland",
    title: "Leonida Penitentiary",
    summary:
      "Strafanstalt des Bundesstaates. Lucia Caminos saß hier ein, bevor sie nach eigener Darstellung nur durch Glück wieder herauskam.",
    category: "landmarke",
    regionSlug: "leonida",
    status: "bestaetigt",
    sourceIds: ["src-rockstar-charaktere"],
    updatedAt: "2026-08-30",
    related: [{ type: "character", slug: "lucia-caminos" }],
  },
];

export const characters: Character[] = [
  {
    id: "chr-lucia-caminos",
    slug: "lucia-caminos",
    motif: "nachtviertel",
    title: "Lucia Caminos",
    summary:
      "Geboren in Liberty City, das Kämpfen vom Vater gelernt. Der Versuch, ihre Familie zu schützen, brachte sie ins Leonida Penitentiary – herausgekommen ist sie nur durch Glück. Eine der beiden Hauptfiguren.",
    role: "Hauptfigur",
    regionSlug: "leonida",
    status: "bestaetigt",
    sourceIds: ["src-rockstar-charaktere", "src-rockstar-gta6", "src-trailer-1"],
    updatedAt: "2026-08-30",
    related: [
      { type: "character", slug: "jason-duval" },
      { type: "location", slug: "vice-city" },
    ],
  },
  {
    id: "chr-jason-duval",
    slug: "jason-duval",
    motif: "kuestenstrasse",
    title: "Jason Duval",
    summary:
      "Aufgewachsen zwischen Trickbetrügern und Kleinkriminellen, danach eine Zeit bei der Armee, inzwischen in den Leonida Keys im Dienst örtlicher Drogenkuriere. Rockstar Games fasst ihn so: Er will ein einfaches Leben, aber es wird immer schwieriger.",
    role: "Hauptfigur",
    regionSlug: "leonida",
    status: "bestaetigt",
    sourceIds: ["src-rockstar-charaktere", "src-rockstar-gta6", "src-trailer-1"],
    updatedAt: "2026-08-30",
    related: [
      { type: "character", slug: "lucia-caminos" },
      { type: "location", slug: "vice-city" },
    ],
  },
  {
    id: "chr-boobie-ike",
    slug: "boobie-ike",
    motif: "nachtviertel",
    title: "Boobie Ike",
    summary:
      "Eine Vice-City-Größe, die ihre Zeit auf der Straße in ein legales Imperium überführt hat – Immobilien, ein Stripclub, ein Tonstudio. Laut Rockstar Games ganz Lächeln, bis es ums Geschäft geht.",
    role: "Nebenfigur",
    regionSlug: "leonida",
    status: "bestaetigt",
    sourceIds: ["src-rockstar-charaktere"],
    updatedAt: "2026-08-29",
    related: [{ type: "location", slug: "vice-city" }],
  },
  {
    id: "chr-brian-heder",
    slug: "brian-heder",
    motif: "inselkette",
    title: "Brian Heder",
    summary:
      "Einer der etabliertesten Schmuggler der Leonida Keys, seit der Blütezeit des Drogenhandels aktiv. Er ist zugleich Vermieter des Hauses, in dem Jason lebt, und Verbindungsmann zu Cal Hampton.",
    role: "Nebenfigur",
    regionSlug: "leonida",
    status: "bestaetigt",
    sourceIds: ["src-rockstar-charaktere"],
    updatedAt: "2026-08-29",
    related: [
      { type: "location", slug: "leonida-keys" },
      { type: "character", slug: "cal-hampton" },
    ],
  },
  {
    id: "chr-cal-hampton",
    slug: "cal-hampton",
    motif: "sumpfland",
    title: "Cal Hampton",
    summary:
      "Jasons Freund und Vertrauter von Brian Heder. Rockstar Games beschreibt ihn als am glücklichsten zu Hause: Funkverkehr der Küstenwache mithören, ein paar Bier, ein paar private Browsertabs.",
    role: "Nebenfigur",
    regionSlug: "leonida",
    status: "bestaetigt",
    sourceIds: ["src-rockstar-charaktere"],
    updatedAt: "2026-08-29",
    related: [{ type: "character", slug: "brian-heder" }],
  },
  {
    id: "chr-drequan-priest",
    slug: "drequan-priest",
    motif: "nachtviertel",
    title: "DreQuan Priest",
    summary:
      "Mehr Geschäftsmann als Gangster. Der Straßenhandel war Broterwerb, das Ziel war immer die Musik. Er hat The Real Dimez bei Only Raw Records unter Vertrag genommen und bucht Auftritte in Boobie Ikes Club.",
    role: "Nebenfigur",
    regionSlug: "leonida",
    status: "bestaetigt",
    sourceIds: ["src-rockstar-charaktere"],
    updatedAt: "2026-08-29",
    related: [
      { type: "character", slug: "real-dimez" },
      { type: "location", slug: "vice-city" },
    ],
  },
  {
    id: "chr-raul-bautista",
    slug: "raul-bautista",
    motif: "nachtviertel",
    title: "Raul Bautista",
    summary:
      "Erfahrener Bankräuber – von Rockstar Games ausdrücklich als solcher vorgestellt und damit der naheliegendste Name für ein größeres Ding.",
    role: "Nebenfigur",
    regionSlug: "leonida",
    status: "bestaetigt",
    sourceIds: ["src-rockstar-charaktere"],
    updatedAt: "2026-08-30",
    related: [{ type: "location", slug: "vice-city" }],
  },
  {
    id: "chr-real-dimez",
    slug: "real-dimez",
    motif: "nachtviertel",
    title: "The Real Dimez",
    summary:
      "Duo aus Bae-Luxe und Roxy, langjährige Freundinnen mit Standbein in der Rapszene und in sozialen Netzwerken.",
    role: "Nebenfiguren",
    regionSlug: "leonida",
    status: "bestaetigt",
    sourceIds: ["src-rockstar-charaktere"],
    updatedAt: "2026-08-29",
    related: [
      { type: "character", slug: "drequan-priest" },
      { type: "location", slug: "vice-city" },
    ],
  },
  {
    id: "chr-lori",
    slug: "lori",
    motif: "inselkette",
    title: "Lori",
    summary:
      "Dritte Ehefrau von Brian Heder. Rockstar Games führt sie in dessen Profil – mehr ist bislang offiziell nicht bekannt.",
    role: "Nebenfigur",
    regionSlug: "leonida",
    status: "bestaetigt",
    sourceIds: ["src-rockstar-charaktere"],
    updatedAt: "2026-08-30",
    related: [{ type: "character", slug: "brian-heder" }],
  },
  {
    id: "chr-dwnply",
    slug: "dwnply",
    motif: "nachtviertel",
    title: "DWNPLY",
    summary:
      "Rapper aus Vice City. Die gemeinsame frühe Single mit The Real Dimez war deren Durchbruch.",
    role: "Nebenfigur",
    regionSlug: "leonida",
    status: "bestaetigt",
    sourceIds: ["src-rockstar-charaktere"],
    updatedAt: "2026-08-30",
    related: [{ type: "character", slug: "real-dimez" }],
  },
];

/**
 * Für die folgenden Sammlungen liegen derzeit keine belastbaren, offiziell
 * belegten Einzeleinträge vor. Sie bleiben leer, bis geprüfte Daten vorliegen.
 */
export const vehicles: Vehicle[] = [
  {
    id: "veh-airboat",
    slug: "airboat",
    motif: "sumpfland",
    title: "Airboat",
    summary:
      "Flachbodenboot mit Heckpropeller für die Sumpfgebiete der Grassrivers. Eine Fahrzeugklasse, die es in der Reihe zuvor nicht gab.",
    vehicleClass: "Boot",
    status: "bestaetigt",
    sourceIds: ["src-trailer-1", "src-extended-look"],
    updatedAt: "2026-08-29",
    related: [{ type: "location", slug: "grassrivers" }],
  },
];
export const missions: Mission[] = [];
export const businesses: Business[] = [
  {
    id: "biz-allied-crystal",
    slug: "allied-crystal",
    motif: "sumpfland",
    title: "Allied Crystal",
    summary:
      "Zuckerraffinerie, die laut Rockstar Games die Silhouette von Ambrosia bestimmt und dem Ort die Arbeitsplätze gibt.",
    businessType: "Zuckerraffinerie",
    regionSlug: "leonida",
    status: "bestaetigt",
    sourceIds: ["src-rockstar-regionen"],
    updatedAt: "2026-08-29",
    related: [{ type: "location", slug: "ambrosia" }],
  },
  {
    id: "biz-only-raw-records",
    slug: "only-raw-records",
    motif: "nachtviertel",
    title: "Only Raw Records",
    summary:
      "Plattenlabel in Vice City. Dre'Quan Priest hat The Real Dimez hier unter Vertrag genommen; Boobie Ike ist als Partner beteiligt.",
    businessType: "Plattenlabel",
    regionSlug: "leonida",
    status: "bestaetigt",
    sourceIds: ["src-rockstar-charaktere"],
    updatedAt: "2026-08-30",
    related: [
      { type: "character", slug: "drequan-priest" },
      { type: "character", slug: "boobie-ike" },
      { type: "character", slug: "real-dimez" },
    ],
  },
];
export const collectibles: Collectible[] = [];

export const theories: Theory[] = [
  {
    id: "thr-kartenumfang",
    slug: "wie-gross-wird-leonida",
    motif: "inselkette",
    title: "Wie groß wird Leonida?",
    summary:
      "Die Community vergleicht Trailerbilder und offizielle Ortsnamen, um den Umfang der Spielwelt abzuschätzen. Belastbare Angaben von Rockstar Games gibt es dazu nicht.",
    claim:
      "Aus den bislang benannten Schauplätzen lässt sich die Größe der Spielwelt ableiten.",
    status: "spekulation",
    sourceIds: ["src-community-signal", "src-redaktion"],
    updatedAt: "2026-08-01",
    arguments: {
      pro: [
        "Rockstar Games hat mehrere räumlich getrennte Schauplätze benannt.",
        "Trailermaterial zeigt sowohl dichte Stadt- als auch weite Naturräume.",
      ],
      contra: [
        "Trailer sind geschnittenes Marketingmaterial und erlauben keine Maßstabsberechnung.",
        "Zur Fläche der Spielwelt existiert bislang keine offizielle Angabe.",
      ],
    },
    related: [
      { type: "region", slug: "leonida" },
      { type: "location", slug: "vice-city" },
    ],
  },
];
