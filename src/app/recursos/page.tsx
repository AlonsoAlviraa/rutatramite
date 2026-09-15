import { Breadcrumbs } from "@/components/empadronamiento/Breadcrumbs";
import { JsonLd } from "@/components/empadronamiento/JsonLd";
import { PageShell } from "@/components/ui/PageShell";
import { aidDataset, aidDatasetJsonLd, AID_DATA_REVIEWED } from "@/lib/aid-data";
import { pageMetadata } from "@/lib/seo/meta";
import { DatasetReuse } from "@/components/tramites/DatasetReuse";

export const revalidate = 3600;
export const metadata = pageMetadata({ title: "Datos de ayudas: fuentes, fechas y descargas JSON y CSV", description: "Consulta y descarga la selección de becas y ayudas al alquiler de RutaTrámite, con fuentes oficiales, revisión y documentación de cada campo.", path: "/recursos", modified: AID_DATA_REVIEWED });

const fields = [
  ["id", "Identificador de la convocatoria en esta selección."],
  ["name / category / territory", "Nombre, categoría (becas o alquiler) y ámbito territorial."],
  ["phase", "solicitud, modificacion, cerrada o normativa. Un cierre conocido se aplica al generar los datos; usa status para comprobar la antigüedad de la revisión."],
  ["status", "Estado calculado con las fechas y la antigüedad de la revisión. Úsalo junto a phase."],
  ["checked_at", "Fecha de la última comprobación editorial de ese registro."],
  ["opens_at / closes_at", "Fecha y hora con zona horaria, cuando están verificadas. null significa dato no consignado, no plazo permanente."],
  ["opens_on / closes_on", "Fecha de calendario cuando la fuente no concreta una hora. No convierte el último día en un plazo garantizado hasta medianoche: confirma la hora en la sede."],
  ["deadline / summary", "Explicación del plazo y resumen del alcance."],
  ["guide_url / source_name / source_url", "Guía de contexto y referencia oficial de la que parte la revisión."],
];

export default function RecursosPage() {
  const data = aidDataset();
  return <PageShell as="article" className="space-y-5">
    <JsonLd data={[aidDatasetJsonLd()]} />
    <Breadcrumbs items={[{ name: "Inicio", path: "/" }, { name: "Datos y recursos", path: "/recursos" }]} />
    <h1 className="font-display text-4xl text-mossDark">Datos de ayudas para consultar y citar</h1>
    <p><a className="underline" href="/recursos/padron-municipal">Nuevo recurso: comparar canales y documentación del padrón municipal, con fuentes y descargas JSON/CSV</a>.</p>
    <p>También puedes consultar el <a className="underline" href="/descargas">catálogo de formularios oficiales en PDF</a>, con su alcance, fuente y guías de uso.</p>
    <p className="text-lg">Una selección de {data.records.length} convocatorias y programas de ayudas a estudiantes y alquiler en España. Cada registro conserva su territorio, fase, fecha de revisión y enlace oficial. Puede servir a orientadores, asociaciones y personas que preparan una guía o comparan convocatorias.</p>
    <p className="text-sm">Última revisión editorial del conjunto: <time dateTime={AID_DATA_REVIEWED}>{AID_DATA_REVIEWED}</time>. La fecha de cada registro puede ser distinta.</p>
    <div className="flex flex-wrap gap-4"><a className="rounded border border-moss px-4 py-3 font-semibold underline" href="/datos/ayudas.json">Consultar JSON</a><a className="rounded border border-moss px-4 py-3 font-semibold underline" href="/datos/ayudas.csv">Descargar CSV</a><a className="py-3 underline" href="/ayudas">Ver el calendario de ayudas</a></div>
    <section className="space-y-3"><h2 className="font-display text-2xl">Qué incluye y cómo se actualiza</h2>
      <p>La selección contiene becas del Ministerio, procedimientos regionales de alquiler y un programa normativo del Plan de Vivienda. No incluye todas las ayudas de España. Una fila no acredita que puedas solicitarla ni que se te haya concedido.</p>
      <p>Los datos proceden de la misma selección que muestra el calendario. Las descargas se regeneran con una caché de una hora. Regenerar el archivo no significa volver a comprobar la fuente: consulta siempre checked_at. Tras siete días sin revisión, una solicitud sin cierre conocido pasa a estado pendiente de nueva comprobación.</p>
      <p>Si hay una fecha de cierre verificada, el estado la tiene en cuenta. Si solo existe una norma publicada, no se anuncia una solicitud abierta. Los campos de fecha vacíos no permiten deducir que el plazo esté abierto.</p>
    </section>
    <section className="space-y-3"><h2 className="font-display text-2xl">Registros y fuentes</h2><ul className="divide-y divide-sand">
      {data.records.map(row => <li key={row.id} className="space-y-2 py-4"><h3 className="font-semibold"><a className="underline" href={row.guide_url}>{row.name}</a></h3><p>{row.territory} · {row.status}</p><p>{row.deadline}</p><p className="text-sm">Revisión: <time dateTime={row.checked_at}>{row.checked_at}</time> · <a className="underline" href={row.source_url}>{row.source_name}</a></p></li>)}
    </ul></section>
    <section className="space-y-3"><h2 className="font-display text-2xl">Diccionario de campos</h2><dl className="space-y-4">{fields.map(([name, explanation]) => <div key={name}><dt className="break-words font-semibold">{name}</dt><dd>{explanation}</dd></div>)}</dl>
      <p>JSON incluye además schema_version, generated_at, last_editorial_review, publisher, documentation_url, scope, coverage e history. CSV contiene una fila por convocatoria, está codificado en UTF-8 y utiliza coma como separador. La versión 1.2 añade opens_on y closes_on a JSON y CSV para conservar fechas sin una hora verificada. Los cierres conocidos se reflejan también en phase.</p>
    </section>
    <section id="cobertura-territorial" className="space-y-3"><h2 className="font-display text-2xl">Cobertura de las 17 comunidades</h2><p>La tabla documenta lo revisado en esta selección. Una referencia estatal no acredita que se haya comprobado la convocatoria de cada comunidad. Pendiente no significa que no exista ayuda.</p><div className="rt-table-wrap" role="region" aria-label="Cobertura por comunidad y categoría" tabIndex={0}><table className="rt-table"><caption className="sr-only">Cobertura por comunidad y categoría</caption><thead><tr><th>Comunidad</th><th>Categoría</th><th>Alcance revisado</th></tr></thead><tbody>{data.coverage.map(row=><tr key={`${row.territory_slug}-${row.category}`}><td>{row.territory}</td><td>{row.category}</td><td>{row.note} {row.record_ids.map(id=><a className="underline mr-2" key={id} href={data.records.find(r=>r.id===id)?.guide_url}>Ver referencia {id}</a>)}</td></tr>)}</tbody></table></div></section>
    <section className="space-y-3"><h2 className="font-display text-2xl">Historial de cambios</h2><ul>{data.history.map((entry,i)=><li key={i}><time dateTime={entry.date}>{entry.date}</time>: {entry.change}</li>)}</ul></section>
    <DatasetReuse />
    <section className="space-y-3"><h2 className="font-display text-2xl">Cómo citar y contrastar</h2>
      <p>Al usar esta selección como referencia, identifica a RutaTrámite, enlaza esta página e indica la fecha de consulta. Para explicar requisitos o plazos, enlaza también la fuente oficial del registro. Un enlace ayuda al lector a comprobar qué versión y qué organismo sustentan la información.</p>
      <blockquote className="border-l-4 border-sand pl-4">RutaTrámite. «Datos de ayudas para consultar y citar». https://rutatramite.com/recursos. Consulta: [fecha]. Revisión del registro: [checked_at]. Fuente oficial: [source_url].</blockquote>
      <p>La descarga es gratuita y no requiere registro. La documentación y los contenidos enlazados de terceros conservan sus condiciones de uso. Para detectar cambios, compara id y checked_at; no uses generated_at como fecha de revisión oficial.</p>
      <p><a className="underline" href="/metodologia">Metodología editorial</a> · <a className="underline" href="/fuentes">Directorio de fuentes</a> · <a className="underline" href="/contacto">Comunicar un error</a></p>
    </section>
  </PageShell>;
}
