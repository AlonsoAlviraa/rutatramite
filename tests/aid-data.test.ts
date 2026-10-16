import { describe, expect, it } from "vitest";
import { aidDataset, aidCsv, csvCell, aidDatasetJsonLd } from "@/lib/aid-data";
import { AIDS } from "@/lib/ayudas";
import { GET as jsonGet } from "@/app/datos/ayudas.json/route";
import { GET as csvGet } from "@/app/datos/ayudas.csv/route";

describe("datos citables de ayudas", () => {
  it("conserva fuentes y separa generación de revisión", () => {
    const data = aidDataset(new Date("2026-09-14T12:00:00Z"));
    expect(data.records.length).toBe(AIDS.length);
    expect(new Set(data.records.map(r => r.id)).size).toBe(AIDS.length);
    for (const row of data.records) {
      const source = AIDS.find(a => a.id === row.id)!;
      expect(row.checked_at).toBe(source.checkedAt);
      expect(row.source_url).toBe(source.source.href);
      expect(row.guide_url).toBe("https://rutatramite.com" + source.path);
    }
    expect(data.generated_at).not.toBe(data.last_editorial_review);
  });
  it("no conserva solicitudes abiertas indefinidamente ni confunde normas con plazos", () => {
    const later = aidDataset(new Date("2026-10-01T12:00:00Z"));
    expect(later.records.find(r => r.id === "bono-madrid")?.status).toContain("pendiente de nueva revisión");
    expect(later.records.find(r => r.id === "colaboracion-2627")?.status).toBe("Solicitud cerrada");
    expect(later.records.find(r => r.id === "plan-vivienda")?.status).toContain("Norma publicada");
  });
  it("escapa celdas CSV y neutraliza fórmulas", () => {
    expect(csvCell('a,"b"\nc')).toBe('"a,""b""\nc"');
    expect(csvCell("=1+1")).toBe('"\'=1+1"');
    expect(csvCell(null)).toBe('""');
    const csv = aidCsv(new Date("2026-09-14T12:00:00Z"));
    expect(csv.startsWith('\uFEFF"id"')).toBe(true);
    expect(csv.split("\r\n").filter(Boolean)).toHaveLength(AIDS.length + 1);
  });
  it("ofrece JSON y CSV públicos con el mismo catálogo", async () => {
    const response = jsonGet();
    expect(response.status).toBe(200);
    expect(response.headers.get("content-type")).toContain("application/json");
    expect((await response.json()).records).toHaveLength(AIDS.length);
    const csv = csvGet();
    expect(csv.headers.get("content-type")).toContain("text/csv");
    expect(csv.headers.get("content-disposition")).toContain("attachment");
    expect(aidDatasetJsonLd()).toMatchObject({ "@type": "Dataset", url: "https://rutatramite.com/recursos" });
  });
});
