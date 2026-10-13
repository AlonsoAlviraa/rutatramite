import type { Guide } from "@/lib/tramites/types";

export const MODELOS_TRABAJO: Guide[] = [
  {
    "id": "modelo-baja-voluntaria",
    "pack": "modelos",
    "path": "/modelo-baja-voluntaria",
    "h1": "Carta de baja voluntaria: comprobar preaviso y elegir modelo",
    "title": "Carta de baja voluntaria: comprobar preaviso y elegir modelo",
    "description": "Tres modelos de baja voluntaria con plazo adaptable. El artículo 49.1.d remite al convenio o costumbre; quince días no es una regla nacional supletoria.",
    "lead": "Antes de comunicar una baja voluntaria, comprueba el preaviso que exige tu convenio o la costumbre aplicable y revisa las cláusulas válidas del contrato. El Estatuto no establece quince días como plazo universal ni como solución automática cuando el convenio guarda silencio. Las tres cartas permiten completar el plazo que hayas comprobado.",
    "reviewedAt": "2026-09-16",
    "cta": {
      "href": "https://www.boe.es/buscar/act.php?id=BOE-A-2015-11430",
      "label": "Consultar el Estatuto de los Trabajadores"
    },
    "disclaimer": "No somos Administración. Comprueba convenio, contrato, documentos y plazos antes de usar la plantilla. Para decidir una salida o impugnar un cese, solicita asesoramiento laboral sobre tu caso.",
    "sources": [
      {
        "href": "https://www.boe.es/buscar/act.php?id=BOE-A-2015-11430#a49",
        "label": "BOE: dimisión y liquidación"
      },
      {
        "href": "https://www.boe.es/buscar/act.php?id=BOE-A-2015-11430#a3",
        "label": "BOE: contrato, convenio y derechos indisponibles"
      },
      {
        "href": "https://www.sepe.es/HomeSepe/preguntas-frecuentes/detalle-pregunta.html?detail=%2Fpreguntas%2Fprestaciones-por-desempleo%2Fremision-electronica-de-datos-de-trabajadores--CERTIFIC-2-%2Fla-empresa-debe-enviar-el-certificado-de-empresa-al-servicio-publico-de-empleo-estatal-si-la-persona-trabajadora-causa-baja-voluntaria",
        "label": "SEPE: certificado incluso con baja voluntaria"
      },
      {
        "href": "https://sepe.es/HomeSepe/prestaciones-desempleo/situacion-legal-desempleo.html",
        "label": "SEPE: situación legal de desempleo"
      }
    ],
    "related": [
      {
        "href": "/baja-periodo-de-prueba",
        "label": "Salida durante la prueba"
      },
      {
        "href": "/modelo-finiquito",
        "label": "Pedir liquidación desglosada"
      },
      {
        "href": "/he-firmado-finiquito-puedo-reclamar",
        "label": "Revisar firma y plazos"
      },
      {
        "href": "/certificado-empresa-sepe",
        "label": "Certificado de empresa"
      }
    ],
    "sections": [
      {
        "id": "plazo",
        "title": "Determinar el preaviso",
        "paragraphs": [
          "El artículo 49.1.d remite a los convenios colectivos o a la costumbre del lugar. El contrato debe respetar la ley y el convenio: una cláusula no es válida solo por estar firmada. Si no identificas el plazo, contrástalo antes de elegir la fecha de efectos.",
          "Si te corresponde un preaviso de 15 días, comprueba también si se computa en días naturales o hábiles. No uses ese número por defecto. Conserva prueba de la comunicación, su contenido y recepción por la empresa."
        ]
      },
      {
        "id": "tres-tonos",
        "title": "Tres tonos: seco, cordial y por email",
        "paragraphs": [
          "Completa fechas y plazo antes de firmar. La carta debe expresar tu decisión real: no la uses para documentar como voluntario un cese decidido por la empresa."
        ],
        "models": [
          {
            "id": "seco",
            "title": "Tono seco",
            "body": "[Lugar], [fecha]\nA [empresa / personal]\n\nComunico mi baja voluntaria con efectos de [fecha del último día], conforme al artículo 49.1.d del Estatuto de los Trabajadores.\nPreaviso comprobado: [plazo y norma o base aplicable].\nSolicito liquidación desglosada y la documentación de cese, incluido el envío del certificado de empresa con la causa real.\n\n[Nombre, identificación y firma]"
          },
          {
            "id": "cordial",
            "title": "Tono cordial",
            "body": "[Lugar], [fecha]\nEstimado/a [responsable]:\n\nComunico mi decisión de causar baja voluntaria el [fecha], aplicando el preaviso de [plazo comprobado].\nAgradezco la colaboración y propongo coordinar el traspaso hasta esa fecha. Solicito liquidación desglosada y documentación del cese con sus datos reales.\n\n[Nombre, identificación y firma]"
          },
          {
            "id": "por-email",
            "title": "Tono por email",
            "body": "Para: [dirección de personal]\nAsunto: Comunicación de baja voluntaria — [nombre]\n\nComunico mi baja voluntaria con efectos de [fecha]. El preaviso aplicado es [plazo y base comprobados].\nRuego confirmar la recepción de esta comunicación y facilitar liquidación y documentación del cese.\n\n[Nombre, identificación y puesto]"
          }
        ]
      },
      {
        "id": "despues",
        "title": "Liquidación y certificado",
        "paragraphs": [
          "La baja voluntaria ordinaria no genera situación legal de desempleo por ese cese. La empresa debe enviar el certificado de empresa también en este caso: el documento y el derecho a la prestación son cuestiones distintas.",
          "Pide el desglose del finiquito y revisa salario, vacaciones y demás conceptos devengados. El artículo 49.2 permite solicitar la presencia de un representante legal de los trabajadores al firmar el recibo. No declares recibido un dinero que aún no has cobrado."
        ]
      }
    ]
  },
  {
    "id": "baja-voluntaria-sin-preaviso",
    "pack": "modelos",
    "path": "/baja-voluntaria-sin-preaviso",
    "h1": "Baja voluntaria sin preaviso: revisar el descuento y pedir el desglose",
    "title": "Baja voluntaria sin preaviso: revisar el descuento y pedir el desglose",
    "description": "Comprueba preaviso exigible, fundamento y cálculo de cualquier descuento. Modelo de comunicación inmediata sin aceptar una penalización automática.",
    "lead": "Salir sin completar el preaviso puede generar una controversia económica, pero el Estatuto no fija un descuento automático de un día de salario por cada día omitido para todos los casos. Comprueba primero el plazo exigible y la regla que la empresa invoca para reclamar o descontar una cantidad.",
    "reviewedAt": "2026-09-16",
    "cta": {
      "href": "https://www.boe.es/buscar/act.php?id=BOE-A-2015-11430",
      "label": "Consultar el Estatuto de los Trabajadores"
    },
    "disclaimer": "No somos Administración. Comprueba convenio, contrato, documentos y plazos antes de usar la plantilla. Para decidir una salida o impugnar un cese, solicita asesoramiento laboral sobre tu caso.",
    "sources": [
      {
        "href": "https://www.boe.es/buscar/act.php?id=BOE-A-2015-11430#a49",
        "label": "BOE: dimisión y liquidación"
      },
      {
        "href": "https://www.boe.es/buscar/act.php?id=BOE-A-2015-11430#a3",
        "label": "BOE: contrato, convenio y derechos indisponibles"
      },
      {
        "href": "https://www.boe.es/buscar/act.php?id=BOE-A-2015-11430#a14",
        "label": "BOE: periodo de prueba"
      },
      {
        "href": "https://www.boe.es/buscar/act.php?id=BOE-A-2015-11430#a50",
        "label": "BOE: solicitud de extinción por incumplimiento empresarial"
      }
    ],
    "related": [
      {
        "href": "/modelo-baja-voluntaria",
        "label": "Comunicar una baja voluntaria"
      },
      {
        "href": "/baja-periodo-de-prueba",
        "label": "Salida durante la prueba"
      },
      {
        "href": "/modelo-finiquito",
        "label": "Pedir liquidación desglosada"
      },
      {
        "href": "/he-firmado-finiquito-puedo-reclamar",
        "label": "Revisar firma y plazos"
      },
      {
        "href": "/certificado-empresa-sepe",
        "label": "Certificado de empresa"
      }
    ],
    "sections": [
      {
        "id": "descuento",
        "title": "Separar obligación de preavisar y consecuencia económica",
        "paragraphs": [
          "Pide el precepto de convenio, cláusula válida u otra base alegada, el número de días, salario utilizado y operación de cálculo. Que exista obligación de preaviso no demuestra por sí solo que cualquier deducción sea correcta. Compara pagos, devengos y descuentos por separado.",
          "Una cláusula contractual debe respetar las normas y el convenio. No aceptes un descuento solo porque aparece en el finiquito; tampoco afirmes que toda compensación por falta de preaviso es inválida sin revisar el caso."
        ]
      },
      {
        "id": "supuesto",
        "title": "Comprobar por qué termina la relación",
        "paragraphs": [
          "Durante un periodo de prueba válido rige el artículo 14; revisa vigencia y condiciones antes de tratar el cese como dimisión ordinaria. La ausencia de preaviso legal general en prueba no permite ignorar sin examen cualquier pacto aplicable.",
          "Si alegas incumplimiento grave empresarial, la solicitud de extinción del artículo 50 tiene requisitos y cauce propios. No la conviertas en una baja voluntaria inmediata por cambiar el título de la carta. Solicita asesoramiento antes de dejar el puesto por esa causa."
        ]
      },
      {
        "id": "modelo",
        "title": "Comunicación inmediata y petición de liquidación",
        "paragraphs": [
          "Utiliza el escrito únicamente si has decidido dimitir. Pide confirmación de recepción y conserva copia. Distingue la baja voluntaria ordinaria de un despido o de una extinción judicial."
        ],
        "models": [
          {
            "id": "sin-preaviso",
            "title": "Baja inmediata y solicitud de fundamento del descuento",
            "body": "[Lugar], [fecha]\nA [empresa]\n\nComunico mi baja voluntaria con efectos de [fecha]. No completaré el preaviso de [plazo que corresponda].\nSolicito la liquidación desglosada de salarios, pagas, vacaciones y demás conceptos. Si se aplica un descuento, ruego indicar su fundamento, días, base salarial y cálculo.\nEsta petición no supone conformidad con un descuento no revisado ni declara recibido un importe pendiente de pago.\n\n[Nombre, identificación y firma]"
          }
        ]
      }
    ]
  },
  {
    "id": "baja-periodo-de-prueba",
    "pack": "modelos",
    "path": "/baja-periodo-de-prueba",
    "h1": "Baja durante el periodo de prueba: validez, preaviso y desempleo",
    "title": "Baja durante el periodo de prueba: validez, preaviso y desempleo",
    "description": "Comprueba pacto escrito, duración y funciones previas antes de desistir en prueba. Modelo del trabajador y diferencias con el cese decidido por la empresa.",
    "lead": "El artículo 14 permite resolver la relación durante un periodo de prueba válido. Comprueba que se pactó por escrito, que no ha terminado y que respeta los límites aplicables. El Estatuto no fija para esa resolución un preaviso general; revisa cualquier pacto aplicable antes de comunicar efectos inmediatos.",
    "reviewedAt": "2026-09-16",
    "cta": {
      "href": "https://www.boe.es/buscar/act.php?id=BOE-A-2015-11430",
      "label": "Consultar el Estatuto de los Trabajadores"
    },
    "disclaimer": "No somos Administración. Comprueba convenio, contrato, documentos y plazos antes de usar la plantilla. Para decidir una salida o impugnar un cese, solicita asesoramiento laboral sobre tu caso.",
    "sources": [
      {
        "href": "https://www.boe.es/buscar/act.php?id=BOE-A-2015-11430#a14",
        "label": "BOE: pacto y límites del periodo de prueba"
      },
      {
        "href": "https://sepe.es/HomeSepe/prestaciones-desempleo/situacion-legal-desempleo.html",
        "label": "SEPE: cese empresarial en prueba y empleo anterior"
      },
      {
        "href": "https://www.sepe.es/HomeSepe/preguntas-frecuentes/detalle-pregunta.html?detail=%2Fpreguntas%2Fprestaciones-por-desempleo%2Fremision-electronica-de-datos-de-trabajadores--CERTIFIC-2-%2Fla-empresa-debe-enviar-el-certificado-de-empresa-al-servicio-publico-de-empleo-estatal-si-la-persona-trabajadora-causa-baja-voluntaria",
        "label": "SEPE: certificado tras salida voluntaria"
      }
    ],
    "related": [
      {
        "href": "/modelo-baja-voluntaria",
        "label": "Comunicar una baja voluntaria"
      },
      {
        "href": "/modelo-finiquito",
        "label": "Pedir liquidación desglosada"
      },
      {
        "href": "/he-firmado-finiquito-puedo-reclamar",
        "label": "Revisar firma y plazos"
      },
      {
        "href": "/certificado-empresa-sepe",
        "label": "Certificado de empresa"
      }
    ],
    "sections": [
      {
        "id": "validez",
        "title": "Comprobar que realmente sigues en prueba",
        "paragraphs": [
          "El pacto es nulo si ya desempeñaste antes las mismas funciones en la empresa bajo cualquier modalidad contractual. La duración depende del convenio y de los límites legales; no basta con que la empresa llame «prueba» a los primeros meses.",
          "El artículo 14 contempla interrupciones del cómputo por determinadas situaciones si existe acuerdo entre ambas partes. Una baja médica no amplía automáticamente cualquier prueba. Si el periodo ya terminó o el pacto no es válido, revisa la naturaleza real del cese."
        ]
      },
      {
        "id": "decision",
        "title": "Quién decide el cese importa",
        "paragraphs": [
          "Si desistes tú voluntariamente, no hay prestación por desempleo por ese cese ordinario. No firmes una carta de desistimiento tuyo si quien decide finalizar es la empresa.",
          "Para el cese en prueba a instancia empresarial, el SEPE exige que la relación anterior terminase en situación legal de desempleo o que hayan transcurrido tres meses desde su extinción, además de los restantes requisitos. No basta con cambiar de empresa después de dimitir para asegurar el paro.",
          "La resolución empresarial tampoco permite discriminación: el artículo 14 recoge protección por embarazo o maternidad. Esta plantilla está dirigida a la decisión de la persona trabajadora, no a justificar cualquier decisión empresarial."
        ]
      },
      {
        "id": "modelo",
        "title": "Modelo del trabajador",
        "paragraphs": [
          "Puede producirse sin preaviso legal general, pero completa la fecha después de revisar el pacto y la prueba. Solicita los conceptos devengados y el certificado con causa real."
        ],
        "models": [
          {
            "id": "prueba",
            "title": "Desistimiento del trabajador durante una prueba válida",
            "body": "[Lugar], [fecha]\nA [empresa / personal]\n\nComunico mi decisión de desistir de la relación laboral durante el periodo de prueba pactado por escrito el [fecha], con efectos de [fecha], conforme al artículo 14 del Estatuto de los Trabajadores.\nHe comprobado su vigencia y las condiciones aplicables de aviso: [indicar].\nSolicito liquidación de conceptos devengados y documentación de cese con la causa real.\n\n[Nombre, identificación y firma]"
          }
        ]
      }
    ]
  },
  {
    "id": "modelo-finiquito",
    "pack": "modelos",
    "path": "/modelo-finiquito",
    "h1": "Solicitar el finiquito: desglose, pago y firma",
    "title": "Solicitar el finiquito: desglose, pago y firma",
    "description": "Modelo para pedir liquidación detallada, comprobar cantidades y solicitar presencia de un representante de los trabajadores al firmar.",
    "lead": "Pide una liquidación desglosada y comprueba qué cantidades se han pagado realmente antes de firmar. El finiquito y una eventual indemnización por extinción son conceptos distintos. La frase «no conforme» no sustituye la revisión del documento ni conserva por sí sola los plazos para reclamar.",
    "reviewedAt": "2026-09-16",
    "cta": {
      "href": "https://www.boe.es/buscar/act.php?id=BOE-A-2015-11430",
      "label": "Consultar el Estatuto de los Trabajadores"
    },
    "disclaimer": "No somos Administración. Comprueba convenio, contrato, documentos y plazos antes de usar la plantilla. Para decidir una salida o impugnar un cese, solicita asesoramiento laboral sobre tu caso.",
    "sources": [
      {
        "href": "https://www.boe.es/buscar/act.php?id=BOE-A-2015-11430#a49",
        "label": "BOE: dimisión y liquidación"
      },
      {
        "href": "https://www.boe.es/buscar/act.php?id=BOE-A-2015-11430#a3",
        "label": "BOE: contrato, convenio y derechos indisponibles"
      },
      {
        "href": "https://www.boe.es/buscar/act.php?id=BOE-A-2015-11430#a59",
        "label": "BOE: prescripción y caducidad"
      },
      {
        "href": "https://www.boe.es/buscar/act.php?id=BOE-A-2011-15936#a65",
        "label": "BOE: efectos de la conciliación"
      }
    ],
    "related": [
      {
        "href": "/modelo-baja-voluntaria",
        "label": "Comunicar una baja voluntaria"
      },
      {
        "href": "/baja-periodo-de-prueba",
        "label": "Salida durante la prueba"
      },
      {
        "href": "/he-firmado-finiquito-puedo-reclamar",
        "label": "Revisar firma y plazos"
      },
      {
        "href": "/certificado-empresa-sepe",
        "label": "Certificado de empresa"
      }
    ],
    "sections": [
      {
        "id": "desglose",
        "title": "Revisar conceptos y evitar duplicidades",
        "paragraphs": [
          "Comprueba salarios pendientes, parte devengada de pagas extraordinarias si no está ya abonada o prorrateada, vacaciones pendientes y otros conceptos que correspondan. Pide fundamento y cálculo separado de cada descuento y de cualquier indemnización.",
          "Distingue importe bruto, deducciones, líquido y pagos ya realizados. No declares cobrado un importe por el mero hecho de recibir una propuesta de liquidación. Guarda nóminas, transferencia y copia del documento."
        ]
      },
      {
        "id": "firma",
        "title": "Asistencia y alcance de la firma",
        "paragraphs": [
          "El artículo 49.2 permite pedir la presencia de un representante legal de los trabajadores al firmar el recibo del finiquito. Si la empresa impide su presencia, puede hacerse constar en el recibo.",
          "El artículo 3.5 protege derechos indisponibles, pero no convierte cualquier acuerdo firmado en ineficaz. El alcance depende de su contenido y circunstancias. Expresa las discrepancias concretas y solicita revisión laboral antes de aceptar una transacción o una renuncia cuya consecuencia no comprendes."
        ]
      },
      {
        "id": "modelo",
        "title": "Solicitud de liquidación detallada",
        "paragraphs": [
          "Esta carta pide información y cantidades. No sustituye conciliación o demanda ni suspende automáticamente un plazo de despido."
        ],
        "models": [
          {
            "id": "solicitud-finiquito",
            "title": "Petición de finiquito desglosado",
            "body": "[Lugar], [fecha]\nA [empresa / personal]\n\nTras el cese con efectos de [fecha], solicito propuesta de liquidación detallada: conceptos, periodos, importes brutos, deducciones, pagos anteriores y líquido pendiente.\nRuego indicar separadamente fundamento y cálculo de descuentos e indemnización, si procede.\n[Si se desea: solicito presencia de un representante legal de los trabajadores al firmar el recibo.]\nEsta solicitud no declara cobrado ningún importe pendiente ni acepta conceptos discutidos.\n\n[Nombre, identificación y firma]"
          }
        ]
      }
    ]
  },
  {
    "id": "he-firmado-finiquito-puedo-reclamar",
    "pack": "modelos",
    "path": "/he-firmado-finiquito-puedo-reclamar",
    "h1": "He firmado el finiquito: revisar lo firmado y los plazos para reclamar",
    "title": "He firmado el finiquito: revisar lo firmado y los plazos para reclamar",
    "description": "Comprueba conceptos, pago y efectos de la firma. Distingue un año para cantidades y veinte días hábiles para despido; conciliación y carta a la empresa.",
    "lead": "Firmar un finiquito no permite concluir por sí solo que toda reclamación esté cerrada ni que siempre puedas recuperar lo que pidas. Reúne el documento y los pagos y revisa qué se acordó. Si cuestionas un despido, atiende de inmediato al plazo de veinte días hábiles; no esperes una respuesta de la empresa para comprobarlo.",
    "reviewedAt": "2026-09-16",
    "cta": {
      "href": "https://www.boe.es/buscar/act.php?id=BOE-A-2015-11430",
      "label": "Consultar el Estatuto de los Trabajadores"
    },
    "disclaimer": "No somos Administración. Comprueba convenio, contrato, documentos y plazos antes de usar la plantilla. Para decidir una salida o impugnar un cese, solicita asesoramiento laboral sobre tu caso.",
    "sources": [
      {
        "href": "https://www.boe.es/buscar/act.php?id=BOE-A-2015-11430#a49",
        "label": "BOE: dimisión y liquidación"
      },
      {
        "href": "https://www.boe.es/buscar/act.php?id=BOE-A-2015-11430#a3",
        "label": "BOE: contrato, convenio y derechos indisponibles"
      },
      {
        "href": "https://www.boe.es/buscar/act.php?id=BOE-A-2015-11430#a59",
        "label": "BOE: plazo de cantidades"
      },
      {
        "href": "https://www.boe.es/buscar/act.php?id=BOE-A-2011-15936#a103",
        "label": "BOE: veinte días hábiles para despido"
      },
      {
        "href": "https://www.boe.es/buscar/act.php?id=BOE-A-2011-15936#a65",
        "label": "BOE: suspensión y reanudación por conciliación"
      }
    ],
    "related": [
      {
        "href": "/modelo-baja-voluntaria",
        "label": "Comunicar una baja voluntaria"
      },
      {
        "href": "/baja-periodo-de-prueba",
        "label": "Salida durante la prueba"
      },
      {
        "href": "/modelo-finiquito",
        "label": "Pedir liquidación desglosada"
      },
      {
        "href": "/certificado-empresa-sepe",
        "label": "Certificado de empresa"
      }
    ],
    "sections": [
      {
        "id": "documentos",
        "title": "Qué revisar del finiquito",
        "paragraphs": [
          "Comprueba conceptos, importes, fecha, pagos y manifestaciones de conformidad o discrepancia. La indisponibilidad de ciertos derechos del artículo 3.5 no elimina automáticamente cualquier acuerdo válido. No afirmes que la firma carece de efectos sin examinar el documento.",
          "Conserva pruebas de circunstancias que puedan afectar al consentimiento y explica las discrepancias concretas a quien revise tu caso. No haber escrito «no conforme» no resuelve por sí solo la cuestión; haberlo escrito tampoco garantiza ganar la reclamación."
        ]
      },
      {
        "id": "plazos",
        "title": "Separar prescripción y caducidad",
        "paragraphs": [
          "Para percepciones económicas, el artículo 59.2 cuenta el año desde que cada acción pudo ejercitarse: no desde que decidas revisar el finiquito. Para despido, el artículo 103 de la LRJS establece veinte días hábiles, excluyendo sábados, domingos y festivos en la sede judicial.",
          "Según el artículo 65 LRJS, presentar conciliación o mediación interrumpe la prescripción y suspende la caducidad. El plazo de despido se reanuda con los días restantes, no con veinte días nuevos, al día siguiente de intentado el acto o de transcurridos quince días hábiles sin celebrarse.",
          "Los treinta días hábiles del apartado 2 para tener por terminado el trámite no son treinta días de suspensión del plazo de despido. Una carta a la empresa no sustituye la papeleta ni suspende por sí sola esa caducidad. Comprueba el trámite exigible y sus excepciones con asesoramiento laboral."
        ]
      },
      {
        "id": "modelo",
        "title": "Reclamación de cantidades a la empresa",
        "paragraphs": [
          "Puede documentar la discrepancia; no es requisito para esperar antes de actuar por la vía correspondiente. No incluye un plazo de espera que consuma tu plazo judicial."
        ],
        "models": [
          {
            "id": "reclamo-finiquito",
            "title": "Reclamación de conceptos concretos",
            "body": "[Lugar], [fecha]\nA [empresa]\n\nEl [fecha] firmé el documento de liquidación relativo al cese de [fecha]. Discrepo de [conceptos e importes] por [razones concretas].\nPagos recibidos: [detalle]. Cantidad que reclamo: [importe y cálculo]. Documentos de apoyo: [lista].\nSolicito revisión y abono de la cantidad que corresponda y respuesta escrita. Esta comunicación no implica renuncia a acciones ni sustituye los trámites y plazos legales aplicables.\n\n[Nombre, identificación y firma]"
          }
        ]
      }
    ]
  },
  {
    "id": "certificado-empresa-sepe",
    "pack": "modelos",
    "path": "/certificado-empresa-sepe",
    "h1": "Certificado de empresa para el SEPE: también tras baja voluntaria",
    "title": "Certificado de empresa para el SEPE: también tras baja voluntaria",
    "description": "La empresa debe enviar el certificado incluso tras una baja voluntaria. Distingue documento y derecho al paro, vacaciones pendientes y falta de documentación.",
    "lead": "La empresa debe enviar el certificado al SEPE también cuando causas baja voluntaria, aunque no solicites prestación o esta sea denegada. El documento recoge los datos del cese; no concede por sí solo el paro. Tras una baja voluntaria ordinaria no hay prestación por ese cese, mientras que un despido o fin de contrato exige comprobar los demás requisitos.",
    "reviewedAt": "2026-09-16",
    "cta": {
      "href": "https://sede.sepe.gob.es/portalSede/procedimientos-y-servicios/personas/proteccion-por-desempleo/certificados-empresa.html",
      "label": "Consultar certificados en la sede del SEPE"
    },
    "disclaimer": "No somos Administración. Comprueba convenio, contrato, documentos y plazos antes de usar la plantilla. Para decidir una salida o impugnar un cese, solicita asesoramiento laboral sobre tu caso.",
    "sources": [
      {
        "href": "https://www.sepe.es/HomeSepe/preguntas-frecuentes/detalle-pregunta.html?detail=%2Fpreguntas%2Fprestaciones-por-desempleo%2Fremision-electronica-de-datos-de-trabajadores--CERTIFIC-2-%2Fla-empresa-debe-enviar-el-certificado-de-empresa-al-servicio-publico-de-empleo-estatal-si-la-persona-trabajadora-causa-baja-voluntaria",
        "label": "SEPE: obligación de enviar tras baja voluntaria"
      },
      {
        "href": "https://sede.sepe.gob.es/portalSede/procedimientos-y-servicios/personas/proteccion-por-desempleo/certificados-empresa.html",
        "label": "SEPE: consultar certificados enviados"
      },
      {
        "href": "https://www.sepe.es/HomeSepe/prestaciones-desempleo/prestacion-contributiva/prestacion-contributiva-mas-de-un-anyo.html",
        "label": "SEPE: prestación contributiva y vacaciones pendientes"
      },
      {
        "href": "https://www.sepe.es/HomeSepe/es/preguntas-frecuentes/preguntas-frecuentes-prestaciones-desempleo.html",
        "label": "SEPE: falta de certificado y carencia de documentación"
      }
    ],
    "related": [
      {
        "href": "/modelo-baja-voluntaria",
        "label": "Comunicar una baja voluntaria"
      },
      {
        "href": "/baja-periodo-de-prueba",
        "label": "Salida durante la prueba"
      },
      {
        "href": "/modelo-finiquito",
        "label": "Pedir liquidación desglosada"
      },
      {
        "href": "/he-firmado-finiquito-puedo-reclamar",
        "label": "Revisar firma y plazos"
      }
    ],
    "sections": [
      {
        "id": "envio",
        "title": "Envío y datos que debes comprobar",
        "paragraphs": [
          "El SEPE establece el envío electrónico por Certific@2 como regla. Si excepcionalmente no es posible, sus preguntas frecuentes contemplan entrega del modelo oficial al trabajador. Comprueba causa y fecha real del cese, cotizaciones y vacaciones retribuidas pendientes.",
          "Puedes consultar los certificados enviados mediante el servicio oficial. Pide corregir errores, pero no una causa ficticia para obtener una prestación. La carta de esta página solicita documentación, no la concesión del desempleo."
        ]
      },
      {
        "id": "plazo",
        "title": "Solicitud de prestación contributiva",
        "paragraphs": [
          "Si reúnes los requisitos, el plazo general es de quince días hábiles después del último día trabajado. Cuando se abonan vacaciones no disfrutadas, se cuenta desde que termina el periodo equivalente a esas vacaciones; deben constar en el certificado.",
          "No esperes indefinidamente a la empresa. Si se niega a entregar documentación o ha desaparecido, el SEPE indica solicitar la prestación acompañando la declaración de carencia de documentación. Consulta su cauce y cumple el plazo aplicable; reclamar el certificado a la empresa no sustituye esa solicitud."
        ]
      },
      {
        "id": "modelo",
        "title": "Petición válida también tras dimisión",
        "paragraphs": [
          "Indica la causa real, incluida la baja voluntaria cuando proceda. No declares que el certificado garantiza prestación."
        ],
        "models": [
          {
            "id": "cert-empresa",
            "title": "Solicitud de envío y copia del certificado",
            "body": "[Lugar], [fecha]\nA [empresa / personal]\n\nTras el cese de [fecha] por [causa real, incluida baja voluntaria si corresponde], solicito el envío del certificado de empresa al SEPE por el cauce oficial y confirmación de su remisión o copia.\nRuego comprobar fechas, cotizaciones, causa del cese y vacaciones retribuidas no disfrutadas.\nEsta solicitud se refiere a la documentación del cese y no presupone derecho a prestación.\n\n[Nombre, identificación y firma]"
          }
        ]
      }
    ]
  },
  {
    "id": "modelo-excedencia-voluntaria",
    "pack": "modelos",
    "path": "/modelo-excedencia-voluntaria",
    "h1": "Solicitar excedencia voluntaria: requisitos y reingreso",
    "title": "Solicitar excedencia voluntaria: requisitos y reingreso",
    "description": "Un año de antigüedad, duración de cuatro meses a cinco años y cuatro años desde el fin de una excedencia anterior. Modelo y límites del reingreso.",
    "lead": "La excedencia voluntaria ordinaria exige un año de antigüedad y dura entre cuatro meses y cinco años. Para volver a ejercer este derecho deben haber pasado cuatro años desde el final de la anterior excedencia voluntaria. Conservas preferencia de reingreso en vacantes de igual o similar categoría, sin reserva general del mismo puesto.",
    "reviewedAt": "2026-09-16",
    "cta": {
      "href": "https://www.boe.es/buscar/act.php?id=BOE-A-2015-11430#a46",
      "label": "Consultar artículo 46 del Estatuto"
    },
    "disclaimer": "Plantilla orientativa para relaciones laborales sujetas al Estatuto de los Trabajadores. Comprueba el convenio y los hechos del caso. No somos Administración ni presentamos la solicitud por ti.",
    "sources": [
      {
        "href": "https://www.boe.es/buscar/act.php?id=BOE-A-2015-11430#a46",
        "label": "BOE: excedencias y reingreso"
      },
      {
        "href": "https://www.sepe.es/HomeSepe/es/preguntas-frecuentes/preguntas-frecuentes-prestaciones-desempleo.html",
        "label": "SEPE: excedencia y desempleo"
      }
    ],
    "related": [
      {
        "href": "/modelos",
        "label": "Modelos y cartas"
      },
      {
        "href": "/modelo-reduccion-jornada",
        "label": "Reducción de jornada"
      },
      {
        "href": "/solicitud-vacaciones",
        "label": "Vacaciones"
      },
      {
        "href": "/reclamacion-salarios-modelo",
        "label": "Reclamar salarios"
      }
    ],
    "sections": [
      {
        "id": "requisitos",
        "title": "Comprobar modalidad, fechas y convenio",
        "paragraphs": [
          "Esta plantilla se refiere al artículo 46.2, no a la excedencia por cuidado de familiares del apartado 3, que tiene otro régimen. Comprueba antigüedad, duración y, si ya disfrutaste otra, fecha de finalización.",
          "El artículo 46.2 no fija un preaviso general de quince o treinta días. Revisa el convenio para solicitud y reingreso y pide respuesta escrita. No trates el silencio como autorización automática para dejar de acudir al trabajo."
        ]
      },
      {
        "id": "reingreso",
        "title": "Preparar el reingreso y distinguir desempleo",
        "paragraphs": [
          "Solicita el reingreso antes de finalizar el periodo y cumple el plazo del convenio aplicable. El artículo 46.5 limita la preferencia a vacantes de igual o similar categoría. Conserva solicitud y respuesta; una falta de vacante y una negativa definitiva del vínculo necesitan valoración distinta.",
          "La excedencia por sí sola no da derecho al paro. Si trabajas después para otra empresa y cesas, el SEPE distingue la causa del cese, la duración pendiente y la respuesta a la solicitud de reingreso. No deduzcas el derecho a prestación solo de estar en excedencia."
        ]
      },
      {
        "id": "modelo",
        "title": "Solicitud con fechas comprobadas",
        "paragraphs": [
          "Adapta los campos a la situación real y conserva prueba de entrega."
        ],
        "models": [
          {
            "id": "excedencia",
            "title": "Solicitud de excedencia voluntaria",
            "body": "[Lugar], [fecha]\nA [empresa / Personal]\n\nSolicito excedencia voluntaria del artículo 46.2 ET, desde [inicio] hasta [fin], por [duración entre cuatro meses y cinco años].\nFecha de ingreso en la empresa: [fecha].\n[No he disfrutado excedencia voluntaria anterior / La anterior finalizó el [fecha], hace al menos cuatro años.]\nHe comprobado el preaviso aplicable: [convenio y plazo, si existe].\nSolicito respuesta escrita y conservaré el derecho preferente de reingreso en los términos del artículo 46.5 y del convenio. Solicitaré reingreso antes del fin, con el preaviso aplicable.\n\n[Nombre, identificación y firma]"
          }
        ]
      }
    ]
  },
  {
    "id": "modelo-reduccion-jornada",
    "pack": "modelos",
    "path": "/modelo-reduccion-jornada",
    "h1": "Reducción de jornada por guarda legal: porcentaje y horario",
    "title": "Reducción de jornada por guarda legal: porcentaje y horario",
    "description": "Modelo para cuidado directo de menor de doce años o persona con discapacidad sin actividad retribuida. Límites, jornada diaria, fechas y discrepancias.",
    "lead": "La guarda legal del artículo 37.6 permite reducir la jornada diaria entre un octavo y la mitad, con disminución proporcional del salario, para el cuidado directo de un menor de doce años o de una persona con discapacidad que no desempeñe actividad retribuida. La concreción corresponde a la persona trabajadora dentro de su jornada ordinaria, atendiendo a los criterios del convenio.",
    "reviewedAt": "2026-09-16",
    "cta": {
      "href": "https://www.boe.es/buscar/act.php?id=BOE-A-2015-11430#a37",
      "label": "Consultar artículo 37 del Estatuto"
    },
    "disclaimer": "Plantilla orientativa para relaciones laborales sujetas al Estatuto de los Trabajadores. Comprueba el convenio y los hechos del caso. No somos Administración ni presentamos la solicitud por ti.",
    "sources": [
      {
        "href": "https://www.boe.es/buscar/act.php?id=BOE-A-2015-11430#a37",
        "label": "BOE: guarda legal y preaviso"
      },
      {
        "href": "https://www.boe.es/buscar/act.php?id=BOE-A-2015-11430#a34",
        "label": "BOE: adaptación de jornada"
      },
      {
        "href": "https://www.boe.es/buscar/act.php?id=BOE-A-2011-15936#a139",
        "label": "BOE: discrepancias de conciliación"
      },
      {
        "href": "https://www.boe.es/buscar/act.php?id=BOE-A-2011-15936#a64",
        "label": "BOE: excepción de conciliación previa"
      }
    ],
    "related": [
      {
        "href": "/modelos",
        "label": "Modelos y cartas"
      },
      {
        "href": "/solicitud-vacaciones",
        "label": "Vacaciones"
      },
      {
        "href": "/reclamacion-salarios-modelo",
        "label": "Reclamar salarios"
      }
    ],
    "sections": [
      {
        "id": "alcance",
        "title": "Precisar porcentaje y modalidad",
        "paragraphs": [
          "En este supuesto ordinario, un octavo equivale al 12,5 % y la mitad al 50 %. Indica jornada diaria actual, reducción y horario resultante. No confundas esta reducción con la adaptación de jornada del artículo 34.8 ni con las reducciones especiales por enfermedad grave, que tienen condiciones diferentes.",
          "El artículo 37.6 también contempla otros cuidados con sus propios requisitos. Si dos personas de la misma empresa solicitan por el mismo sujeto causante, una limitación simultánea exige razones objetivas motivadas por escrito y un plan alternativo en los términos legales."
        ]
      },
      {
        "id": "aviso",
        "title": "Fechas, documentación y respuesta",
        "paragraphs": [
          "Salvo fuerza mayor, preavisa quince días o el plazo del convenio, indicando inicio y finalización. Aporta documentación que acredite la guarda y el cuidado, según el supuesto; no hay un único justificante válido para todos.",
          "Ante negativa o disconformidad empresarial, el artículo 139 LRJS establece veinte días desde su comunicación para presentar demanda. El proceso está exceptuado de conciliación o mediación previa obligatoria por el artículo 64. No consumas el plazo esperando una negociación indefinida; revisa su cómputo y cauce."
        ]
      },
      {
        "id": "modelo",
        "title": "Solicitud de guarda legal",
        "paragraphs": [
          "Completa también la fecha de fin y comprueba el porcentaje."
        ],
        "models": [
          {
            "id": "guarda",
            "title": "Solicitud de reducción por guarda legal",
            "body": "[Lugar], [fecha]\nA [empresa / Personal]\n\nSolicito reducción de mi jornada diaria por guarda legal y cuidado directo de [menor de doce años / persona con discapacidad sin actividad retribuida], conforme al artículo 37.6 ET.\nJornada actual: [días y horas]. Reducción: [porcentaje entre 12,5 % y 50 %], con disminución proporcional del salario. Horario resultante dentro de mi jornada ordinaria: [detalle].\nInicio: [fecha]. Finalización: [fecha]. Preaviso aplicado: [quince días o plazo del convenio; si hay fuerza mayor, describir].\nAcredito el supuesto mediante [documentación]. Solicito respuesta escrita sobre cualquier discrepancia.\n\n[Nombre, identificación y firma]"
          }
        ]
      }
    ]
  },
  {
    "id": "solicitud-vacaciones",
    "pack": "modelos",
    "path": "/solicitud-vacaciones",
    "h1": "Solicitar vacaciones: fechas, acuerdo y situaciones de incapacidad",
    "title": "Solicitar vacaciones: fechas, acuerdo y situaciones de incapacidad",
    "description": "Modelo para pedir vacaciones. Conocer fechas con dos meses de antelación, excepciones al año natural y cauce judicial si no hay acuerdo.",
    "lead": "Las fechas se fijan de común acuerdo, conforme a la planificación del convenio, y debes conocer las que te correspondan al menos dos meses antes del disfrute. Ese plazo no es una regla nacional que obligue a presentar cualquier solicitud con dos meses de antelación. Comprueba el procedimiento de tu empresa y convenio.",
    "reviewedAt": "2026-09-16",
    "cta": {
      "href": "https://www.boe.es/buscar/act.php?id=BOE-A-2015-11430#a38",
      "label": "Consultar artículo 38 del Estatuto"
    },
    "disclaimer": "Plantilla orientativa para relaciones laborales sujetas al Estatuto de los Trabajadores. Comprueba el convenio y los hechos del caso. No somos Administración ni presentamos la solicitud por ti.",
    "sources": [
      {
        "href": "https://www.boe.es/buscar/act.php?id=BOE-A-2015-11430#a38",
        "label": "BOE: vacaciones anuales y coincidencias"
      },
      {
        "href": "https://www.boe.es/buscar/act.php?id=BOE-A-2011-15936#a125",
        "label": "BOE: fijación judicial de vacaciones"
      },
      {
        "href": "https://www.boe.es/buscar/act.php?id=BOE-A-2011-15936#a64",
        "label": "BOE: excepción de conciliación previa"
      }
    ],
    "related": [
      {
        "href": "/modelos",
        "label": "Modelos y cartas"
      },
      {
        "href": "/modelo-reduccion-jornada",
        "label": "Reducción de jornada"
      },
      {
        "href": "/reclamacion-salarios-modelo",
        "label": "Reclamar salarios"
      }
    ],
    "sections": [
      {
        "id": "fechas",
        "title": "Duración y confirmación",
        "paragraphs": [
          "El mínimo anual es de treinta días naturales. Comprueba el periodo devengado y cómo expresa el convenio los días antes de calcular tu solicitud; no equipares automáticamente días naturales y laborables. Pide confirmación y conserva el calendario.",
          "La solicitud no equivale por sí sola a acuerdo sobre fechas. El artículo 38 impide sustituir el disfrute por dinero durante la relación laboral; al extinguirse, la liquidación de vacaciones pendientes requiere su cálculo específico."
        ]
      },
      {
        "id": "coincidencias",
        "title": "Cuando coincide con incapacidad o suspensión",
        "paragraphs": [
          "No afirmes que toda vacación pendiente caduca automáticamente el 31 de diciembre. Si coincide con incapacidad derivada de embarazo, parto o lactancia natural, o con las suspensiones de los apartados 4, 5 y 7 del artículo 48, el artículo 38.3 permite disfrutarla en otra fecha al finalizar la suspensión aunque termine el año.",
          "Para otras incapacidades temporales que impidan disfrutarla en el año correspondiente, se permite hacerlo al finalizar la incapacidad siempre que no hayan pasado más de dieciocho meses desde el final del año en que se originó. Revisa la causa y el periodo concreto; no apliques ese límite a todos los supuestos."
        ]
      },
      {
        "id": "conflicto",
        "title": "Si no hay acuerdo",
        "paragraphs": [
          "El artículo 125 LRJS distingue: si la fecha ya está fijada en los supuestos legales, veinte días desde que la conozcas para demandar; si no está señalada, la demanda debe presentarse al menos dos meses antes del disfrute pretendido. Es un plazo procesal distinto del aviso del calendario.",
          "El disfrute de vacaciones está exceptuado de conciliación previa obligatoria por el artículo 64 LRJS. Consulta la vía correspondiente a tiempo en lugar de esperar una respuesta indefinida."
        ]
      },
      {
        "id": "modelo",
        "title": "Solicitud de fechas",
        "paragraphs": [
          "Indica el sistema de cómputo aplicable."
        ],
        "models": [
          {
            "id": "vacaciones",
            "title": "Solicitud de vacaciones",
            "body": "[Lugar], [fecha]\nA [empresa / Personal]\n\nSolicito vacaciones desde [inicio] hasta [fin], ambos inclusive, por [número de días y si son naturales o laborables según convenio], correspondientes al periodo [año / devengo].\nLa propuesta tiene en cuenta [calendario y convenio aplicables].\n[Si procede: solicito nueva fecha por coincidencia con [situación del artículo 38.3], del [inicio] al [fin], con documentación justificativa.]\nSolicito confirmación escrita de las fechas acordadas.\n\n[Nombre, identificación y firma]"
          }
        ]
      }
    ]
  },
  {
    "id": "reclamacion-salarios-modelo",
    "pack": "modelos",
    "path": "/reclamacion-salarios-modelo",
    "h1": "Reclamar salarios pendientes: desglose y prescripción",
    "title": "Reclamar salarios pendientes: desglose y prescripción",
    "description": "Modelo de reclamación de salarios. Un año desde que cada cantidad pudo exigirse; carta, conciliación y demanda tienen funciones distintas.",
    "lead": "Detalla los salarios pendientes por periodos, conceptos y pagos recibidos. El artículo 59.2 cuenta el año desde que cada cantidad pudo reclamarse, no desde el fin del contrato. La carta a la empresa puede acreditar una reclamación extrajudicial; no es un requisito general que obligue a esperar diez días antes de acudir al cauce competente.",
    "reviewedAt": "2026-09-16",
    "cta": {
      "href": "https://www.boe.es/buscar/act.php?id=BOE-A-2015-11430#a59",
      "label": "Consultar artículo 59 del Estatuto"
    },
    "disclaimer": "Plantilla orientativa para relaciones laborales sujetas al Estatuto de los Trabajadores. Comprueba el convenio y los hechos del caso. No somos Administración ni presentamos la solicitud por ti.",
    "sources": [
      {
        "href": "https://www.boe.es/buscar/act.php?id=BOE-A-2015-11430#a59",
        "label": "BOE: prescripción de cantidades"
      },
      {
        "href": "https://www.boe.es/buscar/act.php?id=BOE-A-2015-11430#a29",
        "label": "BOE: pago del salario"
      },
      {
        "href": "https://www.boe.es/buscar/act.php?id=BOE-A-1889-4763#art1973",
        "label": "BOE: interrupción por reclamación extrajudicial"
      },
      {
        "href": "https://www.boe.es/buscar/act.php?id=BOE-A-2011-15936#a63",
        "label": "BOE: conciliación o mediación previa"
      },
      {
        "href": "https://www.boe.es/buscar/act.php?id=BOE-A-2011-15936#a64",
        "label": "BOE: excepciones"
      },
      {
        "href": "https://www.boe.es/buscar/act.php?id=BOE-A-2011-15936#a65",
        "label": "BOE: efectos sobre los plazos"
      }
    ],
    "related": [
      {
        "href": "/modelos",
        "label": "Modelos y cartas"
      },
      {
        "href": "/modelo-reduccion-jornada",
        "label": "Reducción de jornada"
      },
      {
        "href": "/solicitud-vacaciones",
        "label": "Vacaciones"
      }
    ],
    "sections": [
      {
        "id": "cantidades",
        "title": "Dejar una reclamación comprobable",
        "paragraphs": [
          "Separa salario base, complementos, horas extraordinarias y pagos parciales; indica periodos, vencimientos, cantidades y documentos. Conserva nóminas, justificantes y prueba del contenido y recepción de la reclamación.",
          "El artículo 1973 del Código Civil contempla interrupción de la prescripción por reclamación extrajudicial. Su eficacia exige poder acreditar una reclamación concreta; no des por conservado el plazo por redactar o guardar una carta sin comunicarla."
        ]
      },
      {
        "id": "cauce",
        "title": "No confundir carta, conciliación y demanda",
        "paragraphs": [
          "Con carácter general se exige intento de conciliación o mediación antes del proceso laboral, con las excepciones del artículo 64 LRJS. El organismo y canal dependen del territorio; esta plantilla no es su papeleta oficial. La presentación de la solicitud de conciliación interrumpe la prescripción según el artículo 65.",
          "No hay aquí un plazo obligatorio de siete o diez días para esperar a la empresa. Si además discutes un despido, tiene un plazo distinto y la reclamación salarial no lo sustituye. Revisa cada acción antes de dejar pasar días."
        ]
      },
      {
        "id": "modelo",
        "title": "Reclamación de cantidades concretas",
        "paragraphs": [
          "Completa el desglose sin declarar pagos que no has recibido."
        ],
        "models": [
          {
            "id": "salarios",
            "title": "Reclamación de salarios pendientes",
            "body": "[Lugar], [fecha]\nA [empresa]\n\nReclamo [importe] por salarios pendientes:\n- [periodo, concepto, vencimiento e importe].\n- [periodo, concepto, vencimiento e importe].\nPagos parciales recibidos: [detalle]. Total pendiente: [importe]. Documentos de apoyo: [relación].\nSolicito el abono de la cantidad que corresponda y respuesta escrita. Esta comunicación no implica renuncia a acciones ni sustituye los trámites y plazos legales aplicables.\n\n[Nombre, identificación y firma]"
          }
        ]
      }
    ]
  },
  {
    "id": "solicitud-permiso-retribuido",
    "pack": "modelos",
    "path": "/solicitud-permiso-retribuido",
    "h1": "Solicitar permiso retribuido o asuntos propios con causa acreditada",
    "title": "Solicitar permiso retribuido o asuntos propios con causa acreditada",
    "description": "Modelo adaptable a un permiso del Estatuto o del convenio y a asuntos propios reconocidos por convenio o pacto. Causa, duración y aviso.",
    "lead": "Para usar un permiso retribuido, identifica la causa y sus requisitos, la duración y la norma o pacto aplicable. El artículo 37.3 regula varios permisos con aviso y justificación. Los asuntos propios no son un derecho general creado por ese artículo: comprueba si los reconoce el convenio o un pacto aplicable y en qué condiciones.",
    "reviewedAt": "2026-09-16",
    "cta": {
      "href": "https://www.boe.es/buscar/act.php?id=BOE-A-2015-11430#a37",
      "label": "Consultar artículo 37 del Estatuto"
    },
    "disclaimer": "Plantilla orientativa para relaciones laborales sujetas al Estatuto de los Trabajadores. Comprueba el convenio y los hechos del caso. No somos Administración ni presentamos la solicitud por ti.",
    "sources": [
      {
        "href": "https://www.boe.es/buscar/act.php?id=BOE-A-2015-11430#a37",
        "label": "BOE: permisos y fuerza mayor familiar"
      },
      {
        "href": "https://www.boe.es/buscar/act.php?id=BOE-A-2015-11430#a3",
        "label": "BOE: fuentes de la relación laboral"
      }
    ],
    "related": [
      {
        "href": "/modelos",
        "label": "Modelos y cartas"
      },
      {
        "href": "/modelo-reduccion-jornada",
        "label": "Reducción de jornada"
      },
      {
        "href": "/solicitud-vacaciones",
        "label": "Vacaciones"
      },
      {
        "href": "/reclamacion-salarios-modelo",
        "label": "Reclamar salarios"
      }
    ],
    "sections": [
      {
        "id": "causa",
        "title": "Elegir el permiso correcto",
        "paragraphs": [
          "No basta con escribir «accidente de familiar»: hay que comprobar gravedad, hospitalización u otra circunstancia exigida por la letra correspondiente, vínculo y demás requisitos. Traslado de domicilio habitual, fallecimiento y matrimonio o registro de pareja tienen supuestos y duraciones distintos.",
          "La fuerza mayor por motivos familiares urgentes del artículo 37.9 tiene un régimen específico; no exige que una emergencia se haya previsto con antelación. Comunica lo sucedido y aporta acreditación cuando corresponda. No la confundas con asuntos propios de libre disposición."
        ]
      },
      {
        "id": "justificacion",
        "title": "Indicar fechas y fundamento",
        "paragraphs": [
          "Comprueba días u horas que corresponden, cómputo y justificante conforme al supuesto y convenio. No presupongas que todos los permisos tienen igual duración o se cuentan de la misma forma. Para asuntos propios, cita la cláusula que los reconoce y si son retribuidos.",
          "Esta plantilla se dirige a personal laboral sujeto al Estatuto. El régimen funcionarial requiere consultar su normativa específica; la carta no acredita por sí sola que un permiso esté concedido."
        ]
      },
      {
        "id": "modelo",
        "title": "Comunicación o solicitud del permiso",
        "paragraphs": [
          "Adapta la redacción al tipo de permiso y a las condiciones comprobadas."
        ],
        "models": [
          {
            "id": "permiso",
            "title": "Permiso con causa y fechas",
            "body": "[Lugar], [fecha]\nA [empresa / Personal]\n\nComunico / solicito [permiso retribuido / asuntos propios reconocidos por convenio o pacto] por [causa concreta y circunstancias].\nFundamento: [apartado legal o cláusula aplicable].\nFechas y duración: [días u horas y cómputo aplicado].\nJustificación: [documentación que acredita el supuesto / explicación de la urgencia y documentación que se aportará cuando proceda].\nSolicito acuse de recibo y respuesta sobre cualquier discrepancia en el encuadre o las fechas.\n\n[Nombre, identificación y firma]"
          }
        ]
      }
    ]
  },

];
