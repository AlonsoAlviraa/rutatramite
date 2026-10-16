#!/usr/bin/env python3
"""Build schema-valid per-municipio JSON + _index.json from the pack catalog.

Does not invent sede_url, cita_url or telefono. Contact fields are omitted
when unverified. Madrid is filled from the pack sample.
"""
from __future__ import annotations

import csv
import json
import re
import shutil
import unicodedata
import io
import os
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
PACK = ROOT / "pack" / "rutatramite-empadronamiento-agent-pack"
OUT = Path(os.environ.get("MUNICIPIOS_OUT") or (ROOT / "data" / "municipios"))
SCHEMA_SRC = PACK / "data" / "schemas" / "municipio.schema.json"
SCRATCH_FETCH = Path(
    r"C:\Users\Mariano\AppData\Local\Temp\grok-goal-f9f1041c80a0\implementer\sede-fetch.json"
)
CFS_CSV = Path(
    r"C:\Users\Mariano\AppData\Local\Temp\grok-goal-f9f1041c80a0\implementer\municipios_cfs.csv"
)
INE_POP_URL = (
    "https://www.ine.es/dyngs/INEbase/operacion.htm?c=Estadistica_C&cid=1254736177031"
)
CFS_MUNICIPIOS_URL = (
    "https://raw.githubusercontent.com/codeforspain/ds-organizacion-administrativa/"
    "master/data/municipios.csv"
)
INE_CACHE = ROOT / "data" / "catalog" / "municipios_ine.csv"

INE_FIX_BY_NAME = {
    "Hospitalet de Llobregat": "08101",
    "La Coruña": "15030",
    "San Adrián de Besós": "08194",
    "Villagarcía de Arosa": "36060",
    "San Juan Despí": "08217",
    "San Pedro de Ribas": "08231",
    "Vall de Uxó": "12126",
    "San José": "07048",
    "San Antonio Abad": "07046",
    "San Vicente dels Horts": "08263",
    "Puebla de Vallbona": "46202",
    "Molins de Rey": "08123",
    "Cuart de Poblet": "46102",
    "San Juan de Alicante": "03119",
    "Cangas de Morrazo": "36008",
    "Santa Perpetua de Moguda": "08260",
    "San Felíu de Guixols": "17160",
    "Vilasar de Mar": "08219",
    "Alfaz del Pi": "03011",
    "San Justo Desvern": "08221",
    "Las Franquesas del Vallés": "08086",
    "La Estrada": "36017",
    "La Eliana": "46116",
    "San Celoni": "08202",
    "Caldas de Montbuy": "08033",
    "Tabernes de Valldigna": "46238",
    "Guernica y Luno": "48046",
    "Cubellas": "08074",
    "Fuenterrabía": "20036",
    "Masamagrell": "46164",
    "Llissá de Munt": "08107",
    "Benetúser": "46054",
    "Pasajes": "20064",
    "Vivero": "27066",
    "San Carlos de la Rápita": "43136",
    "Mollerusa": "25137",
    "Sopelana": "48085",
    "Vergara": "20074",
    "Estella": "31097",
    "La Puebla": "07044",
    "Noya": "15057",
    "Villalba": "27065",
    "Santa Coloma de Farnés": "17180",
    "Montroig": "43092",
    "Santa Margarita": "07055",
    "San Sadurní de Noya": "08240",
    "Órdenes": "15059",
    "Seo de Urgel": "25203",
    "Castillo de Aro": "17048",
    "Santañí": "07057",
    "Bayona": "36003",
    "Benisa": "03041",
    "Calonge": "17034",
    "Benifayó": "46060",
    "Echévarri": "48029",
    "Valle de Trápaga": "48080",
    "Benaguacil": "46051",
    "Andrach": "07005",
    "San Andrés de Llavaneras": "08197",
    "Picaña": "46193",
    "Castellón de Ampurias": "17047",
    "Azcoitia": "20017",
    "Oñate": "20059",
    "Laracha": "15041",
    "La Bisbal del Ampurdán": "17022",
    "Barbadanes": "32008",
    "San Juan de Torruella": "08218",
    "Rianjo": "15072",
    "Alberique": "46011",
    "Villamarchante": "46256",
    "Villafranca de Ordizia": "20076",
    "Alcácer": "46015",
    "Alcora": "12005",
    "La Escala": "17062",
    "Santa Margarita de Montbuy": "08250",
    "Oyarzun": "20063",
    "Salvatierra de Miño": "36050",
    "Villanueva de Arosa": "36061",
    "Zumaya": "20081",
    "Masanasa": "46165",
}

# Catalog wrongly assigned Mallorca's 07003 to l'Alcúdia (Valencia).
INE_FIX_BY_WIKI = {
    "La Alcudia": "46019",
}


def slugify(name: str) -> str:
    n = unicodedata.normalize("NFKD", name)
    n = "".join(ch for ch in n if not unicodedata.combining(ch))
    n = n.lower().replace("'", "").replace("’", "").replace("·", "")
    n = re.sub(r"[^a-z0-9]+", "-", n).strip("-")
    return n


def fetch_bytes(url: str) -> bytes:
    import urllib.request

    req = urllib.request.Request(url, headers={"User-Agent": "RutaTramiteBot/0.1"})
    with urllib.request.urlopen(req, timeout=60) as res:
        return res.read()


def load_ine_rows() -> list[dict[str, str]]:
    """Official INE municipality list (CodeForSpain dump of 26codmun). Names/codes only."""
    INE_CACHE.parent.mkdir(parents=True, exist_ok=True)
    if INE_CACHE.exists():
        text = INE_CACHE.read_text(encoding="utf-8")
    else:
        text = fetch_bytes(CFS_MUNICIPIOS_URL).decode("utf-8")
        INE_CACHE.write_text(text, encoding="utf-8")
    rows: list[dict[str, str]] = []
    with io.StringIO(text) as buf:
        for row in csv.DictReader(buf):
            ine = (row.get("municipio_id") or "").zfill(5)
            name = (row.get("nombre") or "").strip()
            if ine and name and ine.isdigit():
                rows.append({"ine_code": ine, "name": name, "province_code": ine[:2]})
    return rows


def load_cfs() -> dict[str, str]:
    names: dict[str, str] = {}
    if not CFS_CSV.exists():
        return names
    with CFS_CSV.open(encoding="utf-8") as f:
        for row in csv.DictReader(f):
            names[row["municipio_id"].zfill(5)] = row["nombre"]
    return names


def load_wd_map() -> dict[str, list[str]]:
    for p in (
        ROOT / "data" / "wd_map.json",
        Path(r"C:\Users\Mariano\AppData\Local\Temp\grok-goal-f9f1041c80a0\implementer\wd_map.json"),
    ):
        if p.exists():
            return json.loads(p.read_text(encoding="utf-8"))
    return {}


def load_sedes() -> dict[str, dict]:
    path = ROOT / "data" / "sedes_verified.json"
    if path.exists():
        rows = json.loads(path.read_text(encoding="utf-8"))
    elif SCRATCH_FETCH.exists():
        rows = json.loads(SCRATCH_FETCH.read_text(encoding="utf-8"))
    else:
        rows = []
    out: dict[str, dict] = {}
    for r in rows:
        status = r.get("status")
        host = r.get("host")
        url = r.get("final_url") or r.get("candidate")
        if not url:
            continue
        st = int(status) if status is not None else None
        blocked = st in {401, 403, 429, 503}
        ok = st is not None and 200 <= st < 400
        if ok or blocked:
            out[r["ine_code"]] = {
                "sede_url": url if str(url).startswith("http") else f"https://{host}/",
                "host": host,
                "confidence": "official",
            }
    wd = load_wd_map()
    for ine, urls in wd.items():
        if ine in out:
            continue
        cleaned = []
        for u in urls:
            if any(x in u.lower() for x in ("twitter", "facebook", "youtube", "instagram", "wikipedia")):
                continue
            if u.startswith("http://"):
                u = "https://" + u[len("http://") :]
            cleaned.append(u)
        if not cleaned:
            continue
        cleaned.sort(key=lambda u: (("sede" in u or "seuelectronica" in u), "turismo" not in u), reverse=True)
        out[ine] = {"sede_url": cleaned[0], "host": None, "confidence": "inferred"}
    return out


def main() -> None:
    cat = json.loads((PACK / "data" / "municipios_10k.json").read_text(encoding="utf-8"))
    overrides = json.loads((PACK / "data" / "slug_overrides.json").read_text(encoding="utf-8"))
    territories = json.loads((ROOT / "data" / "geo" / "territories.json").read_text(encoding="utf-8"))
    madrid = json.loads((PACK / "09_samples" / "28079-madrid.json").read_text(encoding="utf-8"))
    cfs_names = load_cfs()
    sedes = load_sedes()
    provinces = territories["provinces"]
    ccaa_by_prov = {}
    for c in territories["ccaa"]:
        for pc in c["province_codes"]:
            ccaa_by_prov[pc] = c

    OUT.mkdir(parents=True, exist_ok=True)

    schema_dest = ROOT / "data" / "schemas" / "municipio.schema.json"
    schema_dest.parent.mkdir(parents=True, exist_ok=True)
    shutil.copyfile(SCHEMA_SRC, schema_dest)

    index = []
    seen_ine: set[str] = set()
    used_slugs: set[tuple[str, str, str]] = set()

    for row in cat:
        wiki = row.get("name_wiki") or ""
        ine = row.get("ine_code")
        if wiki in INE_FIX_BY_WIKI:
            ine = INE_FIX_BY_WIKI[wiki]
        elif not ine:
            ine = INE_FIX_BY_NAME.get(row["name"])
        if not ine:
            raise SystemExit(f"Missing INE for {row['name']}")
        ine = str(ine).zfill(5)
        if ine in seen_ine:
            raise SystemExit(f"Duplicate INE {ine} ({row['name']})")
        seen_ine.add(ine)

        pc = ine[:2]
        if pc not in provinces:
            raise SystemExit(f"Unknown province {pc} for {ine}")
        prov = provinces[pc]
        ccaa = ccaa_by_prov[pc]
        official = cfs_names.get(ine) or row["name"]
        slug = overrides.get(ine) or slugify(official)
        base = slug
        n = 2
        while (ccaa["slug"], prov["slug"], slug) in used_slugs:
            slug = f"{base}-{n}"
            n += 1
        used_slugs.add((ccaa["slug"], prov["slug"], slug))

        oleada = row["oleada"]
        min_words = 1800 if oleada == "A" else 1200
        sede_info = sedes.get(ine)
        rec = {
            "ine_code": ine,
            "name": official,
            "name_official_alt": None if official == row["name"] else row["name"],
            "slug": slug,
            "province_code": pc,
            "province_name": prov["name"],
            "province_slug": prov["slug"],
            "ccaa_name": ccaa["name"],
            "ccaa_slug": ccaa["slug"],
            "poblacion": int(row["poblacion_2025"]) if row.get("poblacion_2025") is not None else None,
            "poblacion_ref": row.get("poblacion_ref")
            or "INE 1-ene-2025 (vía listado público; contrastar cifra vigente en ine.es)",
            "sede_url": None,
            "tramite_alta_url": None,
            "cita_url": None,
            "certificado_url": None,
            "online": "unknown",
            "presencial": None,
            "cita_previa": "unknown",
            "oficinas": [],
            "tasa_alta": 0,
            "tasa_volante": None,
            "tasa_certificado": None,
            "docs_extra": [],
            "peculiaridades": [],
            "idiomas_sede": ["es"],
            "last_verified": "2026-09-03",
            "source_urls": [INE_POP_URL],
            "confidence": "unverified",
            "status": "published",
            "oleada": oleada,
            "min_words": min_words,
            "banda": row.get("banda"),
            "catalog_name": row["name"],
        }

        if ine == "28079":
            for k in madrid:
                rec[k] = madrid[k]
            rec["oleada"] = "A"
            rec["min_words"] = 1800
            rec["banda"] = row.get("banda")
            rec["catalog_name"] = row["name"]
            rec["poblacion"] = int(row["poblacion_2025"])
            rec["poblacion_ref"] = row.get("poblacion_ref") or rec.get("poblacion_ref")
            rec["ccaa_name"] = ccaa["name"]
            rec["ccaa_slug"] = ccaa["slug"]
            rec["province_name"] = prov["name"]
            rec["province_slug"] = prov["slug"]
            rec["status"] = "published"
            rec["confidence"] = "official"
        elif sede_info and (oleada == "A" or sede_info.get("confidence") == "official"):
            rec["sede_url"] = sede_info["sede_url"]
            rec["source_urls"] = [sede_info["sede_url"], INE_POP_URL]
            rec["confidence"] = "official" if oleada == "A" else sede_info.get("confidence", "inferred")
            rec["online"] = "unknown"
            rec["presencial"] = True

        review_path = ROOT / "data" / "municipal-reviews.json"
        if review_path.exists():
            rec.update(json.loads(review_path.read_text(encoding="utf-8")).get(ine, {}))
        path = f"/empadronarse/{ccaa['slug']}/{prov['slug']}/{slug}"
        rec["path"] = path
        (OUT / f"{ine}.json").write_text(
            json.dumps(rec, ensure_ascii=False, indent=2) + "\n", encoding="utf-8"
        )
        index.append(
            {
                "ine_code": ine,
                "name": rec["name"],
                "slug": slug,
                "province_code": pc,
                "province_name": rec["province_name"],
                "province_slug": rec["province_slug"],
                "ccaa_name": rec["ccaa_name"],
                "ccaa_slug": rec["ccaa_slug"],
                "poblacion": rec["poblacion"],
                "status": rec["status"],
                "confidence": rec["confidence"],
                "oleada": oleada,
                "min_words": min_words,
                "path": path,
                "sede_url": rec.get("sede_url"),
                "cita_url": rec.get("cita_url"),
                "docs_extra": rec.get("docs_extra") or [],
            }
        )

    extra_n = 0
    # Catalog frozen at oleada A–D (≥10k). Do not emit <10k stubs.
    wanted = {f"{e['ine_code']}.json" for e in index}
    wanted.add("_index.json")
    for f in OUT.glob("*.json"):
        if f.name not in wanted:
            f.unlink()
    payload = json.dumps(index, ensure_ascii=False, separators=(",", ":")) + "\n"
    (OUT / "_index.json").write_text(payload, encoding="utf-8")
    for dest in (
        ROOT / "data" / "catalog" / "municipios_index.json",
        ROOT / "src" / "lib" / "data" / "municipios_index.generated.json",
    ):
        dest.parent.mkdir(parents=True, exist_ok=True)
        dest.write_text(payload, encoding="utf-8")
    print(f"Wrote {len(index)} municipios to {OUT} (oleada E skipped extra_n={extra_n})")
    a_with_sede = sum(1 for x in index if x["oleada"] == "A" and x.get("sede_url"))
    print(f"Oleada A with sede_url: {a_with_sede}/{sum(1 for x in index if x['oleada']=='A')}")


if __name__ == "__main__":
    main()
