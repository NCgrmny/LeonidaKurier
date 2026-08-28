import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { MAIN_NAV } from "@/lib/site";

export default function NotFound() {
  return (
    <Container width="narrow">
      <div className="py-24 text-center">
        <p className="kicker">Fehler 404</p>
        <h1 className="headline mt-4 text-4xl text-paper-50 sm:text-5xl">
          Diese Route führt ins Leere
        </h1>
        <p className="standfirst mx-auto mt-4 max-w-lg">
          Die gesuchte Seite existiert nicht – womöglich wurde sie verschoben oder ist noch
          nicht veröffentlicht.
        </p>
        <ul className="mt-10 flex flex-wrap justify-center gap-2">
          {MAIN_NAV.map((item) => (
            <li key={item.href}>
              <Link
                href={item.href}
                className="inline-block rounded-md border border-[var(--rule)] px-4 py-2 font-mono text-[11px] uppercase tracking-[0.14em] text-paper-200 transition-colors hover:border-lagoon-400/40 hover:text-lagoon-300"
              >
                {item.label}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </Container>
  );
}
