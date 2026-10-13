import { NextResponse } from "next/server";

/** Leftover split-sitemap paths must not serve XML. */
export const GONE_SITEMAP_PATHS = [
  "/sitemap-core.xml",
  "/sitemap-provincias.xml",
  "/sitemap-municipios.xml",
] as const;

export function goneSitemapResponse(): NextResponse {
  return new NextResponse("Not Found\n", {
    status: 404,
    headers: { "content-type": "text/plain; charset=utf-8" },
  });
}
