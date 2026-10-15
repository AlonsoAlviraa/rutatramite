import { latestGuides } from "@/lib/seo/latest";
import { SITE_ORIGIN } from "@/lib/types";

export const dynamic = "force-static";

const esc = (s: string) => s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");

/** Atom feed of the newest and updated guides (2026-10-13). */
export function GET() {
  const items = latestGuides(40);
  const updated = items[0]?.reviewedAt ?? "2026-10-13";
  const entries = items.map((g) => `  <entry>\n    <title>${esc(g.h1)}</title>\n    <link href="${SITE_ORIGIN}${g.path}"/>\n    <id>${SITE_ORIGIN}${g.path}</id>\n    <updated>${g.reviewedAt}T08:00:00Z</updated>\n    <summary>${esc(g.description)}</summary>\n  </entry>`).join("\n");
  const xml = `<?xml version="1.0" encoding="utf-8"?>\n<feed xmlns="http://www.w3.org/2005/Atom" xml:lang="es">\n  <title>RutaTrámite: guías nuevas y actualizadas</title>\n  <link href="${SITE_ORIGIN}/feed.xml" rel="self"/>\n  <link href="${SITE_ORIGIN}/"/>\n  <id>${SITE_ORIGIN}/feed.xml</id>\n  <updated>${updated}T08:00:00Z</updated>\n  <author><name>RutaTrámite</name></author>\n${entries}\n</feed>\n`;
  return new Response(xml, { headers: { "content-type": "application/atom+xml; charset=utf-8" } });
}
