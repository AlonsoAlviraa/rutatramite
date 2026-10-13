import { describe, expect, it } from "vitest";
import { renderGuideHtml } from "@/lib/render/server";

describe("Youth transport products: eligibility and scope", () => {
  const path = "/transporte/abono-joven-estudiante";

  it("separates Madrid residence and age requirements from Barcelona T-jove", () => {
    const html = renderGuideHtml(path);
    expect(html).toContain("de 15 a 25 años");
    expect(html).toContain("Las familias numerosas están exceptuadas");
    expect(html).toContain("se permite autorizar la consulta de padrón");
    expect(html).toContain("T-jove para menores de 30");
    expect(html).toContain("seguir utilizándola hasta su caducidad");
    expect(html).not.toContain("Lo que comparten casi todos");
  });

  it("does not terminate the national youth fare on the 26th birthday", () => {
    const html = renderGuideHtml(path);
    expect(html).toContain("1 de enero de 2000 y el 31 de diciembre de 2026");
    expect(html).toContain("residencia legal en España");
    expect(html).toContain("ya haya cumplido 26 sigue dentro");
    expect(html).toContain("Jóvenes y Niños, 30 euros");
    expect(html).not.toContain("el abono único estatal de menos de 26");
  });

  it("distinguishes registration, issuance, journey validation and voluntary integration", () => {
    const html = renderGuideHtml(path);
    expect(html).toContain("al menos 24 horas antes");
    expect(html).toContain("Obtener el código no equivale a tener un abono emitido");
    expect(html).toContain("adhesión voluntaria");
    expect(html).toContain("determinadas relaciones Avant expresamente listadas");
    expect(html).toContain("Solo se permite un Abono Único activo por persona");
    expect(html).not.toContain("los consorcios suelen avisar en su app");
  });
});
