import { latestGuides } from "@/lib/seo/latest";
import type { Metadata } from "next";
import { Wizard } from "@/components/empadronamiento/Wizard";
import { Disclaimer } from "@/components/empadronamiento/Disclaimer";
import { PackCard } from "@/components/ui/PackCard";
import { PageShell } from "@/components/ui/PageShell";
import { DirectorySearch } from "@/components/ui/DirectorySearch";
import { GeoLead } from "@/components/ui/GeoLead";
import { loadIndex } from "@/lib/data/load";
import { pageMetadata } from "@/lib/seo/meta";
import { HOME_PRIORITY_LINKS } from "@/lib/seo/priorityLinks";
import { guideSearchEntries } from "@/lib/seo/siteSearch";
import { ESCENARIO_LABELS, WIZARD_QUESTIONS } from "@/lib/types";

const HOME_HEADING = "Trámites en España: guías, documentos y sedes oficiales";

export const metadata: Metadata = pageMetadata({
  title: HOME_HEADING,
  description:
    "Encuentra cómo hacer tus trámites en España: padrón, DNI, extranjería, becas y modelos. Guías paso a paso y enlaces oficiales. Sin registro.",
  path: "/",
});

const PACKS = [
  { href: "/elecciones", title: "Elecciones 29 de noviembre", blurb: "Voto por correo hasta el 19 de noviembre, calendario del BOE y quién está en el censo." },
  { href: "/ayudas", title: "Ayudas y plazos", blurb: "Becas y alquiler: consulta la convocatoria, el territorio y qué solicitudes admiten presentación." },
  { href: "/alquiler", title: "Ayudas al alquiler", blurb: "Bono Alquiler Joven, convocatorias autonómicas y nuevo Plan de Vivienda 2026-2030." },
  {
    href: "/empadronarse",
    title: "Padrón",
    blurb: "Alta, volante, certificado y cambio de domicilio. El trámite es del ayuntamiento.",
  },
  {
    href: "/dni",
    title: "DNI y pasaporte",
    blurb: "Renovar el DNI cuesta 12 € y el pasaporte 30 €. Cita gratuita en citapreviadnie.es; documentos y pasos.",
  },
  { href: "/trabajo", title: "Trabajo y paro", blurb: "Vida laboral, cita del SEPE e ingreso mínimo vital 2026." },
  {
    href: "/extranjeria",
    title: "Extranjería",
    blurb: "Citas, TIE, NIE, arraigo y expedientes: guías para elegir el trámite y su canal oficial.",
  },
  {
    href: "/mudanza",
    title: "Mudanza",
    blurb: "Qué domicilio comunicar al ayuntamiento, Policía y Hacienda, según tu situación.",
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
    href: "/transporte",
    title: "Transporte",
    blurb: "T-16, Abono Joven y títulos equivalentes. El trámite es del operador.",
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
    blurb: "Baja voluntaria, finiquito, padrón, alquiler y colegio. Modelos orientativos para adaptar al trámite.",
  },
] as const;

const CASOS = [
  {
    slug: "sin-contrato",
    blurb: "No tener un contrato a tu nombre no impide por sí solo empadronarte donde resides habitualmente.",
  },
  {
    slug: "con-contrato",
    blurb: "El contrato sirve para acreditar dónde vives; tenerlo no sustituye la solicitud de empadronamiento.",
  },
  {
    slug: "extranjeros-no-ue",
    blurb: "La situación administrativa irregular no impide por sí sola empadronarte donde vives.",
  },
  {
    slug: "volante-vs-certificado",
    blurb: "El volante informa de los datos del padrón; el certificado los acredita fehacientemente a efectos administrativos.",
  },
] as const;

export default function HomePage() {
  const municipioCount = loadIndex().length;
  return (
    <PageShell wide>
      <section className="rt-hero">
        <h1 className="hero-title font-display">{HOME_HEADING}</h1>
        <GeoLead>
          RutaTrámite explica documentos, requisitos y sedes oficiales de trámites en España (padrón, DNI,
          extranjería, becas y modelos). El trámite se presenta en el organismo responsable, no aquí. El alta en
          el padrón es gratuita. No somos Administración.
        </GeoLead>
        <DirectorySearch
          entries={guideSearchEntries()}
          hint="Busca una guía por trámite. Los municipios están en el padrón, el asistente o la búsqueda completa."
        />
        <div className="home-shortcuts"><span>Acceso directo</span><a href="/dni/cita-previa">Pedir cita para el DNI</a><a href="/dni">Precio y renovación del DNI</a><a href="/empadronarse">Empadronarse</a><a href="/becas">Consultar becas</a><a href="/extranjeria">Extranjería</a></div>
      </section>

      <section id="novedades" className="mt-10" data-home-latest="">
        <h2 className="font-display text-2xl text-mossDark">Nuevo y actualizado</h2>
        <p className="mt-2"><strong>Elecciones del 29-N:</strong> <a className="underline" href="/elecciones/promesas">qué propone cada partido</a> · <a className="underline" href="/elecciones/promesas/que-propone-cada-partido-vivienda">vivienda</a> · <a className="underline" href="/elecciones/promesas/que-propone-cada-partido-pensiones">pensiones</a> · <a className="underline" href="/elecciones/promesas/que-propone-cada-partido-impuestos">impuestos</a> · <a className="underline" href="/elecciones/promesas/que-propone-cada-partido-empleo-y-salarios">empleo y salarios</a> · <a className="underline" href="/elecciones/voto-por-correo">voto por correo</a></p>
        <ul className="mt-3 grid gap-1 sm:grid-cols-2">
          {latestGuides(12).map((g) => (<li key={g.path}><a className="underline" href={g.path}>{g.h1}</a> <time className="text-sm text-ink/60" dateTime={g.reviewedAt}>{g.reviewedAt}</time></li>))}
        </ul>
        <p className="mt-2 text-sm"><a className="underline" href="/feed.xml">Suscríbete a las novedades (RSS/Atom)</a></p>
      </section>

      <section id="tramites" className="mt-12" data-pack-grid="">
        <h2 className="font-display text-2xl text-mossDark">Trámites por tema</h2>
        <p className="mt-2 max-w-2xl text-ink/75">
          Elige una categoría y encuentra documentos, requisitos y enlaces oficiales.
        </p>
        <div className="topic-directory" data-home-topics="">
          {PACKS.map((p) => (
            <PackCard key={p.href} {...p} />
          ))}
        </div>
      </section>

      <section id="respuestas-rapidas" aria-labelledby="respuestas-rapidas-title" className="mt-12" data-home-priority="">
        <h2 id="respuestas-rapidas-title" className="font-display text-2xl text-mossDark">Respuestas rápidas por trámite</h2>
        <p className="mt-2 max-w-2xl text-ink/75">
          Dudas concretas que suelen surgir con plazos, citas y documentos. Cada guía enlaza a la sede oficial.
        </p>
        <div className="mt-4 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {HOME_PRIORITY_LINKS.map((group) => (
            <div key={group.title}>
              <h3 className="font-semibold text-mossDark">{group.title}</h3>
              <ul className="mt-2 list-disc space-y-1 pl-5">
                {group.links.map((l) => (<li key={l.href}><a className="underline" href={l.href}>{l.label}</a></li>))}
              </ul>
            </div>
          ))}
        </div>
      </section>

      <section id="asistente" className="mt-12 wizard-panel" data-home-wizard="">
        <div className="assistant-intro">
        <h2 className="font-display text-2xl text-mossDark">Prepara tu empadronamiento</h2>
        <p className="mt-3">Responde unas preguntas para saber qué documentos preparar y a qué sede continuar.</p>
        <p className="mt-3 text-sm text-ink/75">No pedimos DNI, dirección ni fotos. Tus respuestas se quedan en tu navegador.</p>
        <ol className="sr-only">{WIZARD_QUESTIONS.map((q) => <li key={q}>{q}</li>)}</ol></div>
        <div className="assistant-form"><Wizard /></div>
      </section>

      <section className="mt-12">
        <h2 className="font-display text-2xl text-mossDark">Dudas sobre el padrón</h2>
        <div className="topic-directory" data-home-topics="">
          {CASOS.map((s) => (
            <PackCard
              key={s.slug}
              href={`/empadronarse/${s.slug}`}
              title={ESCENARIO_LABELS[s.slug]}
              blurb={s.blurb}
            />
          ))}
        </div>
      </section>

      <section className="municipal-directory mt-12">
        <h2 className="font-display text-2xl text-mossDark">Buscar municipio</h2>
        <p className="mt-3 leading-relaxed">
          Consulta {municipioCount} fichas municipales, con su estado de verificación. Empieza por la{" "}
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
