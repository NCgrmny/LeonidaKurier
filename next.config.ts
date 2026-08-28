import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  poweredByHeader: false,
  // Eigenstaendiger Server-Build: erzeugt .next/standalone mit allem noetigen
  // Code, damit die App ohne Vercel auf einem eigenen Server laufen kann.
  output: "standalone",
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
