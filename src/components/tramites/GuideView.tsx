import { Breadcrumbs } from "@/components/empadronamiento/Breadcrumbs";
import { JsonLd } from "@/components/empadronamiento/JsonLd";
import { OfficialCta } from "@/components/empadronamiento/OfficialCta";
import { PageShell } from "@/components/ui/PageShell";
import { ModelBlock } from "@/components/tramites/ModelBlock";
import { articleJsonLd, guideFaqs, guideFaqJsonLd } from "@/lib/seo/jsonld";
import { descargasForGuide } from "@/lib/descargas";
import { DISCLAIMER_CITA, LAST_VERIFIED } from "@/lib/tramites/facts";
import { PACK_INDEX_PATH, type Guide } from "@/lib/tramites/types";
import { PromesasDataBar } from "@/components/tramites/PromesasData";
import { GuideChartSvg } from "@/components/tramites/GuideChartSvg";
import { NextSteps } from "@/components/tramites/NextSteps";
import { DocumentChecklist } from "@/components/tramites/DocumentChecklist";
import type { DocumentProcedure } from "@/lib/tramites/document-checklists";

/** Section hubs that differ from the pack index (e.g. /pasaporte/* lives in the DNI pack). */
const SECTION_HUBS: Record<string, string> = {
  "/pasaporte": "Pasaporte: precio, cita y pasaporte urgente",
  "/dni": "DNI: cita previa, precio y renovación",
};

export function GuideView({ guide }: { guide: Guide }) {
  const faqs = guideFaqs(guide);
  const formularios = descargasForGuide(guide.path);
  const sectionHub = "/" + guide.path.split("/")[1];
  const hubLink = SECTION_HUBS[sectionHub] && sectionHub !== guide.path && sectionHub !== PACK_INDEX_PATH[guide.pack]
    ? [{ href: sectionHub, label: SECTION_HUBS[sectionHub] }] : [];
  const related = [...guide.related, ...hubLink].filter((link, index, links) =>
    link.href !== guide.path && links.findIndex((item) => item.href === link.href) === index,
  );
  const modified = guide.reviewedAt ?? LAST_VERIFIED;
  const checklist = ({ "/dni/checklist": "dni-renovacion", "/dni/renovar-caducado": "dni-renovacion", "/dni/primera-expedicion-menor": "dni-primero", "/pasaporte/cita-previa": "pasaporte", "/pasaporte/bebe": "pasaporte-menor" } as Record<string,DocumentProcedure>)[guide.path];
  const indexPath = PACK_INDEX_PATH[guide.pack];
  const crumbs =
    guide.path === indexPath
      ? [{ name: "Inicio", path: "/" }, { name: guide.h1, path: guide.path }]
      : [
          { name: "Inicio", path: "/" },
          { name: packLabel(guide.pack), path: indexPath },
          { name: guide.h1, path: guide.path },
        ];
  return (
    <PageShell as="article" className="min-[1280px]:max-w-[1120px]" data-guide={guide.id} data-pack={guide.pack}>
      <JsonLd data={guideFaqJsonLd(guide)} />
      {guide.dataset ? <JsonLd data={guide.dataset} /> : null}
      <JsonLd data={articleJsonLd({ headline: guide.h1, description: guide.lead, path: guide.path, dateModified: modified, sources: (guide.sources ?? [guide.cta, ...(guide.secondaryCta ? [guide.secondaryCta] : [])]).map(source => source.href).filter(href => href.startsWith("https://")) })} />
      <Breadcrumbs items={crumbs} />
      <h1 className="mt-2 font-display text-4xl text-mossDark">{guide.h1}</h1>
      <p className="mt-2 text-sm text-ink/70">
        Por <a href="/quienes-somos" rel="author">Equipo RutaTrámite</a> · {guide.reviewedAt ? "Revisado" : "Actualizado"}: <time dateTime={modified}>{modified}</time>
      </p>
      {guide.pack === "promesas-29n" ? <PromesasDataBar /> : null}
      <p className="mt-4 text-lg leading-relaxed">{guide.lead}</p>
      <div className="mt-6 flex flex-wrap gap-3">
        <OfficialCta href={guide.cta.href} label={guide.cta.label} />
        {guide.secondaryCta ? (
          <OfficialCta href={guide.secondaryCta.href} label={guide.secondaryCta.label} variant="secondary" />
        ) : null}
      </div>
      <div className="guide-layout mt-8 grid min-w-0 grid-cols-1 min-[1280px]:grid-cols-[minmax(0,246px)_minmax(0,1fr)] min-[1280px]:items-start min-[1280px]:gap-x-10">
      <nav aria-label="En esta guía" className="guide-toc min-w-0 max-w-full min-[1280px]:sticky min-[1280px]:top-24 min-[1280px]:max-h-[calc(100vh-7rem)] min-[1280px]:overflow-auto">
        <h2 className="font-semibold">En esta guía</h2>
        <ul className="mt-3 min-w-0 space-y-2">
          {guide.sections.map((s) => <li key={s.id}><a className="underline underline-offset-4" href={`#${s.id}`}>{s.title}</a></li>)}
          {formularios.length > 0 && <li><a className="underline underline-offset-4" href="#formularios">Formularios oficiales</a></li>}
          {faqs.length > 0 && <li><a className="underline underline-offset-4" href="#preguntas-frecuentes">Preguntas frecuentes</a></li>}
        </ul>
      </nav>
      <div className="guide-reading min-w-0 max-w-full" data-reading-column="">
      {checklist && <DocumentChecklist initial={checklist} />}
      {guide.sections.map((s) => (
        <section key={s.id} id={s.id} className="mt-10 space-y-4">
          <h2 className="font-display text-2xl text-mossDark">{s.title}</h2>
          {s.paragraphs.map((p) => (
            <p key={p.slice(0, 40)} className="leading-relaxed">
              {p}
            </p>
          ))}
          {s.lists?.map((list, i) => (
            <ul key={i} className="list-disc space-y-1 pl-5">
              {list.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          ))}
          {s.chart ? <GuideChartSvg chart={s.chart} /> : null}
          {s.table ? (
            <div className="guide-table-wrap" data-guide-table="">
              <table className="guide-table w-full border-collapse text-left">
                <caption className="mb-2 text-left font-semibold">{s.table.caption}</caption>
                <thead>
                  <tr>{s.table.head.map((h) => <th key={h} scope="col" className="border-b border-sand px-2 py-2">{h}</th>)}</tr>
                </thead>
                <tbody>
                  {s.table.rows.map((row, i) => (
                    <tr key={i} className="align-top">
                      {row.cells.map((c, j) => j === 0 ? <th key={j} scope="row" className="border-b border-sand px-2 py-2 font-normal">{keepDates(c)}</th> : <td key={j} data-label={s.table!.head[j]} className="border-b border-sand px-2 py-2">{keepDates(c)}</td>)}
                      <td data-label={s.table!.head[row.cells.length] ?? "Fuente"} className="guide-table-source border-b border-sand px-2 py-2"><a className="underline underline-offset-4" href={row.source.href}><span>{keepDates(row.source.label)}</span></a></td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : null}
          {s.models?.map((m) => (
            <ModelBlock key={m.id} model={m} />
          ))}
        </section>
      ))}
      {formularios.length > 0 && (
        <section id="formularios" className="mt-10 border-t border-sand pt-5">
          <h2 className="font-display text-2xl text-mossDark">Formularios oficiales</h2>
          <p className="mt-3 text-sm">
            Consulta el alcance de cada documento y las instrucciones de la fuente oficial antes de completarlo. Descargarlo no presenta la solicitud.
          </p>
          <ul className="mt-3 min-w-0 space-y-2">
            {formularios.map((f) => (
              <li key={f.file}>
                <p className="mb-2 text-sm">{f.purpose}</p>
                <a href={`/${f.file}`} className="underline underline-offset-4">{f.title}</a>{" "}
                <span className="text-sm">
                  ({Math.round(f.bytes / 1024)} kB · <time dateTime={f.verified}>verificado el {f.verified}</time> ·{" "}
                  <a href={f.source_url} className="underline underline-offset-4" rel="noopener noreferrer">fuente oficial</a>)
                </span>
              </li>
            ))}
          </ul>
          <p className="mt-3 text-sm"><a className="inline-flex min-h-11 items-center underline" href="/descargas">Todos los formularios descargables</a></p>
        </section>
      )}
      <NextSteps path={guide.path} />
      <section id="fuentes" className="mt-10 border-t border-sand pt-5">
        <h2 className="font-display text-2xl text-mossDark">Fuentes y comprobación</h2>
        <p className="mt-3">{guide.pack === "modelos"
          ? "Consulta estas referencias antes de adaptar y utilizar el modelo."
          : "Comprueba las condiciones y los avisos vigentes en las fuentes oficiales."}</p>
        <ul className="mt-3 min-w-0 space-y-2">
          {(guide.sources ?? [guide.cta, ...(guide.secondaryCta ? [guide.secondaryCta] : [])]).map((source) => <li key={source.href}><a data-official-source href={source.href} className="inline-flex min-h-[44px] items-center underline underline-offset-4">{source.label}</a></li>)}
        </ul>
        <p className="mt-3"><a className="inline-flex min-h-[44px] items-center underline" href="/metodologia">Cómo revisamos las guías</a> · <a className="inline-flex min-h-[44px] items-center underline" href="/contacto">Avisar de un error</a></p>
      </section>
      {faqs.length > 0 && <section id="preguntas-frecuentes" className="mt-10">
        <h2 className="font-display text-2xl text-mossDark">Preguntas frecuentes</h2>
        <div className="mt-4 space-y-3">
          {faqs.map((faq) => (
            <details key={faq.q} className="border-b border-sand py-3">
              <summary className="cursor-pointer font-semibold">{faq.q}</summary>
              <p className="mt-3 leading-relaxed">{faq.a}</p>
            </details>
          ))}
        </div>
      </section>}
      {related.length ? (
        <section className="mt-10">
          <h2 className="font-display text-2xl text-mossDark">Guías relacionadas</h2>
          <ul className="mt-4 divide-y divide-sand">
            {related.map((r) => (
              <li key={r.href}><a className="block py-3 text-mossDark underline underline-offset-4 hover:text-ink" href={r.href}>{r.label}</a></li>
            ))}
          </ul>
        </section>
      ) : null}
      {guide.disclaimer === "" ? null : <p className="mt-10 leading-relaxed text-ink/80" data-disclaimer="">
        {guide.disclaimer ?? (guide.pack === "viaje" ? DISCLAIMER_CITA : "Información orientativa. Confirma los requisitos de tu caso en el organismo responsable. No somos Administración Pública.")}
      </p>}
      </div>
      </div>
    </PageShell>
  );
}

/** Evita que una fecha como 16-10-2026 se parta en el guion al final de línea. */
function keepDates(text: string) {
  const parts = text.split(/(\d{1,2}-\d{1,2}-\d{4})/);
  if (parts.length === 1) return text;
  return parts.map((part, i) => (i % 2 === 1 ? <span key={i} className="whitespace-nowrap">{part}</span> : part));
}

function packLabel(pack: Guide["pack"]): string {
  switch (pack) {
    case "viaje":
      return "DNI y pasaporte";
    case "mudanza":
      return "Mudanza";
    case "extranjeria":
      return "Extranjería";
    case "colegio":
      return "Colegio";
    case "comedor":
      return "Comedor escolar";
    case "transporte":
      return "Transporte";
    case "fp":
      return "Formación Profesional";
    case "bebe":
      return "Bebé";
    case "becas":
      return "Becas";
    case "alquiler":
      return "Ayudas al alquiler";
    case "elecciones":
      return "Elecciones";
    case "ayudas-gobierno":
      return "Ayudas según cada gobierno";
    case "promesas-29n":
      return "Promesas del 29-N";
    case "trabajo":
      return "Trabajo y prestaciones";
    case "modelos":
      return "Modelos y cartas";
  }
}
