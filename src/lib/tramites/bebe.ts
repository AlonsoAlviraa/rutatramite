import {
  DISCLAIMER_MEDICO,
  JUSTICIA_NACIMIENTO_URL,
  SANIDAD_CALENDARIO_URL,
  SEDE_SEG_SOCIAL_URL,
} from "@/lib/tramites/facts";
import type { Guide } from "@/lib/tramites/types";

const relatedBebe = [
  { href: "/bebe/inscripcion-nacimiento-registro-civil", label: "Registro Civil del nacimiento" },
  { href: "/bebe/tarjeta-sanitaria-bebe", label: "Tarjeta sanitaria del bebé" },
  { href: "/bebe/cartilla-de-vacunacion-donde-se-saca", label: "Cartilla de vacunación" },
  { href: "/empadronarse/menores", label: "Empadronar menores" },
];

export const BEBE_GUIDES: Guide[] = [
  {
    id: "tarjeta-sanitaria",
    pack: "bebe",
    path: "/bebe/tarjeta-sanitaria-bebe",
    h1: "Cómo sacar la tarjeta sanitaria del bebé",
    title: "Tarjeta sanitaria del bebé: cómo sacarla paso a paso",
    description:
      "Los dos pasos reales: alta como beneficiario en la Seguridad Social (Tu Seguridad Social o CAISS) y tarjeta en el centro de salud, donde asignan pediatra. Con enlaces oficiales.",
    lead:
      "Son dos pasos. Primero, alta del bebé como beneficiario en la Seguridad Social (portal Tu Seguridad Social con certificado digital o Cl@ve, o presencial en un CAISS): obtendrás el documento P1. Después, lleva el P1 y el certificado literal de nacimiento a la unidad administrativa de tu centro de salud: allí asignan pediatra y emiten la tarjeta.",
    cta: { href: SEDE_SEG_SOCIAL_URL, label: "Seguridad Social: alta del bebé" },
    related: relatedBebe,
    disclaimer: DISCLAIMER_MEDICO,
    sections: [
      {
        id: "paso-1",
        title: "Paso 1: el alta en la Seguridad Social",
        paragraphs: [
          "El alta como beneficiario se hace en la Seguridad Social (INSS): online con certificado o Cl@ve en el portal Tu Seguridad Social, presencial en un CAISS con cita, o lo gestiona el propio hospital en algunas comunidades. El resultado es el documento P1, el resguardo que acredita al bebé como beneficiario de un titular. Necesitarás el certificado literal de nacimiento (el hospital suele comunicar el nacimiento al Registro Civil por vía electrónica en 72 horas; la inscripción se completa en días) y tu DNI.",
        ],
      },
      {
        id: "paso-2",
        title: "Paso 2: el centro de salud asigna pediatra",
        paragraphs: [
          "Con el P1 y la identificación del bebé, acude a la unidad administrativa del centro de salud que corresponda a tu domicilio: allí dan de alta la tarjeta sanitaria individual y asignan pediatra y enfermería. En algunas comunidades (la Comunitat Valenciana, por ejemplo) el hospital emite una tarjeta provisional de tres meses que cubre la asistencia mientras llega la definitiva. El empadronamiento vigente del bebé en tu domicilio es el dato que fija el centro: si aún no lo has empadronado, la guía de empadronar recién nacidos te ordena el trámite.",
        ],
      },
      {
        id: "sin-tarjeta",
        title: "¿Puedo llevar al bebé al pediatra sin la tarjeta?",
        paragraphs: [
          "El derecho a la asistencia no depende del plástico: el bebé tiene cobertura desde el alta como beneficiario, y los centros atienden con el P1 o incluso registrando al niño en el mostrador mientras la tarjeta llega. Lo que se retrasa sin tarjeta es la comodidad: cita por app, carnet de salud infantil ordenado. Si te mudas de comunidad, la tarjeta se renueva en la nueva y el historial sanitario viaja por la Historia Clínica Digital del SNS.",
        ],
      },
    ],
  },
  {
    id: "cartilla-vacunas",
    pack: "bebe",
    path: "/bebe/cartilla-de-vacunacion-donde-se-saca",
    h1: "Dónde se saca la cartilla de vacunación en España",
    title: "Cartilla de vacunación: dónde se saca en España",
    description:
      "La cartilla o el registro digital de vacunas se entrega en el centro de salud al asignar pediatra; el certificado oficial se descarga del portal de salud digital de tu comunidad. Guía administrativa.",
    lead:
      "En España la cartilla o el registro digital de vacunaciones se entrega en el centro de salud cuando asignan pediatra al bebé. Si la pierdes o necesitas un justificante para matrícula o extraescolares, puedes descargar el certificado de vacunación desde el portal de salud digital de tu comunidad o pedirlo en tu centro de salud.",
    cta: { href: SANIDAD_CALENDARIO_URL, label: "Calendario vacunal oficial (Sanidad)" },
    related: relatedBebe,
    disclaimer: DISCLAIMER_MEDICO,
    sections: [
      {
        id: "donde",
        title: "Dónde se obtiene (y quién la rellena)",
        paragraphs: [
          "La cartilla la facilita el servicio de salud de tu comunidad a través del centro de salud asignado: la entregan en las primeras revisiones del bebé y la actualiza el propio sistema sanitario tras cada administración. Cada comunidad tiene además un registro nominal de vacunaciones: aunque pierdas el papel, las dosis administradas constan en el sistema de tu comunidad, y el certificado oficial puede expedirse en cualquier momento.",
        ],
      },
      {
        id: "duplicado",
        title: "Si la pierdes o la necesitas para el cole",
        paragraphs: ["Los dos papeles que aceptan colegios y servicios:"],
        lists: [
          [
            "Certificado oficial de vacunación: en el centro de salud o descargándolo de la carpeta de salud digital de tu comunidad.",
            "Cartilla digital: varias comunidades ya la emiten en la app sanitaria regional.",
            "Si cambiaste de comunidad: pide el certificado en la comunidad de origen; el historial no viaja solo (guía de cambio de comunidad con la cartilla).",
          ],
        ],
      },
      {
        id: "colegio",
        title: "Vacunas y escolarización: lo que puede pedir un colegio",
        paragraphs: [
          "Los centros pueden pedir la cartilla como documento informativo en la matrícula; ningún colegio puede rechazar la escolarización de un niño por no presentarla. La cartilla acredita lo administrado por el sistema público de tu comunidad; el calendario oficial que manda es el de tu consejería de salud (enlazado arriba). Esta guía no da consejo médico ni pautas: para cualquier decisión clínica, tu pediatra.",
        ],
      },
    ],
  },
  {
    id: "registro-civil",
    pack: "bebe",
    path: "/bebe/inscripcion-nacimiento-registro-civil",
    h1: "Inscribir al bebé en el Registro Civil",
    title: "Inscripción del nacimiento: plazo y documentos",
    description:
      "El hospital comunica el nacimiento en 72 horas; los progenitores tienen 10 días si les toca declarar. Fuera de plazo, expediente registral. Cita, documentos y qué viene después.",
    lead:
      "El hospital envía la comunicación del nacimiento al Registro Civil en 72 horas. A partir de ahí, los progenitores tienen 10 días para completar la inscripción, con cita previa en el Registro Civil del municipio o por vía electrónica. Necesitaréis DNI y, en su caso, el certificado del centro sanitario.",
    cta: { href: JUSTICIA_NACIMIENTO_URL, label: "Registro Civil: inscripción de nacimiento" },
    related: relatedBebe,
    sections: [
      {
        id: "plazos",
        title: "Los plazos de verdad (no los del rumor)",
        paragraphs: [
          "La Ley del Registro Civil reparte el trabajo: el centro sanitario comunica el nacimiento por vía electrónica en 72 horas, y esa comunicación arranca la inscripción de oficio en la mayoría de los nacimientos hospitalarios. El plazo de 10 días para declarar como progenitores aplica cuando nace fuera de centro sanitario o cuando el hospital no remite la comunicación. Si se pasa el plazo, la inscripción ya no se hace por simple declaración: exige un expediente registral con prueba del nacimiento, y mientras tanto no puedes tramitar DNI, tarjeta sanitaria ni prestaciones del bebé.",
        ],
      },
      {
        id: "documentos",
        title: "Qué se lleva a la cita",
        paragraphs: ["Para la inscripción (o su confirmación electrónica):"],
        lists: [
          [
            "DNI de los progenitores (y el certificado médico del parto si os toca declarar).",
            "Volante o justificante del centro sanitario con la comunicación del nacimiento.",
            "El certificado literal de nacimiento que expiden después: pide copias, las vas a necesitar para todo (SS, padrón, guardería).",
          ],
        ],
      },
      {
        id: "despues",
        title: "La cadena que viene después",
        paragraphs: [
          "Con la inscripción hecha, el orden eficiente es: alta en la Seguridad Social (P1), tarjeta sanitaria y pediatra, empadronamiento del bebé, y prestación por nacimiento si cumples requisitos (se puede pedir hasta cinco años después, mucho más margen del que dice el rumor de los seis meses). Las guías de esta web cubren cada eslabón.",
        ],
      },
    ],
  },
];
