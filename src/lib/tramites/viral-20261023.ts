import type { Guide } from "@/lib/tramites/types";

const BOE_SMI = { href: "https://www.boe.es/buscar/doc.php?id=BOE-A-2026-3815", label: "BOE: Real Decreto 126/2026, salario mínimo interprofesional para 2026" };
const AEAT_DED = { href: "https://www2.agenciatributaria.gob.es/ES13/S/IAFRIAFRC12F?CODIGO=0148565&TIPO=R", label: "Agencia Tributaria: deducción por obtención de rendimientos del trabajo desde 2026" };
const HAC_NP = { href: "https://www.hacienda.gob.es/es-ES/Prensa/Noticias/Paginas/2026/20260217-NP-CM-SMI-DEDUCCION-2026.aspx", label: "Ministerio de Hacienda, 17-02-2026: deducción para que el SMI no pague IRPF" };
const ELPAIS = { href: "https://elpais.com/economia/2026-10-23/las-palabras-de-feijoo-sobre-el-salario-minimo-agitan-la-campana-electoral.html", label: "El País, 23-10-2026: Feijóo, el salario mínimo y el IRPF" };
const SER = { href: "https://cadenaser.com/nacional/2026/10/23/feijoo-no-descarta-gobernar-con-vox-si-los-espanoles-me-mandan-dar-estabilidad-con-la-tercera-fuerza-politica-asi-lo-hare-cadena-ser/", label: "Cadena SER, 23-10-2026: entrevista a Feijóo en Hoy por Hoy" };
const SER_COM = { href: "https://www.sercomunicacion.com/aimar-bretos-entrevista-a-alberto-nunez-feijoo-en-hoy-por-hoy/", label: "SER Comunicación, 23-10-2026: resumen oficial de la entrevista" };
const SER_VIDEO = { href: "https://cadenaser.com/video/nacional/2026/10/23/las-claves-de-la-entrevista-a-feijoo-en-hoy-por-hoy-cadena-ser/", label: "Cadena SER: vídeo con las claves de la entrevista" };
const LNE = { href: "https://www.lne.es/videos/nacional/2026/10/23/feijoo-metera-igualdad-otros-ministerios-135678789.html", label: "La Nueva España (Europa Press), 23-10-2026: Igualdad en otros ministerios" };

const SMI_PATH = "/trabajo/salario-minimo-irpf-2026";
const FEI_PATH = "/elecciones/feijoo-cadena-ser-29n";

export const VIRAL_20261023_GUIDES: Guide[] = [
  {
    id: "trabajo-smi-irpf-2026",
    pack: "trabajo",
    reviewedAt: "2026-10-23",
    disclaimer: "",
    path: SMI_PATH,
    h1: "¿Paga IRPF el salario mínimo en 2026? Lo que dice la ley",
    title: "¿Tributa el salario mínimo (SMI) en el IRPF en 2026?",
    description: "Quien cobra el SMI de 2026 (17.094 € al año) no paga IRPF gracias a una deducción de 590,89 €. Cómo funciona, por qué hay retenciones en la nómina y hasta qué sueldo llega.",
    lead: "Respuesta corta: en 2026 el salario mínimo es de 1.221 € al mes en 14 pagas, 17.094 € al año (Real Decreto 126/2026). Técnicamente no es una renta exenta, pero quien solo cobra el SMI acaba pagando 0 € de IRPF: la ley le da una deducción de 590,89 € en la declaración de la renta que anula la cuota. Durante el año puede haber retenciones en la nómina, que Hacienda devuelve al hacer la declaración. La deducción baja poco a poco y desaparece a partir de 20.048,45 € al año.",
    cta: AEAT_DED,
    secondaryCta: BOE_SMI,
    sources: [BOE_SMI, AEAT_DED, HAC_NP, ELPAIS],
    related: [
      { href: FEI_PATH, label: "Qué dijo Feijóo en la SER sobre el SMI, Igualdad y Vox" },
      { href: "/elecciones/salario-minimo-1800-euros", label: "Salario mínimo de 1.800 €: la propuesta" },
      { href: "/elecciones/deflactar-irpf-que-significa", label: "Deflactar el IRPF: qué significa" },
      { href: "/elecciones/promesas/que-propone-cada-partido-empleo-y-salarios", label: "Empleo y salarios: qué propone cada partido" },
      { href: "/trabajo/huelga-general-11-noviembre", label: "Huelga general del 11-N" },
    ],
    faqs: [
      { q: "¿Cuánto es el salario mínimo en 2026?", a: "1.221 € brutos al mes en 14 pagas (40,70 € al día), es decir, 17.094 € al año. Lo fija el Real Decreto 126/2026, con efectos desde el 1 de enero de 2026." },
      { q: "¿Está exento de IRPF el salario mínimo?", a: "No es una renta exenta en sentido legal, pero no tributa en la práctica: quien gana hasta 17.094 € al año aplica una deducción de 590,89 € que deja la cuota del IRPF a cero, según la Agencia Tributaria." },
      { q: "¿Por qué me retienen IRPF en la nómina si cobro el SMI?", a: "La empresa puede practicar retenciones durante el año. La deducción se aplica al hacer la declaración de la renta del año siguiente, y entonces Hacienda devuelve lo retenido si cumples los requisitos." },
      { q: "¿Hasta qué sueldo se aplica la deducción?", a: "Hasta 20.048,45 € brutos al año de rendimientos del trabajo. Entre 17.094 € y ese límite, la deducción es 590,89 € menos el 20 % de lo que superes 17.094 €. Además, no puedes tener otras rentas no exentas de más de 6.500 €." },
      { q: "¿Y las cotizaciones a la Seguridad Social?", a: "La deducción solo afecta al IRPF. Las cotizaciones a la Seguridad Social se pagan igual sobre el salario mínimo, tanto la parte del trabajador como la de la empresa." },
    ],
    sections: [
      {
        id: "cuanto",
        title: "Cuánto es el SMI en 2026",
        paragraphs: ["El Real Decreto 126/2026, de 18 de febrero, fija el salario mínimo en 40,70 € al día o 1.221 € al mes, con efectos desde el 1 de enero de 2026. Es un 3,1 % más que en 2025. En cómputo anual, con 14 pagas, son 17.094 €."],
      },
      {
        id: "deduccion",
        title: "Cómo funciona la deducción que deja el IRPF a cero",
        paragraphs: [
          "La Ley del IRPF (disposición adicional sexagésima primera) da una deducción por obtención de rendimientos del trabajo. La Agencia Tributaria la resume así:",
          "La deducción se resta en la declaración de la renta y no puede superar la parte de la cuota estatal y autonómica que corresponde a los rendimientos del trabajo.",
        ],
        table: {
          caption: "Deducción por rendimientos del trabajo en 2026",
          head: ["Sueldo bruto anual", "Deducción", "Fuente"],
          rows: [
            { cells: ["Hasta 17.094 €", "590,89 €"], source: AEAT_DED },
            { cells: ["De 17.094 € a 20.048,45 €", "590,89 € − 0,2 × (sueldo − 17.094 €)"], source: AEAT_DED },
            { cells: ["Más de 20.048,45 €", "Sin deducción"], source: AEAT_DED },
          ],
        },
      },
      {
        id: "ejemplos",
        title: "Ejemplos",
        lists: [[
          "Cobras 17.094 € al año: deducción de 590,89 €. IRPF final: 0 €.",
          "Cobras 18.000 € al año: deducción de 590,89 − 0,2 × 906 = 409,69 €.",
          "Cobras 20.048,45 € o más: no hay deducción.",
        ]],
        paragraphs: ["Cálculo propio con la fórmula publicada por la Agencia Tributaria. El resultado final depende de tu situación personal (hijos, discapacidad, otras rentas)."],
      },
      {
        id: "debate",
        title: "Por qué se habla de esto hoy",
        paragraphs: [
          "El 23 de octubre de 2026, en la Cadena SER, Alberto Núñez Feijóo (PP) dijo que el Gobierno «ha hecho un buen negocio subiendo el salario mínimo» por los impuestos y cotizaciones. Cuando el entrevistador le dijo que el SMI está exento de IRPF, respondió: «No, eso estaba exento antes». (Fuente: El País)",
          "Según El País, quien cobra el SMI no aporta IRPF gracias a la deducción descrita arriba, aunque legalmente no sea una renta exenta. Después de la entrevista, Feijóo escribió que con un gobierno del PP «todo incremento de SMI quedará exento de IRPF siempre, por ley y automáticamente». El PSOE y la ministra de Trabajo respondieron que el SMI no paga IRPF. (Fuente: El País)",
          "El Ministerio de Hacienda calcula que un salario de 17.000 € paga 0 € de IRPF en 2026, frente a 356 € en 2025. La comparación con los 1.800 € de 2012-2018 que usa el Ministerio se refiere a un sueldo de 17.000 €, que entonces estaba por encima del SMI (10.303 € en 2018). (Fuente: Hacienda)",
        ],
      },
    ],
  },
  {
    id: "29n-feijoo-cadena-ser",
    pack: "elecciones",
    reviewedAt: "2026-10-23",
    disclaimer: "",
    path: FEI_PATH,
    h1: "Qué dijo Feijóo en la Cadena SER: SMI, Igualdad, Vox, aborto y vivienda",
    title: "Feijóo en la SER (Hoy por Hoy): qué dijo, por temas",
    description: "Lo que dijo Alberto Núñez Feijóo en Hoy por Hoy (Cadena SER) el 23 de octubre: salario mínimo e IRPF, Ministerio de Igualdad, Vox, pensiones, aborto, eutanasia y vivienda. Citas con fuente.",
    lead: "Respuesta corta: Alberto Núñez Feijóo, candidato del PP al 29-N, fue entrevistado por Aimar Bretos en Hoy por Hoy (Cadena SER) el viernes 23 de octubre de 2026. Habló del salario mínimo y el IRPF, de no mantener el Ministerio de Igualdad como ministerio propio, de un posible acuerdo con Vox, de pensiones, aborto, eutanasia y vivienda. Abajo están sus frases tal y como las publicaron la Cadena SER, El País y Europa Press, y lo que se puede comprobar con datos oficiales.",
    cta: SER_VIDEO,
    secondaryCta: SER,
    sources: [SER, SER_COM, SER_VIDEO, ELPAIS, LNE, AEAT_DED],
    related: [
      { href: SMI_PATH, label: "¿Paga IRPF el salario mínimo en 2026?" },
      { href: "/elecciones/sanchez-la-revuelta-29n", label: "Qué dijo Sánchez en La Revuelta" },
      { href: "/elecciones/podcasts-entrevistas-candidatos-29n", label: "Entrevistas y pódcast de los candidatos" },
      { href: "/elecciones/agenda-mitines-29n", label: "Agenda de mítines del 29-N" },
      { href: "/elecciones/quiere-algun-partido-quitar-las-pensiones", label: "¿Quiere algún partido quitar las pensiones?" },
      { href: "/elecciones", label: "Elecciones generales del 29-N" },
    ],
    faqs: [
      { q: "¿Cuándo fue la entrevista de Feijóo en la SER?", a: "El viernes 23 de octubre de 2026 por la mañana, en Hoy por Hoy, con Aimar Bretos. La Cadena SER publicó un vídeo con las claves, enlazado en esta página." },
      { q: "¿Qué dijo Feijóo sobre el Ministerio de Igualdad?", a: "Que no lo mantendrá como ministerio independiente: «Yo no voy a mantener 22 ministerios». Según Europa Press, precisó que no elimina las políticas de igualdad y que el ministro que lleve Igualdad «se encargará de otras cosas»." },
      { q: "¿Paga IRPF el salario mínimo?", a: "En 2026 quien cobra el SMI (17.094 € al año) aplica una deducción de 590,89 € que deja su IRPF a cero. Legalmente no es renta exenta, pero en la práctica no tributa. Lo explicamos en nuestra guía del SMI y el IRPF." },
      { q: "¿Descartó gobernar con Vox?", a: "No. Dijo: «No puedo descartar hacer caso a lo que me manden los españoles. Si me mandan dar estabilidad con la tercera fuerza política de este país, así lo haré», según la Cadena SER." },
    ],
    sections: [
      {
        id: "smi",
        title: "Salario mínimo e IRPF",
        paragraphs: [
          "«El Gobierno ha hecho un buen negocio subiendo el salario mínimo. Quien más dinero de los trabajadores se ha llevado ha sido el Gobierno». Ante la réplica de que el SMI está exento de IRPF: «No, eso estaba exento antes». (Fuente: El País)",
          "«No voy a caer en la trampa de que el PP esté en contra de subir el salario mínimo». Dijo que negociará su cuantía con sindicatos y empresarios. (Fuente: Cadena SER) Según SER Comunicación, añadió que «para que suba el salario medio tiene que subir el salario mínimo» y que alrededor del 30 % de la subida vuelve a la Administración por impuestos y cotizaciones.",
          "Tras la entrevista, escribió que con el PP «todo incremento de SMI quedará exento de IRPF siempre». (Fuente: El País)",
        ],
      },
      {
        id: "igualdad",
        title: "Ministerio de Igualdad",
        paragraphs: [
          "«Yo no voy a mantener 22 ministerios». Su propuesta es integrar Igualdad en un ministerio con otras competencias. Preguntado si es feminista: «¿Cómo no ser feminista?». (Fuente: SER Comunicación)",
          "«No, no lo elimino, el ministro o ministra que lleve Igualdad que se encargue de otras cosas, no solamente de Igualdad». (Fuente: Europa Press, vía La Nueva España)",
        ],
      },
      {
        id: "vox",
        title: "Pactos con Vox y Senado",
        paragraphs: [
          "«No puedo descartar hacer caso a lo que me manden los españoles. Si me mandan dar estabilidad con la tercera fuerza política de este país, así lo haré». Y: «No me presento en coalición con Vox. Me presento como PP y Vox se presenta como Vox». (Fuente: Cadena SER)",
          "Sobre el Senado, confirmó conversaciones sin acuerdo cerrado: «Dependerá de Vox si quiere no presentarse en provincias donde no tiene senador». (Fuente: Cadena SER)",
        ],
      },
      {
        id: "pensiones",
        title: "Pensiones",
        paragraphs: ["Se comprometió a mantener la revalorización anual según el IPC y a reactivar el Pacto de Toledo: «Para mí las pensiones no se pueden tocar». (Fuente: Cadena SER)"],
      },
      {
        id: "aborto-eutanasia",
        title: "Aborto y eutanasia",
        paragraphs: [
          "Reiteró que las menores de 16 años deberían contar con el conocimiento de sus padres para abortar y planteó abrir un debate sobre los casos de discrepancia familiar. (Fuente: Cadena SER)",
          "Sobre la eutanasia, no se comprometió a derogar la ley pero dijo que el PP la reformará para reforzar garantías médicas: «La muerte digna es un concepto con el que estoy de acuerdo». (Fuente: Cadena SER)",
        ],
      },
      {
        id: "vivienda",
        title: "Vivienda, Memoria Democrática y Milei",
        paragraphs: [
          "Se comprometió a impulsar un millón de viviendas, poner suelo público para viviendas «un 30 % más baratas que el mercado», reducir un 60 % algunos impuestos ligados a la compra y ampliar los avales para jóvenes. (Fuente: Cadena SER)",
          "Renovó su compromiso de derogar la Ley de Memoria Democrática. Sobre Javier Milei: «No comparto el lenguaje que utiliza el señor Milei». (Fuente: Cadena SER)",
        ],
      },
      {
        id: "comprobacion",
        title: "Comprobación con datos oficiales",
        paragraphs: ["Solo comprobamos afirmaciones que se pueden contrastar con una fuente oficial española."],
        table: {
          caption: "Afirmaciones de Feijóo en la SER y su comprobación",
          head: ["Afirmación", "Qué dicen los datos", "Fuente"],
          rows: [
            { cells: ["El SMI «estaba exento antes» (ya no lo está)", "Legalmente el SMI nunca ha sido renta exenta, pero en 2026 quien lo cobra (17.094 €) aplica una deducción de 590,89 € y paga 0 € de IRPF. En la práctica, no tributa."], source: AEAT_DED },
            { cells: ["Un 30 % de la subida del SMI vuelve a la Administración", "No lo hemos podido comprobar con una fuente oficial: depende de cómo se calcule (cotizaciones de empresa y trabajador). Las cotizaciones sí se pagan sobre el SMI; el IRPF, no."], source: AEAT_DED },
          ],
        },
      },
      {
        id: "metodo",
        title: "Cómo hemos hecho este artículo",
        paragraphs: ["Las frases entre comillas están tal y como las publicaron la Cadena SER, SER Comunicación, El País y Europa Press. Hemos usado X solo para localizar los temas más comentados, nunca como fuente. Última actualización: 23 de octubre de 2026, 17:45 (hora peninsular)."],
      },
    ],
  },
];
