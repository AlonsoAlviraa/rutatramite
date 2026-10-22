import { Breadcrumbs } from "@/components/empadronamiento/Breadcrumbs";
import { JsonLd } from "@/components/empadronamiento/JsonLd";
import { PageShell } from "@/components/ui/PageShell";
import { breadcrumbJsonLd } from "@/lib/seo/jsonld";
import { pageMetadata } from "@/lib/seo/meta";
import { descargasByVertical, loadDescargasManifest } from "@/lib/descargas";
import type { Metadata } from "next";

export const dynamic = "force-static";

export const metadata: Metadata = pageMetadata({
  title: "Formularios oficiales en PDF: EX-10, EX-15, padrón y 030",
  description:
    "Descarga gratis y sin registro formularios oficiales en PDF: modelos EX de extranjería (EX-10, EX-15), padrón, modelo 030 y Registro Civil, con fuente y fecha.",
  path: "/descargas",
  modified: "2026-09-14",
});

const VERIFIED_LATEST = "2026-09-14";

function formatBytes(bytes: number): string {
  if (bytes >= 1024 * 1024) return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
  return `${Math.round(bytes / 1024)} kB`;
}

export default function DescargasPage() {
  const manifest = loadDescargasManifest();
  const groups = descargasByVertical();
  return (
    <PageShell as="article" className="space-y-5">
      <JsonLd
        data={[
          breadcrumbJsonLd([
            { name: "Inicio", path: "/" },
            { name: "Descargas", path: "/descargas" },
          ]),
          {
            "@context": "https://schema.org",
            "@type": "ItemList",
            name: "Formularios y guías oficiales descargables",
            numberOfItems: manifest.files.length,
            itemListElement: manifest.files.map((f, i) => ({
              "@type": "ListItem",
              position: i + 1,
              item: {
                "@type": "DigitalDocument",
                name: f.title,
                url: `https://rutatramite.com/${f.file}`,
                encodingFormat: "application/pdf",
                isBasedOn: f.source_url,
                description: f.purpose,
                isAccessibleForFree: true,
              },
            })),
          },
        ]}
      />
      <Breadcrumbs items={[{ name: "Inicio", path: "/" }, { name: "Descargas", path: "/descargas" }]} />
      <h1 className="font-display text-4xl text-mossDark">Formularios oficiales para descargar en PDF: EX-10, EX-15, padrón y 030</h1>
      <p className="text-lg">
        Una selección de {manifest.files.length} formularios y documentos de apoyo oficiales,
        hospedados tal como los publica cada Administración. Cada ficha indica la fuente exacta,
        el tamaño y la fecha de verificación del archivo. Descarga gratuita, sin registro.
      </p>
      <p className="text-sm">
        Descarga y revisión de los archivos: <time dateTime={VERIFIED_LATEST}>{VERIFIED_LATEST}</time>. Esta fecha no es la de publicación del organismo. Un formulario
        descargable no es una solicitud presentada: preséntalo en la sede del organismo responsable.
      </p>
      {groups.map((group) => (
        <section key={group.vertical} className="space-y-3">
          <h2 className="font-display text-2xl">{group.label}</h2>
          <ul className="divide-y divide-sand">
            {group.items.map((item) => (
              <li key={item.file} className="space-y-1 py-4">
                <h3 className="font-semibold">
                  <a className="underline underline-offset-4" href={`/${item.file}`}>
                    {item.title} <span className="text-sm font-normal">({formatBytes(item.bytes)})</span>
                  </a>
                </h3>
                <p>{item.purpose}</p>
                <p className="text-sm">
                  <time dateTime={item.verified}>Verificado el {item.verified}</time> · Fuente:{" "}
                  <a className="underline" href={item.source_url} rel="noopener noreferrer">
                    {item.source_name}
                  </a>
                </p>
                {item.related_guides.length > 0 && <p className="text-sm">Guías de uso: {item.related_guides.map((href, index) => <span key={href}>{index > 0 ? " · " : ""}<a className="underline" href={href}>{href.split("/").pop()?.replaceAll("-", " ")}</a></span>)}</p>}
              </li>
            ))}
          </ul>
        </section>
      ))}
      <section className="space-y-3">
        <h2 className="font-display text-2xl">Cómo elegir el impreso correcto</h2>
        <p>
          El formulario depende del procedimiento, del organismo y, en ocasiones, del municipio. Comprueba estos casos antes de descargar:
        </p>
        <ul className="list-disc space-y-2 pl-5">
          {manifest.online_only.map((note) => (
            <li key={note.slice(0, 40)}>{note}</li>
          ))}
        </ul>
        <p className="text-sm">
          <a className="underline" href="https://sede.policia.gob.es/Tasa790_012/ImpresoRellenar">Sede de la Policía: generar la tasa 790, código 012</a>
          {" · "}
          <a className="underline" href="https://sede.policia.gob.es/portalCiudadano/_es/tramites_extranjeria_tasas.php">Importes de extranjería en la sede de la Policía</a>
          . Este impreso no es la tasa del DNI ni la del pasaporte: <a className="underline" href="/dni">el DNI cuesta 12 € y el pasaporte 30 €</a> y se pagan al pedir la <a className="underline" href="/dni/cita-previa">cita del DNI</a> o en la oficina.
        </p>
      </section>
      <section className="space-y-3">
        <h2 className="font-display text-2xl">Cómo usar estos formularios</h2>
        <p>
          Lee las instrucciones incluidas en cada archivo, completa solo los apartados que correspondan y conserva el justificante cuando presentes la solicitud. Las guías relacionadas añaden contexto para algunos procedimientos. La versión
          vigente es siempre la de la fuente oficial enlazada. Si detectas una versión más reciente,{" "}
          <a className="underline" href="/contacto">
            comunícanoslo
          </a>
          .
        </p>
        <p>
          <a className="underline" href="/metodologia">
            Metodología editorial
          </a>{" "}
          ·{" "}
          <a className="underline" href="/fuentes">
            Directorio de fuentes
          </a>{" "}
          ·{" "}
          <a className="underline" href="/recursos">
            Datos de ayudas
          </a>
        </p>
      </section>
      <section className="space-y-3"><h2 className="font-display text-2xl">Cómo citar esta selección</h2>
        <p>RutaTrámite. «Formularios oficiales para descargar». https://rutatramite.com/descargas. Consulta: [fecha]. Indica además el nombre del modelo y enlaza su fuente oficial, para que el lector pueda contrastar la versión.</p>
      </section>
    </PageShell>
  );
}
