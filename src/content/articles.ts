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
    id: "art-leonida-gesichert",
    slug: "was-ueber-leonida-gesichert-ist",
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
    lead: true,
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
        text: "Aus benannten Orten folgt kein Kartenbild. Weder die Fläche der Spielwelt noch die Lage der Schauplätze zueinander sind offiziell dokumentiert. Deshalb trägt jede Position im Leonida Kompass eine Genauigkeitsangabe – und die lautet derzeit durchgängig „Platzhalter“.",
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
