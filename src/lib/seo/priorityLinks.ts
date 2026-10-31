/**
 * Bloque «Respuestas rápidas» de la portada: guías útiles que aún tienen pocos enlaces internos
 * y no estaban indexadas en la inspección de Search Console del 2026-10-17
 * (vault RutaTrámite, 02-SEO/Auditorias/2026-10-17). Solo rutas existentes del sitemap.
 */
export type PriorityLinkGroup = { title: string; links: { href: string; label: string }[] };

export const HOME_PRIORITY_LINKS: PriorityLinkGroup[] = [
  {
    title: "Becas y comedor",
    links: [
      { href: "/comedor/beca-comedor-2026-2027", label: "Beca de comedor 2026/27: fechas por comunidad" },
      { href: "/becas/mec/plazo", label: "Plazo de la beca MEC 2026-27" },
      { href: "/becas/mec/estado", label: "Consultar el estado de la beca MEC" },
      { href: "/becas/mec/cuando-se-cobra", label: "Cuándo se cobra la beca MEC" },
      { href: "/becas/mec/modificar-datos", label: "Modificar datos de la solicitud MEC" },
    ],
  },
  {
    title: "Alquiler",
    links: [
      { href: "/alquiler/bono-alquiler-joven", label: "Bono Alquiler Joven por comunidad" },
      { href: "/alquiler/plan-vivienda-2026-2030", label: "Plan de Vivienda 2026-2030" },
      { href: "/alquiler/ayudas-por-comunidad", label: "Ayudas al alquiler por comunidad" },
    ],
  },
  {
    title: "Padrón y cambio de domicilio",
    links: [
      { href: "/empadronarse/casa-de-familiar", label: "Empadronarse en casa de un familiar" },
      { href: "/empadronarse/cita-previa-madrid", label: "Cita previa del padrón en Madrid" },
      { href: "/empadronarse/me-quieren-cobrar", label: "Me quieren cobrar por empadronarme" },
      { href: "/hacienda/modelo-030", label: "Modelo 030 para cambiar el domicilio en Hacienda" },
    ],
  },
  {
    title: "DNI y pasaporte",
    links: [
      { href: "/dni/consultar-cita", label: "Consultar o anular la cita del DNI" },
      { href: "/dni/no-hay-citas", label: "No hay citas para el DNI" },
      { href: "/dni/urgente-sin-cita", label: "DNI urgente sin cita" },
      { href: "/pasaporte/urgente", label: "Pasaporte urgente" },
      { href: "/pasaporte/caducado-sin-cita", label: "Pasaporte caducado sin cita" },
      { href: "/pasaporte/renovar-antes-caducar", label: "Renovar el pasaporte antes de que caduque" },
    ],
  },
  {
    title: "Elecciones del 29-N",
    links: [
      { href: "/elecciones/pedir-voto-por-correo-por-internet", label: "Pedir el voto por correo por internet" },
      { href: "/elecciones/enviar-voto-por-correo", label: "Cómo enviar el voto por correo" },
      { href: "/elecciones/miembro-de-mesa", label: "Me ha tocado mesa electoral" },
      { href: "/elecciones/voto-residentes-extranjero-cera", label: "Votar desde el extranjero (CERA)" },
    ],
  },
  {
    title: "Extranjería",
    links: [
      { href: "/extranjeria/cita-huellas-tie", label: "Cita de huellas para la TIE" },
      { href: "/extranjeria/tie-caducada-viajar", label: "Viajar con la TIE caducada" },
      { href: "/extranjeria/certificado-registro-ue", label: "Certificado de registro UE (EX-18)" },
    ],
  },
  {
    title: "Colegio y escritos",
    links: [
      { href: "/colegio/cambiar-de-colegio-fuera-de-plazo", label: "Plaza escolar fuera de plazo" },
      { href: "/justificante-ausencia-escolar", label: "Justificar una ausencia escolar" },
      { href: "/autorizacion-recogida-colegio", label: "Autorizar a otra persona a recoger a un menor" },
      { href: "/autorizacion-representacion-tramite", label: "Autorizar a alguien para un trámite" },
    ],
  },
];
