import fs from "node:fs";
import { createElement } from "react";
import { renderToStaticMarkup } from "react-dom/server";
import { describe, expect, it } from "vitest";
import { loadIndex, loadMunicipio } from "@/lib/data/load";
import { generateMetadata as provinceMetadata } from "@/app/empadronarse/[ccaa]/[provincia]/page";
import { buildProvinciaHub } from "@/lib/hub/buildHub";
import { HubView } from "@/components/empadronamiento/HubView";
import MiniSearch from "minisearch";

describe("directory evidence and stable municipal routes", () => {
  it("uses the official 2025 totals for corrected examples, including the municipality below the old threshold", () => {
    const index = loadIndex();
    for (const [code, population] of [["09059",177402],["11015",90864],["08035",20864],["31258",9928]] as const) {
      expect(index.find(m=>m.ine_code===code)?.poblacion).toBe(population);
      expect(loadMunicipio(code).poblacion).toBe(population);
    }
  });
  it("preserves every original route and municipal procedure review while changing demographic fields", () => {
    const original = JSON.parse(fs.readFileSync("data/municipios/_index.json", "utf8"));
    const reviews = JSON.parse(fs.readFileSync("data/municipal-reviews.json", "utf8"));
    expect(loadIndex().map(m=>m.path)).toEqual(original.map((m:{path:string})=>m.path));
    expect(loadIndex().filter(m=>m.local_verified)).toHaveLength(18);
    for (const m of original) {
      const old = {...JSON.parse(fs.readFileSync(`data/municipios/${m.ine_code}.json`,"utf8")),...reviews[m.ine_code]};
      const current = loadMunicipio(m.ine_code);
      for (const field of ["path","last_verified","evidence","procedure_docs","online","cita_previa"] as const) expect(current[field],`${m.ine_code} ${field}`).toEqual(old[field]);
    }
  });
  it("keeps former names searchable alongside the current official name", () => {
    const entry=loadIndex().find(m=>m.ine_code==="20036")!;
    expect(entry.name).toBe("Hondarribia");
    const search=new MiniSearch({idField:"ine_code",fields:["name","search_alias"]});
    search.add(entry);
    expect(search.search("Fuenterrabía")[0]?.id).toBe("20036");
    expect(search.search("Hondarribia")[0]?.id).toBe("20036");
  });
  it("describes empty autonomous-city directories without inventing provinces or absent INE municipalities", () => {
    for (const [name,slug] of [["Ceuta","ceuta"],["Melilla","melilla"]]) {
      const model=buildProvinciaHub(name,name,[]);
      const html=renderToStaticMarkup(createElement(HubView,{model,ccaaSlug:slug,provinceSlug:slug}));
      expect(model.h1).not.toContain("provincia");
      expect(model.lead).toContain("ciudad autónoma");
      expect(html).toContain("Aún no hemos incorporado fichas");
      expect(html).not.toContain("No hay municipios del catálogo INE");
      expect(html).not.toContain('type="search"');
    }
  });
  it("does not emit a canonical for a province outside its community", async () => {
    expect(await provinceMetadata({params:Promise.resolve({ccaa:"andalucia",provincia:"madrid"})})).toEqual({});
    const metadata=await provinceMetadata({params:Promise.resolve({ccaa:"comunidad-de-madrid",provincia:"madrid"})});
    expect(metadata.title).toBe("Padrón en la provincia de Madrid: directorio municipal");
    expect(metadata.description).not.toContain("10.000");
  });
});
