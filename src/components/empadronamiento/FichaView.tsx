import { Breadcrumbs } from "@/components/empadronamiento/Breadcrumbs";
import { Disclaimer } from "@/components/empadronamiento/Disclaimer";
import { JsonLd } from "@/components/empadronamiento/JsonLd";
import { OfficialCta } from "@/components/empadronamiento/OfficialCta";
import { UnverifiedBadge } from "@/components/empadronamiento/UnverifiedBadge";
import { PackCard } from "@/components/ui/PackCard";
import { PageShell } from "@/components/ui/PageShell";
import { TableOfContents } from "@/components/ui/TableOfContents";
import type { FichaModel } from "@/lib/ficha/buildFicha";
import { ccaaPath, provinciaPath } from "@/lib/geo/paths";

export function FichaView({ model }: { model: FichaModel }) {
  const m = model.municipio;
  return (
    <PageShell as="article" className="[overflow-wrap:anywhere]" data-ficha={m.ine_code} data-oleada={m.oleada}>
      <JsonLd data={model.jsonld} />
      <header className="space-y-3">
        <Breadcrumbs
          items={[
            { name: "Inicio", path: "/" },
            { name: "Empadronarse", path: "/empadronarse" },
            { name: m.ccaa_name, path: ccaaPath(m.ccaa_slug) },
            { name: m.province_name, path: provinciaPath(m.ccaa_slug, m.province_slug) },
            { name: m.name, path: m.path },
          ]}
        />
        <h1 className="font-display text-4xl text-mossDark">{model.h1}</h1>
        <p className="text-sm text-ink/70">
          {m.province_name} · {m.ccaa_name} · INE {m.ine_code} · actualizado{" "}
          <time dateTime={m.last_verified}>{m.last_verified}</time>
        </p>
        <UnverifiedBadge show={model.unverified} />
        {m.review_note && <p className="rounded border border-sand p-4">{m.review_note}</p>}
        <p className="text-lg leading-relaxed" data-geo-lead="">
          {model.geoLead}
        </p>
        <div className="flex flex-wrap gap-3">
          <OfficialCta href={m.tramite_alta_url ?? m.sede_url} label={`Ir a la sede del Ayuntamiento de ${m.name}`} />
          {m.cita_url ? <OfficialCta href={m.cita_url} label="Pedir cita en la sede oficial" variant="secondary" /> : null}
        </div>
      </header>

      {m.evidence && <section className="mt-6 space-y-2" aria-labelledby="revision-local"><h2 id="revision-local" className="font-display text-2xl">Qué hemos comprobado</h2>
        <p>La comprobación corresponde al alta. Los certificados, cambios y renovaciones pueden tener otros requisitos.</p>
        <ul className="list-disc pl-5">{Object.entries(m.evidence).map(([field, e]) => <li key={field}><a className="underline" href={e.source_url}>{({ alta: "Procedimiento de alta", docs_extra: "Documentación", canal: "Canales de presentación", cita: "Cita y atención", certificado: "Certificados" } as Record<string,string>)[field] ?? field}</a> · <time dateTime={e.checked_at}>{e.checked_at}</time></li>)}</ul>
        <p><a className="inline-flex min-h-11 items-center underline" href="/recursos/padron-municipal">Comparar municipios y descargar los datos con fuentes</a></p>
      </section>}

      <TableOfContents items={[...model.sections, { id: "howto", title: "Paso a paso" }, { id: "faq", title: "Preguntas frecuentes" }, { id: "vecinos", title: "Municipios y casos relacionados" }]} />
      {model.sections.map((section) => (
        <section key={section.id} id={section.id} className="mt-10 space-y-4">
          <h2 className="font-display text-2xl text-mossDark">{section.title}</h2>
          {section.paragraphs.map((p, i) => (
            <p key={i} className="leading-relaxed">
              {p}
            </p>
          ))}
          {section.links?.length ? <ul className="space-y-2">{section.links.map((link) => <li key={link.href}><a href={link.href} className="underline underline-offset-4">{link.label}</a></li>)}</ul> : null}
          {section.tables?.map((t) => (
            <div key={t.caption} className="rt-table-wrap" role="region" aria-label={t.caption} tabIndex={0}>
              <table className="rt-table">
                <caption className="sr-only">{t.caption}</caption>
                <thead>
                  <tr>
                    {t.headers.map((h) => (
                      <th key={h}>{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {t.rows.map((row, ri) => (
                    <tr key={ri}>
                      {row.map((cell, ci) => (
                        <td key={ci} data-label={t.headers[ci]}>{cell}</td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ))}
          {section.lists?.map((list, li) => (
            <ul key={li} className="list-disc space-y-1 pl-5">
              {list.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          ))}
        </section>
      ))}

      <section id="howto" className="mt-10 space-y-4">
        <h2 className="font-display text-2xl text-mossDark">{model.howto.name}</h2>
        <ol className="list-decimal space-y-3 pl-5">
          {model.howto.steps.map((s) => (
            <li key={s.name}>
              <strong>{s.name}.</strong> {s.text}
            </li>
          ))}
        </ol>
      </section>

      <section id="faq" className="mt-10 space-y-4">
        <h2 className="font-display text-2xl text-mossDark">Preguntas frecuentes en {m.name}</h2>
        {model.faqs.map((f) => (
          <div key={f.q} className="rounded-xl border border-sand bg-white p-4">
            <h3 className="text-lg font-semibold">{f.q}</h3>
            <p className="mt-2 leading-relaxed">{f.a}</p>
          </div>
        ))}
      </section>

      <section id="vecinos" className="mt-10 space-y-3">
        <h2 className="font-display text-2xl text-mossDark">Vecinos y escenarios</h2>
        <div className="grid gap-3 sm:grid-cols-2">
          {model.neighbors.map((n) => (
            <PackCard key={n.path} href={n.path} title={`Empadronarse en ${n.name}`} blurb="Ficha del municipio vecino." />
          ))}
        </div>
        <div className="mt-4 grid gap-3 sm:grid-cols-2">
          {model.escenarios.map((e) => (
            <PackCard key={e.slug} href={e.href} title={e.label} blurb="Escenario nacional. Contrasta la sede local." />
          ))}
        </div>
      </section>

      <footer className="mt-12 border-t border-sand pt-6">
        <Disclaimer />
      </footer>
    </PageShell>
  );
}
