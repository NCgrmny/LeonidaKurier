import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { FOOTER_LINKS, MAIN_NAV, SITE } from "@/lib/site";

export function SiteFooter() {
  return (
    <footer className="night mt-16">
      <Container width="wide">
        <div className="grid gap-10 py-14 md:grid-cols-[minmax(0,1.15fr)_minmax(0,1fr)]">
          <div>
            <p className="masthead text-4xl text-paper-100 sm:text-5xl">
              Leonida <span className="text-coral-400">Kurier</span>
            </p>
            <p className="standfirst mt-4 max-w-sm text-[15px]">{SITE.tagline}</p>
            <p className="meta mt-6">Unabhängiger Bericht aus Leonida</p>
          </div>

          <div className="grid gap-8 sm:grid-cols-2">
            <div>
              <p className="ressort mb-4">Ressorts</p>
              <ul className="grid gap-2.5">
                {MAIN_NAV.map((item) => (
                  <li key={item.href}>
                    <Link
                      href={item.href}
                      className="font-serif text-[15px] text-paper-200 transition-colors hover:text-lagoon-300"
                    >
                      {item.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <p className="ressort mb-4">Projekt</p>
              <ul className="grid gap-2.5">
                {FOOTER_LINKS.map((item) => (
                  <li key={item.href}>
                    <Link
                      href={item.href}
                      className="font-serif text-[15px] text-paper-200 transition-colors hover:text-lagoon-300"
                    >
                      {item.label}
                    </Link>
                  </li>
                ))}
                <li>
                  <a
                    href="https://leonidakompass.de"
                    className="font-serif text-[15px] text-paper-200 transition-colors hover:text-lagoon-300"
                  >
                    leonidakompass.de
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>

        <div className="flex flex-col gap-3 border-t border-[var(--rule)] py-6 text-xs text-paper-400 sm:flex-row sm:items-center sm:justify-between">
          <p>
            © {new Date().getFullYear()} {SITE.name} · A project by{" "}
            <span className="text-paper-200">{SITE.operator}</span>.
          </p>
          <p className="max-w-xl sm:text-right">{SITE.disclaimerLong}</p>
        </div>
      </Container>
    </footer>
  );
}
