/**
 * Enlaces relacionados desde páginas con impresiones hacia guías sin impresiones y con pocos enlaces internos
 * (vault RutaTrámite, 02-SEO/Enlazado.md, snapshot 2026-10-10). Solo rutas existentes del catálogo.
 * 2026-10-17: enlaces cruzados a guías prioritarias sin indexar (inspección GSC del 2026-10-17).
 */
export const RELATED_LINKS: Record<string, string[]> = {
  "/elecciones/mesa-electoral-vivo-fuera": ["/elecciones/modelo-escrito-excusa-mesa-electoral", "/elecciones/excusa-mesa-electoral", "/elecciones/mesa-electoral-casos-especiales"],
  "/elecciones/mesa-electoral-examen-estudiante": ["/elecciones/modelo-escrito-excusa-mesa-electoral", "/elecciones/excusa-mesa-electoral", "/elecciones/mesa-electoral-casos-especiales"],
  "/elecciones/mesa-electoral-trabajo-fuera": ["/elecciones/modelo-escrito-excusa-mesa-electoral", "/elecciones/excusa-mesa-electoral", "/elecciones/mesa-electoral-casos-especiales"],
  "/elecciones/mesa-electoral-cuidado-familiar-dependiente": ["/elecciones/modelo-escrito-excusa-mesa-electoral", "/elecciones/excusa-mesa-electoral", "/elecciones/mesa-electoral-casos-especiales"],
  "/elecciones/mesa-electoral-hijos-pequenos": ["/elecciones/modelo-escrito-excusa-mesa-electoral", "/elecciones/excusa-mesa-electoral", "/elecciones/mesa-electoral-casos-especiales"],
  "/elecciones/excusa-mesa-electoral": ["/elecciones/modelo-escrito-excusa-mesa-electoral", "/elecciones/excusa-mesa-electoral-denegada", "/elecciones/mesa-electoral-casos-especiales", "/elecciones/mesa-electoral-vivo-fuera", "/elecciones/mesa-electoral-examen-estudiante", "/elecciones/mesa-electoral-trabajo-fuera"],
  "/elecciones/sorteo-mesa-electoral-29n": ["/elecciones/suplente-mesa-electoral", "/elecciones/modelo-escrito-excusa-mesa-electoral"],
  "/elecciones/horario-mesa-electoral": ["/elecciones/primero-en-votar-mesa-electoral", "/elecciones/mesa-electoral-casos-especiales"],
  "/elecciones/que-pasa-si-no-voy-a-la-mesa": ["/elecciones/suplente-mesa-electoral", "/elecciones/excusa-mesa-electoral-denegada", "/elecciones/primero-en-votar-mesa-electoral"],
  "/elecciones/como-votar-el-dia-29": ["/elecciones/primero-en-votar-mesa-electoral"],
  "/elecciones/cuando-se-cobra-la-dieta-de-mesa": ["/elecciones/suplente-mesa-electoral"],
  "/elecciones/voluntario-mesa-electoral": ["/elecciones/primero-en-votar-mesa-electoral", "/elecciones/suplente-mesa-electoral"],
  "/elecciones/salario-minimo-1800-euros": ["/trabajo/salario-minimo-irpf-2026", "/elecciones/feijoo-cadena-ser-29n"],
  "/elecciones/sanchez-la-revuelta-29n": ["/elecciones/feijoo-cadena-ser-29n", "/trabajo/salario-minimo-irpf-2026"],
  "/elecciones/deflactar-irpf-que-significa": ["/trabajo/salario-minimo-irpf-2026", "/trabajo/verifactu-obligatorio-1-enero-2027"],
  "/dni": ["/dni/consultar-cita", "/dni/urgente-sin-cita", "/dni/a-que-hora-se-liberan-citas", "/dni/caducado-multa", "/dni/caducado-banco", "/elecciones/dni-caducado-votar"],
  "/pasaporte": ["/pasaporte/caducado-sin-cita", "/pasaporte/salvoconducto", "/pasaporte/renovar-antes-caducar"],
  "/becas": ["/becas/apoyo-educativo", "/becas/muface", "/ayudas-por-gobierno/estudiantes", "/comedor/beca-comedor-2026-2027", "/alquiler/bono-alquiler-joven"],
  "/extranjeria": ["/extranjeria/arraigo-padron", "/extranjeria/no-hay-citas", "/extranjeria/certificado-digital-nie", "/extranjeria/autorizacion-regreso-navidad"],
  "/colegio": ["/justificante-ausencia-escolar", "/autorizacion-recogida-colegio", "/comedor/beca-comedor-2026-2027"],
  "/comedor": ["/becas/mec/plazo", "/becas/mec/cuando-se-cobra", "/colegio/cambiar-de-colegio-fuera-de-plazo"],
  "/alquiler": ["/alquiler/caso-maricarmen-desahucio", "/empadronarse/me-quieren-cobrar", "/hacienda/modelo-030"],
  "/modelos": ["/hacienda/modelo-030", "/trabajo/verifactu-obligatorio-1-enero-2027", "/colegio/cambiar-de-colegio-fuera-de-plazo"],
  "/elecciones/diputados-por-provincia-29n": ["/elecciones/mapa-voto-util-29n", "/elecciones/voto-util-29n", "/elecciones/cuanto-vale-tu-voto-por-provincia-29n", "/elecciones/como-se-reparten-los-escanos"],
  "/elecciones/debate-electoral-29n": ["/elecciones/agenda-mitines-29n", "/elecciones/podcasts-entrevistas-candidatos-29n", "/elecciones/sanchez-la-revuelta-29n"],
  "/elecciones/campana-y-precampana": ["/elecciones/agenda-mitines-29n", "/elecciones/podcasts-entrevistas-candidatos-29n"],
  "/elecciones": ["/elecciones/suplente-mesa-electoral", "/elecciones/primero-en-votar-mesa-electoral", "/elecciones/feijoo-cadena-ser-29n", "/elecciones/mapa-voto-util-29n", "/elecciones/voto-util-29n", "/elecciones/agenda-mitines-29n", "/elecciones/podcasts-entrevistas-candidatos-29n", "/elecciones/sanchez-la-revuelta-29n", "/elecciones/cuanto-vale-tu-voto-por-provincia-29n", "/trabajo/huelga-general-11-noviembre", "/alquiler/caso-maricarmen-desahucio", "/elecciones/debate-electoral-29n", "/elecciones/sorteo-mesa-electoral-29n", "/elecciones/candidaturas-29n-boe", "/elecciones/cuando-habra-gobierno-29n", "/dni/consultar-cita", "/dni/urgente-sin-cita"],
  "/trabajo": ["/trabajo/carta-revalorizacion-pensiones-2027", "/trabajo/regularizacion-cuotas-autonomos-notificacion", "/trabajo/nomina-enero-2027", "/trabajo/donativos-desgravar-antes-31-diciembre", "/trabajo/autonomos-cambio-base-cotizacion-2027", "/trabajo/verifactu-obligatorio-1-enero-2027", "/trabajo/salario-minimo-irpf-2026", "/trabajo/huelga-general-11-noviembre", "/autorizacion-representacion-tramite", "/elecciones/salario-minimo-1800-euros"],
  "/elecciones/promesas": ["/elecciones/promesas-incumplidas", "/elecciones/encuestas-29n", "/elecciones/programas-electorales-29n", "/elecciones/debate-electoral-29n", "/elecciones/salario-minimo-1800-euros", "/elecciones/iva-vivienda-4-por-ciento"],
};
