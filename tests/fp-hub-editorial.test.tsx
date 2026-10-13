import { createElement } from "react";
import { renderToStaticMarkup } from "react-dom/server";
import { describe, expect, it } from "vitest";
import FpPage, { metadata } from "@/app/fp/page";

describe("hub de FP", () => {
  it("cita TodoFP y no fija un extraordinario de septiembre nacional", () => {
    const html = renderToStaticMarkup(createElement(FpPage));
    const lead = html.split("data-pack-grid")[0];
    expect(lead).toContain("https://www.todofp.es/comunes/faq.html#cla-0-09");
    expect(lead).toContain("https://www.todofp.es/sobre-fp/webs-fp-ccaa.html");
    expect(lead).toContain("la plaza se pide en las fechas de la convocatoria de cada comunidad");
    expect(lead).not.toContain("extraordinario de septiembre");
    expect(lead).not.toContain("matricularse en septiembre");
    expect(lead).not.toMatch(/\d+\s*€/);
    expect(metadata.title).toBe("FP: admisión, vacantes y convalidaciones");
    expect(metadata.description).toBe("Admisión en FP, vacantes, reservas y convalidaciones. El calendario lo marca la convocatoria de cada comunidad.");
    expect(String(metadata.title)).not.toContain("septiembre");
    expect(String(metadata.description)).not.toContain("septiembre");
  });
});
