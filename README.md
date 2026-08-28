# Leonida Kurier

**Dein unabhängiger Begleiter durch Leonida.**

Unabhängige deutschsprachige Plattform rund um die Welt von GTA VI – kein Newsblog,
sondern ein zusammenhängendes Medienprodukt aus Redaktion, Karte, Datenbank und Archiv.

Ein Projekt von **Saimôr**.
Unabhängiges Fanprojekt, nicht verbunden mit Rockstar Games oder Take-Two Interactive.

---

## Die Informationsarchitektur

Jeder Bereich beantwortet genau eine Leitfrage:

| Bereich | Leitfrage | Route |
| --- | --- | --- |
| **Kurier** | Was ist passiert? | `/kurier` |
| **Kompass** | Wo ist es? | `/kompass` |
| **Radar** | Was könnte passieren? | `/radar` |
| **Datenbank** | Was wissen wir wirklich? | `/datenbank` |
| **Archiv** | Wie kam es dazu? | `/archiv` |

## Das Radar-System

Kern der Plattform: Jede Information trägt sichtbar ihren Verifizierungsgrad.
Spekulation wird nie als Fakt dargestellt.

| Status | Bedeutung |
| --- | --- |
| `bestaetigt` | Offiziell bestätigt oder eindeutig gezeigt |
| `wahrscheinlich` | Mehrere belastbare Hinweise, keine Bestätigung |
| `hinweis` | Interessanter Fund, nicht ausreichend belegt |
| `spekulation` | Community-Theorie oder Interpretation |
| `widerlegt` | Frühere Annahme hat sich erledigt |

Definiert in `src/lib/status.ts` – Farben, Definitionstexte und Sortierung an einer Stelle.

---

## Technischer Stand

- **Next.js 16** (App Router) · **React 19** · **TypeScript** (strict) · **Tailwind CSS v4**
- Statisch vorgerendert, wo möglich (34 Routen), Kompass serverseitig wegen Deep-Link
- Keine Laufzeit-Abhängigkeiten außer Next/React – die Karte ist eigenentwickelt
- Vorbereitet für PostgreSQL auf Vercel

### Befehle

```bash
npm install
npm run dev        # Entwicklung auf http://localhost:3000
npm run build      # Produktionsbuild
npm run check      # Typecheck + Lint + Tests
npm test           # Integritätstests der Inhaltsschicht
```

---

## Projektstruktur

```
src/
├── app/                        Routen (App Router)
│   ├── page.tsx                Startseite
│   ├── kurier/[slug]/          Beiträge mit Quellenapparat
│   ├── radar/                  Statusboard + Arbeitsweise
│   ├── kompass/                Interaktive Karte
│   ├── datenbank/[collection]/[slug]/   Sammlungen und Detailseiten
│   ├── archiv/                 Chronologie
│   ├── sitemap.ts, robots.ts   SEO-Infrastruktur
│   └── ...
├── components/                 UI nach Bereich getrennt
├── content/                    Seed-Inhalte (die aktuelle Datenquelle)
├── lib/
│   ├── types.ts                Domänenmodell
│   ├── status.ts               Radar-Statuslogik
│   ├── site.ts                 Marke, Navigation, Domains
│   ├── seo.ts                  Metadaten und JSON-LD
│   └── content/
│       ├── repository.ts       Zugriffs-Interface (Austauschpunkt)
│       ├── seed-repository.ts  Implementierung über src/content
│       ├── collections.ts      Registry der Datenbank-Sammlungen
│       └── queries.ts          Abfragehelfer
├── proxy.ts                    Domain-Routing für leonidakompass.de
prisma/schema.prisma            Datenbankschema für Phase 2 (noch nicht aktiv)
tests/                          Integritätstests
```

### Datenarchitektur

Inhalte stehen **nicht** in Komponenten. Alle Seiten lesen ausschließlich über
`content` aus `src/lib/content` – ein asynchrones Repository-Interface.

```
Seiten  →  ContentRepository (Interface)  →  seedRepository (src/content)
                                          ↘  prismaRepository (Phase 2)
```

Der Wechsel auf PostgreSQL erfordert deshalb keine Änderung an Seiten oder
Komponenten: Es wird eine zweite Implementierung desselben Interfaces in
`src/lib/content/index.ts` eingehängt. Das Schema dafür liegt bereits in
`prisma/schema.prisma`.

Jede Entität führt Titel, Beschreibung, Kategorie, Status, Quelle, Datum, optional
Region und Koordinaten sowie Verweise auf verwandte Inhalte. Dadurch lässt sich ein
Kurier-Beitrag direkt mit Kompass-Marker, Ort und Region verzahnen.

### Neue Inhalte anlegen

1. Quelle in `src/content/sources.ts` ergänzen (jede Aussage braucht eine).
2. Eintrag in der passenden Datei unter `src/content/` anlegen, Status setzen.
3. `related`-Verweise auf bestehende Entitäten setzen.
4. `npm run check` – die Tests prüfen Slugs, Status, Quellen und Verweise.

Detailseite, Sitemap-Eintrag und Verlinkung entstehen daraus automatisch.

---

## Karte (Leonida Kompass)

Die Kartenmechanik ist eigenentwickelt (`src/components/kompass/`): Zoom,
Verschieben per Zeiger und Tastatur, umschaltbare Ebenen, Markerauswahl mit
Verknüpfung in die Datenbank, Deep-Link über `/kompass?marker=<slug>`.

**Grundkarte:** Gezeichnet wird die vereinfachte reale Geografie Floridas
(`src/content/geography.ts`) – Küstenlinie mit Bézier-Glättung, Inselkette,
Binnensee, Feuchtgebiet, Waldflächen, Flüsse, Verkehrsnetz und Siedlungsflächen,
dazu Maßstabsleiste, Nordpfeil und Kartenrahmen. Das ist öffentlich bekannte
Realgeografie, kein nachgezeichnetes Spielmaterial und kein fremdes Kartenasset.
Leonida ist erkennbar an Florida angelehnt, deshalb dient die reale Geografie als
geografische Orientierung.

**Anmutung:** Die Karte ist hell gehalten – Türkis für das Wasser, Sand für das
Land, Koralle für die Achsen, Magenta für die Ballungsräume – und liegt als
eigene Fläche in der ansonsten dunklen Oberfläche, wie eine gedruckte Karte auf
dem Tisch. Sämtliche Farbwerte stehen gebündelt in `MAP_PALETTE`
(`src/components/kompass/BaseMap.tsx`); die Anmutung lässt sich dort ändern,
ohne die Geometrie anzufassen.

**Was die Karte nicht behauptet:** Rockstar Games hat die Spielkarte nicht
veröffentlicht. Verortet werden deshalb nur Einträge mit nachvollziehbarem realem
Vorbild (`precision: "grob"`, mit Begründung im Feld `note` – etwa Vice City nach
dem Vorbild Miami). Alles Übrige bleibt `platzhalter`, wird **nicht** auf der
Karte platziert und steht sichtbar getrennt unter „ohne belegte Position“; es
lässt sich optional gestrichelt einblenden. Die Stufe `genau` ist erst nach
verifizierten In-Game-Daten zulässig – ein Test hält das fest.

Sobald die Spielkarte belegbar ist, tritt eine eigene Leonida-Geometrie an die
Stelle der Florida-Umrisse; die Kartenmechanik bleibt unverändert.

## Zeitungslayout

Der Kurier liegt als heller Zeitungsbogen in der ansonsten dunklen Oberfläche –
wie eine aufgeschlagene Zeitung auf dem Tisch. Zeitungskopf mit Kennzeile und
Ausgabedatum (`src/components/kurier/Masthead.tsx`, Variante `paper`),
Ressortband, dreispaltige Titelseite mit „Kurz gemeldet“-Schiene, zentriertem
Aufmacher, Initial, Blocksatz mit Silbentrennung, Spaltenlinien und
Statusschlüssel, darunter der Fließsatz weiterer Beiträge.

Der Statuspunkt ersetzt auf Papier die farbige Badge-Fläche
(`src/components/kurier/PaperStatus.tsx`) – dieselben Statusfarben, nur
zurückhaltender gesetzt. Alle Papierregeln stehen gebündelt in `globals.css`
unter „Papierbogen“; sie gelten lokal innerhalb von `.paper`, der Rest der
Oberfläche bleibt dunkel.

Das Ausgabedatum im Kopf ist das Datum des jüngsten Beitrags – der Kopf
behauptet damit keine Aktualität, die die Redaktion nicht hat.

## Domains

| Domain | Ziel |
| --- | --- |
| `leonidakurier.de` | Hauptplattform |
| `leonidakompass.de` | zweiter Einstieg, wird auf `/kompass` umgeschrieben |

Umgesetzt in `src/proxy.ts`. Die Kompass-Domain führt nicht zu einem separaten
Produkt: Alle übrigen Pfade bleiben erreichbar, damit Verlinkungen aus der Karte
heraus funktionieren.

---

## Deployment auf Vercel

1. Repository in Vercel importieren (Framework wird als Next.js erkannt,
   `vercel.json` setzt die Region auf `fra1`).
2. Beide Domains dem Projekt zuordnen: `leonidakurier.de` und `leonidakompass.de`.
3. Environment-Variablen setzen (Vorlage in `.env.example`):
   - `NEXT_PUBLIC_SITE_URL=https://leonidakurier.de`
   - `NEXT_PUBLIC_COMPASS_HOST=leonidakompass.de`

Ohne diese Variablen laufen sinnvolle Standardwerte; für korrekte Canonicals und
Sitemap sollte `NEXT_PUBLIC_SITE_URL` in Produktion gesetzt sein.

### Noch offen (benötigt Zugangsdaten oder Konten)

Diese Punkte sind vorbereitet, aber nicht aktivierbar, solange Zugänge fehlen:

- **PostgreSQL** – `DATABASE_URL`; Schema liegt vor, Prisma-Client noch nicht installiert
- **Reddit / X / YouTube APIs** – für automatisierte Radar-Signale (Phase 3)
- **n8n** – Orchestrierung der Signalverarbeitung
- **Google Search Console / Analytics** – Verifizierungs-Token
- **Impressum und Datenschutzerklärung** – benötigen die Angaben des Betreibers;
  `/rechtliches` weist derzeit auf die Ergänzung vor dem öffentlichen Start hin

---

## Redaktionelle Leitplanken

Diese Regeln sind im Produkt verankert, nicht nur dokumentiert:

- Keine Spekulation als Fakt – jede Information trägt einen Status.
- Keine erfundenen Einträge: Leere Sammlungen zeigen einen begründeten Leerzustand
  (`emptyHint` je Sammlung) statt Platzhalterdaten.
- Beispielinhalte sind mit `demo: true` markiert und werden in der Oberfläche als
  „Beispielinhalt“ ausgewiesen.
- Fremde Beiträge werden verlinkt und eingeordnet, nicht gespiegelt.
- Kein Hosting, keine Auswertung und keine Verlinkung von unrechtmäßig
  verbreitetem Material.
- Community-Plattformen sind Signalquellen für die Recherche, keine Belege.

---

## Roadmap

**Phase 1 – umgesetzt**
Designsystem, Startseite, Kurier mit Detailseiten, Radar, Kompass, Datenbank mit
Sammlungen und Detailseiten, Archiv, Mobile-First-Layout, SEO-Grundlagen,
Domain-Routing, Integritätstests.

**Phase 2**
PostgreSQL hinter dem bestehenden Repository-Interface, Redaktionsoberfläche,
belegte Kartenpositionen, weitere Kartenebenen, Filter, Newsletter.

**Phase 3**
Community-Einreichungen mit Moderation, automatisierte Signalerfassung über n8n
(mit redaktioneller Freigabe vor jeder Veröffentlichung), Kompass+ als
Premium-Funktionen.
