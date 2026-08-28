import Link from "next/link";
import { Scene, motifForSlug } from "@/components/art/Scene";
import type { BaseEntity } from "@/lib/types";
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
          <Scene variant={entity.motif ?? motifForSlug(entity.slug)} />
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
