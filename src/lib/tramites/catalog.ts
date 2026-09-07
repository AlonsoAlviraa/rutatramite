import { BEBE_GUIDES } from "@/lib/tramites/bebe";
import { BECAS_GUIDES } from "@/lib/tramites/becas";
import { COLE_GUIDES } from "@/lib/tramites/cole";
import { COMEDOR_GUIDES } from "@/lib/tramites/comedor";
import { EXTRANJERIA_GUIDES } from "@/lib/tramites/extranjeria";
import { EXTRANJERIA_NICHOS_GUIDES } from "@/lib/tramites/nichos-extranjeria";
import { DNI_NICHOS_GUIDES } from "@/lib/tramites/nichos-dni";
import { BECAS_NICHOS2_GUIDES } from "@/lib/tramites/nichos2-becas";
import { COLE_COMEDOR_NICHOS2_GUIDES } from "@/lib/tramites/nichos2-cole-comedor";
import { FP_BEBE_NICHOS2_GUIDES } from "@/lib/tramites/nichos2-fp-bebe";
import { IDENTIDAD_NICHOS2_GUIDES } from "@/lib/tramites/nichos2-identidad";
import { MODELO_GUIDES } from "@/lib/tramites/modelos";
import { FP_GUIDES } from "@/lib/tramites/fp";
import { MUDANZA_GUIDES } from "@/lib/tramites/mudanza";
import type { Guide, GuidePack } from "@/lib/tramites/types";
import { VIAJE_GUIDES } from "@/lib/tramites/viaje";

export const ALL_GUIDES: Guide[] = [
  ...VIAJE_GUIDES,
  ...DNI_NICHOS_GUIDES,
  ...MUDANZA_GUIDES,
  ...EXTRANJERIA_GUIDES,
  ...EXTRANJERIA_NICHOS_GUIDES,
  ...COLE_GUIDES,
  ...COMEDOR_GUIDES,
  ...FP_GUIDES,
  ...BEBE_GUIDES,
  ...BECAS_GUIDES,
  ...BECAS_NICHOS2_GUIDES,
  ...IDENTIDAD_NICHOS2_GUIDES,
  ...COLE_COMEDOR_NICHOS2_GUIDES,
  ...FP_BEBE_NICHOS2_GUIDES,
  ...MODELO_GUIDES,
];

export const TRAVEL_PATHS = VIAJE_GUIDES.map((g) => g.path);

export function getGuideByPath(path: string): Guide | undefined {
  return ALL_GUIDES.find((g) => g.path === path);
}

export function guidesIn(prefix: string): Guide[] {
  return ALL_GUIDES.filter((g) => g.path.startsWith(prefix + "/") || g.path === prefix);
}

export function guidesByPack(pack: GuidePack): Guide[] {
  return ALL_GUIDES.filter((g) => g.pack === pack);
}

export const Q4_SEGUNDA_LINEA: { label: string; note: string }[] = [
  { label: "Canje del carné de conducir", note: "Sede DGT; no es una guía de este pack." },
  { label: "Vida laboral", note: "Import@ss / Seguridad Social." },
  { label: "SEPE (fin de temporada)", note: "Sede SEPE." },
  { label: "Certificado de antecedentes", note: "Ministerio de Justicia." },
  { label: "Bono social térmico / invierno", note: "Comunidad y comercializadora." },
  { label: "Cita Seguridad Social / NUSS", note: "Import@ss; no es pediatra." },
];
