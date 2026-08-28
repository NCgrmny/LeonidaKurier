/**
 * Geografische Grundlage der Kompass-Karte.
 *
 * WICHTIG – Herkunft und Grenzen dieser Daten:
 * Rockstar Games hat die Spielkarte von Grand Theft Auto VI nicht
 * veröffentlicht. Es gibt keine offiziellen Geodaten zu Leonida.
 *
 * Was hier liegt, ist deshalb bewusst etwas anderes: die vereinfachte, reale
 * Küstenlinie des US-Bundesstaates Florida – öffentlich bekannte
 * Realgeografie, kein nachgezeichnetes Spielmaterial und kein fremdes
 * Kartenasset. Leonida ist erkennbar an Florida angelehnt; die reale Küste
 * dient als geografische Orientierung, nicht als Behauptung über die
 * Spielwelt. Die Oberfläche weist das an der Karte sichtbar aus.
 *
 * Sobald belegbare Angaben zur Spielkarte vorliegen, tritt eine eigene
 * Leonida-Geometrie an diese Stelle – die Kartenmechanik bleibt unverändert.
 */

/** Punkt in realen Längen-/Breitengraden. */
export type GeoPoint = readonly [lon: number, lat: number];

/**
 * Kartenausschnitt: Florida mit Küstenvorfeld. Der Rahmen ist bewusst etwas
 * weiter gefasst als die Landmasse, damit Marker samt Beschriftung nicht am
 * Kartenrand kleben.
 */
export const MAP_BOUNDS = {
  lonMin: -88.0,
  lonMax: -79.4,
  latMin: 23.9,
  latMax: 31.3,
} as const;

/**
 * Seitenverhältnis mit Breitengrad-Korrektur: Ein Längengrad ist auf der Höhe
 * Floridas nur rund 88 % eines Breitengrades lang.
 */
const LAT_CORRECTION = Math.cos((27.7 * Math.PI) / 180);

export const MAP_VIEWBOX = {
  width: Math.round(
    (MAP_BOUNDS.lonMax - MAP_BOUNDS.lonMin) * LAT_CORRECTION * 130,
  ),
  height: Math.round((MAP_BOUNDS.latMax - MAP_BOUNDS.latMin) * 130),
};

/** Projiziert einen realen Punkt in den normalisierten Kartenraum (0–1). */
export function fromGeo(lon: number, lat: number): { x: number; y: number } {
  return {
    x: (lon - MAP_BOUNDS.lonMin) / (MAP_BOUNDS.lonMax - MAP_BOUNDS.lonMin),
    y: (MAP_BOUNDS.latMax - lat) / (MAP_BOUNDS.latMax - MAP_BOUNDS.latMin),
  };
}

/** Wandelt eine Punktfolge in einen SVG-Pfad im ViewBox-Raum. */
export function toPath(points: readonly GeoPoint[], close = true): string {
  const commands = points.map(([lon, lat], index) => {
    const { x, y } = fromGeo(lon, lat);
    const px = (x * MAP_VIEWBOX.width).toFixed(1);
    const py = (y * MAP_VIEWBOX.height).toFixed(1);
    return `${index === 0 ? "M" : "L"}${px} ${py}`;
  });
  return commands.join(" ") + (close ? " Z" : "");
}

/**
 * Festland: Nordgrenze von West nach Ost, dann die Atlantikküste hinunter,
 * um die Südspitze und die Golfküste wieder hinauf.
 */
export const MAINLAND: readonly GeoPoint[] = [
  // Nordgrenze
  [-87.6, 31.0],
  [-85.0, 31.0],
  [-85.0, 30.75],
  [-84.0, 30.68],
  [-82.2, 30.58],
  [-82.05, 30.37],
  [-81.5, 30.72],
  [-81.45, 30.75],
  // Atlantikküste
  [-81.4, 30.4],
  [-81.28, 29.9],
  [-81.05, 29.4],
  [-80.95, 29.05],
  [-80.75, 28.75],
  [-80.6, 28.6],
  [-80.53, 28.45],
  [-80.6, 28.1],
  [-80.35, 27.6],
  [-80.3, 27.2],
  [-80.05, 26.85],
  [-80.03, 26.7],
  [-80.06, 26.35],
  [-80.1, 26.1],
  [-80.13, 25.9],
  [-80.16, 25.7],
  [-80.25, 25.5],
  [-80.4, 25.35],
  // Südküste / Florida Bay
  [-80.5, 25.2],
  [-80.8, 25.15],
  [-81.1, 25.13],
  [-81.2, 25.2],
  [-81.35, 25.5],
  [-81.55, 25.75],
  [-81.7, 26.0],
  [-81.8, 26.15],
  // Golfküste
  [-81.87, 26.4],
  [-82.0, 26.55],
  [-82.05, 26.7],
  [-82.25, 26.95],
  [-82.4, 27.1],
  [-82.55, 27.35],
  [-82.65, 27.6],
  // Tampa Bay
  [-82.55, 27.7],
  [-82.45, 27.85],
  [-82.55, 27.95],
  [-82.7, 27.9],
  [-82.75, 28.0],
  [-82.8, 28.15],
  [-82.75, 28.5],
  [-82.7, 28.75],
  [-82.75, 29.0],
  [-83.0, 29.15],
  [-83.4, 29.5],
  [-83.6, 29.75],
  [-84.0, 29.9],
  [-84.3, 30.05],
  [-84.45, 30.05],
  [-84.9, 29.8],
  [-85.0, 29.72],
  [-85.4, 29.85],
  [-85.7, 30.1],
  [-86.2, 30.3],
  [-86.6, 30.4],
  [-87.2, 30.35],
  [-87.5, 30.3],
  [-87.6, 30.5],
];

/** Inselkette im Süden (reale Florida Keys). */
export const KEYS_CHAIN: readonly GeoPoint[] = [
  [-80.4, 25.33],
  [-80.6, 25.18],
  [-80.9, 24.9],
  [-81.1, 24.72],
  [-81.4, 24.65],
  [-81.8, 24.55],
];

/** Großer Binnensee (reales Vorbild: Lake Okeechobee). */
export const INLAND_LAKE: readonly GeoPoint[] = [
  [-81.1, 27.15],
  [-80.85, 27.2],
  [-80.62, 27.0],
  [-80.7, 26.75],
  [-81.0, 26.72],
  [-81.12, 26.9],
];

/**
 * Reale Verkehrsachsen als Orientierungshilfe. Auch dies ist Realgeografie:
 * Über den Straßenverlauf im Spiel ist nichts belegt.
 */
export const HIGHWAYS: readonly { id: string; points: readonly GeoPoint[] }[] = [
  {
    id: "ostkueste",
    points: [
      [-81.65, 30.33],
      [-81.3, 29.6],
      [-80.95, 28.9],
      [-80.7, 28.2],
      [-80.35, 27.4],
      [-80.1, 26.6],
      [-80.15, 25.9],
      [-80.4, 25.4],
    ],
  },
  {
    id: "westkueste",
    points: [
      [-82.6, 30.2],
      [-82.4, 29.65],
      [-82.35, 28.9],
      [-82.45, 28.2],
      [-82.4, 27.5],
      [-81.9, 26.6],
      [-81.7, 26.15],
      [-81.0, 26.0],
      [-80.5, 25.75],
    ],
  },
  {
    id: "querachse",
    points: [
      [-82.6, 27.95],
      [-82.0, 28.1],
      [-81.4, 28.4],
      [-81.2, 28.55],
    ],
  },
];
