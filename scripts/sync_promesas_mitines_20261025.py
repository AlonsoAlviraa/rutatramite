"""Añade a promises.json las propuestas verificadas el 25-10-2026 (idempotente). Ejecutar DESPUÉS de sync_promesas_mitines_20261024.py.
- PP: Feijóo, mitin en Vigo, 24-10-2026: mejorar la exención del mínimo familiar del IRPF para familias con hijos (pp.es, 24-10).
- Frente Amplio: Colau y Delgado, manifestación por las pensiones en Madrid, 24-10-2026: ninguna pensión por debajo del SMI y
  edad máxima de jubilación de 65 años (Europa Press 24-10; coste y financiación, Infobae 24-10).
- Vox: Maribel Cerezo (n.º 1 por Baleares), acto de Abascal en Ibiza, 24-10-2026: vivienda para quien trabaja en las Pitiusas (Cadena SER).
- Podemos: Irene Montero, acto con ERC en Barcelona, 24-10-2026: expropiar pisos a los fondos buitre (El Español/EFE).
- PSOE (Granada, 24-10: aborto y SMI, ya recogidos), D21, ERC y resto: sin medidas nuevas concretas.
Actualiza «updated» a 2026-10-25."""
import json, pathlib
P = pathlib.Path(__file__).resolve().parent.parent / "data/promesas-29n/promises.json"
D = json.loads(P.read_text())
D["updated"] = "2026-10-25"
PPES = "https://www.pp.es/actualidad/articulos/feijoo-se-compromete-a-mejorar-la-exencion-del-minimo-familiar-para-que-las-familias-con-hijos-paguen-menos-impuestos/"
EP = "https://www.europapress.es/nacional/noticia-frente-amplio-propone-ninguna-pension-debajo-smi-fijar-65-anos-edad-maxima-jubilacion-20261024130942.html"
SER = "https://cadenaser.com/baleares/2026/10/24/vox-promete-vivienda-para-quien-trabaje-en-ibiza-en-el-acto-de-abascal-en-la-isla-radio-ibiza/"
ELE = "https://www.elespanol.com/espana/20261024/montero-rufian-llaman-someter-psoe-izquierda-primer-acto-frente/1003744433653_0.html"
b = dict(level="estatal", tax=None, cost=None, impact=None)
FAW = "Ada Colau y Emilio Delgado, manifestación en defensa de las pensiones públicas, Madrid, 24-10-2026"
NEW = [
 dict(b, id="pp-minimo-familiar-hijos", party="pp", topic="impuestos", profiles=["familia"],
      measure="Mejorar la exención del mínimo familiar del IRPF para que las familias con hijos paguen menos impuestos. No concretó cuantías. Hoy el mínimo por descendientes es de 2.400 € al año por el primer hijo, 2.700 € por el segundo, 4.000 € por el tercero y 4.500 € por el cuarto y siguientes (artículo 58 de la Ley del IRPF).",
      quote="Es lo lógico y necesario en este momento",
      source_url=PPES, source_title="pp.es: Feijóo, mitin en Vigo (mínimo familiar)", source_date="2026-10-24",
      source_type="oficial-partido", who="Alberto Núñez Feijóo, mitin en Vigo, 24-10-2026"),
 dict(b, id="fa-pension-minima-smi", party="frente-amplio", topic="pensiones", profiles=["jubilado"],
      measure="Que ninguna pensión esté por debajo del salario mínimo (SMI, hoy 1.221 € al mes en 14 pagas) y que las pensiones mínimas suban al mismo ritmo que el SMI. Financiación según el partido: tributación mínima efectiva para grandes empresas y un impuesto del 2 % a los patrimonios de más de un millón de euros.",
      quote="Si sube el SMI, lo lógico es que las pensiones suban al mismo ritmo y que ninguna esté por debajo",
      cost="Unos 10.000 millones de euros al año (cifra del partido, según Infobae).",
      source_url=EP, source_title="Europa Press: Frente Amplio propone que ninguna pensión esté por debajo del SMI", source_date="2026-10-24",
      source_type="prensa", who=FAW),
 dict(b, id="fa-jubilacion-65", party="frente-amplio", topic="pensiones", profiles=["jubilado"],
      measure="Fijar en 65 años la edad máxima de jubilación. Hoy, a los 65 solo se jubila sin recorte quien tiene 38 años y 3 meses cotizados; el resto, a los 66 años y 10 meses. Financiación según el partido: eliminar de forma progresiva el tope máximo de cotización y una aportación de las empresas más automatizadas.",
      quote="y no ir más allá",
      cost="Unos 10.000 millones de euros al año (cifra del partido, según Infobae).",
      source_url=EP, source_title="Europa Press: Frente Amplio propone fijar en 65 años la edad máxima de jubilación", source_date="2026-10-24",
      source_type="prensa", who=FAW),
 dict(b, id="vox-pitiusas-vivienda", party="vox", topic="vivienda", profiles=["joven-alquiler"],
      measure="Para Ibiza y Formentera: «vivienda para quien trabaja aquí», liberar suelo, quitar impuestos y tasas al construir y plazos cerrados para las licencias. Lo planteó la cabeza de lista por Baleares en el acto de Abascal.",
      quote="Vivienda para quien trabaja aquí, liberar suelo, quitar impuestos y tasas al construir, y plazos cerrados para las licencias",
      source_url=SER, source_title="Cadena SER (Radio Ibiza): Vox promete vivienda para quien trabaje en Ibiza", source_date="2026-10-24",
      source_type="prensa", who="Maribel Cerezo, cabeza de lista de Vox por Baleares, acto con Santiago Abascal en Ibiza, 24-10-2026"),
 dict(b, id="podemos-expropiar-fondos", party="podemos", topic="vivienda", profiles=["joven-alquiler"],
      measure="Expropiar pisos a los fondos buitre «por miles» y subir los impuestos a las rentas más altas para reforzar los servicios públicos. No detalló el procedimiento.",
      quote="porque las casas son para vivir y no para hacer negocio",
      source_url=ELE, source_title="El Español (con EFE): primer acto conjunto de Montero y Rufián", source_date="2026-10-24",
      source_type="prensa", who="Irene Montero, acto conjunto con Gabriel Rufián (ERC) en Nou Barris, Barcelona, 24-10-2026"),
]
ids = {p["id"] for p in D["promises"]}
added = [p for p in NEW if p["id"] not in ids]
D["promises"] += added
P.write_text(json.dumps(D, ensure_ascii=False, indent=1) + "\n")
print("added", len(added), [p["id"] for p in added], "total", len(D["promises"]))
