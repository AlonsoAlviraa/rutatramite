import { existsSync, readFileSync } from "node:fs";
import { describe, expect, it } from "vitest";

const captureFiles = [
  "docs/seo-workflow/20260922-audit/gsc-raw.json",
  "docs/seo-workflow/20260922-audit/live-html.json",
  "docs/seo-workflow/20260922-audit/url-inspection.json",
  "docs/seo-workflow/20260922-audit/fichas-geo.json",
  "docs/AUDITORIA-SEO-GEO-20260922.md",
];

if (!captureFiles.every((path) => existsSync(path))) {
  describe.skip("auditoría SEO GEO 2026-09-22", () => {
    it("la captura no viaja en el paquete de release", () => {});
  });
} else {
const raw = JSON.parse(readFileSync("docs/seo-workflow/20260922-audit/gsc-raw.json", "utf8"));
const live = JSON.parse(readFileSync("docs/seo-workflow/20260922-audit/live-html.json", "utf8"));
const inspection = JSON.parse(readFileSync("docs/seo-workflow/20260922-audit/url-inspection.json", "utf8"));
const fichas = JSON.parse(readFileSync("docs/seo-workflow/20260922-audit/fichas-geo.json", "utf8"));
const report = readFileSync("docs/AUDITORIA-SEO-GEO-20260922.md", "utf8");

function sum<F extends "impressions" | "clicks">(rows: Record<F, number>[], field: F) {
  return rows.reduce((total, row) => total + row[field], 0);
}

describe("auditoría SEO GEO 2026-09-22", () => {
  const finalDays = raw.calls.web_final_date.rows as { date: string; impressions: number; clicks: number; position: number }[];
  const allDays = raw.calls.web_all_date.rows as { date: string; impressions: number; clicks: number; position: number }[];
  const provisional = allDays.filter((row) => !finalDays.some((final) => final.date === row.date));

  it("usa solo la propiedad de dominio y separa el tramo final", () => {
    expect(raw.property).toBe("sc-domain:rutatramite.com");
    expect(raw.search_type).toBe("web");
    expect(raw.prefix_property_queried).toBe(false);
    expect(raw.calls.web_final_date.data_state).toBe("final");
    expect(raw.calls.web_all_date.data_state).toBe("all");
    expect(report).toContain("Propiedad: `sc-domain:rutatramite.com`. Tipo: web. El prefijo HTTPS no se ha consultado ni se suma.");
  });

  it("hace coincidir la prosa con la serie diaria definitiva", () => {
    const impressions = sum(finalDays, "impressions");
    const clicks = sum(finalDays, "clicks");
    const through = (day: string) => sum(finalDays.filter((row) => row.date <= day), "impressions");
    const peak = finalDays.reduce((best, row) => (row.impressions > best.impressions ? row : best));
    expect(impressions).toBe(sum(raw.calls.web_final_country.rows, "impressions"));
    expect(impressions).toBe(sum(raw.calls.web_final_device.rows, "impressions"));
    expect(report).toContain(`Impresiones finales: ${impressions}. Clics finales: ${clicks}.`);
    expect(report).toContain(`Último día final: ${finalDays[finalDays.length - 1].date}.`);
    expect(report).toContain(`Hasta el 12 de septiembre de 2026 la serie definitiva suma ${through("2026-09-12")} impresiones y 0 clics.`);
    expect(report).toContain(`Hasta el 13 de septiembre de 2026 la serie definitiva suma ${through("2026-09-13")} impresiones y 0 clics.`);
    expect(report).toContain(`Hasta el 16 de septiembre de 2026 la serie definitiva suma ${through("2026-09-16")} impresiones y 0 clics.`);
    expect(report).toContain(`Mejor día definitivo: ${peak.date}, con ${peak.impressions} impresiones y 0 clics.`);
    for (const row of finalDays) {
      expect(report).toContain(`| ${row.date} | final | ${row.impressions} | ${row.clicks} | ${row.position} |`);
    }
    const pageSum = sum(raw.calls.web_final_page.rows, "impressions");
    expect(report).toContain(`La suma de la tabla por página es ${pageSum}, una impresión más que la serie diaria.`);
    expect(pageSum).not.toBe(impressions);
  });

  it("deja fuera del contrato final los días que solo aparecen en dataState all", () => {
    const impressions = sum(provisional, "impressions");
    const clicks = sum(provisional, "clicks");
    expect(provisional.map((row) => row.date)).toEqual(["2026-09-20", "2026-09-21", "2026-09-22"]);
    expect(report).toContain(`Esas ${impressions} impresiones provisionales no entran en el contrato final.`);
    expect(clicks).toBe(0);
    for (const row of provisional) {
      expect(report).toContain(`| ${row.date} | provisional | ${row.impressions} | ${row.clicks} | ${row.position} |`);
    }
    const peak = (raw.calls.web_final_date.rows as { impressions: number }[]).reduce((best, row) => Math.max(best, row.impressions), 0);
    const after = (raw.calls.web_final_date.rows as { date: string; impressions: number }[]).filter((row) => row.date > "2026-09-15");
    expect(after.every((row) => row.impressions < peak)).toBe(true);
    expect(report).toContain("Veredicto: pico y vuelta a volumen bajo.");
    expect(report).toContain("La publicación de la tarde del 16 no explica ese pico.");
  });

  it("cita title y H1 del HTML vivo en cada URL con impresiones", () => {
    const pages = raw.calls.web_final_page.rows as { page: string }[];
    expect(pages.length).toBeGreaterThan(0);
    for (const row of pages) {
      const html = live.pages[row.page];
      expect(html.status).toBe(200);
      expect(report).toContain(html.title);
      expect(report).toContain(html.h1[0]);
      const indexed = inspection.rows.find((item: { url: string }) => item.url === row.page);
      expect(indexed.coverage_state).toBe("Submitted and indexed");
    }
    expect(report).toContain("Submitted and indexed");
    expect(report).toContain("URL is unknown to Google");
  });

  it("suma las consultas navegacionales desde las filas, no desde una constante", () => {
    const navigational = [
      "citapreviadnie",
      "www.citapreviadnie.es",
      "www.citapreviadnie.es.",
      "citapreviadnie.es",
      "https://www.citapreviadnie.es.",
      "https //www.noticiastrabajo.es/tramites/dni/cita-previa-dni/",
    ];
    const rows = raw.calls.web_final_query.rows as { query: string; impressions: number }[];
    const impressions = navigational.reduce((total, query) => total + rows.find((row) => row.query === query)!.impressions, 0);
    expect(report).toContain(`suman ${impressions} impresiones`);
    const disclosed = sum(rows, "impressions");
    expect(report).toContain(`${disclosed}`);
    expect(disclosed).toBeLessThan(sum(raw.calls.web_final_date.rows, "impressions"));
  });

  it("cita el recuento de fichas que produjo la regla local contrastada con el sitemap", () => {
    expect(fichas.indexable_by_local_rule + fichas.noindex_by_local_rule).toBe(fichas.index_rows);
    expect(fichas.indexable_missing_from_live_sitemap).toEqual([]);
    expect(fichas.live_sitemap_fichas_not_in_local_indexable).toEqual([]);
    expect(report).toContain(`${fichas.index_rows} fichas del índice: ${fichas.indexable_by_local_rule} indexables y ${fichas.noindex_by_local_rule} con`);
    const madrid = live.pages["https://rutatramite.com/empadronarse/comunidad-de-madrid/madrid/madrid"];
    const gijon = live.pages["https://rutatramite.com/empadronarse/principado-de-asturias/asturias/gijon"];
    expect(madrid.robots_meta).toBe("index, follow");
    expect(gijon.robots_meta).toBe("noindex, follow");
    expect(report).toContain(madrid.title);
    expect(report).toContain(gijon.title);
  });
});
}
