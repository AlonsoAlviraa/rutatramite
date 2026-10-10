import { Breadcrumbs } from "@/components/empadronamiento/Breadcrumbs";
import { Disclaimer } from "@/components/empadronamiento/Disclaimer";
import { JsonLd } from "@/components/empadronamiento/JsonLd";
import { Wizard } from "@/components/empadronamiento/Wizard";
import { PackCard } from "@/components/ui/PackCard";
import { PageShell } from "@/components/ui/PageShell";
import { buildPilarModel } from "@/lib/pilar/content";
import type { MunicipioIndexEntry } from "@/lib/types";
import { allCcaaHubs } from "@/lib/geo/territories";

/** Fichas del hub nacional. El href sale del índice y es relativo; no cambia su robots. */
const CAPITAL_FICHA_INE = ["28079", "08019", "46250"] as const;

function capitalFichas(index: MunicipioIndexEntry[]) {
  return CAPITAL_FICHA_INE.flatMap((ine) => {
    const row = index.find((m) => m.ine_code === ine);
    if (!row || !row.path.startsWith("/") || row.path.startsWith("//")) return [];
    return [row];
  });
}

export function PilarArticle({
  index,
  includeWizard = true,
}: {
  index: MunicipioIndexEntry[];
  includeWizard?: boolean;
}) {
  const model = buildPilarModel();
  const capitals = capitalFichas(index);
  const ccaa = allCcaaHubs().map(c => [c.slug, c.name]);
  const jsonld = [
    {
      "@context": "https://schema.org",
      "@type": "HowTo",
      name: "Empadronarse en España",
      step: [
        { "@type": "HowToStep", name: "Identifica el municipio", text: "El padrón es del término municipal, no del área metropolitana." },
        { "@type": "HowToStep", name: "Reúne identidad y residencia", text: "Identificación admitida, representación cuando proceda y comprobación de residencia según tu situación. Los servicios sociales no sustituyen por sí solos la identificación." },
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
        Edición editorial <time dateTime={model.editedAt}>{model.editedAt}</time>
      </p>
      <p className="mt-4 text-lg leading-relaxed">{model.lead}</p>
      <p className="mt-6">
        <a className="inline-flex min-h-11 items-center font-semibold underline underline-offset-4" href="#asistente">
          Empezar el asistente de empadronamiento
        </a>
      </p>

      {includeWizard ? (
        <section id="asistente" className="wizard-panel mt-8" data-wizard-embed="">
          <h2 className="font-display text-2xl">Asistente: qué caso soy y en qué municipio</h2>
          <Wizard />
        </section>
      ) : (
        <section id="asistente" className="mt-8" data-wizard-embed="">
          <h2 className="font-display text-2xl">Asistente: qué caso soy y en qué municipio</h2>
          <p>Responde las preguntas del asistente para preparar tus documentos. No necesitas introducir tu DNI ni tu dirección.</p>
        </section>
      )}

      {model.sections.map((section) => (
        <section key={section.id} id={section.id} className="mt-10 space-y-4">
          <h2 className="font-display text-2xl text-mossDark">{section.title}</h2>
          {section.paragraphs.map((p, i) => (
            <p key={i} className="[overflow-wrap:anywhere] leading-relaxed">
              {p}
            </p>
          ))}
          {section.tables?.map((t, ti) => (
            <div key={ti} className="rt-table-wrap" role="region" aria-label={`${section.title}: tabla ${ti + 1}`} tabIndex={0}>
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
          {section.links && <ul className="space-y-3">{section.links.map(link => <li key={link.href}><a className="underline underline-offset-4" href={link.href}>{link.label}</a></li>)}</ul>}
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
            <>
              <ul className="grid gap-x-6 text-sm sm:grid-cols-2">
                {ccaa.map(([slug, name]) => (
                  <li key={slug}>
                    <a className="inline-flex min-h-11 items-center py-1 underline underline-offset-4" href={`/empadronarse/${slug}`}>
                      {name}
                    </a>
                  </li>
                ))}
              </ul>
              <nav aria-label="Fichas de Madrid, Barcelona y València" className="mt-4">
                <ul className="space-y-1 text-sm">
                  {capitals.map((m) => (
                    <li key={m.ine_code}>
                      <a className="inline-flex min-h-11 items-center py-1 underline underline-offset-4" href={m.path}>
                        Empadronarse en {m.name}
                      </a>
                    </li>
                  ))}
                </ul>
              </nav>
            </>
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
