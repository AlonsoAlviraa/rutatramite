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
        Esta versión incluye una selección de 769 municipios. Sus cifras de población se han
        contrastado el 16 de septiembre de 2026 con los datos definitivos del INE referidos al
        1 de enero de 2025. La selección procede de un catálogo anterior y no incluye todos los
        municipios de 10.000 habitantes o más; también conserva una localidad que queda por
        debajo de ese umbral en la referencia comprobada. Utilizamos el código INE de cinco
        dígitos para identificar cada municipio.
      </p>
      <p>
        Para relacionar nombres y códigos se utilizaron datos auxiliares de CodeForSpain y
        correspondencias del catálogo. Los nombres se han contrastado con las denominaciones
        de las tablas del INE y sus cambios publicados hasta la revisión del 16 de septiembre
        de 2026. Las direcciones web anteriores se conservan aunque cambie el nombre mostrado.
        La relación de códigos
        y las cifras de población son publicaciones distintas. En
        <a className="underline" href="/fuentes"> Fuentes</a> enlazamos ambas para su consulta.
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
        La revisión contrasta el alcance, los requisitos y los plazos descritos con las fuentes
        citadas. Una descarga o la respuesta correcta de un enlace no bastan para comprobar una
        afirmación. Tampoco una fecha de revisión garantiza que no haya avisos posteriores ni
        convierte en revisados todos los contenidos a los que enlaza esa página.
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
