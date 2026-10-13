import { describe, expect, it } from "vitest";
import { loadIndex } from "@/lib/data/load";
import { ccaaPath, municipioPath, provinciaPath } from "@/lib/geo/paths";
import { allCcaaHubs, loadTerritories } from "@/lib/geo/territories";
import { renderCcaaHubHtml, renderProvinciaHubHtml } from "@/lib/render/server";

describe("SITE_MAP geo URLs and hubs", () => {
  it("every catalog ine_code resolves to /empadronarse/{ccaa}/{provincia}/{municipio}", () => {
    const index = loadIndex();
    expect(index.length).toBe(769);
    const seen = new Set<string>();
    for (const m of index) {
      const path = municipioPath(m.ccaa_slug, m.province_slug, m.slug);
      expect(m.path).toBe(path);
      expect(path.startsWith("/empadronarse/")).toBe(true);
      const parts = path.split("/").filter(Boolean);
      expect(parts).toEqual(["empadronarse", m.ccaa_slug, m.province_slug, m.slug]);
      expect(seen.has(path), `dup ${path}`).toBe(false);
      seen.add(path);
      expect(m.ine_code).toMatch(/^\d{5}$/);
    }
    const madrid = index.find((m) => m.ine_code === "28079");
    expect(madrid?.path).toBe("/empadronarse/comunidad-de-madrid/madrid/madrid");
  });

  it("CCAA and provincia hubs list the right municipios", { timeout: 60_000 }, () => {
    const index = loadIndex();
    const t = loadTerritories();
    const seventeen = allCcaaHubs().filter((c) => !c.autonomous_city);
    expect(seventeen.length).toBe(17);
    const provinceHubs = Object.values(t.provinces);
    expect(provinceHubs.length).toBe(52);

    for (const c of allCcaaHubs()) {
      const listed = index.filter((m) => m.ccaa_slug === c.slug);
      const html = renderCcaaHubHtml(
        c.name,
        c.slug,
        c.province_codes.map((code) => t.provinces[code].name),
      );
      for (const m of listed) {
        expect(html, m.ine_code).toContain(m.path);
      }
    }

    for (const c of t.ccaa) {
      for (const code of c.province_codes) {
        const p = t.provinces[code];
        const listed = index.filter((m) => m.province_code === code);
        const html = renderProvinciaHubHtml(p.name, c.name, c.slug, p.slug);
        expect(html).toContain(provinciaPath(c.slug, p.slug).split("/")[2] ? p.name : p.name);
        for (const m of listed) {
          expect(html, m.ine_code).toContain(m.path);
        }
      }
    }
    expect(ccaaPath("comunidad-de-madrid")).toBe("/empadronarse/comunidad-de-madrid");
  });
});
