import { withoutLegacyEsHost } from "@/lib/seo/origin";
import { SITE_ORIGIN } from "@/lib/types";

/** SITE_MAP immutable geo URL: /empadronarse/{ccaa}/{provincia}/{municipio} */
export function municipioPath(ccaaSlug: string, provinceSlug: string, municipioSlug: string): string {
  return `/empadronarse/${ccaaSlug}/${provinceSlug}/${municipioSlug}`;
}

export function provinciaPath(ccaaSlug: string, provinceSlug: string): string {
  return `/empadronarse/${ccaaSlug}/${provinceSlug}`;
}

export function ccaaPath(ccaaSlug: string): string {
  return `/empadronarse/${ccaaSlug}`;
}

export function escenarioPath(slug: string): string {
  return `/empadronarse/${slug}`;
}

export function absoluteUrl(path: string): string {
  if (path.startsWith("http")) return withoutLegacyEsHost(path);
  return `${SITE_ORIGIN}${path.startsWith("/") ? path : `/${path}`}`;
}
