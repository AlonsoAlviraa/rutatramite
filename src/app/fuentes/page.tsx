import { PageShell } from "@/components/ui/PageShell";
import { pageMetadata } from "@/lib/seo/meta";
import type { Metadata } from "next";

export const metadata: Metadata = pageMetadata({
  title: "Fuentes: BOE, INE y sedes municipales",
  description: "BOE, INE y sedes municipales que usa RutaTrámite para la guía de empadronamiento en España.",
  path: "/fuentes",
});

const fuentes = [
  ["Ley 7/1985 (LBRL)", "https://www.boe.es/buscar/act.php?id=BOE-A-1985-5392"],
  ["Instrucciones técnicas INE 2015", "https://www.boe.es/buscar/doc.php?id=BOE-A-2015-3109"],
  ["Resolución INE 17 febrero 2020", "https://www.boe.es/diario_boe/txt.php?id=BOE-A-2020-4784"],
  ["Modelos padronales INE", "https://idapadron.ine.es/"],
  ["Relación de municipios INE", "https://www.ine.es/dyngs/INEbase/es/operacion.htm?c=Estadistica_C&cid=1254736177031&idp=1254735976614&menu=ultiDatos"],
  ["CodeForSpain organización administrativa", "https://github.com/codeforspain/ds-organizacion-administrativa"],
];

export default function FuentesPage() {
  return (
    <PageShell as="article" className="space-y-4">
      <h1 className="font-display text-4xl">Fuentes</h1>
      <p>
        Cada guía enlaza las referencias que permiten ampliar y comprobar su contenido.
        Para conocer el canal de presentación, los documentos y los avisos actuales,
        consulta la sede del organismo responsable.
      </p>
      <h2 className="pt-4 text-2xl font-semibold">Directorio municipal y padrón</h2>
      <ul className="list-disc space-y-2 pl-5">
        {fuentes.map(([label, href]) => (
          <li key={href}>
            <a className="underline" href={href} rel="noopener noreferrer">
              {label}
            </a>
          </li>
        ))}
      </ul>
      <p>
        Población de referencia: listado público a 1 de enero de 2025, a contrastar con la operación
        vigente en ine.es. RD 1117/2025 (BOE-A-2025-25362) cuando aplique.
      </p>
      <p>
        Las fichas municipales muestran las fuentes disponibles. Un enlace al INE acredita
        datos del municipio, pero no confirma sus requisitos de empadronamiento. Las fichas
        pendientes de revisión local lo indican expresamente.
      </p>
      <h2 className="pt-4 text-2xl font-semibold">Otros trámites</h2>
      <p>
        Las referencias de DNI, becas, extranjería y los demás temas se encuentran en la
        sección «Fuentes y comprobación» de cada guía. Puedes consultar
        <a className="underline" href="/metodologia"> cómo revisamos el contenido</a> o
        <a className="underline" href="/contacto"> avisarnos de una discrepancia</a>.
      </p>
    </PageShell>
  );
}
