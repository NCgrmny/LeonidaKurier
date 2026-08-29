import type { Article } from "@/lib/types";

/**
 * Redaktioneller Seed-Bestand.
 *
 * Alle Beiträge sind als `demo: true` markiert und werden in der Oberfläche
 * sichtbar als Beispielinhalt ausgewiesen. Inhaltlich beschränken sie sich auf
 * öffentlich belegte Aussagen und auf die Darstellung der eigenen Arbeitsweise
 * – es werden bewusst keine unbelegten Behauptungen aufgestellt.
 */
export const articles: Article[] = [
  {
    id: "art-was-der-extended-look-zeigt",
    slug: "was-der-extended-look-zeigt",
    motif: "nachtviertel",
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
      "Vorbestellungen laufen, der Termin steht bei November und Take-Two nennt den Preis der Standard Edition. Die Eckdaten ohne Händlergerüchte.",
    summary:
      "Die offiziellen Angaben zu Release, Plattformen, Vorbestellung und Editionen.",
    category: "einordnung",
    author: "Redaktion Leonida Kurier",
    publishedAt: "2026-06-24",
    updatedAt: "2026-08-28",
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
          "Plattformen: PlayStation 5 und Xbox Series X|S.",
          "Standard Edition: 79,99 US-Dollar laut Take-Two.",
          "Vorbestellungen starteten am 25. Juni 2026.",
        ],
      },
      {
        type: "paragraph",
        text: "Regionale Preise und Händlerangebote können abweichen. Nicht angekündigte Plattformen oder Editionen bleiben unbestätigt.",
      },
    ],
    facts: [
      "Release am 19. November 2026.",
      "Bestätigt für PlayStation 5 und Xbox Series X|S.",
      "79,99 US-Dollar für die Standard Edition laut Take-Two.",
    ],
    assessment:
      "Die Eckdaten sind offiziell; weitere Plattformbehauptungen sind es nicht.",
    related: [{ type: "region", slug: "leonida" }],
  },
  {
    id: "art-leonida-gesichert",
    slug: "was-ueber-leonida-gesichert-ist",
    motif: "skyline-sonnenuntergang",
    title: "Sechs Namen, ein Bundesstaat: Was über Leonida gesichert ist",
    standfirst:
      "Rockstar Games hat den Schauplatz von Grand Theft Auto VI benannt – mehr aber auch nicht. Eine Bestandsaufnahme dessen, was tatsächlich belegt ist.",
    summary:
      "Bestandsaufnahme der offiziell bestätigten Schauplätze und Hauptfiguren von Grand Theft Auto VI – und der Grenzen dieses Wissensstands.",
    category: "analyse",
    author: "Redaktion Leonida Kurier",
    publishedAt: "2026-08-20",
    updatedAt: "2026-08-20",
    status: "bestaetigt",
    demo: true,
    readingMinutes: 4,
    sourceIds: ["src-rockstar-gta6", "src-trailer-1", "src-trailer-2"],
    body: [
      {
        type: "paragraph",
        text: "Der Bundesstaat Leonida ist der Schauplatz von Grand Theft Auto VI. Das ist keine Community-Interpretation, sondern eine Aussage, die Rockstar Games selbst getroffen hat – auf der offiziellen Seite zum Spiel und im ersten Trailer. Für eine Plattform, die zwischen Beleg und Vermutung unterscheiden will, ist genau diese Trennlinie der Ausgangspunkt.",
      },
      { type: "heading", text: "Was offiziell benannt ist" },
      {
        type: "paragraph",
        text: "Neben Vice City als Metropole hat Rockstar Games mehrere weitere Schauplätze im Bundesstaat namentlich genannt. Sie stehen in der Datenbank des Leonida Kurier mit dem Status „Bestätigt“ – nicht, weil wir sie für plausibel halten, sondern weil sie aus einer Primärquelle stammen.",
      },
      {
        type: "list",
        items: [
          "Vice City – die Metropole des Bundesstaates",
          "Leonida Keys – vorgelagerte Inselkette",
          "Port Gellhorn",
          "Ambrosia",
          "Grassrivers",
          "Mount Kalaga",
        ],
      },
      { type: "heading", text: "Wo das Wissen endet" },
      {
        type: "paragraph",
        text: "Aus benannten Orten folgt kein Kartenbild. Weder die Fläche der Spielwelt noch die Lage der Schauplätze zueinander sind offiziell dokumentiert. Deshalb trägt jede Position im Leonida Kompass eine Genauigkeitsangabe: Verortet wird nur, wo ein reales Vorbild nachvollziehbar ist – alles Übrige bleibt unbelegt und wird gesondert ausgewiesen.",
      },
      {
        type: "quote",
        text: "Ein Ortsname ist ein Fakt. Seine Position auf einer Karte ist es erst, wenn sie belegt ist.",
        attribution: "Redaktionsgrundsatz",
      },
      {
        type: "paragraph",
        text: "Diese Unterscheidung wirkt kleinlich, sie ist aber der Kern des Angebots: Der Kurier berichtet, das Radar bewertet, die Datenbank speichert – und jede Information trägt sichtbar, wie gut sie belegt ist.",
      },
    ],
    facts: [
      "Rockstar Games hat den Bundesstaat Leonida als Schauplatz offiziell bestätigt.",
      "Vice City, Leonida Keys, Port Gellhorn, Ambrosia, Grassrivers und Mount Kalaga wurden offiziell benannt.",
      "Lucia Caminos und Jason Duval sind die offiziell vorgestellten Hauptfiguren.",
    ],
    assessment:
      "Der bestätigte Wissensstand ist schmaler, als der Umfang der öffentlichen Diskussion vermuten lässt. Ortsnamen sind belegt, Geografie und Spielmechanik sind es nicht.",
    communityReaction:
      "In Foren und auf sozialen Plattformen kursieren zahlreiche Kartenentwürfe. Sie beruhen auf Interpretationen von Trailerbildern und gelten hier als Signal, nicht als Beleg.",
    related: [
      { type: "region", slug: "leonida" },
      { type: "location", slug: "vice-city" },
      { type: "character", slug: "lucia-caminos" },
    ],
  },
  {
    id: "art-zwei-trailer",
    slug: "zwei-trailer-zwei-wissensstaende",
    motif: "nachtviertel",
    title: "Zwei Trailer, zwei Wissensstände",
    standfirst:
      "Zwischen dem ersten und dem zweiten offiziellen Trailer liegen rund anderthalb Jahre. Was sich am belegbaren Wissen tatsächlich geändert hat.",
    summary:
      "Vergleich der beiden offiziellen Trailer und ihres jeweiligen Beitrags zum belegbaren Wissensstand.",
    category: "einordnung",
    author: "Redaktion Leonida Kurier",
    publishedAt: "2026-08-18",
    updatedAt: "2026-08-18",
    status: "bestaetigt",
    demo: true,
    readingMinutes: 3,
    sourceIds: ["src-trailer-1", "src-trailer-2", "src-rockstar-newswire"],
    body: [
      {
        type: "paragraph",
        text: "Der erste Trailer zu Grand Theft Auto VI erschien im Dezember 2023 und etablierte Setting und Hauptfiguren. Der zweite folgte im Mai 2025 und zeigte weitere Schauplätze sowie mehr vom Umfeld der beiden Protagonisten.",
      },
      { type: "heading", text: "Was Trailer als Quelle taugen" },
      {
        type: "paragraph",
        text: "Trailer sind offizielle Quellen – aber sie sind geschnittenes Marketingmaterial. Sie belegen zuverlässig, dass etwas existiert, das gezeigt wurde. Sie belegen nicht, in welchem Umfang, an welcher Stelle oder mit welcher Funktion es im fertigen Spiel auftaucht.",
      },
      {
        type: "list",
        items: [
          "Belegt: gezeigte Figuren, Orte und Fahrzeuge existieren im Material.",
          "Nicht belegt: Reihenfolge, Spielmechanik, Umfang, Kartenposition.",
          "Nicht belegt: alles, was aus Bildausschnitten hochgerechnet wird.",
        ],
      },
      {
        type: "paragraph",
        text: "Im Archiv des Leonida Kurier sind beide Trailer als Marker der Wissensentwicklung erfasst. So bleibt nachvollziehbar, ab wann eine Information überhaupt öffentlich verfügbar war.",
      },
    ],
    facts: [
      "Trailer 1 erschien am 4. Dezember 2023.",
      "Trailer 2 erschien im Mai 2025.",
    ],
    assessment:
      "Beide Trailer erweitern den Bestand an bestätigten Schauplätzen und Figuren. Aussagen über Spielmechanik lassen sich aus ihnen nicht ableiten.",
    communityReaction:
      "Nach beiden Veröffentlichungen stieg das Community-Aufkommen sprunghaft an – überwiegend mit Einzelbildanalysen, die die Redaktion als Hinweis, nicht als Beleg führt.",
    related: [
      { type: "character", slug: "jason-duval" },
      { type: "location", slug: "leonida-keys" },
    ],
  },
];
