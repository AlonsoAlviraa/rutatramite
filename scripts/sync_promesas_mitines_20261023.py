"""Añade a promises.json las propuestas verificadas el 23-10-2026 (idempotente). Ejecutar DESPUÉS de sync_promesas_mitines_20261022.py.
- PP: plan de vivienda de 23 medidas presentado por Feijóo en Sevilla; El Español publica el documento completo el 22-10-2026
  (Fondo Estatal de Garantía del Alquiler, bonificación del 75 % en el IRPF por alquilar viviendas vacías, deducción del 15 % del alquiler
  para jóvenes, IRPF cero el primer año de trabajo). Juan Bravo (À Punt Ràdio, 22-10): segregar pisos grandes (El País, 22-10).
- Vox: Abascal en Segovia, 22-10-2026: «recuperar Ceuta al precio que sea» como prioridad tras el 29-N (voxespana.es, 22-10).
- Frente Amplio: Ernest Urtasun y Rosa Martínez en Barcelona, 22-10-2026: prestación universal por crianza vía IRPF, ~13.000 M€ (EFE).
Actualiza «updated» a 2026-10-23."""
import json, pathlib
P = pathlib.Path(__file__).resolve().parent.parent / "data/promesas-29n/promises.json"
D = json.loads(P.read_text())
D["updated"] = "2026-10-23"
EES = "https://www.elespanol.com/espana/politica/20261022/feijoo-completa-plan-vivienda-medidas-jovenes-emancipen-lograr-espana-propietarios/1003744429961_0.html"
ELP = "https://elpais.com/economia/vivienda/2026-10-22/el-pp-propone-segregar-pisos-de-gran-tamano-como-remedio-ante-la-falta-de-vivienda.html"
VOX = "https://www.voxespana.es/abascal/abascal-pide-confiar-en-vox-para-hacer-una-politica-distinta-y-con-sentido-comun-20261022"
EFE = "https://www.infobae.com/espana/agencias/2026/10/22/frente-amplio-plantea-una-prestacion-universal-por-crianza-y-pide-consenso-entre-partidos/"
ppv = dict(party="pp", topic="vivienda", source_url=EES, source_title="El Español: el plan de vivienda de 23 medidas del PP",
           source_date="2026-10-22", source_type="prensa", level="estatal", tax=None, cost=None, impact=None,
           who="Plan de vivienda del PP (23 medidas) presentado por Feijóo en Sevilla; documento publicado por El Español, 22-10-2026")
NEW = [
 dict(ppv, id="pp-fondo-garantia-alquiler-vacias", profiles=["joven-alquiler", "familia"],
      measure="Crear un Fondo Estatal de Garantía del Alquiler que cubra un porcentaje de los impagos y bonificar un 75 % en el IRPF, el primer año, a quien ponga en alquiler una vivienda vacía.",
      quote="Bonificación del 75% en el IRPF por alquilar viviendas vacías"),
 dict(ppv, id="pp-deduccion-15-alquiler-jovenes", profiles=["joven-alquiler", "estudiante"],
      measure="Deducción del 15 % del alquiler para los jóvenes, aval público para la fianza del alquiler de los menores de 35 años e IRPF cero el primer año de trabajo con rebajas los tres siguientes («Plan Prepara»).",
      quote="Deducción del 15% del alquiler para jóvenes"),
 dict(id="pp-segregar-pisos-grandes", party="pp", topic="vivienda", profiles=["familia"],
      measure="Facilitar la segregación de viviendas grandes («de 150 o 200 metros cuadrados») en dos para aumentar la oferta. Ya es posible hoy donde lo permite la normativa urbanística, que depende de ayuntamientos y comunidades autónomas.",
      quote="De una vivienda podemos sacar dos",
      source_url=ELP, source_title="El País: el PP propone segregar pisos de gran tamaño", source_date="2026-10-22",
      source_type="prensa", level="estatal", tax=None, cost=None, impact=None,
      who="Juan Bravo, vicesecretario de Hacienda, Vivienda e Infraestructuras del PP, entrevista en À Punt Ràdio, 22-10-2026"),
 dict(id="vox-recuperar-ceuta", party="vox", topic="inmigracion", profiles=[],
      measure="Prioridad declarada para el día después del 29-N: «recuperar Ceuta al precio que sea». No concretó medidas.",
      quote="recuperar Ceuta al precio que sea",
      source_url=VOX, source_title="voxespana.es: Abascal en Segovia", source_date="2026-10-22",
      source_type="oficial-partido", level="estatal", tax=None, cost=None, impact=None,
      who="Santiago Abascal, acto en Segovia, 22-10-2026"),
 dict(id="fa-prestacion-crianza", party="frente-amplio", topic="impuestos", profiles=["familia"],
      measure="Prestación universal por crianza concedida mediante deducciones en el IRPF, con un coste estimado de unos 13.000 millones de euros, contra la pobreza infantil.",
      quote="prestación universal por crianza",
      source_url=EFE, source_title="EFE (vía Infobae): Frente Amplio plantea una prestación universal por crianza", source_date="2026-10-22",
      source_type="prensa", level="estatal", tax=None, cost="Unos 13.000 millones de euros (cifra del partido).", impact=None,
      who="Ernest Urtasun (número dos de Comuns-Frente Amplio por Barcelona) y Rosa Martínez, Barcelona, 22-10-2026"),
]
ids = {p["id"] for p in D["promises"]}
added = [p for p in NEW if p["id"] not in ids]
D["promises"] += added
P.write_text(json.dumps(D, ensure_ascii=False, indent=1) + "\n")
print("added", len(added), [p["id"] for p in added], "total", len(D["promises"]))
