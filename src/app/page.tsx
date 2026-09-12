import type { Metadata } from "next";
import { Wizard } from "@/components/empadronamiento/Wizard";
import { Disclaimer } from "@/components/empadronamiento/Disclaimer";
import { PackCard } from "@/components/ui/PackCard";
import { PageShell } from "@/components/ui/PageShell";
import { DirectorySearch } from "@/components/ui/DirectorySearch";
import { GeoLead } from "@/components/ui/GeoLead";
import { loadIndex } from "@/lib/data/load";
import { pageMetadata } from "@/lib/seo/meta";
import { guideSearchEntries } from "@/lib/seo/siteSearch";
import { slimClientIndex } from "@/lib/wizard/clientIndex";
import { ESCENARIO_LABELS, WIZARD_QUESTIONS } from "@/lib/types";

export const metadata: Metadata = pageMetadata({
  title: "Trámites en España: guías, documentos y sedes oficiales",
  description:
    "Encuentra cómo hacer tus trámites en España: padrón, DNI, extranjería, becas y modelos. Guías paso a paso y enlaces oficiales. Sin registro.",
  path: "/",
});

const PACKS = [
  {
    href: "/empadronarse",
    title: "Padrón",
    blurb: "Alta, volante, certificado y cambio de domicilio. El trámite es del ayuntamiento.",
  },
  {
    href: "/dni",
    title: "DNI y pasaporte",
    blurb: "citapreviadnie.es. Cita gratuita. Tasas 2026: DNI 12 €, pasaporte 30 €.",
  },
  {
    href: "/extranjeria",
    title: "Extranjería",
    blurb: "Correos, Mercurio, TIE, NIE y arraigo. Solo sedes oficiales.",
  },
  {
    href: "/mudanza",
    title: "Mudanza",
    blurb: "Padrón, DNI (domicilio) y modelo 030, en el orden que toca.",
  },
  {
    href: "/colegio",
    title: "Colegio",
    blurb: "Cambio de centro, incluso fuera de plazo o por mudanza.",
  },
  {
    href: "/comedor",
    title: "Comedor",
    blurb: "Beca fuera de plazo, impago, alergias e IES sin comedor.",
  },
  {
    href: "/fp",
    title: "Formación Profesional",
    blurb: "Matrícula en septiembre, vacantes y convalidaciones.",
  },
  {
    href: "/bebe",
    title: "Bebé",
    blurb: "Registro Civil, tarjeta sanitaria, padrón y cartilla de vacunación.",
  },
  {
    href: "/becas",
    title: "Becas",
    blurb: "MEC 2026-27: plazos, estado y cobro. Convocatorias en sede oficial.",
  },
  {
    href: "/modelos",
    title: "Modelos y cartas",
    blurb: "Baja voluntaria, finiquito, padrón, alquiler y colegio. Para copiar y entregar.",
  },
] as const;

const CASOS = ["sin-contrato", "con-contrato", "extranjeros-no-ue", "volante-vs-certificado"] as const;

export default function HomePage() {
  const wizardIndex = slimClientIndex(loadIndex());
  return (
    <PageShell wide>
      <section className="rt-hero">
        <h1 className="hero-title font-display">Guías para hacer tus trámites en España</h1>
        <GeoLead>
          RutaTrámite explica documentos, requisitos y sedes oficiales de trámites en España (padrón, DNI,
          extranjería, becas y modelos). El trámite se presenta en el organismo responsable, no aquí. El alta en
          el padrón es gratuita. No somos Administración.
        </GeoLead>
        <DirectorySearch entries={guideSearchEntries()} />
        <div className="home-shortcuts">
          <span>Acceso directo</span>
          <a href="/dni/cita-previa">Pedir cita para el DNI</a>
          <a href="/empadronarse">Empadronarse</a>
          <a href="/becas">Consultar becas</a>
          <a href="/buscar">Buscar</a>
        </div>
      </section>

      <section id="tramites" className="mt-12" data-pack-grid="">
        <h2 className="font-display text-2xl text-mossDark">Trámites por tema</h2>
        <p className="mt-2 max-w-2xl text-ink/75">
          Elige una categoría y encuentra documentos, requisitos y enlaces oficiales.
        </p>
        <div className="topic-directory">
          {PACKS.map((p) => (
            <PackCard key={p.href} {...p} />
          ))}
        </div>
      </section>

      <section id="asistente" className="mt-12 wizard-panel" data-home-wizard="">
        <div className="assistant-intro">
          <h2 className="font-display text-2xl text-mossDark">Prepara tu empadronamiento</h2>
          <p className="mt-3">Responde 6 preguntas para saber qué documentos preparar y dónde continuar.</p>
          <p className="mt-3 text-sm text-ink/75">
            No pedimos DNI, dirección ni fotos. Tus respuestas se quedan en tu navegador.
          </p>
          <ol className="sr-only">
            {WIZARD_QUESTIONS.map((q) => (
              <li key={q}>{q}</li>
            ))}
          </ol>
        </div>
        <div className="assistant-form">
          <Wizard index={wizardIndex} />
        </div>
      </section>

      <section className="mt-12">
        <h2 className="font-display text-2xl text-mossDark">Dudas sobre el padrón</h2>
        <div className="topic-directory">
          {CASOS.map((s) => (
            <PackCard
              key={s}
              href={`/empadronarse/${s}`}
              title={ESCENARIO_LABELS[s]}
              blurb="Guía nacional del caso. Contrasta siempre la sede de tu municipio."
            />
          ))}
        </div>
      </section>

      <section className="municipal-directory mt-12">
        <h2 className="font-display text-2xl text-mossDark">Buscar municipio</h2>
        <p className="mt-3 leading-relaxed">
          Consulta {wizardIndex.length} fichas municipales, con su estado de verificación. Empieza por la{" "}
          <a className="font-semibold underline decoration-sand underline-offset-2" href="/empadronarse">
            guía nacional
          </a>
          , escribe el pueblo en el asistente o usa la{" "}
          <a className="font-semibold underline decoration-sand underline-offset-2" href="/buscar">
            búsqueda
          </a>
          .
        </p>
      </section>
      <Disclaimer className="mt-10" />
    </PageShell>
  );
}
