import { PageShell } from "@/components/ui/PageShell";
import { pageMetadata } from "@/lib/seo/meta";
import { CONTACT_EMAIL, PRODUCT_NAME, SITE_ORIGIN } from "@/lib/types";
import type { Metadata } from "next";

export const metadata: Metadata = pageMetadata({
  title: "Contacto",
  description:
    "Canales de contacto editorial de RutaTrámite: correcciones normativas, fe de errores, consultas de privacidad y tiempo de respuesta.",
  path: "/contacto",
});

export default function ContactoPage() {
  return (
    <PageShell as="article" className="space-y-6">
      <header className="space-y-2 border-b border-sand pb-4">
        <h1 className="font-display text-4xl text-ink">Contacto</h1>
        <p className="text-lg text-ink/80 leading-relaxed">
          {PRODUCT_NAME} es una guía ciudadana independiente. Ponemos a tu disposición diferentes canales de contacto
          editorial para atender sugerencias, comunicar errores normativos o resolver dudas sobre el funcionamiento de
          nuestras herramientas.
        </p>
      </header>

      <section className="space-y-3">
        <h2 className="text-2xl font-semibold text-mossDark">1. Canal de atención editorial principal</h2>
        <p className="leading-relaxed">
          Para comunicarte con nuestro equipo editorial, escríbenos directamente a:
        </p>
        <p className="text-xl font-medium text-mossDark">
          <a className="underline" href={`mailto:${CONTACT_EMAIL}`}>
            {CONTACT_EMAIL}
          </a>
        </p>
        <p className="text-sm text-ink/70 leading-relaxed">
          Nuestro compromiso de atención: revisamos todos los mensajes recibidos y respondemos en un plazo máximo habitual
          de <strong>24 a 48 horas laborables</strong>.
        </p>
      </section>

      <section className="space-y-3">
        <h2 className="text-2xl font-semibold text-mossDark">2. Tipos de consultas que atendemos</h2>
        <div className="grid gap-4 sm:grid-cols-2 pt-2">
          <div className="rounded-lg border border-sand bg-warmWhite/50 p-4">
            <h3 className="font-semibold text-ink">Correcciones y fe de errores</h3>
            <p className="mt-1 text-sm text-ink/80 leading-relaxed">
              Si un ayuntamiento u organismo ha modificado su sede electrónica, requisitos de padrón, plazos de becas o
              tasas oficiales, indícanos la URL de la guía afectada y el enlace a la fuente oficial para su contraste
              inmediato.
            </p>
          </div>
          <div className="rounded-lg border border-sand bg-warmWhite/50 p-4">
            <h3 className="font-semibold text-ink">Privacidad y ejercicio de derechos</h3>
            <p className="mt-1 text-sm text-ink/80 leading-relaxed">
              Consultas relativas al tratamiento de datos, gestión de cookies o ejercicio de derechos ARCO/RGPD según lo
              dispuesto en nuestra <a className="underline" href="/privacidad">Política de privacidad</a>.
            </p>
          </div>
          <div className="rounded-lg border border-sand bg-warmWhite/50 p-4">
            <h3 className="font-semibold text-ink">Prensa y divulgación cívica</h3>
            <p className="mt-1 text-sm text-ink/80 leading-relaxed">
              Consultas de medios de comunicación, entidades educativas o investigadores interesados en nuestros datos
              abiertos y análisis de procedimientos administrativos.
            </p>
          </div>
          <div className="rounded-lg border border-sand bg-warmWhite/50 p-4">
            <h3 className="font-semibold text-ink">Sugerencias y nuevas guías</h3>
            <p className="mt-1 text-sm text-ink/80 leading-relaxed">
              Propuestas de trámites o escenarios que consideres que requieren una explicación paso a paso en lenguaje
              claro.
            </p>
          </div>
        </div>
      </section>

      <section className="space-y-3">
        <h2 className="text-2xl font-semibold text-mossDark">3. Qué incluir al enviar una corrección</h2>
        <p className="leading-relaxed">
          Para que nuestro equipo pueda verificar y publicar una actualización rápidamente, por favor incluye:
        </p>
        <ul className="list-disc space-y-2 pl-6">
          <li>El enlace (URL) exacto de la guía o ficha de {PRODUCT_NAME} que deseas revisar.</li>
          <li>El dato concreto, plazo, tasa o requisito que ha variado.</li>
          <li>El enlace oficial de la sede electrónica municipal, autonómica o publicación en el BOE que lo acredita.</li>
        </ul>
        <p className="font-medium text-amber-900 bg-amber-50 border border-amber-200 p-3 rounded-md text-sm">
          ⚠️ <strong>Aviso importante de protección de datos:</strong> Por tu seguridad, nunca adjuntes a tus correos
          fotografías de tu DNI, NIE, pasaporte, contratos de alquiler, nóminas ni documentos personales de tu expediente.
        </p>
      </section>

      <section className="space-y-3">
        <h2 className="text-2xl font-semibold text-mossDark">4. Trámites que no podemos gestionar</h2>
        <p className="leading-relaxed">
          Te recordamos que {PRODUCT_NAME} ({SITE_ORIGIN}) es una plataforma exclusivamente informativa e independiente.
        </p>
        <ul className="list-disc space-y-2 pl-6">
          <li>No somos una oficina pública ni tenemos acceso a las bases de datos de la Administración.</li>
          <li>No podemos consultar el estado de tu expediente, solicitar citas previas en tu nombre ni anular citas existentes.</li>
          <li>
            Para cualquier gestión particular, debes dirigirte a la sede electrónica o teléfono del organismo responsable
            enlazado en cada guía.
          </li>
        </ul>
      </section>
    </PageShell>
  );
}
