import type { Guide } from "@/lib/tramites/types";

/** 22-10-2026 · Balance de compromisos de 2023 con fuente oficial o de verificadores. Orden por votos de 2023. Sin adjetivos. */
const NEWTRAL = { href: "https://www.newtral.es/gobierno-medidas-pactos-investidura-sanchez/20260723/", label: "Newtral, 23-7-2026: balance de PactoCheck (50 medidas de los pactos de 2023)" };
const PACTO = { href: "https://pactocheck.newtral.es/", label: "Newtral: PactoCheck, seguimiento de los acuerdos de investidura y de gobierno de 2023" };
const AMN = { href: "https://www.boe.es/buscar/act.php?id=BOE-A-2024-11776", label: "BOE: Ley Orgánica 1/2024, de 10 de junio, de amnistía" };
const PAR = { href: "https://www.boe.es/buscar/act.php?id=BOE-A-2024-15936", label: "BOE: Ley Orgánica 2/2024, de 1 de agosto, de representación paritaria" };
const IMP = { href: "https://www.boe.es/buscar/act.php?id=BOE-A-2024-26694", label: "BOE: Ley 7/2024, de 20 de diciembre (impuesto complementario mínimo global)" };
const A49 = { href: "https://www.boe.es/diario_boe/txt.php?id=BOE-A-2024-3099", label: "BOE: reforma del artículo 49 de la Constitución (17-2-2024)" };
const VAL = { href: "https://www.boe.es/buscar/doc.php?id=BOE-A-2023-26466", label: "BOE: Ley 6/2023 de la Generalitat Valenciana (bonificación del 99 % en Sucesiones y Donaciones)" };
const VALP = { href: "https://www.newtral.es/wp-content/uploads/2023/06/ACUERDO-CONJUNTO-PP-VOX.pdf", label: "Acuerdo PP-Vox para el gobierno de la Comunitat Valenciana (junio de 2023), publicado por Newtral" };
const ARA = { href: "https://www.boe.es/buscar/doc.php?id=BOE-A-2024-4617", label: "BOE: Ley 1/2024 de Aragón, de derogación de la Ley 14/2018 de memoria democrática" };
const ARATC = { href: "https://www.boe.es/buscar/doc.php?id=BOE-A-2024-12375", label: "BOE: el TC admite el recurso contra la Ley 1/2024 de Aragón y la suspende (19-6-2024)" };
const CYL = { href: "https://elpais.com/espana/2024-01-06/las-principales-exigencias-de-vox-en-el-pacto-entre-manueco-y-gallardo-no-se-han-ejecutado-dos-anos-despues-de-su-alianza.html", label: "El País, 6-1-2024: balance del pacto PP-Vox en Castilla y León" };
const RTVE24 = { href: "https://www.rtve.es/noticias/20240712/ruptura-pactos-pp-vox-comunidades-autonomas/16183724.shtml", label: "RTVE, 12-7-2024: Vox sale de los gobiernos autonómicos" };

const row = (cells: string[], source: { href: string; label: string }) => ({ cells, source });

export const PROMESAS_INCUMPLIDAS_GUIDES: Guide[] = [
  {
    id: "e29n-promesas-incumplidas",
    pack: "elecciones",
    reviewedAt: "2026-10-22",
    path: "/elecciones/promesas-incumplidas",
    h1: "¿Cumplieron sus promesas? Lo que prometieron los partidos en 2023 y qué pasó",
    title: "¿Cumplieron sus promesas? Lo prometido en 2023 y qué pasó",
    description: "Compromisos de 2023 de cada partido, con su estado (cumplido, en parte o no) y la prueba: BOE, Congreso y verificadores. Gobierno y comunidades.",
    lead: "Respuesta corta: solo puede cumplir una promesa quien gobierna. Desde 2023 gobierna en España la coalición PSOE-Sumar, con acuerdos de investidura con ERC, Junts, PNV, BNG y Coalición Canaria; PP y Vox gobernaron juntos en cinco comunidades hasta julio de 2024. El seguimiento más amplio de los pactos de 2023, el PactoCheck de Newtral, daba a 23 de julio de 2026 estas cifras sobre 50 medidas: 7 cumplidas, 27 en progreso, 11 pendientes y 5 incumplidas. Aquí recogemos solo compromisos con una prueba que se puede comprobar (el BOE o un verificador) y lo que se hizo con ellos.",
    cta: PACTO,
    secondaryCta: { href: "/elecciones/promesas", label: "Qué promete cada partido para el 29-N" },
    sources: [PACTO, NEWTRAL, AMN, PAR, IMP, A49, VAL, VALP, ARA, ARATC, CYL, RTVE24],
    related: [
      { href: "/elecciones/promesas", label: "Promesas del 29-N: qué propone cada partido" },
      { href: "/elecciones/programas-electorales-29n", label: "¿Han salido ya los programas del 29-N?" },
      { href: "/elecciones/promesas/metodologia", label: "Metodología de la comparativa de promesas" },
      { href: "/elecciones/quiere-algun-partido-quitar-las-pensiones", label: "¿Quiere algún partido quitar las pensiones?" },
    ],
    disclaimer: "Un compromiso «en progreso» o «no aprobado» no es lo mismo que uno abandonado: lo indicamos en cada fila. Si una fuente cambia, actualizamos la tabla.",
    faqs: [
      { q: "¿Qué partido ha cumplido más promesas?", a: "No se puede comparar en igualdad: solo la coalición PSOE-Sumar ha gobernado en España desde 2023. PP y Vox solo pudieron ejecutar en las comunidades donde gobernaron. Por eso separamos el Gobierno de España de los gobiernos autonómicos." },
      { q: "¿Cuántas promesas de 2023 cumplió el Gobierno?", a: "No existe una auditoría del programa completo. El PactoCheck de Newtral, que sigue 50 medidas de los pactos de investidura y de gobierno de 2023, contaba a 23 de julio de 2026 7 cumplidas, 27 en progreso, 11 pendientes y 5 incumplidas." },
      { q: "¿Cómo se valora a un partido de la oposición?", a: "En el Gobierno de España no puede ejecutar. Por eso, para PP y Vox recogemos lo que hicieron donde tuvieron poder ejecutivo: los gobiernos de coalición de las comunidades autónomas entre 2022-2023 y julio de 2024, cuando Vox salió de ellos." },
      { q: "¿Por qué la jornada de 37,5 horas figura como no cumplida?", a: "Porque el Congreso rechazó las dos iniciativas que se tramitaron (una proposición del Grupo Mixto en febrero de 2025 y el proyecto de ley del Gobierno de mayo de 2025), según Newtral." },
      { q: "¿Qué pasa con las medidas en tramitación al disolverse las Cortes?", a: "Las que no se aprobaron antes de la disolución no llegaron a ser ley en esta legislatura. Las marcamos como no aprobadas y lo explicamos en la fila." },
    ],
    sections: [
      {
        id: "comunidades",
        title: "PP y Vox en los gobiernos autonómicos (2022-2024)",
        paragraphs: ["PP y Vox no han gobernado en España desde 2023. Sí gobernaron juntos en Castilla y León (desde 2022), Comunitat Valenciana, Aragón, Región de Murcia y Extremadura (desde 2023) hasta que Vox salió de esos gobiernos en julio de 2024 (RTVE). Estas son medidas de sus acuerdos de gobierno con un resultado comprobable."],
        table: {
          caption: "Compromisos de los acuerdos autonómicos PP-Vox y su estado",
          head: ["Compromiso", "Estado", "Qué pasó", "Fuente"],
          rows: [
            row(["Comunitat Valenciana (PP y Vox): suprimir en la práctica Sucesiones y Donaciones entre familiares directos", "Cumplido", "Ley 6/2023: bonificación del 99 % para hijos, cónyuges y padres, con efectos desde el 28 de mayo de 2023."], VAL),
            row(["Aragón (PP y Vox): derogar la ley autonómica de memoria democrática", "Cumplido, suspendido", "Ley 1/2024, de 15 de febrero. El Tribunal Constitucional admitió el recurso del Gobierno y la suspendió desde el 29 de mayo de 2024."], ARATC),
            row(["Castilla y León (PP y Vox, acuerdo de 2022): sustituir la ley de violencia de género por una de violencia intrafamiliar", "No cumplido", "Sin avances legislativos a enero de 2024, según El País; Vox salió del gobierno en julio de 2024."], CYL),
          ],
        },
      },
      {
        id: "gobierno",
        title: "Gobierno de España: PSOE y Sumar (desde noviembre de 2023)",
        paragraphs: ["Compromisos de los acuerdos de investidura y de gobierno de 2023 que sigue Newtral, Entre paréntesis, el partido con el que se firmó cada pacto."],
        table: {
          caption: "Compromisos del Gobierno de España y su estado, a octubre de 2026",
          head: ["Compromiso de 2023", "Estado", "Qué pasó", "Fuente"],
          rows: [
            row(["Ley de amnistía (pactos con ERC y Junts)", "Cumplido", "Ley Orgánica 1/2024, publicada en el BOE el 11 de junio de 2024."], AMN),
            row(["Reformar el artículo 49 de la Constitución para quitar «disminuidos»", "Cumplido", "Reforma registrada por PSOE y PP y publicada en el BOE el 17 de febrero de 2024."], A49),
            row(["Ley de representación paritaria", "Cumplido", "Ley Orgánica 2/2024, de 1 de agosto: al menos un 40 % de mujeres en consejos de cotizadas y grandes entidades de interés público."], PAR),
            row(["Impuesto mínimo del 15 % a multinacionales", "Cumplido", "Ley 7/2024, de 20 de diciembre, que transpone la directiva europea."], IMP),
            row(["Ayudas para gafas y lentillas hasta los 18 años (acuerdo PSOE-Sumar)", "En parte", "Real decreto de octubre de 2025 con hasta 100 € para menores de hasta 16 años; quedan fuera los de 17 y 18, según Newtral."], NEWTRAL),
            row(["Traspaso integral de Rodalies a Cataluña (pacto con ERC)", "En parte", "Empresa Rodalies de Catalunya creada en enero de 2026 (49,9 % Generalitat, 50,1 % Renfe); el traspaso no ha culminado, según Newtral."], NEWTRAL),
            row(["Reducir la jornada laboral a 37,5 horas semanales (acuerdo PSOE-Sumar)", "No cumplido", "El Congreso rechazó las dos iniciativas (febrero y mayo de 2025), según Newtral."], NEWTRAL),
            row(["Transferir a Euskadi las competencias pendientes en dos años (pacto con el PNV)", "No cumplido", "10 traspasos desde 2023 y 22 pendientes según el Gobierno vasco, a julio de 2026 (Newtral)."], NEWTRAL),
            row(["Reformar la ley de seguridad ciudadana («ley mordaza»)", "No aprobado", "Proposición registrada en octubre de 2024 por PSOE, Sumar, EH Bildu y PNV; seguía en la Comisión de Interior en julio de 2026 (Newtral)."], NEWTRAL),
          ],
        },
      },
      {
        id: "otros",
        title: "Partidos con acuerdos de investidura",
        paragraphs: [
          "ERC, Junts, PNV, BNG y Coalición Canaria no forman parte del Gobierno: firmaron pactos con el PSOE y lo ejecuta el Gobierno. Sus compromisos más visibles están en la primera tabla: amnistía (ERC y Junts), Rodalies (ERC) y traspasos a Euskadi (PNV).",
          "Newtral no evalúa el pacto con EH Bildu porque, según explica, no tiene compromisos factuales que se puedan medir con datos.",
        ],
      },
      {
        id: "recuento",
        title: "Recuento de esta página",
        paragraphs: [],
        table: {
          caption: "Compromisos recogidos por ámbito y estado",
          head: ["Ámbito", "Cumplidos", "En parte o no aprobados", "No cumplidos", "Fuente"],
          rows: [
            row(["Gobiernos autonómicos PP-Vox", "2 (uno suspendido por el TC)", "0", "1"], RTVE24),
            row(["Gobierno de España (PSOE y Sumar)", "4", "3", "2"], PACTO),
          ],
        },
      },
      {
        id: "metodologia",
        title: "Cómo lo hemos hecho",
        paragraphs: [
          "Solo incluimos un compromiso si hay un documento que lo recoge (acuerdo de gobierno o de investidura, programa) y una prueba de lo que pasó: el BOE, una iniciativa del Congreso o un verificador (Newtral). Si no encontramos las dos cosas, lo dejamos fuera.",
          "Estados: «cumplido» si la norma está aprobada y publicada; «en parte» si se aprobó con menos alcance del prometido o el proceso sigue a medias; «no aprobado» si se registró pero no llegó a votarse; «no cumplido» si se votó y se rechazó o venció el plazo comprometido.",
          "Los partidos aparecen en el orden de votos de las elecciones de 2023. No usamos adjetivos ni calificamos las promesas: solo contamos lo que dice la fuente.",
        ],
      },
    ],
  },
];
