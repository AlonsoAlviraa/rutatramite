import { describe, it, expect } from "vitest";
import { loadMunicipio, loadIndex } from "@/lib/data/load";
import { isFichaIndexable } from "@/lib/seo/localSignals";
import { padronDataset, padronCsv } from "@/lib/padron-data";
describe("municipal evidence", () => {
  it("does not substitute populated fields for procedural evidence", () => {
    const m = loadMunicipio("28079");
    expect(isFichaIndexable(m)).toBe(true);
    expect(isFichaIndexable({ ...m, evidence: {} })).toBe(false);
    expect(isFichaIndexable({ ...m, evidence: { ...m.evidence, canal: { source_url: "https://example.org/unread", checked_at: "2026-09-14" } } })).toBe(false);
  });
  it("uses the same verification for browser index and municipal page", () => {
    for (const entry of loadIndex()) expect(entry.local_verified, entry.name).toBe(isFichaIndexable(loadMunicipio(entry.ine_code)));
  });
  it("exports all selected municipalities and preserves unknown values", () => {
    const data = padronDataset();
    expect(data.records).toHaveLength(21);
    expect(new Set(data.records.map(r => r.ine_code)).size).toBe(21);
    for (const r of data.records) {
      expect(padronCsv()).toContain(r.ine_code);
      if (r.review_status === "verificado") for (const k of ["alta","docs_extra","canal"]) expect(r.evidence[k].source_url).toBeTruthy();
    }
    const pending = data.records.find(r=>r.ine_code === "33024")!;
    expect(pending.online).toBe("unknown");
    expect(pending.review_status).toBe("pendiente");
  });
});
