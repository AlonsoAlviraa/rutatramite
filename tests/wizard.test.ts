import fs from "node:fs";
import path from "node:path";
import { describe, expect, it } from "vitest";
import { loadIndex, loadMunicipio } from "@/lib/data/load";
import { detectCaso, runWizard } from "@/lib/wizard/engine";
import { visibleWizardAnswers } from "@/components/empadronamiento/Wizard";

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
    expect(detected.extras).toContain("casa-de-familiar");
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

  it("wizard result extras render human labels, not slugs", () => {
    const src = fs.readFileSync(path.join(process.cwd(), "src/components/empadronamiento/Wizard.tsx"), "utf8");
    expect(src).toContain("ESCENARIO_LABELS[s]");
    expect(src).not.toMatch(/extras\.map\(\(s\) => \([\s\S]*?>\s*\{s\}\s*</);
    expect(src).toContain("No está a mi nombre");
    expect(src).toContain("UE, EEE o Suiza");
    expect(src).toContain("skipNie");
    expect(src.match(/Paso \{/g)).toHaveLength(1);
    expect(src).not.toContain("respondidas");
    expect(src.match(/className="rt-progress/g)).toHaveLength(1);
    expect(src).toContain("data-wizard-answers");
    expect(src).toContain("visibleWizardAnswers(answers, municipio?.name ?? null)");
    const output = src.slice(src.indexOf('data-wizard-output=""'));
    expect(output).not.toMatch(/\{answers\.(housing|nacionalidad|tramite|nieTie|ineCode)\}/);
    const madrid = loadMunicipio("28079");
    const result = runWizard(
      {
        ineCode: madrid.ine_code,
        housing: "no-contrato",
        nacionalidad: "resto",
        nieTie: false,
        menores: true,
        tramite: "alta",
      },
      madrid,
    );
    expect(result.extras).toEqual(expect.arrayContaining(["extranjeros-no-ue", "menores"]));
    expect(result.extras).not.toContain(result.primary);
  });


  it("result answers are human text, omit NIE for Spanish nationality, and hide slugs", () => {
    const spanish = visibleWizardAnswers(
      {
        ineCode: "28079",
        housing: "no-contrato",
        nacionalidad: "espanola",
        nieTie: false,
        menores: true,
        tramite: "alta",
      },
      "Madrid",
    );
    expect(spanish).toEqual([
      { label: "Municipio", value: "Madrid" },
      { label: "Vivienda", value: "No está a mi nombre" },
      { label: "Nacionalidad", value: "Española" },
      { label: "Menores", value: "Sí" },
      { label: "Trámite", value: "Alta" },
    ]);
    const foreign = visibleWizardAnswers(
      {
        ineCode: "28079",
        housing: "sin-papeles",
        nacionalidad: "resto",
        nieTie: false,
        menores: false,
        tramite: "renovacion",
      },
      "Madrid",
    );
    expect(foreign.find((row) => row.label === "NIE o TIE")?.value).toBe("No");
    expect(foreign.find((row) => row.label === "Nacionalidad")?.value).toBe("Otra nacionalidad");
    expect(foreign.find((row) => row.label === "Vivienda")?.value).toBe("No tengo papeles de la casa");
    expect(foreign.find((row) => row.label === "Trámite")?.value).toBe("Renovación 2 años");
    const shown = [...spanish, ...foreign].flatMap((row) => [row.label, row.value]).join("\n");
    expect(shown).not.toMatch(/no-contrato|sin-papeles|espanola|\bresto\b|renovacion|nieTie|28079/);
    expect(visibleWizardAnswers(
      {
        ineCode: null,
        housing: null,
        nacionalidad: null,
        nieTie: null,
        menores: null,
        tramite: null,
      },
      "  ",
    )).toEqual([{ label: "Municipio", value: "Sin ficha en esta guía" }]);
  });

  it("wizard module does not POST identity fields", () => {
    const files = [
      "src/lib/wizard/engine.ts",
      "src/components/empadronamiento/Wizard.tsx",
      "src/components/empadronamiento/MunicipioTypeahead.tsx",
      "src/lib/wizard/loadClientIndex.ts",
    ];
    for (const f of files) {
      const src = fs.readFileSync(path.join(process.cwd(), f), "utf8");
      expect(src).not.toMatch(/XMLHttpRequest/);
      expect(src).not.toMatch(/navigator\.sendBeacon/);
      expect(src).not.toMatch(/name=["']dni["']/i);
      expect(src).not.toMatch(/name=["']pasaporte["']/i);
      expect(src).not.toMatch(/type=["']file["']/);
      expect(src).not.toMatch(/name=["']address["']/i);
      expect(src).not.toMatch(/<input[^>]+type=["']file["']/);
      expect(src).not.toMatch(/method:\s*["']POST["']/);
    }
    const wizard = fs.readFileSync(path.join(process.cwd(), "src/components/empadronamiento/Wizard.tsx"), "utf8");
    expect(wizard).not.toMatch(/fetch\s*\(/);
    const loader = fs.readFileSync(path.join(process.cwd(), "src/lib/wizard/loadClientIndex.ts"), "utf8");
    expect(loader).toContain('fetch("/api/municipios-index")');
  });
});
