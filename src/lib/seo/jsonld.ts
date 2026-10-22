import { CONTACT_EMAIL, PRODUCT_NAME, SITE_ORIGIN } from "@/lib/types";
import { absoluteUrl } from "@/lib/geo/paths";
import type { Guide } from "@/lib/tramites/types";
import type { Article, BreadcrumbList, FAQPage, Organization, WebSite, WithContext } from "schema-dts";

export type Crumb = { name: string; path: string };

export function organizationJsonLd(): WithContext<Organization> {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    "@id": `${SITE_ORIGIN}#organization`,
    name: PRODUCT_NAME,
    alternateName: "Equipo RutaTrámite",
    url: SITE_ORIGIN,
    logo: `${SITE_ORIGIN}/icon`,
    description:
      "Guía ciudadana independiente sobre trámites en España: padrón, documentación, extranjería, educación, familia y modelos de escritos. No es Administración Pública.",
    areaServed: { "@type": "Country", name: "España" },
    knowsAbout: [
      "empadronamiento",
      "padrón municipal",
      "volante de empadronamiento",
      "certificado de empadronamiento",
      "DNI y pasaporte",
      "extranjería",
      "becas y educación",
      "trámites familiares",
      "modelos de escritos",
    ],
    publishingPrinciples: `${SITE_ORIGIN}/metodologia`,
    correctionsPolicy: `${SITE_ORIGIN}/quienes-somos#correcciones`,
    sameAs: ["https://www.youtube.com/@rutatramitebot", "https://www.youtube.com/channel/UCMya0aRWeiB-4tSefDaeKUQ"],
    email: CONTACT_EMAIL,
    contactPoint: {
      "@type": "ContactPoint",
      email: CONTACT_EMAIL,
      contactType: "editorial",
      availableLanguage: "Spanish",
    },
  };
}

export function websiteJsonLd(): WithContext<WebSite> {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": `${SITE_ORIGIN}#website`,
    name: PRODUCT_NAME,
    url: SITE_ORIGIN,
    inLanguage: "es-ES",
    publisher: { "@type": "Organization", "@id": `${SITE_ORIGIN}#organization`, name: PRODUCT_NAME, url: SITE_ORIGIN },
    // No SearchAction: /buscar is noindex, follow. A sitelinks target must be indexable.
  };
}

export function breadcrumbJsonLd(crumbs: Crumb[]): WithContext<BreadcrumbList> {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: crumbs.map((c, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: c.name,
      item: absoluteUrl(c.path),
    })),
  };
}

export function guideFaqs(guide: Guide) {
  return guide.faqs ?? [];
}

export function guideFaqJsonLd(guide: Guide): WithContext<FAQPage>[] {
  const faqs = guideFaqs(guide);
  if (!faqs.length) return [];
  return [
    {
      "@context": "https://schema.org",
      "@type": "FAQPage",
      mainEntity: faqs.map((f) => ({
        "@type": "Question",
        name: f.q,
        acceptedAnswer: { "@type": "Answer", text: f.a },
      })),
    },
  ];
}

export function articleJsonLd(opts: {
  headline: string;
  description: string;
  path: string;
  dateModified: string;
  sources?: string[];
}): WithContext<Article> {
  return {
    "@context": "https://schema.org",
    "@type": "Article",
    "@id": `${absoluteUrl(opts.path)}#article`,
    headline: opts.headline,
    description: opts.description,
    inLanguage: "es-ES",
    dateModified: opts.dateModified,
    mainEntityOfPage: absoluteUrl(opts.path),
    author: { "@type": "Organization", "@id": `${SITE_ORIGIN}#organization`, name: "Equipo RutaTrámite", url: `${SITE_ORIGIN}/quienes-somos` },
    publisher: { "@type": "Organization", "@id": `${SITE_ORIGIN}#organization`, name: PRODUCT_NAME, url: SITE_ORIGIN },
    ...(opts.sources?.length ? { citation: [...new Set(opts.sources)] } : {}),
  };
}
