import type { MunicipioIndexEntry } from "@/lib/types";
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
};

export function buildCcaaHub(
  name: string,
  slug: string,
  municipios: MunicipioIndexEntry[],
  provinceNames: string[],
): HubModel {
  const n = municipios.length;
  return {
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
  return {
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
