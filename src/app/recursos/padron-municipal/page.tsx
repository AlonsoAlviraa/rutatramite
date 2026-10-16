import { PageShell } from "@/components/ui/PageShell";
import { Breadcrumbs } from "@/components/empadronamiento/Breadcrumbs";
import { JsonLd } from "@/components/empadronamiento/JsonLd";
import { padronDataset } from "@/lib/padron-data";
import { pageMetadata } from "@/lib/seo/meta";
import { SITE_ORIGIN } from "@/lib/types";
import { DATASET_LICENSE } from "@/lib/dataset-license";
import { DatasetReuse } from "@/components/tramites/DatasetReuse";

export const metadata = pageMetadata({ title: "Padrón municipal: compara canales y documentos con fuentes", description: "Datos citables del alta en el padrón de Madrid y 20 municipios: trámites oficiales, documentos, canales, citas y revisiones pendientes. JSON y CSV gratuitos.", path: "/recursos/padron-municipal", modified: "2026-09-14" });
const channels: Record<string,string> = { true: "Disponible", false: "No disponible", partial: "Parcial", unknown: "Pendiente de comprobar" };
const appointments: Record<string,string> = { required: "Necesaria", recommended: "Se puede reservar", "walk-in": "Existe atención sin cita", unknown: "Pendiente de comprobar" };
export default function PadronResource() {
  const data = padronDataset();
  return <PageShell as="article" className="space-y-6 [overflow-wrap:anywhere]">
    <JsonLd data={[{ "@context": "https://schema.org", "@type": "Dataset", name: "Padrón municipal: canales, documentos y fuentes", description: data.scope, url: data.documentation_url, license: DATASET_LICENSE, creator: { "@type": "Organization", name: "RutaTrámite", url: SITE_ORIGIN }, distribution: ["json","csv"].map(format => ({ "@type": "DataDownload", encodingFormat: format === "json" ? "application/json" : "text/csv", contentUrl: `${SITE_ORIGIN}/datos/padron-municipal.${format}` })) }]} />
    <Breadcrumbs items={[{ name: "Inicio", path: "/" }, { name: "Recursos", path: "/recursos" }, { name: "Padrón municipal", path: "/recursos/padron-municipal" }]} />
    <h1 className="font-display text-4xl text-mossDark">Padrón municipal: canales y documentos para comparar</h1>
    {data.records.filter(row => row.ine_code === "14021").map(row => {
      const modelo = row.documents.find(doc => doc.includes("60-444"));
      return modelo ? <p key={row.ine_code}><a className="underline" href={row.guide_url}>{row.name}</a>: {modelo}</p> : null;
    })}
    <p>{data.scope} Cada dato comprobado enlaza su fuente. Una revisión pendiente no significa que el trámite no exista.</p>
    <p>{data.records.filter(r=>r.review_status==="verificado").length} fichas cumplen el criterio de verificación local de las {data.records.length} seleccionadas.</p>
    <div className="flex flex-wrap gap-4"><a className="rounded border p-3 underline" href="/datos/padron-municipal.json">Consultar JSON</a><a className="rounded border p-3 underline" href="/datos/padron-municipal.csv">Descargar CSV</a></div>
    <section className="space-y-3"><h2 className="font-display text-2xl">Cómo interpretar los datos</h2><p>Verificado exige al menos cinco señales locales y evidencia del procedimiento de alta, documentación y canal. No certifica disponibilidad de citas ni garantiza la resolución. Los requisitos de certificados, renovación y cambio de domicilio pueden ser distintos.</p><p>unknown, null o una lista vacía indican que no hemos comprobado ese dato. reviewed_on registra la revisión editorial, incluso cuando no pudo completarse; checked_at identifica la comprobación de un campo concreto. Regenerar la descarga no actualiza esas fechas.</p></section>
    <section><h2 className="font-display text-2xl">Municipios y evidencia</h2><ul className="divide-y divide-sand">{data.records.map(row => <li key={row.ine_code} id={`ine-${row.ine_code}`} className="space-y-3 py-6"><h3 className="text-xl font-semibold"><a className="underline" href={row.guide_url}>{row.name}</a> · {row.review_status === "verificado" ? "Alta contrastada" : "Revisión pendiente"}</h3><p>{row.note}</p><p>En línea: {channels[String(row.online)]}. Cita: {appointments[row.appointment]}.</p>{row.documents.length>0 && <ul className="list-disc pl-5">{row.documents.map(doc=><li key={doc}>{doc}</li>)}</ul>}<p className="text-sm">Revisión editorial: <time dateTime={row.reviewed_on ?? undefined}>{row.reviewed_on}</time>. INE {row.ine_code}.</p><ul className="space-y-1">{row.sources.map((url,i)=><li key={url}><a className="underline" href={url}>Fuente municipal {i+1}: {new URL(url).hostname}</a></li>)}</ul></li>)}</ul></section>
    <section className="space-y-3"><h2 className="font-display text-2xl">Campos y reutilización</h2><p>ine_code identifica el municipio; name y territory indican nombre y comunidad; guide_url enlaza la ficha; procedure_url y appointment_url enlazan el trámite y la cita. online y appointment describen el canal del alta. documents contiene el resumen documental; evidence vincula cada campo con source_url y checked_at. sources conserva las referencias y note explica excepciones o límites.</p><p>Los formatos HTML, JSON y CSV utilizan el mismo conjunto. CSV usa UTF-8, separador coma y JSON dentro de las celdas de documentos y evidencia. Son datos de consulta gratuitos, sin registro.</p><h2 className="font-display text-2xl">Cómo citar</h2><blockquote className="border-l-4 border-sand pl-4">RutaTrámite. «Padrón municipal: canales y documentos para comparar». {data.documentation_url}. Municipio: [nombre e INE]. Revisión del dato: [checked_at]. Consulta: [fecha].</blockquote><p>Enlaza también la fuente municipal al explicar un requisito. Las condiciones de los documentos oficiales pertenecen a sus organismos. <a className="underline" href="/contacto">Comunicar un error</a>.</p></section>
    <DatasetReuse />
  </PageShell>;
}
