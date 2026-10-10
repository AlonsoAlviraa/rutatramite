import type { Metadata } from "next";
import { PRODUCT_NAME } from "@/lib/types";

/**
 * Experimento SEO 2026-10-10 «title sin sufijo de marca» (vault RutaTrámite).
 * Páginas tratadas: URLs con impresiones en Search Console (28 días a 2026-10-08) que usan pageMetadata()
 * y cuyo title + « · RutaTrámite» supera 60 caracteres. Se publica el title sin sufijo ({ absolute }).
 * Control (mantienen sufijo): /dni/cita-previa, /extranjeria/autorizacion-regreso, /inventario-fianza-alquiler.
 * Medir CTR por página a +7 y +14 días. Revertir: vaciar NO_BRAND_SUFFIX_PATHS.
 */
export const NO_BRAND_SUFFIX_PATHS: ReadonlySet<string> = new Set([
  "/dni",
  "/pasaporte",
  "/becas",
  "/empadronarse",
  "/extranjeria",
  "/descargas",
  "/recursos",
  "/recursos/padron-municipal",
  "/fuentes",
  "/empadronarse/comunidad-de-madrid",
  "/empadronarse/extremadura",
]);

export const BRAND_SUFFIX = ` · ${PRODUCT_NAME}`;
export const TITLE_MAX = 60;

export function titleWithExperiment(title: string, path: string): Metadata["title"] {
  if (NO_BRAND_SUFFIX_PATHS.has(path) && title.length + BRAND_SUFFIX.length > TITLE_MAX) {
    return { absolute: title };
  }
  return title;
}
