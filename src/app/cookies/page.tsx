import { PageShell } from "@/components/ui/PageShell";
import { pageMetadata } from "@/lib/seo/meta";
import { CONTACT_EMAIL, PRODUCT_NAME } from "@/lib/types";
import type { Metadata } from "next";

export const metadata: Metadata = pageMetadata({
  title: "Política de cookies",
  description:
    "Información detallada sobre las cookies utilizadas en RutaTrámite, el servicio Google AdSense y cómo configurar o revocar tu consentimiento en cualquier momento.",
  path: "/cookies",
});

export default function CookiesPage() {
  return (
    <PageShell as="article" className="space-y-6">
      <header className="space-y-2 border-b border-sand pb-4">
        <h1 className="font-display text-4xl text-ink">Política de cookies</h1>
        <p className="text-lg text-ink/80 leading-relaxed">
          En cumplimiento del artículo 22.2 de la Ley 34/2002 (LSSI-CE) y del Reglamento General de Protección de Datos
          (RGPD), te informamos de forma transparente y accesible sobre qué cookies utilizamos en {PRODUCT_NAME}, con qué
          finalidad y cómo puedes gestionarlas o desactivarlas.
        </p>
      </header>

      <section className="space-y-3">
        <h2 className="text-2xl font-semibold text-mossDark">1. ¿Qué son las cookies y para qué se utilizan?</h2>
        <p className="leading-relaxed">
          Una cookie es un pequeño archivo de texto que los sitios web descargan en tu navegador (ordenador, teléfono
          móvil o tableta) al visitarlos. Las cookies permiten a las páginas web almacenar y recuperar información
          técnica, recordar preferencias de navegación y, en su caso, mostrar publicidad contextual adaptada.
        </p>
        <p className="leading-relaxed">
          En {PRODUCT_NAME} aplicamos un principio de <strong>minimización de datos</strong>: el uso del asistente de
          empadronamiento y la consulta de guías informativas se realiza en tu propio navegador de forma anónima, sin
          necesidad de registrar una cuenta ni identificarte.
        </p>
      </section>

      <section className="space-y-3">
        <h2 className="text-2xl font-semibold text-mossDark">2. Tipos de cookies utilizadas en este sitio web</h2>
        <p className="leading-relaxed">
          En función de su emisor, finalidad y plazo de conservación, en nuestra web se diferencian las siguientes
          categorías:
        </p>

        <div className="space-y-4 pt-2">
          <div className="rounded-lg border border-sand bg-warmWhite/50 p-4">
            <h3 className="font-semibold text-ink">A. Cookies técnicas y funcionales (Estrictamente necesarias)</h3>
            <p className="mt-1 text-sm text-ink/80 leading-relaxed">
              Son aquellas que permiten al usuario la navegación a través de la página web y la utilización de las
              diferentes opciones o servicios existentes, como controlar el tráfico, identificar la sesión o recordar
              si has configurado tus preferencias de privacidad. Estas cookies están exentas del requisito de
              consentimiento previo según el artículo 22.2 de la LSSI-CE.
            </p>
          </div>

          <div className="rounded-lg border border-sand bg-warmWhite/50 p-4">
            <h3 className="font-semibold text-ink">B. Medición analítica propia (Sin cookies)</h3>
            <p className="mt-1 text-sm text-ink/80 leading-relaxed">
              Nuestro sistema de medición interna de uso cuenta acciones agregadas (visitas totales, consultas del
              asistente y descargas de modelos) <strong>sin utilizar cookies</strong>, sin almacenar direcciones IP y
              sin rastrear visitantes entre diferentes sitios. Respeta estrictamente la cabecera Do Not Track.
            </p>
          </div>

          <div className="rounded-lg border border-sand bg-warmWhite/50 p-4">
            <h3 className="font-semibold text-ink">C. Cookies publicitarias y de terceros (Google AdSense)</h3>
            <p className="mt-1 text-sm text-ink/80 leading-relaxed">
              {PRODUCT_NAME} utiliza los servicios publicitarios de <strong>Google AdSense</strong>, operado por Google
              LLC / Google Ireland Limited. Google utiliza cookies (como las asociadas a DoubleClick) para mostrar
              anuncios relevantes a los usuarios en función de sus visitas previas a este u otros sitios web de internet.
            </p>
          </div>
        </div>
      </section>

      <section className="space-y-3">
        <h2 className="text-2xl font-semibold text-mossDark">3. Cuadro detallado de cookies de terceros</h2>
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm border-collapse border border-sand">
            <thead>
              <tr className="bg-sand/30 text-ink">
                <th className="p-3 border border-sand">Cookie</th>
                <th className="p-3 border border-sand">Proveedor</th>
                <th className="p-3 border border-sand">Finalidad</th>
                <th className="p-3 border border-sand">Caducidad</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-sand/40">
              <tr>
                <td className="p-3 border border-sand font-mono text-xs">__gads</td>
                <td className="p-3 border border-sand">Google AdSense</td>
                <td className="p-3 border border-sand">Permite a Google medir la frecuencia de los anuncios y prevenir fraudes.</td>
                <td className="p-3 border border-sand">13 meses</td>
              </tr>
              <tr>
                <td className="p-3 border border-sand font-mono text-xs">__gpi</td>
                <td className="p-3 border border-sand">Google AdSense</td>
                <td className="p-3 border border-sand">Recopila información analítica para informar del rendimiento publicitario.</td>
                <td className="p-3 border border-sand">13 meses</td>
              </tr>
              <tr>
                <td className="p-3 border border-sand font-mono text-xs">IDE / DSID</td>
                <td className="p-3 border border-sand">Google DoubleClick</td>
                <td className="p-3 border border-sand">Utilizada para orientar anuncios en la red de publicidad de Google según el perfil de navegación.</td>
                <td className="p-3 border border-sand">1 año / 2 semanas</td>
              </tr>
              <tr>
                <td className="p-3 border border-sand font-mono text-xs">FCCDCF / FCNEC</td>
                <td className="p-3 border border-sand">Google Funding Choices</td>
                <td className="p-3 border border-sand">Almacena el estado de consentimiento otorgado por el usuario en el banner de privacidad (CMP).</td>
                <td className="p-3 border border-sand">12 meses</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      <section className="space-y-3">
        <h2 className="text-2xl font-semibold text-mossDark">4. Plataforma de gestión del consentimiento (CMP)</h2>
        <p className="leading-relaxed">
          En el Espacio Económico Europeo (EEE), el consentimiento para la instalación de cookies publicitarias se
          gestiona de forma previa mediante la Plataforma de Gestión del Consentimiento (CMP) certificada por Google y
          homologada conforme al marco de transparencia TCF v2.2 de IAB Europe.
        </p>
        <p className="leading-relaxed">
          Al acceder por primera vez a la web, puedes aceptar todas las cookies, rechazarlas o configurar tus preferencias
          por categoría o proveedor. Asimismo, puedes modificar o revocar tu consentimiento en cualquier momento.
        </p>
      </section>

      <section className="space-y-3">
        <h2 className="text-2xl font-semibold text-mossDark">5. Cómo deshabilitar o eliminar cookies desde tu navegador</h2>
        <p className="leading-relaxed">
          Puedes permitir, bloquear o eliminar las cookies instaladas en tu equipo mediante la configuración de las
          opciones del navegador que utilices:
        </p>
        <ul className="list-disc space-y-2 pl-6">
          <li>
            <strong>Google Chrome:</strong> Configuración &gt; Privacidad y seguridad &gt; Cookies y otros datos de sitios.
          </li>
          <li>
            <strong>Mozilla Firefox:</strong> Ajustes &gt; Privacidad y Seguridad &gt; Cookies y datos del sitio.
          </li>
          <li>
            <strong>Apple Safari:</strong> Preferencias &gt; Privacidad &gt; Bloquear todas las cookies.
          </li>
          <li>
            <strong>Microsoft Edge:</strong> Configuración &gt; Cookies y permisos del sitio &gt; Administrar y eliminar cookies.
          </li>
        </ul>
        <p className="leading-relaxed pt-1">
          Además, puedes inhabilitar el uso de cookies para publicidad personalizada de Google visitando la página oficial de{" "}
          <a
            className="underline font-medium text-mossDark"
            href="https://myadcenter.google.com/"
            target="_blank"
            rel="noopener noreferrer"
          >
            Centro de anuncios de Google
          </a>{" "}
          o la plataforma de autorregulación europea{" "}
          <a
            className="underline font-medium text-mossDark"
            href="https://www.youronlinechoices.com/es/"
            target="_blank"
            rel="noopener noreferrer"
          >
            Your Online Choices
          </a>.
        </p>
      </section>

      <section className="space-y-3">
        <h2 className="text-2xl font-semibold text-mossDark">6. Dudas sobre nuestra política de cookies</h2>
        <p className="leading-relaxed">
          Si tienes cualquier consulta sobre el uso de cookies en {PRODUCT_NAME}, puedes dirigirte a nuestro buzón
          editorial en <a className="underline font-medium text-mossDark" href={`mailto:${CONTACT_EMAIL}`}>{CONTACT_EMAIL}</a> o
          consultar nuestra <a className="underline" href="/privacidad">Política de privacidad</a>.
        </p>
      </section>
    </PageShell>
  );
}
