import Link from "next/link";
import type { BaseEntity } from "@/lib/types";
import { DemoBadge, StatusBadge } from "@/components/ui/StatusBadge";

export function EntityCard({
  entity,
  href,
  meta,
}: {
  entity: BaseEntity;
  href: string;
  meta?: string;
}) {
  return (
    <article className="group relative flex h-full flex-col rounded-xl border border-[var(--rule)] bg-ink-900/50 p-5 transition-colors hover:border-lagoon-400/35 hover:bg-ink-850">
      <div className="flex flex-wrap items-center gap-2">
        <StatusBadge status={entity.status} size="sm" />
        {entity.demo ? <DemoBadge /> : null}
      </div>
      <h3 className="headline mt-3 text-lg text-paper-50">
        <Link href={href} className="after:absolute after:inset-0">
          {entity.title}
        </Link>
      </h3>
      <p className="mt-2 line-clamp-3 text-sm leading-relaxed text-paper-400">
        {entity.summary}
      </p>
      {meta ? (
        <p className="mt-auto pt-4 font-mono text-[10px] uppercase tracking-[0.12em] text-paper-500">
          {meta}
        </p>
      ) : null}
    </article>
  );
}
