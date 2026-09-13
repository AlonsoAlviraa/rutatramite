import type { Metadata } from "next";
import type { Municipio } from "@/lib/types";
import { PRODUCT_NAME, SITE_ORIGIN } from "@/lib/types";
import { absoluteUrl } from "@/lib/geo/paths";
import { localeAlternates } from "@/lib/seo/hreflang";
import { isFichaIndexable } from "@/lib/seo/localSignals";

export function clipMeta(text: string, max = 158): string {
  const t = text.replace(/\s+/g, " ").trim();
  if (t.length <= max) return t;
  const cut = t.slice(0, max - 1);
  const sp = cut.lastIndexOf(" ");
  return `${(sp > 80 ? cut.slice(0, sp) : cut).replace(/[.,;:]$/, "")}…`;
}

export function canalMeta(m: Municipio): string {
  if (m.online === true && m.cita_previa === "required") return "online y con cita";
  if (m.online === true) return "online";
  if (m.cita_previa === "required") return "con cita";
  if (m.cita_previa === "walk-in") return "presencial";
  if (m.sede_url) return "sede municipal";
  return "en el Ayuntamiento";
}

export function fichaSeo(m: Municipio): { title: string; description: string; canonical: string } {
  const canal = canalMeta(m);
  const title = `Empadronarse en ${m.name} (${m.province_name}): documentos, cita y sede 2026`;
  const description = clipMeta(
    `Empadronarse en ${m.name}: documentos, ${canal}, órgano Ayuntamiento de ${m.name}. Alta gratuita. ${PRODUCT_NAME} no es Administración.`,
  );
  return { title, description, canonical: absoluteUrl(m.path) };
}

export function pageMetadata(opts: {
  title: string;
  description: string;
  path: string;
  index?: boolean;
  modified?: string;
  type?: "website" | "article";
  keywords?: string[];
}): Metadata {
  const url = absoluteUrl(opts.path);
  const description = clipMeta(opts.description);
  const index = opts.index !== false;
  return {
    title: opts.title,
    description,
    ...(opts.keywords !== undefined ? { keywords: opts.keywords } : {}),
    alternates: { canonical: url, languages: localeAlternates(url) },
    robots: index ? { index: true, follow: true } : { index: false, follow: true },
    openGraph: {
      type: opts.type ?? "website",
      locale: "es_ES",
      url,
      siteName: PRODUCT_NAME,
      title: opts.title,
      description,
      ...(opts.modified ? { modifiedTime: opts.modified } : {}),
    },
    twitter: {
      card: "summary_large_image",
      title: opts.title,
      description,
    },
  };
}

/** Shipped ficha metadata: playbook anti-thin gate, not status-only. */
export function fichaPageMetadata(m: Municipio): Metadata {
  const seo = fichaSeo(m);
  return pageMetadata({
    title: seo.title,
    description: seo.description,
    path: m.path,
    index: isFichaIndexable(m),
    type: "article",
    modified: m.last_verified,
  });
}

export { SITE_ORIGIN, PRODUCT_NAME };
