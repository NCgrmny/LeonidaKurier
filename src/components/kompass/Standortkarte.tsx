import { BaseMap, MAP_PALETTE, type MapCrop } from "./BaseMap";
import { MAP_VIEWBOX } from "@/content/geography";
import { precisionDefinition } from "@/lib/precision";
import { cx } from "@/lib/format";
import type { MapMarkerPosition } from "@/lib/types";

export interface Kartenpunkt {
  name: string;
  position: MapMarkerPosition;
}

/**
 * Standortkarte – der Kartenausschnitt als Bild.
 *
 * Eine Zeitung ohne Bildrechte hat trotzdem eine Grafikredaktion: Wo kein Foto
 * steht, steht eine Karte. Für den Leonida Kurier ist das die naheliegende
 * Bildsprache, weil die Karte das Thema selbst ist – der Bundesstaat wird
 * Stück für Stück verortet, und jeder Ausschnitt zeigt, wie weit das gediehen
 * ist. Gezeigt wird der reale Küstenverlauf, auf dem Leonida erkennbar beruht,
 * kein Spielmaterial.
 *
 * Der Ausschnitt ergibt sich aus den übergebenen Punkten. Ein Beitrag über
 * Vice City bekommt deshalb ein anderes Bild als einer über Vice City und die
 * Keys – ohne dass jemand ein Motiv auswählen müsste.
 *
 * Punkte ohne belegte Lage werden nicht verortet: Sie erweitern den Ausschnitt
 * nicht und tragen kein Fadenkreuz. Bleibt kein einziger belegter Punkt übrig,
 * steht der ganze Bundesstaat im Bild und die Karte sagt das auch.
 */
export function Standortkarte({
  punkte,
  zoom = 0.42,
  className,
  kompakt = false,
}: {
  punkte: Kartenpunkt[];
  /** Ausschnittbreite bei einem einzelnen Punkt, als Anteil der Gesamtkarte. */
  zoom?: number;
  className?: string;
  /** Ohne Fußzeile – für kleine Kartenflächen. */
  kompakt?: boolean;
}) {
  const belegte = punkte.filter(
    (punkt) => punkt.position.precision !== "platzhalter",
  );
  const unbelegt = belegte.length === 0;
  const crop = ausschnitt(belegte, zoom);
  const stufe = genaueste(belegte);

  return (
    <div
      className={cx("relative size-full overflow-hidden", className)}
      style={{ backgroundColor: MAP_PALETTE.waterDeep }}
    >
      <BaseMap crop={crop} />

      {unbelegt ? null : (
        <svg
          viewBox={`${crop.x} ${crop.y} ${crop.width} ${crop.height}`}
          preserveAspectRatio="xMidYMid slice"
          className="absolute inset-0 size-full"
          aria-hidden
        >
          {belegte.map((punkt, index) => (
            <Fadenkreuz
              key={punkt.name}
              x={punkt.position.x * MAP_VIEWBOX.width}
              y={punkt.position.y * MAP_VIEWBOX.height}
              spanne={crop.width}
              /* Nur der erste Punkt trägt das volle Kreuz; die übrigen bleiben
                 Nebenschauplätze und dürfen ihn nicht überstrahlen. */
              haupt={index === 0}
            />
          ))}
          {belegte.map((punkt) => (
            <Ortsschild
              key={`schild-${punkt.name}`}
              text={punkt.name}
              x={punkt.position.x * MAP_VIEWBOX.width}
              y={punkt.position.y * MAP_VIEWBOX.height}
              spanne={crop.width}
            />
          ))}
        </svg>
      )}

      {unbelegt ? (
        <Schild className="left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
          {punkte[0]?.name ?? "Leonida"}
        </Schild>
      ) : null}

      {/* Der Hinweis auf eine unbelegte Lage entfaellt nie – sonst stuende ein
          Ortsname ueber der Karte, ohne dass jemand sagt, dass er dort nicht
          verortet ist. Nur die zweite Zeile ist verzichtbar. */}
      {!kompakt || unbelegt ? (
        <div className="absolute inset-x-0 bottom-0 flex items-end justify-between gap-3 bg-gradient-to-t from-black/55 to-transparent p-2.5">
          <p className="font-mono text-[9px] uppercase leading-tight tracking-[0.12em] text-white/90">
            {unbelegt ? "Lage nicht belegt" : `Standortkarte · ${stufe.label}`}
          </p>
          {kompakt ? null : (
            <p className="text-right font-mono text-[9px] uppercase leading-tight tracking-[0.12em] text-white/70">
              Reale Küste · Spielkarte unveröffentlicht
            </p>
          )}
        </div>
      ) : null}
    </div>
  );
}

function Schild({
  children,
  className,
  style,
}: {
  children: React.ReactNode;
  className?: string;
  style?: React.CSSProperties;
}) {
  return (
    <p
      className={cx(
        "absolute whitespace-nowrap border px-1.5 py-0.5 font-mono text-[10px] font-bold uppercase tracking-[0.1em] shadow-sm",
        className,
      )}
      style={{
        borderColor: `${MAP_PALETTE.ink}40`,
        backgroundColor: "#fbf3e2f2",
        color: MAP_PALETTE.ink,
        ...style,
      }}
    >
      {children}
    </p>
  );
}

/**
 * Ortsschild im Kartenraum. Die Breite wird aus der Zeichenzahl geschaetzt –
 * Monospace macht das zuverlaessig genug, und ein SVG kann seinen Text nicht
 * messen.
 */
function Ortsschild({
  text,
  x,
  y,
  spanne,
}: {
  text: string;
  x: number;
  y: number;
  spanne: number;
}) {
  const schrift = spanne / 40;
  const breite = text.length * schrift * 0.62 + schrift * 1.1;
  const hoehe = schrift * 1.7;
  const oben = y + spanne / 15;

  return (
    <g>
      <rect
        x={x - breite / 2}
        y={oben}
        width={breite}
        height={hoehe}
        fill="#fbf3e2"
        fillOpacity={0.95}
        stroke={MAP_PALETTE.ink}
        strokeOpacity={0.28}
        strokeWidth={spanne / 500}
      />
      <text
        x={x}
        y={oben + hoehe * 0.71}
        textAnchor="middle"
        fill={MAP_PALETTE.ink}
        fontSize={schrift}
        fontFamily="var(--font-mono), ui-monospace, monospace"
        fontWeight={700}
        letterSpacing={schrift * 0.08}
        style={{ textTransform: "uppercase" }}
      >
        {text.toUpperCase()}
      </text>
    </g>
  );
}

/** Fadenkreuz mit hellem Unterzug – liest sich über Land wie über Wasser. */
function Fadenkreuz({
  x,
  y,
  spanne,
  haupt,
}: {
  x: number;
  y: number;
  spanne: number;
  haupt: boolean;
}) {
  const r = spanne / (haupt ? 22 : 40);
  const arm = spanne / (haupt ? 12 : 22);
  const luecke = spanne / (haupt ? 26 : 48);
  const kreuz = `M${x - arm} ${y} h${arm - luecke} M${x + luecke} ${y} h${arm - luecke} M${x} ${y - arm} v${arm - luecke} M${x} ${y + luecke} v${arm - luecke}`;

  return (
    <>
      <g stroke={MAP_PALETTE.coast} strokeWidth={spanne / 150} strokeOpacity={0.75} fill="none">
        <circle cx={x} cy={y} r={r} />
        <path d={kreuz} />
      </g>
      <g stroke="#e8452c" strokeWidth={spanne / 260} fill="none" opacity={haupt ? 1 : 0.8}>
        <circle cx={x} cy={y} r={r} />
        <path d={kreuz} />
      </g>
    </>
  );
}

/**
 * Ausschnitt um alle belegten Punkte. Ein Punkt ergibt einen nahen Ausschnitt,
 * mehrere einen so weiten, dass alle hineinpassen – daher stammt die
 * Verschiedenheit der Bilder.
 */
function ausschnitt(punkte: Kartenpunkt[], zoom: number): MapCrop {
  const voll: MapCrop = {
    x: 0,
    y: 0,
    width: MAP_VIEWBOX.width,
    height: MAP_VIEWBOX.height,
  };
  if (punkte.length === 0) return voll;

  const xs = punkte.map((punkt) => punkt.position.x * MAP_VIEWBOX.width);
  const ys = punkte.map((punkt) => punkt.position.y * MAP_VIEWBOX.height);
  const mitteX = (Math.min(...xs) + Math.max(...xs)) / 2;
  const mitteY = (Math.min(...ys) + Math.max(...ys)) / 2;

  // Der Ausschnitt muss die Spanne der Punkte fassen, mit Rand ringsum.
  const spanneX = (Math.max(...xs) - Math.min(...xs)) * 1.9;
  const spanneY = (Math.max(...ys) - Math.min(...ys)) * 1.9;
  const breite = Math.min(
    MAP_VIEWBOX.width,
    Math.max(MAP_VIEWBOX.width * zoom, spanneX, spanneY * (MAP_VIEWBOX.width / MAP_VIEWBOX.height)),
  );
  const hoehe = breite * (MAP_VIEWBOX.height / MAP_VIEWBOX.width);

  // Bewusst ohne Klemmung an den Kartenrand: Der Untergrund traegt dieselbe
  // Wasserfarbe wie das offene Meer, ein ueberstehender Ausschnitt faellt also
  // nicht auf. Ein aus der Mitte gerutschter Zielpunkt faellt auf.
  return {
    x: mitteX - breite / 2,
    y: mitteY - hoehe / 2,
    width: breite,
    height: hoehe,
  };
}

function genaueste(punkte: Kartenpunkt[]) {
  const hatGenau = punkte.some((punkt) => punkt.position.precision === "genau");
  return precisionDefinition(hatGenau ? "genau" : "grob");
}
