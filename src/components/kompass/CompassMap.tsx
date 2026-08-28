"use client";

import Link from "next/link";
import { useCallback, useMemo, useRef, useState } from "react";
import { statusDefinition } from "@/lib/status";
import { cx } from "@/lib/format";
import { entityHref } from "@/lib/content/collections";
import { MAP_VIEWBOX } from "@/content/geography";
import type { MapLayerId, MapMarker } from "@/lib/types";
import { StatusBadge } from "@/components/ui/StatusBadge";
import { BaseMap, MapFurniture } from "./BaseMap";

export interface MapLayerDefinition {
  id: MapLayerId;
  label: string;
  description: string;
}

/**
 * Ebenen des Kompass. Die Struktur ist auf Wachstum ausgelegt: Fahrzeug-Spawns,
 * Missionen, Immobilien und Community-Marker werden später als weitere Ebenen
 * ergänzt, ohne dass die Kartenmechanik angefasst werden muss.
 */
export const MAP_LAYERS: MapLayerDefinition[] = [
  { id: "orte", label: "Orte", description: "Städte, Gebiete und Landmarken." },
  { id: "regionen", label: "Regionen", description: "Räumliche Gliederung." },
  { id: "geschaefte", label: "Geschäfte", description: "Läden und Betriebe." },
  { id: "geheimnisse", label: "Geheimnisse", description: "Fundstücke und Easter Eggs." },
  { id: "community", label: "Community", description: "Eingereichte Marker (in Vorbereitung)." },
];

const MIN_SCALE = 1;
const MAX_SCALE = 6;
const PAN_STEP = 48;

interface Transform {
  scale: number;
  x: number;
  y: number;
}

/**
 * Interaktive Kartenfläche des Leonida Kompass.
 *
 * Bewusst ohne Kartenbibliothek und ohne fremde Kartenassets: Die Grundkarte
 * ist die reale Küstenlinie Floridas (siehe `src/content/geography.ts`), auf
 * die Leonida erkennbar zurückgeht. Verortet wird nur, wo ein reales Vorbild
 * nachvollziehbar ist; alles Übrige liegt sichtbar getrennt im Bereich „ohne
 * belegte Position“, statt eine Position zu behaupten.
 */
export function CompassMap({
  markers,
  initialMarkerSlug,
}: {
  markers: MapMarker[];
  initialMarkerSlug?: string;
}) {
  const [transform, setTransform] = useState<Transform>({ scale: 1, x: 0, y: 0 });
  const [activeLayers, setActiveLayers] = useState<MapLayerId[]>(["orte", "regionen"]);
  const [showUnplaced, setShowUnplaced] = useState(false);
  const [selectedSlug, setSelectedSlug] = useState<string | null>(
    initialMarkerSlug ?? null,
  );
  const [isDragging, setIsDragging] = useState(false);
  const viewportRef = useRef<HTMLDivElement>(null);
  const dragState = useRef<{ pointerId: number; startX: number; startY: number } | null>(
    null,
  );

  const visibleMarkers = useMemo(
    () => markers.filter((marker) => activeLayers.includes(marker.layer)),
    [markers, activeLayers],
  );

  /** Verortet: Position beruht auf einem nachvollziehbaren Vorbild. */
  const placed = useMemo(
    () => visibleMarkers.filter((marker) => marker.position.precision !== "platzhalter"),
    [visibleMarkers],
  );

  /** Unbelegt: keine Position behauptet – gesondert ausgewiesen. */
  const unplaced = useMemo(
    () => visibleMarkers.filter((marker) => marker.position.precision === "platzhalter"),
    [visibleMarkers],
  );

  const selected = useMemo(
    () => markers.find((marker) => marker.slug === selectedSlug) ?? null,
    [markers, selectedSlug],
  );

  const clamp = useCallback((next: Transform): Transform => {
    const scale = Math.min(MAX_SCALE, Math.max(MIN_SCALE, next.scale));
    const box = viewportRef.current?.getBoundingClientRect();
    // Verschiebung so begrenzen, dass die Karte das Sichtfenster stets füllt.
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
      "+": () => zoomBy(1.25),
      "-": () => zoomBy(0.8),
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

  const onMapMarkers = showUnplaced ? [...placed, ...unplaced] : placed;

  return (
    <div className="grid gap-4 lg:grid-cols-[minmax(0,1fr)_20rem]">
      <div className="relative overflow-hidden rounded-2xl border border-lagoon-400/25 bg-[#0d6b7d]">
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
          // Seitenverhältnis der Grundkarte, damit Marker exakt auf der
          // Geometrie sitzen und nichts beschnitten wird.
          style={{ aspectRatio: `${MAP_VIEWBOX.width} / ${MAP_VIEWBOX.height}` }}
          className="relative w-full cursor-grab touch-none select-none overflow-hidden active:cursor-grabbing"
        >
          <div
            className="absolute inset-0 origin-center"
            style={{
              transform: `translate(${transform.x}px, ${transform.y}px) scale(${transform.scale})`,
              transition: isDragging ? "none" : "transform 180ms ease-out",
            }}
          >
            <BaseMap />

            {onMapMarkers.map((marker) => {
              const definition = statusDefinition(marker.status);
              const isSelected = marker.slug === selectedSlug;
              const isUnplaced = marker.position.precision === "platzhalter";
              return (
                <button
                  key={marker.id}
                  type="button"
                  onClick={() => setSelectedSlug(marker.slug)}
                  // Ohne dies startet die Kartenflaeche einen Drag und faengt den
                  // Zeiger ab – der Klick auf den Marker ginge verloren.
                  onPointerDown={(event) => event.stopPropagation()}
                  aria-pressed={isSelected}
                  className="group absolute -translate-x-1/2 -translate-y-1/2"
                  style={{
                    left: `${marker.position.x * 100}%`,
                    top: `${marker.position.y * 100}%`,
                    // Marker behalten unabhängig vom Zoom ihre Größe.
                    scale: `${1 / transform.scale}`,
                  }}
                >
                  {/* Ortssignatur: Ring mit Kern, wie in gedruckten Karten. */}
                  <span
                    aria-hidden
                    className={cx(
                      "block rounded-full transition-transform group-hover:scale-125",
                      isUnplaced ? "size-3.5 border-2 border-dashed" : "size-3.5 border-2",
                      isSelected && "scale-125",
                    )}
                    style={{
                      borderColor: definition.accent,
                      backgroundColor: isUnplaced ? "rgba(253,244,226,0.75)" : "#123038",
                      boxShadow: isUnplaced
                        ? "none"
                        : `inset 0 0 0 2px ${definition.accent}, 0 0 0 3px rgba(253,244,226,0.95)`,
                    }}
                  />
                  {/* Kartenbeschriftung mit Freistellung statt Chip-Hintergrund. */}
                  <span
                    className={cx(
                      "pointer-events-none absolute left-1/2 top-4 w-max max-w-[11rem] -translate-x-1/2 text-center font-mono text-[10px] uppercase tracking-[0.14em] transition-colors",
                      isSelected ? "text-[#0b4f5e]" : "text-[#123038]",
                      isUnplaced && "text-[9px] italic",
                    )}
                    style={{
                      // Freistellung gegen den hellen Kartengrund.
                      textShadow:
                        "0 0 3px #fdf4e2, 0 0 3px #fdf4e2, 0 0 6px #fdf4e2, 0 1px 0 rgba(253,244,226,0.9)",
                    }}
                  >
                    {marker.title}
                    {isUnplaced ? " · unbelegt" : ""}
                  </span>
                </button>
              );
            })}
          </div>

          <MapFurniture scale={transform.scale} />
        </div>

        <div className="absolute right-3 top-3 flex flex-col gap-1.5">
          <MapButton label="Vergrößern" onClick={() => zoomBy(1.3)}>
            +
          </MapButton>
          <MapButton label="Verkleinern" onClick={() => zoomBy(0.77)}>
            −
          </MapButton>
          <MapButton
            label="Ansicht zurücksetzen"
            onClick={() => setTransform({ scale: 1, x: 0, y: 0 })}
          >
            ⟲
          </MapButton>
        </div>
      </div>

      <aside className="flex flex-col gap-4">
        <section className="rounded-xl border border-[var(--rule)] bg-ink-900/50 p-4">
          <h3 className="kicker mb-3">Ebenen</h3>
          <ul className="grid gap-1.5">
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
                      "flex w-full items-center justify-between gap-3 rounded-lg border px-3 py-2 text-left transition-colors",
                      active
                        ? "border-lagoon-400/40 bg-lagoon-500/10 text-paper-50"
                        : "border-[var(--rule)] text-paper-400 hover:text-paper-50",
                      count === 0 && "cursor-not-allowed opacity-45 hover:text-paper-400",
                    )}
                  >
                    <span className="text-sm">{layer.label}</span>
                    <span className="font-mono text-[10px] text-paper-500">{count}</span>
                  </button>
                </li>
              );
            })}
          </ul>
        </section>

        {unplaced.length > 0 ? (
          <section className="rounded-xl border border-[var(--rule)] bg-ink-900/50 p-4">
            <h3 className="kicker mb-2">Ohne belegte Position ({unplaced.length})</h3>
            <p className="mb-3 text-[11px] leading-relaxed text-paper-500">
              Offiziell benannt, aber nicht verortbar. Diese Einträge werden nicht auf der
              Karte platziert, solange ihre Lage nicht belegt ist.
            </p>
            <ul className="grid gap-1">
              {unplaced.map((marker) => (
                <li key={marker.id}>
                  <button
                    type="button"
                    onClick={() => setSelectedSlug(marker.slug)}
                    className="flex w-full items-center gap-2.5 rounded-lg px-2.5 py-2 text-left transition-colors hover:bg-ink-850"
                  >
                    <span
                      aria-hidden
                      className="size-2 shrink-0 rounded-full border border-dashed"
                      style={{ borderColor: statusDefinition(marker.status).accent }}
                    />
                    <span className="text-sm text-paper-200">{marker.title}</span>
                  </button>
                </li>
              ))}
            </ul>
            <label className="mt-3 flex cursor-pointer items-center gap-2.5 border-t border-[var(--rule)] pt-3">
              <input
                type="checkbox"
                checked={showUnplaced}
                onChange={(event) => setShowUnplaced(event.target.checked)}
                className="size-3.5 accent-[var(--color-lagoon-400)]"
              />
              <span className="text-[11px] leading-tight text-paper-400">
                Trotzdem auf der Karte einblenden (gestrichelt, ohne Aussagewert)
              </span>
            </label>
          </section>
        ) : null}

        <section className="flex-1 rounded-xl border border-[var(--rule)] bg-ink-900/50 p-4">
          <h3 className="kicker mb-3">
            {selected ? "Auswahl" : `Verortet (${placed.length})`}
          </h3>

          {selected ? (
            <div>
              <div className="flex flex-wrap items-center gap-2">
                <StatusBadge status={selected.status} size="sm" />
                <span className="font-mono text-[10px] uppercase tracking-[0.12em] text-paper-500">
                  Position: {selected.position.precision}
                </span>
              </div>
              <h4 className="headline mt-3 text-xl text-paper-50">{selected.title}</h4>
              <p className="mt-2 text-sm leading-relaxed text-paper-400">
                {selected.summary}
              </p>
              {selected.position.note ? (
                <p className="mt-3 border-l-2 border-sand-400/40 pl-3 text-xs leading-relaxed text-paper-500">
                  {selected.position.note}
                </p>
              ) : (
                <p className="mt-3 border-l-2 border-paper-400/25 pl-3 text-xs leading-relaxed text-paper-500">
                  Zur Lage dieses Eintrags liegt nichts Belegtes vor.
                </p>
              )}
              {selected.target ? (
                <Link
                  href={entityHref(selected.target.type, selected.target.slug)}
                  className="mt-4 inline-flex items-center gap-2 rounded-md border border-lagoon-400/35 bg-lagoon-500/10 px-3 py-2 font-mono text-[11px] uppercase tracking-[0.14em] text-lagoon-300 hover:bg-lagoon-500/20"
                >
                  Zum Datenbankeintrag →
                </Link>
              ) : null}
              <button
                type="button"
                onClick={() => setSelectedSlug(null)}
                className="mt-3 block font-mono text-[10px] uppercase tracking-[0.12em] text-paper-500 hover:text-paper-200"
              >
                Auswahl aufheben
              </button>
            </div>
          ) : (
            <ul className="grid gap-1">
              {placed.map((marker) => (
                <li key={marker.id}>
                  <button
                    type="button"
                    onClick={() => setSelectedSlug(marker.slug)}
                    className="flex w-full items-center gap-2.5 rounded-lg px-2.5 py-2 text-left transition-colors hover:bg-ink-850"
                  >
                    <span
                      aria-hidden
                      className="size-2 shrink-0 rounded-full"
                      style={{ backgroundColor: statusDefinition(marker.status).accent }}
                    />
                    <span className="text-sm text-paper-200">{marker.title}</span>
                  </button>
                </li>
              ))}
              {placed.length === 0 ? (
                <li className="rounded-lg border border-dashed border-[var(--rule)] px-3 py-6 text-center text-xs text-paper-500">
                  Keine verortete Ebene aktiv.
                </li>
              ) : null}
            </ul>
          )}
        </section>
      </aside>
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
      className="grid size-9 place-items-center rounded-md border border-[#123038]/15 bg-[#fdf4e2]/90 text-[#123038] shadow-sm transition-colors hover:bg-[#fdf4e2] hover:text-[#ff6a55]"
    >
      <span aria-hidden>{children}</span>
    </button>
  );
}
