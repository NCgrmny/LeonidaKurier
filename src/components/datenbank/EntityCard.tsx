import Link from "next/link";
import { Scene, motifForSlug } from "@/components/art/Scene";
import type { BaseEntity, Character } from "@/lib/types";
import { istVerortet } from "@/lib/kartenpunkte";
import { Standortkarte } from "@/components/kompass/Standortkarte";
import { Portraetplatte } from "./Portraetplatte";
import { DemoBadge, StatusBadge } from "@/components/ui/StatusBadge";

export function EntityCard({
  entity,
  href,
  meta,
  withImage = true,
}: {
  entity: BaseEntity;
  href: string;
  meta?: string;
  withImage?: boolean;
}) {
  return (
    <article className="group relative flex h-full flex-col">
      {withImage ? (
        <div className="relative mb-3 aspect-[4/3] overflow-hidden bg-night-900">
          {istFigur(entity) ? (
            <Portraetplatte name={entity.title} rolle={entity.role} />
          ) : istVerortet(entity) ? (
            <Standortkarte
              punkte={[{ name: entity.title, position: entity.marker }]}
              kompakt
            />
          ) : (
            <Scene variant={entity.motif ?? motifForSlug(entity.slug)} />
          )}
        </div>
      ) : null}
      <div className="flex flex-wrap items-center gap-2.5">
        <StatusBadge status={entity.status} />
        {entity.demo ? <DemoBadge /> : null}
      </div>
      <h3 className="subhead mt-1.5 text-[1.25rem] leading-tight">
        <Link href={href} className="after:absolute after:inset-0 hover:text-coral-600">
          {entity.title}
        </Link>
      </h3>
      <p className="standfirst mt-2 line-clamp-3 text-[14px]">{entity.summary}</p>
      {meta ? <p className="meta mt-auto pt-3">{meta}</p> : null}
    </article>
  );
}

/**
 * Figuren erkennt man an `role`. Ein eigenes Feld dafuer waere ehrlicher,
 * aber `role` fuehrt bisher ausschliesslich die Charaktersammlung.
 */
function istFigur(entity: BaseEntity): entity is Character {
  return "role" in entity;
}
