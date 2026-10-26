import { Breadcrumbs } from "@/components/empadronamiento/Breadcrumbs";
import { AidCalendar } from "@/components/tramites/AidCalendar";
import { DocumentFees } from "@/components/tramites/DocumentFees";
import { DniQuickAnswers } from "@/components/tramites/DniQuickAnswers";
import { Disclaimer } from "@/components/empadronamiento/Disclaimer";
import { PackCard } from "@/components/ui/PackCard";
import { PageShell } from "@/components/ui/PageShell";
import { WildDestacado } from "@/components/tramites/WildDestacado";
import { DisturbiosBcn } from "@/components/tramites/DisturbiosBcn";
import { DirectorySearch } from "@/components/ui/DirectorySearch";
import { guidesByPack } from "@/lib/tramites/catalog";
import { DISCLAIMER_GENERICO } from "@/lib/tramites/facts";
import { OfficialCta } from "@/components/empadronamiento/OfficialCta";
import { CITA_DNI_URL, SEDE_AAPP_URL } from "@/lib/tramites/facts";
import { AID_SOURCES } from "@/lib/ayudas";
import { PACK_INDEX_PATH, type GuidePack } from "@/lib/tramites/types";
import { HoySeHabla } from "@/components/tramites/HoySeHabla";
import { NextSteps } from "@/components/tramites/NextSteps";
import { RELATED_LINKS } from "@/lib/seo/relatedLinks";
import { ALL_GUIDES } from "@/lib/tramites/catalog";
import { JsonLd } from "@/components/empadronamiento/JsonLd";
import { AYUDAS_GOBIERNO_NOTE } from "@/lib/tramites/ayudas-por-gobierno";
import { fechaLarga, PromesasDataBar, PromesasMatrix } from "@/components/tramites/PromesasData";
import { PROMESAS_29N_NOTE, PROMESAS_29N_UPDATED } from "@/lib/tramites/promesas-29n";
import { absoluteUrl } from "@/lib/geo/paths";
import { articleJsonLd } from "@/lib/seo/jsonld";

/** Shared document heading for the hubs whose title and H1 must match. */
export const PACK_DOCUMENT_HEADINGS = {
  viaje: "Tasas DNI y pasaporte España 2026: 12 € y 30 €, cita previa",
  pasaporte: "Pasaporte en España 2026: cuánto cuesta (30 €), cita y urgente",
  becas: "Consulta beca MEC 2026-27: estado, resolución y cobro",
  extranjeria: "Extranjería: citas, documentos y expedientes",
} as const;

const titles: Record<GuidePack, { h1: string; lead: string }> = {
  viaje: {
    h1: PACK_DOCUMENT_HEADINGS.viaje,
    lead: "Cita oficial en citapreviadnie.es. La cita es gratuita. Tasas 2026: DNI 12 €, pasaporte 30 €. No somos Policía.",
  },
  mudanza: {
    h1: "Me he mudado",
    lead: "Qué documentos actualizar tras una mudanza: padrón, domicilio del DNI y modelo 030.",
  },
  extranjeria: {
    h1: PACK_DOCUMENT_HEADINGS.extranjeria,
    lead: "Guías de citas, TIE, NIE, arraigo, regreso y regularización. Comprueba qué operación necesitas: reservar una cita, presentar documentación o consultar un expediente. Cada guía enlaza las fuentes y el canal oficial correspondiente.",
  },
  colegio: {
    h1: "Colegio: matrícula y cambios de centro",
    lead: "Consulta cómo solicitar un cambio de colegio, preparar documentos de secretaría y presentar autorizaciones. La admisión y la asignación de centro se tramitan ante la administración educativa correspondiente.",
  },
  comedor: {
    h1: "Comedor escolar y beca comedor",
    lead: "Ayudas de comedor, dificultades de pago, menús especiales y acceso al servicio. Comprueba la convocatoria y el procedimiento del centro, junto con las normas estatales y autonómicas aplicables.",
  },
  transporte: {
    h1: "Abonos y tarjetas de transporte",
    lead: "T-16 de Barcelona, Abono Joven de Madrid y títulos equivalentes. El comedor escolar está en su propia categoría.",
  },
  fp: {
    h1: "Formación Profesional: matrícula y papeles",
    lead: "Admisión en FP, consulta de vacantes, convalidaciones y becas. Comprueba el calendario y las plazas disponibles en la sede educativa de tu comunidad.",
  },
  bebe: {
    h1: "Bebé: registro civil, tarjeta sanitaria y cartilla",
    lead: "Documentación del recién nacido: Registro Civil, Seguridad Social, tarjeta sanitaria, padrón y cartilla de vacunación.",
  },
  becas: {
    h1: PACK_DOCUMENT_HEADINGS.becas,
    lead: "Respuesta corta: el estado de la beca MEC 2026-27 se consulta en la sede electrónica del Ministerio de Educación, en el apartado de tus expedientes, con los datos del solicitante. El plazo ordinario fue del 7 de abril al 19 de mayo de 2026 y la ventana para modificar datos, del 7 al 28 de septiembre de 2026. A 24 de octubre de 2026, el Ministerio no ha anunciado la resolución definitiva. Abajo tienes las guías de solicitud, estado, cobro, resolución y devolución.",
  },
  alquiler: {
    h1: "Ayudas al alquiler: Bono Joven y nuevas convocatorias",
    lead: "Consulta las ayudas de vivienda según tu comunidad: requisitos, plazos y seguimiento. Diferencia el Bono Alquiler Joven del nuevo Plan Estatal de Vivienda 2026-2030.",
  },
  elecciones: {
    h1: "Elecciones del 29 de noviembre de 2026: voto por correo y plazos",
    lead: "Voto por correo, calendario del Real Decreto 806/2026, las 9 coaliciones registradas, la huelga general del 11 de noviembre y quién figura en el censo. Plazos clave: candidaturas del 21 al 26 de octubre; sorteo de mesas del 31 de octubre al 4 de noviembre; solicitud del voto por correo hasta el 19 de noviembre; envío del voto en Correos hasta el 25 de noviembre. Las fechas salen del BOE, de la Junta Electoral Central, de Interior y de Correos.",
  },
  "ayudas-gobierno": {
    h1: "Ayudas del Estado según cada gobierno desde 1996: estudiantes, familias, jóvenes, jubilados, autónomos, parados y dependencia",
    lead: "Respuesta corta: los cuatro gobiernos desde 1996 (Aznar, Zapatero, Rajoy y Sánchez) crearon ayudas estatales y también recortaron o suprimieron otras. Elige tu perfil para ver, en una tabla cronológica, cada cambio con su año y su norma del BOE.",
  },
  "promesas-29n": {
    h1: "Promesas electorales del 29-N: qué propone cada partido y cómo te afecta",
    lead: "Respuesta corta: a 18 de octubre de 2026 ningún partido ha publicado su programa completo para las generales del 29 de noviembre. Aquí recogemos cada medida o declaración fechada de PP, PSOE, Vox, Frente Amplio, Podemos y Democracia 21 (orden por votos en 2023; Democracia 21, nuevo, al final), en notas oficiales, mítines y actos, con su cita, fuente y fecha, y explicamos cómo afectaría según tu comunidad y tu perfil.",
  },
  trabajo: {
    h1: "Trabajo, paro y prestaciones",
    lead: "Vida laboral, cita del SEPE para el paro e ingreso mínimo vital: qué hacer, en qué web oficial y gratis.",
  },
  modelos: {
    h1: "Modelos y cartas para copiar",
    lead: "Baja voluntaria, finiquito, padrón, alquiler y colegio: modelos orientativos para preparar tu escrito. Comprueba el destinatario, el plazo y si existe un formulario obligatorio. No somos Administración ni despacho.",
  },
};

function RelatedLinks({ path }: { path: string }) {
  const items = (RELATED_LINKS[path] ?? []).map((p) => ALL_GUIDES.find((g) => g.path === p)).filter((g): g is NonNullable<typeof g> => Boolean(g));
  if (!items.length) return null;
  return (
    <nav aria-labelledby="relacionadas-title" className="mt-8" data-related-links="">
      <h2 id="relacionadas-title" className="font-display text-2xl text-mossDark">También te puede servir</h2>
      <ul className="mt-3 list-disc space-y-1 pl-5">
        {items.map((g) => (<li key={g.path}><a className="underline" href={g.path}>{g.h1}</a></li>))}
      </ul>
    </nav>
  );
}

export function PackIndex({ pack, focus }: { pack: GuidePack; focus?: "pasaporte" }) {
  const passport = pack === "viaje" && focus === "pasaporte";
  const t = passport ? {
    h1: PACK_DOCUMENT_HEADINGS.pasaporte,
    lead: "Respuesta corta: el pasaporte cuesta 30 € en 2026, salvo exención, y la cita es gratuita en citapreviadnie.es o en el 060. El DNI cuesta 12 €. Aquí tienes cómo pedir cita, qué documentos llevar, el pasaporte urgente, el de menores y qué hacer ante un viaje próximo o una pérdida en el extranjero.",
  } : titles[pack];
  const sinCita = passport ? guidesByPack("viaje").find((guide) => guide.path === "/pasaporte/caducado-sin-cita") : undefined;
  const guides = guidesByPack(pack).filter((guide) => !passport ||
    guide.path.startsWith("/pasaporte/") ||
    ["/dni/primera-expedicion-menor", "/dni/misma-cita-pasaporte", "/dni/checklist"].includes(guide.path));
  return (
    <PageShell as="article" wide data-pack-index={pack}>
      <Breadcrumbs
        items={[
          { name: "Inicio", path: "/" },
          { name: t.h1, path: passport ? "/pasaporte" : PACK_INDEX_PATH[pack] },
        ]}
      />
      <h1 className="mt-2 font-display text-4xl text-mossDark">{t.h1}</h1>
      <p className="mt-4 text-lg leading-relaxed">{t.lead}</p>
      {pack === "viaje" && !passport ? (
        <p className="mt-4 border border-sand p-4" data-dni-precio-renovar="">
          <strong>¿Cuánto cuesta renovar el DNI en 2026?</strong> 12 €, tanto si está en vigor como si ha caducado, y lo mismo la primera vez (<a className="underline" href="https://www.boe.es/buscar/act.php?id=BOE-A-1979-867">Ley 84/1978, art. 6, BOE</a>). Es gratis para familias numerosas y para cambiar el domicilio de un DNI en vigor. El pasaporte cuesta 30 €; los dos en la misma cita, 42 €.
        </p>
      ) : null}
      {pack === "elecciones" ? <WildDestacado /> : null}
      {pack === "elecciones" ? <DisturbiosBcn /> : null}
      {pack === "elecciones" || pack === "trabajo" ? <HoySeHabla /> : null}
      {pack === "viaje" ? (
        <div className="mt-6">
          <OfficialCta
            href={CITA_DNI_URL}
            label={passport ? "Consultar cita de pasaporte en citapreviadnie.es" : "Consultar cita del DNI en citapreviadnie.es"}
          />
          {sinCita ? <p className="mt-4"><a className="inline-flex min-h-11 items-center underline" href={sinCita.path}>{sinCita.h1}</a></p> : null}
        </div>
      ) : null}
      {pack === "extranjeria" ? (
        <div className="mt-6">
          <OfficialCta href={SEDE_AAPP_URL} label="Sede de extranjería" />
        </div>
      ) : null}
      {pack === "viaje" && !passport && <DniQuickAnswers />}
      {pack === "viaje" && <DocumentFees passport={passport} />}
      {pack === "viaje" && !passport && <NextSteps path="/dni" />}
      {passport ? <p className="mt-4 text-sm" data-dni-crosslink=""><a className="underline" href="/dni">Precio del DNI 2026 (12 €) y cómo renovarlo</a> · <a className="underline" href="/dni/cita-previa">Cita previa del DNI y del pasaporte</a></p> : null}
      <RelatedLinks path={passport ? "/pasaporte" : PACK_INDEX_PATH[pack]} />
      {pack === "bebe" ? (
        <>
          <p className="mt-4 text-sm">
            <a className="inline-flex min-h-11 items-center underline" href="https://www.boe.es/buscar/act.php?id=BOE-A-2011-12628#a46">Ley del Registro Civil, artículos 46 y 47: comunicación en 72 horas y declaración en diez días</a>
          </p>
          <p className="mt-4 text-sm">
            <a className="underline" href="/bebe/calendario-vacunal-por-comunidad">Calendario vacunal según la comunidad</a>
            {" · "}
            <a className="underline" href="/bebe/apoyo-lactancia">Apoyo a la lactancia</a>
          </p>
        </>
      ) : null}
      {pack === "fp" ? (
        <p className="mt-4 text-sm">
          <a className="underline" href="https://www.todofp.es/comunes/faq.html#cla-0-09">TodoFP: la plaza se pide en las fechas de la convocatoria de cada comunidad</a>
          {" · "}
          <a className="underline" href="https://www.todofp.es/sobre-fp/webs-fp-ccaa.html">Webs de FP de las comunidades autónomas</a>
        </p>
      ) : null}
      {pack === "colegio" ? (
        <>
          <p className="mt-4 text-sm">
            <a className="inline-flex min-h-11 items-center underline" href="https://www.boe.es/buscar/act.php?id=BOE-A-2006-7899#a84">LOE, artículo 84: las Administraciones educativas regulan la admisión</a>
          </p>
          <p className="mt-4 text-sm">
            <a className="inline-flex min-h-11 items-center underline" href="/colegio/escuela-infantil-publica">Escuela infantil pública 0-3: la plaza y el plazo los publica tu comunidad</a>
          </p>
        </>
      ) : null}
      {pack === "comedor" ? (
        <p className="mt-4 text-sm">
          <a className="underline" href="https://www.boe.es/buscar/act.php?id=BOE-A-2025-7659#a1-2">Real Decreto 315/2025, artículo 10: menús especiales</a>
          {" · "}
          <a className="underline" href="/comedor/beca-comedor-2026-2027">Convocatorias seleccionadas 2026/27, no un plazo nacional</a>
        </p>
      ) : null}
      {pack === "alquiler" ? (
        <p className="mt-4 text-sm">
          <a className="underline" href={AID_SOURCES.bono.href}>{AID_SOURCES.bono.label}</a>
          {" · "}
          <a className="underline" href={AID_SOURCES.plan.href}>{AID_SOURCES.plan.label}</a>
        </p>
      ) : null}
      {pack === "ayudas-gobierno" ? (
        <>
          <JsonLd data={{ "@context": "https://schema.org", "@type": "ItemList", name: t.h1, itemListElement: guides.map((g, i) => ({ "@type": "ListItem", position: i + 1, name: g.h1, url: absoluteUrl(g.path) })) }} />
          <JsonLd data={{ "@context": "https://schema.org", "@type": "FAQPage", mainEntity: [
            { "@type": "Question", name: "¿Qué gobierno dio más ayudas?", acceptedAnswer: { "@type": "Answer", text: "No hacemos esa valoración. Cada perfil recoge, con el mismo criterio para los cuatro gobiernos, las medidas estatales creadas, cambiadas o suprimidas, con su norma del BOE." } },
            { "@type": "Question", name: "¿Incluye ayudas autonómicas?", acceptedAnswer: { "@type": "Answer", text: "No. Solo normas estatales publicadas en el BOE." } },
          ] }} />
          <p className="mt-4 text-sm" data-neutrality-note="">{AYUDAS_GOBIERNO_NOTE} Revisión editorial <time dateTime="2026-10-12">2026-10-12</time>.</p>
        </>
      ) : null}
      {pack === "promesas-29n" ? (
        <>
          <JsonLd data={{ "@context": "https://schema.org", "@type": "ItemList", name: t.h1, itemListElement: guides.map((g, i) => ({ "@type": "ListItem", position: i + 1, name: g.h1, url: absoluteUrl(g.path) })) }} />
          <JsonLd data={{ "@context": "https://schema.org", "@type": "FAQPage", mainEntity: [
            { "@type": "Question", name: "¿Qué se vota el 29 de noviembre de 2026?", acceptedAnswer: { "@type": "Answer", text: "Elecciones generales al Congreso (350 diputados) y al Senado, convocadas por el Real Decreto 806/2026. No hay elecciones autonómicas ese día." } },
            { "@type": "Question", name: "¿Están publicados los programas electorales?", acceptedAnswer: { "@type": "Answer", text: `A ${fechaLarga(PROMESAS_29N_UPDATED)}, no. Recogemos los anuncios y las declaraciones de mítines con fuente y fecha y marcamos lo demás como pendiente de programa.` } },
            { "@type": "Question", name: "¿Recomendáis algún voto?", acceptedAnswer: { "@type": "Answer", text: "No. Mismo formato para todos los partidos y sin valoraciones." } },
            { "@type": "Question", name: "¿Cómo afectan las promesas en mi comunidad?", acceptedAnswer: { "@type": "Answer", text: "Cada una de las 19 páginas de comunidad o ciudad autónoma tiene una tabla por partido que indica qué medidas se aplicarían igual, cuáles necesitarían también al gobierno autonómico y cuáles solo en parte o no tal cual (por ejemplo, rebajas de IVA en Canarias, Ceuta y Melilla o de IRPF estatal en País Vasco y Navarra)." } },
            { "@type": "Question", name: "¿Puedo descargar los datos?", acceptedAnswer: { "@type": "Answer", text: "Sí, en CSV y JSON en /datos/promesas-29n.csv y /datos/promesas-29n.json, con cita, enlace y fecha de cada medida. Reutilízalos citando a RutaTrámite y la fuente original." } },
          ] }} />
          <PromesasDataBar />
          <PromesasMatrix />
          <section id="preguntas" className="mt-8 space-y-3" data-promesas-faq="">
            <h2 className="font-display text-2xl text-mossDark">Preguntas frecuentes</h2>
            <p><strong>¿Están publicados los programas electorales?</strong> A {fechaLarga(PROMESAS_29N_UPDATED)}, no. Recogemos los anuncios con fuente y fecha y marcamos lo demás como pendiente de programa.</p>
            <p><strong>¿Cómo afectan las promesas en mi comunidad?</strong> Cada página de comunidad tiene una tabla por partido: qué medidas se aplicarían igual, cuáles necesitarían también al gobierno autonómico y cuáles solo en parte o no tal cual.</p>
            <p><strong>¿Recomendáis algún voto?</strong> No. Mismo formato para todos los partidos y sin valoraciones.</p>
            <p><strong>¿Puedo descargar los datos?</strong> Sí: <a className="underline" href="/datos/promesas-29n.csv">CSV</a> y <a className="underline" href="/datos/promesas-29n.json">JSON</a>, con cita, enlace y fecha de cada medida.</p>
          </section>
          <p className="mt-4 text-sm" data-neutrality-note="">{PROMESAS_29N_NOTE} Actualizado el <time dateTime={PROMESAS_29N_UPDATED}>{PROMESAS_29N_UPDATED}</time>. <a className="underline" href="/elecciones/promesas/metodologia">Metodología</a></p>
        </>
      ) : null}
      {pack === "elecciones" ? (
        <section aria-labelledby="promesas-29n-title" className="mt-8" data-elecciones-promesas="">
          <h2 id="promesas-29n-title" className="font-display text-2xl text-mossDark">Qué propone cada partido</h2>
          <p className="mt-2">Recogemos las medidas y declaraciones de PP, PSOE, Vox, Frente Amplio, Podemos y Democracia 21 con cita, fuente y fecha, en el mismo formato para todos y sin valoraciones.</p>
          <ul className="mt-2 list-disc space-y-1 pl-5">
            <li><a className="underline" href="/elecciones/promesas">Promesas del 29-N: qué propone cada partido, por comunidad y perfil</a></li>
            <li><a className="underline" href="/elecciones/promesas/que-propone-cada-partido-vivienda">Vivienda: qué propone cada partido</a></li>
            <li><a className="underline" href="/elecciones/promesas/partido-frente-amplio">Frente Amplio: sus propuestas para el 29-N</a></li>
            <li><a className="underline" href="/ayudas-por-gobierno">Ayudas del Estado según cada gobierno desde 1996 (informativo, no partidista)</a></li>
          </ul>
        </section>
      ) : null}
      {pack === "becas" ? (
        <p className="mt-4 text-sm">
          <a className="underline" href="https://www.boe.es/diario_boe/txt.php?id=BOE-B-2026-9261">BOE: beca general desde el 7 de abril de 2026</a>
          {" · "}
          <a className="underline" href="https://www.boe.es/diario_boe/txt.php?id=BOE-B-2026-16327">BOE: prórroga hasta el 19 de mayo de 2026 a las 15:00</a>
          {" · "}
          <a className="underline" href="https://www.boe.es/diario_boe/txt.php?id=BOE-B-2026-24454">BOE: 2.111 becas de colaboración de 2.000 €</a>
        </p>
      ) : null}
      {pack === "becas" ? (
        <>
          <JsonLd data={{ "@context": "https://schema.org", "@type": "FAQPage", mainEntity: [
            { "@type": "Question", name: "¿Cómo consulto el estado de mi beca MEC 2026-27?", acceptedAnswer: { "@type": "Answer", text: "En la sede electrónica del Ministerio de Educación, en «Mis expedientes» y «Mis notificaciones», con el DNI o NIE y la clave con la que hiciste la solicitud. Cuando hay una notificación nueva, el Ministerio avisa por correo electrónico." } },
            { "@type": "Question", name: "¿Cuándo sale la resolución de la beca MEC 2026-27?", acceptedAnswer: { "@type": "Answer", text: "No hay una fecha única. Según el Ministerio, en los meses siguientes al fin del plazo de solicitud (que fue el 19 de mayo de 2026) notifica primero si cumples los requisitos económicos; después, la concesión de la matrícula, las cuantías fijas y la cuantía variable mínima de 60 € cuando la convocatoria la prevé; más adelante, la cuantía variable, que puede llegar en dos partes." } },
            { "@type": "Question", name: "¿Ha salido la resolución definitiva de la beca MEC 2026-27?", acceptedAnswer: { "@type": "Answer", text: "A 24 de octubre de 2026, la página de novedades del Ministerio no la anuncia. La resolución definitiva se publica en la web del Ministerio con la lista de todas las personas beneficiarias, después de las notificaciones individuales. Si tu solicitud no aparece en esa lista, no está concedida." } },
            { "@type": "Question", name: "¿Puedo pedir la beca MEC si mi familia vive en Cataluña?", acceptedAnswer: { "@type": "Answer", text: "Desde el curso 2026-27, no: la competencia pasó a la Generalitat y debes pedir la beca de la convocatoria catalana. Cuenta el domicilio familiar, no dónde estudias." } }
          ] }} />
          <section id="preguntas" className="mt-8 space-y-3" data-becas-faq="">
            <h2 className="font-display text-2xl text-mossDark">Preguntas frecuentes sobre la beca MEC 2026-27</h2>
            <p><strong>¿Cómo consulto el estado de mi beca MEC 2026-27?</strong> En la sede electrónica del Ministerio de Educación, en «Mis expedientes» y «Mis notificaciones», con el DNI o NIE y la clave con la que hiciste la solicitud. Cuando hay una notificación nueva, el Ministerio avisa por correo electrónico.</p>
            <p><strong>¿Cuándo sale la resolución de la beca MEC 2026-27?</strong> No hay una fecha única. Según el Ministerio, en los meses siguientes al fin del plazo de solicitud (que fue el 19 de mayo de 2026) notifica primero si cumples los requisitos económicos; después, la concesión de la matrícula, las cuantías fijas y la cuantía variable mínima de 60 € cuando la convocatoria la prevé; más adelante, la cuantía variable, que puede llegar en dos partes.</p>
            <p><strong>¿Ha salido la resolución definitiva de la beca MEC 2026-27?</strong> A 24 de octubre de 2026, la página de novedades del Ministerio no la anuncia. La resolución definitiva se publica en la web del Ministerio con la lista de todas las personas beneficiarias, después de las notificaciones individuales. Si tu solicitud no aparece en esa lista, no está concedida.</p>
            <p><strong>¿Puedo pedir la beca MEC si mi familia vive en Cataluña?</strong> Desde el curso 2026-27, no: la competencia pasó a la Generalitat y debes pedir la beca de la convocatoria catalana. Cuenta el domicilio familiar, no dónde estudias.</p>
            <p className="text-sm">Fuentes: <a className="underline" href="https://www.becaseducacion.gob.es/dudas/faqs.html">Ministerio de Educación: preguntas frecuentes (cómo y cuándo se resuelve)</a> · <a className="underline" href="https://www.becaseducacion.gob.es/novedades.html">Ministerio de Educación: novedades (consultado el 24-10-2026)</a> · <a className="underline" href="/becas/mec/estado">Guía: consultar el estado y las notificaciones</a></p>
            <p className="text-sm" data-becas-reviewed="">Por Equipo RutaTrámite · Revisado el <time dateTime="2026-10-24">24 de octubre de 2026</time>.</p>
          </section>
          <JsonLd data={articleJsonLd({ headline: "Beca MEC 2026-27: cómo consultar el estado y cuándo sale la resolución", description: "Consulta del estado de la beca MEC 2026-27 en la sede del Ministerio de Educación y situación de la resolución definitiva a 24 de octubre de 2026.", path: "/becas", dateModified: "2026-10-24", sources: ["https://www.becaseducacion.gob.es/dudas/faqs.html", "https://www.becaseducacion.gob.es/novedades.html", "https://www.boe.es/diario_boe/txt.php?id=BOE-B-2026-9261"] })} />
        </>
      ) : null}
      {(pack === "becas" || pack === "alquiler") && <><p className="mt-4"><a className="inline-flex min-h-11 items-center underline" href="/ayudas">Ver el calendario conjunto de becas y alquiler</a></p><AidCalendar category={pack} /></>}
      <DirectorySearch label="Buscar en esta categoría" placeholder="Escribe el trámite o documento" hint={`Busca entre las ${guides.length} guías de esta categoría.`} entries={guides.map((g) => ({ title: g.h1, href: g.path, category: t.h1 }))} />
      <div className="topic-directory" data-pack-grid="">
        {guides.map((g) => (
          <PackCard key={g.path} href={g.path} title={g.h1} blurb={g.lead} headingLevel="h2" />
        ))}
      </div>
      {pack === "viaje" ? (
        <p className="mt-8 text-sm">
          También:{" "}
          <a className="underline decoration-sand underline-offset-2" href="/dni/cambio-domicilio">
            cambio de domicilio en el DNI
          </a>
          {" · "}
          <a className="underline decoration-sand underline-offset-2" href={passport ? "/dni" : "/pasaporte"}>
            {passport ? "DNI y pasaporte" : "pasaporte"}
          </a>
          .
        </p>
      ) : null}
      {pack === "becas" ? (
        <p className="mt-8 text-sm">
          Las guías pueden describir convocatorias cerradas. Revisa el año académico y los avisos del organismo antes de presentar una solicitud.
        </p>
      ) : null}
      <footer className="mt-12 border-t border-sand pt-6">
        <Disclaimer text={DISCLAIMER_GENERICO} />
      </footer>
    </PageShell>
  );
}
