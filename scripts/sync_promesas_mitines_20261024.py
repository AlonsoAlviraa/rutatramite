"""Añade a promises.json las propuestas verificadas el 24-10-2026 (idempotente). Ejecutar DESPUÉS de sync_promesas_mitines_20261023.py.
- PP: Feijóo, mitin en Valencia (Palau de les Arts), 23-10-2026: rebaja del IRPF en 2027 y que quien cobre el SMI no pague IRPF por ley,
  con umbral que sube automáticamente con el SMI (pp.es, 23-10; también El Mundo y OKDiario).
- PP: Feijóo en la Cadena SER, 23-10-2026: integrar Igualdad en un ministerio con otras competencias (SER Comunicación; Europa Press vía LNE)
  y reformar la ley de eutanasia para reforzar garantías médicas, sin derogarla (Cadena SER).
- Vox (Mahón, 23-10), Frente Amplio, PSOE, Podemos y Democracia 21: sin medidas nuevas respecto a lo ya recogido.
Actualiza «updated» a 2026-10-24."""
import json, pathlib
P = pathlib.Path(__file__).resolve().parent.parent / "data/promesas-29n/promises.json"
D = json.loads(P.read_text())
D["updated"] = "2026-10-24"
PPES = "https://www.pp.es/actualidad/articulos/feijoo-asegura-que-en-2027-habra-una-rebaja-del-irpf-para-que-la-inflacion-y-los-impuestos-no-se-coman-el-salario-de-los-espanoles/"
SERC = "https://www.sercomunicacion.com/aimar-bretos-entrevista-a-alberto-nunez-feijoo-en-hoy-por-hoy/"
SER = "https://cadenaser.com/nacional/2026/10/23/feijoo-no-descarta-gobernar-con-vox-si-los-espanoles-me-mandan-dar-estabilidad-con-la-tercera-fuerza-politica-asi-lo-hare-cadena-ser/"
base = dict(party="pp", level="estatal", tax=None, cost=None, impact=None)
NEW = [
 dict(base, id="pp-irpf-2027-smi-exento", topic="impuestos", profiles=["familia"],
      measure="Rebajar el IRPF en 2027 «para que la inflación y los impuestos no se coman el salario» y fijar por ley que quien cobre el salario mínimo no pague IRPF, con un umbral que suba automáticamente cada vez que suba el SMI. Hoy quien solo cobra el SMI ya paga 0 € de IRPF por una deducción de 590,89 € aprobada para 2026.",
      quote="El umbral subirá automáticamente cada vez que suba el Salario Mínimo",
      source_url=PPES, source_title="pp.es: Feijóo, rebaja del IRPF en 2027 (mitin en Valencia)", source_date="2026-10-23",
      source_type="oficial-partido", who="Alberto Núñez Feijóo, mitin en el Palau de les Arts de Valencia, 23-10-2026"),
 dict(base, id="pp-igualdad-otro-ministerio", topic="instituciones", profiles=[],
      measure="Reducir el número de ministerios e integrar Igualdad en un ministerio con otras competencias. Feijóo precisó que no elimina las políticas de igualdad.",
      quote="Yo no voy a mantener 22 ministerios",
      source_url=SERC, source_title="SER Comunicación: resumen oficial de la entrevista a Feijóo en Hoy por Hoy", source_date="2026-10-23",
      source_type="prensa", who="Alberto Núñez Feijóo, entrevista en Hoy por Hoy (Cadena SER), 23-10-2026"),
 dict(base, id="pp-reforma-eutanasia", topic="sanidad", profiles=["dependencia"],
      measure="Reformar la ley de eutanasia para reforzar las garantías médicas. No se comprometió a derogarla.",
      quote="La muerte digna es un concepto con el que estoy de acuerdo",
      source_url=SER, source_title="Cadena SER: entrevista a Feijóo en Hoy por Hoy", source_date="2026-10-23",
      source_type="prensa", who="Alberto Núñez Feijóo, entrevista en Hoy por Hoy (Cadena SER), 23-10-2026"),
]
ids = {p["id"] for p in D["promises"]}
added = [p for p in NEW if p["id"] not in ids]
D["promises"] += added
P.write_text(json.dumps(D, ensure_ascii=False, indent=1) + "\n")
print("added", len(added), [p["id"] for p in added], "total", len(D["promises"]))
