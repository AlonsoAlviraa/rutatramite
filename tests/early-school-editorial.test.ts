import { describe, expect, it } from "vitest";
import { getGuideByPath } from "@/lib/tramites/catalog";
import { renderGuideHtml } from "@/lib/render/server";

describe("Early school: matching the application to its network and purpose", () => {
  it("uses the first-cycle sibling score and separates municipal admission", () => {
    const html = renderGuideHtml("/colegio/lista-espera-escuela-infantil");
    expect(html).toContain("2 puntos por hermanos ya matriculados");
    expect(html).toContain("La convocatoria autonómica excluye las escuelas de titularidad del Ayuntamiento de Madrid");
    expect(html).not.toContain("15 puntos");
    expect(html).not.toContain("la renta desempata");
  });

  it("retains municipal waiting lists and distinguishes late applications", () => {
    const html = renderGuideHtml("/colegio/lista-espera-escuela-infantil");
    expect(html).toContain("mantiene la lista de no admitidos");
    expect(html).toContain("30 de mayo de 2027");
    expect(html).toContain("tras agotarse la lista ordinaria");
    expect(html).toContain("particularidad prevista para menores aún no nacidos");
    expect(html).not.toContain("para esas edades ya no hay cola");
    expect(html).not.toContain("Las renuncias de septiembre mueven las listas más que cualquier reclamación");
  });

  it("keeps financial aid distinct from activity registration", () => {
    const guide = getGuideByPath("/colegio/inscripcion-extraescolares-ayuntamiento")!;
    const html = renderGuideHtml(guide.path);
    expect(guide.reviewedAt).toBe("2026-09-16");
    expect(html).toContain("Estas fechas corresponden a la subvención");
    expect(html).toContain("no a un periodo general de inscripción en actividades");
    expect(html).toContain("15 de enero al 11 de febrero");
    expect(html).not.toContain("15 de septiembre al 8 de octubre");
  });

  it("preserves the scope of the Rivas draw and avoids automatic late admission", () => {
    const html = renderGuideHtml("/colegio/inscripcion-extraescolares-ayuntamiento");
    expect(html).toContain("del 8 al 14 de junio de 2026");
    expect(html).toContain("de los mismos días y horas");
    expect(html).toContain("no acredita que se hayan reabierto las de todas las concejalías");
    expect(html).toContain("No se entra automáticamente en una lista");
    expect(html).not.toContain("quien no se inscribe en fechas pasa a la lista de vacantes");
    expect(html).not.toContain("una segunda opción bien elegida es media plaza");
  });
});
