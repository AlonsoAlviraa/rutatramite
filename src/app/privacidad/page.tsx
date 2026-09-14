import { PageShell } from "@/components/ui/PageShell";
import { pageMetadata } from "@/lib/seo/meta";
import type { Metadata } from "next";

export const metadata: Metadata = pageMetadata({
  title: "Privacidad",
  description: "Cómo funciona el asistente de RutaTrámite y qué información necesitas para usarlo. Sin cuentas ni envío de documentos.",
  path: "/privacidad",
});

export default function PrivacidadPage() {
  return (
    <PageShell as="article" className="space-y-4">
      <h1 className="font-display text-4xl">Privacidad</h1>
      <p>
        Puedes consultar las guías y utilizar el asistente sin crear una cuenta ni enviar
        documentos. El asistente no solicita tu nombre, número de documento ni dirección.
      </p>
      <h2 className="pt-4 text-2xl font-semibold">Tus respuestas en el asistente</h2>
      <p>
        Las respuestas se procesan en tu navegador para preparar la guía de padrón.
        El buscador de municipios utiliza un listado público; seleccionar un municipio
        no requiere indicar tu domicilio.
      </p>
      <p>
        Los enlaces a sedes oficiales abren servicios de otros organismos, que tienen sus
        propias condiciones de privacidad. Revisa esas condiciones antes de facilitarles datos.
      </p>
      <h2 className="pt-4 text-2xl font-semibold">Medición agregada del uso</h2>
      <p>Contamos visitas a páginas y acciones como completar el asistente, copiar un modelo, pulsar una descarga o abrir una fuente oficial. Guardamos únicamente totales por día, página y tipo de acción durante un máximo de 180 días. Los informes son privados.</p>
      <p>Este medidor no utiliza cookies, cuentas ni identificadores de visitante. No guarda búsquedas, respuestas del asistente, documentos, direcciones IP ni la página de procedencia. Respeta la señal Do Not Track. Los recuentos son acciones, no personas únicas ni solicitudes presentadas. La web sigue funcionando si el medidor falla.</p>
      <p>
        Puedes usar el <a className="underline" href="/contacto">correo de contacto</a> para
        avisar de un error. Incluye el enlace de la guía y una explicación, sin adjuntar
        documentos de identidad ni información personal de tu expediente.
      </p>
    </PageShell>
  );
}
