/**
 * Enlaces relacionados desde páginas con impresiones hacia guías sin impresiones y con pocos enlaces internos
 * (vault RutaTrámite, 02-SEO/Enlazado.md, snapshot 2026-10-10). Solo rutas existentes del catálogo.
 * 2026-10-17: enlaces cruzados a guías prioritarias sin indexar (inspección GSC del 2026-10-17).
 */
export const RELATED_LINKS: Record<string, string[]> = {
  "/dni": ["/dni/consultar-cita", "/dni/urgente-sin-cita", "/dni/a-que-hora-se-liberan-citas", "/dni/caducado-multa", "/dni/caducado-banco", "/elecciones/dni-caducado-votar"],
  "/pasaporte": ["/pasaporte/caducado-sin-cita", "/pasaporte/salvoconducto", "/pasaporte/renovar-antes-caducar"],
  "/becas": ["/becas/apoyo-educativo", "/becas/muface", "/ayudas-por-gobierno/estudiantes", "/comedor/beca-comedor-2026-2027", "/alquiler/bono-alquiler-joven"],
  "/extranjeria": ["/extranjeria/arraigo-padron", "/extranjeria/no-hay-citas", "/extranjeria/certificado-digital-nie", "/extranjeria/autorizacion-regreso-navidad"],
  "/colegio": ["/justificante-ausencia-escolar", "/autorizacion-recogida-colegio", "/comedor/beca-comedor-2026-2027"],
  "/comedor": ["/becas/mec/plazo", "/becas/mec/cuando-se-cobra", "/colegio/cambiar-de-colegio-fuera-de-plazo"],
  "/alquiler": ["/alquiler/caso-maricarmen-desahucio", "/empadronarse/me-quieren-cobrar", "/hacienda/modelo-030"],
  "/modelos": ["/hacienda/modelo-030", "/colegio/cambiar-de-colegio-fuera-de-plazo"],
  "/elecciones/diputados-por-provincia-29n": ["/elecciones/voto-util-29n", "/elecciones/cuanto-vale-tu-voto-por-provincia-29n", "/elecciones/como-se-reparten-los-escanos"],
  "/elecciones/debate-electoral-29n": ["/elecciones/agenda-mitines-29n", "/elecciones/podcasts-entrevistas-candidatos-29n", "/elecciones/sanchez-la-revuelta-29n"],
  "/elecciones/campana-y-precampana": ["/elecciones/agenda-mitines-29n", "/elecciones/podcasts-entrevistas-candidatos-29n"],
  "/elecciones": ["/elecciones/voto-util-29n", "/elecciones/agenda-mitines-29n", "/elecciones/podcasts-entrevistas-candidatos-29n", "/elecciones/sanchez-la-revuelta-29n", "/elecciones/cuanto-vale-tu-voto-por-provincia-29n", "/trabajo/huelga-general-11-noviembre", "/alquiler/caso-maricarmen-desahucio", "/elecciones/debate-electoral-29n", "/elecciones/sorteo-mesa-electoral-29n", "/elecciones/candidaturas-29n-boe", "/elecciones/cuando-habra-gobierno-29n", "/dni/consultar-cita", "/dni/urgente-sin-cita"],
  "/trabajo": ["/trabajo/huelga-general-11-noviembre", "/autorizacion-representacion-tramite", "/elecciones/salario-minimo-1800-euros"],
  "/elecciones/promesas": ["/elecciones/promesas-incumplidas", "/elecciones/encuestas-29n", "/elecciones/programas-electorales-29n", "/elecciones/debate-electoral-29n", "/elecciones/salario-minimo-1800-euros", "/elecciones/iva-vivienda-4-por-ciento"],
};
