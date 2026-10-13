import { describe, expect, it } from "vitest";
import { getGuideByPath } from "@/lib/tramites/catalog";
import { renderGuideHtml } from "@/lib/render/server";

describe("FP admission and ESO enrollment: scoped official rules", () => {
  it("does not require foreign-study recognition to enter a course of ESO", () => {
    const guide = getGuideByPath("/fp/documentos-matricula-eso")!;
    const html = renderGuideHtml(guide.path);
    expect(guide.lead).toContain("no debe tramitar homologación o convalidación");
    expect(guide.cta.href).toContain("educacionfpydeportes.gob.es");
    expect(html).not.toMatch(/lo que se pide es la homologación|cualquier instituto, con ligeras variantes|añade semanas/);
  });

  it("distinguishes ministerial and school convalidation deadlines and attendance", () => {
    const html = renderGuideHtml("/fp/convalidaciones-fp");
    expect(html).toContain("desde el comienzo hasta el final del curso escolar");
    expect(html).toContain("primeros quince días lectivos");
    expect(html).toContain("diez días lectivos desde la matrícula");
    expect(html).toContain("mantienen la asistencia a las actividades obligatorias");
    expect(html).not.toMatch(/el plazo es el de la matrícula|No esperes a noviembre|puede permitirte asistir/);
  });

  it("distinguishes reservation from enrollment without denying all remedies", () => {
    const html = renderGuideHtml("/fp/reserva-de-plaza-fp");
    expect(html).toContain("primera adjudicación");
    expect(html).toContain("segunda adjudicación");
    expect(html).toContain("alegación o recurso");
    expect(html).toContain("reserva mínima del 5 %");
    expect(html).not.toMatch(/sin reclamación posible|no la reclamación|pico final|plaza bloqueada a tu nombre/);
  });

  it("does not interpret the extraordinary enrollment window as open admission", () => {
    const html = renderGuideHtml("/fp/matricula-fp-en-septiembre");
    expect(html).toContain("solicitud extraordinaria del 2 al 4 de septiembre");
    expect(html).toContain("matrícula del 15 al 18");
    expect(html).toContain("corresponde a quienes han obtenido plaza");
    expect(html).not.toMatch(/2\.931|casi 3\.000|cada centro puede admitir directamente|suelen cerrar más tarde/);
  });

  it("uses a concrete transfer procedure and preserves its territorial conditions", () => {
    const guide = getGuideByPath("/fp/cambiar-de-instituto-a-mitad-de-curso")!;
    const html = renderGuideHtml(guide.path);
    expect(guide.cta.href).toContain("doe.juntaex.es");
    expect(html).toContain("manteniendo modalidad y turno");
    expect(html).toContain("mes antes de la evaluación final ordinaria");
    expect(html).toContain("No traslades sus fechas o su formulario a otra comunidad");
    expect(html).not.toMatch(/no admiten cambios por preferencia|archivo directo|ahorra semanas/);
  });
});
