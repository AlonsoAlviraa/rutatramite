import { SITE_ORIGIN } from "@/lib/types";

export const DATASET_LICENSE_ID = "licencia-datos-v1";
export const DATASET_LICENSE_URL = `${SITE_ORIGIN}/recursos#${DATASET_LICENSE_ID}`;
export const DATASET_LICENSE = {
  "@type": "CreativeWork" as const,
  name: "Condiciones de reutilización de los datos de RutaTrámite — versión 1",
  url: DATASET_LICENSE_URL,
};

export const DATASET_REUSE_TERMS = [
  "Puedes consultar, descargar, compartir y reutilizar gratuitamente la selección y los resúmenes editoriales de los conjuntos de ayudas y padrón municipal de RutaTrámite, disponibles en HTML, JSON y CSV.",
  "Al reutilizarlos, identifica a RutaTrámite, enlaza la página del conjunto y conserva las fuentes y fechas de revisión. Indica las modificaciones que hayas realizado y la fecha de consulta. No presentes la reutilización como una validación de una Administración ni de RutaTrámite.",
  "Estas condiciones se aplican a la aportación editorial de RutaTrámite. Los documentos, formularios PDF, imágenes y contenidos de terceros conservan sus propias condiciones de uso; consulta al organismo o titular correspondiente.",
  "Los datos son orientativos, pueden quedar desactualizados y no garantizan la admisión de una solicitud, la concesión de una ayuda ni la disponibilidad de una cita. Contrasta los requisitos y plazos en cada fuente oficial.",
];
