import { Breadcrumbs } from "@/components/empadronamiento/Breadcrumbs";
import { JsonLd } from "@/components/empadronamiento/JsonLd";
import { OfficialCta } from "@/components/empadronamiento/OfficialCta";
import { PageShell } from "@/components/ui/PageShell";
import { ModelBlock } from "@/components/tramites/ModelBlock";
import { articleJsonLd, guideFaqs, guideFaqJsonLd } from "@/lib/seo/jsonld";
import { descargasForGuide } from "@/lib/descargas";
import { DISCLAIMER_CITA, LAST_VERIFIED } from "@/lib/tramites/facts";
import { PACK_INDEX_PATH, type Guide } from "@/lib/tramites/types";
import { DocumentChecklist } from "@/components/tramites/DocumentChecklist";
import type { DocumentProcedure } from "@/lib/tramites/document-checklists";

export function GuideView({ guide }: { guide: Guide }) {
  const faqs = guideFaqs(guide);
  const formularios = descargasForGuide(guide.path);
  const related = guide.related.filter((link, index, links) =>
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
    <PageShell as="article" data-guide={guide.id} data-pack={guide.pack}>
      <JsonLd data={guideFaqJsonLd(guide)} />
      <JsonLd data={articleJsonLd({ headline: guide.h1, description: guide.lead, path: guide.path, dateModified: modified, sources: (guide.sources ?? [guide.cta, ...(guide.secondaryCta ? [guide.secondaryCta] : [])]).map(source => source.href).filter(href => href.startsWith("https://")) })} />
      <Breadcrumbs items={crumbs} />
      <h1 className="mt-2 font-display text-4xl text-mossDark">{guide.h1}</h1>
      <p className="mt-2 text-sm text-ink/70">
        {guide.reviewedAt ? "Revisión editorial" : "Edición del contenido"} <time dateTime={modified}>{modified}</time>
      </p>
      <p className="mt-4 text-lg leading-relaxed">{guide.lead}</p>
      <div className="mt-6 flex flex-wrap gap-3">
        <OfficialCta href={guide.cta.href} label={guide.cta.label} />
        {guide.secondaryCta ? (
          <OfficialCta href={guide.secondaryCta.href} label={guide.secondaryCta.label} variant="secondary" />
        ) : null}
      </div>
      <nav aria-label="En esta guía" className="guide-toc">
        <h2 className="font-semibold">En esta guía</h2>
        <ul className="mt-3 space-y-2">
          {guide.sections.map((s) => <li key={s.id}><a className="underline underline-offset-4" href={`#${s.id}`}>{s.title}</a></li>)}
          {formularios.length > 0 && <li><a className="underline underline-offset-4" href="#formularios">Formularios oficiales</a></li>}
          {faqs.length > 0 && <li><a className="underline underline-offset-4" href="#preguntas-frecuentes">Preguntas frecuentes</a></li>}
        </ul>
      </nav>
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
          <ul className="mt-3 space-y-2">
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
          <p className="mt-3 text-sm"><a className="underline" href="/descargas">Todos los formularios descargables</a></p>
        </section>
      )}
      <section id="fuentes" className="mt-10 border-t border-sand pt-5">
        <h2 className="font-display text-2xl text-mossDark">Fuentes y comprobación</h2>
        <p className="mt-3 text-sm">{guide.pack === "modelos"
          ? "Consulta estas referencias antes de adaptar y utilizar el modelo."
          : "Comprueba las condiciones y los avisos vigentes en las fuentes oficiales."}</p>
        <ul className="mt-3 space-y-2">
          {(guide.sources ?? [guide.cta, ...(guide.secondaryCta ? [guide.secondaryCta] : [])]).map((source) => <li key={source.href}><a data-official-source href={source.href} className="underline underline-offset-4">{source.label}</a></li>)}
        </ul>
        <p className="mt-3 text-sm"><a className="underline" href="/metodologia">Cómo revisamos las guías</a> · <a className="underline" href="/contacto">Avisar de un error</a></p>
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
      <p className="mt-10 text-sm leading-relaxed text-ink/80" data-disclaimer="">
        {guide.disclaimer ?? (guide.pack === "viaje" ? DISCLAIMER_CITA : "Información orientativa. Confirma los requisitos de tu caso en el organismo responsable. No somos Administración Pública.")}
      </p>
    </PageShell>
  );
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
    case "fp":
      return "Formación Profesional";
    case "bebe":
      return "Bebé";
    case "becas":
      return "Becas";
    case "alquiler":
      return "Ayudas al alquiler";
    case "modelos":
      return "Modelos y cartas";
  }
}
