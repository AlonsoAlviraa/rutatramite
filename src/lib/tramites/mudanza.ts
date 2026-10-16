import type { Guide } from "@/lib/tramites/types";

export const MUDANZA_GUIDES: Guide[] = [
  {
    "id": "mudanza-hub",
    "pack": "mudanza",
    "path": "/mudanza",
    "h1": "Me he mudado: padrón, domicilio fiscal y otros trámites",
    "title": "Me he mudado: padrón, domicilio fiscal y otros trámites",
    "description": "Organiza el cambio de domicilio: padrón, DNI, AEAT y DGT. Distingue modelos 030 y 036, plazos y ayuntamientos colaboradores.",
    "lead": "Una mudanza puede exigir actualizar varios registros. Comprueba primero el padrón de tu residencia habitual y qué datos constan en cada organismo. El modelo fiscal y su plazo dependen de tu situación; no hace falta esperar a renovar el DNI para comunicar el cambio a Hacienda.",
    "reviewedAt": "2026-09-16",
    "cta": {
      "href": "/empadronarse/cambio-de-domicilio",
      "label": "Actualizar el padrón"
    },
    "related": [
      {
        "href": "/hacienda/modelo-030",
        "label": "Domicilio fiscal: modelo y plazo"
      },
      {
        "href": "/dni/cambio-domicilio",
        "label": "Actualizar el DNI"
      },
      {
        "href": "/modelo-030-cambio-domicilio",
        "label": "Formulario oficial del modelo 030"
      }
    ],
    "sources": [
      {
        "href": "https://www.boe.es/buscar/act.php?id=BOE-A-1986-21944",
        "label": "BOE: padrón y residencia habitual"
      },
      {
        "href": "https://sede.dgt.gob.es/es/vehiculos/cambio-de-domicilio-fiscal",
        "label": "DGT: domicilio fiscal del vehículo"
      },
      {
        "href": "https://www.dgt.es/conoce-la-dgt/con-quien-trabajamos/ayuntamientos-colaboradores/",
        "label": "DGT: ayuntamientos colaboradores"
      },
      {
        "href": "https://sede.administracion.gob.es/servicios-electronicos",
        "label": "Punto de Acceso General: comunicación de domicilio"
      },
      {
        "href": "https://www.interior.gob.es/opencms/es/servicios-al-ciudadano/tramites-y-gestiones/tasas/dni/",
        "label": "Interior: exención por cambio de domicilio del DNI"
      },
      {
        "href": "https://sede.agenciatributaria.gob.es/Sede/censos-nif-domicilio-fiscal/censos/modelo-030-censo_____de-domicilio-variacion-personales_/instrucciones.html",
        "label": "AEAT: quién utiliza el modelo 030 y presentación en papel"
      },
      {
        "href": "https://sede.agenciatributaria.gob.es/Sede/censos-nif-domicilio-fiscal/tramites-censales-relacionados-datos-personales-domicilio/preguntas-frecuentes-modelo-030/domicilio-fiscal.html",
        "label": "AEAT: plazo y excepción de Renta"
      },
      {
        "href": "https://sede.agenciatributaria.gob.es/Sede/censos-nif-domicilio-fiscal/tramites-censales-relacionados-empresarios-profesionales-retenedores/preguntas-frecuentes-modelos-036-037/modificaciones-censales.html",
        "label": "AEAT: cambio de domicilio mediante modelo 036"
      }
    ],
    "sections": [
      {
        "id": "padron",
        "title": "Padrón y DNI",
        "paragraphs": [
          "Solicita el alta en el municipio donde resides habitualmente, o la modificación de dirección si sigues en el mismo municipio. Comprueba la hoja, identificación y autorizaciones que pide el ayuntamiento para cada persona; convivir no te autoriza por sí solo a firmar por otro adulto.",
          "El cambio de domicilio de un DNI en vigor está exento de tasa. La ventana de los últimos 180 días no elimina por sí sola esa exención. Consulta la guía del DNI para preparar padrón o consulta de residencia y la cita."
        ]
      },
      {
        "id": "fiscal",
        "title": "Hacienda: elige el modelo y atiende al plazo",
        "paragraphs": [
          "Para una persona física fuera del Censo de Empresarios, Profesionales y Retenedores, el cambio se comunica mediante modelo 030: tres meses, con la excepción de Renta si su plazo de presentación termina antes. En el censo empresarial corresponde el modelo 036, con plazo general de un mes desde el día siguiente al cambio.",
          "No des por actualizados todos los registros con el alta padronal. Existe un servicio público de comunicación de domicilio a distintos organismos: comprueba cuáles permite seleccionar, la información recuperada y el resultado. Conserva los justificantes de las comunicaciones realizadas."
        ]
      },
      {
        "id": "dgt",
        "title": "DGT: dirección de contacto y vehículos",
        "paragraphs": [
          "Revisa tanto la dirección para notificaciones como el domicilio fiscal de tus vehículos. DGT indica un plazo de 15 días para comunicar el cambio de domicilio fiscal del vehículo. Su sede publica canales y supuestos especiales.",
          "También puedes tramitar el cambio desde un ayuntamiento con convenio. Consulta la lista de colaboradores: no todos ofrecen este servicio. Si la nueva dirección aún no figura en el INE, la DGT pide certificado de empadronamiento por la vía prevista para ese caso."
        ]
      },
      {
        "id": "servicios",
        "title": "Servicios que conviene revisar",
        "paragraphs": [
          "Consulta con tu servicio de salud cómo actualizar la dirección y, si procede, el centro asignado. Revisa asimismo colegio, permisos de estacionamiento de residente, transporte y contratos de suministros según tus necesidades. Sus reglas dependen del servicio y del territorio; no hay una condición de padrón única para todos los abonos de transporte."
        ]
      }
    ]
  },
  {
    "id": "dni-domicilio",
    "pack": "mudanza",
    "path": "/dni/cambio-domicilio",
    "h1": "Cambiar el domicilio del DNI: exención y documentos",
    "title": "Cambiar el domicilio del DNI: exención y documentos",
    "description": "El cambio de domicilio del DNI en vigor está exento de tasa. Consulta el padrón de hasta tres meses, su verificación electrónica y los casos de renovación.",
    "lead": "La renovación del DNI en vigor por cambio de domicilio es gratuita según la ficha de tasas de Interior. Que le queden menos de 180 días no lo convierte en un documento caducado ni elimina por sí solo esa exención. Identifica el motivo de la expedición y comprueba las condiciones de tu caso al pedir cita.",
    "reviewedAt": "2026-09-16",
    "sources": [
      {
        "href": "https://www.interior.gob.es/opencms/es/servicios-al-ciudadano/tramites-y-gestiones/tasas/dni/",
        "label": "Interior: exención por cambio de domicilio con DNI en vigor"
      },
      {
        "href": "https://www.interior.gob.es/opencms/es/servicios-al-ciudadano/tramites-y-gestiones/dni/documentacion-necesaria-para-su-tramitacion/index.html",
        "label": "Interior: padrón y consulta de residencia"
      },
      {
        "href": "https://www.boe.es/eli/es/rd/2025/04/01/255/con",
        "label": "BOE: renovación y modificación de datos"
      }
    ],
    "cta": {
      "href": "https://www.citapreviadnie.es/",
      "label": "Pedir cita para actualizar el DNI"
    },
    "related": [
      {
        "href": "/empadronarse/cambio-de-domicilio",
        "label": "Actualizar primero el padrón"
      },
      {
        "href": "/dni/checklist",
        "label": "Preparar documentos"
      },
      {
        "href": "/mudanza",
        "label": "Otros trámites de mudanza"
      }
    ],
    "sections": [
      {
        "id": "exencion",
        "title": "Cuándo se aplica la exención",
        "paragraphs": [
          "Interior declara gratuito renovar un DNI en vigor por cambio de datos de filiación o domicilio. La posibilidad de renovarlo por caducidad durante sus últimos 180 días es una regla distinta. No debe convertirse en un cobro automático de 12 € por cualquier cambio de dirección en ese periodo.",
          "Si el DNI ya está caducado, comprueba la tasa de renovación y otras posibles exenciones, como familia numerosa. La gratuidad del cambio de domicilio del DNI no se extiende al pasaporte."
        ]
      },
      {
        "id": "padron",
        "title": "Cómo acreditar la nueva dirección",
        "paragraphs": [
          "Para un cambio de domicilio en España, Interior pide certificado o volante de empadronamiento expedido como máximo tres meses antes de la solicitud. Puede evitarse su aportación si autorizas al equipo a consultar los datos de residencia y la consulta devuelve la información necesaria.",
          "Si no hay conexión o los datos no se comunican, tendrás que aportar el certificado o volante. Para un domicilio en el extranjero, consulta la documentación consular específica. Actualizar el DNI no te da de alta en el padrón."
        ]
      },
      {
        "id": "cita",
        "title": "Preparar la cita",
        "paragraphs": [
          "Reserva en citapreviadnie.es o consulta el 060. Lleva el DNI anterior y revisa fotografía y justificantes en la ficha de Interior. La reserva es gratuita; el 060 tiene coste de llamada.",
          "La tasa ordinaria del DNI publicada es de 12 €, con las exenciones indicadas. Conserva la confirmación de cita y comunica a la unidad si también necesitas otro trámite."
        ]
      }
    ],
    "secondaryCta": {
      "href": "/empadronarse/cambio-de-domicilio",
      "label": "Cambiar el domicilio en el padrón"
    }
  },
  {
    "id": "modelo-030",
    "pack": "mudanza",
    "path": "/hacienda/modelo-030",
    "h1": "Modelo 030: quién lo usa para cambiar de domicilio y en qué plazo",
    "title": "Modelo 030: quién lo usa para cambiar de domicilio y en qué plazo",
    "description": "Cambio de domicilio fiscal ante AEAT: modelo 030 para personas fuera del censo empresarial, plazo de tres meses y excepción de Renta; cuándo corresponde el 036.",
    "lead": "Para cambiar el domicilio fiscal ante la AEAT, una persona física que no figure en el Censo de Empresarios, Profesionales y Retenedores utiliza el modelo 030. Si pertenece a ese censo, debe comunicar este cambio mediante el modelo 036. El padrón municipal no sustituye la comunicación fiscal que corresponda.",
    "reviewedAt": "2026-09-16",
    "cta": {
      "href": "https://sede.agenciatributaria.gob.es/Sede/procedimientoini/G321.shtml",
      "label": "Consultar el trámite oficial del modelo 030"
    },
    "related": [
      {
        "href": "/modelo-030-cambio-domicilio",
        "label": "Preparar y presentar el formulario"
      },
      {
        "href": "/empadronarse/cambio-de-domicilio",
        "label": "Actualizar el padrón"
      },
      {
        "href": "/mudanza",
        "label": "Otros trámites tras mudarte"
      }
    ],
    "sources": [
      {
        "href": "https://sede.agenciatributaria.gob.es/Sede/censos-nif-domicilio-fiscal/censos/modelo-030-censo_____de-domicilio-variacion-personales_/instrucciones.html",
        "label": "AEAT: quién utiliza el modelo 030 y presentación en papel"
      },
      {
        "href": "https://sede.agenciatributaria.gob.es/Sede/censos-nif-domicilio-fiscal/tramites-censales-relacionados-datos-personales-domicilio/preguntas-frecuentes-modelo-030/domicilio-fiscal.html",
        "label": "AEAT: plazo y excepción de Renta"
      },
      {
        "href": "https://sede.agenciatributaria.gob.es/Sede/censos-nif-domicilio-fiscal/tramites-censales-relacionados-empresarios-profesionales-retenedores/preguntas-frecuentes-modelos-036-037/modificaciones-censales.html",
        "label": "AEAT: cambio de domicilio mediante modelo 036"
      },
      {
        "href": "https://sede.agenciatributaria.gob.es/Sede/ayuda/consultas-informaticas/presentacion-declaraciones-ayuda-tecnica/modelo-030/presentacion-electronica-modelo-030.html",
        "label": "AEAT: presentación electrónica y justificante"
      }
    ],
    "sections": [
      {
        "id": "modelo",
        "title": "Comprobar si corresponde el 030",
        "paragraphs": [
          "Esta guía se refiere al cambio de domicilio de personas físicas ante la AEAT. Las instrucciones del 030 excluyen, para ese cambio, a quienes desarrollan actividades empresariales o profesionales o satisfacen rendimientos sujetos a retención. Consulta el procedimiento de la Administración tributaria competente si tu caso se tramita ante una Hacienda foral.",
          "Que una persona del censo empresarial pueda usar el 030 para ciertos datos identificativos o estado civil no convierte ese modelo en la vía de su cambio de domicilio. La AEAT remite ese cambio al 036."
        ]
      },
      {
        "id": "plazo",
        "title": "Tres meses y excepción vinculada a Renta",
        "paragraphs": [
          "El plazo para comunicar el domicilio mediante el 030 es de tres meses desde el cambio. Si antes termina el plazo de la declaración de IRPF que debes presentar después de mudarte, comunícalo en esa declaración, salvo que ya lo hayas comunicado.",
          "Para quienes deben utilizar el 036, la regla general de modificación es un mes desde el día siguiente al cambio. No esperes a una cita de DNI para atender el plazo fiscal."
        ]
      },
      {
        "id": "presentar",
        "title": "Presentar y comprobar el resultado",
        "paragraphs": [
          "La AEAT ofrece presentación electrónica y en papel. En papel, sus instrucciones contemplan entrega en la oficina correspondiente o correo certificado. Revisa las instrucciones vigentes, identificación y documentación de tu supuesto antes de elegir el canal.",
          "En internet, valida los datos y completa la firma y envío. Guarda la respuesta y su CSV. Un borrador no acredita presentación, y los datos no se reflejan necesariamente de inmediato: la AEAT indica que se actualizan después de validarlos."
        ]
      },
      {
        "id": "registros",
        "title": "Padrón y domicilio para notificaciones",
        "paragraphs": [
          "El 030 no es el padrón y no actualiza el DNI ni los vehículos. Comprueba también si tienes un domicilio específico para notificaciones. Utiliza las guías de cada registro y conserva sus justificantes."
        ]
      }
    ]
  },

];
