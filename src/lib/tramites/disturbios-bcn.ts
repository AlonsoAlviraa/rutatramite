// Rutina diaria: actualizar DISTURBIOS_UPD y la fila del 24-10 cuando Mossos publique el balance oficial.
export const DISTURBIOS_UPD = "26 de octubre de 2026, 08:30 (hora peninsular)";

export type Fuente = { label: string; href: string };
export type FilaDisturbio = { fecha: string; lugar: string; balance: string; fuentes: Fuente[] };

export const INTERIOR_BALANCES = "https://www.interior.gob.es/opencms/es/prensa/balances-e-informes/";

export const DISTURBIOS_BCN: FilaDisturbio[] = [
  {
    fecha: "24-10-2026",
    lugar: "Plaza Catalunya, la Rambla y Portal de l'Àngel. Concentración juvenil «Instituts Indignats», convocada por redes sociales y no comunicada, según el Ayuntamiento. Perímetro cerrado entre Universitat y Urquinaona.",
    balance: "128 detenidos (122 hombres y 6 mujeres; 72 menores de edad, el 56 %), de los que 2 tenían antecedentes por desórdenes públicos. 14 mossos heridos, 4 de ellos graves. 33 intervenciones de los Bomberos por incendios, 23 comercios vandalizados y 68 actas por decomiso de armas blancas, espráis, pasamontañas, pirotecnia y piedras, según el balance de los Mossos del 25-10. El Ayuntamiento cuenta 31 contenedores quemados.",
    fuentes: [
      { label: "Ayuntamiento de Barcelona (balance, 25-10)", href: "https://www.barcelona.cat/infobarcelona/ca/tema/seguretat-i-prevencio/els-aldarulls-al-centre-de-barcelona-acaben-amb-la-detencio-de-128-persones_42275.html" },
      { label: "Europa Press (balance de los Mossos, 25-10)", href: "https://www.europapress.es/catalunya/noticia-128-detenidos-disturbios-barcelona-sabado-72-ellos-menores-edad-20261025090646.html" },
      { label: "El País", href: "https://elpais.com/espana/catalunya/2026-10-24/centenares-de-jovenes-violentos-destrozan-el-centro-de-barcelona.html" },
      { label: "RTVE", href: "https://www.rtve.es/noticias/20261024/protesta-estudiantes-barcelona-degenera-disturbios-enfrentamientos-con-mossos-desquadra/17282127.shtml" },
      { label: "Europa Press", href: "https://www.europapress.es/catalunya/noticia-mossos-empiezan-despejar-disturbios-plaza-catalunya-barcelona-varios-detenidos-20261024215308.html" },
    ],
  },
  {
    fecha: "19-10-2026",
    lugar: "Universitat Autònoma de Barcelona (Bellaterra). Protesta contra un acto de Vito Quiles sin autorización de la universidad. No era un acto de partido.",
    balance: "Dos cargas de los Mossos. Los medios consultados no informan de detenidos.",
    fuentes: [
      { label: "El Mundo", href: "https://www.elmundo.es/cataluna/2026/10/19/6ad6497de4d4d8a71f8b458c.html" },
      { label: "Crónica Global", href: "https://cronicaglobal.elespanol.com/vida/20261020/cargas-policiales-uab-carreras-vito-quiles-agitador/1003742804259_0.html" },
    ],
  },
  {
    fecha: "5-10-2026",
    lugar: "Paseo de Gràcia con Gran Via y plaza Catalunya, al terminar la manifestación por la vivienda (20.000 personas según la Guardia Urbana; 120.000 según los organizadores).",
    balance: "13 detenidos por desórdenes públicos, 30 agentes heridos leves, 28 barricadas y 22 incendios, según los Mossos (balance provisional).",
    fuentes: [
      { label: "Europa Press", href: "https://www.europapress.es/catalunya/noticia-mossos-detienen-trece-personas-disturbios-barcelona-manifestacion-vivienda-20261006041517.html" },
    ],
  },
  {
    fecha: "Desde el 29-09-2026",
    lugar: "Plaza Catalunya. Acampada por la vivienda.",
    balance: "Sin incidentes propios. Su portavoz dijo el 24-10 que impidieron entrar a los jóvenes de la concentración.",
    fuentes: [
      { label: "El País", href: "https://elpais.com/espana/catalunya/2026-10-24/centenares-de-jovenes-violentos-destrozan-el-centro-de-barcelona.html" },
    ],
  },
  {
    fecha: "28-09-2026",
    lugar: "Avenida Diagonal, ante el Palau de Congressos, durante un acto del presidente del Gobierno. Protesta por la vivienda (2.000 personas según la Guardia Urbana; 20.000 según los organizadores).",
    balance: "2 detenidos por desórdenes públicos y atentado, según los Mossos.",
    fuentes: [
      { label: "ABC (EFE)", href: "https://www.abc.es/sociedad/dos-detenidos-desorden-publico-manifestacion-vivienda-barcelona-20260928235300-nt.html" },
      { label: "Infobae (EFE)", href: "https://www.infobae.com/espana/agencias/2026/09/28/dos-detenidos-durante-la-manifestacion-en-barcelona-para-exigir-un-decreto-de-vivienda/" },
    ],
  },
  {
    fecha: "16 al 21-02-2021",
    lugar: "Protestas por el encarcelamiento de Pablo Hasél.",
    balance: "En Cataluña: 102 detenidos y 82 mossos heridos en cinco noches (Mossos). En Barcelona: 75 detenidos y 1.004.421 € de daños en el espacio público (Ayuntamiento).",
    fuentes: [
      { label: "El Confidencial", href: "https://www.elconfidencial.com/espana/2021-02-20/disturbios-pablo-hasel-detenido-manifestacion-libertad-de-expresion_2960395/" },
      { label: "Economía Digital", href: "https://www.economiadigital.es/politica/balance-de-los-disturbios-por-hasel-75-detenidos-45-heridos-y-1me-en-danos-al-espacio-publico-en-barcelona.html" },
    ],
  },
  {
    fecha: "30-10-2020",
    lugar: "Plaza Sant Jaume. Protesta contra las restricciones por la covid.",
    balance: "14 detenidos y 30 heridos.",
    fuentes: [
      { label: "Catalan News", href: "https://www.catalannews.com/society-science/item/30-injured-and-14-arrested-in-altercations-and-lootings-during-anti-restrictions-protest" },
    ],
  },
  {
    fecha: "14 al 20-10-2019",
    lugar: "Protestas por la sentencia del procés (Urquinaona, Via Laietana y otras ciudades catalanas).",
    balance: "En Cataluña: 199 detenidos (92 en Barcelona) y unos 600 heridos, de ellos 289 agentes. En Barcelona: 2,7 millones de euros de daños y 1.044 contenedores quemados (Ayuntamiento, cifra provisional).",
    fuentes: [
      { label: "Público", href: "https://www.publico.es/politica/semana-protestas-sentencia-proces-salda-600-heridos-199-detenidos-2-7-millones-euros-danos.html" },
    ],
  },
  {
    fecha: "1-10-2017",
    lugar: "Incidentes del 1-O: actuaciones policiales durante el referéndum. No fueron disturbios.",
    balance: "Salud de la Generalitat: 893 personas atendidas ese día, 302 en Barcelona ciudad. Interior: 33 agentes atendidos (19 policías nacionales y 14 guardias civiles).",
    fuentes: [
      { label: "RTVE", href: "https://www.rtve.es/noticias/20171002/referendum-cataluna-govern-sube-a-893-heridos-durante-1-cuatro-permanencen-hospitalizados/1625044.shtml" },
      { label: "Europa Press", href: "https://www.europapress.es/nacional/noticia-interior-eleva-33-policias-guardias-civiles-atendidos-intervenir-urnas-20171001212206.html" },
    ],
  },
];
