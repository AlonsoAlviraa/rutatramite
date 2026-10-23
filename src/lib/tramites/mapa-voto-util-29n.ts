import type { Guide, GuideSection } from "@/lib/tramites/types";
import { MAPA_POLLS, MAPA_MEDIA, MAPA_NAC23, MAPA_SWING, POLLS_DATE, pollsAllowed } from "@/lib/datos/mapa-voto-util";

const BOE2023 = { href: "https://www.boe.es/diario_boe/txt.php?id=BOE-A-2023-18907", label: "BOE: resultados oficiales de las generales de 2023 por circunscripción (Junta Electoral Central)" };
const RD806 = { href: "https://www.boe.es/diario_boe/txt.php?id=BOE-A-2026-20742", label: "BOE: Real Decreto 806/2026, diputados por circunscripción el 29-N" };
const RD1117 = { href: "https://www.boe.es/diario_boe/txt.php?id=BOE-A-2025-25362", label: "BOE: Real Decreto 1117/2025, población oficial a 1-1-2025" };
const L163 = { href: "https://www.boe.es/buscar/act.php?id=BOE-A-1985-11672#acientosesentaytres", label: "BOE: LOREG, artículo 163 (barrera del 3 % y regla D'Hondt)" };
const L69 = { href: "https://www.boe.es/buscar/act.php?id=BOE-A-1985-11672#asesentaynueve", label: "BOE: LOREG, artículo 69 (encuestas en los cinco días previos)" };
const NE = { href: "https://www.naturalearthdata.com/about/terms-of-use/", label: "Natural Earth: geometría de provincias (dominio público)" };
const CSV = "/datos/mapa-voto-util-29n.csv";
const pc = (n: number) => n.toLocaleString("es-ES", { maximumFractionDigits: 2 }) + " %";
const ALLOWED = pollsAllowed();

const ENCUESTAS: GuideSection = {
  id: "escenario-2026",
  title: "Escenario 2026: cómo lo calculamos",
  paragraphs: [
    `Estimación a partir de encuestas, no es un resultado ni una predicción. Datos de encuestas a fecha ${POLLS_DATE}.`,
    `Media simple (sin ponderar por muestra) de las 10 encuestas privadas de nuestra tabla de encuestas del 29-N que publican ficha técnica, una por empresa (la más reciente): PP ${pc(MAPA_MEDIA.PP)}, PSOE ${pc(MAPA_MEDIA.PSOE)} y Vox ${pc(MAPA_MEDIA.Vox)} del voto válido. El CIS no entra en la media porque usa otro método de estimación; su barómetro de octubre se puede consultar aparte en la página de encuestas.`,
    `Paso a provincias (supuesto de cambio uniforme): las encuestas son nacionales, así que a cada partido le sumamos en todas las provincias la misma diferencia entre la media y su resultado nacional de 2023 (PP ${pc(MAPA_NAC23.PP)} → ${MAPA_SWING.PP > 0 ? "+" : ""}${pc(MAPA_SWING.PP)}; PSOE con PSC ${pc(MAPA_NAC23.PSOE)} → ${MAPA_SWING.PSOE > 0 ? "+" : ""}${pc(MAPA_SWING.PSOE)}; Vox ${pc(MAPA_NAC23.Vox)} → ${MAPA_SWING.Vox > 0 ? "+" : ""}${pc(MAPA_SWING.Vox)}), sin bajar de 0. Es una simplificación: en la realidad los cambios no son iguales en todas las provincias.`,
    "Resto de candidaturas: nuestra tabla solo recoge PP, PSOE y Vox de forma homogénea, así que el resto (Sumar, ERC, Junts, EH Bildu, EAJ-PNV, BNG, CCa, UPN y las demás, más el voto en blanco) conserva en cada provincia su peso relativo de 2023 y se ajusta en proporción para sumar el 100 %. Las formaciones sin equivalente en 2023 (por ejemplo, Frente Amplio, Se Acabó la Fiesta o D21) no se estiman por separado; Sumar se mantiene con su resultado de 2023 escalado. No inventamos sus votos.",
    "Con esos porcentajes y el voto válido de 2023 de cada provincia aplicamos la barrera del 3 % y la regla D'Hondt con los diputados del Real Decreto 806/2026.",
    "Este escenario deja de mostrarse el 24 de noviembre: el artículo 69 de la LOREG prohíbe publicar o reproducir encuestas en los cinco días anteriores a la votación.",
  ],
  table: {
    caption: "Encuestas incluidas en la media (porcentaje sobre voto válido)",
    head: ["Encuesta y medio", "Campo", "Publicada", "Muestra", "PP", "PSOE", "Vox", "Fuente"],
    rows: MAPA_POLLS.map((p) => ({ cells: [p.n, p.campo, p.pub, p.muestra.toLocaleString("es-ES"), pc(p.pp), pc(p.psoe), pc(p.vox)], source: { href: "/elecciones/encuestas-29n", label: "Tabla de encuestas de RutaTrámite (con enlace a cada ficha técnica)" } })),
  },
};

export const MAPA_VOTO_UTIL_GUIDES: Guide[] = [
  {
    id: "29n-mapa-voto-util",
    pack: "elecciones",
    reviewedAt: "2026-10-23",
    disclaimer: "",
    path: "/elecciones/mapa-voto-util-29n",
    h1: "Mapa del voto útil por provincia: dónde estuvo más reñido el último escaño",
    title: "Mapa del voto útil por provincia (29-N): último escaño",
    description: "Mapa interactivo de las 52 circunscripciones: quién ganó el último escaño en 2023, cuántos votos faltaron, votos sin escaño por bloque y peso del voto. Datos del BOE.",
    lead: "Respuesta corta: en 2023 el último escaño más reñido fue el de Madrid, donde al PSOE le faltaron 1.340 votos para quitárselo al PP. Le siguen Girona (285 votos entre Junts y PP), Cantabria (404 entre Vox y PP), Málaga (2.429 entre PP y PSOE) y Santa Cruz de Tenerife (1.565 entre PSOE y Sumar). El mapa muestra qué pasó en 2023 en cada provincia y dónde está más reñido el último escaño. No recomienda votar a nadie.",
    cta: BOE2023,
    secondaryCta: RD806,
    sources: [BOE2023, RD806, RD1117, L163, L69, NE],
    related: [
      { href: "/elecciones/voto-util-29n", label: "Voto útil: qué es y cómo afecta a derecha e izquierda" },
      { href: "/elecciones/cuanto-vale-tu-voto-por-provincia-29n", label: "Estudio: cuánto vale tu voto en cada provincia" },
      { href: "/elecciones/como-se-reparten-los-escanos", label: "Cómo se reparten los escaños del Congreso" },
      { href: "/elecciones/barrera-del-3-por-ciento-y-voto-util", label: "La barrera del 3 %" },
      { href: "/elecciones/encuestas-29n", label: "Encuestas del 29-N" },
      { href: "/elecciones", label: "Elecciones generales del 29-N" },
    ],
    faqs: [
      { q: "¿Dónde estuvo más reñido el último escaño en 2023?", a: "En Madrid: el PP se llevó el último escaño con un cociente de 91.449 y el PSOE se quedó en 91.327; le faltaron 1.340 votos (0,04 % del voto válido). En votos absolutos, el margen más pequeño fue el de Girona: al PP le faltaron 285 votos para quitárselo a Junts." },
      { q: "¿Qué es el «último escaño»?", a: "El último diputado que se reparte en cada provincia con la regla D'Hondt, es decir, el que se adjudica con el cociente más bajo. Es el que cambia de manos con menos votos." },
      { q: "¿Cómo se clasifican los bloques?", a: "Bloque derecha: PP, Vox y UPN. Bloque izquierda: PSOE (con PSC), Sumar, ERC, EH Bildu y BNG. Otros: Junts, EAJ-PNV, Coalición Canaria y el resto de candidaturas. Es una clasificación de RutaTrámite, explicada en la sección de método." },
      { q: "¿El mapa dice a quién votar?", a: "No. Muestra qué pasó en 2023 con datos oficiales y, como referencia, una estimación hecha con encuestas. Votar es una decisión personal." },
      { q: "¿Puedo usar los datos?", a: `Sí. El CSV con los datos oficiales de 2023 y los diputados de 2026 está en ${CSV}, con licencia CC BY 4.0 (cita «RutaTrámite» y el BOE).` },
    ],
    dataset: {
      "@context": "https://schema.org",
      "@type": "Dataset",
      name: "Último escaño, margen y votos sin escaño por bloque en las 52 circunscripciones (generales 2023) y habitantes por diputado (29-N 2026)",
      description: "Recalculo D'Hondt con barrera del 3 % de los resultados oficiales de 2023 (coincide con los 350 escaños del BOE): reparto, último escaño y cociente, siguiente candidatura y votos que le faltaron, votos por escaño, votos sin escaño por bloque; diputados 2026 y habitantes por diputado.",
      url: "https://rutatramite.com/elecciones/mapa-voto-util-29n",
      license: "https://creativecommons.org/licenses/by/4.0/",
      creator: { "@type": "Organization", name: "RutaTrámite", url: "https://rutatramite.com/" },
      dateModified: "2026-10-23",
      temporalCoverage: "2023-07-23/2026-11-29",
      spatialCoverage: "España",
      isBasedOn: [BOE2023.href, RD806.href, RD1117.href],
      distribution: [{ "@type": "DataDownload", encodingFormat: "text/csv", contentUrl: "https://rutatramite.com" + CSV }],
    },
    sections: [
      {
        id: "que-muestra",
        title: "Qué muestra cada vista del mapa",
        paragraphs: [],
        lists: [[
          "Peso del voto: habitantes por diputado con los diputados de 2026. Cuantos menos habitantes por diputado, más pesa cada voto (Soria 45.117; Madrid 187.817).",
          "Margen del último escaño: votos que le faltaron a la siguiente candidatura para quitarle el último escaño a quien lo ganó, en % del voto válido. Con borde, las 5 provincias más reñidas.",
          "Votos sin escaño por bloque: votos a candidaturas que no sacaron ningún diputado en esa provincia. En 2023 sumaron 580.752 en el bloque derecha, 709.664 en el bloque izquierda y 640.008 en otros.",
          "Quién ganó el último escaño: la candidatura que se llevó el último diputado de cada provincia.",
        ]],
      },
      {
        id: "mas-renidos-2023",
        title: "Los 5 últimos escaños más reñidos en 2023",
        paragraphs: ["Ordenados por los votos que faltaron en % del voto válido de la provincia."],
        table: {
          caption: "Último escaño en 2023: quién lo ganó y cuánto faltó",
          head: ["Circunscripción", "Último escaño (cociente)", "Siguiente (cociente)", "Votos que faltaron", "% del voto válido", "Fuente"],
          rows: [
            { cells: ["Madrid", "PP (91.449)", "PSOE (91.327)", "1.340", "0,04 %"], source: BOE2023 },
            { cells: ["Girona", "Junts (31.626)", "PP (31.341)", "285", "0,09 %"], source: BOE2023 },
            { cells: ["Cantabria", "Vox (49.243)", "PP (49.109)", "404", "0,12 %"], source: BOE2023 },
            { cells: ["Málaga", "PP (60.400)", "PSOE (59.793)", "2.429", "0,31 %"], source: BOE2023 },
            { cells: ["Santa Cruz de Tenerife", "PSOE (55.197)", "Sumar (53.632)", "1.565", "0,32 %"], source: BOE2023 },
          ],
        },
      },
      {
        id: "bloques",
        title: "Cómo agrupamos los bloques",
        paragraphs: [
          "Bloque derecha: PP, Vox y UPN. Bloque izquierda: PSOE (con PSC), Sumar, ERC, EH Bildu y BNG. Otros: Junts, EAJ-PNV, Coalición Canaria y todas las candidaturas que no obtuvieron escaño en ninguna provincia (por ejemplo, PACMA, CUP o Soria ¡Ya!).",
          "Criterio: solo clasificamos en un bloque a las candidaturas con escaño en 2023 que se ubican de forma habitual en un extremo del eje izquierda-derecha. Las que han apoyado investiduras de presidentes tanto del PP como del PSOE (EAJ-PNV y Coalición Canaria; Junts, a través de su antecesora CiU) van en «otros», igual que las candidaturas sin escaño de cualquier orientación. Es un criterio de RutaTrámite: puedes recalcular los bloques con el CSV, que trae los votos por partido.",
        ],
      },
      ...(ALLOWED ? [ENCUESTAS] : []),
      {
        id: "como-revisamos",
        title: "Cómo revisamos los datos",
        paragraphs: [
          "Resultados 2023: votos por candidatura y voto válido (votos a candidaturas más votos en blanco) de cada circunscripción, tomados de la resolución de la Junta Electoral Central publicada en el BOE (BOE-A-2023-18907).",
          "Comprobación: aplicamos la barrera del 3 % del voto válido y la regla D'Hondt (artículo 163 de la LOREG). El reparto que sale coincide con el del BOE en las 52 circunscripciones, 350 de 350 escaños.",
          "Votos que faltaron = cociente del último escaño × (escaños de la siguiente candidatura + 1) − votos de la siguiente candidatura, más 1. «Siguiente» es la candidatura que ha superado el 3 % con el cociente más alto entre las que no se llevaron escaño.",
          "Peso del voto: población oficial a 1-1-2025 (Real Decreto 1117/2025) entre los diputados de 2026 (Real Decreto 806/2026). Mapa: geometría de Natural Earth (dominio público), simplificada; Canarias en recuadro.",
          `Datos abiertos: ${CSV} (CC BY 4.0).`,
        ],
      },
    ],
  },
];
