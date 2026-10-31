"""31-10-2026: las 19 fichas /elecciones/promesas/comunidad-* repetían la tabla completa
de medidas (≈95 % del texto igual entre comunidades). Dejamos en cada ficha solo las medidas
cuya aplicación cambia en ese territorio (necesitan a la comunidad, solo en parte, no aplica,
pendiente de programa) y remitimos a /elecciones/promesas para las que se aplican igual.
No cambia URL, title, description, H1 ni datos; idempotente."""
import json, re, pathlib
R = pathlib.Path(__file__).resolve().parents[1]
T = R / "src/lib/tramites/promesas-29n.ts"
IGUAL = "Sí: es una medida estatal, igual en toda España."
s = T.read_text()
def match_bracket(s, i):
    depth = 0; instr = False; esc = False
    for j in range(i, len(s)):
        c = s[j]
        if instr:
            if esc: esc = False
            elif c == "\\": esc = True
            elif c == '"': instr = False
            continue
        if c == '"': instr = True
        elif c in "[{": depth += 1
        elif c in "]}":
            depth -= 1
            if depth == 0: return j
    raise ValueError
done = 0
for m in list(re.finditer(r'"path": "/elecciones/promesas/comunidad-[^"]+"', s))[::-1]:
    start = m.start()
    lead = re.search(r'"lead": "([^"]*)"', s[start:]).group(1)
    nm = re.search(r'De las (\d+) medidas con fuente.*?, (\d+) se aplicarían igual en (.+?), \d+ necesitarían', lead)
    total, igual, name = int(nm.group(1)), int(nm.group(2)), nm.group(3)
    t = s.index('"id": "tabla"', start)
    sec_open = s.rindex("{", 0, t); sec_close = match_bracket(s, sec_open)
    sec = json.loads(s[sec_open:sec_close + 1])
    if sec["title"].startswith("Medidas que dependen"): continue
    rows = [r for r in sec["table"]["rows"] if r["cells"][2] != IGUAL]
    assert len(sec["table"]["rows"]) - len(rows) == igual, (name, len(sec["table"]["rows"]), len(rows), igual)
    k = sum(1 for r in rows if r["cells"][2] not in ("—",) and not r["cells"][2].startswith("No aplica"))
    sec["title"] = f"Medidas que dependen de {name} o no se aplicarían igual"
    sec["paragraphs"] = [
        f"De las {total} medidas con fuente que han anunciado los partidos que se presentan aquí, {igual} se aplicarían igual que en el resto de España; están todas, con su fuente y fecha, en la comparativa general de promesas del 29-N (/elecciones/promesas). En esta tabla solo aparecen las {k} cuya aplicación cambia en {name} (necesitan también al gobierno autonómico, se aplicarían solo en parte o no tal cual), además de los partidos sin programa publicado o sin candidatura en esta comunidad.",
    ] + sec["paragraphs"]
    sec["table"]["caption"] = f"Promesas del 29-N que en {name} dependen de la comunidad o no se aplicarían igual"
    sec["table"]["rows"] = rows
    s = s[:sec_open] + json.dumps(sec, ensure_ascii=False, indent=0) + s[sec_close + 1:]
    done += 1
T.write_text(s)
print("fichas reducidas:", done)
