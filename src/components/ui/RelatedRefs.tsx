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
    <ul className="grid gap-px bg-ink-900/15 sm:grid-cols-2">
      {refs.map((item) => (
        <li key={`${item.ref.type}-${item.ref.slug}`} className="bg-paper-100">
          <Link
            href={item.href}
            className="group flex h-full flex-col gap-1.5 px-4 py-3.5 transition-colors hover:bg-paper-200"
          >
            <span className="flex items-center justify-between gap-3">
              <span className="meta">{TYPE_LABEL[item.ref.type] ?? item.ref.type}</span>
              <StatusBadge status={item.entity.status} />
            </span>
            <span className="subhead text-[17px] group-hover:text-coral-600">
              {item.title}
            </span>
            <span className="line-clamp-2 font-serif text-[13px] leading-snug text-ink-500">
              {item.summary}
            </span>
          </Link>
        </li>
      ))}
    </ul>
  );
}
