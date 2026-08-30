# Bildablage

Hier liegen die Fotos des Leonida Kurier. Eine Datei allein genügt nicht –
jedes Bild braucht einen Eintrag in `src/content/bilder.ts` mit Urheber,
Lizenz, Quelle, realem Aufnahmeort und Bezug. Ohne Eintrag zeigt die
Oberfläche das Bild nicht an; ohne Datei zeigt sie den Eintrag nicht an.
Beides muss zusammenkommen.

## Aktuell erwartet

Diese sieben Dateien sind bereits eingetragen und lizenzgeprüft. Sobald eine
davon hier liegt, erscheint sie beim nächsten Deploy – ohne Codeänderung.
Der Dateiname muss exakt stimmen.

| Datei | Quelle auf Wikimedia Commons |
|---|---|
| `miami-skyline-am-meer.jpg` | `File:Miami_skyline_from_the_ocean.jpg` |
| `ocean-drive-art-deco-nacht.jpg` | `File:Ocean_Drive_by_night_1.jpg` |
| `florida-keys-overseas-highway.jpg` | `File:Overseas_Highway_Channel_5_Bridge.jpg` |
| `lake-okeechobee-aus-dem-all.jpg` | `File:Okeechobee_lake_from_space.jpg` |
| `everglades-pahayokee-sawgrass.jpg` | `File:Pahayokee_Trail_(53617613054).jpg` |
| `zuckerrohrfeld-canal-point.jpg` | `File:Sugarcane_field.jpg` |
| `apalachicola-national-forest.jpg` | `File:Apalachicola_pond.JPG` |

Die letzte Quelldatei endet auf `.JPG` in Großbuchstaben – die Zieldatei muss
auf `.jpg` in Kleinbuchstaben enden.

`npm run bilder` zeigt jederzeit, welche Dateien noch fehlen.

## Aufnahmebedingungen

Erlaubt sind ausschließlich:

- eigene Aufnahmen
- CC0 / Public Domain
- CC BY / CC BY-SA (mit Lizenzlink und Quellenlink)

Nicht erlaubt, unabhängig von der Fundstelle: Rockstar-Material, Screenshots
aus dem Spiel, fremde Fan-Artworks, fremde GTA-Karten.

Keine erkennbaren Personen im Vordergrund. Zwei bereits recherchierte Motive
sind genau daran gescheitert; sie stehen mit Begründung unter
`abgelehnteBilder` in `src/content/bilder.ts`, damit sie nicht erneut
vorgeschlagen werden.

Dateinamen: klein, mit Bindestrichen, Endung `.jpg`, `.png`, `.webp`
oder `.avif`.
