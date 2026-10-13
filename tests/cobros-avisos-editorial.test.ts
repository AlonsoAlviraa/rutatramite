import { readFileSync } from "node:fs";
import { describe, expect, it } from "vitest";
import { COBROS_AVISOS_GUIDES } from "@/lib/tramites/cobros-avisos";
import { getGuideByPath } from "@/lib/tramites/catalog";
import { renderLlmsTxt } from "@/lib/seo/llms";
import { renderGuideHtml } from "@/lib/render/server";

const SEVILLA =
  "https://www.sevilla.org/servicios/empadronamiento/informacion-cambio-en-el-padron-de-habitantes-de-sevilla";
const INCIBE =
  "https://www.incibe.es/ciudadania/avisos/la-policia-nacional-no-esta-mandando-citaciones-para-que-regules-tu-expediente";

describe("cobros y avisos que no son el trámite", () => {
  it("separa el alta municipal de un anuncio y cita Sevilla y Córdoba", () => {
    const guide = getGuideByPath("/empadronarse/me-quieren-cobrar")!;
    const html = renderGuideHtml(guide.path);
    expect(guide.cta.href).toBe(SEVILLA);
    expect(html).toContain(SEVILLA);
    expect(html).toContain("https://www.boe.es/buscar/act.php?id=BOE-A-1985-5392#a15");
    expect(html).toContain("https://www.cordoba.es/sede/tramites/padron-de-habitantes/alta-o-inscripcion-y-traslado-de-domicilio-en-el-padron-municipal-de-habitantes");
    expect(html).toContain("El empadronamiento es gratuito");
    expect(html).toContain("Cualquier pago que le exijan para empadronarse es un FRAUDE");
    expect(html).toContain("Está sujeto a tasas");
    expect(html).toContain("escuela infantil");
    expect(html).not.toContain("gratuita en toda España");
    expect(html).not.toContain("tasa de alta es 0 €");
    expect(html).not.toContain("alta 0 €");
    expect(html).toContain("¿Me hacen pagar por empadronarme?");
    expect(html).toContain("¿Me añaden dinero al contrato por empadronarme?");
  });

  it("no anula la cláusula del contrato ni copia un importe", () => {
    const html = renderGuideHtml("/empadronarse/cobro-en-el-contrato");
    expect(html).toContain("no declara nula");
    expect(html).toContain("puede constituir un fraude de ley");
    expect(html).toContain("https://www.sevilla.org/servicios/servicio-de-estadistica/bajas-por-inscripcion-indebida-bajas-de-oficio/que-es-una-baja");
    expect(html).not.toMatch(/\d+\s*€/);
    expect(html).not.toContain("gratuita en toda España");
    expect(html).not.toContain("cómo alterar");
  });

  it("enlaza el aviso de INCIBE y la línea 017 sin describir el archivo", () => {
    const html = renderGuideHtml("/extranjeria/aviso-citacion-expediente");
    expect(html).toContain(INCIBE);
    expect(html).toContain("19 de diciembre de 2024");
    expect(html).toContain("017");
    expect(html).toContain("https://sede.policia.gob.es/portalCiudadano/_es/tramites_extranjeria_tasas.php");
    expect(html).not.toMatch(/\.hta|troyano|zip/i);
    expect(html).not.toMatch(/\d+\s*€/);
  });

  it("distingue el certificado gratuito de la vídeo identificación", () => {
    const html = renderGuideHtml("/extranjeria/certificado-quien-cobra");
    expect(html).toContain("https://www.sede.fnmt.gob.es/certificados/persona-fisica");
    expect(html).toContain("https://administracion.gob.es/tramites-electronicos/servicioselectronicosfrecuentes/obtencion-certificado-electronico-fnmt");
    expect(html).toContain("2,99 € más impuestos");
    expect(html).toContain("forma gratuita");
    expect(html).toContain('href="/extranjeria/certificado-digital-nie"');
  });

  it("limita la beca al recurso sin coste y no declara gratuita la solicitud", () => {
    const html = renderGuideHtml("/becas/cobro-al-presentar");
    expect(html).toContain("https://www.becaseducacion.gob.es/dudas.html");
    expect(html).toContain("no tiene coste para ti");
    expect(html).toContain("sí tendrá costes");
    expect(html).not.toMatch(/solicitud de la beca es gratuita/i);
    expect(html).not.toMatch(/presentar la solicitud sea gratuita/i);
  });

  it("lista las cinco guías en el llms.txt corto", () => {
    const short = renderLlmsTxt();
    const publicShort = readFileSync("public/llms.txt", "utf8");
    expect(publicShort).toBe(short);
    expect(short.split("\n").length).toBeLessThan(200);
    for (const guide of COBROS_AVISOS_GUIDES) {
      expect(short, guide.path).toContain(guide.path);
    }
    expect(COBROS_AVISOS_GUIDES).toHaveLength(5);
  });
});
