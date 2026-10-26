import type { Guide } from "@/lib/tramites/types";

/**
 * Tanda A (26-10-2026): títulos/descriptions/respuesta corta orientados a la consulta exacta (GSC 28 d, 29-09→24-10)
 * y acortado de títulos > 60 caracteres. Medición a 14 días: 9-11-2026.
 * NO incluye programas-electorales-29n (test CTR hasta 1-11) ni el title de tarjeta-censal-cuando-llega (test hasta 16-11).
 * Beca MEC: «4 o 5 semanas desde el correo de la credencial» verificado el 26-10-2026 en becaseducacion.gob.es/dudas/faqs.html.
 */
type Cambio = Partial<Pick<Guide, "title" | "description" | "lead" | "reviewedAt">> & { faqs?: Guide["faqs"]; sources?: Guide["sources"] };

const FAQ_BECAS = { href: "https://www.becaseducacion.gob.es/dudas/faqs.html", label: "Ministerio de Educación: preguntas frecuentes de becas (cuánto se tarda en cobrar)" };

export const CTR_20261026: Record<string, Cambio> = {
  "/trabajo/vida-laboral": {
    title: "Vida laboral por SMS al móvil gratis: cómo pedirla (2026)",
    description: "Gratis y al momento: en Import@ss pones DNI/NIE y fecha de nacimiento y recibes un código SMS en el móvil registrado en la Seguridad Social. Si no lo tienes, Cl@ve.",
    lead: "Respuesta corta: sí, puedes pedir la vida laboral por SMS gratis y descargarla al momento en Import@ss, el portal de la Seguridad Social. Necesitas que tu móvil esté registrado allí: pones tu DNI o NIE y tu fecha de nacimiento, recibes un código por SMS y descargas el PDF. Si tu móvil no está registrado, usa Cl@ve o un certificado digital.",
  },
  "/bebe/calendario-vacunal-castilla-y-leon": {
    title: "Vacunas Castilla y León 2026: calendario Sacyl (PDF oficial)",
  },
  "/becas/mec/cuando-se-cobra": {
    reviewedAt: "2026-10-26",
    title: "¿Cuándo se cobra la beca MEC? 4-5 semanas tras la credencial",
    description: "El Ministerio indica 4 o 5 semanas desde el correo de la credencial de concesión. La variable puede pagarse en dos partes; la matrícula va a la universidad.",
    lead: "Respuesta corta: no hay un día único de pago. Según las preguntas frecuentes del Ministerio, el tiempo habitual es de cuatro o cinco semanas desde que recibes el correo que avisa de que tienes la credencial de concesión en la sede electrónica. La cuantía variable se comunica más tarde y puede pagarse en dos partes, y si tu beca universitaria es solo de matrícula no recibirás ingreso: se paga a la universidad.",
    faqs: [
      { q: "¿Cuánto se tarda en cobrar la beca MEC desde la credencial?", a: "El Ministerio indica que el tiempo habitual es de cuatro o cinco semanas desde el correo que avisa de que la credencial de concesión está disponible en la sede electrónica." },
      { q: "¿Por qué me han pagado solo una parte?", a: "La cuantía variable se calcula después y el Ministerio advierte de que puede concederla y pagarla en dos partes. No canceles la cuenta bancaria hasta haber recibido todo." },
      { q: "Mi beca es solo de matrícula, ¿cuándo cobro?", a: "No cobras nada en tu cuenta: si el único componente es la matrícula, el importe se ingresa directamente a la universidad." },
    ],
    sources: [FAQ_BECAS],
  },
  "/trabajo/huelga-general-11-noviembre": {
    title: "Huelga 11-N: servicios mínimos (sin publicar) y descuento",
    description: "A 26-10-2026 no hay servicios mínimos publicados para la huelga del 11-N. Cuánto te descuentan en nómina, quién puede hacer huelga y ejemplos.",
  },
  "/elecciones/sorteo-mesa-electoral-29n": {
    title: "Sorteo mesa electoral 2026 (29-N): fechas y si te ha tocado",
    description: "El sorteo de mesas del 29-N lo hace cada ayuntamiento del 31 de octubre al 4 de noviembre. No hay lista pública: te notifican en 3 días. Dieta de 75 €.",
  },
  "/elecciones/que-pasa-si-no-voto": {
    title: "¿Qué pasa si no votas? En España no hay multa (29-N)",
  },
  // Acortado de títulos > 60 caracteres (keyword al principio).
  "/elecciones/nuevo-partido-coalicion": { title: "Coaliciones 29-N: las 9 registradas en la Junta Electoral" },
  "/elecciones/voluntario-mesa-electoral": { title: "¿Puedo ser voluntario de mesa electoral? Lo que dice la ley" },
  "/elecciones/salario-minimo-1800-euros": { title: "Salario mínimo de 1.800 €: qué propone Podemos y cuánto es" },
  "/elecciones/promesas/que-propone-cada-partido-impuestos": { title: "Impuestos y coste de la vida: qué propone cada partido" },
  "/elecciones/promesas/que-propone-cada-partido-burocracia-y-cita-previa": { title: "Burocracia y cita previa: qué propone cada partido el 29-N" },
  "/elecciones/promesas/que-propone-cada-partido-instituciones-y-gasto-publico": { title: "Instituciones y gasto público: qué propone cada partido" },
  "/elecciones/quiere-algun-partido-quitar-las-pensiones": { title: "¿Quiere algún partido quitar las pensiones? Lo que dicen" },
  "/elecciones/quiere-el-psoe-quitar-las-pensiones": { title: "¿Quiere el PSOE quitar las pensiones? Lo que ha dicho" },
  "/elecciones/quiere-podemos-quitar-las-pensiones": { title: "¿Quiere Podemos quitar las pensiones? Propuesta y votos" },
  "/elecciones/votar-ley-de-nietos-29n": { title: "Ley de nietos y voto 29-N: sigue suspendido salvo excepción" },
  "/elecciones/mesa-electoral-vivo-fuera": { title: "Mesa electoral si vives en otra ciudad o en el extranjero" },
  "/elecciones/mesa-electoral-examen-estudiante": { title: "Mesa electoral y examen u oposición: ¿te puedes excusar?" },
  "/elecciones/mesa-electoral-cuidado-familiar-dependiente": { title: "Mesa electoral si cuidas de un familiar dependiente" },
  "/elecciones/mesa-electoral-hijos-pequenos": { title: "Mesa electoral con hijos pequeños o lactancia: ¿te libras?" },
  "/elecciones/modelo-escrito-excusa-mesa-electoral": { title: "Modelo de escrito de excusa de mesa electoral (Word y PDF)" },
  "/elecciones/suplente-mesa-electoral": { title: "Suplente de mesa electoral 29-N: hora, dieta y si hay que ir" },
  "/elecciones/primero-en-votar-mesa-electoral": { title: "¿Si eres el primero en votar te ponen en la mesa?" },
  "/elecciones/mesa-electoral-casos-especiales": { title: "Mesa electoral: autónomos, teletrabajo y exámenes" },
  "/elecciones/notificacion-mesa-electoral-que-hacer": { title: "Me ha llegado la notificación de mesa electoral: qué hacer" },
  "/trabajo/verifactu-obligatorio-1-enero-2027": { title: "¿Es obligatorio Verifactu el 1 de enero de 2027?" },
  "/trabajo/autonomos-cambio-base-cotizacion-2027": { title: "Cambiar la base de cotización de autónomo en 2027: plazos" },
  "/ayudas-por-gobierno/jubilados": { title: "Jubilados y pensionistas: ayudas por gobierno (1996-2026)" },
  "/ayudas-por-gobierno/desempleados": { title: "Desempleados: ayudas según cada gobierno (1996-2026)" },
  "/ayudas-por-gobierno/discapacidad-dependencia": { title: "Discapacidad y dependencia: ayudas por gobierno (1996-2026)" },
};

const HECHAS = new WeakSet<Guide>();
export function mejorarCtr20261026(g: Guide): Guide {
  const x = CTR_20261026[g.path];
  if (!x || HECHAS.has(g)) return g;
  HECHAS.add(g);
  const { faqs, sources, ...rest } = x;
  const seen = new Set((g.sources ?? []).map((s) => s.href));
  return Object.assign(g, rest, {
    ...(faqs ? { faqs: [...faqs, ...(g.faqs ?? [])] } : {}),
    ...(sources ? { sources: [...(g.sources ?? []), ...sources.filter((s) => !seen.has(s.href))] } : {}),
  });
}
