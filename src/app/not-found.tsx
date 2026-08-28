import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { MAIN_NAV } from "@/lib/site";

export default function NotFound() {
  return (
    <Container width="narrow">
      <div className="py-24 text-center">
        <span className="rubric">Fehler 404</span>
        <h1 className="headline mt-4 text-[2.4rem] sm:text-[3.2rem]">
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
                className="inline-block border border-ink-900/25 px-4 py-2 font-mono text-[11px] font-bold uppercase tracking-[0.16em] text-ink-800 transition-colors hover:border-coral-500 hover:text-coral-600"
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
