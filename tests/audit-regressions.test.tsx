import { renderToStaticMarkup } from "react-dom/server";
import { describe, expect, it } from "vitest";
import { ALL_GUIDES } from "@/lib/tramites/catalog";
import { GuideView } from "@/components/tramites/GuideView";
import { guideFaqs } from "@/lib/seo/jsonld";
import fs from "node:fs";

describe("full guide catalog SEO integrity", () => {
  it("every published guide is discoverable from the sitemap", () => {
    const sitemap = fs.readFileSync("public/sitemap.xml", "utf8");
    for (const guide of ALL_GUIDES) expect(sitemap, guide.path).toContain(`${guide.path}</loc>`);
  });
  it("every FAQ question and answer is rendered as readable page content", () => {
    expect(ALL_GUIDES.some((guide) => guideFaqs(guide).length > 0)).toBe(true);
    for (const guide of ALL_GUIDES) {
      const html = renderToStaticMarkup(<GuideView guide={guide} />).replace(/<script[\s\S]*?<\/script>/g, "");
      expect(html, guide.path).not.toContain("¿Qué debo saber sobre «");
      if (!guideFaqs(guide).length) {
        expect(html, guide.path).not.toContain('id="preguntas-frecuentes"');
      }
      for (const faq of guideFaqs(guide)) {
        expect(html, guide.path).toContain(renderToStaticMarkup(<summary className="cursor-pointer font-semibold">{faq.q}</summary>));
        expect(html, guide.path).toContain(renderToStaticMarkup(<p className="mt-3 leading-relaxed">{faq.a}</p>));
      }
    }
  });
  it("every related guide link resolves in the catalog or a published category", () => {
    const paths = new Set(ALL_GUIDES.map((g) => g.path));
    const categories = ["/empadronarse", "/dni", "/pasaporte", "/extranjeria", "/mudanza", "/colegio", "/comedor", "/fp", "/bebe", "/becas", "/modelos"];
    for (const g of ALL_GUIDES) for (const link of g.related) {
      if (link.href.startsWith("https://")) continue;
      expect(paths.has(link.href) || categories.includes(link.href) || fs.existsSync(`src/app${link.href}/page.tsx`), `${g.path} -> ${link.href}`).toBe(true);
    }
  });
});
