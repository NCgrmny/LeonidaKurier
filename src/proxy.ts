import { NextResponse, type NextRequest } from "next/server";
import { COMPASS_HOST } from "@/lib/site";

/**
 * Zweiter Einstieg über leonidakompass.de.
 *
 * Die Kompass-Domain führt nicht zu einem separaten Produkt, sondern direkt in
 * den Kartenbereich derselben Plattform. Alle übrigen Pfade bleiben erreichbar,
 * damit Verlinkungen aus dem Kompass heraus funktionieren.
 */
export default function proxy(request: NextRequest) {
  const host = request.headers.get("host")?.split(":")[0]?.toLowerCase();
  const isCompassHost =
    host === COMPASS_HOST || host === `www.${COMPASS_HOST}`;

  if (isCompassHost && request.nextUrl.pathname === "/") {
    const url = request.nextUrl.clone();
    url.pathname = "/kompass";
    return NextResponse.rewrite(url);
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!_next/static|_next/image|favicon.ico|robots.txt|sitemap.xml).*)"],
};
