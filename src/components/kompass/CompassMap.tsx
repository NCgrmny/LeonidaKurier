"use client";

import Link from "next/link";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { statusDefinition } from "@/lib/status";
import { MAP_PRECISION, PRECISION_ORDER, precisionDefinition } from "@/lib/precision";
import { cx } from "@/lib/format";
import { entityHref } from "@/lib/content/collections";
import { MAINLAND, MAP_VIEWBOX, toSmoothPath } from "@/content/geography";
import type { MapLayerId, MapMarker } from "@/lib/types";
import { BaseMap, MapFurniture } from "./BaseMap";

export interface MapLayerDefinition {
  id: MapLayerId;
  label: string;
  /** Signaturform, mit der Marker dieser Ebene gezeichnet werden. */
  shape: "kreis" | "raute" | "quadrat" | "dreieck" | "stern";
}

/**
 * Ebenen des Kompass. Jede Ebene hat eine eigene Signaturform, damit
 * Kategorien auch ohne Farbe unterscheidbar bleiben.
 */
export const MAP_LAYERS: MapLayerDefinition[] = [
  { id: "orte", label: "Orte", shape: "kreis" },
  { id: "regionen", label: "Regionen", shape: "raute" },
  { id: "geschaefte", label: "Geschäfte", shape: "quadrat" },
  { id: "geheimnisse", label: "Geheimnisse", shape: "dreieck" },
  { id: "community", label: "Community", shape: "stern" },
];

const SHAPE_BY_LAYER = new Map(MAP_LAYERS.map((layer) => [layer.id, layer.shape]));

const MIN_SCALE = 1;
const MAX_SCALE = 7;
const PAN_STEP = 56;

interface Transform {
  scale: number;
  x: number;
  y: number;
}

/** Piktogramm je Kategorie – innerhalb des Pins gezeichnet. */
function LayerGlyph({ shape }: { shape: MapLayerDefinition["shape"] }) {
  switch (shape) {
    case "raute":
      return <path d="M12 5.5 L18.5 12 L12 18.5 L5.5 12 Z" />;
    case "quadrat":
      return <path d="M6.5 8 h11 v9 h-11 Z M9 8 V6 h6 v2" />;
    case "dreieck":
      return <path d="M12 5.5 L18.5 17.5 H5.5 Z" />;
    case "stern":
      return (
        <path d="M12 4.5 L14 10 L19.8 10.3 L15.3 13.9 L16.8 19.5 L12 16.4 L7.2 19.5 L8.7 13.9 L4.2 10.3 L10 10 Z" />
      );
    default:
      // Ortssignatur: Haeuserzeile
      return <path d="M5.5 17.5 V11 l3.2 -2.4 V17.5 Z M9.6 17.5 V8.2 l3.4 -2.6 V17.5 Z M13.8 17.5 V10.4 l3.4 2.2 V17.5 Z" />;
  }
}

/**
 * Kartenpin: runder Kopf mit Piktogramm, heller Fassung und Spitze nach unten.
 * Unbelegte Eintraege bekommen eine gestrichelte, ungefuellte Fassung.
 */
function MarkerPin({
  shape,
  color,
  hollow,
  size = 34,
}: {
  shape: MapLayerDefinition["shape"];
  color: string;
  hollow: boolean;
  size?: number;
}) {
  return (
    <svg width={size} height={size * 1.24} viewBox="0 0 34 42" aria-hidden>
      {!hollow ? (
        <ellipse cx="17" cy="39.4" rx="6.5" ry="2.1" fill="#0b2027" opacity="0.28" />
      ) : null}
      <path
        d="M17 37.5 L12.4 28.5 h9.2 Z"
        fill={hollow ? "#fbf3e2" : color}
        stroke={hollow ? color : "none"}
        strokeWidth={hollow ? 1.6 : 0}
        strokeDasharray={hollow ? "2.5 2" : undefined}
      />
      <circle
        cx="17"
        cy="16"
        r="14.2"
        fill="#fbf3e2"
        stroke={hollow ? color : "#122b33"}
        strokeOpacity={hollow ? 1 : 0.28}
        strokeWidth={hollow ? 2 : 1.4}
        strokeDasharray={hollow ? "3.5 2.6" : undefined}
      />
      <circle cx="17" cy="16" r="11.4" fill={hollow ? "none" : color} />
      <g
        transform="translate(5 4) scale(1)"
        fill={hollow ? color : "#fbf3e2"}
        fillOpacity={hollow ? 0.7 : 1}
      >
        <LayerGlyph shape={shape} />
      </g>
    </svg>
  );
}

/** Kompaktes Piktogramm für Legende und Filterchips. */
function LayerIcon({
  shape,
  color,
  size = 14,
}: {
  shape: MapLayerDefinition["shape"];
  color: string;
  size?: number;
}) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" aria-hidden fill={color}>
      <LayerGlyph shape={shape} />
    </svg>
  );
}

/**
 * Leonida Kompass – das Entdeckungswerkzeug der Plattform.
 *
 * Die Karte steht im Mittelpunkt: Suche, Filter und Ebenen liegen als kompakte
 * Bedienelemente über der Fläche, die Auswahl erscheint auf dem Desktop als
 * Seitenpanel und auf dem Smartphone als Bottom Sheet.
 *
 * Grundlage ist eine redaktionelle Rekonstruktion auf Basis der realen
 * Geografie – keine offizielle Karte. Verortet wird nur, wo ein reales Vorbild
 * nachvollziehbar ist; alles Übrige bleibt sichtbar getrennt.
 */
export function CompassMap({
  markers,
  initialMarkerSlug,
}: {
  markers: MapMarker[];
  initialMarkerSlug?: string;
}) {
  const [transform, setTransform] = useState<Transform>({ scale: 1, x: 0, y: 0 });
  const [activeLayers, setActiveLayers] = useState<MapLayerId[]>([
    "orte",
    "regionen",
    "geschaefte",
    "geheimnisse",
    "community",
  ]);
  const [query, setQuery] = useState("");
  const [showUnplaced, setShowUnplaced] = useState(false);
  const [legendOpen, setLegendOpen] = useState(false);
  const [sheetOpen, setSheetOpen] = useState(false);
  const [selectedSlug, setSelectedSlug] = useState<string | null>(
    initialMarkerSlug ?? null,
  );
  const [isDragging, setIsDragging] = useState(false);
  const [box, setBox] = useState({ width: 0, height: 0 });
  const viewportRef = useRef<HTMLDivElement>(null);
  const dragState = useRef<{ pointerId: number; startX: number; startY: number } | null>(
    null,
  );

  // Sichtfenster vermessen: Die Kartenfläche behält ihr Seitenverhältnis, sonst
  // würde die Geografie gestreckt. Sie wird vollständig eingepasst, damit beim
  // Öffnen die ganze Region sichtbar ist; ringsum liegt offenes Wasser.
  useEffect(() => {
    const element = viewportRef.current;
    if (!element) return;
    const observer = new ResizeObserver(([entry]) => {
      const { width, height } = entry.contentRect;
      setBox({ width, height });
    });
    observer.observe(element);
    return () => observer.disconnect();
  }, []);

  const canvas = useMemo(() => {
    const aspect = MAP_VIEWBOX.width / MAP_VIEWBOX.height;
    if (box.width === 0 || box.height === 0) return { width: 0, height: 0 };
    return box.width / box.height > aspect
      ? { width: box.height * aspect, height: box.height }
      : { width: box.width, height: box.width / aspect };
  }, [box]);

  const matches = useMemo(() => {
    const needle = query.trim().toLowerCase();
    return markers.filter((marker) => {
      if (!activeLayers.includes(marker.layer)) return false;
      if (!needle) return true;
      return (
        marker.title.toLowerCase().includes(needle) ||
        marker.summary.toLowerCase().includes(needle)
      );
    });
  }, [markers, activeLayers, query]);

  const placed = useMemo(
    () => matches.filter((marker) => marker.position.precision !== "platzhalter"),
    [matches],
  );
  const unplaced = useMemo(
    () => matches.filter((marker) => marker.position.precision === "platzhalter"),
    [matches],
  );

  const selected = useMemo(
    () => markers.find((marker) => marker.slug === selectedSlug) ?? null,
    [markers, selectedSlug],
  );

  const clamp = useCallback((next: Transform): Transform => {
    const scale = Math.min(MAX_SCALE, Math.max(MIN_SCALE, next.scale));
    const box = viewportRef.current?.getBoundingClientRect();
    const limitX = box ? (box.width * (scale - 1)) / 2 : 0;
    const limitY = box ? (box.height * (scale - 1)) / 2 : 0;
    return {
      scale,
      x: Math.min(limitX, Math.max(-limitX, next.x)),
      y: Math.min(limitY, Math.max(-limitY, next.y)),
    };
  }, []);

  const zoomBy = useCallback(
    (factor: number) =>
      setTransform((current) => clamp({ ...current, scale: current.scale * factor })),
    [clamp],
  );

  const panBy = useCallback(
    (dx: number, dy: number) =>
      setTransform((current) => clamp({ ...current, x: current.x + dx, y: current.y + dy })),
    [clamp],
  );

  const select = (slug: string) => {
    setSelectedSlug(slug);
    setSheetOpen(true);
  };

  const onPointerDown = (event: React.PointerEvent<HTMLDivElement>) => {
    if (event.button !== 0) return;
    dragState.current = {
      pointerId: event.pointerId,
      startX: event.clientX - transform.x,
      startY: event.clientY - transform.y,
    };
    setIsDragging(true);
    event.currentTarget.setPointerCapture(event.pointerId);
  };

  const onPointerMove = (event: React.PointerEvent<HTMLDivElement>) => {
    const drag = dragState.current;
    if (!drag || drag.pointerId !== event.pointerId) return;
    setTransform((current) =>
      clamp({ ...current, x: event.clientX - drag.startX, y: event.clientY - drag.startY }),
    );
  };

  const endDrag = (event: React.PointerEvent<HTMLDivElement>) => {
    if (dragState.current?.pointerId === event.pointerId) {
      dragState.current = null;
      setIsDragging(false);
    }
  };

  const onKeyDown = (event: React.KeyboardEvent<HTMLDivElement>) => {
    const actions: Record<string, () => void> = {
      ArrowUp: () => panBy(0, PAN_STEP),
      ArrowDown: () => panBy(0, -PAN_STEP),
      ArrowLeft: () => panBy(PAN_STEP, 0),
      ArrowRight: () => panBy(-PAN_STEP, 0),
      "+": () => zoomBy(1.3),
      "-": () => zoomBy(0.78),
      "0": () => setTransform({ scale: 1, x: 0, y: 0 }),
    };
    const action = actions[event.key];
    if (action) {
      event.preventDefault();
      action();
    }
  };

  const toggleLayer = (id: MapLayerId) =>
    setActiveLayers((current) =>
      current.includes(id) ? current.filter((entry) => entry !== id) : [...current, id],
    );

  const onMap = showUnplaced ? [...placed, ...unplaced] : placed;
  const regionsOn = activeLayers.includes("regionen");

  return (
    <div className="grid lg:grid-cols-[minmax(0,1fr)_21rem]">
      {/* ============================ Kartenfläche ============================ */}
      <div className="relative bg-[#0d6b7d]">
        <div
          ref={viewportRef}
          role="application"
          aria-label="Interaktive Karte. Verschieben mit den Pfeiltasten, Zoom mit Plus und Minus, Zurücksetzen mit Null."
          tabIndex={0}
          onPointerDown={onPointerDown}
          onPointerMove={onPointerMove}
          onPointerUp={endDrag}
          onPointerCancel={endDrag}
          onKeyDown={onKeyDown}
          className="relative h-[calc(100dvh-9.5rem)] w-full cursor-grab touch-none select-none overflow-hidden active:cursor-grabbing lg:h-[calc(100vh-6.5rem)]"
        >
          <div
            className="absolute left-1/2 top-1/2 origin-center"
            style={{
              width: canvas.width || "100%",
              height: canvas.height || "100%",
              transform: `translate(-50%, -50%) translate(${transform.x}px, ${transform.y}px) scale(${transform.scale})`,
              transition: isDragging ? "none" : "transform 200ms ease-out",
            }}
          >
            <BaseMap />

            {/* Region Leonida: der Bundesstaat umfasst die gesamte Landmasse. */}
            {regionsOn ? (
              <svg
                viewBox={`0 0 ${MAP_VIEWBOX.width} ${MAP_VIEWBOX.height}`}
                preserveAspectRatio="none"
                className="pointer-events-none absolute inset-0 size-full"
                aria-hidden
              >
                <path
                  d={toSmoothPath(MAINLAND, true, 0.32)}
                  fill="#e4573d"
                  fillOpacity="0.07"
                  stroke="#c8412a"
                  strokeOpacity="0.5"
                  strokeWidth="2.5"
                  strokeDasharray="9 6"
                />
              </svg>
            ) : null}

            {onMap.map((marker) => {
              const definition = statusDefinition(marker.status);
              const isSelected = marker.slug === selectedSlug;
              const isUnplaced = marker.position.precision === "platzhalter";
              return (
                <button
                  key={marker.id}
                  type="button"
                  onClick={() => select(marker.slug)}
                  onPointerDown={(event) => event.stopPropagation()}
                  aria-pressed={isSelected}
                  className="group absolute flex -translate-x-1/2 -translate-y-full flex-col items-center"
                  style={{
                    left: `${marker.position.x * 100}%`,
                    top: `${marker.position.y * 100}%`,
                    scale: `${1 / transform.scale}`,
                  }}
                >
                  {/* Der Pin sitzt mit seiner Spitze auf der Position. */}
                  <span
                    className={cx(
                      "block origin-bottom transition-transform group-hover:scale-110",
                      isSelected && "scale-[1.18]",
                    )}
                    style={{ marginBottom: "-2px" }}
                  >
                    <MarkerPin
                      shape={SHAPE_BY_LAYER.get(marker.layer) ?? "kreis"}
                      color={definition.accent}
                      hollow={isUnplaced}
                      size={isSelected ? 38 : 32}
                    />
                  </span>
                  <span
                    className={cx(
                      "pointer-events-none absolute left-1/2 top-full w-max max-w-[11rem] -translate-x-1/2 whitespace-nowrap border px-1.5 py-0.5 font-mono text-[10px] font-bold uppercase tracking-[0.1em] shadow-sm",
                      isSelected
                        ? "border-coral-500 bg-coral-500 text-paper-50"
                        : "border-[#122b33]/25 bg-[#fbf3e2]/95 text-[#122b33]",
                      isUnplaced && "font-normal italic",
                    )}
                  >
                    {marker.title}
                  </span>
                </button>
              );
            })}
          </div>

          <MapFurniture scale={transform.scale} />
        </div>

        {/* --- Werkzeugleiste über der Karte --- */}
        <div className="pointer-events-none absolute inset-x-0 top-0 p-3">
          <div className="pointer-events-auto flex flex-wrap items-center gap-2">
            <label className="relative flex min-w-0 flex-1 items-center sm:max-w-xs">
              <span className="sr-only">Marker durchsuchen</span>
              <svg
                aria-hidden
                viewBox="0 0 24 24"
                className="pointer-events-none absolute left-2.5 size-4 text-ink-500"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
              >
                <circle cx="11" cy="11" r="7" />
                <path d="M20 20 L16 16" strokeLinecap="round" />
              </svg>
              <input
                type="search"
                value={query}
                onChange={(event) => setQuery(event.target.value)}
                placeholder="Ort, Region, Fundstück …"
                className="w-full border border-ink-900/20 bg-[#fdf4e2]/95 py-2 pl-8 pr-3 text-[13px] text-ink-900 shadow-sm outline-none placeholder:text-ink-400 focus:border-coral-500"
              />
            </label>

            <button
              type="button"
              onClick={() => setLegendOpen((value) => !value)}
              aria-expanded={legendOpen}
              className="shrink-0 border border-ink-900/20 bg-[#fdf4e2]/95 px-3 py-2 font-mono text-[10px] font-bold uppercase tracking-[0.14em] text-ink-800 shadow-sm hover:bg-[#fdf4e2]"
            >
              Legende
            </button>
          </div>

          {/* Ebenenfilter als Chips */}
          <ul className="pointer-events-auto mt-2 flex flex-wrap gap-1.5">
            {MAP_LAYERS.map((layer) => {
              const count = markers.filter((marker) => marker.layer === layer.id).length;
              const active = activeLayers.includes(layer.id);
              return (
                <li key={layer.id}>
                  <button
                    type="button"
                    onClick={() => toggleLayer(layer.id)}
                    aria-pressed={active}
                    disabled={count === 0}
                    className={cx(
                      "flex items-center gap-1.5 border px-2.5 py-1.5 font-mono text-[10px] font-bold uppercase tracking-[0.12em] shadow-sm transition-colors",
                      active
                        ? "border-ink-900 bg-ink-900 text-paper-100"
                        : "border-ink-900/20 bg-[#fdf4e2]/95 text-ink-700 hover:border-ink-900/45",
                      count === 0 && "cursor-not-allowed opacity-45",
                    )}
                  >
                    <LayerIcon shape={layer.shape} color={active ? "#f8f2e6" : "#5c5241"} size={12} />
                    {layer.label}
                    <span className="opacity-60">{count}</span>
                  </button>
                </li>
              );
            })}
          </ul>

          {legendOpen ? (
            <div className="pointer-events-auto mt-2 max-w-md border border-ink-900/20 bg-[#fdf4e2]/97 p-4 shadow-lg">
              <p className="ressort inline-block">Zur Karte</p>
              <p className="mt-3 font-serif text-[13px] leading-relaxed text-ink-700">
                <strong className="font-bold">Redaktionelle Rekonstruktion.</strong> Die
                Spielkarte von GTA VI ist unveröffentlicht. Diese Karte ist eine
                eigenständige Darstellung auf Basis der realen Geografie der Küstenregion
                – keine offizielle Karte und kein Spielmaterial.
              </p>
              <p className="mt-2 font-serif text-[13px] leading-relaxed text-ink-700">
                Verortet wird nur, wo ein reales Vorbild nachvollziehbar ist. Einträge ohne
                belegbare Lage stehen getrennt und werden nicht auf der Fläche platziert.
              </p>
              <dl className="mt-4 grid gap-2">
                {MAP_LAYERS.map((layer) => (
                  <div key={layer.id} className="flex items-center gap-2">
                    <LayerIcon shape={layer.shape} color="#5c5241" size={14} />
                    <dt className="font-mono text-[10px] font-bold uppercase tracking-[0.12em] text-ink-800">
                      {layer.label}
                    </dt>
                  </div>
                ))}
              </dl>

              {/* Genauigkeit wird pro Marker ausgewiesen – hier steht, was die
                  drei Stufen bedeuten. */}
              <p className="ressort mt-5 inline-block">Genauigkeit</p>
              <dl className="mt-3 grid gap-2.5">
                {PRECISION_ORDER.map((id) => {
                  const stufe = MAP_PRECISION[id];
                  return (
                    <div key={id} className="flex gap-2">
                      <span
                        aria-hidden
                        className="mt-1 size-2.5 shrink-0 rounded-full ring-1 ring-inset ring-black/20"
                        style={{ backgroundColor: stufe.accent }}
                      />
                      <div>
                        <dt className="font-mono text-[10px] font-bold uppercase tracking-[0.12em] text-ink-800">
                          {stufe.label}
                        </dt>
                        <dd className="font-serif text-[12px] leading-snug text-ink-600">
                          {stufe.definition}
                        </dd>
                      </div>
                    </div>
                  );
                })}
              </dl>
              <button
                type="button"
                onClick={() => setLegendOpen(false)}
                className="mt-4 font-mono text-[10px] font-bold uppercase tracking-[0.14em] text-coral-600"
              >
                Schließen
              </button>
            </div>
          ) : null}
        </div>

        {/* --- Zoomsteuerung --- */}
        <div className="absolute bottom-24 right-3 flex flex-col gap-1 lg:bottom-20">
          <MapButton label="Vergrößern" onClick={() => zoomBy(1.35)}>
            +
          </MapButton>
          <MapButton label="Verkleinern" onClick={() => zoomBy(0.74)}>
            −
          </MapButton>
          <MapButton
            label="Ansicht zurücksetzen"
            onClick={() => setTransform({ scale: 1, x: 0, y: 0 })}
          >
            ⟲
          </MapButton>
        </div>

        {/* --- Bottom Sheet (nur mobil) --- */}
        <div className="absolute inset-x-0 bottom-0 lg:hidden">
          <div className="border-t-2 border-ink-900 bg-paper-100 shadow-[0_-8px_24px_rgba(0,0,0,0.25)]">
            <button
              type="button"
              onClick={() => setSheetOpen((value) => !value)}
              aria-expanded={sheetOpen}
              className="flex w-full items-center justify-between gap-3 px-4 py-3"
            >
              <span className="flex min-w-0 items-center gap-2">
                {selected ? (
                  <>
                    <LayerIcon shape={SHAPE_BY_LAYER.get(selected.layer) ?? "kreis"} color={statusDefinition(selected.status).accent} size={16} />
                    <span className="subhead truncate text-[17px]">{selected.title}</span>
                  </>
                ) : (
                  <span className="font-mono text-[11px] font-bold uppercase tracking-[0.16em]">
                    {matches.length} Marker
                  </span>
                )}
              </span>
              <span aria-hidden className="meta shrink-0">
                {sheetOpen ? "Schließen ▾" : "Öffnen ▴"}
              </span>
            </button>

            {sheetOpen ? (
              <div className="max-h-[42vh] overflow-y-auto border-t border-ink-900/15 px-4 pb-5 pt-4">
                {selected ? (
                  <SelectionDetail
                    marker={selected}
                    onClear={() => {
                      setSelectedSlug(null);
                      setSheetOpen(false);
                    }}
                  />
                ) : (
                  <MarkerList
                    placed={placed}
                    unplaced={unplaced}
                    onSelect={select}
                    showUnplaced={showUnplaced}
                    onToggleUnplaced={setShowUnplaced}
                  />
                )}
              </div>
            ) : null}
          </div>
        </div>
      </div>

      {/* ============================ Seitenpanel ============================ */}
      <aside className="hidden border-l-2 border-ink-900 bg-paper-100 lg:block lg:h-[calc(100vh-6.5rem)] lg:overflow-y-auto">
        <div className="p-5">
          {selected ? (
            <SelectionDetail marker={selected} onClear={() => setSelectedSlug(null)} />
          ) : (
            <MarkerList
              placed={placed}
              unplaced={unplaced}
              onSelect={select}
              showUnplaced={showUnplaced}
              onToggleUnplaced={setShowUnplaced}
            />
          )}
        </div>
      </aside>
    </div>
  );
}

function MarkerList({
  placed,
  unplaced,
  onSelect,
  showUnplaced,
  onToggleUnplaced,
}: {
  placed: MapMarker[];
  unplaced: MapMarker[];
  onSelect: (slug: string) => void;
  showUnplaced: boolean;
  onToggleUnplaced: (value: boolean) => void;
}) {
  return (
    <>
      <p className="ressort">Verortet ({placed.length})</p>
      <ul className="mt-3 grid">
        {placed.map((marker) => (
          <li key={marker.id}>
            <button
              type="button"
              onClick={() => onSelect(marker.slug)}
              className="flex w-full items-center gap-2.5 border-b border-ink-900/10 py-2.5 text-left transition-colors hover:bg-paper-200"
            >
              <LayerIcon shape={SHAPE_BY_LAYER.get(marker.layer) ?? "kreis"} color={statusDefinition(marker.status).accent} size={15} />
              <span className="min-w-0 flex-1">
                <span className="block truncate font-serif text-[15px] text-ink-900">
                  {marker.title}
                </span>
                <span className="meta">{statusDefinition(marker.status).label}</span>
              </span>
            </button>
          </li>
        ))}
        {placed.length === 0 ? (
          <li className="border border-dashed border-ink-900/25 px-3 py-5 text-center font-serif text-[13px] text-ink-500">
            Keine Treffer in den aktiven Ebenen.
          </li>
        ) : null}
      </ul>

      {unplaced.length > 0 ? (
        <div className="mt-7">
          <p className="ressort">Ohne belegte Position ({unplaced.length})</p>
          <p className="mt-2.5 font-serif text-[12px] leading-snug text-ink-500">
            Offiziell benannt, aber nicht verortbar. Diese Einträge werden nicht auf der
            Fläche platziert, solange ihre Lage nicht belegt ist.
          </p>
          <ul className="mt-3 grid">
            {unplaced.map((marker) => (
              <li key={marker.id}>
                <button
                  type="button"
                  onClick={() => onSelect(marker.slug)}
                  className="flex w-full items-center gap-2.5 border-b border-ink-900/10 py-2.5 text-left transition-colors hover:bg-paper-200"
                >
                  <LayerIcon shape={SHAPE_BY_LAYER.get(marker.layer) ?? "kreis"} color={statusDefinition(marker.status).accent} size={15} />
                  <span className="font-serif text-[15px] italic text-ink-700">
                    {marker.title}
                  </span>
                </button>
              </li>
            ))}
          </ul>
          <label className="mt-3 flex cursor-pointer items-start gap-2.5">
            <input
              type="checkbox"
              checked={showUnplaced}
              onChange={(event) => onToggleUnplaced(event.target.checked)}
              className="mt-0.5 size-3.5 accent-[var(--color-coral-500)]"
            />
            <span className="font-serif text-[12px] leading-snug text-ink-600">
              Trotzdem auf der Karte einblenden – gestrichelt, ohne Aussagewert
            </span>
          </label>
        </div>
      ) : null}
    </>
  );
}

function SelectionDetail({ marker, onClear }: { marker: MapMarker; onClear: () => void }) {
  const definition = statusDefinition(marker.status);
  return (
    <div>
      <div className="flex items-center gap-2.5">
        <LayerIcon shape={SHAPE_BY_LAYER.get(marker.layer) ?? "kreis"} color={definition.accent} size={20} />
        <span className="font-mono text-[10px] font-bold uppercase tracking-[0.16em] text-ink-700">
          {definition.label}
        </span>
      </div>

      <h3 className="headline mt-3 text-[1.7rem]">{marker.title}</h3>
      <p className="standfirst mt-2 text-[14px]">{marker.summary}</p>

      <div className="mt-4 border-y border-ink-900/15 py-3">
        <p className="flex items-center gap-2 font-mono text-[10px] font-bold uppercase tracking-[0.16em] text-ink-800">
          <span
            aria-hidden
            className="size-2 shrink-0 rounded-full ring-1 ring-inset ring-black/20"
            style={{ backgroundColor: precisionDefinition(marker.position.precision).accent }}
          />
          Genauigkeit: {precisionDefinition(marker.position.precision).label}
        </p>
        <p className="mt-1.5 font-serif text-[12px] leading-snug text-ink-600">
          {marker.position.note ??
            precisionDefinition(marker.position.precision).definition}
        </p>
      </div>

      {marker.target ? (
        <Link
          href={entityHref(marker.target.type, marker.target.slug)}
          className="mt-4 inline-flex items-center gap-2 bg-night-900 px-4 py-2.5 font-mono text-[10px] font-bold uppercase tracking-[0.18em] text-paper-100 transition-colors hover:bg-lagoon-700"
        >
          Zum Datenbankeintrag →
        </Link>
      ) : null}

      <button
        type="button"
        onClick={onClear}
        className="mt-4 block font-mono text-[10px] font-bold uppercase tracking-[0.14em] text-coral-600 hover:underline"
      >
        ← Zur Übersicht
      </button>
    </div>
  );
}

function MapButton({
  children,
  label,
  onClick,
}: {
  children: React.ReactNode;
  label: string;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-label={label}
      className="grid size-9 place-items-center border border-ink-900/20 bg-[#fdf4e2]/95 text-[15px] text-ink-800 shadow-sm transition-colors hover:bg-[#fdf4e2] hover:text-coral-600"
    >
      <span aria-hidden>{children}</span>
    </button>
  );
}
