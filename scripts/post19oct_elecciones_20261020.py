"""Versión post-19 de octubre de /elecciones y /elecciones/consultar-censo-electoral.

NO se aplica en el despliegue del 18-10-2026. Lo ejecuta la rutina del 20-10-2026:
    python3 scripts/post19oct_elecciones_20261020.py           # aplica
    python3 scripts/post19oct_elecciones_20261020.py --check   # solo comprueba que se puede aplicar
Fuentes: calendario de la Junta Electoral Central (eg2026_calendario.pdf), LOREG arts. 39 y 85, nota del INE.
"""
import json, pathlib, sys
ROOT = pathlib.Path(__file__).resolve().parent.parent
CHECK = "--check" in sys.argv
J = lambda x: json.dumps(x, ensure_ascii=False)

def edit(rel, pairs):
    p = ROOT / rel
    s = p.read_text()
    for a, b in pairs:
        if b in s and a not in s:
            continue  # ya aplicado
        assert s.count(a) == 1, f"{rel}: no encuentro una sola vez: {a[:70]}"
        s = s.replace(a, b)
    if not CHECK:
        p.write_text(s)

# 1) Portada /elecciones
edit("src/app/elecciones/page.tsx", [
    ('title: "Elecciones 29-N: consulta el censo hasta el 19 de octubre",',
     'title: "Elecciones 29-N: voto por correo, mesas, listas y calendario",'),
    ('"Últimos días: consulta y reclamaciones del censo electoral del 12 al 19 de octubre (JEC). Luego voto por correo hasta el 19/25 de noviembre.",',
     '"Elecciones del 29 de noviembre: voto por correo hasta el 19-N, sorteo de mesas del 31-O al 4-N, candidaturas, campaña y qué propone cada partido.",'),
])
edit("src/components/tramites/PackIndex.tsx", [
    ("Plazos clave: consulta y reclamaciones del censo del 12 al 19 de octubre; ",
     "Plazos clave: candidaturas del 21 al 26 de octubre; sorteo de mesas del 31 de octubre al 4 de noviembre; "),
])

# 2) Censo
OLD_TITLE = 'title: "Censo electoral 29-N: consulta y reclama hasta el 19 de octubre",'
NEW_TITLE = 'title: "Censo electoral 29-N: comprueba tu inscripción y tu mesa",'
OLD_DESC = '"Quedan pocos días (12–19 oct 2026): consulta el censo en ayuntamiento, consulado o sede INE con Cl@ve y reclama inclusiones/exclusiones. Calendario JEC.",'
NEW_DESC = '"El plazo de reclamación del censo terminó el 19 de octubre. Comprueba tu inscripción y tu mesa en la sede del INE y qué pasa si reclamaste a tiempo.",'
OLD_LEAD = '"Del 12 al 19 de octubre de 2026 puedes comprobar si estás bien inscrito: en tu ayuntamiento, en la delegación de la Oficina del Censo Electoral, en el consulado si vives fuera, o por internet en la sede del INE con Cl@ve o DNI electrónico. En esas mismas fechas puedes reclamar.",'
NEW_LEAD = '"La consulta y reclamación del censo fue del 12 al 19 de octubre de 2026 y ya ha terminado. Puedes seguir comprobando tu inscripción y tu mesa en la sede del INE con Cl@ve o DNI electrónico. Si reclamaste a tiempo, la Oficina del Censo Electoral resuelve en 3 días y las rectificaciones se exponen el 23 de octubre.",'
after = {
    "id": "plazo-cerrado",
    "title": "Si no reclamaste a tiempo",
    "paragraphs": [
        "El plazo del artículo 39 de la LOREG terminó el 19 de octubre. Después solo se puede votar fuera de las listas con una sentencia judicial que reconozca tu derecho a estar inscrito o con la certificación censal específica que prevé el artículo 85.",
        "Si te has mudado a otra provincia después del 1 de agosto de 2026, sigues votando en tu sección anterior. Puedes pedir el voto por correo hasta el 19 de noviembre.",
    ],
    "lists": [[
        "23 de octubre: exposición de las rectificaciones en ayuntamientos y consulados.",
        "5 días desde la notificación: recurso ante el juzgado de lo contencioso-administrativo si rechazaron tu reclamación.",
        "Desde el 2 de noviembre: el INE envía la tarjeta censal con tu mesa.",
    ]],
}
G = "src/lib/tramites/elecciones-29n-guias.ts"
p = ROOT / G
s = p.read_text()
marker = '        lists: [["Por internet: sede.ine.gob.es, con Cl@ve o DNI electrónico.", "En persona: ayuntamiento o Delegación Provincial de la Oficina del Censo Electoral.", "Si vives fuera: oficina consular."]],\n      },\n'
if '"plazo-cerrado"' not in s:
    assert s.count(marker) == 1, "marcador de la sección de censo no encontrado"
    s = s.replace(marker, marker + "      " + J(after) + ",\n")
    s = s.replace('title: "Cómo consultarlo",', 'title: "Cómo comprobar tu inscripción",', 1)
for a, b in [(OLD_TITLE, NEW_TITLE), (OLD_DESC, NEW_DESC), (OLD_LEAD, NEW_LEAD),
             ('{ q: "¿Cuánto tardan en resolver mi reclamación?"', '{ q: "¿Puedo reclamar todavía?", a: "No por la vía del artículo 39 de la LOREG: el plazo terminó el 19 de octubre de 2026. Si reclamaste a tiempo, la resolución llega en 3 días." },\n      { q: "¿Cuánto tardan en resolver mi reclamación?"'),
             ('puedes reclamar del 12 al 19 de octubre de 2026."]', 'el plazo para reclamar fue del 12 al 19 de octubre de 2026 y ya ha terminado. Puedes votar en tu mesa antigua o pedir el voto por correo."]')]:
    if b in s:
        continue
    assert s.count(a) == 1, f"no encuentro: {a[:70]}"
    s = s.replace(a, b)
if not CHECK:
    p.write_text(s)

# 3) Calendario: el plazo del censo pasa a pasado
edit("src/lib/tramites/actualidad-20261006.ts", [
    ("La consulta y reclamación del censo termina el 19 de octubre. Después solo queda revisar tu inscripción en la sede del INE y, si hay un error, seguir la resolución de tu reclamación si la presentaste a tiempo.",
     "La consulta y reclamación del censo terminó el 19 de octubre. Las rectificaciones se exponen el 23 de octubre. Ahora solo queda revisar tu inscripción y tu mesa en la sede del INE."),
    ("A 18 de octubre de 2026 ya ha terminado el plazo de coaliciones",
     "A 20 de octubre de 2026 ya ha terminado el plazo de coaliciones"),
])
print("comprobado: se puede aplicar" if CHECK else "aplicado: versión post-19 de octubre")
