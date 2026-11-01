"""Añade a promises.json las propuestas verificadas el 21-10-2026 (idempotente). Ejecutar DESPUÉS de sync_promesas_mitines_20261020.py.
- Vox / Santiago Abascal, acto de precampaña en Ponferrada (León), 20-10-2026: «prioridad nacional» también en ayudas al alquiler y
  plazas de guardería. Fuente: voxespana.es (web oficial, 20-10-2026), texto literal de la nota del partido.
Actualiza «updated» a 2026-10-21."""
import json, pathlib
P = pathlib.Path(__file__).resolve().parent.parent / "data/promesas-29n/promises.json"
D = json.loads(P.read_text())
D["updated"] = "2026-10-21"
NEW = [{
 "id": "vox-prioridad-alquiler-guarderia", "party": "vox", "topic": "vivienda",
 "measure": "«Prioridad nacional» también en las ayudas al alquiler y en las plazas de guardería: que los españoles sean los primeros en recibirlas, igual que las ayudas sociales.",
 "quote": "que los españoles sean los primeros en recibir ayudas sociales, ayudas al alquiler y plazas de guardería",
 "source_url": "https://www.voxespana.es/abascal/abascal-denuncia-que-sanchez-pretender-dirigir-espana-como-si-fuera-una-dictadura-y-llama-a-llenar-las-urnas-el-29n-20261020",
 "source_title": "voxespana.es: acto de Ponferrada",
 "source_date": "2026-10-20", "source_type": "oficial-partido", "level": "estatal+autonómica", "tax": None,
 "profiles": ["joven-alquiler", "familia"], "cost": None, "impact": None,
 "who": "Santiago Abascal, acto de precampaña en Ponferrada (León), 20-10-2026",
}]
ids = {p["id"] for p in D["promises"]}
added = [p for p in NEW if p["id"] not in ids]
D["promises"] += added
P.write_text(json.dumps(D, ensure_ascii=False, indent=1) + "\n")
print("added", len(added), [p["id"] for p in added], "total", len(D["promises"]))
