import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { FOOTER_LINKS, MAIN_NAV, SITE } from "@/lib/site";
import { Wordmark } from "./Wordmark";

export function SiteFooter() {
  return (
    <footer className="mt-24 border-t border-[var(--rule)] bg-ink-900/60">
      <Container width="wide">
        <div className="grid gap-10 py-12 md:grid-cols-[minmax(0,1.1fr)_minmax(0,1fr)]">
          <div>
            <Wordmark />
            <p className="standfirst mt-4 max-w-sm text-sm">{SITE.tagline}</p>
            <p className="mt-4 max-w-md text-xs leading-relaxed text-paper-500">
              {SITE.description}
            </p>
          </div>

          <div className="grid gap-8 sm:grid-cols-2">
            <div>
              <p className="kicker mb-3">Bereiche</p>
              <ul className="grid gap-2">
                {MAIN_NAV.map((item) => (
                  <li key={item.href}>
                    <Link
                      href={item.href}
                      className="text-sm text-paper-200 transition-colors hover:text-coral-300"
                    >
                      {item.label}
                      <span className="ml-2 text-xs text-paper-500">{item.question}</span>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <p className="kicker mb-3">Projekt</p>
              <ul className="grid gap-2">
                {FOOTER_LINKS.map((item) => (
                  <li key={item.href}>
                    <Link
                      href={item.href}
                      className="text-sm text-paper-200 transition-colors hover:text-coral-300"
                    >
                      {item.label}
                    </Link>
                  </li>
                ))}
                <li>
                  <a
                    href="https://leonidakompass.de"
                    className="text-sm text-paper-200 transition-colors hover:text-coral-300"
                  >
                    leonidakompass.de
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>

        <div className="flex flex-col gap-3 border-t border-[var(--rule)] py-6 text-xs text-paper-500 sm:flex-row sm:items-center sm:justify-between">
          <p>
            © {new Date().getFullYear()} {SITE.name}.{" "}
            <span className="text-paper-400">A project by {SITE.operator}.</span>
          </p>
          <p className="max-w-xl sm:text-right">{SITE.disclaimerLong}</p>
        </div>
      </Container>
    </footer>
  );
}
