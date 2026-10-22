import { PageShell } from "@/components/ui/PageShell";
import { JsonLd } from "@/components/empadronamiento/JsonLd";
import { pageMetadata } from "@/lib/seo/meta";
import { breadcrumbJsonLd } from "@/lib/seo/jsonld";
import { SITE_ORIGIN } from "@/lib/types";
import type { Metadata } from "next";

export const metadata: Metadata = pageMetadata({
  title: "Quiénes somos: Equipo RutaTrámite",
  description:
    "RutaTrámite es un proyecto informativo independiente, sin relación con ninguna administración ni partido. Método editorial, fuentes oficiales y cómo corregimos errores.",
  path: "/quienes-somos",
});

export default function QuienesSomosPage() {
  return (
    <PageShell as="article" className="space-y-4">
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "AboutPage",
          "@id": `${SITE_ORIGIN}/quienes-somos#page`,
          name: "Quiénes somos",
          url: `${SITE_ORIGIN}/quienes-somos`,
          inLanguage: "es-ES",
          about: { "@id": `${SITE_ORIGIN}#organization` },
        }}
      />
      <JsonLd data={breadcrumbJsonLd([{ name: "Inicio", path: "/" }, { name: "Quiénes somos", path: "/quienes-somos" }])} />
      <h1 className="font-display text-4xl">Quiénes somos</h1>
      <p>
        RutaTrámite es un proyecto informativo independiente. Explicamos trámites, ayudas y
        procesos electorales en España con enlaces a la fuente oficial de cada dato. Las guías
        las firma el Equipo RutaTrámite.
      </p>
      <p>
        No somos una Administración Pública ni un despacho de abogados, y no tenemos relación
        con ningún organismo público ni con ningún partido político. Los trámites se hacen
        siempre en la sede oficial del organismo responsable.
      </p>
      <h2 className="pt-4 text-2xl font-semibold">Método editorial</h2>
      <ul className="list-disc space-y-2 pl-5">
        <li>
          Fuentes oficiales: BOE, INE, ministerios, sedes electrónicas y boletines autonómicos.
          Cada guía enlaza las fuentes que usa.
        </li>
        <li>
          Neutralidad en contenido electoral: los partidos aparecen ordenados por sus votos en
          las elecciones generales de 2023 y se describen sin adjetivos valorativos.
        </li>
        <li>No publicamos cifras, citas ni datos que no podamos atribuir a una fuente.</li>
        <li>
          Cada guía muestra su fecha de revisión o de actualización. Qué significa cada fecha lo
          explicamos en <a className="underline" href="/metodologia">Cómo verificamos</a>, y la
          lista de referencias está en <a className="underline" href="/fuentes">Fuentes</a>.
        </li>
      </ul>
      <h2 id="correcciones" className="pt-4 text-2xl font-semibold">Cómo corregimos errores</h2>
      <p>
        Si encuentras un dato incorrecto o desactualizado, escríbenos desde{" "}
        <a className="underline" href="/contacto">Contacto</a> con el enlace de la página y, si la
        tienes, la fuente oficial. Revisamos el dato contra la fuente, corregimos la guía y
        actualizamos su fecha.
      </p>
    </PageShell>
  );
}
