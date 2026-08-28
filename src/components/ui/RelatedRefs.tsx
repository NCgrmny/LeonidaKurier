import Link from "next/link";
import type { ResolvedRef } from "@/lib/content/repository";
import { StatusBadge } from "./StatusBadge";

const TYPE_LABEL: Record<string, string> = {
  article: "Kurier",
  region: "Region",
  location: "Ort",
  character: "Charakter",
  vehicle: "Fahrzeug",
  mission: "Mission",
  business: "Geschäft",
  collectible: "Geheimnis",
  theory: "Theorie",
  mapMarker: "Kompass",
};

/** Verzahnung zwischen Kurier, Kompass und Datenbank. */
export function RelatedRefs({ refs }: { refs: ResolvedRef[] }) {
  if (refs.length === 0) return null;
  return (
    <ul className="grid gap-2 sm:grid-cols-2">
      {refs.map((item) => (
        <li key={`${item.ref.type}-${item.ref.slug}`}>
          <Link
            href={item.href}
            className="group flex h-full flex-col gap-1.5 rounded-lg border border-[var(--rule)] bg-ink-900/50 px-4 py-3 transition-colors hover:border-lagoon-400/40 hover:bg-ink-850"
          >
            <span className="flex items-center justify-between gap-3">
              <span className="font-mono text-[10px] uppercase tracking-[0.14em] text-paper-500">
                {TYPE_LABEL[item.ref.type] ?? item.ref.type}
              </span>
              <StatusBadge status={item.entity.status} size="sm" />
            </span>
            <span className="text-sm font-medium text-paper-50 group-hover:text-lagoon-300">
              {item.title}
            </span>
            <span className="line-clamp-2 text-xs text-paper-400">{item.summary}</span>
          </Link>
        </li>
      ))}
    </ul>
  );
}
