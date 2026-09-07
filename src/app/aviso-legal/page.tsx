import { PageShell } from "@/components/ui/PageShell";
import { pageMetadata } from "@/lib/seo/meta";
import { CONTACT_EMAIL, PRODUCT_NAME, SITE_ORIGIN } from "@/lib/types";
import type { Metadata } from "next";

export const metadata: Metadata = pageMetadata({
  title: "Aviso legal",
  description: "Alcance informativo de RutaTrámite, uso de sus guías y contacto editorial.",
  path: "/aviso-legal",
});

export default function AvisoLegalPage() {
  return (
    <PageShell as="article" className="space-y-4">
      <h1 className="font-display text-4xl">Aviso legal</h1>
      <p>
        {PRODUCT_NAME} ({SITE_ORIGIN}) es una guía ciudadana e independiente sobre el
        trámites en España. No somos Administración Pública, no somos sede
        electrónica, no somos despacho de abogados y no prestamos asesoramiento jurídico
        personalizado. El padrón lo gestiona cada Ayuntamiento.
      </p>
      <p>
        El alta en el padrón es gratuita. No vendemos citas, no cobramos el trámite, no pedimos ni
        guardamos DNI, pasaporte, dirección ni fotografías de documentos. El asistente de seis
        preguntas se ejecuta en tu navegador.
      </p>
      <p>
        Las guías tienen una finalidad informativa y enlazan a las fuentes disponibles.
        Antes de actuar, comprueba los requisitos aplicables en el organismo responsable.
        Los modelos de escritos deben adaptarse a las circunstancias de cada caso.
      </p>
      <p>
        RutaTrámite es un sitio independiente. Su nombre y diseño no representan a ningún
        organismo público.
      </p>
      <p>
        Los plazos y procedimientos pueden cambiar. La fecha de edición de una página no
        equivale a una comprobación reciente de todos sus datos. Consulta
        <a className="underline" href="/metodologia"> nuestra metodología</a> para entender
        las fechas y los avisos de revisión.
      </p>
      <p>
        Contacto editorial: <a className="underline" href={`mailto:${CONTACT_EMAIL}`}>{CONTACT_EMAIL}</a>.
        Encontrarás indicaciones para comunicar errores en
        <a className="underline" href="/contacto"> Contacto</a>.
      </p>
    </PageShell>
  );
}
