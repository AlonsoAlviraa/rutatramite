"""Añade a promises.json las propuestas de vivienda del PP en Sevilla, 21-10-2026 (idempotente).
Ejecutar DESPUÉS de sync_promesas_mitines_20261021.py. Fuente principal: pp.es (nota oficial 21-10);
contraste: El País y Europa Press (21-10). La cuantía de las deducciones al alquiler no se ha concretado."""
import json, pathlib
P = pathlib.Path(__file__).resolve().parent.parent / "data/promesas-29n/promises.json"
D = json.loads(P.read_text())
PP = "https://www.pp.es/actualidad/articulos/feijoo-anuncia-deducciones-para-alquileres-y-aprobara-en-sus-cien-dias-las-leyes-para-construir-un-millon-de-viviendas-y-desalojar-okupas/"
WHO = "Alberto Núñez Feijóo, acto sobre vivienda en Sevilla con Juanma Moreno, 21-10-2026"
base = dict(party="pp", topic="vivienda", source_url=PP, source_title="pp.es: acto sobre vivienda en Sevilla (nota oficial)",
            source_date="2026-10-21", source_type="oficial-partido", level="estatal", tax=None, cost=None, impact=None, who=WHO)
NEW = [
 dict(base, id="pp-deduccion-prorroga-alquiler-ipc", profiles=["joven-alquiler", "familia", "jubilado"],
      measure="Deducciones fiscales para inquilinos y propietarios que prorroguen su contrato de alquiler hasta tres años con subidas de la renta por debajo del IPC. Cuantía: sin concretar.",
      quote="deducciones fiscales para inquilinos y propietarios que prorroguen sus contratos hasta tres años con subidas por debajo del IPC"),
 dict(base, id="pp-silencio-positivo-licencias-90-dias",  profiles=["familia", "joven-alquiler"],
      measure="Silencio administrativo positivo a los 90 días con carácter general: la licencia de construcción que el ayuntamiento no resuelva en 90 días se entiende concedida.",
      quote="el silencio administrativo positivo a los 90 días con carácter general"),
 dict(base, id="pp-tres-leyes-100-dias", profiles=["familia", "joven-alquiler"],
      measure="Aprobar en los primeros 100 días de gobierno tres proyectos de ley: Ley del Suelo, ley contra la ocupación (desalojo en 48 horas) y reforma de la Ley de Propiedad Horizontal.",
      quote="en los cien primeros días de Gobierno aprobará la Ley del Suelo, la Ley para desalojar okupas en 48 horas y la reforma de la Ley de Propiedad Horizontal"),
 dict(base, id="pp-jovenes-40-iva-itp-60", profiles=["joven-alquiler", "familia"],
      measure="Para menores de 40 años que compren su primera vivienda: rebaja del 60 % del IVA y del ITP, avales de hasta el 100 %, aplazar el pago de esos impuestos mientras dure la hipoteca, «Hucha Hogar Joven» con aportaciones deducibles y bonificaciones en el IRPF los primeros cuatro años de cotización.",
      quote="avales del 100% y rebaja del 60% del IVA y del ITP"),
]
ids = {p["id"] for p in D["promises"]}
added = [p for p in NEW if p["id"] not in ids]
D["promises"] += added
P.write_text(json.dumps(D, ensure_ascii=False, indent=1) + "\n")
print("added", len(added), [p["id"] for p in added], "total", len(D["promises"]))
