import { MODELOS_FAMILIA } from "@/lib/tramites/modelos-familia";
import { MODELOS_SEDES } from "@/lib/tramites/modelos-sedes";
import { MODELOS_TRABAJO } from "@/lib/tramites/modelos-trabajo";
import { MODELOS_VIVIENDA } from "@/lib/tramites/modelos-vivienda";
import type { Guide } from "@/lib/tramites/types";

export const MODELO_GUIDES: Guide[] = [
  ...MODELOS_TRABAJO,
  ...MODELOS_VIVIENDA,
  ...MODELOS_FAMILIA,
  ...MODELOS_SEDES,
];

export const MODELO_PATHS = [
  "/modelo-baja-voluntaria",
  "/baja-voluntaria-sin-preaviso",
  "/baja-periodo-de-prueba",
  "/modelo-finiquito",
  "/he-firmado-finiquito-puedo-reclamar",
  "/certificado-empresa-sepe",
  "/modelo-excedencia-voluntaria",
  "/modelo-reduccion-jornada",
  "/solicitud-vacaciones",
  "/reclamacion-salarios-modelo",
  "/solicitud-permiso-retribuido",
  "/preaviso-fin-alquiler",
  "/no-renovacion-alquiler",
  "/requerimiento-impago-alquiler",
  "/inventario-fianza-alquiler",
  "/autorizacion-empadronamiento",
  "/declaracion-responsable-padron",
  "/autorizacion-empadronar-menor",
  "/autorizacion-recogida-colegio",
  "/justificante-ausencia-escolar",
  "/solicitud-comedor-escolar",
  "/autorizacion-viaje-menor",
  "/autorizacion-representacion-tramite",
  "/acuse-de-recibo-modelo",
  "/modelo-subsanacion",
  "/modelo-030-cambio-domicilio",
] as const;

export type ModeloPath = (typeof MODELO_PATHS)[number];
