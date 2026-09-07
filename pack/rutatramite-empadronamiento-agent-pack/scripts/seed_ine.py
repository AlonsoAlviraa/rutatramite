#!/usr/bin/env python3
"""Seed de municipios INE.

Intenta, en este orden:
1) CSV CodeForSpain (INE 01/01/2026)
2) XLSX INE 26codmun.xlsx

No inventa sedes. Solo IDs, nombres y slugs.
"""
from __future__ import annotations

import csv
import io
import json
import re
import unicodedata
import urllib.request
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
OUT_DIR = ROOT / "data" / "municipios"
CODEFORSPAIN = (
    "https://raw.githubusercontent.com/codeforspain/ds-organizacion-administrativa/"
    "master/data/municipios.csv"
)
OVERRIDES_PATH = ROOT / "data" / "slug_overrides.json"


def slugify(name: str) -> str:
    n = unicodedata.normalize("NFKD", name)
    n = "".join(ch for ch in n if not unicodedata.combining(ch))
    n = n.lower()
    n = n.replace("'", "").replace("’", "")
    n = re.sub(r"[^a-z0-9]+", "-", n).strip("-")
    return n


def fetch(url: str) -> bytes:
    req = urllib.request.Request(url, headers={"User-Agent": "RutaTramiteBot/0.1"})
    with urllib.request.urlopen(req, timeout=30) as res:
        return res.read()


def main() -> None:
    OUT_DIR.mkdir(parents=True, exist_ok=True)
    overrides = json.loads(OVERRIDES_PATH.read_text(encoding="utf-8"))
    raw = fetch(CODEFORSPAIN).decode("utf-8")
    rows = list(csv.DictReader(io.StringIO(raw)))
    index = []
    for row in rows:
        ine = row.get("municipio_id") or row.get("ine_code")
        name = row.get("nombre") or row.get("name")
        if not ine or not name:
            continue
        ine = str(ine).zfill(5)
        province = ine[:2]
        slug = overrides.get(ine) or slugify(name)
        rec = {
            "ine_code": ine,
            "name": name,
            "slug": slug,
            "province_code": province,
            "province_slug": slugify(row.get("provincia") or province),
            "ccaa_slug": slugify(row.get("ccaa") or "espana"),
            "confidence": "unverified",
            "status": "stub",
            "last_verified": "1970-01-01",
            "source_urls": [
                "https://www.ine.es/dyngs/INEbase/operacion.htm?c=Estadistica_C&cid=1254736177031"
            ],
            "online": "unknown",
            "cita_previa": "unknown",
            "tasa_alta": 0,
            "docs_extra": [],
            "peculiaridades": [],
            "oficinas": [],
        }
        (OUT_DIR / f"{ine}.json").write_text(
            json.dumps(rec, ensure_ascii=False, indent=2), encoding="utf-8"
        )
        index.append(
            {
                "ine_code": ine,
                "name": name,
                "slug": slug,
                "province_code": province,
                "status": "stub",
            }
        )
    (OUT_DIR / "_index.json").write_text(
        json.dumps(index, ensure_ascii=False, indent=2), encoding="utf-8"
    )
    print(f"Wrote {len(index)} municipalities to {OUT_DIR}")


if __name__ == "__main__":
    main()
