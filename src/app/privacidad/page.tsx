import { PageShell } from "@/components/ui/PageShell";
import { pageMetadata } from "@/lib/seo/meta";
import { CONTACT_EMAIL, PRODUCT_NAME, SITE_ORIGIN } from "@/lib/types";
import type { Metadata } from "next";

export const metadata: Metadata = pageMetadata({
  title: "Política de privacidad",
  description:
    "Política de privacidad de RutaTrámite: navegación anónima, ausencia de cuentas, uso del asistente, Google AdSense y ejercicio de derechos bajo el RGPD.",
  path: "/privacidad",
});

export default function PrivacidadPage() {
  return (
    <PageShell as="article" className="space-y-6">
      <header className="space-y-2 border-b border-sand pb-4">
        <h1 className="font-display text-4xl text-ink">Política de privacidad</h1>
        <p className="text-lg text-ink/80 leading-relaxed">
          En {PRODUCT_NAME} ({SITE_ORIGIN}) nos tomamos muy en serio la privacidad y la protección de datos de los
          ciudadanos. Esta política detalla qué información se procesa cuando consultas nuestras guías o utilizas
          nuestras herramientas, garantizando el estricto cumplimiento del Reglamento (UE) 2016/679 (RGPD) y la Ley
          Orgánica 3/2018 (LOPDGDD).
        </p>
      </header>

      <section className="space-y-3">
        <h2 className="text-2xl font-semibold text-mossDark">1. Responsable del tratamiento</h2>
        <p className="leading-relaxed">
          El responsable del tratamiento de los datos asociados a este sitio web es el <strong>Equipo RutaTrámite</strong>.
          Para cualquier consulta, solicitud de información o ejercicio de derechos en materia de privacidad, puedes
          dirigirte a nuestro canal de contacto:{" "}
          <a className="underline font-medium text-mossDark" href={`mailto:${CONTACT_EMAIL}`}>
            {CONTACT_EMAIL}
          </a>.
        </p>
      </section>

      <section className="space-y-3">
        <h2 className="text-2xl font-semibold text-mossDark">2. Principio de minimización: navegación sin registro</h2>
        <p className="leading-relaxed">
          Puedes consultar todas las guías, comparativas y modelos de documentos de {PRODUCT_NAME} sin registrarte, sin
          crear una cuenta de usuario y sin proporcionar tu nombre, apellidos, dirección postal ni documento de identidad
          (DNI, NIE o pasaporte).
        </p>
        <p className="leading-relaxed">
          <strong>No solicitamos ni almacenamos copias de documentos oficiales.</strong> Si necesitas realizar un trámite,
          nuestras guías te indican directamente qué oficina u organismo oficial es el competente y te facilitan el enlace
          a su sede electrónica, donde tú mismo presentarás tu documentación con tus propios medios de identificación
          (Cl@ve, certificado digital o DNI electrónico).
        </p>
      </section>

      <section className="space-y-3">
        <h2 className="text-2xl font-semibold text-mossDark">3. Funcionamiento del asistente interactivo</h2>
        <p className="leading-relaxed">
          El asistente de padrón te formula preguntas breves de orientación (por ejemplo: si dispones de contrato de
          alquiler o si te empadronas con menores).
        </p>
        <ul className="list-disc space-y-2 pl-6">
          <li>
            <strong>Ejecución local en tu dispositivo:</strong> las respuestas que seleccionas en el asistente se procesan
            exclusivamente en tu navegador para determinar qué documentos exige la normativa y mostrarte la guía
            correspondiente.
          </li>
          <li>
            <strong>Sin envío a servidores:</strong> las opciones marcadas no se asocian a tu identidad ni se guardan en
            bases de datos externas.
          </li>
          <li>
            <strong>Buscador municipal:</strong> el selector de municipios consulta un catálogo estático público basado en
            los códigos del Instituto Nacional de Estadística (INE). Buscar o seleccionar una localidad no requiere indicar
            tu domicilio ni calle.
          </li>
        </ul>
      </section>

      <section className="space-y-3">
        <h2 className="text-2xl font-semibold text-mossDark">4. Medición estadística agregada y anónima</h2>
        <p className="leading-relaxed">
          Para comprender qué guías resultan de utilidad y corregir posibles enlaces desactualizados, disponemos de un
          sistema de medición interno:
        </p>
        <ul className="list-disc space-y-2 pl-6">
          <li>
            <strong>Sin cookies de rastreo:</strong> este medidor propio no deposita cookies en tu navegador ni genera
            identificadores persistentes de visitante.
          </li>
          <li>
            <strong>Sin direcciones IP ni procedencia:</strong> no registramos tu dirección IP, tu historial de navegación
            ni los términos de búsqueda que hayas introducido.
          </li>
          <li>
            <strong>Datos exclusivamente agregados:</strong> únicamente contabilizamos totales numéricos diarios por página
            (por ejemplo, cuántas veces se ha abierto una guía o se ha pulsado en el enlace a una sede oficial). Los datos se
            conservan por un periodo máximo de 180 días con fines de mejora del servicio y respeto absoluto a la señal Do
            Not Track.
          </li>
        </ul>
      </section>

      <section className="space-y-3">
        <h2 className="text-2xl font-semibold text-mossDark">5. Publicidad: Google AdSense y cookies de terceros</h2>
        <p className="leading-relaxed">
          {PRODUCT_NAME} utiliza el servicio de publicidad <strong>Google AdSense</strong>, prestado por Google LLC / Google
          Ireland Limited, para financiar de forma ética los costes de servidores, mantenimiento técnico y verificación
          documental de las guías.
        </p>
        <p className="leading-relaxed">
          Google puede utilizar cookies y tecnologías similares (como cookies de DoubleClick) para mostrar anuncios en
          función de las visitas previas que el usuario haya realizado a este u otros sitios web.
        </p>
        <p className="leading-relaxed">
          En el Espacio Económico Europeo (EEE), el tratamiento de cookies con fines publicitarios está sujeto a tu
          consentimiento libre y explícito, gestionado mediante la Plataforma de Gestión del Consentimiento (CMP) que
          aparece al inicio de tu visita. Puedes rechazar o configurar estas cookies en cualquier momento.
        </p>
        <p className="leading-relaxed">
          Para conocer en detalle el listado de cookies publicitarias y cómo revocarlas, consulta nuestra{" "}
          <a className="underline font-medium text-mossDark" href="/cookies">
            Política de cookies
          </a>. También puedes consultar cómo gestiona Google los datos publicitarios en{" "}
          <a
            className="underline"
            href="https://policies.google.com/technologies/ads"
            target="_blank"
            rel="noopener noreferrer"
          >
            policies.google.com/technologies/ads
          </a>.
        </p>
      </section>

      <section className="space-y-3">
        <h2 className="text-2xl font-semibold text-mossDark">6. Ejercicio de derechos del interesado (RGPD)</h2>
        <p className="leading-relaxed">
          De conformidad con el RGPD y la LOPDGDD, tienes derecho a ejercer tus derechos de:
        </p>
        <ul className="list-disc space-y-2 pl-6">
          <li><strong>Acceso:</strong> conocer si se tratan datos relativos a tu persona.</li>
          <li><strong>Rectificación:</strong> solicitar la corrección de datos inexactos.</li>
          <li><strong>Supresión:</strong> pedir la eliminación de los datos cuando ya no sean necesarios.</li>
          <li><strong>Limitación del tratamiento y Oposición:</strong> restringir o negarte a determinados tratamientos.</li>
          <li><strong>Portabilidad:</strong> recibir los datos facilitados en formato estructurado.</li>
        </ul>
        <p className="leading-relaxed pt-1">
          Dado que {PRODUCT_NAME} no almacena datos identificativos de los visitantes de sus guías, el ejercicio de estos
          derechos aplica principalmente a comunicaciones voluntarias que nos remitas por correo electrónico. Para
          ejercitarlos, escribe a <a className="underline font-medium text-mossDark" href={`mailto:${CONTACT_EMAIL}`}>{CONTACT_EMAIL}</a>.
        </p>
        <p className="leading-relaxed">
          Asimismo, tienes derecho a presentar una reclamación ante la Agencia Española de Protección de Datos (AEPD) a
          través de su sede oficial en{" "}
          <a className="underline" href="https://www.aepd.es" target="_blank" rel="noopener noreferrer">
            www.aepd.es
          </a>{" "}
          si consideras vulnerados tus derechos.
        </p>
      </section>

      <section className="space-y-3">
        <h2 className="text-2xl font-semibold text-mossDark">7. Modificaciones de esta política</h2>
        <p className="leading-relaxed">
          Esta política de privacidad se revisa de manera periódica para adaptarse a cualquier actualización legal o técnica.
          Cualquier cambio se publicará en esta misma dirección, manteniendo siempre accesibles las versiones previas.
        </p>
        <p className="leading-relaxed">
          Puedes consultar más detalles en nuestro <a className="underline" href="/aviso-legal">Aviso legal</a> o contactar
          con nosotros en <a className="underline" href="/contacto">Contacto</a>.
        </p>
      </section>
    </PageShell>
  );
}
