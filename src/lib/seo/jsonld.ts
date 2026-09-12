import { CONTACT_EMAIL, PRODUCT_NAME, SITE_ORIGIN } from "@/lib/types";
import { absoluteUrl } from "@/lib/geo/paths";
import type { Guide } from "@/lib/tramites/types";

export type Crumb = { name: string; path: string };

export function organizationJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: PRODUCT_NAME,
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
    email: CONTACT_EMAIL,
    contactPoint: {
      "@type": "ContactPoint",
      email: CONTACT_EMAIL,
      contactType: "editorial",
      availableLanguage: "Spanish",
    },
  };
}

export function websiteJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: PRODUCT_NAME,
    url: SITE_ORIGIN,
    inLanguage: "es-ES",
    publisher: { "@type": "Organization", name: PRODUCT_NAME, url: SITE_ORIGIN },
    potentialAction: {
      "@type": "SearchAction",
      target: {
        "@type": "EntryPoint",
        urlTemplate: `${SITE_ORIGIN}/buscar?q={search_term_string}`,
      },
      "query-input": "required name=search_term_string",
    },
  };
}

export function breadcrumbJsonLd(crumbs: Crumb[]) {
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

export function guideFaqJsonLd(guide: Guide): unknown[] {
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
}) {
  return {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: opts.headline,
    description: opts.description,
    inLanguage: "es-ES",
    dateModified: opts.dateModified,
    mainEntityOfPage: absoluteUrl(opts.path),
    author: { "@type": "Organization", name: PRODUCT_NAME, url: SITE_ORIGIN },
    publisher: { "@type": "Organization", name: PRODUCT_NAME, url: SITE_ORIGIN },
  };
}
