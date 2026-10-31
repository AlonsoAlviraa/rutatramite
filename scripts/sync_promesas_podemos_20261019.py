"""Añade a promises.json las «5 propuestas para tener paz, casa y trabajo» de Podemos (post oficial en X, 19-10-2026, 11:59 Madrid,
vídeo de Pablo Fernández). Idempotente. Detalle: 20minutos, 19-10-2026 (rueda de prensa de Pablo Fernández y comunicado de campaña).
Mismo tratamiento que el «Contrato con España» del PP: una entrada por tema del comparador."""
import json, pathlib
P = pathlib.Path(__file__).resolve().parent.parent / "data/promesas-29n/promises.json"
D = json.loads(P.read_text())
URL = "https://x.com/PODEMOS/status/2112121339267965036"
TITLE = "Podemos en X: «Estas son nuestras 5 propuestas para tener paz, casa y trabajo»"
WHO = "Podemos, «5 propuestas para tener paz, casa y trabajo» (post oficial con vídeo de Pablo Fernández), 19-10-2026"
def pr(id_, topic, measure, quote, profiles=()):
    return {"id": id_, "party": "podemos", "topic": topic, "measure": measure, "quote": quote, "source_url": URL, "source_title": TITLE,
            "source_date": "2026-10-19", "source_type": "oficial-partido", "level": "estatal", "tax": None, "profiles": list(profiles), "cost": None, "impact": None, "who": WHO}
NEW = [
 pr("podemos-5p-vivienda", "vivienda", "5 propuestas, punto 1: «Las casas son para vivir».", "Las casas son para vivir.", ("joven-alquiler", "familia")),
 pr("podemos-5p-coste-vida", "impuestos", "5 propuestas, punto 2: bajar el coste de la vida.", "Bajar el coste de la vida.", ("familia",)),
 pr("podemos-5p-guerras", "instituciones", "5 propuestas, punto 3: «Ni un euro para guerras».", "Ni un euro para guerras."),
 pr("podemos-5p-smi-30h", "empleo", "5 propuestas, punto 4: subir el SMI a 1.800 € y jornada laboral de 30 horas.", "Subir el SMI a 1.800€ y jornada laboral de 30h.", ("parado",)),
 pr("podemos-5p-publico-clima", "instituciones", "5 propuestas, punto 5: proteger lo público y políticas contra el cambio climático.", "Proteger lo público y políticas contra el cambio climático."),
]
known = {p["id"] for p in D["promises"]}
for n in NEW:
    if n["id"] not in known: D["promises"].append(n)
D["updated"] = "2026-10-19"
P.write_text(json.dumps(D, ensure_ascii=False, indent=1) + "\n")
print(len(D["promises"]))
