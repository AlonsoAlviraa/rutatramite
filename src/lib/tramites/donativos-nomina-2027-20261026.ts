import type { Guide, GuideSection } from "@/lib/tramites/types";

/**
 * Tanda C (26-10-2026). Verificado el 26-10-2026 en el BOE (textos consolidados):
 * - Ley 49/2002 (BOE-A-2002-25039): art. 19 (IRPF: 80 % hasta 250 €, 40 % resto, 45 % si 3 años a la misma entidad;
 *   redacción RDL 6/2023), art. 20 (Sociedades 40 % / 50 %, límite 15 % base imponible), art. 24 (certificado), art. 16 (entidades).
 * - Ley 35/2006 IRPF (BOE-A-2006-20764): art. 69.1 (límite 10 % de la base liquidable).
 * - LGSS (BOE-A-2015-11724): art. 127 bis y disposición transitoria 43.ª (MEI 2027: 1 punto, 0,83 empresa, 0,17 trabajador).
 * Omitido: deducciones autonómicas por donativos, cuota de solidaridad, bases máximas/SMI/retenciones 2027 (no verificados).
 */

const R = "2026-10-26";
const sec = (id: string, title: string, paragraphs: string[], lists?: string[][]): GuideSection => ({ id, title, paragraphs, ...(lists ? { lists } : {}) });
const BY_D = "Por Equipo RutaTrámite. Última revisión: 26 de octubre de 2026, con el texto consolidado de la Ley 49/2002 y de la Ley del IRPF en el BOE.";
const BY_N = "Por Equipo RutaTrámite. Última revisión: 26 de octubre de 2026, con el texto consolidado de la Ley General de la Seguridad Social en el BOE.";

const S = {
  l49: { href: "https://www.boe.es/buscar/act.php?id=BOE-A-2002-25039", label: "BOE: Ley 49/2002, de mecenazgo (texto consolidado)" },
  a19: { href: "https://www.boe.es/buscar/act.php?id=BOE-A-2002-25039#a19", label: "BOE: Ley 49/2002, artículo 19 (deducción en el IRPF)" },
  a20: { href: "https://www.boe.es/buscar/act.php?id=BOE-A-2002-25039#a20", label: "BOE: Ley 49/2002, artículo 20 (deducción en el Impuesto sobre Sociedades)" },
  a24: { href: "https://www.boe.es/buscar/act.php?id=BOE-A-2002-25039#a24", label: "BOE: Ley 49/2002, artículo 24 (certificado del donativo)" },
  irpf: { href: "https://www.boe.es/buscar/act.php?id=BOE-A-2006-20764#a69", label: "BOE: Ley 35/2006 del IRPF, artículo 69 (límite del 10 %)" },
  aeat: { href: "https://sede.agenciatributaria.gob.es/", label: "Sede electrónica de la Agencia Tributaria" },
  lgss: { href: "https://www.boe.es/buscar/act.php?id=BOE-A-2015-11724", label: "BOE: Ley General de la Seguridad Social (texto consolidado)" },
  a127: { href: "https://www.boe.es/buscar/act.php?id=BOE-A-2015-11724#a1-5", label: "BOE: LGSS, artículo 127 bis (Mecanismo de Equidad Intergeneracional)" },
  dt43: { href: "https://www.boe.es/buscar/act.php?id=BOE-A-2015-11724#dt-14", label: "BOE: LGSS, disposición transitoria 43.ª (escala del MEI 2023-2050)" },
  ss: { href: "https://www.seg-social.es/", label: "Seguridad Social: web oficial" },
};

const P = {
  don: "/trabajo/donativos-desgravar-antes-31-diciembre",
  nom: "/trabajo/nomina-enero-2027",
  mei: "/trabajo/mei-2027-cuanto-sube-cotizacion",
};
const L = {
  don: { href: P.don, label: "Donativos antes del 31 de diciembre: cuánto desgravan" },
  nom: { href: P.nom, label: "Tu nómina en enero de 2027: qué cambia" },
  mei: { href: P.mei, label: "MEI 2027: cuánto sube la cotización (0,17 %)" },
  smi: { href: "/trabajo/salario-minimo-irpf-2026", label: "Salario mínimo e IRPF 2026" },
  aut: { href: "/trabajo/autonomos-cambio-base-cotizacion-2027", label: "Autónomos: cambiar la base de cotización para 2027" },
  vida: { href: "/trabajo/vida-laboral", label: "Informe de vida laboral" },
  trabajo: { href: "/trabajo", label: "Trabajo: todas las guías" },
};
export const DONATIVOS_NOMINA_PATHS = Object.values(P);
const base = { pack: "trabajo" as const, reviewedAt: R };

export const DONATIVOS_NOMINA_GUIDES: Guide[] = [
  {
    ...base,
    id: "donativos-antes-31-diciembre",
    path: P.don,
    h1: "Donativos antes del 31 de diciembre: cuánto te desgravan en la Renta",
    title: "Donativos antes del 31-dic: 80 % hasta 250 € en la Renta",
    description: "Lo que dones a una ONG o fundación acogida a la Ley 49/2002 desgrava el 80 % de los primeros 250 € y el 40 % del resto (45 % si repites). Ejemplos y requisitos.",
    lead: "Respuesta corta: si donas a una entidad acogida a la Ley 49/2002, en la Renta te deduces el 80 % de los primeros 250 € donados en el año y el 40 % de lo que pase de 250 €. Si llevas tres años donando a la misma entidad sin bajar el importe, lo que pase de 250 € deduce el 45 %. Para que cuente en la Renta de 2026, el donativo tiene que hacerse como tarde el 31 de diciembre de 2026.",
    cta: { href: S.a19.href, label: "Leer el artículo 19 en el BOE" },
    secondaryCta: { href: S.aeat.href, label: "Sede de la Agencia Tributaria" },
    sources: [S.a19, S.a20, S.a24, S.irpf, S.l49, S.aeat],
    related: [L.nom, L.mei, L.smi, L.trabajo],
    disclaimer: "Información general sobre la deducción estatal. Algunas comunidades autónomas tienen deducciones propias por donativos que no se recogen aquí.",
    faqs: [
      { q: "¿Cuánto me devuelve Hacienda si dono 150 €?", a: "120 €: el 80 % de 150 €, porque no pasas de 250 € (artículo 19 de la Ley 49/2002). Es deducción de la cuota, así que solo se nota si tienes cuota que pagar o reducir." },
      { q: "¿Y si dono 500 €?", a: "300 €: el 80 % de los primeros 250 € (200 €) más el 40 % de los otros 250 € (100 €). Si es el tercer año seguido a la misma entidad sin bajar el importe, el tramo de más de 250 € deduce el 45 % y la deducción sube a 312,50 €." },
      { q: "¿Hay un límite?", a: "Sí. La base de la deducción no puede superar el 10 % de tu base liquidable (artículo 69.1 de la Ley del IRPF, al que remite el artículo 19.2 de la Ley 49/2002)." },
      { q: "¿Qué papel necesito?", a: "Un certificado de la entidad con tu NIF, la fecha y el importe, la mención de que está acogida a la Ley 49/2002 y el carácter irrevocable de la donación (artículo 24). La entidad también informa a Hacienda." },
      { q: "¿Y si dona mi empresa?", a: "En el Impuesto sobre Sociedades la deducción es del 40 % (50 % si repite tres años a la misma entidad), con un límite del 15 % de la base imponible (artículo 20)." },
    ],
    sections: [
      sec("byline", "Autoría y revisión", [BY_D]),
      sec("cuanto", "Cuánto desgrava (IRPF)", ["La escala del artículo 19 de la Ley 49/2002 (redacción del Real Decreto-ley 6/2023) se aplica a la suma de tus donativos del año a entidades con derecho a deducción."], [["Primeros 250 €: 80 %", "Lo que pase de 250 €: 40 %", "Lo que pase de 250 € a una entidad a la que hayas donado los dos años anteriores sin bajar el importe: 45 %"]]),
      sec("ejemplos", "Ejemplos", ["Son cálculos directos de la escala, sin deducciones autonómicas."], [["50 € donados → 40 € de deducción", "250 € → 200 €", "500 € → 300 € (o 312,50 € si es donación recurrente)", "1.000 € → 500 € (o 537,50 € si es recurrente)"]]),
      sec("plazo", "Por qué antes del 31 de diciembre", ["La deducción se aplica en la declaración del año en que haces el donativo. Lo que dones hasta el 31 de diciembre de 2026 entra en la Renta de 2026, que se presenta en 2027. Lo que dones el 1 de enero ya va a la del año siguiente."]),
      sec("requisitos", "Requisitos", ["La entidad tiene que estar acogida al régimen de la Ley 49/2002 (por ejemplo, fundaciones y asociaciones de utilidad pública que lo hayan solicitado). Pregúntale si emite el certificado del artículo 24 y dale tu NIF para que el donativo aparezca en tus datos fiscales."]),
    ],
  },
  {
    ...base,
    id: "nomina-enero-2027",
    path: P.nom,
    h1: "Tu nómina en enero de 2027: qué cambia y qué está confirmado",
    title: "Tu nómina en enero de 2027: qué cambia (MEI y más)",
    description: "Lo confirmado en el BOE para la nómina de enero de 2027: el MEI sube al 0,17 % para el trabajador. Qué mirar en tu recibo y qué falta por publicar.",
    lead: "Respuesta corta: lo único ya fijado por ley para tu nómina de enero de 2027 es que la cotización del Mecanismo de Equidad Intergeneracional (MEI) que paga el trabajador sube del 0,15 % al 0,17 % de la base de cotización. Con una base de 2.000 € al mes, son 3,40 € en lugar de 3,00 €. Otros cambios dependen de normas de 2027 que hay que comprobar en el BOE cuando salgan.",
    cta: { href: S.dt43.href, label: "Escala oficial del MEI en el BOE" },
    secondaryCta: { href: P.mei, label: "Calcular tu MEI 2027" },
    sources: [S.dt43, S.a127, S.lgss, S.ss],
    related: [L.mei, L.don, L.smi, L.aut, L.vida, L.trabajo],
    disclaimer: "Esta guía solo recoge lo publicado en el BOE a la fecha de revisión. Para tu caso concreto, mira tu recibo o pregunta a tu empresa.",
    faqs: [
      { q: "¿Bajará mi sueldo neto en enero de 2027?", a: "Por el MEI, muy poco: 0,02 puntos más sobre tu base de cotización (0,40 € al mes con una base de 2.000 €). Tu neto final depende también de otros conceptos que pueden cambiar en 2027, como la retención de IRPF o una subida salarial." },
      { q: "¿Dónde aparece el MEI en la nómina?", a: "En el apartado de deducciones del trabajador, junto a las cotizaciones a la Seguridad Social. Muchas nóminas lo muestran como «MEI»." },
      { q: "¿Lo paga también la empresa?", a: "Sí, y más: en 2027 la empresa paga el 0,83 % y el trabajador el 0,17 % (disposición transitoria 43.ª de la LGSS)." },
    ],
    sections: [
      sec("byline", "Autoría y revisión", [BY_N]),
      sec("confirmado", "Confirmado en el BOE", ["MEI 2027: 1 punto porcentual en total, 0,83 a cargo de la empresa y 0,17 a cargo del trabajador (en 2026 es 0,90: 0,75 y 0,15). Fuente: disposición transitoria 43.ª de la Ley General de la Seguridad Social."]),
      sec("revisar", "Qué revisar en tu primera nómina de 2027", ["Compara tu nómina de enero con la de diciembre:"], [["La línea del MEI: debería pasar del 0,15 % al 0,17 %", "La base de cotización y la retención de IRPF", "Cualquier subida salarial pactada en tu convenio"]]),
      sec("pendiente", "Lo que no recogemos aquí", ["No incluimos cifras de 2027 para el salario mínimo, las bases máximas de cotización ni las retenciones mientras no las hayamos comprobado en el BOE. Si eres autónomo, consulta también la guía sobre el cambio de base para 2027."]),
    ],
  },
  {
    ...base,
    id: "mei-2027",
    path: P.mei,
    h1: "MEI 2027: cuánto sube la cotización de equidad intergeneracional",
    title: "MEI 2027: el trabajador paga el 0,17 % (antes 0,15 %)",
    description: "El Mecanismo de Equidad Intergeneracional sube en 2027 a 1 punto: 0,83 % la empresa y 0,17 % el trabajador. Escala oficial 2023-2029 y ejemplos.",
    lead: "Respuesta corta: en 2027 la cotización del MEI es de 1 punto porcentual. El trabajador paga el 0,17 % de su base de cotización (en 2026, el 0,15 %) y la empresa el 0,83 %. Con una base de 1.500 € al mes, el trabajador paga 2,55 € al mes; con 2.500 €, 4,25 €. No da derecho a más pensión: va al Fondo de Reserva de la Seguridad Social.",
    cta: { href: S.dt43.href, label: "Ver la escala del MEI en el BOE" },
    secondaryCta: { href: P.nom, label: "Tu nómina en enero de 2027" },
    sources: [S.dt43, S.a127, S.lgss],
    related: [L.nom, L.don, L.smi, L.aut, L.trabajo],
    faqs: [
      { q: "¿Qué es el MEI?", a: "Una cotización finalista creada en 2023 que nutre el Fondo de Reserva de la Seguridad Social. No cuenta para calcular prestaciones y no admite bonificaciones ni reducciones (artículo 127 bis de la LGSS)." },
      { q: "¿Hasta cuándo sube?", a: "Hasta 2029, cuando llega a 1,2 puntos: 1 para la empresa y 0,2 para el trabajador. Se aplica hasta el 31 de diciembre de 2050." },
      { q: "¿A quién se aplica?", a: "A todos los regímenes y supuestos en los que se cotiza por jubilación (artículo 127 bis.1)." },
    ],
    sections: [
      sec("byline", "Autoría y revisión", [BY_N]),
      sec("escala", "Escala oficial (disposición transitoria 43.ª LGSS)", ["Total / empresa / trabajador, en puntos porcentuales:"], [["2023: 0,60 / 0,50 / 0,10", "2024: 0,70 / 0,58 / 0,12", "2025: 0,80 / 0,67 / 0,13", "2026: 0,90 / 0,75 / 0,15", "2027: 1,00 / 0,83 / 0,17", "2028: 1,10 / 0,92 / 0,18", "2029: 1,20 / 1,00 / 0,20"]]),
      sec("ejemplos", "Ejemplos para el trabajador (al mes)", ["Base de cotización × 0,17 %:"], [["1.200 € → 2,04 € (2026: 1,80 €)", "1.500 € → 2,55 € (2026: 2,25 €)", "2.000 € → 3,40 € (2026: 3,00 €)", "2.500 € → 4,25 € (2026: 3,75 €)"]]),
    ],
  },
];

const IN: Record<string, { href: string; label: string }[]> = {
  "/trabajo/salario-minimo-irpf-2026": [L.nom, L.mei],
  "/trabajo/autonomos-cambio-base-cotizacion-2027": [L.nom],
  "/trabajo/vida-laboral": [L.nom],
};
export function enlazarDonativosNomina(g: Guide): Guide {
  const add = IN[g.path];
  if (!add) return g;
  const have = new Set(g.related.map((r) => r.href));
  g.related = [...g.related, ...add.filter((r) => !have.has(r.href))];
  return g;
}
