/**
 * Enlaces relacionados desde páginas con impresiones hacia guías sin impresiones y con pocos enlaces internos
 * (vault RutaTrámite, 02-SEO/Enlazado.md, snapshot 2026-10-10). Solo rutas existentes del catálogo.
 */
export const RELATED_LINKS: Record<string, string[]> = {
  "/dni": ["/dni/consultar-cita", "/dni/urgente-sin-cita", "/dni/a-que-hora-se-liberan-citas", "/dni/caducado-multa", "/dni/caducado-banco"],
  "/pasaporte": ["/pasaporte/caducado-sin-cita", "/pasaporte/salvoconducto", "/pasaporte/renovar-antes-caducar"],
  "/becas": ["/becas/apoyo-educativo", "/becas/muface"],
  "/extranjeria": ["/extranjeria/arraigo-padron", "/extranjeria/no-hay-citas", "/extranjeria/certificado-digital-nie", "/extranjeria/autorizacion-regreso-navidad"],
};
