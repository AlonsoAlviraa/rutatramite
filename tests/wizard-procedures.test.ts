import { describe, expect, it } from "vitest";
import { loadIndex, loadMunicipio } from "@/lib/data/load";
import { runWizard } from "@/lib/wizard/engine";
import type { WizardAnswers } from "@/lib/types";

const answers: WizardAnswers = { ineCode: "28079", housing: "contrato", nacionalidad: "espanola", nieTie: false, menores: false, tramite: "alta" };

describe("asistente: documentos y evidencia del procedimiento solicitado", () => {
  it.each(["certificado", "volante"] as const)("%s no prescribe documentos de una nueva alta", (tramite) => {
    const result = runWizard({ ...answers, tramite }, loadMunicipio("28079"));
    expect(result.primary).toBe("volante-vs-certificado");
    expect(result.checklist.join(" ")).not.toMatch(/Hoja padronal|Contrato de alquiler completo|mayores de edad que se empadronan|uso de la vivienda/);
    expect(result.checklist.join(" ")).toMatch(/identidad|Identifícate/);
  });
  it("desconocer documentos locales no acredita que el municipio no los publique", () => {
    const result = runWizard(answers, loadMunicipio("30024"));
    expect(result.checklist.join(" ")).not.toContain("no ha publicado documentos extra");
    expect(result.checklist.join(" ")).toMatch(/pendiente|no hemos comprobado/i);
  });
  it("el índice del asistente conserva la revisión de Barcelona y la laguna de Gijón", () => {
    const row = loadIndex().find(m => m.ine_code === "08019")!;
    expect(runWizard(answers, row).confidence).toBe("official");
    expect(runWizard(answers, loadIndex().find(m => m.ine_code === "33024")!).confidence).toBe("unverified");
    expect(runWizard(answers, loadIndex().find(m => m.ine_code === "28079")!).confidence).toBe("official");
  });
  it("la renovación no entrega la checklist de alta ni se presenta como aplicable a españoles", () => {
    const result = runWizard({ ...answers, tramite: "renovacion" }, loadMunicipio("28079"));
    expect(result.checklist.join(" ")).not.toMatch(/Hoja padronal|Contrato de alquiler completo/);
    expect(result.checklist.join(" ")).toMatch(/no corresponde|no se aplica/);
  });
});
