"""Añade a promises.json las propuestas verificadas el 26-10-2026 (idempotente). Ejecutar DESPUÉS de sync_promesas_mitines_20261025.py.
- Vox: documento «Recuperar España» (voxespana.es, PDF de octubre de 2026): gravamen a las remesas, prohibir burka y niqab,
  IMV solo para españoles, impuestos cero a la primera vivienda. No es un programa electoral completo (6 páginas).
- Frente Amplio: Toni Valero, mitin en Móstoles, 25-10-2026: impuestos a especuladores de vivienda y expropiar pisos a fondos buitre (Europa Press).
- PP (Salamanca, 25-10: bajada inmediata de impuestos, un millón de viviendas, pensiones), PSOE (entrevista en El País, 25-10),
  Podemos y D21: sin medidas nuevas concretas.
Actualiza «updated» a 2026-10-26."""
import json, pathlib
P = pathlib.Path(__file__).resolve().parent.parent / "data/promesas-29n/promises.json"
D = json.loads(P.read_text())
D["updated"] = "2026-10-26"
VOX = "https://www.voxespana.es/wp-content/uploads/2026/10/RECUPERAR-ESPANA-A4.pdf"
EP = "https://www.europapress.es/nacional/noticia-colau-llama-llenar-calles-poner-cuerpo-frente-politicos-solo-usan-piquito-oro-20261025140652.html"
b = dict(level="estatal", tax=None, cost=None, impact=None)
VT = "voxespana.es: documento «Recuperar España»"
VW = "Vox, documento «Recuperar España» (octubre de 2026)"
NEW = [
 dict(b, id="vox-gravamen-remesas", party="vox", topic="impuestos", profiles=[],
      measure="Un impuesto sobre las remesas, el dinero que se envía al extranjero, para que «el dinero generado en España» se quede en servicios aquí. No concreta el tipo ni a quién se aplicaría.",
      quote="el dinero generado en España ha de redundar en mejores servicios aquí",
      source_url=VOX, source_title=VT, source_date="2026-10", source_type="oficial-partido", who=VW),
 dict(b, id="vox-prohibir-burka", party="vox", topic="inmigracion", profiles=[],
      measure="Prohibir el burka y el niqab en los espacios públicos.",
      quote="Prohibir el burka y el niqab en espacios públicos",
      source_url=VOX, source_title=VT, source_date="2026-10", source_type="oficial-partido", who=VW),
 dict(b, id="vox-imv-solo-espanoles", party="vox", topic="inmigracion", profiles=["parado", "familia"],
      measure="Que el Ingreso Mínimo Vital solo lo cobren españoles. Hoy pueden pedirlo también los extranjeros con al menos un año de residencia legal en España.",
      quote="Ingreso Mínimo Vital solo para los españoles necesitados",
      source_url=VOX, source_title=VT, source_date="2026-10", source_type="oficial-partido", who=VW),
 dict(b, id="vox-impuestos-cero-primera-vivienda", party="vox", topic="vivienda", profiles=["joven-alquiler", "familia"],
      measure="«Impuestos cero» al comprar la primera vivienda, junto con liberar suelo e invertir en vivienda protegida. No detalla qué impuestos (hoy se paga el ITP en vivienda usada o el IVA del 10 % en vivienda nueva).",
      quote="impuestos cero a tu primera vivienda",
      source_url=VOX, source_title=VT, source_date="2026-10", source_type="oficial-partido", who=VW),
 dict(b, id="fa-impuestos-especuladores", party="frente-amplio", topic="vivienda", profiles=["joven-alquiler"],
      measure="Subir los impuestos a quienes especulan con la vivienda y expropiar pisos a los fondos buitre. No detalló qué impuestos ni el procedimiento.",
      quote="freír a impuestos a los especuladores",
      source_url=EP, source_title="Europa Press: mitin de Frente Amplio en Móstoles", source_date="2026-10-25",
      source_type="prensa", who="Toni Valero (IU, n.º 3 de Frente Amplio por Madrid), mitin en Móstoles, 25-10-2026"),
]
ids = {p["id"] for p in D["promises"]}
added = [p for p in NEW if p["id"] not in ids]
D["promises"] += added
P.write_text(json.dumps(D, ensure_ascii=False, indent=1) + "\n")
print("added", len(added), [p["id"] for p in added], "total", len(D["promises"]))
