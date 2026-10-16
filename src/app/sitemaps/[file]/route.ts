import { SITEMAP_SECTIONS, sectionEntries, type SitemapSection } from "@/lib/seo/sitemapSections";
import { sitemapXml } from "@/lib/seo/sitemapEntries";

export const dynamic = "force-static";
export const dynamicParams = false;

export function generateStaticParams() {
  return SITEMAP_SECTIONS.map((s) => ({ file: `${s}.xml` }));
}

export async function GET(_req: Request, { params }: { params: Promise<{ file: string }> }) {
  const { file } = await params;
  const section = file.replace(/\.xml$/, "") as SitemapSection;
  if (!SITEMAP_SECTIONS.includes(section)) return new Response("Not Found\n", { status: 404 });
  return new Response(sitemapXml(sectionEntries(section)), { headers: { "content-type": "application/xml; charset=utf-8" } });
}
