import { DISCLAIMER_MEDICO } from "@/lib/tramites/facts";
import type { Guide } from "@/lib/tramites/types";

const relatedBebe = [
  { href: "/bebe/inscripcion-nacimiento-registro-civil", label: "Registro Civil del nacimiento" },
  { href: "/bebe/tarjeta-sanitaria-bebe", label: "Tarjeta sanitaria del bebé" },
  { href: "/bebe/cartilla-de-vacunacion-donde-se-saca", label: "Cartilla de vacunación" },
  { href: "/empadronarse/menores", label: "Empadronar menores" },
];

export const BEBE_GUIDES: Guide[] = [
  {
    id: "tarjeta-sanitaria", pack: "bebe", path: "/bebe/tarjeta-sanitaria-bebe",
    reviewedAt: "2026-09-16",
    h1: "Cómo solicitar la tarjeta sanitaria del bebé",
    title: "Tarjeta sanitaria del bebé: alta y documentos",
    description: "Alta del bebé como beneficiario y tarjeta del servicio autonómico de salud. Documentación del INSS para menores de tres meses y ejemplo de Madrid.",
    lead: "Si vas a incorporar al bebé como beneficiario de un titular de la Seguridad Social, comprueba primero su alta y después solicita la tarjeta al servicio de salud de tu comunidad. Son gestiones distintas: el documento que acredita el derecho a asistencia no es la tarjeta sanitaria autonómica.",
    cta: { href: "https://prestaciones.seg-social.es/servicio/asistencia-sanitaria-gestion-beneficiarios.html", label: "Seguridad Social: gestionar beneficiarios" },
    secondaryCta: { href: "https://sede.comunidad.madrid/prestacion-social/tarjeta-sanitaria", label: "Ejemplo: solicitar la tarjeta en Madrid" },
    sources: [
      { href: "https://www.seg-social.es/wps/portal/wss/internet/Trabajadores/PrestacionesPensionesTrabajadores/10938/30497/?changeLanguage=es", label: "INSS: gestión y documentos de asistencia sanitaria" },
      { href: "https://sede.seg-social.gob.es/wps/portal/sede/sede/Ciudadanos/Asistencia%2BSanitaria/202043_TUSS", label: "Seguridad Social: alta de beneficiarios" },
      { href: "https://sede.comunidad.madrid/prestacion-social/tarjeta-sanitaria", label: "Comunidad de Madrid: tarjeta sanitaria" },
    ],
    related: relatedBebe, disclaimer: DISCLAIMER_MEDICO,
    sections: [
      {
        id: "paso-1", title: "Alta como beneficiario y justificante",
        paragraphs: [
          "El servicio de alta permite incorporar beneficiarios y obtener la acreditación correspondiente. Conserva el documento final y comprueba si acredita el derecho o solo la presentación de una solicitud pendiente. Si el hospital ha realizado alguna gestión, pide que identifique cuál y revisa su resultado antes de repetirla.",
          "En la documentación del INSS, el parentesco de un hijo se acredita con libro de familia o certificado de nacimiento; para un hijo menor de tres meses no es obligatorio aportar esos documentos. Esta excepción se refiere al alta sanitaria en el INSS y no elimina los requisitos propios de la tarjeta autonómica.",
        ],
      },
      {
        id: "paso-2", title: "Solicitar la tarjeta en tu comunidad",
        paragraphs: [
          "Consulta al centro de salud o al servicio autonómico cómo registrar al bebé y asignarle profesionales. La ficha de Madrid, por ejemplo, permite solicitud electrónica o presencial y contempla certificado de nacimiento para menores de 14 años sin DNI o TIE, además de acreditar la representación. También prevé consultas electrónicas de datos. Usa esa lista únicamente si el trámite corresponde a Madrid.",
          "Prepara la identificación del representante, los datos del bebé, la acreditación sanitaria y la documentación de domicilio que indique tu servicio. Pregunta qué justificante utilizar mientras se emite la tarjeta y cómo solicitar la primera cita; no presupongas que la aplicación ya reconocerá al bebé.",
        ],
      },
      {
        id: "otras-situaciones", title: "Si tu situación no encaja en el alta como beneficiario",
        paragraphs: ["La propia información del INSS distingue supuestos cuyo reconocimiento corresponde al servicio autonómico de salud, como determinadas situaciones de personas extranjeras. Si el formulario no admite tu caso, consulta el canal correspondiente al centro de salud; un error en el alta digital no permite concluir por sí solo que no exista derecho a asistencia."],
      },
    ],
  },
  {
    id: "cartilla-vacunas", pack: "bebe", path: "/bebe/cartilla-de-vacunacion-donde-se-saca",
    reviewedAt: "2026-09-16",
    h1: "Dónde pedir la cartilla de vacunación del bebé",
    title: "Cartilla de vacunación: solicitud, pérdida y justificantes",
    description: "Consulta al centro de salud cómo obtener o recuperar la cartilla. Diferencias entre calendario, registro individual y documento para un trámite.",
    lead: "Para obtener o recuperar la cartilla del bebé, empieza por su centro de salud: pregunta qué documento facilita tu servicio autonómico y cómo consultar los registros del menor. La cartilla, el informe individual y el calendario general cumplen funciones diferentes.",
    cta: { href: "https://www.comunidad.madrid/hospital/atencionprimaria/ciudadanos/atencion-ciudadano", label: "Ejemplo en Madrid: consultas a Atención Primaria" },
    secondaryCta: { href: "/bebe/certificado-vacunacion-descargar", label: "Consultar las opciones de descarga verificadas" },
    sources: [
      { href: "https://www.comunidad.madrid/hospital/atencionprimaria/ciudadanos/atencion-ciudadano", label: "Atención Primaria de Madrid: documentación y consultas" },
      { href: "https://lamevasalut.gencat.cat/web/cps/ajuda/serveis/informacio-clinica", label: "La Meva Salut: información clínica y estado vacunal" },
      { href: "https://www.sanidad.gob.es/areas/promocionPrevencion/vacunaciones/calendario/home.htm", label: "Sanidad: calendario común de vacunación" },
    ],
    related: [...relatedBebe, { href: "/bebe/cartilla-vacunacion-digital", label: "Consultar el registro digital del menor" }],
    disclaimer: DISCLAIMER_MEDICO,
    sections: [
      {
        id: "donde", title: "Qué pedir en el centro de salud",
        paragraphs: ["Explica si buscas la primera cartilla, recuperar una perdida o aportar un documento a una entidad. Ten a mano la identificación sanitaria del bebé y consulta cómo acreditar que actúas en su representación. Pide el nombre exacto del documento y el canal para obtenerlo; evita reservar una consulta clínica solo para resolver una duda de acceso administrativo."],
      },
      {
        id: "duplicado", title: "Si perdiste la cartilla o faltan anotaciones",
        paragraphs: ["Reúne las copias e informes que conserves y pide al centro que compruebe qué consta en la historia. Como muestra La Meva Salut, el contenido visible depende de la información incorporada al registro. Una pantalla incompleta no permite deducir qué vacunas recibió una persona. La revisión de los antecedentes y cualquier decisión sanitaria corresponden al profesional."],
      },
      {
        id: "documento-para-tramite", title: "Si te solicitan documentación para una actividad",
        paragraphs: ["Pregunta a la entidad destinataria el documento, la finalidad y el formato que admite antes de descargar o entregar información sanitaria. Un calendario oficial describe recomendaciones generales: no acredita las vacunas de tu hijo. Para localizar un informe personal, consulta la guía de descarga; incluye un ejemplo comprobado de Cataluña y las limitaciones del acceso en Madrid."],
      },
    ],
  },
  {
    id: "registro-civil", pack: "bebe", path: "/bebe/inscripcion-nacimiento-registro-civil",
    reviewedAt: "2026-09-16",
    h1: "Inscribir al bebé en el Registro Civil",
    title: "Inscripción del nacimiento: plazos y vías de declaración",
    description: "Comunicación del hospital en 72 horas y declaración en diez días cuando corresponda. Son plazos distintos. Documentos y certificado posterior.",
    lead: "El hospital dispone de 72 horas para comunicar el nacimiento, salvo los casos que requieren comparecer ante el Registro Civil. Si el nacimiento ocurre fuera de un centro sanitario o no se remite la comunicación en las condiciones legales, quienes deben promover la inscripción tienen diez días desde el nacimiento para declararlo. No se suman ambos plazos.",
    cta: { href: "https://www.mjusticia.gob.es/es/ciudadania/tramites/inscripcion-nacimiento", label: "Justicia: información para inscribir un nacimiento" },
    secondaryCta: { href: "https://sede.mjusticia.gob.es/tramites/certificado-nacimiento", label: "Solicitar un certificado de un nacimiento ya inscrito" },
    sources: [
      { href: "https://www.boe.es/buscar/act.php?id=BOE-A-2011-12628#a46", label: "Ley del Registro Civil: artículos 46 y 47" },
      { href: "https://sede.mjusticia.gob.es/tramites/inscripcion-nacimiento", label: "Justicia: servicio de comunicación reservado a centros sanitarios" },
      { href: "https://sede.mjusticia.gob.es/tramites/certificado-nacimiento", label: "Justicia: solicitud del certificado de nacimiento" },
    ],
    related: [...relatedBebe, { href: "/bebe/prestacion-por-nacimiento", label: "Prestaciones por nacimiento: modalidades y efectos económicos" }],
    sections: [
      {
        id: "plazos", title: "Confirmar quién presenta la comunicación",
        paragraphs: [
          "Pregunta al hospital si ha enviado la comunicación y si vuestro caso requiere comparecencia. Conserva la constancia que os facilite y atiende los requerimientos del Registro. El acceso de la sede llamado Inscripción de Nacimiento está destinado a centros sanitarios autorizados: no es un formulario para que cualquier progenitor inscriba al bebé desde casa.",
          "Si corresponde declarar y transcurre el plazo legal, el artículo 47 exige una resolución en expediente registral. Contacta con la oficina para conocer la documentación de ese caso.",
        ],
      },
      {
        id: "documentos", title: "Preparar la declaración y distinguir el certificado posterior",
        paragraphs: [
          "La declaración requiere el documento oficial cumplimentado y el certificado médico o la acreditación alternativa prevista legalmente. Confirma con la oficina la identificación y los documentos aplicables a vuestra situación familiar.",
          "El certificado de nacimiento acredita la inscripción practicada: no es un documento que debas aportar para inscribir ese mismo nacimiento. Cuando lo necesites, indica su finalidad y si lo pides para el menor. La descarga inmediata depende de la disponibilidad telemática de los datos; conserva el justificante y sigue la respuesta del servicio si no puede emitirlo al momento.",
        ],
      },
      {
        id: "despues", title: "Organizar las gestiones posteriores",
        paragraphs: ["Revisa por separado el padrón, el alta sanitaria y la prestación que corresponda. Cada trámite tiene requisitos propios: la guía de tarjeta sanitaria explica la excepción documental del INSS para hijos menores de tres meses. Si vais a solicitar una prestación, comprobad sus efectos económicos antes de aplazarla; las modalidades están diferenciadas en la guía enlazada."],
      },
    ],
  },
];
