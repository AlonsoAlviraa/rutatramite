"""Idempotente: dieta de mesa 75 € (Orden INT/650/2026, BOE 27-6-2026; antes 70 € con la Orden INT/212/2023). Ejecutar tras gen_cuando_29n."""
from pathlib import Path
E=[
 ("src/lib/tramites/cuando-29n.ts",
  "Desde que te notifican tienes 7 días para alegar una causa justificada.\",",
  "Desde que te notifican tienes 7 días para alegar una causa justificada. Si te toca como presidente o vocal titular, cobras una dieta de 75 € (Orden INT/650/2026).\","),
 ("src/lib/tramites/cuando-29n.ts",
  "La Junta responde en 5 días y su decisión no admite recurso administrativo.\",",
  "La Junta responde en 5 días y su decisión no admite recurso administrativo. Si te toca, los titulares cobran una dieta de 75 € (Orden INT/650/2026).\","),
 ("src/lib/tramites/elecciones-29n-guias.ts",
  "\"Dieta: 75 euros por titular y jornada, íntegra aunque no estés todo el día.\",",
  "\"Dieta: 75 euros por titular y jornada, íntegra aunque no estés todo el día. En 2023 eran 70 euros (Orden INT/212/2023, derogada por la INT/650/2026).\","),
 ("src/lib/tramites/elecciones-29n-guias.ts",
  "Si tienes una causa justificada, la alegas ante la Junta Electoral de Zona en 7 días desde la notificación.\",",
  "Si tienes una causa justificada, la alegas ante la Junta Electoral de Zona en 7 días desde la notificación. Presidentes y vocales titulares cobran una dieta de 75 € (Orden INT/650/2026).\","),
]
for f,a,b in E:
    p=Path(f);s=p.read_text()
    if b in s: continue
    assert s.count(a)==1,(f,a[:40],s.count(a)); p.write_text(s.replace(a,b))
print("ok")

# Fuente BOE en sorteo, excusa y miembro-de-mesa
import json,re
p=Path("src/lib/tramites/cuando-29n.ts");s=p.read_text()
SRC='   {\n    "label": "BOE: Orden INT/650/2026, dieta de los miembros de las mesas electorales (75 €)",\n    "href": "https://www.boe.es/diario_boe/txt.php?id=BOE-A-2026-13948"\n   },\n'
for path in ("/elecciones/sorteo-mesa-electoral-29n","/elecciones/excusa-mesa-electoral"):
    i=s.index(f'"path": "{path}"'); j=s.index('"sources": [\n',i)+len('"sources": [\n')
    k=s.find('"path": ',i+10); 
    if "BOE-A-2026-13948" in s[i:k if k>0 else len(s)]: continue
    s=s[:j]+SRC+s[j:]
p.write_text(s)
p=Path("src/lib/tramites/elecciones-29n-guias.ts");s=p.read_text()
a='sources: [S.jec, S.mesaInfo, S.loreg("aveintiseis", "artículos 26 y 27: formación de las mesas")],'
if a in s: s=s.replace(a,'sources: [S.jec, S.mesaInfo, S.dieta, S.loreg("aveintiseis", "artículos 26 y 27: formación de las mesas")],');p.write_text(s)
print("src ok")
