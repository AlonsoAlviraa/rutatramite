"""Añade a promises.json las propuestas verificadas el 20-10-2026 (idempotente).
- PSOE / Pedro Sánchez, mitin en Valladolid, 19-10-2026: subir el salario mínimo «año a año» mientras gobierne, sin cifra.
  Fuente: RTVE (19-10-2026, 21:46); también EFE vía ABC y Telemadrid («todos los años» que gobierne).
Actualiza «updated» a 2026-10-20. No inventa citas: la cita es la que publica RTVE."""
import json, pathlib
P = pathlib.Path(__file__).resolve().parent.parent / "data/promesas-29n/promises.json"
D = json.loads(P.read_text())
D["updated"] = "2026-10-20"
NEW = [{
 "id": "psoe-smi-cada-ano", "party": "psoe", "topic": "empleo",
 "measure": "Subir el salario mínimo interprofesional cada año mientras gobierne. No dio cifra ni calendario.",
 "quote": "SMI año a año",
 "source_url": "https://www.rtve.es/noticias/20261019/sanchez-promete-subira-salario-minimo-todos-anos/17273693.shtml",
 "source_title": "RTVE: Sánchez promete que subirá el salario mínimo «todos los años»",
 "source_date": "2026-10-19", "source_type": "prensa", "level": "estatal", "tax": None,
 "profiles": ["parado"], "cost": None, "impact": None,
 "who": "Pedro Sánchez, mitin de precampaña en Valladolid, 19-10-2026",
}]
ids = {p["id"] for p in D["promises"]}
added = [p for p in NEW if p["id"] not in ids]
D["promises"] += added
P.write_text(json.dumps(D, ensure_ascii=False, indent=1) + "\n")
print("added", len(added), [p["id"] for p in added], "total", len(D["promises"]))
