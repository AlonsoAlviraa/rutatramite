import { JsonLd } from "@/components/empadronamiento/JsonLd";
import { WILD_FAQS, WILD_JORDI_44, WILD_JORDI_PLAN, WILD_TEXTO, WILD_TWEET, WILD_WIKI, WILD_YT } from "@/lib/tramites/wild-29n";

export function WildDestacado() {
  return (
    <section id="sanchez-the-wild-project" aria-labelledby="wild-title" className="mt-6 rounded-xl border-2 border-mossDark p-5 text-lg leading-relaxed" data-wild-destacado="">
      <JsonLd data={{ "@context": "https://schema.org", "@type": "FAQPage", mainEntity: WILD_FAQS.map((f) => ({ "@type": "Question", name: f.q, acceptedAnswer: { "@type": "Answer", text: f.a } })) }} />
      <p className="text-base">Actualizado el 23 de octubre de 2026, 20:45 (hora peninsular)</p>
      <h2 id="wild-title" className="mt-1 font-display text-3xl text-mossDark">Pedro Sánchez irá a The Wild Project</h2>
      <p className="mt-3">Pedro Sánchez va a ir al pódcast de Jordi Wild. Lo dijo él mismo en X (antes Twitter) el viernes 23 de octubre a las 20:23:</p>
      <blockquote className="mt-2 border-l-4 pl-4 italic">«{WILD_TEXTO}» <a className="not-italic underline" href={WILD_TWEET.href}>{WILD_TWEET.label}</a></blockquote>
      <p className="mt-3">Jordi Wild contestó a las 20:39: «Pues ya estaría: 4/4» (<a className="underline" href={WILD_JORDI_44.href}>ver en X</a>).</p>

      <h3 className="mt-5 font-display text-2xl">¿Cuándo sale la entrevista de Pedro Sánchez con Jordi Wild?</h3>
      <p className="mt-1"><strong>Fecha sin confirmar para Sánchez.</strong> Jordi Wild anunció el 22 de octubre que publicará todas las charlas con los candidatos el 13 de noviembre, primer día de campaña. Saldrán una cada hora, de menos a más escaños (<a className="underline" href={WILD_JORDI_PLAN.href}>ver en X</a>). No hay hora concreta.</p>

      <h3 className="mt-5 font-display text-2xl">¿Qué es un pódcast?</h3>
      <p className="mt-1">Es un programa de conversación, como uno de radio. Se ve o se escucha por internet, cuando usted quiera.</p>
      <p className="mt-2">Cómo verlo en YouTube:</p>
      <ol className="mt-1 list-decimal space-y-1 pl-6">
        <li>Abra la aplicación YouTube en el móvil, o youtube.com en el ordenador.</li>
        <li>Escriba «The Wild Project» en el buscador (la lupa).</li>
        <li>Pulse en el canal y elija el vídeo que quiera ver.</li>
      </ol>
      <p className="mt-2">O entre directamente en el <a className="underline" href={WILD_YT.href}>canal oficial de The Wild Project en YouTube</a>.</p>
      <p className="mt-2">En Spotify: abra la aplicación, pulse «Buscar» y escriba «The Wild Project».</p>

      <h3 className="mt-5 font-display text-2xl">¿Qué es The Wild Project?</h3>
      <p className="mt-1">The Wild Project (a veces escrito «Wild Proyect») es el pódcast de Jordi Wild. Empezó en 2020. Son conversaciones largas con un invitado. Han ido deportistas, escritores, divulgadores, creadores de internet y también políticos. Hay también una tertulia sobre noticias de la semana. (<a className="underline" href={WILD_WIKI.href}>Wikipedia</a>)</p>

      <h3 className="mt-5 font-display text-2xl">¿Quién es Jordi Wild?</h3>
      <p className="mt-1">Se llama Jorge Carrillo de Albornoz Torres. Es un youtuber y podcaster español. También tiene el canal El Rincón de Giorgio, creado en 2013. (<a className="underline" href={WILD_WIKI.href}>Wikipedia</a>)</p>

      <h3 className="mt-5 font-display text-2xl">¿Por qué es importante?</h3>
      <p className="mt-1">Muchas personas, sobre todo jóvenes, ven estos programas por internet y poca televisión. Por eso los candidatos también van a pódcast y programas de entretenimiento.</p>
      <ul className="mt-2 list-disc space-y-1 pl-6">
        <li>Alberto Núñez Feijóo (PP), Santiago Abascal (Vox) y Ada Colau (Frente Amplio) también han aceptado ir a The Wild Project, según Jordi Wild (<a className="underline" href={WILD_JORDI_PLAN.href}>22 de octubre</a>).</li>
        <li>Pedro Sánchez fue a La Revuelta (La 1) el 22 de octubre.</li>
      </ul>
      <p className="mt-3">Todas las entrevistas de los candidatos, con su fuente: <a className="underline" href="/elecciones/podcasts-entrevistas-candidatos-29n">Pedro Sánchez, Jordi Wild y los demás candidatos en pódcast y TV</a>.</p>
    </section>
  );
}
