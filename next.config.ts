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
  async headers() {
    const html = [
      { key: "X-Content-Type-Options", value: "nosniff" },
      { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
      { key: "X-Frame-Options", value: "SAMEORIGIN" },
      { key: "Permissions-Policy", value: "camera=(), microphone=(), geolocation=()" },
      { key: "Content-Security-Policy-Report-Only", value: "default-src 'self'; script-src 'self' 'unsafe-inline' https://static.cloudflareinsights.com https://pagead2.googlesyndication.com https://*.googlesyndication.com https://*.doubleclick.net https://googleads.g.doubleclick.net https://tpc.googlesyndication.com https://*.google.com https://*.gstatic.com https://adservice.google.com https://*.google.es https://fundingchoicesmessages.google.com https://*.adtrafficquality.google; style-src 'self' 'unsafe-inline' https://fonts.googleapis.com https://fundingchoicesmessages.google.com; img-src 'self' data: blob: https:; font-src 'self' data: https://fonts.gstatic.com; connect-src 'self' https://cloudflareinsights.com https://pagead2.googlesyndication.com https://*.googlesyndication.com https://*.doubleclick.net https://googleads.g.doubleclick.net https://tpc.googlesyndication.com https://*.google.com https://*.gstatic.com https://adservice.google.com https://*.google.es https://fundingchoicesmessages.google.com https://*.adtrafficquality.google; frame-src 'self' https://pagead2.googlesyndication.com https://*.googlesyndication.com https://*.doubleclick.net https://googleads.g.doubleclick.net https://tpc.googlesyndication.com https://*.google.com https://*.gstatic.com https://adservice.google.com https://*.google.es https://fundingchoicesmessages.google.com https://*.adtrafficquality.google; fenced-frame-src 'self' https://pagead2.googlesyndication.com https://*.googlesyndication.com https://*.doubleclick.net https://googleads.g.doubleclick.net https://tpc.googlesyndication.com https://*.google.com https://*.gstatic.com https://adservice.google.com https://*.google.es https://fundingchoicesmessages.google.com https://*.adtrafficquality.google; form-action 'self'; base-uri 'self'; frame-ancestors 'self'; object-src 'none'" },
    ];
    return [
      { source: "/", headers: html },
      { source: "/:path*", headers: html },
      { source: "/pdf/:path*", headers: [{ key: "X-Robots-Tag", value: "noindex" }, { key: "X-Content-Type-Options", value: "nosniff" }] },
    ];
  },
  async redirects() {
    return [
      { source: "/:path*", has: [{ type: "host", value: "www.rutatramite.es" }], destination: "https://rutatramite.com/:path*", permanent: true },
      { source: "/:path*", has: [{ type: "host", value: "rutatramite.es" }], destination: "https://rutatramite.com/:path*", permanent: true },
      { source: "/:path*", has: [{ type: "host", value: "www.rutatramite.com" }], destination: "https://rutatramite.com/:path*", permanent: true },
      { source: "/comedor/t16-como-solicitar", destination: "/transporte/t16-como-solicitar", permanent: true },
      { source: "/comedor/abono-joven-estudiante", destination: "/transporte/abono-joven-estudiante", permanent: true },
    ];
  },
};

export default withNextIntl(nextConfig);
