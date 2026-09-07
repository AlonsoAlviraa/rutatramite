import fs from "node:fs";
import path from "node:path";
import { describe, expect, it } from "vitest";
import { loadIndex, loadMunicipio } from "@/lib/data/load";
import { detectCaso, runWizard } from "@/lib/wizard/engine";

const MADRID_ALTA = {
  ineCode: "28079",
  housing: "no-contrato" as const,
  nacionalidad: "resto" as const,
  nieTie: false,
  menores: true,
  tramite: "alta" as const,
};

describe("wizard engine (shipped module)", () => {
  it("Madrid + sin contrato + resto + sin TIE + menores + alta", () => {
    const madrid = loadMunicipio("28079");
    const detected = detectCaso(MADRID_ALTA);
    expect(detected.primary).toBe("sin-contrato");
    expect(detected.extras).toContain("extranjeros-no-ue");
    expect(detected.extras).toContain("menores");
    const result = runWizard(MADRID_ALTA, madrid);
    expect(result.checklist.length).toBeGreaterThan(3);
    expect(result.sedeUrl).toContain("sede.madrid.es");
    expect(result.citaUrl).toBeTruthy();
    expect(madrid.cita_url).toBeTruthy();
    expect(result.municipioPath).toBe("/empadronarse/comunidad-de-madrid/madrid/madrid");
    expect(result.checklist.join(" ")).toMatch(/pasaporte/i);
  });

  it("runWizard on the client index row (what Wizard.tsx passes) includes 28079 docs_extra", () => {
    const full = loadMunicipio("28079");
    expect(full.docs_extra.length).toBeGreaterThan(0);
    const index = loadIndex();
    const row = index.find((m) => m.ine_code === "28079");
    expect(row).toBeTruthy();
    expect("tasa_alta" in (row as object)).toBe(false);
    expect(row!.docs_extra).toEqual(full.docs_extra);
    const result = runWizard(MADRID_ALTA, row!);
    const joined = result.checklist.join("\n");
    for (const extra of full.docs_extra) {
      expect(joined, extra).toContain(extra);
    }
    expect(joined).not.toContain("Este municipio no ha publicado documentos extra");
    expect(result.sedeUrl).toContain("sede.madrid.es");
    expect(result.citaUrl).toBe(full.cita_url);
  });

  it("cita CTA only if cita_url is set", () => {
    const madrid = loadMunicipio("28079");
    const withCita = runWizard(
      {
        ineCode: madrid.ine_code,
        housing: "contrato",
        nacionalidad: "espanola",
        nieTie: true,
        menores: false,
        tramite: "alta",
      },
      madrid,
    );
    expect(withCita.citaUrl).toBe(madrid.cita_url);
    const clone = { ...madrid, cita_url: null };
    const without = runWizard(
      {
        ineCode: madrid.ine_code,
        housing: "contrato",
        nacionalidad: "espanola",
        nieTie: true,
        menores: false,
        tramite: "alta",
      },
      clone,
    );
    expect(without.citaUrl).toBeNull();
  });

  it("wizard module does not POST identity fields", () => {
    const files = [
      "src/lib/wizard/engine.ts",
      "src/components/empadronamiento/Wizard.tsx",
      "src/components/empadronamiento/MunicipioTypeahead.tsx",
    ];
    for (const f of files) {
      const src = fs.readFileSync(path.join(process.cwd(), f), "utf8");
      expect(src).not.toMatch(/fetch\s*\(/);
      expect(src).not.toMatch(/XMLHttpRequest/);
      expect(src).not.toMatch(/navigator\.sendBeacon/);
      expect(src).not.toMatch(/name=["']dni["']/i);
      expect(src).not.toMatch(/name=["']pasaporte["']/i);
      expect(src).not.toMatch(/type=["']file["']/);
      expect(src).not.toMatch(/name=["']address["']/i);
      expect(src).not.toMatch(/<input[^>]+type=["']file["']/);
    }
  });
});
