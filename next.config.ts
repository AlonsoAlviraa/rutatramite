import path from "node:path";
import type { NextConfig } from "next";
import createNextIntlPlugin from "next-intl/plugin";

const withNextIntl = createNextIntlPlugin("./src/i18n/request.ts");

const nextConfig: NextConfig = {
  reactStrictMode: true,
  typedRoutes: false,
  trailingSlash: false,
  poweredByHeader: false,
  output: "standalone",
  distDir: process.env.NEXT_DIST_DIR || ".next",
  eslint: { ignoreDuringBuilds: true },
  experimental: {
    staticGenerationMaxConcurrency: 4,
  },
  outputFileTracingRoot: path.join(__dirname),
  async redirects() {
    return [
      {
        source: "/:path*",
        has: [{ type: "host", value: "www.rutatramite.es" }],
        destination: "https://rutatramite.es/:path*",
        permanent: true,
      },
      {
        source: "/:path*",
        has: [{ type: "host", value: "www.rutatramite.com" }],
        destination: "https://rutatramite.com/:path*",
        permanent: true,
      },
    ];
  },
};

export default withNextIntl(nextConfig);
