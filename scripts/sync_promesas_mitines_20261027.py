"""Añade a promises.json las propuestas verificadas el 27-10-2026 (idempotente). Ejecutar DESPUÉS de sync_promesas_mitines_20261026.py.
- PSOE: Sánchez, mitin en Gijón, 26-10-2026: reformar la Constitución para blindar las pensiones y su revalorización con el IPC (Europa Press).
- PP: Feijóo, entrevista en Vozpópuli, 26-10-2026: vivienda en una vicepresidencia con «mando único».
- Frente Amplio: Colau, carta a los candidatos, 26-10-2026: regular por ley el uso de la IA en campañas electorales (elDiario.es).
- Vox (Talavera de la Reina, 26-10: presentación de candidatos), Podemos y D21: sin medidas nuevas concretas.
Actualiza «updated» a 2026-10-27."""
import json, pathlib
P = pathlib.Path(__file__).resolve().parent.parent / "data/promesas-29n/promises.json"
D = json.loads(P.read_text())
D["updated"] = "2026-10-27"
EP = "https://www.europapress.es/nacional/noticia-sanchez-promete-reformara-constitucion-blindar-subida-pensiones-conforme-ipc-20261026195312.html"
VP = "https://www.vozpopuli.com/espana/politica/feijoo-elevara-la-vivienda-a-una-vicepresidencia-estrategica-y-nombrara-un-mando-unico-si-gobierna.html"
ED = "https://www.eldiario.es/politica/colau-pide-carta-feijoo-sanchez-abascal-comprometan-no-ia-manera-vejatoria-campana_1_13616697.html"
b = dict(level="estatal", tax=None, cost=None, impact=None)
NEW = [
 dict(b, id="psoe-constitucion-pensiones-ipc", party="psoe", topic="pensiones", profiles=["jubilado"],
      measure="Reformar la Constitución en la próxima legislatura para blindar las pensiones y su revalorización con el IPC. Hoy la subida con el IPC está en una ley (Ley 21/2021), que puede cambiarse por mayoría simple; una reforma constitucional ordinaria necesita tres quintos de cada Cámara (210 diputados).",
      quote="La próxima legislatura reformaremos la Constitución para blindar las pensiones y su revalorización conforme al IPC",
      source_url=EP, source_title="Europa Press: Sánchez en Gijón", source_date="2026-10-26", source_type="prensa",
      who="Pedro Sánchez, mitin de precampaña en Gijón, 26-10-2026"),
 dict(b, id="pp-vicepresidencia-vivienda", party="pp", topic="vivienda", profiles=["joven-alquiler"],
      measure="Llevar la vivienda a una vicepresidencia del Gobierno con un «mando único» que coordine a todos los ministerios, comunidades y ayuntamientos, y dedicar la primera Conferencia de Presidentes al plan de un millón de viviendas.",
      quote="No será una ventanilla donde informar, no, será un mando único indiscutible",
      source_url=VP, source_title="Vozpópuli: Feijóo y la vicepresidencia de vivienda", source_date="2026-10-26", source_type="prensa",
      who="Alberto Núñez Feijóo, declaraciones a Vozpópuli, 26-10-2026"),
 dict(b, id="fa-regular-ia-campanas", party="frente-amplio", topic="instituciones", profiles=[],
      measure="Regular por ley el uso de la inteligencia artificial en las campañas electorales. Mientras tanto, pidió a PP, PSOE y Vox un acuerdo para no usar IA «vejatoria» ni suplantar identidades en campaña.",
      quote="Hay que regular legalmente el uso de la inteligencia artificial en campañas electorales",
      source_url=ED, source_title="elDiario.es: carta de Colau a los candidatos", source_date="2026-10-26", source_type="prensa",
      who="Ada Colau, carta a Feijóo, Sánchez y Abascal, 26-10-2026"),
]
ids = {p["id"] for p in D["promises"]}
added = [p for p in NEW if p["id"] not in ids]
D["promises"] += added
P.write_text(json.dumps(D, ensure_ascii=False, indent=1) + "\n")
print("added", len(added), [p["id"] for p in added], "total", len(D["promises"]))
