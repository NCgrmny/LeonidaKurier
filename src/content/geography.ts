/**
 * Geografische Grundlage der Kompass-Karte.
 *
 * WICHTIG – Herkunft und Grenzen dieser Daten:
 * Rockstar Games hat die Spielkarte von Grand Theft Auto VI nicht
 * veröffentlicht. Es gibt keine offiziellen Geodaten zu Leonida.
 *
 * Was hier liegt, ist deshalb bewusst etwas anderes: die vereinfachte, reale
 * Geografie des US-Bundesstaates Florida – Küstenlinie, Gewässer, Feuchtgebiete
 * und Verkehrsachsen. Öffentlich bekannte Realgeografie, kein nachgezeichnetes
 * Spielmaterial und kein fremdes Kartenasset. Leonida ist erkennbar an Florida
 * angelehnt; die reale Geografie dient als Orientierung, nicht als Behauptung
 * über die Spielwelt. Die Oberfläche weist das an der Karte aus.
 *
 * Sobald belegbare Angaben zur Spielkarte vorliegen, tritt eine eigene
 * Leonida-Geometrie an diese Stelle – die Kartenmechanik bleibt unverändert.
 */

/** Punkt in realen Längen-/Breitengraden. */
export type GeoPoint = readonly [lon: number, lat: number];

/**
 * Kartenausschnitt: Florida mit Küstenvorfeld. Der Rahmen ist bewusst weiter
 * gefasst als die Landmasse, damit Marker samt Beschriftung Luft haben.
 */
export const MAP_BOUNDS = {
  lonMin: -88.2,
  lonMax: -79.2,
  latMin: 23.8,
  latMax: 31.4,
} as const;

/**
 * Seitenverhältnis mit Breitengrad-Korrektur: Ein Längengrad ist auf der Höhe
 * Floridas nur rund 88 % eines Breitengrades lang.
 */
const LAT_CORRECTION = Math.cos((27.7 * Math.PI) / 180);

export const MAP_VIEWBOX = {
  width: Math.round((MAP_BOUNDS.lonMax - MAP_BOUNDS.lonMin) * LAT_CORRECTION * 130),
  height: Math.round((MAP_BOUNDS.latMax - MAP_BOUNDS.latMin) * 130),
};

/** Projiziert einen realen Punkt in den normalisierten Kartenraum (0–1). */
export function fromGeo(lon: number, lat: number): { x: number; y: number } {
  return {
    x: (lon - MAP_BOUNDS.lonMin) / (MAP_BOUNDS.lonMax - MAP_BOUNDS.lonMin),
    y: (MAP_BOUNDS.latMax - lat) / (MAP_BOUNDS.latMax - MAP_BOUNDS.latMin),
  };
}

/** Projiziert in den ViewBox-Raum des SVG. */
export function toViewBox(lon: number, lat: number): [number, number] {
  const { x, y } = fromGeo(lon, lat);
  return [x * MAP_VIEWBOX.width, y * MAP_VIEWBOX.height];
}

/** Eckige Punktfolge – für Grenzen, die tatsächlich gerade verlaufen. */
export function toPath(points: readonly GeoPoint[], close = true): string {
  const commands = points.map(([lon, lat], index) => {
    const [px, py] = toViewBox(lon, lat);
    return `${index === 0 ? "M" : "L"}${px.toFixed(1)} ${py.toFixed(1)}`;
  });
  return commands.join(" ") + (close ? " Z" : "");
}

/**
 * Weiche Punktfolge über Catmull-Rom-Interpolation, in kubische Béziers
 * überführt. Küstenlinien verlaufen rund – eine Polygonkette mit sichtbaren
 * Knicken sieht nach Drahtgitter aus, nicht nach Karte.
 */
export function toSmoothPath(
  points: readonly GeoPoint[],
  close = true,
  tension = 0.5,
): string {
  const pts = points.map(([lon, lat]) => toViewBox(lon, lat));
  if (pts.length < 3) return toPath(points, close);

  const at = (index: number): [number, number] => {
    if (close) return pts[(index + pts.length) % pts.length];
    return pts[Math.min(pts.length - 1, Math.max(0, index))];
  };

  const segments: string[] = [`M${at(0)[0].toFixed(1)} ${at(0)[1].toFixed(1)}`];
  const last = close ? pts.length : pts.length - 1;

  for (let i = 0; i < last; i += 1) {
    const p0 = at(i - 1);
    const p1 = at(i);
    const p2 = at(i + 1);
    const p3 = at(i + 2);

    const c1x = p1[0] + ((p2[0] - p0[0]) / 6) * tension * 2;
    const c1y = p1[1] + ((p2[1] - p0[1]) / 6) * tension * 2;
    const c2x = p2[0] - ((p3[0] - p1[0]) / 6) * tension * 2;
    const c2y = p2[1] - ((p3[1] - p1[1]) / 6) * tension * 2;

    segments.push(
      `C${c1x.toFixed(1)} ${c1y.toFixed(1)}, ${c2x.toFixed(1)} ${c2y.toFixed(1)}, ${p2[0].toFixed(1)} ${p2[1].toFixed(1)}`,
    );
  }

  return segments.join(" ") + (close ? " Z" : "");
}

/**
 * Festland. Dichte Stützstellen, damit Big Bend, Tampa Bay, Charlotte Harbor
 * und die Everglades-Küste als Formen erkennbar bleiben.
 */
export const MAINLAND: readonly GeoPoint[] = [
  // Nordgrenze (verläuft real weitgehend gerade)
  [-87.6, 31.0],
  [-86.5, 31.0],
  [-85.5, 31.0],
  [-85.0, 31.0],
  [-85.0, 30.9],
  [-84.98, 30.75],
  [-84.5, 30.72],
  [-84.0, 30.68],
  [-83.5, 30.65],
  [-83.0, 30.63],
  [-82.6, 30.6],
  [-82.2, 30.58],
  [-82.15, 30.45],
  [-82.05, 30.37],
  [-82.03, 30.5],
  [-81.9, 30.6],
  [-81.7, 30.7],
  [-81.5, 30.72],
  [-81.44, 30.71],
  // Atlantikküste
  [-81.4, 30.5],
  [-81.38, 30.3],
  [-81.32, 30.1],
  [-81.28, 29.9],
  [-81.2, 29.7],
  [-81.12, 29.5],
  [-81.05, 29.4],
  [-80.98, 29.2],
  [-80.92, 29.05],
  [-80.85, 28.9],
  [-80.75, 28.75],
  [-80.68, 28.65],
  [-80.6, 28.6],
  [-80.55, 28.52],
  [-80.53, 28.45],
  [-80.58, 28.35],
  [-80.6, 28.2],
  [-80.58, 28.1],
  [-80.5, 27.9],
  [-80.4, 27.7],
  [-80.35, 27.6],
  [-80.32, 27.4],
  [-80.28, 27.2],
  [-80.18, 27.0],
  [-80.08, 26.9],
  [-80.04, 26.8],
  [-80.03, 26.7],
  [-80.05, 26.5],
  [-80.06, 26.35],
  [-80.08, 26.2],
  [-80.1, 26.1],
  [-80.12, 26.0],
  [-80.13, 25.9],
  [-80.15, 25.8],
  [-80.16, 25.7],
  [-80.2, 25.6],
  [-80.25, 25.5],
  [-80.32, 25.42],
  [-80.4, 25.35],
  // Südküste / Florida Bay
  [-80.5, 25.22],
  [-80.65, 25.17],
  [-80.8, 25.15],
  [-80.95, 25.13],
  [-81.1, 25.13],
  [-81.17, 25.17],
  [-81.2, 25.25],
  [-81.28, 25.38],
  [-81.35, 25.5],
  [-81.45, 25.63],
  [-81.55, 25.75],
  [-81.63, 25.88],
  [-81.7, 26.0],
  [-81.75, 26.08],
  [-81.8, 26.15],
  // Golfküste
  [-81.85, 26.3],
  [-81.87, 26.4],
  [-81.95, 26.5],
  [-82.0, 26.55],
  [-82.03, 26.62],
  [-82.05, 26.7],
  [-82.15, 26.82],
  [-82.25, 26.95],
  [-82.35, 27.05],
  [-82.4, 27.1],
  [-82.48, 27.22],
  [-82.55, 27.35],
  [-82.6, 27.48],
  [-82.65, 27.6],
  // Tampa Bay
  [-82.6, 27.66],
  [-82.55, 27.7],
  [-82.48, 27.78],
  [-82.45, 27.85],
  [-82.5, 27.92],
  [-82.55, 27.95],
  [-82.63, 27.93],
  [-82.7, 27.9],
  [-82.73, 27.95],
  [-82.75, 28.0],
  // Nature Coast / Big Bend
  [-82.78, 28.08],
  [-82.8, 28.15],
  [-82.78, 28.3],
  [-82.75, 28.5],
  [-82.72, 28.62],
  [-82.7, 28.75],
  [-82.72, 28.88],
  [-82.75, 29.0],
  [-82.85, 29.08],
  [-83.0, 29.15],
  [-83.15, 29.3],
  [-83.28, 29.42],
  [-83.4, 29.5],
  [-83.5, 29.62],
  [-83.6, 29.75],
  [-83.8, 29.85],
  [-84.0, 29.9],
  [-84.15, 29.98],
  [-84.3, 30.05],
  [-84.4, 30.06],
  [-84.45, 30.05],
  [-84.6, 29.95],
  [-84.75, 29.87],
  [-84.9, 29.8],
  [-85.0, 29.72],
  // Panhandle
  [-85.2, 29.78],
  [-85.4, 29.85],
  [-85.55, 29.97],
  [-85.7, 30.1],
  [-85.95, 30.2],
  [-86.2, 30.3],
  [-86.4, 30.36],
  [-86.6, 30.4],
  [-86.9, 30.38],
  [-87.2, 30.35],
  [-87.35, 30.32],
  [-87.5, 30.3],
  [-87.55, 30.4],
  [-87.6, 30.5],
  [-87.6, 30.75],
];

/** Inselkette im Süden (reale Florida Keys). */
export const KEYS_CHAIN: readonly GeoPoint[] = [
  [-80.4, 25.33],
  [-80.5, 25.25],
  [-80.6, 25.18],
  [-80.75, 25.05],
  [-80.9, 24.9],
  [-81.0, 24.8],
  [-81.1, 24.72],
  [-81.25, 24.68],
  [-81.4, 24.65],
  [-81.6, 24.6],
  [-81.8, 24.55],
];

/** Großer Binnensee (reales Vorbild: Lake Okeechobee). */
export const INLAND_LAKE: readonly GeoPoint[] = [
  [-81.12, 27.12],
  [-80.98, 27.2],
  [-80.8, 27.21],
  [-80.66, 27.12],
  [-80.61, 26.98],
  [-80.67, 26.82],
  [-80.8, 26.73],
  [-80.98, 26.72],
  [-81.1, 26.82],
  [-81.14, 26.97],
];

/** Feuchtgebiet im Süden (reales Vorbild: Everglades). */
export const WETLANDS: readonly GeoPoint[] = [
  [-81.32, 25.42],
  [-81.15, 25.25],
  [-80.85, 25.3],
  [-80.55, 25.5],
  [-80.45, 25.95],
  [-80.55, 26.35],
  [-80.75, 26.6],
  [-81.05, 26.55],
  [-81.3, 26.2],
  [-81.42, 25.8],
];

/** Große Waldgebiete (reale Vorbilder: Nationalforste im Norden). */
export const FORESTS: readonly { id: string; points: readonly GeoPoint[] }[] = [
  {
    id: "nord",
    points: [
      [-82.15, 29.45],
      [-81.75, 29.5],
      [-81.6, 29.25],
      [-81.75, 28.95],
      [-82.05, 28.98],
      [-82.2, 29.2],
    ],
  },
  {
    id: "panhandle",
    points: [
      [-85.0, 30.5],
      [-84.4, 30.5],
      [-84.3, 30.15],
      [-84.75, 30.1],
      [-85.05, 30.25],
    ],
  },
  {
    id: "suedwest",
    points: [
      [-81.5, 26.35],
      [-81.15, 26.4],
      [-81.05, 26.1],
      [-81.35, 25.95],
      [-81.55, 26.1],
    ],
  },
];

/** Flüsse (reale Vorbilder). */
export const RIVERS: readonly { id: string; points: readonly GeoPoint[] }[] = [
  {
    id: "nordost",
    points: [
      [-80.9, 28.15],
      [-81.02, 28.6],
      [-81.3, 29.0],
      [-81.52, 29.42],
      [-81.58, 29.85],
      [-81.62, 30.2],
      [-81.45, 30.36],
    ],
  },
  {
    id: "nordwest",
    points: [
      [-83.15, 29.3],
      [-82.95, 29.6],
      [-82.85, 29.95],
      [-82.7, 30.35],
    ],
  },
  {
    id: "panhandle",
    points: [
      [-85.0, 29.75],
      [-84.98, 30.15],
      [-85.0, 30.5],
      [-85.0, 30.95],
    ],
  },
  {
    id: "sued",
    points: [
      [-82.0, 26.55],
      [-81.7, 26.7],
      [-81.35, 26.78],
      [-81.12, 26.85],
    ],
  },
  {
    id: "zentral",
    points: [
      [-81.1, 27.18],
      [-81.15, 27.6],
      [-81.25, 28.0],
      [-81.32, 28.3],
    ],
  },
];

/**
 * Verkehrsnetz. `rank` steuert die Darstellung: 1 sind die großen Achsen,
 * 2 nachgeordnete Verbindungen.
 */
export const HIGHWAYS: readonly {
  id: string;
  rank: 1 | 2;
  points: readonly GeoPoint[];
}[] = [
  {
    id: "ost",
    rank: 1,
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
    id: "west",
    rank: 1,
    points: [
      [-82.6, 30.2],
      [-82.4, 29.65],
      [-82.35, 28.9],
      [-82.45, 28.2],
      [-82.4, 27.5],
      [-81.9, 26.6],
      [-81.7, 26.15],
      [-81.2, 26.08],
      [-80.6, 26.1],
    ],
  },
  {
    id: "nord",
    rank: 1,
    points: [
      [-87.3, 30.52],
      [-86.0, 30.55],
      [-84.3, 30.48],
      [-82.6, 30.42],
      [-81.7, 30.36],
    ],
  },
  {
    id: "quer",
    rank: 1,
    points: [
      [-82.6, 27.95],
      [-82.0, 28.1],
      [-81.4, 28.4],
      [-81.2, 28.55],
      [-81.05, 29.15],
    ],
  },
  {
    id: "mautstrasse",
    rank: 2,
    points: [
      [-80.42, 25.6],
      [-80.62, 26.5],
      [-80.9, 27.3],
      [-81.2, 28.0],
      [-81.5, 28.5],
      [-82.05, 28.95],
    ],
  },
  {
    id: "golfkueste",
    rank: 2,
    points: [
      [-82.7, 28.15],
      [-82.6, 27.6],
      [-82.5, 27.1],
      [-82.1, 26.6],
      [-81.8, 26.2],
    ],
  },
  {
    id: "inselkette",
    rank: 2,
    points: KEYS_CHAIN,
  },
];

/**
 * Siedlungsflächen (reale Ballungsräume). Sie werden als weiche Flächen
 * dargestellt und bewusst nicht mit realen Städtenamen beschriftet – die
 * Beschriftung der Karte gehört den Leonida-Markern.
 */
export const URBAN_AREAS: readonly {
  id: string;
  center: GeoPoint;
  radius: number;
}[] = [
  { id: "suedost", center: [-80.25, 25.9], radius: 0.42 },
  { id: "west", center: [-82.5, 27.95], radius: 0.34 },
  { id: "zentral", center: [-81.38, 28.54], radius: 0.3 },
  { id: "nordost", center: [-81.66, 30.33], radius: 0.26 },
  { id: "suedwest", center: [-81.85, 26.6], radius: 0.2 },
  { id: "panhandle", center: [-84.28, 30.44], radius: 0.18 },
];

/**
 * Beschriftung realer Landschaftselemente. Bewusst nur Naturräume – so bleibt
 * die Karte kartografisch lesbar, ohne reale Städtenamen neben die
 * Leonida-Marker zu stellen.
 */
export const WATER_LABELS: readonly {
  id: string;
  at: GeoPoint;
  text: string;
  size: number;
}[] = [
  { id: "golf", at: [-85.6, 27.4], text: "Golf von Mexiko", size: 30 },
  { id: "atlantik", at: [-79.9, 28.6], text: "Atlantik", size: 26 },
];
