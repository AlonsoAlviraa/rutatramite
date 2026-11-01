import { describe, expect, it } from "vitest";
import { CONTRATO_PP_GUIDES } from "@/lib/tramites/contrato-pp";
import { ALL_GUIDES } from "@/lib/tramites/catalog";
import { renderGuideHtml } from "@/lib/render/server";

const byPath = (p: string) => ALL_GUIDES.find((g) => g.path === p)!;
const NEWP = "/elecciones/contrato-con-espana-pp";

describe("Contrato con España del PP (19-10-2026)", () => {
  it("page has 12 sourced points, says it is not the programme, FAQPage", () => {
    const g = CONTRATO_PP_GUIDES[0];
    expect(ALL_GUIDES.filter((x) => x.path === NEWP)).toHaveLength(1);
    const rows = g.sections.find((s) => s.id === "puntos")!.table!.rows;
    expect(rows).toHaveLength(12);
    for (const r of rows) expect(r.source.href).toMatch(/^https:\/\//);
    expect(g.lead).toMatch(/No es el programa electoral/);
    expect(renderGuideHtml(NEWP)).toContain('"FAQPage"');
  });
  it("programas page keeps CTR fields and mentions the contract without calling it the programme", () => {
    const p = byPath("/elecciones/programas-electorales-29n");
    expect(p.title).toBe("Programas electorales del 29-N: cuándo salen y dónde verlos");
    expect(p.lead).toMatch(/ningún partido ha publicado todavía su programa/);
    expect(p.lead).toMatch(/Contrato con España/);
    expect(p.related.some((r) => r.href === NEWP)).toBe(true);
    for (const x of ["/elecciones/promesas/partido-pp", "/elecciones/quiere-el-pp-quitar-las-pensiones"]) expect(byPath(x).related.some((r) => r.href === NEWP)).toBe(true);
  });
  it("Podemos 5 propuestas get the same treatment in programas and SMI pages", () => {
    const p = byPath("/elecciones/programas-electorales-29n");
    const pod = p.sections.find((s) => s.id === "podemos")!;
    expect(pod.table!.rows[0].cells[0]).toBe("Varios temas");
    expect(pod.table!.rows[0].source.href).toBe("https://x.com/PODEMOS/status/2112121339267965036");
    expect(p.sections.find((s) => s.id === "pp")!.table!.rows[0].cells[0]).toBe("Varios temas");
    expect(byPath("/elecciones/salario-minimo-1800-euros").sections.find((s) => s.id === "que")!.paragraphs.join(" ")).toMatch(/30h/);
  });
});
