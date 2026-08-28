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
    lead: true,
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
  {
    id: "art-kartenumfang",
    slug: "wie-gross-wird-leonida",
    motif: "kuestenstrasse",
    title: "Wie groß wird Leonida?",
    standfirst:
      "Die meistdiskutierte Frage der Community lässt sich derzeit nicht beantworten. Warum die kursierenden Zahlen keine Grundlage haben.",
    summary:
      "Einordnung der Community-Schätzungen zur Größe der Spielwelt – und warum sie den Status „Spekulation“ tragen.",
    category: "faktencheck",
    author: "Redaktion Leonida Kurier",
    publishedAt: "2026-08-14",
    updatedAt: "2026-08-14",
    status: "spekulation",
    demo: true,
    readingMinutes: 3,
    sourceIds: ["src-community-signal", "src-redaktion", "src-rockstar-gta6"],
    body: [
      {
        type: "paragraph",
        text: "Kaum eine Frage wird häufiger gestellt: Wie groß ist die Spielwelt von Grand Theft Auto VI? In Umlauf sind konkrete Flächenangaben in Quadratkilometern. Belegt ist keine davon.",
      },
      { type: "heading", text: "Woher die Zahlen stammen" },
      {
        type: "paragraph",
        text: "Die kursierenden Werte entstehen, indem Bildausschnitte aus Trailern mit bekannten Größen aus früheren Titeln verglichen werden. Das Verfahren setzt voraus, dass Brennweite, Perspektive und Maßstab bekannt sind – bei geschnittenem Marketingmaterial ist das nicht der Fall.",
      },
      {
        type: "list",
        items: [
          "Rockstar Games hat keine Flächenangabe veröffentlicht.",
          "Take-Two hat sich zum Umfang der Spielwelt nicht geäußert.",
          "Die kursierenden Zahlen stammen aus Community-Rekonstruktionen.",
        ],
      },
      {
        type: "paragraph",
        text: "Der Leonida Kurier führt die Frage deshalb als Theorie mit dem Status „Spekulation“. Sobald eine belastbare Angabe vorliegt, wird der Status im Radar geändert – nachvollziehbar und mit Datum.",
      },
    ],
    facts: [
      "Zur Fläche der Spielwelt existiert keine offizielle Angabe.",
      "Die verbreiteten Zahlen beruhen auf Community-Rekonstruktionen aus Trailermaterial.",
    ],
    assessment:
      "Solange keine Primärquelle eine Größenangabe macht, ist jede Zahl eine Schätzung. Der Status bleibt „Spekulation“.",
    communityReaction:
      "Das Thema erzeugt dauerhaft hohes Aufkommen auf Reddit und X. Die Redaktion wertet das als Interessenssignal, nicht als Bestätigung.",
    related: [
      { type: "theory", slug: "wie-gross-wird-leonida" },
      { type: "region", slug: "leonida" },
    ],
  },
  {
    id: "art-standards",
    slug: "wie-der-kurier-arbeitet",
    motif: "sumpfland",
    title: "Wie der Kurier arbeitet",
    standfirst:
      "Fünf Statusstufen, verlinkte Quellen, keine gespiegelten Fremdinhalte: Die redaktionellen Regeln dieser Plattform, offengelegt.",
    summary:
      "Die redaktionellen Standards des Leonida Kurier: Statusstufen, Umgang mit Quellen und Grenzen der Automatisierung.",
    category: "hintergrund",
    author: "Redaktion Leonida Kurier",
    publishedAt: "2026-08-10",
    updatedAt: "2026-08-10",
    status: "bestaetigt",
    demo: true,
    readingMinutes: 3,
    sourceIds: ["src-redaktion"],
    body: [
      {
        type: "paragraph",
        text: "Diese Plattform ist ein unabhängiges Fanprojekt. Sie hat keinen Zugang zu Rockstar Games und behauptet auch keinen. Was sie leisten kann, ist Ordnung: Jede Information bekommt einen Status, eine Quelle und ein Datum.",
      },
      { type: "heading", text: "Die fünf Statusstufen" },
      {
        type: "list",
        items: [
          "Bestätigt – offiziell bestätigt oder eindeutig gezeigt.",
          "Wahrscheinlich – mehrere belastbare Hinweise, keine Bestätigung.",
          "Hinweis – interessanter Fund, nicht ausreichend belegt.",
          "Spekulation – Community-Theorie oder Interpretation.",
          "Widerlegt – frühere Annahme hat sich erledigt.",
        ],
      },
      { type: "heading", text: "Umgang mit Community-Quellen" },
      {
        type: "paragraph",
        text: "Reddit, X und YouTube sind Signalquellen. Wenn dort ein Thema auffällig an Aufkommen gewinnt, landet es im Radar – als Beobachtung, nicht als Meldung. Erst nach der Quellenprüfung entsteht daraus ein Beitrag.",
      },
      {
        type: "paragraph",
        text: "Fremde Artikel und Community-Beiträge werden nicht gespiegelt, sondern verlinkt und eingeordnet. Geleaktes Material wird nicht gehostet und nicht ausgewertet.",
      },
      { type: "heading", text: "Grenzen der Automatisierung" },
      {
        type: "paragraph",
        text: "Automatisierte Verfahren dürfen Signale sortieren und zusammenfassen. Sie dürfen keine unbelegte Behauptung als Fakt veröffentlichen. Jede Veröffentlichung wird redaktionell freigegeben.",
      },
    ],
    facts: [
      "Jede Information erhält einen von fünf Statuswerten.",
      "Community-Plattformen gelten als Signalquelle, nicht als Beleg.",
      "Automatisierte Entwürfe werden vor Veröffentlichung redaktionell freigegeben.",
    ],
    assessment:
      "Die Statuslogik ist der Kern des Angebots. Sie macht sichtbar, wie belastbar eine Information ist – auch dann, wenn die Antwort „wissen wir nicht“ lautet.",
    related: [{ type: "article", slug: "was-ueber-leonida-gesichert-ist" }],
  },
];
