import { PageShell } from "@/components/ui/PageShell";
import { pageMetadata } from "@/lib/seo/meta";
import { CONTACT_EMAIL, PRODUCT_NAME, SITE_ORIGIN } from "@/lib/types";
import type { Metadata } from "next";

export const metadata: Metadata = pageMetadata({
  title: "Aviso legal",
  description: "Aviso legal de RutaTrámite: condiciones de uso, alcance informativo, propiedad intelectual y contacto editorial.",
  path: "/aviso-legal",
});

export default function AvisoLegalPage() {
  return (
    <PageShell as="article" className="space-y-6">
      <header className="space-y-2 border-b border-sand pb-4">
        <h1 className="font-display text-4xl text-ink">Aviso legal</h1>
        <p className="text-lg text-ink/80 leading-relaxed">
          En cumplimiento de lo dispuesto en la Ley 34/2002, de 11 de julio, de Servicios de la Sociedad de la Información
          y de Comercio Electrónico (LSSI-CE), se ponen a disposición de los usuarios las siguientes condiciones generales
          que rigen el acceso y uso del sitio web {PRODUCT_NAME}.
        </p>
      </header>

      <section className="space-y-3">
        <h2 className="text-2xl font-semibold text-mossDark">1. Información general y titularidad</h2>
        <p className="leading-relaxed">
          {PRODUCT_NAME} ({SITE_ORIGIN}) es una guía ciudadana e independiente sobre los
          trámites en España, gestionada por el <strong>Equipo RutaTrámite</strong>. No somos
          Administración Pública, no somos sede electrónica, no somos despacho de abogados y no
          prestamos asesoramiento jurídico personalizado.
        </p>
        <p className="leading-relaxed">
          Contacto editorial directo:{" "}
          <a className="underline font-medium text-mossDark" href={`mailto:${CONTACT_EMAIL}`}>
            {CONTACT_EMAIL}
          </a>. Para incidencias, rectificaciones o sugerencias puedes dirigirte a nuestra sección de{" "}
          <a className="underline" href="/contacto">
            Contacto
          </a>.
        </p>
      </section>

      <section className="space-y-3">
        <h2 className="text-2xl font-semibold text-mossDark">2. Naturaleza del servicio y exención de responsabilidad</h2>
        <p className="leading-relaxed">
          {PRODUCT_NAME} no es una Administración Pública, no es una sede electrónica oficial y no es un despacho de
          abogados ni gestoría administrativa. La información suministrada tiene carácter meramente orientativo,
          divulgativo y formativo.
        </p>
        <p className="leading-relaxed">
          El padrón municipal lo gestiona y resuelve de forma exclusiva cada Ayuntamiento, según el{" "}
          <a className="underline" href="https://www.boe.es/buscar/act.php?id=BOE-A-1985-5392" target="_blank" rel="noopener noreferrer">
            artículo 17 de la Ley 7/1985
          </a>. El alta en el padrón es gratuita. El Ayuntamiento de València indica que la inscripción en el padrón es un trámite gratuito (
          <a className="underline" href="https://www.valencia.es/documents/20142/20609056/PREGUNTAS+FRECUENTES+PADRON.pdf/95395fb7-6f62-224a-9471-a1b6dda7ddbe" target="_blank" rel="noopener noreferrer">
            preguntas frecuentes del padrón
          </a>
          ). No vendemos citas, no cobramos el trámite, no pedimos ni guardamos DNI, pasaporte, dirección ni fotografías de documentos.
        </p>
        <p className="leading-relaxed">
          No intervenimos en la presentación de expedientes. Las resoluciones definitivas corresponden únicamente al órgano administrativo competente de acuerdo con la documentación y circunstancias individuales acreditadas por cada solicitante.
        </p>
      </section>

      <section className="space-y-3">
        <h2 className="text-2xl font-semibold text-mossDark">3. Metodología y actualización de contenidos</h2>
        <p className="leading-relaxed">
          Los procedimientos administrativos, modelos de formularios, plazos de convocatoria y tasas oficiales pueden
          experimentar variaciones normativas. La fecha mostrada en cada guía refleja la última revisión efectuada por
          nuestro equipo editorial respecto a la fuente oficial citada.
        </p>
        <p className="leading-relaxed">
          Para conocer en detalle nuestro protocolo de verificación y cómo auditamos las sedes electrónicas, consulta{" "}
          <a className="underline" href="/metodologia">
            nuestra metodología
          </a>{" "}
          y nuestro catálogo de{" "}
          <a className="underline" href="/fuentes">
            fuentes oficiales
          </a>.
        </p>
      </section>

      <section className="space-y-3">
        <h2 className="text-2xl font-semibold text-mossDark">4. Propiedad intelectual y reutilización</h2>
        <p className="leading-relaxed">
          Los textos explicativos, análisis comparativos, diseños y código fuente de este portal constituyen obras
          originales protegidas por la legislación de propiedad intelectual española y comunitaria.
        </p>
        <p className="leading-relaxed">
          Las normas jurídicas, resoluciones del BOE y boletines autonómicos enlazados pertenecen al dominio público
          administrativo conforme a la legislación aplicable. Los modelos y plantillas de escritos se facilitan para su libre
          uso y adaptación personal por parte de los ciudadanos sin coste alguno.
        </p>
      </section>

      <section className="space-y-3">
        <h2 className="text-2xl font-semibold text-mossDark">5. Privacidad, cookies y legislación aplicable</h2>
        <p className="leading-relaxed">
          El tratamiento de datos personales y el uso de cookies se rigen por lo dispuesto en nuestra{" "}
          <a className="underline" href="/privacidad">
            Política de privacidad
          </a>{" "}
          y en nuestra{" "}
          <a className="underline" href="/cookies">
            Política de cookies
          </a>. Las relaciones derivadas del uso de este sitio web se regirán por la legislación española vigente.
        </p>
      </section>
    </PageShell>
  );
}
