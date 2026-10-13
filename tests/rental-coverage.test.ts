import { describe, expect, it } from "vitest";
import { AIDS, aidStatus } from "@/lib/ayudas";
import { AID_TERRITORIES, aidCoverage, aidTerritory, filterAids } from "@/lib/aid-coverage";
import { aidDataset, aidCsv } from "@/lib/aid-data";

describe("reviewed regional rental references", () => {
  const now = new Date("2026-09-14T12:00:00Z");
  it("maps every regional record to a known territory and covers 17 communities", () => {
    for (const a of AIDS.filter(a => a.territorySlug)) expect(AID_TERRITORIES.map(t => t.slug)).toContain(aidTerritory(a));
    const rental = aidCoverage().filter(c => c.category === "alquiler-joven");
    expect(rental).toHaveLength(17);
    for (const row of rental) {
      expect(row.coverage).toBe("referencia_autonomica");
      expect(row.sources.length).toBeGreaterThan(0);
      expect(row.note).toContain("no acredita");
    }
  });
  it("does not leak regional records into another community's filtered results", () => {
    const filtered = filterAids(AIDS, { territory: "illes-balears", category: "alquiler" }, now);
    expect(filtered.map(a => a.id)).toContain("bono-baleares-2026");
    expect(filtered.some(a => a.territorySlug && a.territorySlug !== "illes-balears")).toBe(false);
    expect(filtered.map(a => a.id)).toContain("plan-vivienda");
  });
  it("keeps the Valencian and early Extremadura closures out of initial applications", () => {
    const open = filterAids(AIDS, { phase: "solicitud" }, now).map(a => a.id);
    expect(open).not.toContain("bono-valenciana-2026");
    expect(open).not.toContain("bono-extremadura-2026");
    expect(open).toContain("bono-baleares-2026");
  });
  it("preserves calendar date precision and closes after the local final day", () => {
    const a = { ...AIDS.find(a => a.id === "bono-baleares-2026")!, checkedAt: "2026-09-30" };
    expect(aidStatus(a, new Date("2026-09-30T21:59:00Z"))).toContain("comprobar hora");
    const after = new Date("2026-09-30T22:00:00Z");
    expect(aidStatus(a, after)).toBe("Solicitud cerrada");
    expect(filterAids([a], { phase: "solicitud" }, after)).toHaveLength(0);
    const record = aidDataset(after).records.find(r => r.id === a.id)!;
    expect(record.phase).toBe("cerrada");
    expect(record.closes_at).toBeNull();
    expect(record.closes_on).toBe("2026-09-30");
  });
  it("exports the Andalusian quota closure as a day without inventing a closing time", () => {
    const checked = new Date("2026-09-16T12:00:00Z");
    const record = aidDataset(checked).records.find(r => r.id === "bono-andalucia")!;
    expect(record.phase).toBe("cerrada");
    expect(record.closes_on).toBe("2026-06-22");
    expect(record.closes_at).toBeNull();
    const row = aidCsv(checked).split("\r\n").find(line => line.startsWith('"bono-andalucia",'))!;
    expect(row).toContain('"2026-06-22"');
    expect(row).not.toContain("2026-06-22T");
    expect(aidDataset(checked).records.find(r => r.id === "bono-catalunya")?.closes_at).toBe("2026-03-13T14:00:00+01:00");
  });
});
