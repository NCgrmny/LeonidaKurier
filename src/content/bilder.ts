import type { Pressebild } from "@/lib/bilder";

/**
 * Bildbestand des Leonida Kurier.
 *
 * Recherchiert und lizenzgeprüft; die Dateien selbst liegen unter
 * `public/bilder/`. Ein Eintrag wird erst angezeigt, wenn seine Datei
 * tatsächlich im Repository liegt – siehe `verfuegbareBilder()`. Bis dahin
 * tragen Standortkarte und Satzplatte die Fläche.
 *
 * Aufnahmebedingungen, bewusst eng:
 *
 * 1. Nur reale Aufnahmen aus Florida und der Golfküste. Die Bildunterschrift
 *    nennt immer den realen Aufnahmeort – und über `bezug`, ob der Eintrag
 *    diesen Ort tatsächlich als Vorbild führt oder ob es nur dieselbe
 *    Landschaft ist.
 * 2. Nur CC0, Public Domain, CC BY / CC BY-SA oder eigene Aufnahmen.
 * 3. Kein Rockstar-Material, keine Screenshots, kein fremdes Fan-Artwork,
 *    keine fremden GTA-Karten – unabhängig von der Quelle.
 * 4. Keine erkennbaren Privatpersonen im Vordergrund.
 * 5. Die Datei liegt im Repository. Kein Hotlinking auf fremde Server.
 *
 * `bearbeitung` steht überall dort, wo die Lizenz eine Nennung verlangt: Die
 * Darstellung beschneidet jedes Bild auf das Seitenverhältnis seiner Fläche,
 * und CC BY-SA verlangt, dass eine Bearbeitung als solche kenntlich ist.
 */
export const bilder: Pressebild[] = [
  {
    datei: "miami-skyline-am-meer.jpg",
    beschreibung: "Skyline von Miami, vom Atlantik aus gesehen",
    aufnahmeort: "Miami-Dade County, Florida",
    urheber: "Matthew T Rader",
    lizenz: "CC BY-SA 4.0",
    lizenzUrl: "https://creativecommons.org/licenses/by-sa/4.0/",
    quelleUrl:
      "https://commons.wikimedia.org/wiki/File:Miami_skyline_from_the_ocean.jpg",
    jahr: 2020,
    bezug: "vorbild",
    bearbeitung: "Bildausschnitt",
    fuer: ["vice-city"],
  },
  {
    datei: "ocean-drive-art-deco-nacht.jpg",
    beschreibung: "Beleuchtete Art-déco-Hotels am Ocean Drive bei Nacht",
    aufnahmeort: "Miami Beach, Florida",
    urheber: "Gzzz",
    lizenz: "CC BY-SA 4.0",
    lizenzUrl: "https://creativecommons.org/licenses/by-sa/4.0/",
    quelleUrl: "https://commons.wikimedia.org/wiki/File:Ocean_Drive_by_night_1.jpg",
    jahr: 2016,
    bezug: "vorbild",
    bearbeitung: "Bildausschnitt",
    fuer: ["ocean-beach"],
  },
  {
    datei: "florida-keys-overseas-highway.jpg",
    beschreibung: "Zwei Brücken des Overseas Highway über das Wasser der Keys",
    aufnahmeort: "Florida Keys, Florida",
    urheber: "Elkman",
    lizenz: "CC BY-SA 4.0",
    lizenzUrl: "https://creativecommons.org/licenses/by-sa/4.0/",
    quelleUrl:
      "https://commons.wikimedia.org/wiki/File:Overseas_Highway_Channel_5_Bridge.jpg",
    jahr: 2008,
    bezug: "vorbild",
    bearbeitung: "Bildausschnitt",
    fuer: ["leonida-keys"],
  },
  {
    datei: "portmiami-kreuzfahrtschiff.jpg",
    beschreibung: "Kreuzfahrtschiff in PortMiami, vom Wasser aus aufgenommen",
    aufnahmeort: "PortMiami, Miami, Florida",
    urheber: "Kiran891",
    lizenz: "CC BY-SA 4.0",
    lizenzUrl: "https://creativecommons.org/licenses/by-sa/4.0/",
    quelleUrl:
      "https://commons.wikimedia.org/wiki/File:Independence_of_the_Seas_at_Port_Miami_(March_15,_2024).jpg",
    jahr: 2024,
    bezug: "vorbild",
    bearbeitung: "Bildausschnitt",
    fuer: ["vc-port"],
  },
  {
    datei: "little-havana-welcome-center.jpg",
    beschreibung: "Welcome Center an der Calle Ocho im Viertel Little Havana",
    aufnahmeort: "Little Havana, Miami, Florida",
    urheber: "Tamanoeconomico",
    lizenz: "CC BY-SA 4.0",
    lizenzUrl: "https://creativecommons.org/licenses/by-sa/4.0/",
    quelleUrl:
      "https://commons.wikimedia.org/wiki/File:Little_Havana_Welcome_Center.jpg",
    jahr: 2018,
    bezug: "vorbild",
    bearbeitung: "Bildausschnitt",
    fuer: ["little-cuba"],
  },
  {
    datei: "lake-okeechobee-aus-dem-all.jpg",
    beschreibung: "Lake Okeechobee aus dem Weltraum",
    aufnahmeort: "Lake Okeechobee, Florida",
    urheber: "NASA",
    lizenz: "Public Domain",
    lizenzUrl: "https://creativecommons.org/publicdomain/mark/1.0/",
    quelleUrl:
      "https://commons.wikimedia.org/wiki/File:Okeechobee_lake_from_space.jpg",
    jahr: 2005,
    bezug: "vorbild",
    fuer: ["lake-leonida"],
  },
  {
    // Grassrivers führt kein belegtes Vorbild – die Everglades sind hier
    // Landschaft, nicht Beleg.
    datei: "everglades-pahayokee-sawgrass.jpg",
    beschreibung: "Steg durch Sägegras und Zypressen unter stürmischem Himmel",
    aufnahmeort: "Everglades-Nationalpark, Florida",
    urheber: "Federico Acevedo, National Park Service",
    lizenz: "Public Domain",
    lizenzUrl: "https://creativecommons.org/publicdomain/mark/1.0/",
    quelleUrl:
      "https://commons.wikimedia.org/wiki/File:Pahayokee_Trail_(53617613054).jpg",
    jahr: 2019,
    bezug: "region",
    fuer: ["grassrivers"],
  },
  {
    datei: "zuckerrohrfeld-canal-point.jpg",
    beschreibung: "Zuckerrohrfeld einer Versuchsstation des US-Landwirtschaftsministeriums",
    aufnahmeort: "Canal Point, Florida",
    urheber: "Scott Bauer, USDA Agricultural Research Service",
    lizenz: "Public Domain",
    lizenzUrl: "https://creativecommons.org/publicdomain/mark/1.0/",
    quelleUrl: "https://commons.wikimedia.org/wiki/File:Sugarcane_field.jpg",
    jahr: 1997,
    bezug: "region",
    fuer: ["ambrosia"],
  },
  {
    // Ausdrücklich kein Vorbildbezug: Der Apalachicola National Forest belegt
    // nordfloridanische Landschaft, nicht das Aussehen von Mount Kalaga.
    datei: "apalachicola-national-forest.jpg",
    beschreibung: "Waldteich in einem Kiefernwald im Norden Floridas",
    aufnahmeort: "Apalachicola National Forest, Florida",
    urheber: "Sallicio",
    lizenz: "Public Domain",
    lizenzUrl: "https://creativecommons.org/publicdomain/mark/1.0/",
    quelleUrl: "https://commons.wikimedia.org/wiki/File:Apalachicola_pond.JPG",
    jahr: 2009,
    bezug: "region",
    fuer: ["mount-kalaga"],
  },
];
