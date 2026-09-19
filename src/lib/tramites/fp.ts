import { TODOFP_URL } from "@/lib/tramites/facts";
import type { Guide } from "@/lib/tramites/types";

export const FP_GUIDES: Guide[] = [
  {
    id: "matricula-septiembre",
    pack: "fp",
    path: "/fp/matricula-fp-en-septiembre",
    h1: "¿Se puede uno matricular en FP en septiembre?",
    title: "Matricularse en FP en septiembre: se puede todavía",
    description:
      "El proceso ordinario cerró y el curso empieza: matrícula extraordinaria de septiembre, vacantes reales (2.931 en CyL), listas de reserva y FP a distancia como plan B.",
    lead:
      "Sí, todavía hay opciones en septiembre: muchas comunidades abren matrícula extraordinaria para cubrir plazas vacantes, y cada centro puede admitir directamente si quedan huecos. Consulta el calendario de admisión de tu consejería o llama a la secretaría del centro. La FP a distancia y los centros privados suelen cerrar más tarde.",
    cta: { href: TODOFP_URL, label: "Todofp (oficial)" },
    related: [
      { href: "/fp/convalidaciones-fp", label: "Convalidaciones de FP" },
      { href: "/becas/mec", label: "Beca MEC para FP" },
      { href: "/colegio/documentos-matricula-colegio", label: "Documentos de matrícula" },
    ],
    sections: [
      {
        id: "extraordinaria",
        title: "La matrícula extraordinaria",
        paragraphs: [
          "Tras el proceso ordinario, cada comunidad publica un periodo extraordinario en septiembre para cubrir las plazas que quedaron vacantes. Ejemplo verificado del calendario 2026-27 de Castilla y León: solicitud extraordinaria del 2 al 4 de septiembre, adjudicación el 15 y matrícula del 15 al 18. Las fechas exactas cambian por comunidad: la referencia viva es el calendario de admisión de tu consejería, no los resúmenes de blogs.",
        ],
      },
      {
        id: "vacantes",
        title: "Que hay vacantes es un hecho, no una esperanza",
        paragraphs: [
          "Los ciclos más demandados (Sanidad, Educación Infantil, Informática) se llenan; el resto deja vacantes reales: en Castilla y León llegaron a quedar casi 3.000 plazas sin cubrir tras el extraordinario de un curso reciente. Además, en algunas comunidades la solicitud fuera de plazo se admite durante el primer trimestre allí donde queden vacantes (es el caso documentado de Castilla y León): pregunta directamente en la secretaría del instituto, que es quien ve el hueco en tiempo real.",
        ],
      },
      {
        id: "plan-b",
        title: "Plan B si tu ciclo está lleno",
        paragraphs: ["Tres salidas antes de rendir el año:"],
        lists: [
          [
            "Lista de reserva del centro: las renuncias de septiembre liberan plazas durante semanas.",
            "FP a distancia o semipresencial: misma titulación oficial, calendario más flexible.",
            "Ciclo afín con plazas: convalidaciones después reducen la carga (guía de convalidaciones).",
          ],
        ],
      },
      {
        id: "beca",
        title: "La beca no espera al despiste",
        paragraphs: [
          "Si consigues plaza en septiembre, revisa inmediatamente el estado de la beca MEC: la convocatoria general cerró en mayo, pero la modificación de solicitudes presentadas tiene su ventana del 7 al 28 de septiembre; no permite una nueva solicitud de beca general. La guía de becas de esta web las ordena con sus plazos reales.",
        ],
      },
    ],
  },
  {
    id: "convalidaciones",
    pack: "fp",
    path: "/fp/convalidaciones-fp",
    h1: "Convalidaciones de FP: cómo y dónde solicitarlas",
    title: "Convalidaciones de FP: cómo y dónde solicitarlas",
    description:
      "Convalidar módulos entre ciclos formativos o desde la universidad: quién lo resuelve, cuándo se pide (al matricularse) y qué documentación llevar a secretaría.",
    lead:
      "Las convalidaciones de módulos de Formación Profesional se solicitan al formalizar la matrícula en la secretaría del centro, que las remite a la administración educativa. No esperes a noviembre: el plazo es el de la matrícula, y resolverla tarde puede cambiar tu horario y tu beca.",
    cta: { href: TODOFP_URL, label: "Todofp: convalidaciones (oficial)" },
    related: [
      { href: "/fp/matricula-fp-en-septiembre", label: "Matrícula FP en septiembre" },
      { href: "/becas/mec", label: "Beca MEC" },
    ],
    sections: [
      {
        id: "cuando",
        title: "Cuándo se piden",
        paragraphs: [
          "Al matricularse: la solicitud de convalidación se presenta junto con la matrícula del nuevo ciclo, en el impreso que facilite la secretaría. La resuelve la administración educativa de tu comunidad (no el profesor ni el jefe de estudios). Mientras se resuelve, el centro puede permitirte asistir a los módulos pendientes de convalidación: pregunta cómo lo gestionan antes de renunciar a clases por prudencia.",
        ],
      },
      {
        id: "documentos",
        title: "Qué llevas a secretaría",
        paragraphs: ["La documentación habitual:"],
        lists: [
          [
            "Certificado académico o credencial de los estudios previos (otro ciclo, universidad o formación acreditada).",
            "Impreso de solicitud de convalidación del centro o de la consejería.",
            "Resguardo de la matrícula del nuevo ciclo.",
          ],
        ],
      },
      {
        id: "beca",
        title: "Convalidaciones y beca: la trampa",
        paragraphs: [
          "Los créditos o módulos convalidados computan de forma particular en los requisitos de rendimiento de la beca MEC: los reconocidos y transferidos no cuentan como matriculados a efectos de algunos umbrales. Si tu beca depende del número de créditos, revisa la guía de requisitos para no devolver la beca antes de decidir cuánto te convalidas.",
        ],
      },
    ],
  },
];
