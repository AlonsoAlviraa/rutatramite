import type { Guide } from "@/lib/tramites/types";
import { vpRanked, VP_MEDIA } from "@/lib/datos/voto-provincia";

const RD806 = { href: "https://www.boe.es/diario_boe/txt.php?id=BOE-A-2026-20742", label: "BOE: Real Decreto 806/2026, convocatoria del 29-N (anexo con los diputados por circunscripción)" };
const RD1117 = { href: "https://www.boe.es/diario_boe/txt.php?id=BOE-A-2025-25362", label: "BOE: Real Decreto 1117/2025, cifras oficiales de población a 1-1-2025 (anexo provincial)" };
const LOREG = { href: "https://www.boe.es/buscar/act.php?id=BOE-A-1985-11672#a162", label: "BOE: LOREG, artículo 162 (reparto de diputados)" };
const CSV = "/datos/voto-por-provincia-29n.csv";
const fmt = (n: number) => n.toLocaleString("es-ES");
const R = vpRanked();

export const VOTO_PROVINCIA_GUIDES: Guide[] = [
  {
    id: "29n-voto-por-provincia",
    pack: "elecciones",
    reviewedAt: "2026-10-22",
    disclaimer: "",
    path: "/elecciones/cuanto-vale-tu-voto-por-provincia-29n",
    h1: "¿Cuánto vale tu voto en cada provincia el 29-N?",
    title: "Cuánto vale tu voto por provincia el 29-N: ranking con datos",
    description: "Habitantes por diputado en las 52 circunscripciones el 29-N: Soria 45.117 y Madrid 187.817. Datos del BOE y del INE, con CSV abierto.",
    lead: `Respuesta corta: el 29-N un diputado de Soria representa a 45.117 habitantes y uno de Madrid a 187.817, unas 4,2 veces más. La media española es de ${fmt(Math.round(VP_MEDIA))} habitantes por diputado. Lo hemos calculado con el reparto de diputados del Real Decreto de convocatoria y la población oficial del INE a 1 de enero de 2025, y hemos comprobado que la regla del artículo 162 de la ley electoral reproduce los 350 escaños del BOE.`,
    cta: RD806,
    secondaryCta: RD1117,
    sources: [RD806, RD1117, LOREG],
    related: [{ href: "/elecciones/mapa-voto-util-29n", label: "Mapa del voto útil por provincia: último escaño" }, { href: "/elecciones/voto-util-29n", label: "Voto útil: derecha, izquierda y peso de tu provincia" }, 
      { href: "/elecciones/diputados-por-provincia-29n", label: "Diputados por provincia el 29-N" },
      { href: "/elecciones/como-se-reparten-los-escanos", label: "Cómo se reparten los escaños" },
      { href: "/elecciones/barrera-del-3-por-ciento-y-voto-util", label: "Barrera del 3 % y voto útil" },
      { href: "/elecciones/estudio-error-cis-generales", label: "Estudio: el error del CIS" },
      { href: "/elecciones", label: "Elecciones generales del 29-N" },
    ],
    faqs: [
      { q: "¿En qué provincia vale más el voto?", a: "En Soria (45.117 habitantes por diputado) y Teruel (45.399). Les siguen Segovia, Palencia, Ávila y Zamora, todas por debajo de 56.000." },
      { q: "¿Y dónde vale menos?", a: "En Madrid (187.817 habitantes por diputado) y Barcelona (186.979), seguidas de Valencia, Alicante y Sevilla." },
      { q: "¿Por qué pasa esto?", a: "La ley electoral (artículo 162) da 2 diputados de partida a cada provincia y 1 a Ceuta y a Melilla. Solo los 248 restantes se reparten según la población, así que las provincias con menos habitantes tienen más diputados en proporción." },
      { q: "¿Es lo mismo habitantes que votantes?", a: "No. Usamos la población oficial porque es la que usa la ley para repartir los diputados. El censo electoral excluye a los menores y a la mayoría de los extranjeros, así que el número de electores por diputado es menor y cambia algo de una provincia a otra." },
      { q: "¿Puedo usar los datos?", a: `Sí. Descarga el CSV en ${CSV}. La licencia es CC BY 4.0: cita «RutaTrámite» y las dos fuentes del BOE.` },
    ],
    dataset: {
      "@context": "https://schema.org",
      "@type": "Dataset",
      name: "Habitantes por diputado en cada circunscripción, elecciones generales del 29 de noviembre de 2026",
      description: "52 filas: diputados por circunscripción (Real Decreto 806/2026), población oficial a 1-1-2025 (Real Decreto 1117/2025), habitantes por diputado y peso relativo frente a la media española (100).",
      url: "https://rutatramite.com/elecciones/cuanto-vale-tu-voto-por-provincia-29n",
      license: "https://creativecommons.org/licenses/by/4.0/",
      creator: { "@type": "Organization", name: "RutaTrámite", url: "https://rutatramite.com/" },
      dateModified: "2026-10-22",
      temporalCoverage: "2025-01-01/2026-11-29",
      spatialCoverage: "España",
      isBasedOn: [RD806.href, RD1117.href],
      variableMeasured: ["diputados", "población oficial", "habitantes por diputado", "peso relativo (media = 100)"],
      distribution: [{ "@type": "DataDownload", encodingFormat: "text/csv", contentUrl: "https://rutatramite.com" + CSV }],
    },
    sections: [
      {
        id: "cifras",
        title: "Los resultados en cuatro cifras",
        paragraphs: [],
        lists: [[
          `Media española: ${fmt(Math.round(VP_MEDIA))} habitantes por diputado.`,
          "Máximo peso: Soria, con 45.117 habitantes por diputado (3,1 veces la media).",
          "Mínimo peso: Madrid, con 187.817 (0,75 veces la media).",
          `${R.filter((r) => r.peso > 1).length} de las 52 circunscripciones están por debajo de la media de habitantes por diputado, es decir, su voto pesa más que la media.`,
        ]],
        chart: {
          caption: "Habitantes por diputado el 29-N (miles), de más peso a menos",
          kind: "bars",
          unit: "mil",
          rows: R.map((r) => ({ label: r.circ, value: Math.round(r.porDiputado / 100) / 10 })),
        },
      },
      {
        id: "tabla",
        title: "Ranking completo por circunscripción",
        paragraphs: ["Peso relativo: 100 es la media española. Un 200 significa que cada diputado representa a la mitad de habitantes que la media."],
        table: {
          caption: "Diputados, población y habitantes por diputado el 29-N",
          head: ["Circunscripción", "Diputados", "Población 1-1-2025", "Habitantes por diputado", "Peso (media 100)", "Fuente"],
          rows: R.map((r) => ({ cells: [r.circ, String(r.diputados), fmt(r.poblacion), fmt(r.porDiputado), String(Math.round(r.peso * 100))], source: RD806 })),
        },
      },
      {
        id: "metodologia",
        title: "Metodología y comprobación",
        paragraphs: [
          "Diputados: anexo del Real Decreto 806/2026 (BOE del 6-10-2026). Población: anexo provincial del Real Decreto 1117/2025, que declara oficiales las cifras del padrón a 1 de enero de 2025. Habitantes por diputado = población ÷ diputados. Peso relativo = media española (49.114.494 habitantes ÷ 350) ÷ habitantes por diputado de la circunscripción.",
          "Comprobación: aplicamos la regla del artículo 162 de la LOREG (2 diputados por provincia, 1 para Ceuta y otro para Melilla, y los 248 restantes según la población, por cociente y restos mayores) a esas cifras de población. Sale exactamente el mismo reparto que publica el BOE en las 52 circunscripciones.",
          "Medimos el peso del voto para elegir diputados. No tiene en cuenta el Senado, la participación ni el reparto D'Hondt entre partidos dentro de cada provincia.",
          `Datos abiertos: CSV en ${CSV}, con licencia CC BY 4.0 (cita «RutaTrámite» y las fuentes del BOE).`,
        ],
      },
    ],
  },
];
