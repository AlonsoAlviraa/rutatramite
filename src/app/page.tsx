import { HoySeHabla } from "@/components/tramites/HoySeHabla";
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
  { href: "/dni", title: "DNI y pasaporte", blurb: "Renovar el DNI cuesta 12 € y el pasaporte 30 €. Cita gratuita, documentos y urgencias." },
  { href: "/empadronarse", title: "Padrón", blurb: "Alta, volante, certificado y cambio de domicilio. El trámite es del ayuntamiento." },
  { href: "/trabajo", title: "Trabajo y pensiones", blurb: "Vida laboral, SEPE, ingreso mínimo vital, revalorización de pensiones y huelga del 11-N." },
  { href: "/alquiler", title: "Alquiler y vivienda", blurb: "Bono Alquiler Joven, ayudas por comunidad y Plan de Vivienda 2026-2030." },
  { href: "/extranjeria", title: "Extranjería", blurb: "Citas, TIE, NIE, arraigo y expedientes: el trámite y su canal oficial." },
  { href: "/becas", title: "Becas", blurb: "Becas MEC 2026-27: plazos, estado de la solicitud y cuándo se cobra." },
  { href: "/ayudas", title: "Ayudas y plazos", blurb: "Convocatorias abiertas, territorio y qué solicitudes admiten presentación." },
  { href: "/mudanza", title: "Mudanza", blurb: "Qué domicilio comunicar al ayuntamiento, Policía y Hacienda, según tu situación." },
] as const;

const MORE_TOPICS = [
  { href: "/colegio", label: "Colegio" },
  { href: "/comedor", label: "Comedor" },
  { href: "/transporte", label: "Transporte" },
  { href: "/fp", label: "FP" },
  { href: "/bebe", label: "Bebé" },
  { href: "/modelos", label: "Modelos y cartas" },
  { href: "/descargas", label: "Formularios (EX-10…)" },
] as const;

const ELECCIONES_29N = [
  { href: "/elecciones/como-votar-el-dia-29", title: "Cómo votar el 29-N", blurb: "Qué llevar, horario y pasos en el colegio electoral." },
  { href: "/elecciones/tarjeta-censal-cuando-llega", title: "Tarjeta censal", blurb: "Cuándo llega y qué hacer si no te llega." },
  { href: "/elecciones/programas-electorales-29n", title: "Programas electorales", blurb: "Cuándo se publican y dónde leerlos." },
  { href: "/elecciones/mapa-voto-util-29n", title: "Mapa del voto útil", blurb: "Último escaño y peso del voto en cada provincia." },
  { href: "/elecciones/agenda-mitines-29n", title: "Agenda de mítines", blurb: "Próximos actos confirmados de cada candidato." },
  { href: "/elecciones/encuestas-29n", title: "Encuestas", blurb: "Media de encuestas publicadas, con su ficha técnica." },
  { href: "/elecciones/excusa-mesa-electoral", title: "¿Te ha tocado mesa?", blurb: "Excusas, plazo de 7 días y modelo de escrito." },
  { href: "/elecciones/suplente-mesa-electoral", title: "Suplente de mesa", blurb: "A qué hora ir, dieta y qué pasa si no vas." },
] as const;

// Páginas con más clics en Google (GSC API, 28 días a 2026-10-23), sin repetir las del bloque 29-N.
const POPULARES = [
  { href: "/elecciones/cuando-habra-gobierno-29n", label: "¿Cuándo habrá Gobierno tras el 29-N?" },
  { href: "/elecciones/quiere-algun-partido-quitar-las-pensiones", label: "¿Quiere algún partido quitar las pensiones?" },
  { href: "/dni", label: "Renovar el DNI: precio y cita" },
  { href: "/elecciones/resultados-y-escrutinio", label: "Resultados y escrutinio" },
  { href: "/elecciones/voto-nulo-ejemplos", label: "Voto nulo: ejemplos" },
  { href: "/elecciones/que-pasa-si-no-voto", label: "¿Qué pasa si no voto?" },
  { href: "/trabajo/revalorizacion-pensiones-2026", label: "Revalorización de pensiones 2026" },
  { href: "/descargas", label: "Formularios oficiales (EX-10 y más)" },
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
          Guías claras para hacer tus trámites en España, con el enlace a la sede oficial. Gratis, sin registro y sin
          ser la Administración.
        </GeoLead>
        <DirectorySearch
          entries={guideSearchEntries()}
          hint="Escribe el trámite o tu municipio."
        />
        <div className="home-shortcuts"><span>Acceso directo</span><a href="/dni/cita-previa">Pedir cita para el DNI</a><a href="/empadronarse">Empadronarse</a><a href="/elecciones/voto-por-correo">Voto por correo</a><a href="/becas">Consultar becas</a><a href="/extranjeria">Extranjería</a></div>
      </section>

      <section id="elecciones-29n" aria-labelledby="elecciones-29n-title" className="home-panel" data-home-29n="">
        <div className="home-head">
          <h2 id="elecciones-29n-title" className="font-display text-2xl text-mossDark">Elecciones del 29 de noviembre</h2>
          <a className="home-more" href="/elecciones">Todo sobre el 29-N →</a>
        </div>
        <p className="home-sub">Voto por correo hasta el 19 de noviembre. Calendario y datos del BOE.</p>
        <div className="home-grid">
          {ELECCIONES_29N.map((c) => (
            <a key={c.href} href={c.href} className="home-card">
              <span className="home-card-title">{c.title}</span>
              <span className="home-card-text">{c.blurb}</span>
            </a>
          ))}
        </div>
      </section>

      <HoySeHabla className="home-section home-hoy" />

      <section id="tramites" aria-labelledby="tramites-title" className="home-section" data-pack-grid="">
        <h2 id="tramites-title" className="font-display text-2xl text-mossDark">Trámites por tema</h2>
        <div className="home-grid home-grid--topics" data-home-topics="">
          {PACKS.map((p) => (
            <PackCard key={p.href} {...p} />
          ))}
        </div>
        <nav aria-label="Más temas" className="home-chips">
          <span>Más temas:</span>
          {MORE_TOPICS.map((t) => (<a key={t.href} href={t.href}>{t.label}</a>))}
        </nav>
      </section>

      <section id="populares" aria-labelledby="populares-title" className="home-section" data-home-popular="">
        <h2 id="populares-title" className="font-display text-2xl text-mossDark">Las guías más consultadas</h2>
        <ul className="home-list home-list--cols">
          {POPULARES.map((l) => (<li key={l.href}><a href={l.href}>{l.label}</a></li>))}
        </ul>
      </section>

      <section id="novedades" className="home-section" data-home-latest="">
        <h2 className="font-display text-2xl text-mossDark">Nuevo y actualizado</h2>
        <ul className="mt-3 grid gap-1 sm:grid-cols-2">
          {latestGuides(8).map((g) => (<li key={g.path}><a className="inline-block min-h-11 py-[10px] underline" href={g.path}>{g.h1}</a> <time className="text-sm text-ink/60" dateTime={g.reviewedAt}>{g.reviewedAt}</time></li>))}
        </ul>
        <p className="mt-2 text-sm"><a className="inline-flex min-h-11 items-center underline" href="/feed.xml">Suscríbete a las novedades (RSS/Atom)</a></p>
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
