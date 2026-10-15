import { describe, it, expect } from "vitest";
import { ALL_GUIDES, getGuideByPath } from "@/lib/tramites/catalog";
import { aidCoverage, filterAids, AID_TERRITORIES } from "@/lib/aid-coverage";
import { AIDS } from "@/lib/ayudas";
describe("plan editorial regressions",()=>{
  it("does not deny online document-fee payment in any travel guide",()=>{
    for (const g of ALL_GUIDES.filter(g=>g.pack==="viaje")) expect(JSON.stringify(g),g.path).not.toMatch(/ninguna se paga al reservar|tasa se paga al recoger|tasa.*solo.*recog/);
    expect(JSON.stringify(getGuideByPath("/dni/consultar-cita"))).toContain("telemática");
  });
  it("states the passport renewal window and avoids unsupported rankings",()=>{
    const guide=getGuideByPath("/pasaporte/renovar-antes-caducar")!;
    expect(guide.lead).toContain("12 meses");
    expect(JSON.stringify(getGuideByPath("/pasaporte/salvoconducto"))).not.toContain("causa número uno");
  });
  it("makes all 17 territories and four categories explicit",()=>{
    expect(AID_TERRITORIES).toHaveLength(17);
    expect(aidCoverage()).toHaveLength(68);
    expect(aidCoverage().find(r=>r.territory_slug==="aragon" && r.category==="alquiler-joven")?.coverage).toBe("referencia_autonomica");
    expect(AIDS.find(a=>a.id==="bono-aragon-2025")?.phase).toBe("cerrada");
    expect(aidCoverage().find(r=>r.territory_slug==="cataluna" && r.category==="mec")?.note).toContain("catalana");
  });
  it("filters closed deadlines at the official hour and preserves empty results",()=>{
    const before=filterAids(AIDS,{phase:"solicitud",category:"becas"},new Date("2026-09-22T12:59:59Z"));
    const after=filterAids(AIDS,{phase:"solicitud",category:"becas"},new Date("2026-09-22T13:00:00Z"));
    expect(before.map(a=>a.id)).toContain("colaboracion-2627");
    expect(after).toEqual([]);
    expect(filterAids(AIDS,{territory:"aragon",category:"alquiler",phase:"solicitud"},new Date("2026-09-14T12:00:00Z"))).toEqual([]);
  });
});
