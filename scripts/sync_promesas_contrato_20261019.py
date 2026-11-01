"""Añade a promises.json los compromisos del «Contrato con España» del PP (Feijóo, Espacio Larra, Madrid, 19-10-2026). Idempotente.
Texto literal del documento (ABC publica el documento íntegro, 19-10-2026; coincide con la nota oficial de pp.es del mismo día).
Solo los puntos que encajan en los temas del comparador; seguridad (9) y política exterior (12) quedan en /elecciones/contrato-con-espana-pp."""
import json, pathlib
P = pathlib.Path(__file__).resolve().parent.parent / "data/promesas-29n/promises.json"
D = json.loads(P.read_text())
URL = "https://www.abc.es/espana/doce-puntos-contrato-espana-feijoo-consulta-documento-20261019131424-nt.html"
TITLE = "ABC: documento íntegro del «Contrato con España» del PP"
WHO = "Alberto Núñez Feijóo, «Contrato con España» (documento firmado), Espacio Larra, Madrid, 19-10-2026"
def pr(id_, topic, measure, quote, profiles=(), tax=None):
    return {"id": id_, "party": "pp", "topic": topic, "measure": measure, "quote": quote, "source_url": URL, "source_title": TITLE,
            "source_date": "2026-10-19", "source_type": "prensa", "level": "estatal", "tax": tax, "profiles": list(profiles), "cost": None, "impact": None, "who": WHO}
NEW = [
 pr("pp-contrato-separacion-poderes", "instituciones", "Contrato con España, punto 2: que «los jueces elegirán a los jueces»; Tribunal Constitucional, Fiscalía General y órganos reguladores dirigidos por personas independientes; presupuestos cada año y elecciones obligatorias si se acumula más de una prórroga presupuestaria.", "convocará obligatoriamente elecciones si acumula más de una prórroga"),
 pr("pp-contrato-estado-ligero", "administracion", "Contrato con España, punto 3: auditar «cada euro» y reducir ministerios, altos cargos y asesores; todo cargo político responderá por la corrupción de sus subordinados.", "menos ministerios, menos altos cargos y menos asesores"),
 pr("pp-contrato-vivienda-jovenes", "vivienda", "Contrato con España, punto 4: construir al menos un millón de viviendas nuevas, prioridad de los jóvenes en el acceso al alquiler y a la compra con «la mayor ayuda económica de la historia», y desalojo de okupas en 48 horas.", "construir al menos un millón de nuevas viviendas", ("joven-alquiler", "familia")),
 pr("pp-contrato-inmigracion", "inmigracion", "Contrato con España, punto 5: prohibir por ley las regularizaciones colectivas, reforzar los criterios de acceso a la nacionalidad y reforzar las fronteras con medios humanos, materiales y tecnológicos (punto 1).", "se establecerá por ley la prohibición de regulaciones colectivas"),
 pr("pp-contrato-pensiones-ipc", "pensiones", "Contrato con España, punto 6: actualizar las pensiones conforme al IPC, garantizárselo a los más jóvenes y defender el sistema en el marco del Pacto de Toledo.", "actualizar conforme al IPC las pensiones actuales y garantizárselo a los más jóvenes", ("jubilado",)),
 pr("pp-contrato-sanidad-medicos", "sanidad", "Contrato con España, punto 7: más médicos y mejores condiciones laborales y retributivas para los profesionales sanitarios.", "Más médicos y con mejores condiciones"),
 pr("pp-contrato-educacion", "educacion", "Contrato con España, punto 8: contenidos educativos elaborados por las reales academias, más exigencia y autoridad del docente, castellano garantizado en toda España y lenguas cooficiales en sus comunidades, y protección de los menores frente a las redes sociales.", "Los contenidos serán elaborados por las reales academias", ("familia",)),
 pr("pp-contrato-impuestos", "impuestos", "Contrato con España, punto 10: revisar «una a una» las más de cien subidas fiscales de los últimos años y bajar los impuestos.", "Revisaremos una a una las más de cien subidas fiscales de los últimos años"),
 pr("pp-contrato-salario-medio", "empleo", "Contrato con España, punto 11: que suba el salario medio, con más productividad, y que «el subsidio no compita con el empleo».", "Nuestro objetivo económico más ambicioso es que suba el salario medio de los españoles"),
]
known = {p["id"] for p in D["promises"]}
prof = {x for p in D["promises"] for x in p["profiles"]}
for n in NEW:
    assert all(x in prof for x in n["profiles"]), n["profiles"]
    if n["id"] not in known: D["promises"].append(n)
D["updated"] = "2026-10-19"
P.write_text(json.dumps(D, ensure_ascii=False, indent=1) + "\n")
print(len(D["promises"]))
