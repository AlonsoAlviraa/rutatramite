"""19-10-2026 · «Contrato con España» del PP. Idempotente.
Orden: sync_promesas_contrato → gen_promesas → splice → patch_temas → edit_programas_mitines → exploit_clicks → link_cuando → link_voto_nulo → gen_contrato_pp → ESTE.
Si se regenera pensiones-29n.ts (gen_pensiones_20261018.py), volver a ejecutar este script.
- Registra /elecciones/contrato-con-espana-pp (catálogo + sitemap).
- programas-electorales-29n: frase en el lead y en «estado», fila y párrafo en la sección PP, FAQ y enlace. NO toca title/description/H1 (test CTR).
  No cambia «ningún partido ha publicado su programa»: el documento dice que «va más allá de un programa de Gobierno».
- partido-pp: FAQ y enlace. quiere-el-pp-quitar-las-pensiones: fila, sección «programa», FAQ y enlace."""
import json, pathlib, sys
sys.path.insert(0, str(pathlib.Path(__file__).parent))
from _jsonspan import span
ROOT = pathlib.Path(__file__).resolve().parent.parent
T = ROOT / "src/lib/tramites"
NEWP = "/elecciones/contrato-con-espana-pp"
LINK = {"href": NEWP, "label": "Contrato con España del PP: los 12 puntos"}
ABC = {"label": "ABC, 19-10-2026: documento íntegro del «Contrato con España»", "href": "https://www.abc.es/espana/doce-puntos-contrato-espana-feijoo-consulta-documento-20261019131424-nt.html"}
MARK = "Contrato con España"

cat = T / "catalog.ts"; s = cat.read_text()
if "CONTRATO_PP_GUIDES" not in s:
    s = s.replace('import { VOTO_NULO_CASOS_GUIDES } from "@/lib/tramites/voto-nulo-casos";\n', 'import { VOTO_NULO_CASOS_GUIDES } from "@/lib/tramites/voto-nulo-casos";\nimport { CONTRATO_PP_GUIDES } from "@/lib/tramites/contrato-pp";\n', 1)
    s = s.replace("  ...VOTO_NULO_CASOS_GUIDES,\n", "  ...VOTO_NULO_CASOS_GUIDES,\n  ...CONTRATO_PP_GUIDES,\n", 1)
    assert s.count("CONTRATO_PP_GUIDES") == 2; cat.write_text(s)
sm = ROOT / "scripts/build_sitemaps.py"; s = sm.read_text()
anchor = '    "/elecciones/diputados-por-provincia-29n",\n'; assert anchor in s
if f'"{NEWP}"' not in s: sm.write_text(s.replace(anchor, anchor + f'    "{NEWP}",\n', 1))

def addrel(g):
    if not any(r["href"] == NEWP for r in g["related"]): g["related"].insert(0, LINK)

f = T / "promesas-29n.ts"; s = f.read_text()
def edit(path, fn):
    global s
    a, b = span(s, path); g = json.loads(s[a:b]); fn(g); s = s[:a] + json.dumps(g, ensure_ascii=False, indent=0) + s[b:]

def programas(g):
    add = " El PP presentó el 19 de octubre su «Contrato con España», un documento de 12 compromisos que no es su programa."
    if MARK not in g["lead"]:
        k = "para el 29-N."; assert k in g["lead"]; g["lead"] = g["lead"].replace(k, k + add, 1)
    est = next(x for x in g["sections"] if x["id"] == "estado")
    if not any(MARK in p for p in est["paragraphs"]):
        est["paragraphs"].insert(1, "El 19 de octubre, Alberto Núñez Feijóo firmó en Madrid el «Contrato con España», 12 compromisos para el caso de que llegue a la Presidencia del Gobierno. El propio documento dice que «va más allá de un programa de Gobierno o una lista de medidas», así que no lo contamos como programa: el del PP sigue pendiente. Los 12 puntos están en su página.")
    pp = next(x for x in g["sections"] if x["id"] == "pp")
    pp["paragraphs"] = [p.replace(" y acto en Barcelona con Xavier García Albiol (18-10).", ", acto en Barcelona con Xavier García Albiol (18-10) y firma del «Contrato con España» en Madrid (19-10).") if p.startswith("Candidato:") else p for p in pp["paragraphs"]]
    pp["paragraphs"] = [("Programa del 29-N: no publicado a 19 de octubre de 2026." if p.startswith("Programa del 29-N") else p) for p in pp["paragraphs"]]
    if not any(MARK in p for p in pp["paragraphs"]):
        pp["paragraphs"].insert(2, "El 19 de octubre presentó el «Contrato con España», 12 compromisos firmados por Feijóo que el documento distingue de un programa de Gobierno.")
    rows = pp["table"]["rows"]
    if not any(MARK in r["cells"][1] for r in rows):
        rows.insert(0, {"cells": ["Varios temas", "Firmó el «Contrato con España», 12 compromisos: soberanía y fronteras, separación de poderes, un Estado con menos ministerios y altos cargos, al menos un millón de viviendas, prohibir por ley las regularizaciones colectivas, pensiones con el IPC, más médicos, educación, seguridad, revisar las subidas fiscales y bajar impuestos, subir el salario medio y política exterior.", "Feijóo, acto en el Espacio Larra, Madrid, 19-10-2026"], "source": ABC})
    if not any(MARK in q["q"] for q in g["faqs"]):
        g["faqs"].insert(1, {"q": "¿El Contrato con España es el programa electoral del PP?", "a": "No. Es un documento de 12 compromisos que Feijóo firmó el 19 de octubre de 2026; el propio texto dice que «va más allá de un programa de Gobierno o una lista de medidas». El programa del PP para el 29-N sigue sin publicarse."})
    addrel(g)
edit("/elecciones/programas-electorales-29n", programas)

def ficha(g):
    q = next(x for x in g["faqs"] if x["q"].startswith("¿Ha publicado PP su programa"))
    if MARK not in q["a"]: q["a"] += " El 19 de octubre presentó el «Contrato con España», 12 compromisos firmados por Feijóo que no son el programa; sus puntos están incorporados aquí, tema a tema."
    addrel(g)
edit("/elecciones/promesas/partido-pp", ficha)
for p in ["/elecciones/promesas/que-propone-cada-partido-instituciones-y-gasto-publico", "/elecciones/promesas/que-propone-cada-partido-pensiones", "/elecciones/promesas/que-propone-cada-partido-vivienda"]:
    edit(p, addrel)
f.write_text(s)

f = T / "pensiones-29n.ts"; s = f.read_text()
h = s.index("= [") + 2; G = json.loads(s[h:s.rindex("];") + 1])
g = next(x for x in G if x["path"] == "/elecciones/quiere-el-pp-quitar-las-pensiones")
rows = next(x for x in g["sections"] if x["id"] == "que-ha-dicho")["table"]["rows"]
if not any(MARK in r["cells"][1] for r in rows):
    rows.insert(0, {"cells": ["«Esto exige actualizar conforme al IPC las pensiones actuales y garantizárselo a los más jóvenes. Ambos objetivos son innegociables» (punto 6, «Garantizar las pensiones actuales y futuras», en el marco del Pacto de Toledo).", "Alberto Núñez Feijóo, «Contrato con España» firmado en el Espacio Larra, Madrid, 19-10-2026"], "source": ABC})
prog = next(x for x in g["sections"] if x["id"] == "programa")
prog["paragraphs"] = ["Programa del 29-N: no publicado a 19 de octubre de 2026. El «Contrato con España» del 19 de octubre, que el propio documento distingue de un programa de Gobierno, incluye las pensiones en su punto 6. Cuando se publique el programa, añadiremos lo que diga sobre pensiones."]
q = next(x for x in g["faqs"] if x["q"].startswith("¿Ha publicado el PP su programa"))
q["a"] = "A 19 de octubre de 2026, no. Ese día presentó el «Contrato con España», 12 compromisos que no son el programa; el punto 6 promete actualizar las pensiones con el IPC. Cuando se publique el programa, añadiremos lo que diga, con el enlace."
if MARK not in g["lead"]:
    g["lead"] += " El 19 de octubre, Feijóo incluyó la actualización con el IPC en el punto 6 de su «Contrato con España»."
addrel(g)
f.write_text(s[:h] + json.dumps(G, ensure_ascii=False, indent=1) + s[s.rindex("];") + 1:])
print("ok")
