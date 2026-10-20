"""20-10-2026 · /elecciones/no-recibir-propaganda-electoral pasa a «plazo terminado».
El plazo para oponerse a los envíos de propaganda del 29-N fue del 12 al 19 de octubre (nota del INE EG2026, LOREG art. 39.3).
Edita a la vez el generador (scripts/gen_cuando_29n_20261019.py) y el fichero generado (src/lib/tramites/cuando-29n.ts),
para que regenerar no deshaga el cambio. Idempotente. --check solo comprueba."""
import json, pathlib, sys
R = pathlib.Path(__file__).resolve().parent.parent
CHECK = "--check" in sys.argv
J = lambda x: json.dumps(x, ensure_ascii=False)
PAIRS = [
 ('"Cómo no recibir propaganda electoral en casa: el plazo para el 29-N acaba el 19 de octubre"',
  '"Cómo no recibir propaganda electoral en casa: el plazo para el 29-N terminó el 19 de octubre"'),
 ('"Respuesta corta: para no recibir en casa la propaganda que los partidos envían por correo en estas elecciones, la solicitud tenía que hacerse hasta el 19 de octubre de 2026. Se pide en la sede electrónica del INE con Cl@ve, en tu ayuntamiento o en la delegación provincial de la Oficina del Censo. Si la presentas después, vale para las siguientes elecciones."',
  '"Respuesta corta: el plazo para no recibir en casa la propaganda electoral del 29-N terminó el 19 de octubre de 2026. Si lo pediste a tiempo, las candidaturas reciben una copia del censo sin tus datos y no deberían enviarte sobres. Si lo pides ahora (sede electrónica del INE con Cl@ve, ayuntamiento o delegación provincial de la Oficina del Censo), vale para las siguientes elecciones, no para estas."'),
 ('"Para el 29-N, hasta el 19 de octubre de 2026, el último día del plazo de consulta del censo. Las solicitudes posteriores tienen efecto en las siguientes elecciones (nota del INE del 9 de octubre)."',
  '"Para el 29-N, hasta el 19 de octubre de 2026, el último día del plazo de consulta del censo. Ese plazo ya ha terminado: las solicitudes posteriores tienen efecto en las siguientes elecciones (nota del INE del 9 de octubre)."'),
]
NEW_FAQ = {"q": "Lo pido hoy, ¿me sirve para el 29-N?", "a": "No. Para el 29-N solo cuentan las solicitudes presentadas hasta el 19 de octubre de 2026. La que presentes ahora se aplicará en las siguientes elecciones que se convoquen, según la nota del INE."}
NEW_SEC = {"id": "ahora", "title": "Qué puedes hacer ahora", "paragraphs": [
  "Si no lo pediste antes del 19 de octubre, en la campaña del 13 al 27 de noviembre pueden llegarte sobres de las candidaturas que pidan la copia del censo. No es un error: la ley les permite usarla para enviar propaganda (artículo 41.5 de la LOREG)."]}
OLD_SEC_TARDE = '"id": "si-tarde", "title": "Si llegas tarde"'
def apply_json_style(s, generated):
    for a, b in PAIRS:
        if b in s: continue
        assert s.count(a) == 1, f"no encuentro una sola vez: {a[:80]}"
        s = s.replace(a, b)
    return s
# 1) Generador (texto Python con dicts estilo JSON)
gp = R / "scripts/gen_cuando_29n_20261019.py"; g = gp.read_text()
g = apply_json_style(g, False)
if NEW_FAQ["q"] not in g:
    anchor = '  {"q": "¿Cómo se pide?", "a": "Por internet en la sede electrónica del INE con Cl@ve'
    assert g.count(anchor) == 1
    g = g.replace(anchor, "  " + J(NEW_FAQ) + ",\n" + anchor, 1)
if '"id": "ahora", "title": "Qué puedes hacer ahora"' not in g:
    anchor = '  {"id": "si-tarde", "title": "Si llegas tarde"'
    assert g.count(anchor) == 1
    g = g.replace(anchor, "  " + J(NEW_SEC) + ",\n" + anchor, 1)
# reviewedAt propio de esta guía
if '"id": "c29n-propaganda", "pack": "elecciones", "reviewedAt": "2026-10-20"' not in g:
    a = '"id": "c29n-propaganda", "pack": "elecciones", "reviewedAt": REV,'
    assert g.count(a) == 1
    g = g.replace(a, '"id": "c29n-propaganda", "pack": "elecciones", "reviewedAt": "2026-10-20",')
if not CHECK: gp.write_text(g)
# 2) Regenerar el fichero generado y reaplicar el enlazado de voto nulo (misma cadena que el runbook)
if not CHECK:
    import subprocess
    subprocess.run([sys.executable, str(R / "scripts/gen_cuando_29n_20261019.py")], check=True, stdout=subprocess.DEVNULL)
    subprocess.run([sys.executable, str(R / "scripts/link_voto_nulo_20261019.py")], check=True, stdout=subprocess.DEVNULL)
print("comprobado" if CHECK else "aplicado: propaganda post-19 de octubre")
