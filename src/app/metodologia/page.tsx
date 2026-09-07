import { PageShell } from "@/components/ui/PageShell";
import { pageMetadata } from "@/lib/seo/meta";
import type { Metadata } from "next";

export const metadata: Metadata = pageMetadata({
  title: "Cómo revisamos las guías y sus fuentes",
  description:
    "Qué significan las fechas editoriales, cómo se identifican las fuentes y qué datos municipales están pendientes de verificación.",
  path: "/metodologia",
});

export default function MetodologiaPage() {
  return (
    <PageShell as="article" className="space-y-4">
      <h1 className="font-display text-4xl">Cómo verificamos</h1>
      <h2 className="pt-4 text-2xl font-semibold">El directorio municipal</h2>
      <p>
        Los municipios salen del INE (relación de entes y cifras públicas de población a 1 de enero
        de 2025). El catálogo de esta versión cubre 769 municipios de 10.000 habitantes o más. El
        código INE de cinco dígitos es el identificador estable. Si un nombre llega en forma
        castellana antigua, se resuelve a la forma oficial (L&apos;Hospitalet, A Coruña, Hondarribia)
        con CodeForSpain, no se inventa el ente.
      </p>
      <p>
        Cada ficha distingue la orientación general de los datos de su ayuntamiento. Cuando no
        hemos confirmado los requisitos locales, aparece «Pendiente de verificación local».
        Consulta la sede municipal antes de desplazarte o presentar documentos. Una ficha extensa
        no equivale a una comprobación de todos sus datos.
      </p>
      <p>
        Las fichas sin suficiente información local contrastada quedan fuera del sitemap y se
        marcan para no ser indexadas. Pueden seguir disponibles desde el directorio para explicar
        el procedimiento general y cómo localizar la sede. No se inventan oficinas, teléfonos ni
        enlaces de cita para completar una ficha.
      </p>
      <h2 className="pt-4 text-2xl font-semibold">Fuentes y fechas de las guías</h2>
      <p>
        Las guías de otros trámites incluyen una sección de fuentes con enlaces al organismo
        responsable. «Edición del contenido» indica la fecha editorial disponible; no acredita
        que la sede se haya comprobado hoy. Cuando se revisa una guía contra sus fuentes, se
        muestra la fecha de revisión editorial. La disponibilidad de citas no se consulta en
        tiempo real desde RutaTrámite.
      </p>
      <p>
        Los plazos, convocatorias y canales pueden cambiar. Da prioridad al aviso vigente de la
        Administración y al requerimiento de tu expediente. Si encuentras una discrepancia,
        puedes <a className="underline" href="/contacto">avisarnos</a> indicando la página y
        la fuente oficial, sin enviar documentos personales.
      </p>
    </PageShell>
  );
}
