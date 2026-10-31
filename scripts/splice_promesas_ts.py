"""Vuelca data/promesas-29n/pages.json (salida de gen_promesas_29n.py) en PROMESAS_29N_GUIDES de
src/lib/tramites/promesas-29n.ts y actualiza PROMESAS_29N_UPDATED. Después hay que ejecutar
scripts/patch_promesas_temas_20261018.py (comparativas de inmigración y pensiones con su formato propio)."""
import json, pathlib, re
R = pathlib.Path(__file__).resolve().parent.parent
T = R / "src/lib/tramites/promesas-29n.ts"
G = json.loads((R / "data/promesas-29n/pages.json").read_text())
upd = json.loads((R / "data/promesas-29n/promises.json").read_text())["updated"]
src = T.read_text()
h = "export const PROMESAS_29N_GUIDES: Guide[] = ["
a = src.index(h) + len(h); b = src.index("\n];", a)
body = "\n" + ",\n".join(json.dumps(g, ensure_ascii=False, indent=0) for g in G) + ","
src = src[:a] + body + src[b:]
src = re.sub(r'export const PROMESAS_29N_UPDATED = "[0-9-]+";', f'export const PROMESAS_29N_UPDATED = "{upd}";', src)
T.write_text(src); print("guides", len(G), "updated", upd)
