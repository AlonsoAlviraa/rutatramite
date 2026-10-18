import json, re, pathlib
p = pathlib.Path("/workspace/dni/tree/src/lib/tramites/promesas-29n.ts")
src = p.read_text()
start = src.index('{\n"id": "e29n-programas-electorales-29n"')
end = src.index('{\n"id": "e29n-iva-vivienda-4-por-ciento"')
old = src[start:end]
assert old.rstrip().endswith("},")

H = ["Tema", "Qué propuso o dijo", "Quién, dónde y cuándo", "Fuente"]
NOPROP = "No hemos encontrado propuestas concretas verificables en mítines a fecha de 18 de octubre."
NOPROG = "Programa del 29-N: no publicado a 18 de octubre de 2026."

S = {
 "lv_toledo": ("La Vanguardia, 16-10-2026", "https://www.lavanguardia.com/politica/20261016/11660735/feijoo-promete-bajada-impuestos-reduccion-burocracia-mundo-rural.html"),
 "elpais_bxl": ("El País, 15-10-2026", "https://elpais.com/espana/elecciones-generales/2026-10-15/feijoo-se-compromete-a-actualizar-las-pensiones-con-el-ipc-sin-descartar-reformarlas.html"),
 "pp_madrid": ("pp.es, 10-10-2026", "https://www.pp.es/actualidad/articulos/feijoo-convoca-a-todos-los-espanoles-a-la-reconstruccion-nacional-para-poner-fin-al-muro-la-delincuencia-y-la-decadencia/"),
 "rtve_dh": ("RTVE, 10-10-2026", "https://www.rtve.es/noticias/20261010/sanchez-precampana-psoe-dos-hermanas-directo/17261747.shtml"),
 "abc_zgz": ("ABC, 14-10-2026", "https://www.abc.es/espana/aragon/sanchez-regresa-zaragoza-tratar-recuperar-escano-psoe-20261014134048-nt.html"),
 "ep_fuen": ("Europa Press, 17-10-2026", "https://www.europapress.es/nacional/noticia-sanchez-lanza-precampana-apelando-movilizacion-alertando-contra-motosierra-pensiones-20261017133128.html"),
 "ep_estepona": ("Europa Press, 11-10-2026", "https://www.europapress.es/nacional/noticia-abascal-dice-vox-pensiones-pagaran-habra-vivienda-sea-sigue-llamando-voto-presencial-20261011195906.html"),
 "vox_estepona": ("voxespana.es, 11-10-2026", "https://www.voxespana.es/abascal/abascal-reivindica-la-remigracion-la-desregulacion-y-la-prioridad-nacional-como-ejes-de-vox-para-el-29n-20261011"),
 "abc_ceuta": ("ABC (EFE), 12-10-2026", "https://www.abc.es/sociedad/abascal-exige-ceuta-militarizar-frontera-expulsar-migrantes-20261012153921-nt.html"),
 "ep_urtasun": ("Europa Press, 14-10-2026", "https://www.europapress.es/catalunya/noticia-urtasun-pide-toda-fuerza-frente-amplio-implementar-politicas-vivienda-20261014111734.html"),
 "eldiario_fa": ("elDiario.es, 17-10-2026", "https://www.eldiario.es/politica/frente-amplio-pide-unidad-frente-fascismo-pasa-pagina-crisis-si-alguien-no-quiere-sentar-mesa-no-le-obligar_1_13593637.html"),
 "ser_montero": ("Cadena SER, 12-09-2026", "https://cadenaser.com/nacional/2026/09/12/irene-montero-presenta-su-candidatura-de-podemos-a-las-elecciones-las-normas-del-sistema-no-pueden-ser-el-negocio-tienen-que-ser-la-vida-cadena-ser/"),
 "ep_montero": ("Europa Press, 17-10-2026", "https://www.europapress.es/nacional/noticia-montero-lanza-candidatura-acusa-frente-amplio-preferir-pactar-psoe-senado-podemos-ccaa-20261017123614.html"),
 "elespanol_ceuta": ("El Español, 07-10-2026", "https://www.elespanol.com/espana/politica/20261007/feijoo-presidente-solo-debe-defender-muro-frontera-ceuta-primera-carpeta-consejo-ministros/1003744411845_0.html"),
 "ep_zgz_aragon": ("Europa Press, 14-10-2026", "https://www.europapress.es/aragon/noticia-pedro-sanchez-promete-zaragoza-cuatro-anos-mas-revalorizacion-pensiones-conforme-ipc-20261014200020.html"),
 "ep_d21": ("Europa Press, 10-10-2026", "https://www.europapress.es/nacional/noticia-democracia-21-presenta-elecciones-madrid-barcelona-abogada-miriam-gonzalez-candidata-20261010151421.html"),
 "lavoz_bng": ("La Voz de Galicia, 17-10-2026", "https://www.lavozdegalicia.es/noticia/ferrol/naron/2026/10/17/bng-esixe-naron-sareb-deixe-actuar-coma-unha-inmobiliaria/00031792237421754563899.htm"),
}
def src_(k):
    l, h = S[k]; return {"label": l, "href": h}
def row(tema, que, quien, k):
    return {"cells": [tema, que, quien], "source": src_(k)}

T_TOLEDO = "Feijóo, acto de Afammer en Toledo, 16-10-2026"
T_DH = "Sánchez, mitin en Dos Hermanas (Sevilla), 10-10-2026"
T_ZGZ = "Sánchez, mitin en Zaragoza, 14-10-2026"
T_EST = "Abascal, mitin en Estepona (Málaga), 11-10-2026"
T_D21 = "Miriam González, presentación de Democracia 21, Madrid, 10-10-2026"

def party(id_, title, quien, rows=None, caption=None):
    sec = {"id": id_, "title": title, "paragraphs": [quien, NOPROG]}
    if rows:
        sec["table"] = {"caption": caption, "head": H, "rows": rows}
    else:
        sec["paragraphs"].append(NOPROP)
    return sec

sections = [
 {"id": "estado", "title": "Estado a 18 de octubre: ningún programa publicado", "paragraphs": [
   "Ningún partido con diputados en el Congreso ha publicado todavía su programa para las generales del 29 de noviembre. Lo comprobamos el 18 de octubre en sus webs oficiales y en la prensa. Las webs de PSOE, Vox, Podemos y ERC no permiten la comprobación automática; en esos casos revisamos sus notas y las noticias.",
   "Vox tiene un programa temático de desregulación publicado en junio de 2026, pero no es el programa del 29-N.",
   "Las candidaturas se presentan del 21 al 26 de octubre, se proclaman el 2 de noviembre y el BOE las publica el 3 de noviembre. La campaña va del 13 al 27 de noviembre."
 ]},
 {"id": "aviso", "title": "Antes de leer: lo que se dice en un mitin no es el programa", "paragraphs": [
   "Las propuestas de esta página se han dicho en mítines, actos y comparecencias de precampaña. No son el programa electoral oficial: el programa puede recogerlas, cambiarlas o no incluirlas. Actualizaremos esta página cuando cada partido publique el suyo.",
   "Criterio: solo recogemos propuestas concretas, con quién las dijo, dónde y cuándo, y enlazamos la fuente (web del partido o prensa). No recogemos críticas a otros partidos ni valoramos las propuestas. Si no encontramos propuestas verificables de un partido, lo decimos.",
   "Orden: por votos en las generales del 23 de julio de 2023, el mismo que en nuestra comparativa de promesas. Frente Amplio ocupa el puesto de Sumar, la marca con la que ese espacio concurrió en 2023; Podemos concurrió dentro de Sumar. Democracia 21, partido nuevo que no concurrió en 2023, va al final."
 ]},
 {"id": "por-tema", "title": "Por tema: qué partidos han hecho propuestas", "paragraphs": [
   "Resumen de las tablas de abajo. Cada partido aparece solo en los temas en los que hemos encontrado una propuesta con fuente."
 ], "lists": [[
   "Vivienda: PP, PSOE, Vox, Frente Amplio, Podemos, BNG y Democracia 21.",
   "Pensiones: PP, PSOE, Vox y Frente Amplio.",
   "Empleo y salarios: PP, PSOE, Podemos y Democracia 21.",
   "Impuestos: PP, Vox y Democracia 21.",
   "Sanidad: no hemos encontrado propuestas concretas verificables en mítines a fecha de 18 de octubre.",
   "Educación: PSOE y Democracia 21.",
   "Inmigración: PP, PSOE, Vox y Democracia 21.",
   "Otros temas (burocracia, instituciones, gasto público, defensa y coste de la vida): PP, PSOE, Podemos y Democracia 21."
 ]]},
 party("pp", "PP: qué ha propuesto en mítines y actos",
   "Candidato: Alberto Núñez Feijóo. Actos revisados: acto en Ceuta (07-10), mitin en Madrid (10-10), comparecencia en Bruselas (15-10) y acto en Toledo (16-10).",
   [
    row("Vivienda", "Feijóo se comprometió a «impuestos cero» para comprar la vivienda habitual en municipios despoblados.", T_TOLEDO, "lv_toledo"),
    row("Pensiones", "Feijóo dijo que «las pensiones se actualizarán con el IPC» y que garantizará el sistema público de pensiones y su viabilidad.", "Feijóo, comparecencia ante la prensa en la sede del PP europeo, Bruselas, 15-10-2026", "elpais_bxl"),
    row("Empleo y salarios", "Feijóo propuso, para menores de 40 años que emprendan en zonas rurales, una cuota de autónomos de 50 € al mes durante tres años, una rebaja del 50 % del IRPF en los dos primeros años de actividad, un bono de incorporación rural de hasta 15.000 € y avales públicos de hasta el 80 % de la inversión.", T_TOLEDO, "lv_toledo"),
    row("Impuestos", "Feijóo propuso bajar el IRPF para compensar la inflación, un IVA del 0 % para los alimentos básicos, el IVA de la electricidad al 10 % y el impuesto sobre la producción de energía eléctrica al 0 %.", T_TOLEDO, "lv_toledo"),
    row("Inmigración", "Feijóo prometió una ley de extranjería que permita expulsiones inmediatas por entradas irregulares y dijo que «la única solución es que los 15.000 se vayan de Ceuta y se vayan de España».", "Feijóo, acto de precampaña en Ceuta, 07-10-2026", "elespanol_ceuta"),
    row("Otros: burocracia", "Feijóo propuso no crear trámites nuevos hasta revisar la normativa y reducir los existentes al menos un 30 %, y que no haya que presentar dos veces el mismo documento.", T_TOLEDO, "lv_toledo"),
    row("Otros: instituciones", "Feijóo propuso «revisar las reglas, recuperar los contrapesos y fortalecer las instituciones».", "Feijóo, mitin en Ifema, Madrid, 10-10-2026", "pp_madrid"),
   ], "PP: propuestas en mítines y actos, por tema"),
 party("psoe", "PSOE: qué ha propuesto en mítines y actos",
   "Candidato: Pedro Sánchez. Actos revisados: mítines en Dos Hermanas (10-10), Zaragoza (14-10) y Fuenlabrada (17-10).",
   [
    row("Vivienda", "Sánchez se comprometió a «reforzar y mantener» los decretos de vivienda y dijo que «la política de vivienda no tiene fecha de caducidad».", T_DH, "rtve_dh"),
    row("Pensiones", "Sánchez prometió revalorizar las pensiones públicas con el IPC durante los cuatro años de legislatura.", T_ZGZ, "abc_zgz"),
    row("Pensiones", "Sánchez dijo que «las pensiones no se tocan».", "Sánchez, mitin tras el Comité Federal del PSOE, Fuenlabrada (Madrid), 17-10-2026", "ep_fuen"),
    row("Inmigración", "Sánchez vinculó la regularización de migrantes con las pensiones: de 1,2 millones de personas en trámites para obtener permiso de residencia y trabajo, dijo que «casi medio millón están trabajando y cotizando a la Seguridad Social».", T_ZGZ, "ep_zgz_aragon"),
    row("Empleo y salarios", "Sánchez prometió bajar el paro a cifras de un dígito hacia 2030.", T_ZGZ, "abc_zgz"),
    row("Educación", "Sánchez prometió bajar cuatro puntos la tasa de abandono escolar hasta 2030.", T_ZGZ, "abc_zgz"),
    row("Otros: gasto público", "Sánchez prometió «cero recortes» en un nuevo mandato.", T_ZGZ, "abc_zgz"),
   ], "PSOE: propuestas en mítines y actos, por tema"),
 party("vox", "Vox: qué ha propuesto en mítines y actos",
   "Candidato: Santiago Abascal. Actos revisados: mitin en Estepona (11-10) y comparecencia en Ceuta (12-10).",
   [
    row("Vivienda", "Abascal propuso eliminar «trabas administrativas» y leyes que, según dijo, encarecen y ralentizan la construcción de vivienda.", T_EST, "vox_estepona"),
    row("Pensiones", "Abascal dijo que con Vox las pensiones «se van a pagar al precio que sea y como sea» y negó que Vox vaya a privatizarlas.", T_EST, "ep_estepona"),
    row("Impuestos", "Abascal defendió que «los impuestos sean los menos» y una revisión de las prioridades del gasto público.", T_EST, "vox_estepona"),
    row("Inmigración", "Abascal propuso repatriar a quien entra en España de forma irregular, que los extranjeros que cometen delitos cumplan la pena en su país y que quienes vienen «a vivir de las ayudas sociales» vuelvan a su país («remigración»).", T_EST, "ep_estepona"),
    row("Inmigración", "Abascal reclamó militarizar la frontera de Ceuta con Marruecos y expulsar a los inmigrantes que entraron de forma irregular en la crisis de finales de julio.", "Abascal, comparecencia en el Mirador de Isabel II, Ceuta, 12-10-2026", "abc_ceuta"),
   ], "Vox: propuestas en mítines y actos, por tema"),
 party("frente-amplio", "Frente Amplio: qué ha propuesto en mítines y actos",
   "Candidata: Ada Colau. Actos revisados: declaraciones de Ernest Urtasun en Barcelona (14-10) y mitin de presentación en Madrid (17-10).",
   [
    row("Vivienda", "Urtasun propuso que el Estado invierta el 1 % del PIB en vivienda pública asequible, construyendo y también comprando viviendas.", "Ernest Urtasun (Comuns), ante los medios antes de una reunión con cargos municipales, Barcelona, 14-10-2026", "ep_urtasun"),
    row("Vivienda", "Urtasun propuso frenar las compras especulativas de vivienda y las de los fondos de inversión.", "Ernest Urtasun (Comuns), Barcelona, 14-10-2026", "ep_urtasun"),
    row("Pensiones", "Urtasun dijo que el Frente Amplio no va a permitir que se «cargue» el sistema público de pensiones.", "Ernest Urtasun, mitin de presentación en el Parque Lineal del Manzanares, Madrid, 17-10-2026", "eldiario_fa"),
   ], "Frente Amplio: propuestas en mítines y actos, por tema"),
 party("podemos", "Podemos: qué ha propuesto en mítines y actos",
   "Candidata: Irene Montero. Actos revisados: presentación de su candidatura en Madrid (12-09, antes de la convocatoria) y Consejo Ciudadano Estatal en Madrid (17-10).",
   [
    row("Vivienda", "Montero dijo que en vivienda «hay que bajar los precios y prohibir la especulación».", "Montero, presentación de su candidatura, Madrid, 12-09-2026", "ser_montero"),
    row("Empleo y salarios", "Montero propuso reducir la jornada laboral a 35 horas semanales.", "Montero, presentación de su candidatura, Madrid, 12-09-2026", "ser_montero"),
    row("Empleo y salarios", "Montero propuso un salario mínimo interprofesional de 1.800 € al mes.", "Montero, presentación de su candidatura, Madrid, 12-09-2026", "ser_montero"),
    row("Otros: defensa", "Montero dijo que «no podemos gastarnos dinero en armas mientras tenemos bomberos [...] cobrando una miseria».", "Montero, presentación de su candidatura, Madrid, 12-09-2026", "ser_montero"),
    row("Otros: coste de la vida", "Montero fijó como objetivos de campaña acabar con «el negocio de la vivienda», bajar el coste de la vida, mejorar los salarios y defender los servicios públicos.", "Montero, Consejo Ciudadano Estatal de Podemos, Madrid, 17-10-2026", "ep_montero"),
   ], "Podemos: propuestas en mítines y actos, por tema"),
 party("erc", "ERC: qué ha propuesto en mítines y actos",
   "Cabeza de lista por Barcelona: Gabriel Rufián. ERC y Podemos han acordado hacer campaña conjunta."),
 party("junts", "Junts: qué ha propuesto en mítines y actos",
   "Cabeza de lista al Congreso: Míriam Nogueras. Acto revisado: Consejo Nacional en La Garriga (Barcelona), 17-10."),
 party("eh-bildu", "EH Bildu: qué ha propuesto en mítines y actos",
   "Acto revisado: acto en Donostia, 10-10, con la portavoz en el Congreso, Mertxe Aizpurua."),
 party("pnv", "PNV: qué ha propuesto en mítines y actos",
   "Cabezas de lista: Maribel Vaquero, Idoia Sagastizabal y Gorka Urtaran. Actos revisados: comparecencia en Donostia (10-10) y presentación de candidaturas (17-10)."),
 party("bng", "BNG: qué ha propuesto en mítines y actos",
   "Diputado en el Congreso: Néstor Rego. Acto revisado: acto con familias afectadas por un desahucio en Narón (A Coruña), 17-10.",
   [
    row("Vivienda", "Rego reclamó que los inmuebles de la Sareb en Galicia (unos 1.200 habitables, según dijo) pasen a la Administración gallega para un parque público de alquiler social.", "Néstor Rego, Narón (A Coruña), 17-10-2026", "lavoz_bng"),
   ], "BNG: propuestas en mítines y actos, por tema"),
 party("cc", "Coalición Canaria: qué ha propuesto en mítines y actos",
   "Cabeza de lista por Santa Cruz de Tenerife: Cristina Valido, en candidatura conjunta con Primero Canarias."),
 party("upn", "UPN: qué ha propuesto en mítines y actos",
   "UPN concurre en Navarra en coalición con el PP."),
 party("democracia-21", "Democracia 21: qué ha propuesto en mítines y actos",
   "Candidata: Miriam González. Partido nuevo; concurre como coalición «Democracia para el siglo 21» (D21) con Ciudadanos y UCIN, solo en Madrid y Barcelona, según la Junta Electoral Central. Acto revisado: presentación en Madrid (10-10).",
   [
    row("Vivienda", "Propuso un plan nacional de construcción de barrios con diez años de seguridad jurídica, y que un joven que gane 1.300 € no pague más de 350 € por su vivienda; mientras tanto, quitar todos los impuestos sobre la vivienda a los menores de 35 años.", T_D21, "ep_d21"),
    row("Vivienda", "Pidió que Sánchez y Feijóo vayan juntos a Bruselas para destinar 10.000 millones de euros de fondos Next Generation no ejecutados a un fondo soberano de vivienda protegida.", T_D21, "ep_d21"),
    row("Impuestos", "Propuso «aliviar la presión fiscal» a la vez que se recuperan los servicios públicos.", T_D21, "ep_d21"),
    row("Empleo y salarios", "Propuso quitar obstáculos al emprendimiento y una «política sostenible de subidas de salarios».", T_D21, "ep_d21"),
    row("Educación", "Propuso titulaciones más flexibles y más prácticas.", T_D21, "ep_d21"),
    row("Inmigración", "Defendió la inmigración como «activo y ventaja competitiva» con una política «sensata y con cabeza»: «Tenemos que desterrar los discursos xenófobos, pero decidiendo quién entra, cómo entra, cuándo entra y cuándo sale si tiene que salir».", T_D21, "ep_d21"),
    row("Otros: instituciones", "Propuso nombramientos por mérito y recortar el 90 % de los asesores, despolitizar el CGPJ, que la Fiscalía responda ante el Parlamento, juzgados especializados anticorrupción, acabar con los aforamientos, recortar las subvenciones a partidos y fundaciones, y que los diputados se reúnan con sus votantes al menos cada dos semanas.", T_D21, "ep_d21"),
   ], "Democracia 21: propuestas en mítines y actos, por tema"),
 {"id": "donde", "title": "Dónde leerlos", "paragraphs": [
   "En la web oficial de cada partido. En nuestra sección de promesas enlazamos cada medida a su fuente y avisamos cuando se publica un programa."
 ]},
]

# sources list (unique hrefs): convocation + LOREG + all mitin sources + context sources for others
extra = [
 {"label": "El País, 11-10-2026: Rufián, candidato de ERC el 29-N", "href": "https://elpais.com/espana/catalunya/2026-10-11/rufian-sera-candidato-por-esquerra-republicana-el-29-n.html"},
 {"label": "El País, 12-10-2026: acuerdo de campaña de ERC y Podemos", "href": "https://elpais.com/espana/elecciones-generales/2026-10-12/podemos-y-erc-oficializan-el-acuerdo-por-el-que-rufian-y-montero-haran-campana-juntos.html"},
 {"label": "RTVE, 17-10-2026: acto de Junts en La Garriga", "href": "https://www.rtve.es/noticias/20261017/nogueras-reivindica-centralidad-junts-apela-a-catalanes-estan-hartos-pagar-fiesta-a-demas/17271321.shtml"},
 {"label": "elDiario.es, 10-10-2026: actos de PNV y EH Bildu en Donostia", "href": "https://www.eldiario.es/euskadi/pse-ee-pnv-eh-bildu-lanzan-precampana-generales-actos-politicos-donostia_1_13577520.html"},
 {"label": "La Vanguardia, 17-10-2026: candidaturas del PNV", "href": "https://www.lavanguardia.com/local/paisvasco/20261017/11661431/pnv-apuesta-vaquero-sagastizabal-29-n-acompanadas-exalcaldes-san-sebastian-vitoria.html"},
 {"label": "coalicioncanaria.org, 5-10-2026: candidatura de Cristina Valido", "href": "https://coalicioncanaria.org/cc-apuesta-por-cristina-valido-y-llama-a-la-unidad-nacionalista-para-blindar-la-voz-de-canarias-en-madrid/"},
 {"label": "Junta Electoral Central: coaliciones de las generales (D21)", "href": "https://www.juntaelectoralcentral.es/cs/jec/elecciones/coalicionesJECGenerales"},
 {"label": "RTVE, 14-10-2026: coalición UPN-PP", "href": "https://www.rtve.es/noticias/20261014/upn-pp-sellan-acuerdo-para-concurrir-coalicion-a-elecciones-generales-del-29-n/17266826.shtml"},
]
sources = [
 {"label": "BOE: Real Decreto 806/2026, convocatoria del 29-N", "href": "https://www.boe.es/eli/es/rd/2026/10/05/806"},
 {"label": "BOE: LOREG (Ley Orgánica 5/1985)", "href": "https://www.boe.es/buscar/act.php?id=BOE-A-1985-11672"},
]
seen = {s["href"] for s in sources}
for k, (l, h) in S.items():
    if h not in seen:
        sources.append({"label": l + ": " + {
          "lv_toledo": "Feijóo en Toledo", "elpais_bxl": "Feijóo en Bruselas", "pp_madrid": "Feijóo en Madrid",
          "rtve_dh": "Sánchez en Dos Hermanas", "abc_zgz": "Sánchez en Zaragoza", "ep_fuen": "Sánchez en Fuenlabrada",
          "ep_estepona": "Abascal en Estepona", "vox_estepona": "Abascal en Estepona", "abc_ceuta": "Abascal en Ceuta",
          "ep_urtasun": "Urtasun en Barcelona", "eldiario_fa": "Frente Amplio en Madrid", "ser_montero": "Montero en Madrid",
          "ep_montero": "Montero en Madrid", "lavoz_bng": "Rego en Narón", "elespanol_ceuta": "Feijóo en Ceuta", "ep_zgz_aragon": "Sánchez en Zaragoza (inmigración y pensiones)", "ep_d21": "presentación de Democracia 21"}[k], "href": h}); seen.add(h)
for e in extra:
    if e["href"] not in seen: sources.append(e); seen.add(e["href"])

guide = {
 "id": "e29n-programas-electorales-29n",
 "pack": "elecciones",
 "reviewedAt": "2026-10-18",
 "path": "/elecciones/programas-electorales-29n",
 "h1": "Programas electorales del 29-N: cuándo se publican y dónde leerlos",
 "title": "Programas electorales del 29-N: cuándo salen y dónde verlos",
 "description": "¿Han salido ya los programas electorales del 29-N? A 18 de octubre ningún partido ha publicado el suyo. Qué han propuesto en los mítines, con fuente.",
 "lead": "Respuesta corta: a 18 de octubre de 2026 ningún partido ha publicado todavía su programa electoral para el 29-N. Mientras tanto, aquí tienes lo que han propuesto en mítines y actos de precampaña, por tema, con quién lo dijo, dónde, cuándo y la fuente.",
 "cta": {"href": "/elecciones/promesas", "label": "Comparar promesas de todos los partidos"},
 "secondaryCta": {"href": "/elecciones", "label": "Guía para votar el 29-N"},
 "sources": sources,
 "related": [
  {"href": "/elecciones/promesas", "label": "Promesas del 29-N: qué propone cada partido"},
  {"href": "/elecciones/promesas/metodologia", "label": "Metodología de la comparativa"},
  {"href": "/elecciones", "label": "Elecciones del 29-N: cómo votar"},
  {"href": "/elecciones/quiere-algun-partido-quitar-las-pensiones", "label": "¿Quiere algún partido quitar las pensiones?"},
  {"href": "/elecciones/promesas/que-propone-cada-partido-inmigracion", "label": "Inmigración: qué propone cada partido"}
 ],
 "disclaimer": "Contenido informativo y neutral: recogemos lo que cada partido ha dicho, con quién, dónde, cuándo y la fuente. No valoramos las propuestas ni recomendamos ningún voto.",
 "faqs": [
  {"q": "¿Cuándo salen los programas electorales del 29-N?", "a": "No hay fecha fijada por ley: cada partido decide cuándo lo publica. A 18 de octubre de 2026 no hemos localizado el programa completo para el 29-N de ningún partido con diputados en el Congreso (PP, PSOE, Vox, Frente Amplio, Podemos, ERC, Junts, EH Bildu, PNV, BNG, Coalición Canaria ni UPN). La campaña va del 13 al 27 de noviembre; actualizaremos esta página cuando salgan."},
  {"q": "¿Qué han propuesto los partidos en los mítines del 29-N?", "a": "A 18 de octubre, en mítines y actos: el PP, bajar el IRPF y un IVA del 0 % en alimentos básicos; el PSOE, mantener los decretos de vivienda y revalorizar las pensiones con el IPC; Vox, garantizar el pago de las pensiones y repatriar a quien entra de forma irregular; el Frente Amplio, invertir el 1 % del PIB en vivienda pública; Podemos, la jornada de 35 horas y un salario mínimo de 1.800 €. Cada propuesta, con su fuente, está en esta página."},
  {"q": "¿Lo que se dice en un mitin es el programa electoral?", "a": "No. Una propuesta hecha en un mitin o en un acto puede no aparecer en el programa oficial o aparecer cambiada. Cuando cada partido publique su programa, lo enlazaremos aquí."},
  {"q": "¿Es obligatorio publicar un programa?", "a": "No. La ley electoral no obliga a los partidos a publicar un programa ni fija fecha."},
  {"q": "¿Dónde comparo las propuestas?", "a": "En la página de promesas del 29-N, por tema, partido, comunidad y perfil."}
 ],
 "sections": sections,
}
print("desc len", len(guide["description"]))
body = json.dumps(guide, ensure_ascii=False, indent=0)
# match existing style: keys on own lines without indentation
new = body + ",\n"
src = src[:start] + new + src[end:]
p.write_text(src)
print("ok", len(old), len(new))
