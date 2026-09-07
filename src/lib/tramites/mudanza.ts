import { AEAT_030_URL, CITA_DNI_URL, DGT_URL, TASA_DNI_LABEL, TASA_PASAPORTE_LABEL } from "@/lib/tramites/facts";
import type { Guide } from "@/lib/tramites/types";

export const MUDANZA_GUIDES: Guide[] = [
  {
    id: "mudanza-hub",
    pack: "mudanza",
    path: "/mudanza",
    h1: "Me he mudado: el orden de los trámites",
    title: "Me he mudado en agosto: padrón, DNI, modelo 030 y lo demás",
    description:
      "Alta de padrón, cambio de domicilio en el DNI (gratis si solo es eso), modelo 030 y enlaces a DGT y sanidad. Sin teléfonos inventados.",
    lead: "Septiembre es el mes del cambio de piso. El padrón va al ayuntamiento nuevo. El DNI solo cambia de domicilio gratis si no caduca. Hacienda no se entera con el padrón: modelo 030. Esta página no inventa el teléfono de la zona SER ni el de tu centro de salud.",
    cta: { href: "/empadronarse", label: "Empadronarse en el municipio nuevo" },
    secondaryCta: { href: "/dni/cambio-domicilio", label: "Cambio de domicilio en el DNI" },
    related: [
      { href: "/empadronarse/cambio-de-domicilio", label: "Cambio de domicilio en el padrón" },
      { href: "/hacienda/modelo-030", label: "Modelo 030" },
      { href: "/dni/cita-previa", label: "Cita DNI" },
    ],
    sections: [
      {
        id: "orden",
        title: "El orden que evita dobles colas",
        lists: [
          [
            "Padrón: alta en el municipio nuevo o cambio de domicilio si ya estabas padronado en el mismo término — guía en /empadronarse y /empadronarse/cambio-de-domicilio. Empadrona a toda la unidad (pareja, compañeros) en la misma hoja si conviven.",
            "DNI: cambio de domicilio gratis si el documento sigue en vigor y no toca renovar por caducidad. Si está caducado o a 180 días, es renovación (tasa 12 €).",
            "Modelo 030: domicilio fiscal. El padrón no mueve Hacienda.",
            "DGT: domicilio del permiso y del vehículo en la sede DGT, no en el ayuntamiento.",
            "Tarjeta sanitaria / centro de salud: tu servicio de salud autonómico. No inventamos el teléfono de zona.",
            "Zona SER / residente / parking: ordenanza de ese ayuntamiento. Sin sede leída, no hay teléfono aquí.",
            "Abono transporte por zona: criterio autonómico (en Madrid el padrón cuenta; no copies el modelo a otra ciudad).",
            "Basuras / punto limpio / algunas tasas: municipales. El IBI no se cambia con el padrón.",
          ],
        ],
        paragraphs: [
          "RutaTrámite no es Administración. El alta en el padrón es gratuita. La cita de DNI, también; las tasas 2026 del documento son DNI 12 € y pasaporte 30 €.",
        ],
      },
    ],
  },
  {
    id: "dni-domicilio",
    pack: "mudanza",
    path: "/dni/cambio-domicilio",
    h1: "Cambio de domicilio en el DNI (gratis si solo es eso)",
    title: "Cambiar el domicilio del DNI 2026: gratis si no caduca",
    description:
      "El cambio de domicilio en el DNI es gratuito si el documento está en vigor y no renovamos por caducidad. Cita en citapreviadnie.es.",
    lead: "Si solo cambias la dirección y el DNI sigue en vigor, el trámite es gratuito: no pagas los 12 € de la renovación por caducidad. Hace falta cita en citapreviadnie.es. Si el DNI está caducado o dentro de los 180 días y toca renovar, ya no es “solo domicilio”: pagas la tasa de renovación (12 €; pasaporte 30 € si lo haces a la vez).",
    cta: { href: CITA_DNI_URL, label: "Cita en citapreviadnie.es" },
    secondaryCta: { href: "/empadronarse/cambio-de-domicilio", label: "Cambio de domicilio en el padrón" },
    related: [
      { href: "/mudanza", label: "Pack mudanza" },
      { href: "/hacienda/modelo-030", label: "Modelo 030" },
      { href: "/empadronarse", label: "Alta en el padrón" },
    ],
    sections: [
      {
        id: "gratis",
        title: "Cuándo es gratis de verdad",
        paragraphs: [
          "Interior no cobra la tasa cuando el DNI está en vigor y el motivo es solo cambio de domicilio (o de filiación, en los supuestos publicados). Familia numerosa también va a tasa 0 en la renovación ordinaria, con el título. No mezcles “gratis el domicilio” con “gratis el pasaporte”: el pasaporte sigue costando 30 € salvo exención propia.",
        ],
      },
      {
        id: "padron",
        title: "Padrón aparte",
        paragraphs: [
          "El DNI no te empadrona. El padrón se pide en el ayuntamiento del piso nuevo: /empadronarse (alta) o /empadronarse/cambio-de-domicilio. Lleva el volante o el certificado si te lo piden para el DNI, no al revés.",
        ],
      },
      {
        id: "tasas",
        title: "Tasas 2026 si no es “solo domicilio”",
        paragraphs: [
          `Renovación por caducidad, pérdida o deterioro: DNI ${TASA_DNI_LABEL}. Pasaporte ${TASA_PASAPORTE_LABEL}. Cita gratuita en citapreviadnie.es.`,
        ],
      },
    ],
  },
  {
    id: "modelo-030",
    pack: "mudanza",
    path: "/hacienda/modelo-030",
    h1: "Modelo 030: Hacienda no se entera con el padrón",
    title: "Modelo 030 cambio de domicilio fiscal 2026",
    description: "El padrón no cambia el domicilio fiscal. Modelo 030 en la sede de la AEAT. Enlaza con el alta o el cambio de padrón.",
    lead: "Empadronarte no mueve el domicilio fiscal. Eso va por el modelo 030 en la Agencia Tributaria. Si te mudaste en agosto y solo hiciste el padrón, Hacienda sigue escribiéndote a la casa vieja.",
    cta: { href: AEAT_030_URL, label: "Sede de la Agencia Tributaria" },
    secondaryCta: { href: "/empadronarse", label: "Alta en el padrón" },
    related: [
      { href: "/mudanza", label: "Pack mudanza" },
      { href: "/dni/cambio-domicilio", label: "Domicilio en el DNI" },
      { href: "/empadronarse/cambio-de-domicilio", label: "Cambio de domicilio padronal" },
      { href: DGT_URL, label: "Sede DGT (carné y vehículo)" },
    ],
    sections: [
      {
        id: "que",
        title: "Qué es",
        paragraphs: [
          "El 030 comunica a la AEAT el cambio de domicilio fiscal y otros datos censales. Se presenta en la sede electrónica con Cl@ve o certificado, o por los canales que la Agencia publique. Esta guía no es un software de renta.",
        ],
      },
      {
        id: "padron",
        title: "Relación con el padrón",
        paragraphs: [
          "Haz los dos: padrón en el ayuntamiento (/empadronarse o /empadronarse/cambio-de-domicilio) y 030 en Hacienda. El volante no sustituye al 030. El 030 no te empadrona.",
        ],
      },
      {
        id: "otros",
        title: "DGT, sanidad, SER, abono",
        paragraphs: [
          "Permiso de conducir y vehículo: sede.dgt.gob.es, no el 030. Centro de salud: tu comunidad. Zona SER y abono: reglas locales; sin sede leída no hay teléfono en esta ficha. Tasas DNI/pasaporte si también renovaste: 12 € y 30 €, cita en citapreviadnie.es.",
        ],
      },
    ],
  },
];
