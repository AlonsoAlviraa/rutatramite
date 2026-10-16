import { PageShell } from "@/components/ui/PageShell";
import { Breadcrumbs } from "@/components/empadronamiento/Breadcrumbs";
import { AID_SOURCES } from "@/lib/ayudas";
import { pageMetadata } from "@/lib/seo/meta";
import type { Metadata } from "next";

export const metadata: Metadata = pageMetadata({
  title: "Fuentes oficiales de padrón, becas, alquiler y salud",
  description: "Dónde contrastar las guías de RutaTrámite: normas del BOE, INE, convocatorias de becas y alquiler, sedes municipales y sanidad autonómica.",
  path: "/fuentes",
});

const fuentes = [
  ["Ley 7/1985 (LBRL)", "https://www.boe.es/buscar/act.php?id=BOE-A-1985-5392"],
  ["Instrucciones padronales INE 2020: texto consolidado con modificaciones", "https://www.boe.es/buscar/act.php?id=BOE-A-2020-4784"],
  ["Portal IDA-Padrón del INE", "https://idapadron.ine.es/"],
  ["Relación de municipios INE", "https://www.ine.es/dyngs/INEbase/es/operacion.htm?c=Estadistica_C&cid=1254736177031&idp=1254735976614&menu=ultiDatos"],
  ["INE: modificaciones de municipios y denominaciones durante el año", "https://www.ine.es/daco/daco42/codmun/codmun_anual.htm"],
  ["INE: cifras oficiales de población municipal", "https://www.ine.es/dyngs/INEbase/es/operacion.htm?c=Estadistica_C&cid=1254736177011&idp=1254734710990&menu=resultados"],
];

export default function FuentesPage() {
  return (
    <PageShell as="article" className="space-y-4">
      <Breadcrumbs items={[{ name: "Inicio", path: "/" }, { name: "Fuentes", path: "/fuentes" }]} />
      <h1 className="font-display text-4xl">Fuentes y cómo comprobar una guía</h1>
      <p>
        Cada guía enlaza las referencias que permiten ampliar y comprobar su contenido.
        Para conocer el canal de presentación, los documentos y los avisos actuales,
        consulta la sede del organismo responsable.
      </p>
      <p className="text-sm">Directorio de fuentes revisado el <time dateTime="2026-09-16">16 de septiembre de 2026</time>. Esta fecha corresponde a los enlaces y su alcance; consulta la fecha editorial y los avisos de cada guía.</p>
      <h2 className="pt-4 text-2xl font-semibold">Qué fuente resuelve cada duda</h2>
      <ul className="list-disc space-y-2 pl-5">
        <li>Para saber qué establece una norma: consulta el BOE y revisa su versión y disposiciones aplicables.</li>
        <li>Para saber dónde presentar, qué adjuntar o si hay un plazo abierto: consulta la ficha del organismo que tramita.</li>
        <li>Para conocer el estado de tu solicitud: entra en el expediente oficial. Una noticia o guía no acredita tu concesión.</li>
        <li>Para comprobar datos de un municipio: usa el INE. Esos datos no acreditan sus requisitos de padrón.</li>
      </ul>
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
        La relación de municipios permite comprobar nombres y códigos; las cifras de habitantes
        se consultan en la publicación de población municipal. Revisa el año de referencia y
        las modificaciones posteriores de denominación. Estos enlaces no acreditan por sí solos
        la revisión de todas las cifras de nuestro catálogo.
      </p>
      <p>Los modelos orientativos del padrón figuran en los anexos de las instrucciones enlazadas. Para presentar un trámite, comprueba si tu ayuntamiento tiene un formulario propio.</p>
      <p>
        Las fichas municipales muestran las fuentes disponibles. Un enlace al INE acredita
        datos del municipio, pero no confirma sus requisitos de empadronamiento. Las fichas
        pendientes de revisión local lo indican expresamente.
      </p>
      <h2 className="pt-4 text-2xl font-semibold">Becas y ayudas al alquiler</h2>
      <p>El <a className="underline" href="/ayudas">calendario de ayudas</a> diferencia solicitud, modificación, cierre y normativa publicada. La aprobación de una norma no implica que exista una solicitud abierta en tu comunidad.</p>
      <ul className="list-disc space-y-2 pl-5">
        {Object.values(AID_SOURCES).map((source) => <li key={source.href}><a className="underline" href={source.href}>{source.label}</a></li>)}
      </ul>
      <h2 className="pt-4 text-2xl font-semibold">Alquiler y documentos sanitarios</h2>
      <ul className="list-disc space-y-2 pl-5">
        <li><a className="underline" href="https://www.boe.es/buscar/act.php?id=BOE-A-1994-26003#a36">LAU, artículo 36: fianza y saldo pendiente</a>. Consulta también la normativa autonómica sobre depósitos.</li>
        <li><a className="underline" href="https://www.saludcastillayleon.es/profesionales/es/vacunaciones/nuevo-calendario-vacunaciones-inmunizaciones-toda-vida-cast">Sacyl: calendario regional de 2026</a>. Para una pauta individual, consulta a tu profesional sanitario.</li>
      </ul>
      <h2 className="pt-4 text-2xl font-semibold">Datos auxiliares y otras guías</h2>
      <p><a className="underline" href="https://github.com/codeforspain/ds-organizacion-administrativa">CodeForSpain</a> es una fuente auxiliar de organización territorial, no una Administración ni una sede de tramitación.</p>
      <p>
        Las referencias de DNI, becas, extranjería y los demás temas se encuentran en la
        sección «Fuentes y comprobación» de cada guía. Puedes consultar
        <a className="underline" href="/metodologia"> cómo revisamos el contenido</a> o
        <a className="underline" href="/contacto"> avisarnos de una discrepancia</a>.
      </p>
    </PageShell>
  );
}
