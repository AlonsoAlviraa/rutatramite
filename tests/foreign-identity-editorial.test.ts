import { describe, expect, it } from "vitest";
import { getGuideByPath } from "@/lib/tramites/catalog";
import { renderGuideHtml } from "@/lib/render/server";

describe("Foreign identity: distinguish procedures and supporting documents", () => {
  it("directs fingerprint appointments to the specific portal and requires the appropriate decision", () => {
    const guide = getGuideByPath("/extranjeria/cita-huellas-tie")!;
    const html = renderGuideHtml(guide.path);
    expect(guide.cta.href).toContain("/pagina/index/directorio/icpplus");
    expect(html).toContain("notificación favorable");
    expect(html).toContain("no una promesa de fabricación");
    expect(guide.related.some(link => link.href === "/extranjeria/huellas-que-llevar")).toBe(true);
    expect(html).not.toMatch(/Un 807 no es un hueco|sin huecos inventados|tasas 12 €/);
  });

  it("does not make pending renewal or unrecorded office customs into a TIE checklist", () => {
    const html = renderGuideHtml("/extranjeria/huellas-que-llevar");
    expect(html).toContain("no equivale a una resolución favorable");
    expect(html).toContain("si has cambiado de domicilio");
    expect(html).toContain("emitido hace menos de tres meses");
    expect(html).toContain("fondo blanco");
    expect(html).not.toMatch(/Cada comisaría tiene sus manías|dos copias de todo|tarjeta anterior o el resguardo|banco o por internet/);
  });

  it("does not infer universal receipt expiry or unrestricted proxy collection", () => {
    const html = renderGuideHtml("/extranjeria/tie-recogida-cuanto-tarda");
    expect(html).toContain("acreditar que es el destinatario");
    expect(html).toContain("no debe interpretarse como una caducidad universal");
    expect(html).not.toMatch(/\(y caduca\)|el criterio no es universal|pregunta antes qué representación o autorización acepta/);
  });

  it("separates EU registration categories and links EX-18 requirements", () => {
    const guide = getGuideByPath("/extranjeria/certificado-registro-ue")!;
    const html = renderGuideHtml(guide.path);
    expect(guide.cta.href).toContain("certificadoregistro_ciudadanoue");
    expect(html).toContain("tres meses desde tu entrada");
    expect(html).toContain("790 código 012");
    expect(html).toContain("Trabajo por cuenta ajena");
    expect(html).toContain("Sin actividad laboral");
    expect(html).toContain("Estudios:");
    expect(html).toContain("no garantiza una cita inmediata");
  });

  it("keeps NIF M eligibility distinct from nonresidency and census registration", () => {
    const guide = getGuideByPath("/extranjeria/nie-vs-nif")!;
    const html = renderGuideHtml(guide.path);
    expect(guide.cta.href).toContain("agenciatributaria.gob.es");
    expect(html).toContain("no a un NIE");
    expect(html).toContain("No es una vía reservada exclusivamente a no residentes");
    expect(html).toContain("dos meses para comunicarlo");
    expect(html).toContain("alta en el censo");
    expect(html).not.toMatch(/banco te abre la cuenta|Para quien vive en España con DNI, ambos coinciden/);
  });

  it("allows an existing NIE before EU registration and distinguishes proof of identity", () => {
    const html = renderGuideHtml("/extranjeria/nie-verde");
    expect(html).toContain("puede haber sido asignado antes");
    expect(html).toContain("no acredita la identidad por sí solo");
    expect(html).not.toMatch(/nace en ese trámite|verde A4|hoja verde en formato A4/);
  });
});
