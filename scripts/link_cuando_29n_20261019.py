"""19-10-2026 · Registra y enlaza las 9 guías «cuándo / qué pasa si» del 29-N (src/lib/tramites/cuando-29n.ts).
Idempotente. Ejecutar después de exploit_clicks_20261019.py (orden: gen → splice → patch_temas → edit_programas → exploit_clicks → gen_cuando → este).
No toca title/description/H1 de /elecciones/programas-electorales-29n (test CTR): solo «related»."""
import json, pathlib, re
ROOT = pathlib.Path(__file__).resolve().parent.parent
T = ROOT / "src/lib/tramites"
P = "/elecciones/"
NEW = {
 "debate": (P+"debate-electoral-29n", "Debates del 29-N: fechas y quién ha aceptado"),
 "sorteo": (P+"sorteo-mesa-electoral-29n", "¿Me toca mesa? Cuándo es el sorteo"),
 "excusa": (P+"excusa-mesa-electoral", "Excusas para la mesa electoral"),
 "tarjeta": (P+"tarjeta-censal-cuando-llega", "Tarjeta censal: cuándo llega"),
 "propaganda": (P+"no-recibir-propaganda-electoral", "Cómo no recibir propaganda electoral"),
 "listas": (P+"candidaturas-29n-boe", "Listas del 29-N: cuándo salen en el BOE"),
 "gobierno": (P+"cuando-habra-gobierno-29n", "¿Cuándo habrá Gobierno tras el 29-N?"),
 "cis": (P+"cis-preelectoral-29n", "CIS preelectoral: cuándo sale"),
 "novoto": (P+"que-pasa-si-no-voto", "¿Qué pasa si no voto?"),
}

# 1. catálogo
cat = T / "catalog.ts"; s = cat.read_text()
if "CUANDO_29N_GUIDES" not in s:
    s = s.replace('import { ELECCIONES_29N_GUIDES } from "@/lib/tramites/elecciones-29n-guias";\n',
                  'import { ELECCIONES_29N_GUIDES } from "@/lib/tramites/elecciones-29n-guias";\nimport { CUANDO_29N_GUIDES } from "@/lib/tramites/cuando-29n";\n', 1)
    s = s.replace("  ...ELECCIONES_29N_GUIDES,\n", "  ...ELECCIONES_29N_GUIDES,\n  ...CUANDO_29N_GUIDES,\n", 1)
    assert s.count("CUANDO_29N_GUIDES") == 2
    cat.write_text(s)

# 2. sitemap CORE
sm = ROOT / "scripts/build_sitemaps.py"; s = sm.read_text()
anchor = '    "/elecciones/diputados-por-provincia-29n",\n'
assert anchor in s
add = "".join(f'    "{p}",\n' for p, _ in NEW.values() if f'"{p}"' not in s)
if add:
    s = s.replace(anchor, anchor + add, 1); sm.write_text(s)

# 3. related en guías JSON (promesas-29n.ts, multilínea)
def span(s, path, opener):
    i = s.find(f'"path": "{path}"'); assert i > 0, path
    a = s.rfind(opener, 0, i)
    d = 0; j = a; ins = False; esc = False
    while True:
        c = s[j]
        if ins:
            if esc: esc = False
            elif c == "\\": esc = True
            elif c == '"': ins = False
        else:
            if c == '"': ins = True
            elif c == "{": d += 1
            elif c == "}":
                d -= 1
                if d == 0: break
        j += 1
    return a, j + 1

def add_rel_json(fname, path, keys, opener, indent):
    f = T / fname; s = f.read_text()
    a, b = span(s, path, opener)
    g = json.loads(s[a:b])
    rel = g.setdefault("related", [])
    for k in keys:
        href, label = NEW[k]
        if not any(x["href"] == href for x in rel):
            rel.append({"href": href, "label": label})
    txt = json.dumps(g, ensure_ascii=False, indent=indent) if indent is not None else json.dumps(g, ensure_ascii=False)
    f.write_text(s[:a] + txt + s[b:])

add_rel_json("promesas-29n.ts", P+"programas-electorales-29n", ["debate", "listas", "gobierno", "cis"], '{\n"id": "', 0)
add_rel_json("promesas-29n.ts", P+"como-se-elige-presidente-gobierno", ["gobierno"], '{\n"id": "', 0)
add_rel_json("actualidad-20261006.ts", P+"calendario-29-noviembre", ["sorteo", "excusa", "tarjeta", "listas", "debate", "gobierno", "propaganda"], '{"id": "', None)

# 4. related en elecciones-29n-guias.ts (TS, arrays en una línea)
f = T / "elecciones-29n-guias.ts"; s = f.read_text()
def add_rel_ts(path, keys):
    global s
    i = s.find(f'path: "{path}"'); assert i > 0, path
    r = s.find("related: [", i); e = s.find("],\n", r)
    seg = s[r:e]
    extra = "".join(f', {{ href: "{NEW[k][0]}", label: "{NEW[k][1]}" }}' for k in keys if NEW[k][0] not in seg)
    s = s[:e] + extra + s[e:]
add_rel_ts(P+"miembro-de-mesa", ["sorteo", "excusa"])
add_rel_ts(P+"donde-voto-mesa-electoral", ["tarjeta"])
add_rel_ts(P+"consultar-censo-electoral", ["propaganda", "tarjeta"])
add_rel_ts(P+"resultados-y-escrutinio", ["gobierno"])
add_rel_ts(P+"preguntas-frecuentes-29n", ["debate", "sorteo", "novoto"])
f.write_text(s)

# 5. RELATED_LINKS de los índices
f = ROOT / "src/lib/seo/relatedLinks.ts"; s = f.read_text()
old = '  "/elecciones": ["/dni/consultar-cita", "/dni/urgente-sin-cita"],'
new = '  "/elecciones": ["/elecciones/debate-electoral-29n", "/elecciones/sorteo-mesa-electoral-29n", "/elecciones/candidaturas-29n-boe", "/elecciones/cuando-habra-gobierno-29n", "/dni/consultar-cita", "/dni/urgente-sin-cita"],'
if old in s: s = s.replace(old, new)
old2 = '  "/elecciones/promesas": ["/elecciones/programas-electorales-29n", "/elecciones/salario-minimo-1800-euros", "/elecciones/iva-vivienda-4-por-ciento"],'
new2 = '  "/elecciones/promesas": ["/elecciones/programas-electorales-29n", "/elecciones/debate-electoral-29n", "/elecciones/salario-minimo-1800-euros", "/elecciones/iva-vivienda-4-por-ciento"],'
if old2 in s: s = s.replace(old2, new2)
f.write_text(s)
print("ok")
