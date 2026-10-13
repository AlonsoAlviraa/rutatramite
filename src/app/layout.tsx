import type { Metadata, Viewport } from "next";
import { Newsreader, Public_Sans } from "next/font/google";
import { JsonLd } from "@/components/empadronamiento/JsonLd";
import { SiteFooter } from "@/components/empadronamiento/SiteFooter";
import { SiteHeader } from "@/components/empadronamiento/SiteHeader";
import { organizationJsonLd, websiteJsonLd } from "@/lib/seo/jsonld";
import { PRODUCT_NAME, SITE_ORIGIN } from "@/lib/types";
import "./globals.css";
import { Metrics } from "@/components/ui/Metrics";

/** Umami (sin cookies) servido en el mismo origen vía Caddy /stats. Inactivo si no se define NEXT_PUBLIC_UMAMI_WEBSITE_ID en el build. */
const UMAMI_WEBSITE_ID = process.env.NEXT_PUBLIC_UMAMI_WEBSITE_ID;

const sans = Public_Sans({
  subsets: ["latin"],
  variable: "--font-source-sans",
  display: "swap",
});

const display = Newsreader({
  subsets: ["latin"],
  variable: "--font-display",
  display: "swap",
});

export const viewport: Viewport = {
  themeColor: "#1B4332",
  width: "device-width",
  initialScale: 1,
};

export const metadata: Metadata = {
  metadataBase: new URL(SITE_ORIGIN),
  title: {
    default: `${PRODUCT_NAME}: guías de trámites en España`,
    template: `%s · ${PRODUCT_NAME}`,
  },
  description:
    "Guías de trámites en España: padrón, DNI, extranjería, becas y modelos de escritos. Información independiente y enlaces a los organismos responsables.",
  applicationName: PRODUCT_NAME,
  authors: [{ name: PRODUCT_NAME, url: SITE_ORIGIN }],
  creator: PRODUCT_NAME,
  publisher: PRODUCT_NAME,
  category: "reference",
  alternates: {
    canonical: SITE_ORIGIN,
    languages: { es: SITE_ORIGIN, "x-default": SITE_ORIGIN },
  },
  openGraph: {
    type: "website",
    locale: "es_ES",
    url: SITE_ORIGIN,
    siteName: PRODUCT_NAME,
    title: `${PRODUCT_NAME}: guías de trámites en España`,
    description:
      "Guías de trámites, documentos y sedes oficiales. Información independiente, sin registro.",
  },
  twitter: {
    card: "summary_large_image",
    title: `${PRODUCT_NAME}: guías de trámites en España`,
    description:
      "Guías de trámites, documentos y sedes oficiales. Información independiente, sin registro.",
  },
  robots: { index: true, follow: true, googleBot: { index: true, follow: true } },
  formatDetection: { telephone: false, email: false, address: false },
  other: { "geo.region": "ES" },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es" className={`${sans.variable} ${display.variable}`}>
      <body className="min-h-screen font-sans antialiased">
        <JsonLd data={[organizationJsonLd(), websiteJsonLd()]} />
        <a className="skip-link" href="#contenido" tabIndex={0}>
          Saltar al contenido
        </a>
        <SiteHeader />
        <main id="contenido">{children}</main>
        <SiteFooter />
        <Metrics />
        {UMAMI_WEBSITE_ID ? (
          <script defer src="/stats/script.js" data-website-id={UMAMI_WEBSITE_ID} data-host-url="/stats" data-do-not-track="true" />
        ) : null}
      </body>
    </html>
  );
}
