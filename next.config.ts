import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  poweredByHeader: false,
  // Eigenstaendiger Server-Build: erzeugt .next/standalone mit allem noetigen
  // Code, damit die App ohne Vercel auf einem eigenen Server laufen kann.
  //
  // Auf Vercel muss das unterbleiben: Der dortige Build-Adapter erwartet die
  // regulaeren Trace-Dateien (.next/next-server.js.nft.json), die der
  // Standalone-Modus nicht schreibt – der Build bricht sonst nach dem
  // Generieren aller Seiten in onBuildComplete ab.
  ...(process.env.VERCEL ? {} : { output: "standalone" as const }),
  images: {
    // Bildquellen werden bewusst restriktiv gehalten: Es werden ausschliesslich
    // eigene bzw. explizit freigegebene Assets ausgeliefert.
    remotePatterns: [],
  },
  async headers() {
    return [
      {
        source: "/:path*",
        headers: [
          { key: "X-Content-Type-Options", value: "nosniff" },
          { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
          { key: "X-Frame-Options", value: "SAMEORIGIN" },
        ],
      },
    ];
  },
};

export default nextConfig;
