import rentalReviews from "../../data/rental-aid-reviews.json";

export type Aid = {
  id: string;
  name: string;
  category: "becas" | "alquiler";
  territory: string;
  territorySlug?: string;
  phase: "solicitud" | "modificacion" | "cerrada" | "normativa";
  checkedAt: string;
  opensAt?: string;
  closesAt?: string;
  /** Calendar dates when the source does not specify an exact closing time. */
  opensOn?: string;
  closesOn?: string;
  deadline: string;
  summary: string;
  path: string;
  source: { href: string; label: string };
};

export const AID_SOURCES = {
  ministry: { href: "https://www.becaseducacion.gob.es/novedades", label: "Ministerio: novedades de becas" },
  neae: { href: "https://www.becaseducacion.gob.es/becas-y-ayudas/ayudas-apoyo-educativo/como-solicitarla.htm", label: "Ministerio: solicitud de apoyo educativo" },
  collaboration: { href: "https://www.educacionfpydeportes.gob.es/servicios-al-ciudadano/catalogo/general/99/998142/ficha/998142-2026.html", label: "Ministerio: colaboración 2026-2027" },
  bono: { href: "https://www.boe.es/buscar/act.php?id=BOE-A-2022-802", label: "BOE: Bono Alquiler Joven, RD 42/2022" },
  plan: { href: "https://www.boe.es/buscar/act.php?id=BOE-A-2026-8872", label: "BOE: Plan Estatal de Vivienda 2026-2030" },
  madrid: { href: "https://sede.comunidad.madrid/ayudas-becas-subvenciones/bono-alquiler-joven-0", label: "Madrid: Bono Alquiler Joven (2024), A688" },
  andalucia: { href: "https://www.juntadeandalucia.es/organismos/viviendajuventudyordenaciondelterritorio/areas/vivienda-rehabilitacion/fomento-alquiler/bono-alquiler-joven.html", label: "Junta de Andalucía: estado del Bono Alquiler Joven" },
  catalunya: { href: "https://habitatge.gencat.cat/ca/ajuts/ajuts-pagament-habitatge/subvencions-bo-lloguer-jove/", label: "Cataluña: Bo Lloguer Jove 2026" },
  catalunyaRent: { href: "https://habitatge.gencat.cat/ca/ajuts/ajuts-pagament-habitatge/subvencions-lloguer-joves/", label: "Cataluña: subvenciones de alquiler para jóvenes 2026" },
};

export const AIDS: Aid[] = [
  ...rentalReviews.map(a => ({ ...a, phase: a.phase as Aid["phase"], category: "alquiler" as const, path: "/alquiler/ayudas-por-comunidad" })),
  { id: "mec-modificacion-2627", name: "Beca MEC 2026-27: actualizar datos", category: "becas", territory: "Convocatoria del Ministerio; Cataluña tiene gestión propia", phase: "modificacion", checkedAt: "2026-09-14", opensAt: "2026-09-07T08:00:00+02:00", closesAt: "2026-09-28T15:00:00+02:00", deadline: "Del 7 de septiembre a las 08:00 al 28 a las 15:00 de 2026, hora peninsular.", summary: "Para solicitudes ya presentadas. Esta ventana no permite pedir por primera vez la beca general.", path: "/becas/mec/modificar-datos", source: AID_SOURCES.ministry },
  { id: "colaboracion-2627", name: "Becas de colaboración 2026-27", category: "becas", territory: "Universidades españolas", phase: "solicitud", checkedAt: "2026-09-14", opensAt: "2026-07-21T08:00:00+02:00", closesAt: "2026-09-22T15:00:00+02:00", deadline: "Hasta el 22 de septiembre de 2026 a las 15:00, hora peninsular.", summary: "2.000 €; último curso de grado o primero de máster, con requisitos académicos y proyecto de departamento.", path: "/becas/colaboracion", source: AID_SOURCES.collaboration },
  { id: "neae-2627", name: "Apoyo educativo NEAE 2026-27", category: "becas", territory: "Convocatoria del Ministerio; Cataluña tiene gestión propia", phase: "cerrada", checkedAt: "2026-09-14", closesAt: "2026-09-10T15:00:00+02:00", deadline: "Solicitud finalizada el 10 de septiembre de 2026 a las 15:00, hora peninsular.", summary: "Si la presentaste, consulta el expediente y los requerimientos. No es una alternativa abierta a la MEC.", path: "/becas/apoyo-educativo", source: AID_SOURCES.neae },
  { id: "bono-madrid", name: "Bono Alquiler Joven de Madrid", category: "alquiler", territory: "Comunidad de Madrid", phase: "solicitud", checkedAt: "2026-09-14", deadline: "La ficha A688 indica plazo permanente; comprueba sus avisos antes de solicitar.", summary: "Procedimiento denominado Bono Alquiler Joven (2024), todavía en tramitación. No confundir con la convocatoria antigua de 2022.", path: "/alquiler/bono-alquiler-joven-madrid", source: AID_SOURCES.madrid },
  { id: "bono-andalucia", name: "Bono Alquiler Joven de Andalucía", category: "alquiler", territory: "Andalucía", phase: "cerrada", checkedAt: "2026-09-14", closesAt: "2026-06-22T23:59:59+02:00", deadline: "La Junta comunicó el cierre el 22 de junio de 2026 al alcanzar 15.000 solicitudes.", summary: "La reapertura de enero ya terminó. Quienes solicitaron deben seguir sus notificaciones y la justificación.", path: "/alquiler/bono-alquiler-joven-andalucia", source: AID_SOURCES.andalucia },
  { id: "bono-catalunya", name: "Bo Lloguer Jove de Cataluña 2026", category: "alquiler", territory: "Cataluña", phase: "cerrada", checkedAt: "2026-09-14", closesAt: "2026-03-13T14:00:00+01:00", deadline: "Cerró el 13 de marzo de 2026 a las 14:00, hora peninsular.", summary: "Es un programa distinto de las subvenciones autonómicas de alquiler para jóvenes.", path: "/alquiler/ayudas-alquiler-cataluna", source: AID_SOURCES.catalunya },
  { id: "lloguer-joves", name: "Subvenciones al alquiler para jóvenes de Cataluña", category: "alquiler", territory: "Cataluña", phase: "cerrada", checkedAt: "2026-09-14", closesAt: "2026-07-10T14:00:00+02:00", deadline: "Solicitudes del 29 de junio al 10 de julio de 2026 a las 14:00, hora peninsular.", summary: "Convocatoria 2026 no activa. La concesión se valora por puntuación, no por orden de llegada.", path: "/alquiler/ayudas-alquiler-cataluna", source: AID_SOURCES.catalunyaRent },
  { id: "plan-vivienda", name: "Nueva ayuda al alquiler para emancipación", category: "alquiler", territory: "Plan Estatal de Vivienda 2026-2030", phase: "normativa", checkedAt: "2026-09-14", deadline: "Sin plazo autonómico de solicitud verificado en esta guía.", summary: "El BOE establece el programa. Para solicitar hay que localizar su convocatoria territorial.", path: "/alquiler/plan-vivienda-2026-2030", source: AID_SOURCES.plan },
];

function localDay(now: Date) {
  return new Intl.DateTimeFormat("sv-SE", { timeZone: "Europe/Madrid", year: "numeric", month: "2-digit", day: "2-digit" }).format(now);
}

export function aidPhase(aid: Aid, now = new Date()): Aid["phase"] {
  if (aid.phase === "normativa") return aid.phase;
  if ((aid.closesAt && now.getTime() >= Date.parse(aid.closesAt)) || (aid.closesOn && localDay(now) > aid.closesOn)) return "cerrada";
  return aid.phase;
}

/** Do not turn old editorial evidence into an indefinitely open application. */
export function aidStatus(aid: Aid, now = new Date()): string {
  if (aid.phase === "normativa") return "Norma publicada · consultar convocatoria";
  if (aidPhase(aid, now) === "cerrada") return "Solicitud cerrada";
  if ((aid.opensAt && now.getTime() < Date.parse(aid.opensAt)) || (aid.opensOn && localDay(now) < aid.opensOn)) return "Pendiente de apertura";
  const age = now.getTime() - Date.parse(aid.checkedAt + "T00:00:00+02:00");
  if (age < 0 || age > 7 * 86400000) return "Estado pendiente de nueva revisión";
  if (aid.closesOn === localDay(now)) return "Último día indicado · comprobar hora en la sede";
  return aid.phase === "modificacion" ? "Actualización de solicitudes" : "Solicitud en plazo según última revisión";
}
