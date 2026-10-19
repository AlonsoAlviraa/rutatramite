"""Añade a promises.json las propuestas verificadas el 19-10-2026 (idempotente).
- PP / Feijóo, Barcelona 18-10-2026: ley antiokupación («tolerancia cero… fuera en 48 horas sí o sí»; Albiol ponente). Fuente RTVE.
- PP / Bendodo, Granada 16-10-2026: cuota cero 2 años para nuevos autónomos jóvenes; eliminar IVA si facturan <85.000 €; menos declaraciones. Fuente pp.es.
Actualiza «updated» a 2026-10-19. No inventa citas."""
import json, pathlib
P = pathlib.Path(__file__).resolve().parent.parent / "data/promesas-29n/promises.json"
D = json.loads(P.read_text())
D["updated"] = "2026-10-19"

S = {
 "rtve_bcn": (
  "https://www.rtve.es/noticias/20261018/feijoo-mitin-pp-barcelona-elecciones-generales-directo-cronica/17271485.shtml",
  "RTVE: Feijóo en Barcelona (ley antiokupación)",
  "2026-10-18",
  "Alberto Núñez Feijóo, acto de precampaña en Barcelona con Xavier García Albiol, 18-10-2026",
 ),
 "pp_bendodo": (
  "https://www.pp.es/actualidad/articulos/bendodo-promete-dos-anos-de-cuota-cero-para-los-nuevos-autonomos-y-eliminar-el-iva-para-quienes-facturen-menos-de-85-000-euros/",
  "pp.es: Bendodo en Granada (autónomos)",
  "2026-10-16",
  "Elías Bendodo, acto con jóvenes empresarios en Granada, 16-10-2026",
 ),
}

def pr(id_, party, topic, measure, quote, k, stype="prensa", level="estatal", tax=None, profiles=(), cost=None):
    url, title, date, who = S[k]
    return {
        "id": id_, "party": party, "topic": topic, "measure": measure, "quote": quote,
        "source_url": url, "source_title": title, "source_date": date, "source_type": stype,
        "level": level, "tax": tax, "profiles": list(profiles), "cost": cost, "impact": None, "who": who,
    }

NEW = [
 pr(
  "pp-ley-antiokupacion-48h", "pp", "vivienda",
  "Ley antiokupación con «tolerancia cero»: desalojar a los okupas «fuera en 48 horas sí o sí»; Xavier García Albiol será ponente de la ley tras el 29-N.",
  "Tolerancia cero con los okupas, fuera en 48 horas sí o sí",
  "rtve_bcn", profiles=["familia", "joven-alquiler"],
 ),
 pr(
  "pp-cuota-cero-autonomos-jovenes", "pp", "empleo",
  "Tarifa o cuota cero durante los dos primeros años de actividad para nuevos autónomos menores de 35 años.",
  "tarifa cero en el primer y segundo año de actividad a menores de 35 años",
  "pp_bendodo", stype="oficial-partido", profiles=["autonomo"],
 ),
 pr(
  "pp-iva-cero-autonomos-85000", "pp", "impuestos",
  "Eliminar el IVA para autónomos que facturen menos de 85.000 euros al año (plan anunciado para unos 1,4 millones de autónomos).",
  "1,4 millones de autónomos no paguen el IVA si facturan menos de 85.000 euros",
  "pp_bendodo", stype="oficial-partido", tax="iva", profiles=["autonomo"],
 ),
 pr(
  "pp-autonomos-menos-declaraciones", "pp", "administracion",
  "Reducir las declaraciones de los autónomos de cuatro al año a dos o incluso una.",
  "de cuatro declaraciones al año a dos o incluso una",
  "pp_bendodo", stype="oficial-partido", profiles=["autonomo"],
 ),
]

ids = {p["id"] for p in D["promises"]}
added = [p for p in NEW if p["id"] not in ids]
D["promises"] += added
P.write_text(json.dumps(D, ensure_ascii=False, indent=1) + "\n")
print("added", len(added), [p["id"] for p in added], "total", len(D["promises"]))
