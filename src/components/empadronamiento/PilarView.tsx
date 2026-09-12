import { Breadcrumbs } from "@/components/empadronamiento/Breadcrumbs";
import { Disclaimer } from "@/components/empadronamiento/Disclaimer";
import { JsonLd } from "@/components/empadronamiento/JsonLd";
import { Wizard } from "@/components/empadronamiento/Wizard";
import { PackCard } from "@/components/ui/PackCard";
import { PageShell } from "@/components/ui/PageShell";
import { GeoLead } from "@/components/ui/GeoLead";
import { buildPilarModel } from "@/lib/pilar/content";
import type { MunicipioIndexEntry } from "@/lib/types";
import { LAST_VERIFIED } from "@/lib/tramites/facts";
import { slimClientIndex } from "@/lib/wizard/clientIndex";

export function PilarArticle({
  index,
  includeWizard = true,
}: {
  index: MunicipioIndexEntry[];
  includeWizard?: boolean;
}) {
  const model = buildPilarModel();
  const ccaa = Array.from(new Map(index.map((m) => [m.ccaa_slug, m.ccaa_name])).entries());
  const jsonld = [
    {
      "@context": "https://schema.org",
      "@type": "HowTo",
      name: "Empadronarse en España",
      step: [
        { "@type": "HowToStep", name: "Identifica el municipio", text: "El padrón es del término municipal, no del área metropolitana." },
        { "@type": "HowToStep", name: "Reúne identidad y vivienda", text: "Documento en vigor y prueba de uso de la vivienda o vía de Servicios Sociales." },
        { "@type": "HowToStep", name: "Abre la sede del ayuntamiento", text: "El alta es gratuita y se pide en el consistorio, no en RutaTrámite." },
      ],
    },
    {
      "@context": "https://schema.org",
      "@type": "FAQPage",
      mainEntity: model.faqs.map((f) => ({
        "@type": "Question",
        name: f.q,
        acceptedAnswer: { "@type": "Answer", text: f.a },
      })),
    },
    {
      "@context": "https://schema.org",
      "@type": "GovernmentService",
      name: "Alta en el Padrón municipal",
      provider: { "@type": "GovernmentOrganization", name: "Ayuntamiento del municipio de residencia" },
    },
  ];

  return (
    <PageShell as="article" data-pilar="">
      <JsonLd data={jsonld} />
      <Breadcrumbs
        items={[
          { name: "Inicio", path: "/" },
          { name: "Empadronarse", path: "/empadronarse" },
        ]}
      />
      <h1 className="mt-2 font-display text-4xl text-mossDark">{model.h1}</h1>
      <p className="mt-2 text-sm text-ink/70">
        Actualizado <time dateTime={LAST_VERIFIED}>{LAST_VERIFIED}</time>
      </p>
      <GeoLead>{model.lead}</GeoLead>

      {includeWizard ? (
        <section className="wizard-panel mt-8" data-wizard-embed="">
          <h2 className="font-display text-2xl">Asistente: qué caso soy y en qué municipio</h2>
          <Wizard index={slimClientIndex(index)} />
        </section>
      ) : (
        <section className="mt-8" data-wizard-embed="">
          <h2 className="font-display text-2xl">Asistente: qué caso soy y en qué municipio</h2>
          <p>Responde seis preguntas para preparar tus documentos. No necesitas introducir tu DNI ni tu dirección.</p>
        </section>
      )}

      {model.sections.map((section) => (
        <section key={section.id} id={section.id} className="mt-10 space-y-4">
          <h2 className="font-display text-2xl text-mossDark">{section.title}</h2>
          {section.paragraphs.map((p, i) => (
            <p key={i} className="leading-relaxed">
              {p}
            </p>
          ))}
          {section.tables?.map((t, ti) => (
            <div key={ti} className="rt-table-wrap">
              <table className="rt-table">
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
                        <td key={ci}>{cell}</td>
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
          {section.id === "escenarios" ? (
            <div className="grid gap-4 sm:grid-cols-2">
              {model.escenarios.map((e) => (
                <PackCard key={e.slug} href={e.href} title={e.label} blurb={e.blurb} />
              ))}
            </div>
          ) : null}
          {section.id === "cobertura" ? (
            <ul className="grid gap-x-6 text-sm sm:grid-cols-2">
              {ccaa.map(([slug, name]) => (
                <li key={slug}>
                  <a className="inline-flex min-h-11 items-center py-1 underline underline-offset-4" href={`/empadronarse/${slug}`}>
                    {name}
                  </a>
                </li>
              ))}
            </ul>
          ) : null}
        </section>
      ))}

      <section id="faq" className="mt-10 space-y-4">
        <h2 className="font-display text-2xl text-mossDark">Preguntas frecuentes nacionales</h2>
        {model.faqs.map((f) => (
          <div key={f.q} className="rounded-xl border border-sand bg-white p-4">
            <h3 className="text-lg font-semibold">{f.q}</h3>
            <p className="mt-2 leading-relaxed">{f.a}</p>
          </div>
        ))}
      </section>

      <footer className="mt-12 border-t border-sand pt-6">
        <Disclaimer />
      </footer>
    </PageShell>
  );
}

export function PilarView({ index }: { index: MunicipioIndexEntry[] }) {
  return <PilarArticle index={index} includeWizard />;
}
