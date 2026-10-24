import type { Municipio, MunicipioIndexEntry } from "@/lib/types";
import { loadReviewedMunicipio } from "@/lib/data/load";
import { DISCLAIMER_SHORT } from "@/lib/types";

export type HubKind = "ccaa" | "provincia";
export const HUB_REVIEWED_AT = "2026-09-16";

export type HubModel = {
  kind: HubKind;
  h1: string;
  title: string;
  description: string;
  lead: string;
  paragraphs: string[];
  municipios: MunicipioIndexEntry[];
  disclaimer: string;
  reviewedAt: string;
  verificadas: HubCity[];
  resumen: string[];
};

export type HubCity = {
  name: string;
  path: string;
  canal: string;
  cita: string;
  tasa: string;
  docs: string[];
  detalle: string[];
  oficina: string | null;
  links: { href: string; label: string }[];
  reviewedOn: string;
};

export const HUB_VERIFIED_AT = "2026-10-24";

function canalText(m: Municipio): string {
  if (m.online === true && m.presencial !== false) return "Por internet (sede electrónica, con identificación digital) y de forma presencial";
  if (m.online === true) return "Por internet (sede electrónica)";
  if (m.online === "partial") return "Parcialmente por internet; el resto, presencial";
  if (m.online === false) return "Solo presencial";
  return "Presencial; la ficha municipal no aclara el canal electrónico";
}

function citaText(m: Municipio): string {
  switch (m.cita_previa) {
    case "required": return "Con cita previa";
    case "recommended": return "Cita previa recomendada (también hay atención sin cita según oficina)";
    case "walk-in": return "Sin cita previa en ventanilla (según horario municipal)";
    default: return "La ficha municipal no detalla si hace falta cita";
  }
}

function toCity(m: Municipio): HubCity {
  const links: { href: string; label: string }[] = [];
  if (m.tramite_alta_url) links.push({ href: m.tramite_alta_url, label: `Trámite oficial de alta (${m.name})` });
  if (m.cita_url && m.cita_url !== m.tramite_alta_url) links.push({ href: m.cita_url, label: `Cita previa (${m.name})` });
  const docs = (m.procedure_docs?.alta ?? m.docs_extra ?? []).slice(0, 3);
  const of = m.oficinas?.[0];
  return {
    name: m.name,
    path: m.path,
    canal: canalText(m),
    cita: citaText(m),
    tasa: m.fee_public_note ?? (m.tasa_alta === 0 ? "Alta gratuita según la ficha municipal." : "La ficha municipal no publica importe."),
    docs,
    detalle: (m.peculiaridades ?? []).slice(0, 2),
    oficina: of ? [of.nombre, of.direccion, of.telefono ? `tel. ${of.telefono}` : null].filter(Boolean).join(" · ") : null,
    links,
    reviewedOn: m.reviewed_on ?? m.last_verified,
  };
}

function verifiedCities(municipios: MunicipioIndexEntry[]): HubCity[] {
  return [...municipios]
    .sort((a, b) => (b.poblacion ?? 0) - (a.poblacion ?? 0))
    .map((e) => loadReviewedMunicipio(e.ine_code))
    .filter((m): m is Municipio => !!m && m.confidence === "official")
    .map(toCity);
}

function resumenOf(territory: string, cities: HubCity[]): string[] {
  if (cities.length === 0) return [];
  const names = cities.map((c) => c.name);
  const online = cities.filter((c) => c.canal.startsWith("Por internet")).map((c) => c.name);
  const soloPres = cities.filter((c) => c.canal === "Solo presencial").map((c) => c.name);
  const sinCita = cities.filter((c) => c.cita.startsWith("Sin cita")).map((c) => c.name);
  const conCita = cities.filter((c) => c.cita === "Con cita previa").map((c) => c.name);
  const list = (xs: string[]) => xs.length <= 1 ? xs.join("") : `${xs.slice(0, -1).join(", ")} y ${xs[xs.length - 1]}`;
  const out = [
    `En ${territory} hemos contrastado con la web oficial de cada ayuntamiento ${cities.length === 1 ? "la ficha de" : `${cities.length} fichas:`} ${list(names)}. El padrón es competencia municipal, así que cada ayuntamiento fija sus canales, su cita y la forma de acreditar la vivienda; abajo tienes lo que publica cada uno.`,
  ];
  const parts: string[] = [];
  if (online.length) parts.push(`admiten solicitud por internet ${list(online)}`);
  if (soloPres.length) parts.push(`exige${soloPres.length > 1 ? "n" : ""} acudir en persona para el alta ${list(soloPres)}`);
  if (parts.length) out.push(`Según esas fichas, ${parts.join("; ")}.`);
  const p2: string[] = [];
  if (sinCita.length) p2.push(`atiende${sinCita.length > 1 ? "n" : ""} sin cita ${list(sinCita)}`);
  if (conCita.length) p2.push(`pide${conCita.length > 1 ? "n" : ""} cita previa ${list(conCita)}`);
  if (p2.length) out.push(`En la atención presencial, ${p2.join(", mientras que ")}. Los horarios cambian en verano y festivos, así que confírmalos en el enlace oficial antes de ir.`);
  return out;
}

export function buildCcaaHub(
  name: string,
  slug: string,
  municipios: MunicipioIndexEntry[],
  provinceNames: string[],
): HubModel {
  const n = municipios.length;
  const verificadas = verifiedCities(municipios);
  return {
    reviewedAt: verificadas.length ? HUB_VERIFIED_AT : HUB_REVIEWED_AT,
    verificadas,
    resumen: resumenOf(name, verificadas),
    kind: "ccaa",
    h1: `Empadronarse en ${name}: directorio de municipios`,
    title: `Empadronarse en ${name}: directorio de municipios`,
    description: `Encuentra tu municipio en ${name} y consulta su ficha de empadronamiento. ${n} localidades disponibles, con el estado de revisión de cada ficha.`,
    lead: n === 0
      ? `Todavía no hay fichas locales de ${name} en RutaTrámite. Puedes consultar la guía nacional y el trámite de padrón en la web oficial de la ciudad.`
      : `Busca el municipio de ${name} donde resides. Este directorio reúne ${n} localidades; cada ficha indica qué información se ha comprobado y dónde continuar el trámite.`,
    paragraphs: [
      `Ámbito territorial: ${provinceNames.join(", ") || "este territorio"}. La cobertura del directorio es parcial. Si tu municipio no aparece, consulta directamente la web de su ayuntamiento.`,
      `Antes de desplazarte, comprueba en la sede municipal si necesitas cita y qué documentos corresponden a tu situación. Los horarios y los canales de atención pueden variar entre municipios.`,
      `Una ficha pendiente de verificación no confirma que puedas hacer el trámite por internet. Revisa el aviso de la ficha y sigue las instrucciones publicadas por el ayuntamiento.`,
    ],
    municipios: [...municipios].sort((a, b) => (b.poblacion ?? 0) - (a.poblacion ?? 0)),
    disclaimer: DISCLAIMER_SHORT,
  };
}

export function buildProvinciaHub(
  name: string,
  ccaaName: string,
  municipios: MunicipioIndexEntry[],
): HubModel {
  const n = municipios.length;
  const autonomousCity = name === ccaaName && ["Ceuta", "Melilla"].includes(name);
  const territory = autonomousCity ? `la ciudad autónoma de ${name}` : `la provincia de ${name}`;
  const verificadas = verifiedCities(municipios);
  return {
    reviewedAt: verificadas.length ? HUB_VERIFIED_AT : HUB_REVIEWED_AT,
    verificadas,
    resumen: resumenOf(territory, verificadas),
    kind: "provincia",
    h1: autonomousCity ? `Empadronarse en ${name}: directorio local` : `Empadronarse en la provincia de ${name}`,
    title: autonomousCity ? `Padrón en ${name}: directorio local y orientación` : `Padrón en la provincia de ${name}: directorio municipal`,
    description: `Directorio de empadronamiento de ${name} (${ccaaName}): ${n} localidades disponibles. Encuentra tu municipio y comprueba su información antes de solicitar el alta.`,
    lead: autonomousCity
      ? `Este directorio corresponde a ${territory}. La ausencia de una ficha en RutaTrámite no significa que no exista un servicio municipal de padrón.`
      : `Consulta las ${n} localidades de ${territory} (${ccaaName}) disponibles en RutaTrámite. Elige el municipio donde resides para preparar tu empadronamiento.`,
    paragraphs: [
      n === 0
        ? `Todavía no hay fichas municipales de este territorio. Puedes consultar la guía nacional y buscar el apartado de padrón en la web de tu ayuntamiento.`
        : `Las localidades se ordenan por población de referencia. También puedes escribir el nombre en el buscador. Este listado es una selección del catálogo y no incluye necesariamente todos los municipios de la provincia.`,
      `Al entrar en una ficha, comprueba su estado de revisión. Si la información local está pendiente, confirma documentos, cita y lugar de presentación directamente con el ayuntamiento.`,
      autonomousCity
        ? `Ceuta y Melilla son ciudades autónomas. Su código territorial en el INE no las convierte en provincias.`
        : `Si hay varias localidades con el mismo nombre, comprueba que la provincia sea ${name} antes de seguir sus indicaciones.`,
    ],
    municipios: [...municipios].sort((a, b) => (b.poblacion ?? 0) - (a.poblacion ?? 0)),
    disclaimer: DISCLAIMER_SHORT,
  };
}
