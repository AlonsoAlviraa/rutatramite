import { Breadcrumbs } from "@/components/empadronamiento/Breadcrumbs";
import { JsonLd } from "@/components/empadronamiento/JsonLd";
import { OfficialCta } from "@/components/empadronamiento/OfficialCta";
import { PageShell } from "@/components/ui/PageShell";
import { ModelBlock } from "@/components/tramites/ModelBlock";
import { GeoLead } from "@/components/ui/GeoLead";
import { articleJsonLd, guideFaqs, guideFaqJsonLd } from "@/lib/seo/jsonld";
import { DISCLAIMER_CITA, LAST_VERIFIED } from "@/lib/tramites/facts";
import { PACK_INDEX_PATH, type Guide } from "@/lib/tramites/types";

export function GuideView({ guide }: { guide: Guide }) {
  const faqs = guideFaqs(guide);
  const related = guide.related.filter((link, index, links) =>
    link.href !== guide.path && links.findIndex((item) => item.href === link.href) === index,
  );
  const modified = guide.reviewedAt ?? LAST_VERIFIED;
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
      <JsonLd data={articleJsonLd({ headline: guide.h1, description: guide.lead, path: guide.path, dateModified: modified })} />
      <Breadcrumbs items={crumbs} />
      <h1 className="mt-2 font-display text-4xl text-mossDark">{guide.h1}</h1>
      <p className="mt-2 text-sm text-ink/70">
        {guide.reviewedAt ? "Revisión editorial" : "Edición del contenido"} <time dateTime={modified}>{modified}</time>
      </p>
      <GeoLead>{guide.lead}</GeoLead>
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
          {faqs.length > 0 && <li><a className="underline underline-offset-4" href="#preguntas-frecuentes">Preguntas frecuentes</a></li>}
        </ul>
      </nav>
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
      <section id="fuentes" className="mt-10 border-t border-sand pt-5">
        <h2 className="font-display text-2xl text-mossDark">Fuentes y comprobación</h2>
        <p className="mt-3 text-sm">{guide.pack === "modelos"
          ? "Consulta estas referencias antes de adaptar y utilizar el modelo."
          : "Comprueba las condiciones y los avisos vigentes en las fuentes oficiales."}</p>
        <ul className="mt-3 space-y-2">
          {(guide.sources ?? [guide.cta, ...(guide.secondaryCta ? [guide.secondaryCta] : [])]).map((source) => <li key={source.href}><a href={source.href} className="underline underline-offset-4">{source.label}</a></li>)}
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
    case "modelos":
      return "Modelos y cartas";
  }
}
