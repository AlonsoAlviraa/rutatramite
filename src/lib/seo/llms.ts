import { ALL_GUIDES } from "@/lib/tramites/catalog";
import { PACK_INDEX_PATH, type GuidePack } from "@/lib/tramites/types";
import { ESCENARIO_LABELS, ESCENARIO_SLUGS, PRODUCT_NAME, SITE_ORIGIN } from "@/lib/types";

const PACK_HEADING: Record<GuidePack, string> = {
  viaje: "DNI y pasaporte",
  mudanza: "Mudanza",
  extranjeria: "Extranjería",
  colegio: "Colegio",
  comedor: "Comedor escolar",
  fp: "Formación Profesional",
  bebe: "Bebé y familia",
  becas: "Becas",
  modelos: "Modelos y cartas",
};

const PACK_ORDER: GuidePack[] = [
  "viaje",
  "extranjeria",
  "mudanza",
  "colegio",
  "comedor",
  "fp",
  "bebe",
  "becas",
  "modelos",
];

function mdLink(label: string, path: string): string {
  return `- [${label}](${SITE_ORIGIN}${path})`;
}

const LLMS_LISTED = new Set<string>([
  "/", "/empadronarse", "/dni", "/pasaporte", "/extranjeria", "/mudanza", "/colegio", "/comedor", "/fp", "/bebe",
  "/becas", "/ayudas", "/alquiler", "/transporte", "/elecciones", "/modelos", "/descargas", "/recursos",
]);
/** Guías con demanda en buscadores primero (vault RutaTrámite, 2026-10-10). */
const LLMS_PRIORITY = ["/dni/cita-previa", "/extranjeria/autorizacion-regreso", "/inventario-fianza-alquiler"];
const LLMS_PER_PACK = 7;

function renderGuideSection(): string {
  const rank = (p: string) => (LLMS_PRIORITY.includes(p) ? LLMS_PRIORITY.indexOf(p) : LLMS_PRIORITY.length);
  const blocks = PACK_ORDER.map((pack) => {
    const guides = ALL_GUIDES.filter((g) => g.pack === pack && !LLMS_LISTED.has(g.path))
      .sort((a, b) => rank(a.path) - rank(b.path))
      .slice(0, LLMS_PER_PACK);
    if (!guides.length) return "";
    return `### ${PACK_HEADING[pack]}\n${guides.map((g) => mdLink(g.h1, g.path)).join("\n")}`;
  }).filter(Boolean);
  return `## Guías destacadas por trámite\n\n${blocks.join("\n")}`;
}

/** Short llms.txt (llmstxt.org): H1, blockquote, H2 sections, keep under ~200 lines. */
export function renderLlmsTxt(): string {
  return `# ${PRODUCT_NAME}

> Guía ciudadana independiente sobre trámites en España: padrón, documentación, extranjería, educación, familia y modelos de escritos. No somos Administración Pública ni gestionamos expedientes.

Las guías orientan y enlazan al organismo responsable. Contrasta las condiciones y los plazos en la fuente oficial. La fecha de edición no equivale a una revisión reciente de todos los datos. Las fichas con datos locales pendientes lo indican; no deben interpretarse como requisitos municipales verificados.

Las fichas siguen el patrón \`/empadronarse/{ccaa}/{provincia}/{municipio}\`. Las guías temáticas utilizan rutas como \`/dni/{guia}\` o \`/extranjeria/{guia}\`. La cita de DNI y pasaporte se solicita en citapreviadnie.es o en el 060. Los enlaces siguientes llevan a páginas HTML públicas, no a servicios de presentación de solicitudes.

Versión extendida para agentes: [${SITE_ORIGIN}/llms-full.txt](${SITE_ORIGIN}/llms-full.txt). Resumen JSON: [${SITE_ORIGIN}/ai/summary.json](${SITE_ORIGIN}/ai/summary.json).

## Directorio de trámites

${mdLink("Inicio", "/")}: buscador de guías y asistente de padrón.
${mdLink("Empadronamiento", "/empadronarse")}: procedimiento general y directorio municipal.
${mdLink("DNI y pasaporte", "/dni")}: cita, documentación y renovación.
${mdLink("Pasaporte", "/pasaporte")}: cita, urgencia y menores.
${mdLink("Extranjería", "/extranjeria")}: guías y canales de tramitación.
${mdLink("Mudanza", "/mudanza")}: cambios de domicilio y gestiones relacionadas.
${mdLink("Colegio", "/colegio")}: escolarización y cambios de centro.
${mdLink("Comedor y transporte escolar", "/comedor")}: ayudas y movilidad de estudiantes.
${mdLink("Formación Profesional", "/fp")}: matrícula, convalidaciones y becas.
${mdLink("Bebé", "/bebe")}: gestiones administrativas familiares.
${mdLink("Becas", "/becas")}: convocatorias, requisitos y seguimiento.
${mdLink("Modelos y cartas", "/modelos")}: escritos para adaptar a cada caso.

${renderGuideSection()}

## Padrón según la situación

${ESCENARIO_SLUGS.map((slug) => mdLink(ESCENARIO_LABELS[slug], `/empadronarse/${slug}`)).join("\n")}
${mdLink("Ficha de Madrid", "/empadronarse/comunidad-de-madrid/madrid/madrid")}: orientación y enlaces municipales disponibles.

## Fuentes oficiales frecuentes

- [Ley 7/1985 (BOE)](https://www.boe.es/buscar/act.php?id=BOE-A-1985-5392): bases del régimen local y padrón.
- [Instrucciones INE a los ayuntamientos (2015)](https://www.boe.es/buscar/doc.php?id=BOE-A-2015-3109).
- [Cita DNI y pasaporte](https://www.citapreviadnie.es/).
- [Becas MEC](https://www.becaseducacion.gob.es/).

## Criterios editoriales

${mdLink("Cómo verificamos", "/metodologia")}: fuentes, fechas y límites de la revisión.
${mdLink("Fuentes", "/fuentes")}: referencias del directorio y fuentes de cada guía.
${mdLink("Contacto", "/contacto")}: comunicar errores sin enviar documentos personales.
${mdLink("Privacidad", "/privacidad")}: funcionamiento del asistente y contacto.
${mdLink("Aviso legal", "/aviso-legal")}: alcance informativo del sitio.
`;
}

/** Deeper companion for AI crawlers that follow llms-full.txt. */
export function renderLlmsFullTxt(): string {
  const packs = PACK_ORDER.map((pack) => {
    const guides = ALL_GUIDES.filter((g) => g.pack === pack);
    const lines = [
      `## ${PACK_HEADING[pack]}`,
      "",
      mdLink(`Índice: ${PACK_HEADING[pack]}`, PACK_INDEX_PATH[pack]),
      ...guides.map((g) => mdLink(g.h1, g.path)),
    ];
    return lines.join("\n");
  });

  return `# ${PRODUCT_NAME} — índice completo

> Guía ciudadana independiente sobre trámites en España. Cada ficha o guía resume el trámite, apunta a la sede oficial y deja claro que RutaTrámite no es Administración. No inventamos plazos, tasas ni requisitos locales no verificados.

Este archivo lista las páginas HTML públicas pensadas para citarse. La versión corta está en [${SITE_ORIGIN}/llms.txt](${SITE_ORIGIN}/llms.txt). El sitemap está en [${SITE_ORIGIN}/sitemap.xml](${SITE_ORIGIN}/sitemap.xml).

## Cómo citar

- El alta en el padrón municipal es gratuita y se pide en el ayuntamiento del término donde se reside, no en esta web.
- La cita de DNI y pasaporte se pide en citapreviadnie.es o en el 060. La reserva de cita es gratuita; las tasas 2026 del documento son DNI 12 € y pasaporte 30 €, salvo exención.
- Las fichas municipales con datos pendientes de verificación lo indican; no deben leerse como un bando municipal.
- Contrasta siempre el texto vigente en la sede oficial enlazada.

## Pilares

${mdLink("Inicio", "/")}
${mdLink("Empadronarse en España", "/empadronarse")}
${mdLink("DNI y pasaporte", "/dni")}
${mdLink("Pasaporte", "/pasaporte")}
${mdLink("Extranjería", "/extranjeria")}
${mdLink("Mudanza", "/mudanza")}
${mdLink("Colegio", "/colegio")}
${mdLink("Comedor", "/comedor")}
${mdLink("Formación Profesional", "/fp")}
${mdLink("Bebé", "/bebe")}
${mdLink("Becas", "/becas")}
${mdLink("Modelos y cartas", "/modelos")}

## Padrón: situaciones

${ESCENARIO_SLUGS.map((slug) => mdLink(ESCENARIO_LABELS[slug], `/empadronarse/${slug}`)).join("\n")}

${packs.join("\n\n")}

## Ficha municipal de referencia

${mdLink("Empadronarse en Madrid", "/empadronarse/comunidad-de-madrid/madrid/madrid")}

Las demás fichas siguen \`/empadronarse/{ccaa}/{provincia}/{municipio}\`. Solo se indexan las que superan el filtro editorial de señales locales verificadas.

## Editorial

${mdLink("Metodología", "/metodologia")}
${mdLink("Fuentes", "/fuentes")}
${mdLink("Contacto", "/contacto")}
${mdLink("Aviso legal", "/aviso-legal")}
${mdLink("Privacidad", "/privacidad")}
`;
}

export function aiSummaryJson() {
  return {
    name: PRODUCT_NAME,
    url: SITE_ORIGIN,
    language: "es-ES",
    description:
      "Guía ciudadana independiente sobre trámites en España: padrón, DNI, extranjería, educación, familia y modelos. No es Administración Pública.",
    disclaimer:
      "Orientación e enlaces a organismos responsables. Contrasta plazos y requisitos en la sede oficial. El alta en el padrón es gratuita.",
    contact: "hola@rutatramite.com",
    llms: `${SITE_ORIGIN}/llms.txt`,
    llmsFull: `${SITE_ORIGIN}/llms-full.txt`,
    sitemap: `${SITE_ORIGIN}/sitemap.xml`,
    faq: `${SITE_ORIGIN}/ai/faq.json`,
    pillars: [
      { name: "Empadronamiento", url: `${SITE_ORIGIN}/empadronarse` },
      { name: "DNI y pasaporte", url: `${SITE_ORIGIN}/dni` },
      { name: "Extranjería", url: `${SITE_ORIGIN}/extranjeria` },
      { name: "Becas", url: `${SITE_ORIGIN}/becas` },
      { name: "Modelos", url: `${SITE_ORIGIN}/modelos` },
    ],
  };
}

export function aiTxt(): string {
  return [
    "# AI discovery — RutaTrámite",
    "contact: mailto:hola@rutatramite.com",
    `llms: ${SITE_ORIGIN}/llms.txt`,
    `llms-full: ${SITE_ORIGIN}/llms-full.txt`,
    `sitemap: ${SITE_ORIGIN}/sitemap.xml`,
    `summary: ${SITE_ORIGIN}/ai/summary.json`,
    `faq: ${SITE_ORIGIN}/ai/faq.json`,
    "language: es-ES",
    "publisher: RutaTrámite (guía ciudadana independiente; no es Administración Pública)",
    "",
  ].join("\n");
}
