"""Añade a promises.json las propuestas verificadas el 22-10-2026 (idempotente). Ejecutar DESPUÉS de sync_promesas_pp_sevilla_20261021.py.
- PP / Alberto Nadal (vicesecretario de Economía), visita a explotaciones ganaderas de los Montes de Toledo, 21-10-2026: pacto nacional del agua
  y plan de choque de la red eléctrica en los primeros 18 meses. Fuente: El Periódico (Prensa Ibérica), 21-10-2026.
- PSOE / Pedro Sánchez, mitin en Burgos, 21-10-2026: reforma constitucional para blindar el derecho al aborto. Fuente: 20minutos, 21-10-2026
  (cita literal); contraste: Diario de Burgos, 21-10-2026.
- Democracia 21: apartado de vivienda de su programa, adelantado por El Mundo el 22-10-2026 (el partido no lo ha publicado en democracia21.es).
Actualiza «updated» a 2026-10-22."""
import json, pathlib
P = pathlib.Path(__file__).resolve().parent.parent / "data/promesas-29n/promises.json"
D = json.loads(P.read_text())
D["updated"] = "2026-10-22"
ELP = "https://www.elperiodico.com/es/economia/20261021/alberto-nadal-pp-propone-pacto-135590341"
M20 = "https://www.20minutos.es/nacional/sanchez-exprime-visita-milei-para-alertar-contra-pp-vox-no-proponen-alternancia-es-una-involucion_7051777_0.html"
ELM = "https://www.elmundo.es/elecciones/2026/10/22/6ad8cfa3e4d4d86f108b45da.html"
D21W = "Democracia 21, apartado de vivienda de su programa adelantado por El Mundo, 22-10-2026"
d21 = dict(party="democracia-21", topic="vivienda", source_url=ELM, source_title="El Mundo: el programa de vivienda de Democracia 21",
           source_date="2026-10-22", source_type="prensa", level="estatal", tax=None, cost=None, impact=None, who=D21W)
NEW = [
 dict(id="pp-pacto-agua-red-electrica", party="pp", topic="instituciones", profiles=[],
      measure="Pacto nacional del agua (ejecutar las infraestructuras hidráulicas pendientes y repartir el agua con mecanismos más flexibles) y un plan de choque en los primeros 18 meses de gobierno para reforzar la red eléctrica y facilitar nuevas conexiones. Presupuesto y calendario: sin concretar.",
      quote="un plan de choque para reforzar la red eléctrica durante sus primeros 18 meses",
      source_url=ELP, source_title="El Periódico: Alberto Nadal propone un pacto nacional del agua", source_date="2026-10-21",
      source_type="prensa", level="estatal", tax=None, cost=None, impact=None,
      who="Alberto Nadal, vicesecretario de Economía del PP, visita a explotaciones ganaderas de los Montes de Toledo, 21-10-2026"),
 dict(id="psoe-constitucion-aborto", party="psoe", topic="instituciones", profiles=[],
      measure="Reformar la Constitución en la próxima legislatura para blindar el derecho al aborto. El proyecto de reforma que estaba en el Congreso decayó con la disolución de las Cortes; una reforma constitucional necesita como mínimo tres quintos del Congreso y del Senado (artículo 167).",
      quote="En la próxima legislatura reformaremos la Constitución para blindar el derecho al aborto de las mujeres",
      source_url=M20, source_title="20minutos: Sánchez en Burgos", source_date="2026-10-21",
      source_type="prensa", level="estatal", tax=None, cost=None, impact=None,
      who="Pedro Sánchez, mitin de precampaña en Burgos, 21-10-2026"),
 dict(d21, id="d21-alquiler-tope-garantia", profiles=["joven-alquiler", "familia"],
      measure="Límite «temporal y excepcional» de los precios del alquiler y un Servicio Social de Garantía de Arrendamientos: el Estado paga el alquiler al propietario si el inquilino es declarado vulnerable y no hay alternativa habitacional inmediata.",
      quote="límite temporal y excepcional de los precios de los alquileres"),
 dict(d21, id="d21-mediacion-juzgados-alquiler", profiles=["joven-alquiler", "familia"],
      measure="Servicio de Mediación de Arrendamientos gratuito y vinculante (máximo 30 días) y juzgados especializados de arrendamientos (60 días más); tipificar como estafa firmar un contrato con intención premeditada de no pagar y el subarriendo ilegal; regular en la LAU el alquiler por habitaciones.",
      quote="Servicio de Mediación de Arrendamientos gratuito y vinculante"),
 dict(d21, id="d21-iva-4-asequible-licencias", profiles=["joven-alquiler", "familia"],
      measure="IVA del 4 % (ahora 10 %) para construir y rehabilitar vivienda asequible; suelo público cedido hasta 75 años sin perder la titularidad pública; licencias de obra mayor en 30 días y declaración responsable digital para obras menores.",
      quote="reducir el IVA del 10% al 4% para la construcción y rehabilitación integral de viviendas asequibles"),
]
ids = {p["id"] for p in D["promises"]}
added = [p for p in NEW if p["id"] not in ids]
D["promises"] += added
P.write_text(json.dumps(D, ensure_ascii=False, indent=1) + "\n")
print("added", len(added), [p["id"] for p in added], "total", len(D["promises"]))
