import type { Metadata, Viewport } from "next";
import { Newsreader, Public_Sans } from "next/font/google";
import { NextIntlClientProvider } from "next-intl";
import { JsonLd } from "@/components/empadronamiento/JsonLd";
import { SiteFooter } from "@/components/empadronamiento/SiteFooter";
import { SiteHeader } from "@/components/empadronamiento/SiteHeader";
import { organizationJsonLd, websiteJsonLd } from "@/lib/seo/jsonld";
import { localeAlternates } from "@/lib/seo/hreflang";
import { PRODUCT_NAME, SITE_ORIGIN } from "@/lib/types";
import messages from "../../messages/es.json";
import "./globals.css";

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
    languages: localeAlternates(SITE_ORIGIN),
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
        <NextIntlClientProvider locale="es" messages={messages} timeZone="Europe/Madrid">
          <a className="skip-link" href="#contenido">
            Saltar al contenido
          </a>
          <SiteHeader />
          <main id="contenido">{children}</main>
          <SiteFooter />
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
