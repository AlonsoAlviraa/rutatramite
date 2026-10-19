"""19-10-2026 · Registra y enlaza las 5 guías de voto nulo (src/lib/tramites/voto-nulo-casos.ts). Idempotente.
Ejecutar después de link_cuando_29n_20261019.py (y de gen_cuando si se regenera cuando-29n.ts).
En encuestas-29n.ts solo añade un enlace en «related»."""
import pathlib
ROOT = pathlib.Path(__file__).resolve().parent.parent
T = ROOT / "src/lib/tramites"
HUB = "/elecciones/voto-nulo-ejemplos"
NEWP = [HUB, "/elecciones/dos-papeletas-en-el-mismo-sobre", "/elecciones/papeleta-rota-voto-nulo", "/elecciones/escribir-en-la-papeleta", "/elecciones/objeto-en-el-sobre-de-votacion"]
LBL = "Voto nulo: 10 ejemplos y si cuentan"
cat = T / "catalog.ts"; s = cat.read_text()
if "VOTO_NULO_CASOS_GUIDES" not in s:
    s = s.replace('import { CUANDO_29N_GUIDES } from "@/lib/tramites/cuando-29n";\n', 'import { CUANDO_29N_GUIDES } from "@/lib/tramites/cuando-29n";\nimport { VOTO_NULO_CASOS_GUIDES } from "@/lib/tramites/voto-nulo-casos";\n', 1)
    s = s.replace("  ...CUANDO_29N_GUIDES,\n", "  ...CUANDO_29N_GUIDES,\n  ...VOTO_NULO_CASOS_GUIDES,\n", 1)
    assert s.count("VOTO_NULO_CASOS_GUIDES") == 2; cat.write_text(s)
sm = ROOT / "scripts/build_sitemaps.py"; s = sm.read_text()
anchor = '    "/elecciones/diputados-por-provincia-29n",\n'; assert anchor in s
add = "".join(f'    "{p}",\n' for p in NEWP if f'"{p}"' not in s)
if add: sm.write_text(s.replace(anchor, anchor + add, 1))
def ins(fname, pathkey, opener, item):
    f = T / fname; s = f.read_text()
    i = s.find(pathkey); assert i > 0, (fname, pathkey)
    r = s.find(opener, i); assert r > 0
    e = s.find("]", r)
    if HUB in s[r:e]: return
    j = r + len(opener)
    f.write_text(s[:j] + item + s[j:])
ins("elecciones-29n-guias.ts", 'path: "/elecciones/voto-nulo-y-voto-en-blanco"', "related: [", f'{{ href: "{HUB}", label: "{LBL}" }}, ')
ins("elecciones-29n-guias.ts", 'path: "/elecciones/resultados-y-escrutinio"', "related: [", f'{{ href: "{HUB}", label: "{LBL}" }}, ')
ins("elecciones-29n-guias.ts", 'path: "/elecciones/como-votar-al-senado"', "related: [", f'{{ href: "{HUB}", label: "{LBL}" }}, ')
ins("encuestas-29n.ts", 'path: "/elecciones/a-quien-beneficia-el-voto-en-blanco"', "related: [", f'{{ href: "{HUB}", label: "{LBL}" }}, ')
ins("cuando-29n.ts", '"path": "/elecciones/que-pasa-si-no-voto"', '"related": [', f'{{"href": "{HUB}", "label": "{LBL}"}}, ')
print("ok")
