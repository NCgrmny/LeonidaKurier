import type { Article } from "@/lib/types";

/**
 * Redaktioneller Bestand.
 *
 * Jeder Beitrag trägt ausdrücklich `demo: false` – ein Test erzwingt, dass das
 * Feld gesetzt ist, damit ein Platzhalter nie unbemerkt als Meldung gelesen
 * wird. Derzeit gibt es keine Platzhalter mehr: Alle Beiträge sind
 * recherchiert und über `sourceIds` an konkrete Quellen gebunden.
 *
 * Grundsatz bleibt, dass nur öffentlich belegte Aussagen aufgenommen werden.
 * Unautorisiert verbreitetes Material wird weder ausgewertet noch verlinkt.
 */
export const articles: Article[] = [
  {
    id: "art-was-der-extended-look-zeigt",
    slug: "was-der-extended-look-zeigt",
    motif: "skyline-sonnenuntergang",
    title: "26 Minuten Leonida: Was Rockstar im Extended Look tatsächlich zeigt",
    standfirst:
      "Figurenwechsel mitten im Auftrag, Autos, die aufgebrochen werden müssen, ein Überfall auf ein Waffelhaus. Eine Auswertung dessen, was im offiziellen Material sichtbar ist – und was daraus noch nicht folgt.",
    summary:
      "Auswertung der im offiziellen Extended Look gezeigten Spielmechaniken und Schauplätze.",
    category: "analyse",
    author: "Redaktion Leonida Kurier",
    publishedAt: "2026-08-29",
    updatedAt: "2026-08-29",
    status: "bestaetigt",
    lead: true,
    /**
     * Bildbefunde: Was auf dem Motiv zu sehen ist, einzeln gefuehrt. Damit
     * gilt am Bild dieselbe Beweislogik wie am Text – das Motiv ist Beleg,
     * nicht Schmuck.
     */
    bildbefunde: [
      {
        titel: "Vice City",
        beobachtung:
          "Skyline und Küstenlinie im offiziellen Material sichtbar, von Rockstar Games namentlich benannt.",
        status: "bestaetigt" as const,
      },
      {
        titel: "Küstenverlauf",
        beobachtung:
          "Lässt sich mit den Rekonstruktionen der Mapping-Community abgleichen, aber nicht daran messen.",
        status: "hinweis" as const,
      },
      {
        titel: "Verkehr",
        beobachtung:
          "Mehrere Fahrzeugklassen erkennbar; einzelne Modelle sind offiziell nicht benannt.",
        status: "hinweis" as const,
      },
      {
        titel: "Landmarke",
        beobachtung:
          "Position auf der Karte nicht bestimmbar, solange keine offizielle Geografie vorliegt.",
        status: "spekulation" as const,
      },
    ],
    demo: false,
    readingMinutes: 6,
    sourceIds: [
      "src-extended-look",
      "src-extended-look-watch",
      "src-rockstar-gta6",
      "src-digital-foundry",
    ],
    body: [
      {
        type: "paragraph",
        text: "Rund 26 Minuten lang zeigt Rockstar Games im Extended Look zusammenhängendes Spielmaterial. Die Premiere lief am 27. August auf Netflix, wenige Stunden später folgte der offizielle YouTube-Kanal. Rockstar weist das Material vollständig als Aufnahmen aus dem laufenden Spiel auf einer PlayStation 5 aus. Was darin zu sehen ist, kann der Kurier deshalb beschreiben. Was daraus über das fertige Spiel folgt, ist eine andere Frage.",
      },
      { type: "heading", text: "Zwei Figuren, ein Auftrag" },
      {
        type: "paragraph",
        text: "Der auffälligste Eingriff in die bekannte Formel ist der Figurenwechsel innerhalb einer laufenden Mission. Jason und Lucia übernehmen unterschiedliche Teile derselben Situation; das Material zeigt einen Auftrag, der schiefgeht und in eine Schießerei übergeht. Deckung, Waffenverhalten und das Zusammenspiel der beiden werden dabei über mehrere Minuten am Stück gezeigt, nicht in Schnittfolgen.",
      },
      {
        type: "paragraph",
        text: "Auffällig ist außerdem, wie viel Zeit auf die Beziehung der beiden außerhalb von Aufträgen verwendet wird. Das ist eine Setzung, keine Mechanik – aber es ist die Setzung, die Rockstar in einer 26-minütigen Präsentation für wichtig genug gehalten hat.",
      },
      { type: "heading", text: "Was am Rand sichtbar wird" },
      {
        type: "list",
        items: [
          "Fahrzeuge werden aufgebrochen und kurzgeschlossen, statt sich wie bisher unmittelbar öffnen zu lassen.",
          "Gezeigt werden kleine Überfälle – auf eine Tankstelle und auf ein Waffelrestaurant – neben den größeren Aufträgen der Geschichte.",
          "Aktivitäten abseits der Handlung sind sichtbar, unter anderem Training im Fitnessstudio.",
          "Passanten reagieren erkennbar auf Geschehen in ihrer Umgebung; das Material zeigt Verfolgungsfahrten, die Menschen ausweichen.",
        ],
      },
      { type: "heading", text: "Wo die Auswertung aufhört" },
      {
        type: "paragraph",
        text: "Ein gezeigter Vorgang belegt, dass es ihn gibt – nicht, wie er im fertigen Spiel funktioniert, wie oft er vorkommt oder ob er überall möglich ist. Ein Überfall auf ein Waffelrestaurant belegt einen Überfall auf ein Waffelrestaurant. Ob sich beliebige Geschäfte überfallen lassen, steht damit nicht fest. Solche Ableitungen führt der Kurier als Hinweis, nicht als Fakt.",
      },
      {
        type: "quote",
        text: "Präsentationsmaterial ist ausgewählt. Es zeigt, was funktioniert – nicht notwendigerweise, was üblich ist.",
        attribution: "Redaktionsgrundsatz",
      },
    ],
    facts: [
      "Der Extended Look ist rund 26 Minuten lang.",
      "Die Premiere lief am 27. August 2026 auf Netflix, danach auf dem offiziellen YouTube-Kanal.",
      "Rockstar Games weist das Material als In-Game-Aufnahmen von einer PlayStation 5 aus.",
      "Gezeigt werden unter anderem Figurenwechsel innerhalb einer Mission und das Aufbrechen von Fahrzeugen.",
    ],
    assessment:
      "Der Extended Look ist die bislang aussagekräftigste offizielle Quelle zum Spielablauf. Er zeigt Mechaniken im Zusammenhang statt in Schnitten – bleibt aber ausgewähltes Präsentationsmaterial.",
    communityReaction:
      "In der Community werden einzelne Einstellungen bereits auf Kartenpositionen und Geschäftsmodelle hin ausgelegt. Solche Zuordnungen laufen im Radar als Hinweis, bis ein zweiter Beleg hinzukommt.",
    related: [
      { type: "character", slug: "lucia-caminos" },
      { type: "character", slug: "jason-duval" },
      { type: "location", slug: "vice-city" },
      { type: "vehicle", slug: "airboat" },
    ],
  },
  {
    id: "art-bildrate",
    slug: "dreissig-bilder-pro-sekunde",
    motif: "kuestenstrasse",
    title: "30 Bilder pro Sekunde: Was belegt ist und was nicht",
    standfirst:
      "Ein Rockstar-Entwickler nennt die Bildrate, eine technische Analyse misst sie nach – und ein 60-Bild-Modus bleibt trotzdem unbestätigt. Ein Faktencheck an einem Beispiel, an dem sich die fünf Statusstufen gut zeigen lassen.",
    summary:
      "Faktencheck zur Bildrate von Grand Theft Auto VI auf PlayStation 5 und Xbox Series X|S.",
    category: "faktencheck",
    author: "Redaktion Leonida Kurier",
    publishedAt: "2026-08-29",
    updatedAt: "2026-08-29",
    status: "wahrscheinlich",
    demo: false,
    readingMinutes: 4,
    sourceIds: [
      "src-presse-30fps",
      "src-digital-foundry",
      "src-extended-look-watch",
    ],
    body: [
      {
        type: "paragraph",
        text: "Seit dem Extended Look kursiert eine Zahl: 30. Sie stimmt vermutlich – aber sie ist unterschiedlich gut belegt, je nachdem, worauf man sie bezieht. Genau dafür gibt es auf dieser Seite fünf Statusstufen.",
      },
      { type: "heading", text: "Was gemessen wurde" },
      {
        type: "paragraph",
        text: "Die technische Analyse von Digital Foundry beschreibt das veröffentlichte Material als weitgehend stabile Ausgabe mit 30 Bildern pro Sekunde und nur vereinzelten Einbrüchen. Das ist eine Messung am offiziellen Video, nicht am fertigen Spiel – aber sie ist überprüfbar, weil jede und jeder dasselbe Video ansehen kann.",
      },
      { type: "heading", text: "Was gesagt wurde" },
      {
        type: "paragraph",
        text: "Rob Nelson, Entwicklungsleiter bei Rockstar North, hat gegenüber einem Videoproduzenten erklärt, das Spiel laufe auf Konsole derzeit mit 30 Bildern pro Sekunde. Das ist eine Aussage aus dem Studio – sie ist aber über die Fachpresse überliefert und steht nicht auf einem offiziellen Rockstar-Kanal. Deshalb führt der Kurier den Punkt als wahrscheinlich und nicht als bestätigt.",
      },
      { type: "heading", text: "Was niemand gesagt hat" },
      {
        type: "paragraph",
        text: "Ein nachgereichter Modus mit 60 Bildern pro Sekunde ist nicht angekündigt. Es gibt Einschätzungen von Analysten, dass er auf aktueller Konsolenhardware schwer zu erreichen wäre. Eine Einschätzung ist kein Beleg – weder für noch gegen. Der Punkt bleibt Spekulation, bis Rockstar sich äußert.",
      },
      {
        type: "list",
        items: [
          "Das veröffentlichte Video läuft mit rund 30 Bildern pro Sekunde – gemessen, überprüfbar.",
          "Das Spiel läuft laut einem Rockstar-Entwickler derzeit mit 30 Bildern pro Sekunde auf Konsole – überliefert, plausibel, nicht offiziell veröffentlicht.",
          "Ein 60-Bild-Modus nach Erscheinen – unbelegt.",
        ],
      },
    ],
    facts: [
      "Digital Foundry misst am offiziellen Material eine weitgehend stabile Ausgabe mit 30 Bildern pro Sekunde.",
      "Rob Nelson von Rockstar North nennt gegenüber der Presse 30 Bilder pro Sekunde für die Konsolenfassung.",
      "Ein Modus mit 60 Bildern pro Sekunde ist von Rockstar Games nicht angekündigt.",
    ],
    assessment:
      "Die Bildrate des gezeigten Materials ist überprüfbar. Die Aussage über das fertige Spiel stammt aus zweiter Hand und bleibt deshalb eine Stufe unterhalb von „bestätigt“.",
    related: [{ type: "article", slug: "was-der-extended-look-zeigt" }],
  },
  {
    id: "art-keine-leaks",
    slug: "warum-hier-keine-leaks-stehen",
    motif: "sumpfland",
    title: "Warum hier keine Leaks stehen, obwohl sie echt sind",
    standfirst:
      "Rockstar Games hat die Echtheit der kursierenden Aufnahmen bestätigt. Für den Leonida Kurier ändert das nichts – und der Grund ist nicht nur rechtlicher Natur.",
    summary:
      "Die redaktionelle Haltung des Leonida Kurier zu unautorisiert verbreitetem Material.",
    category: "einordnung",
    author: "Redaktion Leonida Kurier",
    publishedAt: "2026-08-29",
    updatedAt: "2026-08-29",
    status: "bestaetigt",
    demo: false,
    readingMinutes: 4,
    sourceIds: [
      "src-rockstar-leak-statement",
      "src-presse-leaks",
      "src-redaktion",
    ],
    body: [
      {
        type: "paragraph",
        text: "Im August 2026 sind über mehr als eine Woche hinweg unautorisierte Spielaufnahmen zu Grand Theft Auto VI verbreitet worden. Am 26. August hat Rockstar Games sich dazu geäußert, die Echtheit des Materials eingeräumt und es als „heartbreaking for our team“ bezeichnet. Take-Two hat vor einem Bundesgericht Auskunftsersuchen gegen Microsoft und Discord eingereicht, um die Herkunft zu klären.",
      },
      {
        type: "paragraph",
        text: "Damit ist eine Frage entschieden, die vorher offen war: Das Material ist nicht gefälscht. Für die Arbeit dieser Seite ändert das trotzdem nichts.",
      },
      { type: "heading", text: "Was der Kurier nicht tut" },
      {
        type: "list",
        items: [
          "Kein Hosten unautorisierter Dateien, Videos oder Bilder.",
          "Keine Verlinkung auf Seiten, die solches Material bereitstellen.",
          "Keine Nacherzählung von Handlungsinhalten aus unautorisiertem Material.",
          "Keine Aufnahme in die Datenbank, auch nicht mit einem niedrigen Status.",
        ],
      },
      { type: "heading", text: "Warum nicht" },
      {
        type: "paragraph",
        text: "Der offensichtliche Grund ist der rechtliche: Es ist fremdes, unautorisiert verbreitetes Material. Der zweite Grund wiegt für ein Angebot wie dieses schwerer. Der Leonida Kurier hat genau eine Zusage – dass bei jeder Information dransteht, wie gut sie belegt ist. Unautorisiertes Material lässt sich nicht prüfen: Es ist nicht datierbar, sein Stand ist unbekannt, und was daraus als Ausschnitt kursiert, ist von niemandem verantwortet. Es als Beleg zu führen, hieße, die eigene Zusage aufzugeben.",
      },
      {
        type: "paragraph",
        text: "Dass Rockstar die Echtheit bestätigt hat, macht daraus keine Primärquelle. Echt heißt: Es stammt aus dem Spiel. Es heißt nicht: Es zeigt den fertigen Stand, es ist vollständig, oder es ist so gemeint.",
      },
      { type: "heading", text: "Was der Kurier stattdessen tut" },
      {
        type: "paragraph",
        text: "Über den Vorgang berichten – so wie hier. Dass unautorisiertes Material kursiert, ist eine überprüfbare Tatsache mit einer offiziellen Stellungnahme dazu. Der Vorgang gehört ins Radar. Sein Inhalt nicht.",
      },
      {
        type: "quote",
        text: "Echtheit und Belegbarkeit sind nicht dasselbe. Wir arbeiten mit dem Zweiten.",
        attribution: "Redaktionsgrundsatz",
      },
    ],
    facts: [
      "Rockstar Games hat sich am 26. August 2026 zu den unautorisierten Aufnahmen geäußert.",
      "Rockstar hat dabei eingeräumt, dass das Material echt ist.",
      "Take-Two Interactive hat Auskunftsersuchen gegen Microsoft und Discord eingereicht.",
      "Der Extended Look erschien einen Tag nach der Stellungnahme, am 27. August 2026.",
    ],
    assessment:
      "Der Vorgang ist berichtenswert, sein Inhalt ist als Quelle unbrauchbar. Diese Trennung ist keine Vorsicht, sondern die Bedingung dafür, dass der Status neben einer Information überhaupt etwas bedeutet.",
    related: [{ type: "article", slug: "die-community-karte-von-leonida" }],
  },
  {
    id: "art-extended-look",
    slug: "extended-look-jetzt-verfuegbar",
    motif: "skyline-sonnenuntergang",
    title: "Der Extended Look ist da: Was Rockstar jetzt wirklich zeigt",
    standfirst:
      "Rockstar Games hat am 27. August einen neuen ausführlichen Blick auf Grand Theft Auto VI veröffentlicht. Wir trennen die neuen Bilder von dem, was daraus erst noch abgeleitet wird.",
    summary:
      "Der Extended Look erweitert den belegbaren Wissensstand zu Jason, Lucia und Leonida.",
    category: "meldung",
    author: "Redaktion Leonida Kurier",
    publishedAt: "2026-08-27",
    updatedAt: "2026-08-28",
    status: "bestaetigt",
    readingMinutes: 4,
    demo: false,
    sourceIds: [
      "src-extended-look",
      "src-extended-look-watch",
      "src-rockstar-gta6",
      "src-rockstar-screenshots",
    ],
    body: [
      {
        type: "paragraph",
        text: "Der neue Extended Look ist offizielles Rockstar-Material. Was darin klar gezeigt oder von Rockstar benannt wird, kann der Leonida Kurier als bestätigt führen. Interpretationen einzelner Einstellungen bleiben Hinweise, bis ein weiterer Beleg hinzukommt.",
      },
      { type: "heading", text: "Was sich sicher sagen lässt" },
      {
        type: "list",
        items: [
          "Rockstar veröffentlichte den Extended Look am 27. August 2026.",
          "Rockstar kennzeichnet das Material vollständig als In-Game-Aufnahmen von PlayStation 5.",
          "Die Veröffentlichung ist über Rockstars GTA-VI-Seite sowie den offiziellen YouTube-Kanal erreichbar.",
          "Die offizielle Seite nennt weiterhin den 19. November 2026 für PlayStation 5 und Xbox Series X|S.",
        ],
      },
      { type: "heading", text: "Vom Bild in die Datenbank" },
      {
        type: "paragraph",
        text: "Orte, Figuren, Fahrzeuge und Geschäfte werden einzeln erfasst, mit dem offiziellen Material verknüpft und – wo möglich – der Community-Kartenrekonstruktion gegenübergestellt.",
      },
      {
        type: "quote",
        text: "Offizielles Bild bedeutet: Das Gezeigte existiert. Es bedeutet noch nicht automatisch, dass jede vermutete Funktion oder Kartenposition stimmt.",
        attribution: "Redaktionsgrundsatz",
      },
    ],
    facts: [
      "Der Extended Look erschien am 27. August 2026.",
      "Das gezeigte Material wurde laut Rockstar vollständig im Spiel auf PlayStation 5 aufgenommen.",
      "Rockstar nennt den 19. November 2026 als Erscheinungstermin.",
      "Offizielle Screenshots stehen im Rockstar-Medienbereich bereit.",
    ],
    assessment:
      "Das Material ist die derzeit wichtigste Primärquelle. Detailanalysen müssen trotzdem zwischen sichtbarem Beleg und Interpretation unterscheiden.",
    communityReaction:
      "Die Mapping-Community gleicht neue Einstellungen bereits mit ihrer bestehenden Rekonstruktion ab. Diese Zuordnungen starten im Radar als Community-Hinweis.",
    related: [
      { type: "character", slug: "lucia-caminos" },
      { type: "character", slug: "jason-duval" },
      { type: "location", slug: "vice-city" },
    ],
  },
  {
    id: "art-community-karte",
    slug: "die-community-karte-von-leonida",
    motif: "inselkette",
    title: "Leonida ist längst kartiert – nur noch nicht von Rockstar",
    standfirst:
      "Die GTA VI Mapping Community rekonstruiert Straßen, Inseln und Orte aus offiziellen Bildern. Der Kompass bindet diese Arbeit ein, ohne sie als endgültige Spielkarte auszugeben.",
    summary:
      "Einordnung der State-of-Leonida-Karte und der Beleglage dahinter.",
    category: "hintergrund",
    author: "Redaktion Leonida Kurier",
    publishedAt: "2026-08-28",
    updatedAt: "2026-08-28",
    status: "hinweis",
    readingMinutes: 5,
    demo: false,
    sourceIds: [
      "src-state-of-leonida",
      "src-gtaforums-mapping",
      "src-mapping-discord",
      "src-rockstar-screenshots",
    ],
    body: [
      {
        type: "paragraph",
        text: "Die vollständige offizielle Spielkarte ist noch nicht veröffentlicht. Trotzdem beginnt die Recherche nicht bei null: Die GTA VI Mapping Community rekonstruiert Leonida aus offiziellen Trailern, Screenshots, realen Vorbildern und räumlichen Vergleichen.",
      },
      { type: "heading", text: "Was State of Leonida leistet" },
      {
        type: "paragraph",
        text: "State of Leonida macht diese Recherche interaktiv zugänglich. Die Karte zeigt Orte, Landmarken und Bildpositionen und verbindet sie mit Material sowie realen Vergleichspunkten. Sie ist eine Community-Arbeit und keine offizielle Rockstar-Veröffentlichung.",
      },
      {
        type: "list",
        items: [
          "Offizielle Ortsnamen werden von rekonstruierten Positionen getrennt.",
          "Neue Trailer und Screenshots verändern den Kartenstand fortlaufend.",
          "Unsichere Flächen sind kein Beleg dafür, dass dort im Spiel nichts existiert.",
        ],
      },
      { type: "heading", text: "Die Rolle des Leonida Kompass" },
      {
        type: "paragraph",
        text: "Der Kurier kopiert die fremde Kartendatenbank nicht. Er stellt die Community-Karte mit sichtbarer Urhebernennung bereit und baut daneben eine eigene deutsche Quellen- und Erklärungsebene auf.",
      },
    ],
    facts: [
      "State of Leonida ist eine interaktive Karte der Mapping Community.",
      "Die vollständige offizielle GTA-VI-Karte ist nicht veröffentlicht.",
      "Die Rekonstruktion wird mit neuem offiziellen Material fortlaufend überarbeitet.",
    ],
    assessment:
      "Die Community-Karte ist die beste verfügbare Arbeitsgrundlage, aber keine Primärquelle für die endgültige Geografie.",
    communityReaction:
      "Die Kartierung wird öffentlich im Mapping-Discord und in GTAForums diskutiert; einzelne Positionen besitzen unterschiedliche Belastbarkeit.",
    related: [
      { type: "region", slug: "leonida" },
      { type: "location", slug: "leonida-keys" },
      { type: "location", slug: "vice-city" },
    ],
  },
  {
    id: "art-offizielle-screenshots",
    slug: "70-offizielle-screenshots",
    motif: "kuestenstrasse",
    title: "70 offizielle Screenshots: Die wichtigste Bildquelle für Leonida",
    standfirst:
      "Rockstars Medienbereich liefert überprüfbare Namen und Schauplätze. So wird aus Bildern eine belastbare Datenbasis.",
    summary: "Wie offizielle Screenshots als Primärquelle ausgewertet werden.",
    category: "analyse",
    author: "Redaktion Leonida Kurier",
    publishedAt: "2026-08-28",
    updatedAt: "2026-08-28",
    status: "bestaetigt",
    readingMinutes: 3,
    demo: false,
    sourceIds: ["src-rockstar-screenshots", "src-rockstar-gta6"],
    body: [
      {
        type: "paragraph",
        text: "Rockstars offizieller Medienbereich führt derzeit 70 GTA-VI-Screenshots. Die Motive sind nach Figuren und Regionen benannt und bilden eine Primärquelle für die bereits vorgestellte Welt.",
      },
      { type: "heading", text: "Was ein Screenshot belegt" },
      {
        type: "list",
        items: [
          "Das offiziell benannte Motiv gehört zum veröffentlichten Material.",
          "Sichtbare Gebäude, Fahrzeuge und Landschaften können beschrieben werden.",
          "Eine exakte Kartenposition oder Spielmechanik folgt daraus nicht automatisch.",
        ],
      },
      {
        type: "paragraph",
        text: "Jedes verwendete Bild erhält im Kurier eine sichtbare Bildquelle. Damit bleibt unterscheidbar, was Rockstar gezeigt hat und welche Einordnung von der Redaktion stammt.",
      },
    ],
    facts: [
      "Rockstars Screenshot-Bereich führt 70 Bilder.",
      "Der Medienbereich bietet die Sammlung zum Download an.",
    ],
    assessment:
      "Die Sammlung ist die beste visuelle Primärquelle vor Release, ersetzt aber keine offizielle Gesamtkarte.",
    related: [
      { type: "location", slug: "vice-city" },
      { type: "location", slug: "grassrivers" },
    ],
  },
  {
    id: "art-vorbestellung",
    slug: "vorbestellung-preis-release",
    motif: "nachtviertel",
    title: "Vorbestellung, Preis, Termin: Was offiziell bestätigt ist",
    standfirst:
      "Vorbestellungen laufen, der Termin steht, und für Deutschland sind Preis, Startzeit und Vorabdownload inzwischen benannt. Die Eckdaten ohne Händlergerüchte.",
    summary:
      "Release, Plattformen, Preis in Euro, Vorabdownload und Editionen – die offiziellen Angaben für Deutschland.",
    category: "einordnung",
    author: "Redaktion Leonida Kurier",
    publishedAt: "2026-06-24",
    updatedAt: "2026-08-29",
    status: "bestaetigt",
    readingMinutes: 4,
    demo: false,
    sourceIds: [
      "src-preorder-newswire",
      "src-taketwo-preorder",
      "src-rockstar-gta6",
    ],
    body: [
      {
        type: "paragraph",
        text: "Rockstar Games und Take-Two haben die Vorbestellung offiziell angekündigt. Damit lassen sich Termin, Plattformen und Editionen aus Primärquellen berichten, ohne auf Shop-Leaks zurückzugreifen.",
      },
      { type: "heading", text: "Die bestätigten Eckdaten" },
      {
        type: "list",
        items: [
          "Veröffentlichung: 19. November 2026.",
          "In Deutschland ab Mitternacht in der Nacht vom 18. auf den 19. November.",
          "Plattformen: PlayStation 5 und Xbox Series X|S.",
          "Standard Edition: 79,99 US-Dollar laut Take-Two, 79,99 Euro im deutschen Handel.",
          "Neben der Standard Edition ist eine Ultimate Edition angekündigt.",
          "Vorbestellungen starteten am 25. Juni 2026.",
          "Vorabdownload ab dem 12. November 2026 auf beiden Plattformen.",
        ],
      },
      {
        type: "paragraph",
        text: "Regionale Preise und Händlerangebote können abweichen. Nicht angekündigte Plattformen oder Editionen bleiben unbestätigt.",
      },
      { type: "heading", text: "Was das für Deutschland heißt" },
      {
        type: "paragraph",
        text: "Der Termin ist ein weltweiter Start, kein zeitversetzter. Für Deutschland bedeutet das: Mitternacht in der Nacht vom 18. auf den 19. November. Wer vorbestellt hat, kann eine Woche vorher mit dem Herunterladen beginnen – ab dem 12. November auf PlayStation 5 und Xbox Series X|S. Der Preis der Standard Edition liegt im deutschen Handel bei 79,99 Euro; die angekündigte Ultimate Edition enthält laut Rockstar zusätzliche Fahrzeuge, Waffen und Kleidung für Jason und Lucia.",
      },
    ],
    facts: [
      "Release am 19. November 2026, in Deutschland ab Mitternacht in der Nacht vom 18. auf den 19. November.",
      "Bestätigt für PlayStation 5 und Xbox Series X|S.",
      "79,99 US-Dollar für die Standard Edition laut Take-Two, 79,99 Euro im deutschen Handel.",
      "Vorabdownload ab dem 12. November 2026.",
      "Neben der Standard Edition ist eine Ultimate Edition angekündigt.",
    ],
    assessment:
      "Die Eckdaten sind offiziell; weitere Plattformbehauptungen sind es nicht.",
    related: [{ type: "region", slug: "leonida" }],
  },
  {
    id: "art-leonida-gesichert",
    slug: "was-ueber-leonida-gesichert-ist",
    motif: "skyline-sonnenuntergang",
    title: "Der Stand der Dinge: Was über Leonida wirklich belegt ist",
    standfirst:
      "Sechs Gebiete, elf vorgestellte Figuren, ein Termin. Eine Bestandsaufnahme dessen, was Rockstar Games selbst gesagt hat – und wo die Beleglage endet.",
    summary:
      "Alle offiziell bestätigten Gebiete, Figuren und Eckdaten zu Grand Theft Auto VI auf einen Blick.",
    category: "analyse",
    author: "Redaktion Leonida Kurier",
    publishedAt: "2026-08-20",
    updatedAt: "2026-08-30",
    status: "bestaetigt",
    demo: false,
    readingMinutes: 6,
    sourceIds: [
      "src-rockstar-gta6",
      "src-rockstar-regionen",
      "src-rockstar-charaktere",
      "src-rockstar-screenshots",
      "src-extended-look",
    ],
    body: [
      {
        type: "paragraph",
        text: "Über Grand Theft Auto VI wird viel geschrieben. Belegt ist davon ein überschaubarer Teil – aber er ist inzwischen deutlich größer als noch vor einem Jahr. Diese Bestandsaufnahme führt nur auf, was Rockstar Games selbst veröffentlicht hat: auf der offiziellen Seite, in den Trailern, im Extended Look und in den offiziellen Figurenprofilen.",
      },
      { type: "heading", text: "Die sechs Gebiete" },
      {
        type: "paragraph",
        text: "Rockstar hat sechs Teile des Bundesstaates benannt und jedem eine eigene Beschreibung gegeben. Das ist mehr als eine Namensliste: Aus den Beschreibungen geht hervor, wovon die Orte leben.",
      },
      {
        type: "list",
        items: [
          "Vice City – die Metropole, mit Ocean Beach, Little Cuba, dem Hafen VC Port und dem Flohmarkt Tisha-Wocka.",
          "Leonida Keys – die südliche Inselkette. Hier steht die Wohnung, in der Jason und Lucia zu Beginn leben.",
          "Grassrivers – die Feuchtgebiete im Südwesten. Dafür führt das Spiel Airboats als neue Fahrzeugklasse ein.",
          "Port Gellhorn – Leonidas vergessene Küste: heruntergekommene Motels, leere Einkaufszeilen, ein arbeitender Hafen.",
          "Ambrosia – am Lake Leonida. Die Zuckerraffinerie Allied Crystal stellt die Arbeitsplätze, fast alles Übrige die örtliche Rockergruppe.",
          "Mount Kalaga – Nationalpark an der Nordgrenze, mit Wäldern, Schluchten und Flüssen.",
        ],
      },
      { type: "heading", text: "Die Figuren" },
      {
        type: "paragraph",
        text: "Neben Lucia Caminos und Jason Duval hat Rockstar mehrere Nebenfiguren mit eigenen Profilen vorgestellt. Auffällig ist, wie eng sie verknüpft sind: Brian Heder ist Vermieter von Jasons Wohnung und Verbindungsmann zu Cal Hampton. Boobie Ike und Dre'Quan Priest betreiben gemeinsam das Label Only Raw Records, bei dem The Real Dimez unter Vertrag stehen. Das ist kein loser Figurenkatalog, sondern ein Geflecht.",
      },
      {
        type: "list",
        items: [
          "Lucia Caminos – geboren in Liberty City, saß im Leonida Penitentiary.",
          "Jason Duval – Armeezeit, danach im Dienst örtlicher Drogenkuriere in den Keys.",
          "Boobie Ike – vom Straßengeschäft zu Immobilien, Club und Tonstudio.",
          "Dre'Quan Priest – Straßenhandel als Broterwerb, Musik als Ziel.",
          "The Real Dimez – Bae-Luxe und Roxy, bei Only Raw Records unter Vertrag.",
          "Brian Heder, Cal Hampton, Raul Bautista, Lori und der Rapper DWNPLY.",
        ],
      },
      { type: "heading", text: "Die Eckdaten" },
      {
        type: "list",
        items: [
          "Erscheinen am 19. November 2026 für PlayStation 5 und Xbox Series X|S.",
          "79,99 Euro für die Standard Edition im deutschen Handel, daneben eine Ultimate Edition.",
          "Vorabdownload ab dem 12. November 2026.",
          "Der Extended Look vom 27. August 2026 zeigt rund 26 Minuten Spielmaterial von einer PlayStation 5.",
        ],
      },
      { type: "heading", text: "Wo es aufhört" },
      {
        type: "paragraph",
        text: "Aus benannten Orten folgt kein Kartenbild. Weder die Fläche der Spielwelt noch die Lage der Gebiete zueinander sind offiziell dokumentiert. Deshalb trägt jede Position im Leonida Kompass eine Genauigkeitsangabe – verortet wird nur, wo ein reales Vorbild nachvollziehbar ist.",
      },
      {
        type: "paragraph",
        text: "Ebenso wenig belegt sind Namen von Bezirken oder Verwaltungseinheiten, die derzeit kursieren. Sie stammen überwiegend aus unautorisiert verbreitetem Material und werden hier weder aufgenommen noch wiedergegeben.",
      },
      {
        type: "quote",
        text: "Ein Ortsname ist ein Fakt. Seine Position auf einer Karte ist es erst, wenn sie belegt ist.",
        attribution: "Redaktionsgrundsatz",
      },
    ],
    facts: [
      "Rockstar Games hat sechs Gebiete des Bundesstaates benannt und beschrieben.",
      "Elf Figuren sind mit eigenen Profilen offiziell vorgestellt.",
      "Der Termin ist der 19. November 2026 für PlayStation 5 und Xbox Series X|S.",
      "Zur Fläche der Spielwelt gibt es keine offizielle Angabe.",
    ],
    assessment:
      "Der belegte Wissensstand ist inzwischen breit genug für eine ernsthafte Datenbank – aber er endet abrupt dort, wo es um Geografie und Spielmechanik geht.",
    communityReaction:
      "Ein großer Teil der öffentlichen Diskussion arbeitet mit Angaben aus unautorisierten Quellen. Der Kurier führt diese nicht.",
    related: [
      { type: "region", slug: "leonida" },
      { type: "location", slug: "vice-city" },
      { type: "character", slug: "lucia-caminos" },
      { type: "article", slug: "warum-hier-keine-leaks-stehen" },
    ],
  },
  {
    id: "art-zwei-trailer",
    slug: "zwei-trailer-zwei-wissensstaende",
    motif: "kuestenstrasse",
    title: "Zwei Trailer, zwei Wissensstände – und was der dritte Schritt änderte",
    standfirst:
      "Zwischen dem ersten Trailer und heute liegen fast drei Jahre. Nicht die Bilder sind dabei das Interessante, sondern was jeweils überprüfbar wurde.",
    summary:
      "Wie sich der belegbare Wissensstand zu Grand Theft Auto VI von Trailer 1 über Trailer 2 bis zum Extended Look entwickelt hat.",
    category: "einordnung",
    author: "Redaktion Leonida Kurier",
    publishedAt: "2026-08-18",
    updatedAt: "2026-08-30",
    status: "bestaetigt",
    demo: false,
    readingMinutes: 5,
    sourceIds: [
      "src-trailer-1",
      "src-trailer-2",
      "src-extended-look",
      "src-rockstar-gta6",
    ],
    body: [
      {
        type: "paragraph",
        text: "Drei offizielle Veröffentlichungen haben den Wissensstand zu Grand Theft Auto VI geprägt: der erste Trailer im Dezember 2023, der zweite im Mai 2025 und der Extended Look im August 2026. Interessant ist weniger, was jeweils schön aussah, als was danach überprüfbar war.",
      },
      { type: "heading", text: "Dezember 2023: Ein Ort bekommt einen Namen" },
      {
        type: "paragraph",
        text: "Der erste Trailer stellte den Schauplatz vor und führte Lucia ein. Danach stand fest: Das Spiel spielt im Bundesstaat Leonida, Vice City ist die Metropole. Alles Weitere – Umfang, Struktur, Ablauf – war Interpretation von Bildmaterial.",
      },
      { type: "heading", text: "Mai 2025: Aus einem Ort wird ein Bundesstaat" },
      {
        type: "paragraph",
        text: "Der zweite Trailer, rund anderthalb Minuten lang, zeigte Jason als gleichwertige Hauptfigur und die beiden erstmals als funktionierendes Paar. Vor allem aber wurde aus einer Stadt eine Fläche: Inselkette, Feuchtgebiete, Hafenstadt, Landwirtschaft, Nationalpark. Die Gebiete bekamen Namen und eigene Beschreibungen.",
      },
      { type: "heading", text: "August 2026: Vom Bild zur Mechanik" },
      {
        type: "paragraph",
        text: "Der Extended Look verschob die Beleggrenze erneut – diesmal von der Welt zum Spielen. Rund 26 Minuten zusammenhängendes Material zeigen Figurenwechsel innerhalb einer Mission, das Aufbrechen von Fahrzeugen und Aktivitäten abseits der Handlung. Was vorher als plausible Vermutung galt, ließ sich nun ansehen.",
      },
      { type: "heading", text: "Was sich nicht geändert hat" },
      {
        type: "list",
        items: [
          "Eine vollständige offizielle Karte gibt es weiterhin nicht.",
          "Zur Fläche der Spielwelt existiert keine Angabe von Rockstar Games.",
          "Die Lage der Gebiete zueinander ist nicht offiziell dokumentiert.",
          "Bezirks- und Verwaltungsnamen, die kursieren, stammen nicht aus offiziellem Material.",
        ],
      },
      {
        type: "paragraph",
        text: "Der Abstand zwischen dem, was gezeigt wurde, und dem, was daraus abgeleitet wird, ist über die drei Veröffentlichungen nicht kleiner geworden – er ist gewachsen, weil mehr Material mehr Deutungsfläche bietet. Genau dafür trägt hier jede Angabe einen Status.",
      },
    ],
    facts: [
      "Trailer 1 erschien am 4. Dezember 2023, Trailer 2 am 6. Mai 2025.",
      "Der Extended Look folgte am 27. August 2026 mit rund 26 Minuten Material.",
      "Erst mit dem zweiten Trailer wurden die Gebiete außerhalb von Vice City benannt.",
      "Eine offizielle Gesamtkarte ist bis heute nicht veröffentlicht.",
    ],
    assessment:
      "Jede Veröffentlichung hat die Beleggrenze verschoben, keine hat sie aufgehoben. Der Zuwachs an Material vergrößert auch die Fläche für Fehlschlüsse.",
    related: [
      { type: "article", slug: "was-der-extended-look-zeigt" },
      { type: "region", slug: "leonida" },
      { type: "location", slug: "vice-city" },
    ],
  },
];
