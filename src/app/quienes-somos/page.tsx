import { PageShell } from "@/components/ui/PageShell";
import { pageMetadata } from "@/lib/seo/meta";
import { CONTACT_EMAIL, PRODUCT_NAME, SITE_ORIGIN } from "@/lib/types";
import type { Metadata } from "next";

export const metadata: Metadata = pageMetadata({
  title: "Quiénes somos: Equipo RutaTrámite",
  description:
    "RutaTrámite es un proyecto informativo independiente y gratuito sobre trámites en España. Conoce a nuestro equipo, método editorial, fuentes oficiales y compromiso ético.",
  path: "/quienes-somos",
});

export default function QuienesSomosPage() {
  return (
    <PageShell as="article" className="space-y-6">
      <header className="space-y-2 border-b border-sand pb-4">
        <h1 className="font-display text-4xl text-ink">Quiénes somos: Equipo RutaTrámite</h1>
        <p className="text-lg text-ink/80 leading-relaxed">
          {PRODUCT_NAME} es una guía ciudadana independiente y gratuita diseñada para simplificar el acceso a los
          trámites administrativos en España, explicando con claridad normativa lo que la burocracia oficial a menudo
          hace confuso o inaccesible.
        </p>
      </header>

      <section className="space-y-3">
        <h2 className="text-2xl font-semibold text-mossDark">1. Misión y propósito fundacional</h2>
        <p className="leading-relaxed">
          El acceso a los servicios públicos básicos en España —como empadronarse, renovar el DNI o solicitar una
          beca escolar— es un derecho legal y, en su gran mayoría, un servicio completamente gratuito prestado por las
          administraciones públicas. Sin embargo, en los últimos años han proliferado dos barreras críticas para el
          ciudadano: la excesiva complejidad del lenguaje administrativo y la aparición de intermediarios que cobran por
          trámites o citas que por ley son gratuitas.
        </p>
        <p className="leading-relaxed">
          {PRODUCT_NAME} nació con el compromiso cívico de ofrecer una referencia rigurosa, neutral y verificable que
          permita a cualquier persona conocer sus derechos, preparar la documentación exacta que exige su ayuntamiento
          o delegación y tramitar directamente en la sede oficial competente, sin intermediarios de pago ni costes ocultos.
        </p>
      </section>

      <section className="space-y-3">
        <h2 className="text-2xl font-semibold text-mossDark">2. Independencia y naturaleza jurídica</h2>
        <p className="leading-relaxed">
          Declaramos de forma expresa y transparente nuestra naturaleza:
        </p>
        <ul className="list-disc space-y-2 pl-6">
          <li>
            <strong>No somos una Administración Pública:</strong> no formamos parte de ningún ministerio, comunidad
            autónoma, diputación ni ayuntamiento.
          </li>
          <li>
            <strong>No somos una gestoría ni un despacho de abogados:</strong> no ofrecemos asesoramiento jurídico
            individual ni representamos a terceros en expedientes administrativos.
          </li>
          <li>
            <strong>Sin relación partidista:</strong> no tenemos ninguna vinculación política, patronal ni sindical. En
            materias electorales nos limitamos estrictamente a transcribir los plazos de la LOREG y los programas oficiales.
          </li>
          <li>
            <strong>El trámite se hace en la sede oficial:</strong> en todas nuestras guías facilitamos el enlace directo a
            la sede electrónica oficial o al organismo responsable, donde el ciudadano debe presentar su solicitud.
          </li>
        </ul>
      </section>

      <section className="space-y-3">
        <h2 className="text-2xl font-semibold text-mossDark">3. Quiénes formamos el equipo editorial</h2>
        <p className="leading-relaxed">
          Las guías de {PRODUCT_NAME} son elaboradas y mantenidas por el <strong>Equipo RutaTrámite</strong>, un grupo
          interdisciplinar que combina perfiles técnicos y de investigación documental:
        </p>
        <div className="grid gap-4 sm:grid-cols-2 pt-2">
          <div className="rounded-lg border border-sand bg-warmWhite/50 p-4">
            <h3 className="font-semibold text-ink">Investigación normativa y administrativa</h3>
            <p className="mt-1 text-sm text-ink/80 leading-relaxed">
              Especialistas dedicados a la lectura y análisis directo del Boletín Oficial del Estado (BOE), boletines
              autonómicos y resoluciones del Instituto Nacional de Estadística (INE) para asegurar que cada requisito
              citado corresponda con la legislación vigente.
            </p>
          </div>
          <div className="rounded-lg border border-sand bg-warmWhite/50 p-4">
            <h3 className="font-semibold text-ink">Verificación de sedes y canales locales</h3>
            <p className="mt-1 text-sm text-ink/80 leading-relaxed">
              Equipo de contraste que revisa periódicamente las sedes electrónicas de más de 8.000 municipios de España,
              comprobando enlaces de cita previa, modelos de solicitud oficiales y exigencias documentales específicas.
            </p>
          </div>
        </div>
      </section>

      <section className="space-y-3">
        <h2 className="text-2xl font-semibold text-mossDark">4. Método editorial en cuatro fases</h2>
        <p className="leading-relaxed">
          Para garantizar la máxima fiabilidad de la información, seguimos un riguroso ciclo de trabajo:
        </p>
        <ol className="list-decimal space-y-2 pl-6">
          <li>
            <strong>Contraste en fuente primaria:</strong> antes de publicar cualquier dato de plazos, importes o
            requisitos, consultamos la norma legal original en el BOE o el boletín autonómico correspondiente.
          </li>
          <li>
            <strong>Redacción en lenguaje claro:</strong> transformamos la terminología jurídica compleja en explicaciones
            estructuradas paso a paso, acompañadas de listas de comprobación y modelos de escritos adaptables.
          </li>
          <li>
            <strong>Verificación técnica de enlaces:</strong> auditamos de manera automatizada y continua que todos los
            enlaces a sedes oficiales respondan correctamente y no conduzcan a páginas caídas o desactualizadas.
          </li>
          <li>
            <strong>Registro público de fechas:</strong> cada guía indica de forma visible su fecha de comprobación o
            revisión normativa, permitiendo al usuario conocer la vigencia del contenido.
          </li>
        </ol>
      </section>

      <section className="space-y-3">
        <h2 className="text-2xl font-semibold text-mossDark">5. Modelo de sostenimiento y transparencia</h2>
        <p className="leading-relaxed">
          {PRODUCT_NAME} es un recurso de libre acceso. Para mantener los servidores, las tareas de verificación continua
          y la infraestructura técnica sin cobrar al usuario, nos financiamos mediante publicidad contextual
          gestionada a través de la plataforma <strong>Google AdSense</strong>.
        </p>
        <p className="leading-relaxed">
          Nuestra política sobre publicidad es clara:
        </p>
        <ul className="list-disc space-y-2 pl-6">
          <li>No cobramos a los ciudadanos por acceder a las guías, asistentes ni modelos descargables.</li>
          <li>No vendemos citas, enlaces preferentes ni espacios patrocinados que alteren la objetividad de la información.</li>
          <li>Los anuncios se sirven de forma diferenciada respecto al contenido editorial y respetan rigurosamente el marco europeo de privacidad (RGPD) mediante nuestra plataforma de gestión de consentimiento.</li>
        </ul>
      </section>

      <section className="space-y-3">
        <h2 className="text-2xl font-semibold text-mossDark">6. Compromiso de corrección y fe de errores</h2>
        <p className="leading-relaxed">
          La normativa municipal y autonómica evoluciona constantemente. Si detectas cualquier discrepancia entre lo
          indicado en una de nuestras guías y la sede electrónica oficial de tu municipio, ponemos a tu disposición un
          canal directo de revisión.
        </p>
        <p className="leading-relaxed">
          Escríbenos a <a className="underline font-medium text-mossDark" href={`mailto:${CONTACT_EMAIL}`}>{CONTACT_EMAIL}</a> indicando
          la URL de la página y la referencia oficial. Nuestro equipo contrasta la observación en un plazo habitual de
          24 a 48 horas laborables y actualiza la guía con su correspondiente fe de errores. Más detalles en nuestra
          sección de <a className="underline" href="/contacto">Contacto</a> y en <a className="underline" href="/metodologia">Cómo verificamos</a>.
        </p>
      </section>
    </PageShell>
  );
}
