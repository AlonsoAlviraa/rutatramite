"""Post-proceso de src/lib/tramites/promesas-29n.ts (tras gen_promesas_29n.py y /workspace/mitin29n/edit.py):
reescribe las comparativas de inmigración y pensiones con declaraciones fechadas a 18-10-2026 y actualiza
otros-partidos con Democracia 21. Mismo formato para todos los partidos."""
import json, pathlib, sys
sys.path.insert(0, str(pathlib.Path(__file__).parent))
P = pathlib.Path(__file__).resolve().parent.parent / "src/lib/tramites/promesas-29n.ts"
src = P.read_text()

def find(s, path):
    i = s.find('"path": "%s"' % path); a = s.rfind('{\n"id": "', 0, i)
    d = 0; j = a; ins = False; esc = False
    while True:
        c = s[j]
        if ins:
            if esc: esc = False
            elif c == '\\': esc = True
            elif c == '"': ins = False
        else:
            if c == '"': ins = True
            elif c == '{': d += 1
            elif c == '}':
                d -= 1
                if d == 0: return a, j + 1
        j += 1

D18 = "18 de octubre de 2026"
SRC = {
 "vox_est": ("voxespana.es: acto de Estepona, 11-10-2026 (web oficial del partido)", "https://www.voxespana.es/abascal/abascal-reivindica-la-remigracion-la-desregulacion-y-la-prioridad-nacional-como-ejes-de-vox-para-el-29n-20261011"),
 "ep_est": ("Europa Press, 11-10-2026: Abascal en Estepona", "https://www.europapress.es/nacional/noticia-abascal-dice-vox-pensiones-pagaran-habra-vivienda-sea-sigue-llamando-voto-presencial-20261011195906.html"),
 "abc_ceuta": ("ABC (EFE), 12-10-2026: Abascal en Ceuta", "https://www.abc.es/sociedad/abascal-exige-ceuta-militarizar-frontera-expulsar-migrantes-20261012153921-nt.html"),
 "esp_ceuta": ("El Español, 07-10-2026: Feijóo en Ceuta", "https://www.elespanol.com/espana/politica/20261007/feijoo-presidente-solo-debe-defender-muro-frontera-ceuta-primera-carpeta-consejo-ministros/1003744411845_0.html"),
 "ep_zgz": ("Europa Press, 14-10-2026: Sánchez en Zaragoza", "https://www.europapress.es/aragon/noticia-pedro-sanchez-promete-zaragoza-cuatro-anos-mas-revalorizacion-pensiones-conforme-ipc-20261014200020.html"),
 "ep_fuen": ("Europa Press, 17-10-2026: Sánchez en Fuenlabrada", "https://www.europapress.es/nacional/noticia-sanchez-lanza-precampana-apelando-movilizacion-alertando-contra-motosierra-pensiones-20261017133128.html"),
 "elp_pod": ("El Periódico, 02-02-2026: peticiones de Podemos tras la regularización", "https://www.elperiodico.com/es/politica/20260202/pedira-gobierno-migrantes-regularizados-puedan-126353274"),
 "ep_d21": ("Europa Press, 10-10-2026: presentación de Democracia 21", "https://www.europapress.es/nacional/noticia-democracia-21-presenta-elecciones-madrid-barcelona-abogada-miriam-gonzalez-candidata-20261010151421.html"),
 "jec": ("Junta Electoral Central: coaliciones de las generales del 29-N", "https://www.juntaelectoralcentral.es/cs/jec/elecciones/coalicionesJECGenerales"),
 "elpais_bxl": ("El País, 15-10-2026: Feijóo en Bruselas", "https://elpais.com/espana/elecciones-generales/2026-10-15/feijoo-se-compromete-a-actualizar-las-pensiones-con-el-ipc-sin-descartar-reformarlas.html"),
 "eldiario_fa": ("elDiario.es, 17-10-2026: presentación del Frente Amplio", "https://www.eldiario.es/politica/frente-amplio-pide-unidad-frente-fascismo-pasa-pagina-crisis-si-alguien-no-quiere-sentar-mesa-no-le-obligar_1_13593637.html"),
 "debate_pl": ("El Debate, 22-09-2026: ley de Podemos sobre jubilación anticipada", "https://www.eldebate.com/economia/20260922/congreso-aprueba-tramitar-no-penalizar-jubilacion-anticipada-40-anos-cotizados_461700.html"),
 "rd806": ("BOE: Real Decreto 806/2026, convocatoria del 29-N", "https://www.boe.es/eli/es/rd/2026/10/05/806"),
}
def s(k): l, h = SRC[k]; return {"label": l, "href": h}
TIPO = {"oficial-partido": "web oficial del partido", "prensa": "prensa (sin documento oficial del partido)"}
def r(que, quien, tipo, k): return {"cells": [que, quien, TIPO[tipo]], "source": s(k)}
HEAD = ["Medida o declaración", "Quién, dónde y cuándo", "Tipo de fuente", "Fuente"]
NOPROP = f"No hemos encontrado propuestas ni declaraciones concretas verificables de este partido sobre este tema a {D18}."
LEAD_PROG = f"Programa para el 29-N: no publicado a {D18}."
LEADERS = [("pp", "Partido Popular (PP)", "Candidato: Alberto Núñez Feijóo."),
           ("psoe", "Partido Socialista Obrero Español (PSOE)", "Candidato: Pedro Sánchez."),
           ("vox", "Vox", "Candidato: Santiago Abascal. Tiene un «Programa de desregulación» temático de junio de 2026, que no es el programa del 29-N."),
           ("frente-amplio", "Frente Amplio (Movimiento Sumar, IU, Más Madrid y Comuns)", "Candidata: Ada Colau."),
           ("podemos", "Podemos", "Candidata: Irene Montero."),
           ("democracia-21", "Democracia 21 (partido nuevo)", "Candidata: Miriam González. Concurre como coalición «Democracia para el siglo 21» (D21) con Ciudadanos y UCIN, solo en Madrid y Barcelona, según la Junta Electoral Central.")]

def topic(path, tema, rows_by, title, desc, lead_found, extra_faq, extra_rel):
    global src
    a, b = find(src, path); g = json.loads(src[a:b])
    secs = []
    for pid, name, lead in LEADERS:
        rows = rows_by.get(pid, [])
        sec = {"id": pid, "title": name, "paragraphs": [f"{lead} {LEAD_PROG}"]}
        if rows:
            sec["paragraphs"].append(f"Declaraciones y medidas con fuente sobre {tema}: {len(rows)}.")
            sec["table"] = {"caption": f"{name.split(' (')[0]}: {tema}", "head": HEAD, "rows": rows}
        else:
            sec["paragraphs"].append(NOPROP)
        secs.append(sec)
    secs.append({"id": "como-leer", "title": "Cómo leer esta comparativa", "paragraphs": [
        "Partidos ordenados por votos obtenidos en las generales del 23 de julio de 2023 (Frente Amplio ocupa el puesto de Sumar, la marca con la que ese espacio concurrió en 2023; Podemos concurrió dentro de Sumar). Democracia 21, que no concurrió en 2023, va al final.",
        "Mismas secciones para todos. Una declaración en un mitin no es el programa electoral: el programa puede recogerla, cambiarla o no incluirla. Que un partido tenga más filas no significa que su propuesta sea mejor.",
        "No recogemos críticas a otros partidos ni valoramos las propuestas. Las filas marcadas como «prensa» no tienen un documento oficial del partido."]})
    g.update({"reviewedAt": "2026-10-18", "title": title, "description": desc,
              "lead": "Respuesta corta: " + lead_found, "sections": secs})
    seen = set(); srcs = []
    for x in [s("rd806")] + [row["source"] for sec in secs for row in (sec.get("table") or {}).get("rows", [])] + [s("jec")]:
        if x["href"] not in seen: srcs.append(x); seen.add(x["href"])
    g["sources"] = srcs
    g["faqs"] = extra_faq + [
        {"q": f"¿Qué partido propone más sobre {tema}?", "a": "No lo valoramos. Mostramos todas las medidas y declaraciones concretas con fuente fechada, con la misma estructura para todos."},
        {"q": "¿Están ya los programas electorales del 29-N?", "a": f"A {D18} ningún partido ha publicado su programa completo para el 29-N. Actualizamos esta página cuando lo hagan."}]
    rel = [x for x in g["related"] if x["href"] not in {e["href"] for e in extra_rel}]
    g["related"] = extra_rel + rel
    assert len(g["description"]) <= 160 and len(g["title"]) <= 66, path
    for sec in secs:
        k = [p[:40] for p in sec["paragraphs"]]; assert len(k) == len(set(k))
    src = src[:a] + json.dumps(g, ensure_ascii=False, indent=0) + src[b:]

T_EST = "Santiago Abascal, mitin en Estepona (Málaga), 11-10-2026"
topic("/elecciones/promesas/que-propone-cada-partido-inmigracion", "inmigración", {
  "pp": [r("Una nueva ley de extranjería que permita expulsiones inmediatas por entradas irregulares. Sobre Ceuta: «La única solución es que los 15.000 se vayan de Ceuta y se vayan de España».", "Alberto Núñez Feijóo, acto de precampaña en Ceuta, 07-10-2026", "prensa", "esp_ceuta")],
  "psoe": [r("Defendió la regularización de migrantes: de 1,2 millones de personas en trámites para obtener permiso de residencia y trabajo, «casi medio millón están trabajando y cotizando a la Seguridad Social».", "Pedro Sánchez, acto en Zaragoza, 14-10-2026", "prensa", "ep_zgz")],
  "vox": [r("«Remigración»: repatriar a quien entra en España de forma irregular, que los extranjeros que cometen delitos cumplan la pena en su país y que vuelvan quienes vienen «a vivir de las ayudas sociales».", T_EST, "oficial-partido", "vox_est"),
          r("Militarizar la frontera de Ceuta con Marruecos y expulsar a quienes entraron de forma irregular en la crisis de finales de julio.", "Santiago Abascal, comparecencia en Ceuta, 12-10-2026", "prensa", "abc_ceuta")],
  "podemos": [r("Pedir que los migrantes regularizados puedan votar y una reforma legal que acorte los plazos para obtener la nacionalidad; condicionar la cesión de competencias migratorias a Cataluña al cierre de los CIE.", "Pablo Fernández, portavoz de Podemos, rueda de prensa en Madrid, 02-02-2026 (antes de la convocatoria)", "prensa", "elp_pod")],
  "democracia-21": [r("La inmigración como «activo y ventaja competitiva», con una política «sensata y con cabeza»: «Tenemos que desterrar los discursos xenófobos, pero decidiendo quién entra, cómo entra, cuándo entra y cuándo sale si tiene que salir».", "Miriam González, presentación de Democracia 21, Madrid, 10-10-2026", "prensa", "ep_d21")],
 },
 "Inmigración el 29-N: qué proponen PP, PSOE, Vox y el resto",
 "Qué dicen PP, PSOE, Vox, Frente Amplio, Podemos y Democracia 21 sobre inmigración antes del 29-N: cada medida con quién la dijo, cuándo y su fuente.",
 f"a {D18} ningún partido ha publicado su programa para el 29-N. Han hecho propuestas o declaraciones fechadas sobre inmigración PP, PSOE, Vox, Podemos y Democracia 21; de Frente Amplio no hemos encontrado ninguna concreta. Abajo, cada partido con la misma estructura.",
 [{"q": "¿Qué propone Vox sobre inmigración?", "a": "Abascal propuso el 11-10-2026 la «remigración»: repatriar a quien entra de forma irregular, que los extranjeros que delinquen cumplan la pena en su país y que vuelvan quienes vienen «a vivir de las ayudas sociales» (web de Vox). El 12-10-2026 pidió militarizar la frontera de Ceuta (ABC)."},
  {"q": "¿Qué propone el PP sobre inmigración?", "a": "Feijóo prometió en Ceuta el 07-10-2026 una ley de extranjería que permita expulsiones inmediatas por entradas irregulares (El Español)."},
  {"q": "¿Qué dicen PSOE, Frente Amplio, Podemos y Democracia 21?", "a": "Sánchez defendió la regularización de migrantes el 14-10-2026 (Europa Press). Podemos pidió en febrero que los regularizados puedan votar (El Periódico). Democracia 21 habló de «decidir quién entra» y de desterrar los discursos xenófobos (Europa Press, 10-10-2026). De Frente Amplio no hemos encontrado propuestas concretas a 18 de octubre."}],
 [{"href": "/elecciones/programas-electorales-29n", "label": "Programas y mítines del 29-N"}])

topic("/elecciones/promesas/que-propone-cada-partido-pensiones", "pensiones", {
  "pp": [r("«Las pensiones se actualizarán con el IPC»; garantizar el sistema público de pensiones y su viabilidad, que llamó «innegociables».", "Alberto Núñez Feijóo, comparecencia en Bruselas, 15-10-2026", "prensa", "elpais_bxl")],
  "psoe": [r("«Cuatro años más de revalorización de las pensiones conforme al IPC» y «cero recortes».", "Pedro Sánchez, acto en Zaragoza, 14-10-2026", "prensa", "ep_zgz"),
           r("«Las pensiones no se tocan».", "Pedro Sánchez, mitin en Fuenlabrada (Madrid), 17-10-2026", "prensa", "ep_fuen")],
  "vox": [r("Garantizar el pago de las pensiones, sin detallar la fórmula de revalorización.", T_EST, "oficial-partido", "vox_est"),
          r("Las pensiones «se van a pagar al precio que sea y como sea»; «nos da igual el modelo y la fórmula». Negó que Vox vaya a privatizarlas.", T_EST, "prensa", "ep_est")],
  "frente-amplio": [r("No permitir que se «cargue» el sistema público de pensiones.", "Ernest Urtasun, mitin de presentación en Madrid, 17-10-2026", "prensa", "eldiario_fa")],
  "podemos": [r("Proposición de ley para jubilarse anticipadamente sin recorte por coeficientes reductores con 40 años o más cotizados; el Congreso la tomó en consideración.", "Ione Belarra, Congreso, 22-09-2026", "prensa", "debate_pl")],
 },
 "Pensiones el 29-N: qué proponen PP, PSOE, Vox y el resto",
 "Qué dicen PP, PSOE, Vox, Frente Amplio, Podemos y Democracia 21 sobre pensiones antes del 29-N: cada medida con quién la dijo, cuándo y su fuente.",
 f"a {D18} ningún partido ha publicado su programa para el 29-N. PP, PSOE y Vox se han comprometido a actualizar o pagar las pensiones; Frente Amplio dice que no permitirá que se «cargue» el sistema y Podemos propone jubilarse antes sin recorte con 40 años cotizados. De Democracia 21 no hemos encontrado declaraciones sobre pensiones.",
 [{"q": "¿Algún partido quiere quitar las pensiones?", "a": f"A {D18} no hemos encontrado ninguna declaración en ese sentido. Lo explicamos partido a partido en «¿Quiere algún partido quitar las pensiones?»."}],
 [{"href": "/elecciones/quiere-algun-partido-quitar-las-pensiones", "label": "¿Quiere algún partido quitar las pensiones?"},
  {"href": "/trabajo/revalorizacion-pensiones-2026", "label": "Subida de las pensiones en 2026"}])

# otros-partidos: Democracia 21 con datos verificados
a, b = find(src, "/elecciones/promesas/otros-partidos"); g = json.loads(src[a:b])
lst = g["sections"][0]["paragraphs"]
i = [k for k, p in enumerate(lst) if p.startswith("Democracia 21")]
assert len(i) == 1
lst[i[0]] = "Democracia 21: coalición «Democracia para el siglo 21» (D21) con Ciudadanos y UCIN, solo en Madrid y Barcelona, según la Junta Electoral Central. Candidata: Miriam González. Programa pendiente; sus propuestas de la presentación del 10 de octubre están en la página de programas y mítines."
g["reviewedAt"] = "2026-10-18"
if not any(x["href"] == SRC["jec"][1] for x in g["sources"]): g["sources"].append(s("jec"))
if not any(x["href"] == SRC["ep_d21"][1] for x in g["sources"]): g["sources"].append(s("ep_d21"))
if not any(x["href"] == "/elecciones/programas-electorales-29n" for x in g["related"]):
    g["related"].insert(0, {"href": "/elecciones/programas-electorales-29n", "label": "Programas y mítines del 29-N"})
src = src[:a] + json.dumps(g, ensure_ascii=False, indent=0) + src[b:]
P.write_text(src); print("ok")
