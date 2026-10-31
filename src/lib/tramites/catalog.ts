import { mejorar20261024 } from "@/lib/tramites/mejoras-20261024";
import { ACTUALIDAD_20261006_GUIDES } from "@/lib/tramites/actualidad-20261006";
import { AYUDAS_GOBIERNO_GUIDES } from "@/lib/tramites/ayudas-por-gobierno";
import { PROMESAS_29N_GUIDES, ELECCIONES_EXPLICADORES_GUIDES } from "@/lib/tramites/promesas-29n";
import { ELECCIONES_29N_GUIDES } from "@/lib/tramites/elecciones-29n-guias";
import { CUANDO_29N_GUIDES } from "@/lib/tramites/cuando-29n";
import { VOTO_NULO_CASOS_GUIDES } from "@/lib/tramites/voto-nulo-casos";
import { CONTRATO_PP_GUIDES } from "@/lib/tramites/contrato-pp";
import { BEBE_GUIDES } from "@/lib/tramites/bebe";
import { AYUDAS_2026_GUIDES } from "@/lib/tramites/ayudas-2026";
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
import { COBROS_AVISOS_GUIDES } from "@/lib/tramites/cobros-avisos";
import { FAMILIA_CCAA_GUIDES } from "@/lib/tramites/familia-ccaa";
import { MODELO_GUIDES } from "@/lib/tramites/modelos";
import { FP_GUIDES } from "@/lib/tramites/fp";
import { MUDANZA_GUIDES } from "@/lib/tramites/mudanza";
import type { Guide, GuidePack } from "@/lib/tramites/types";
import { VIAJE_GUIDES } from "@/lib/tramites/viaje";
import { GESTIONES_CLAVE_GUIDES } from "@/lib/tramites/gestiones-clave-2026";
import { ENCUESTAS_29N_GUIDES } from "@/lib/tramites/encuestas-29n";
import { PENSIONES_29N_GUIDES } from "@/lib/tramites/pensiones-29n";
import { JUBILACION_2026_GUIDES } from "@/lib/tramites/jubilacion-2026";
import { NOVEDADES_20261021_GUIDES } from "@/lib/tramites/novedades-20261021";
import { PROMESAS_INCUMPLIDAS_GUIDES } from "@/lib/tramites/promesas-incumplidas";
import { VOTO_PROVINCIA_GUIDES } from "@/lib/tramites/voto-provincia-29n";
import { AGENDA_29N_GUIDES } from "@/lib/tramites/agenda-29n";
import { VOTO_UTIL_GUIDES } from "@/lib/tramites/voto-util-29n";
import { MAPA_VOTO_UTIL_GUIDES } from "@/lib/tramites/mapa-voto-util-29n";
import { MARICARMEN_HUELGA_GUIDES } from "@/lib/tramites/maricarmen-huelga-11n";
import { VIRAL_20261023_GUIDES } from "@/lib/tramites/viral-20261023";
import { MESA_29N_20261023_GUIDES, ampliarMesa } from "@/lib/tramites/mesa-29n-20261023";
import { CARTAS_29N_20261024_GUIDES, ampliarCartas } from "@/lib/tramites/cartas-29n-20261024";
import { DONATIVOS_NOMINA_GUIDES, enlazarDonativosNomina } from "@/lib/tramites/donativos-nomina-2027-20261026";
import { PENDIENTES_1027_GUIDES, enlazarPendientes1027 } from "@/lib/tramites/pendientes-20261027";
import { TARJETA_MADRID_1027_GUIDES, enlazarTarjetaMadrid1027 } from "@/lib/tramites/tarjeta-madrid-20261027";
import { FORM_CIUDADES_1027_GUIDES, enlazarFormCiudades1027 } from "@/lib/tramites/formularios-ciudades-20261027";
import { FORM_CIUDADES2_1027_GUIDES, enlazarFormCiudades2_1027 } from "@/lib/tramites/formularios-ciudades2-20261027";
import { MESAS_CIUDADES_1031_GUIDES, enlazarMesasCiudades1031 } from "@/lib/tramites/mesas-ciudades-20261031";
import { MESAS_CIUDADES_1031B_ALL, enlazarMesasCiudades1031b } from "@/lib/tramites/mesas-ciudades-20261031b";
import { EMPADRONAMIENTO_1027_GUIDES, enlazarEmpadronamiento1027 } from "@/lib/tramites/empadronamiento-20261027";
import { AUTONOMOS_VERIFACTU_20261025_GUIDES, enlazarAutonomosVerifactu } from "@/lib/tramites/autonomos-verifactu-20261025";
import { SITUACIONES_ESPECIALES_GUIDES, enlazarSituacionesEspeciales } from "@/lib/tramites/votar-situaciones-especiales-20261026";
import { mejorarCtr20261026 } from "@/lib/tramites/mejoras-ctr-20261026";
import { TERRITORIO_29N_GUIDES, ampliarTerritorio } from "@/lib/tramites/territorio-29n-20261025";
import { TRANSPORTE_29N_GUIDES, enlazarTransporte } from "@/lib/tramites/transporte-votar-29n-20261025";

export const ALL_GUIDES: Guide[] = [
  ...ACTUALIDAD_20261006_GUIDES,
  ...ELECCIONES_29N_GUIDES,
  ...CUANDO_29N_GUIDES.map(ampliarMesa),
  ...VOTO_NULO_CASOS_GUIDES,
  ...CONTRATO_PP_GUIDES,
  ...ELECCIONES_EXPLICADORES_GUIDES,
  ...PROMESAS_29N_GUIDES,
  ...PENSIONES_29N_GUIDES,
  ...ENCUESTAS_29N_GUIDES,
  ...AYUDAS_GOBIERNO_GUIDES,
  ...AYUDAS_2026_GUIDES,
  ...VIAJE_GUIDES,
  ...GESTIONES_CLAVE_GUIDES,
  ...JUBILACION_2026_GUIDES,
  ...NOVEDADES_20261021_GUIDES,
  ...PROMESAS_INCUMPLIDAS_GUIDES,
  ...VOTO_PROVINCIA_GUIDES,
  ...AGENDA_29N_GUIDES,
  ...VOTO_UTIL_GUIDES,
  ...MAPA_VOTO_UTIL_GUIDES,
  ...MARICARMEN_HUELGA_GUIDES,
  ...VIRAL_20261023_GUIDES,
  ...MESA_29N_20261023_GUIDES,
  ...CARTAS_29N_20261024_GUIDES,
  ...AUTONOMOS_VERIFACTU_20261025_GUIDES,
  ...DONATIVOS_NOMINA_GUIDES,
  ...PENDIENTES_1027_GUIDES,
  ...EMPADRONAMIENTO_1027_GUIDES,
  ...TARJETA_MADRID_1027_GUIDES,
  ...FORM_CIUDADES_1027_GUIDES, ...FORM_CIUDADES2_1027_GUIDES,
  ...MESAS_CIUDADES_1031_GUIDES,
  ...MESAS_CIUDADES_1031B_ALL,
  ...TERRITORIO_29N_GUIDES,
  ...TRANSPORTE_29N_GUIDES,
  ...SITUACIONES_ESPECIALES_GUIDES,
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
  ...FAMILIA_CCAA_GUIDES,
  ...COBROS_AVISOS_GUIDES,
  ...MODELO_GUIDES,
].map(ampliarCartas).map(mejorar20261024).map(enlazarAutonomosVerifactu).map(ampliarTerritorio).map(enlazarTransporte).map(mejorarCtr20261026).map(enlazarSituacionesEspeciales).map(enlazarDonativosNomina).map(enlazarPendientes1027).map(enlazarEmpadronamiento1027).map(enlazarTarjetaMadrid1027).map(enlazarFormCiudades1027).map(enlazarFormCiudades2_1027).map(enlazarMesasCiudades1031).map(enlazarMesasCiudades1031b);

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
