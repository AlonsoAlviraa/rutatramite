"""Genera src/lib/tramites/contrato-pp.ts: /elecciones/contrato-con-espana-pp (19-10-2026).
Fuentes: pp.es (nota oficial 19-10-2026), ABC (documento íntegro), Europa Press (lugar y acto), El Confidencial (qué tipo de documento). Mismo tono que el resto de fichas de partido."""
import json, pathlib
REV = "2026-10-19"
PP = {"label": "pp.es, 19-10-2026: Feijóo firma el contrato para gobernar el cambio", "href": "https://www.pp.es/actualidad/articulos/feijoo-firma-el-contrato-para-gobernar-el-cambio-mi-mayor-ambicion-es-lograr-que-la-palabra-de-un-presidente-vuelva-a-tener-valor/"}
ABC = {"label": "ABC, 19-10-2026: documento íntegro del «Contrato con España»", "href": "https://www.abc.es/espana/doce-puntos-contrato-espana-feijoo-consulta-documento-20261019131424-nt.html"}
EP = {"label": "Europa Press, 19-10-2026: Feijóo firma su «Contrato con España» en el Espacio Larra", "href": "https://www.europapress.es/nacional/noticia-feijoo-da-palabra-cumplir-docena-promesas-vivienda-pensiones-inmigracion-no-voy-fallar-20261019125258.html"}
RTVE = {"label": "RTVE, 19-10-2026: Feijóo presenta su «contrato»", "href": "https://www.rtve.es/noticias/20261019/feijoo-presenta-contrato-cambio-etapa-clase-media-motor/17272712.shtml"}
P = "/elecciones/"
def L(p, l): return {"href": p, "label": l}
PTS = [
 ("Soberanía y fronteras", "Defender la soberanía nacional y la integridad territorial", "Reforzar las fronteras con medios humanos, materiales y tecnológicos y con los instrumentos europeos disponibles."),
 ("Instituciones", "Recuperar la calidad de la democracia y la separación de poderes", "«Los jueces elegirán a los jueces»; Tribunal Constitucional, Fiscalía General y órganos reguladores dirigidos por personas independientes; presupuestos cada año y elecciones obligatorias si se acumula más de una prórroga; respeto a la libertad de prensa."),
 ("Administración", "Un Estado más limpio y más ligero", "Auditar «cada euro»; menos ministerios, altos cargos y asesores; todo cargo político responderá por la corrupción de sus subordinados."),
 ("Vivienda", "La vivienda", "Al menos un millón de viviendas nuevas; prioridad de los jóvenes en alquiler y compra con «la mayor ayuda económica de la historia»; desalojo de okupas en 48 horas; más suelo y menos burocracia."),
 ("Inmigración", "Ordenar la inmigración", "Reducir la inmigración irregular; vías legales para quien venga a trabajar; criterios más exigentes para la nacionalidad; prohibición por ley de las regularizaciones colectivas."),
 ("Pensiones", "Garantizar las pensiones actuales y futuras", "Actualizar las pensiones conforme al IPC y garantizárselo a los jóvenes, en el marco del Pacto de Toledo."),
 ("Sanidad", "Fortalecer la sanidad pública", "Más médicos y mejores condiciones laborales y retributivas para los profesionales sanitarios."),
 ("Educación", "Elevar el nivel educativo", "Más exigencia y autoridad del docente; contenidos elaborados por las reales academias; castellano en toda España y lenguas cooficiales en sus comunidades; protección de los menores frente a las redes sociales."),
 ("Seguridad", "Más seguridad en las calles", "Más recursos, reconocimiento y autoridad para las Fuerzas y Cuerpos de Seguridad, con atención especial a la violencia contra las mujeres."),
 ("Impuestos", "Fin al «infierno fiscal»", "Revisar una a una las más de cien subidas fiscales de los últimos años y bajar los impuestos."),
 ("Salarios", "Subir el salario medio", "Subir el salario medio con más productividad; que «el subsidio no compita con el empleo»."),
 ("Política exterior", "Recuperar el prestigio internacional de España", "Recuperar alianzas en la Unión Europea, Hispanoamérica y con los aliados históricos; apoyo a la paz y la democracia."),
]
rows = [{"cells": [str(i+1), t, title, txt], "source": ABC} for i, (t, title, txt) in enumerate(PTS)]
G = [{
 "id": "contrato-con-espana-pp", "pack": "elecciones", "reviewedAt": REV, "path": P+"contrato-con-espana-pp",
 "h1": "Qué es el «Contrato con España» de Feijóo: los 12 compromisos del PP",
 "title": "Qué es el Contrato con España de Feijóo: los 12 puntos",
 "description": "El «Contrato con España» es un documento de 12 compromisos que Feijóo firmó el 19-10-2026. No es el programa electoral del PP. Los 12 puntos, con fuente.",
 "lead": "Respuesta corta: es un documento de 12 compromisos que Alberto Núñez Feijóo, candidato del PP, firmó y presentó el lunes 19 de octubre de 2026 en el Espacio Larra de Madrid. No es el programa electoral: el propio documento dice que «va más allá de un programa de Gobierno o una lista de medidas» y lo presenta como su «compromiso personal» con los votantes. El programa del PP para el 29-N sigue sin publicarse.",
 "cta": L(P+"programas-electorales-29n", "Programas electorales del 29-N: cuándo salen"),
 "secondaryCta": L(P+"promesas/partido-pp", "PP: todas sus propuestas con fuente"),
 "sources": [ABC, PP, EP, RTVE],
 "related": [L(P+"programas-electorales-29n", "Programas electorales del 29-N: cuándo salen"), L(P+"promesas/partido-pp", "PP: todas sus propuestas con fuente"), L(P+"promesas", "Promesas del 29-N, partido a partido"), L(P+"quiere-el-pp-quitar-las-pensiones", "¿Quiere el PP quitar las pensiones?"), L(P+"promesas/que-propone-cada-partido-instituciones-y-gasto-publico", "Instituciones y gasto público: qué propone cada partido"), L(P+"promesas/que-propone-cada-partido-vivienda", "Vivienda: qué propone cada partido"), L("/elecciones", "Todas las guías de las elecciones")],
 "faqs": [
  {"q": "¿Qué es el Contrato con España?", "a": "Un documento de 12 compromisos firmado por Alberto Núñez Feijóo el 19 de octubre de 2026 en Madrid, para el caso de que llegue a la Presidencia del Gobierno tras las elecciones del 29 de noviembre."},
  {"q": "¿Es el programa electoral del PP?", "a": "No. El documento dice que «va más allá de un programa de Gobierno o una lista de medidas» y se presenta como un compromiso personal del candidato. El programa del PP para el 29-N no se había publicado a 19 de octubre."},
  {"q": "¿Cuáles son los 12 puntos?", "a": "Soberanía y fronteras; separación de poderes; un Estado más ligero; vivienda; inmigración; pensiones; sanidad; educación; seguridad; impuestos; salario medio; y política exterior."},
  {"q": "¿Qué dice sobre las pensiones?", "a": "Que se actualizarán conforme al IPC y que se garantizará lo mismo a los jóvenes, en el marco del Pacto de Toledo."},
  {"q": "¿Dónde se puede leer entero?", "a": "ABC publicó el documento íntegro el 19 de octubre de 2026, y pp.es publicó una nota del acto el mismo día. Los enlaces están en las fuentes de esta página."},
 ],
 "sections": [
  {"id": "acto", "title": "Cuándo y dónde se presentó", "paragraphs": ["Feijóo lo firmó el lunes 19 de octubre de 2026 en el Espacio Larra de Madrid, en un acto de precampaña con dirigentes, diputados y senadores del PP (Europa Press y ABC, 19-10-2026). Se titula «Mi contrato con España. Respeto a la gente. Respeto a la nación.» y empieza con la fórmula «Me comprometo a»."]},
  {"id": "puntos", "title": "Los 12 compromisos", "paragraphs": ["Resumen de cada punto, en el orden del documento. Las frases entre comillas son literales."],
   "table": {"caption": "Contrato con España (PP, 19-10-2026)", "head": ["Nº", "Tema", "Punto", "Qué dice", "Fuente"], "rows": rows}},
  {"id": "en-el-acto", "title": "Lo que añadió Feijóo en el acto", "paragraphs": ["En su discurso, además de los 12 puntos, Feijóo se comprometió a invertir en infraestructuras hídricas «que nos preparen mejor para afrontar inundaciones y sequías» y a que el tren «vuelva a ser un orgullo nacional» (Europa Press y pp.es, 19-10-2026). Esas dos frases no figuran entre los 12 puntos del documento."]},
  {"id": "programa", "title": "¿Y el programa electoral?", "paragraphs": ["El PP no ha publicado todavía su programa para el 29-N. Cuando lo publique, lo enlazaremos en la guía de programas electorales y en su ficha de propuestas. Los compromisos del contrato ya están incorporados, tema a tema, en el comparador de promesas, con la misma presentación que las medidas de los demás partidos."]},
 ]}]
assert all(len(g["description"]) <= 160 for g in G), [len(g["description"]) for g in G]
out = pathlib.Path(__file__).resolve().parents[1] / "src/lib/tramites/contrato-pp.ts"
out.write_text('import type { Guide } from "@/lib/tramites/types";\n\n/** «Contrato con España» del PP (19-10-2026). GENERADO con scripts/gen_contrato_pp_20261019.py: no editar a mano. */\nexport const CONTRATO_PP_GUIDES: Guide[] = ' + json.dumps(G, ensure_ascii=False, indent=1) + ";\n", encoding="utf-8")
print("ok", len(G[0]["title"]), len(G[0]["description"]))
