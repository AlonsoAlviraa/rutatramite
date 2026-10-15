"""Build the RutaTrámite SEO operating plan from dated evidence already in the repo.

The entry reads stored receipts, validates them with seo_plan_core, and writes a
plan plus a machine record. It does not publish, deploy, submit IndexNow, send
mail, or edit a running timer.
"""

import argparse
import hashlib
import json
import re
import unicodedata
import xml.etree.ElementTree as ET
from pathlib import Path

from seo_plan_core import (
    HEADINGS,
    demand_score_from_disclosed_impressions,
    fit_band,
    priority_from_scores,
    ranking_score_from_position,
    validate_foundation,
    validate_recommendation,
    validate_registry,
    weighted_fit,
    expected_monthly_contribution,
)

ROOT = Path(__file__).resolve().parents[1]
HOST = "https://rutatramite.com"
SITEMAP_NS = {"s": "http://www.sitemaps.org/schemas/sitemap/0.9"}
GROWTH_PATH = Path("docs/seo-workflow/20261006-measurement/growth-latest.json")
INSPECTION_PATH = Path("docs/seo-workflow/20261006-audit/url-inspection-post-oauth.json")
SUMMARY_PATH = Path("docs/seo-workflow/20261006-audit/summary.json")
PROMPTS_PATH = Path("docs/seo-workflow/measurement/ai-prompts.json")
METRICS_PATH = Path("docs/seo-workflow/measurement/metrics.md")
BUSINESS_PATH = Path("docs/seo-workflow/context/business.md")
SITEMAP_PATH = Path("public/sitemap.xml")
LIVE_SITEMAP_PATH = Path("docs/seo-workflow/20261006-measurement/sitemap-live.xml")
LIVE_SITEMAP_RECEIPT = Path("docs/seo-workflow/20261006-measurement/sitemap-live-receipt.json")
DEFAULT_OUTPUT = Path("docs/seo-workflow/operating-plan")

PACK_INDEX = {
    "viaje": "/dni",
    "mudanza": "/mudanza",
    "extranjeria": "/extranjeria",
    "colegio": "/colegio",
    "comedor": "/comedor",
    "transporte": "/transporte",
    "fp": "/fp",
    "bebe": "/bebe",
    "becas": "/becas",
    "alquiler": "/alquiler",
    "elecciones": "/elecciones",
    "modelos": "/modelos",
}

# Site-level fit. 5 is the favorable end of each factor. For maintenance burden,
# 5 means the information can stay current at an acceptable cost.
FIT_SCORES = {
    "search_demand": 3,
    "commercial_value": 3,
    "ability_to_produce_better_result": 3,
    "chance_of_ranking": 3,
    "path_to_authority": 3,
    "maintenance_burden": 3,
    "asset_value_over_time": 3,
}

FIT_FACTOR_LABELS = {
    "search_demand": "Search demand",
    "commercial_value": "Commercial value",
    "ability_to_produce_better_result": "Ability to produce a better result",
    "chance_of_ranking": "Chance of ranking",
    "path_to_authority": "Path to earning authority",
    "maintenance_burden": "Maintenance burden",
    "asset_value_over_time": "Value of the asset over time",
}

GROUP_META = {
    "brand-home": {"intent": "navigation", "closeness": 1, "new_information": 2, "reuse": 2, "distribution": 1, "effort": 2},
    "cita-dni": {"intent": "implementation", "closeness": 3, "new_information": 3, "reuse": 3, "distribution": 2, "effort": 3},
    "cita-pasaporte": {"intent": "implementation", "closeness": 3, "new_information": 3, "reuse": 3, "distribution": 2, "effort": 3},
    "cita-conjunta": {"intent": "implementation", "closeness": 3, "new_information": 3, "reuse": 2, "distribution": 2, "effort": 3},
    "dni": {"intent": "implementation", "closeness": 3, "new_information": 3, "reuse": 4, "distribution": 2, "effort": 4},
    "pasaporte": {"intent": "implementation", "closeness": 3, "new_information": 3, "reuse": 3, "distribution": 2, "effort": 4},
    "becas": {"intent": "time-sensitive information", "closeness": 3, "new_information": 3, "reuse": 4, "distribution": 2, "effort": 4},
    "empadronarse": {"intent": "implementation", "closeness": 3, "new_information": 3, "reuse": 4, "distribution": 2, "effort": 3},
    "empadron-madrid": {"intent": "local search", "closeness": 4, "new_information": 4, "reuse": 2, "distribution": 2, "effort": 3},
    "empadron-barcelona": {"intent": "local search", "closeness": 4, "new_information": 4, "reuse": 2, "distribution": 2, "effort": 3},
    "empadron-cordoba": {"intent": "local search", "closeness": 4, "new_information": 4, "reuse": 2, "distribution": 2, "effort": 3},
    "empadron-valencia": {"intent": "local search", "closeness": 4, "new_information": 4, "reuse": 2, "distribution": 2, "effort": 3},
    "alquiler": {"intent": "solution research", "closeness": 3, "new_information": 3, "reuse": 3, "distribution": 2, "effort": 4},
    "alquiler-andalucia": {"intent": "local search", "closeness": 3, "new_information": 3, "reuse": 3, "distribution": 3, "effort": 4},
    "descargas": {"intent": "implementation", "closeness": 4, "new_information": 4, "reuse": 4, "distribution": 3, "effort": 3},
    "extranjeria": {"intent": "implementation", "closeness": 3, "new_information": 3, "reuse": 3, "distribution": 2, "effort": 3},
}

WITHHELD_BRIEFS = {
    "/dni": {
        "expected_answer": "What to check before renewing the DNI, and where the official fee and appointment channel are published.",
        "addition": "The page routes the reader to the official source and states that this site is not the Police. The addition is that dated official route, not a new paraphrase and not a fee invented here.",
    },
    "/dni/cita-previa": {
        "expected_answer": "The appointment is issued on the official Police channel. This site does not create, move, or confirm the appointment.",
        "addition": "A route to that official channel. A clone of citapreviadnie is rejected.",
    },
    "/pasaporte": {
        "expected_answer": "What to prepare for a passport application and where the official fee and appointment channel are published.",
        "addition": "The dated official route for the passport, kept separate from the DNI page because the document and the fee are different.",
    },
    "/becas": {
        "expected_answer": "How to tell an open student-aid call from a data change or a rule whose application window is not open.",
        "addition": "The selected aid records and their review dates, with the official call linked from the record. The page does not become a complete national catalog.",
    },
    "/empadronarse": {
        "expected_answer": "Which padrón situation applies, which council is responsible, and which official channel comes next.",
        "addition": "Situation pages and the municipal directory, so the reader chooses a place instead of a generic national article.",
    },
    "/descargas": {
        "expected_answer": "Which official PDF matches the procedure, and how to check that the file comes from the responsible body.",
        "addition": "Provenance, the matching guide, and the file itself. A new wording of the same form list is not the addition.",
    },
    "/ayudas": {
        "expected_answer": "A selected aid record is not the same thing as an open application.",
        "addition": "The reusable JSON and CSV extract, with territory, phase, and review date, and with the limit that the extract is not exhaustive.",
    },
    "/recursos": {
        "expected_answer": "Where the dated sources, the review log, and the downloadable aid extract live.",
        "addition": "The method page and the dataset download, which a generic explainer does not hand to the reader as a file.",
    },
}

TASKS = {
    "/": "Choose the right guide, municipality, or download and open the official source.",
    "/dni": "Prepare the DNI renewal, fee, or documents and open the official source.",
    "/dni/cita-previa": "Reach or check the official DNI appointment channel.",
    "/pasaporte/cita-previa": "Reach or check the official passport appointment channel.",
    "/dni/misma-cita-pasaporte": "Prepare one official appointment that covers both the DNI and the passport.",
    "/pasaporte": "Prepare the passport fee, appointment, or documents and open the official source.",
    "/becas": "Check a student aid and open the official call.",
    "/empadronarse": "Choose the padrón situation and the responsible council.",
    "/descargas": "Download the official form that matches the procedure.",
    "/ayudas": "Reuse the selected aid extract and check whether a deadline is open.",
    "/recursos": "Use the dated sources and the downloadable aid extract.",
    "/alquiler": "Choose the rental procedure or aid and open the official call.",
    "/alquiler/ayudas-por-comunidad": "Compare the selected rental-aid records by community and open the official source.",
    "/empadronarse/comunidad-de-madrid/madrid/madrid": "Prepare the padrón in Madrid and open that council's channel.",
    "/empadronarse/cataluna/barcelona/barcelona": "Prepare the padrón in Barcelona and open that council's channel.",
    "/empadronarse/andalucia/cordoba/cordoba": "Prepare the padrón in Córdoba and open that council's channel.",
    "/empadronarse/comunidad-valenciana/valencia/valencia": "Prepare the padrón in València and open that council's channel.",
    "/extranjeria": "Choose the immigration procedure and open the official source.",
}


def fold(text):
    lowered = text.lower()
    return "".join(char for char in unicodedata.normalize("NFD", lowered) if unicodedata.category(char) != "Mn")


def has_token(text, token):
    return re.search(rf"(?<![a-z0-9]){re.escape(token)}(?![a-z0-9])", text) is not None


def assign_query(query, paths):
    """Map one raw query to one task group. The owner must already be in the sitemap."""
    folded = fold(query)

    def owns(path):
        return path if path in paths else None

    has_dni_word = "dni" in folded
    # "citaprevianie" contains the letters citaprevia. That glue is an NIE appointment, not a DNI one.
    nie_glued_appointment = "citaprevianie" in folded
    has_dni = has_dni_word or ("citaprevia" in folded and not nie_glued_appointment)
    has_passport = "pasaporte" in folded
    has_appointment = (
        "sin cita" not in folded
        and ("citaprevia" in folded or has_token(folded, "cita") or has_token(folded, "citas"))
    )
    fee = any(token in folded for token in ("tasa", "precio", "cuesta", "coste", "costo", "tarifa")) or any(
        has_token(folded, token) for token in ("pago", "pagar", "paga", "vale", "sale")
    )

    if "rutatramite" in folded or "ruta tramite" in folded:
        group_id, owner, intent = "brand-home", owns("/"), "navigation"
    elif nie_glued_appointment or (has_appointment and has_token(folded, "nie") and not has_dni_word):
        group_id, owner, intent = "extranjeria", owns("/extranjeria"), "implementation"
    elif has_dni and has_passport and (has_appointment or "juntos" in folded or "a la vez" in folded or "misma cita" in folded):
        group_id, owner, intent = "cita-conjunta", owns("/dni/misma-cita-pasaporte"), "implementation"
    elif has_appointment and has_dni and not has_passport:
        group_id, owner, intent = "cita-dni", owns("/dni/cita-previa"), "implementation"
    elif has_appointment and has_passport and not has_dni_word:
        group_id, owner, intent = "cita-pasaporte", owns("/pasaporte/cita-previa"), "implementation"
    elif "beca" in folded or has_token(folded, "mec"):
        group_id, owner, intent = "becas", owns("/becas"), "time-sensitive information"
    elif "alquiler" in folded or "fianza" in folded:
        if "andaluc" in folded:
            group_id, owner, intent = "alquiler-andalucia", owns("/alquiler/ayudas-por-comunidad"), "local search"
        else:
            group_id, owner, intent = "alquiler", owns("/alquiler"), "solution research"
    elif any(token in folded for token in ("empadron", "padron", "volante", "certificado de morada")):
        if "cordoba" in folded:
            group_id, owner, intent = "empadron-cordoba", owns("/empadronarse/andalucia/cordoba/cordoba"), "local search"
        elif "madrid" in folded:
            group_id, owner, intent = "empadron-madrid", owns("/empadronarse/comunidad-de-madrid/madrid/madrid"), "local search"
        elif "barcelona" in folded:
            group_id, owner, intent = "empadron-barcelona", owns("/empadronarse/cataluna/barcelona/barcelona"), "local search"
        elif "valencia" in folded:
            group_id, owner, intent = "empadron-valencia", owns("/empadronarse/comunidad-valenciana/valencia/valencia"), "local search"
        else:
            group_id, owner, intent = "empadronarse", owns("/empadronarse"), "implementation"
    elif any(token in folded for token in ("formulario", "impreso", "ex-10", "ex 10", "descargar")):
        group_id, owner, intent = "descargas", owns("/descargas"), "implementation"
    elif fee and "dni" in folded and has_passport:
        group_id, owner, intent = "dni", owns("/dni"), "implementation"
    elif has_passport:
        group_id, owner, intent = "pasaporte", owns("/pasaporte"), "implementation"
    elif "dni" in folded:
        group_id, owner, intent = "dni", owns("/dni"), "implementation"
    elif any(token in folded for token in ("extranjer", "mercurio")) or has_token(folded, "nie") or has_token(folded, "tie"):
        group_id, owner, intent = "extranjeria", owns("/extranjeria"), "implementation"
    else:
        group_id, owner, intent = None, None, "UNKNOWN"

    if group_id and owner is None:
        group_id, intent = None, "UNKNOWN"
    return {"query_group": group_id, "owner": owner, "intent": intent, "same_task_as_group": group_id is not None}


def recommendation(statement, evidence, evidence_kind, change, measure, owner, stop_when):
    item = {
        "statement": statement,
        "evidence": evidence,
        "evidence_kind": evidence_kind,
        "change": change,
        "measure": measure,
        "owner": owner,
        "stop_when": stop_when,
    }
    validate_recommendation(item)
    return item


def load_json(root, relative):
    path = root / relative
    return json.loads(path.read_text(encoding="utf-8")), str(relative).replace("\\", "/")


def paths_from_sitemap(path):
    tree = ET.parse(path)
    locs = [node.text.strip() for node in tree.findall(".//s:loc", SITEMAP_NS)]
    paths = []
    for loc in locs:
        if not loc.startswith(HOST):
            raise ValueError(f"sitemap URL outside {HOST}: {loc}")
        rest = loc[len(HOST):]
        paths.append("/" if rest in ("", "/") else rest.rstrip("/"))
    if len(paths) != len(set(paths)):
        raise ValueError("duplicate sitemap URL")
    return paths


def sitemap_paths(root):
    return paths_from_sitemap(root / SITEMAP_PATH)


def load_sitemap_comparison(root, paths, summary_count):
    """Read the live sitemap body captured in this goal. Do not fetch again."""
    live_path = root / LIVE_SITEMAP_PATH
    receipt = json.loads((root / LIVE_SITEMAP_RECEIPT).read_text(encoding="utf-8"))
    body = live_path.read_bytes()
    digest = hashlib.sha256(body).hexdigest()
    if digest != receipt["sha256"]:
        raise ValueError("stored live sitemap does not match its receipt hash")
    live_paths = paths_from_sitemap(live_path)
    return {
        "source": str(LIVE_SITEMAP_PATH).replace("\\", "/"),
        "receipt": str(LIVE_SITEMAP_RECEIPT).replace("\\", "/"),
        "http_status": receipt["http_status"],
        "fetched_date_header": receipt["headers"].get("Date"),
        "last_modified": receipt["headers"].get("Last-Modified"),
        "sha256": digest,
        "bytes_match_public_sitemap": receipt["matches_public_sitemap_xml_bytes"],
        "summary_count": summary_count,
        "file_count": len(paths),
        "live_count": len(live_paths),
        "live_matches_file": live_paths == paths,
        "url_delta_vs_summary": "UNKNOWN",
    }


def load_guide_parents(root):
    parents = {}
    folder = root / "src" / "lib" / "tramites"
    if not folder.exists():
        return parents
    for path in sorted(folder.glob("*.ts")):
        text = path.read_text(encoding="utf-8")
        for match in re.finditer(r'"pack"\s*:\s*"([^"]+)"[\s\S]{0,240}?"path"\s*:\s*"([^"]+)"', text):
            pack, url = match.group(1), match.group(2)
            if pack in PACK_INDEX:
                parents[url] = PACK_INDEX[pack]
        for match in re.finditer(r'"path"\s*:\s*"([^"]+)"[\s\S]{0,240}?"pack"\s*:\s*"([^"]+)"', text):
            url, pack = match.group(1), match.group(2)
            if pack in PACK_INDEX and url not in parents:
                parents[url] = PACK_INDEX[pack]
    return parents


def scenario_slugs(root):
    folder = root / "content" / "escenarios"
    if not folder.exists():
        return set()
    return {path.stem for path in folder.glob("*.md")}


def count_aid_records(root):
    rental_path = root / "data" / "rental-aid-reviews.json"
    rental = json.loads(rental_path.read_text(encoding="utf-8"))
    source = (root / "src" / "lib" / "ayudas.ts").read_text(encoding="utf-8")
    inline_ids = re.findall(r"\{\s*id:\s*\"([^\"]+)\"", source)
    rental_ids = [row["id"] for row in rental]
    overlap = sorted(set(rental_ids) & set(inline_ids))
    if overlap:
        raise ValueError("aid ids overlap between rental reviews and ayudas.ts: " + ", ".join(overlap))
    return {
        "count": len(rental_ids) + len(inline_ids),
        "rental_review_count": len(rental_ids),
        "inline_count": len(inline_ids),
        "sources": ["data/rental-aid-reviews.json", "src/lib/ayudas.ts"],
    }


def has_direct_child(path, paths):
    if path == "/":
        return any(item != "/" and item.count("/") == 1 for item in paths)
    prefix = path + "/"
    depth = path.count("/")
    return any(item.startswith(prefix) and item.count("/") == depth + 1 for item in paths)


def classify_path(path, paths, guide_parents, scenarios):
    parts = [part for part in path.split("/") if part]
    hubs = set(PACK_INDEX.values()) | {"/pasaporte", "/ayudas", "/recursos", "/descargas", "/empadronarse", "/hacienda"}
    if path == "/":
        return "home", None
    if path in ("/aviso-legal", "/privacidad"):
        return "legal", "/"
    if path == "/contacto":
        return "contact", "/"
    if path in ("/metodologia", "/fuentes"):
        return "method", "/"
    if path == "/descargas":
        return "download-index", "/"
    if path == "/ayudas":
        return "dataset", "/"
    if path == "/recursos":
        return "dataset", "/"
    if path.startswith("/recursos/"):
        return "dataset", "/recursos"
    if parts and parts[0] == "empadronarse":
        if len(parts) == 1:
            return "hub", "/"
        if len(parts) == 2 and parts[1] in scenarios:
            return "scenario", "/empadronarse"
        if len(parts) == 2:
            return "directory-ccaa", "/empadronarse"
        if len(parts) == 3:
            return "directory-province", "/" + "/".join(parts[:2])
        if len(parts) == 4:
            return "directory-municipality", "/" + "/".join(parts[:3])
    if path in hubs or has_direct_child(path, paths):
        return "hub", "/"
    if len(parts) == 1 and path in guide_parents and guide_parents[path] in paths and guide_parents[path] != path:
        page_type = "model" if guide_parents[path] == "/modelos" else "guide"
        return page_type, guide_parents[path]
    if len(parts) >= 2:
        parent = "/" + "/".join(parts[:-1])
        while parent != "/" and parent not in paths:
            parent = "/" + "/".join([part for part in parent.split("/") if part][:-1])
            if parent == "/":
                break
        return "guide", parent if parent in paths else "/"
    return "guide", "/"


def index_bucket(coverage):
    if coverage == "Enviada e indexada":
        return "indexed"
    if coverage.startswith("Rastreada"):
        return "crawled_not_indexed"
    if coverage.startswith("Descubierta"):
        return "discovered_not_indexed"
    if "no reconoce" in coverage:
        return "unknown_to_google"
    return "other"


def utility_for(page_type):
    texts = {
        "home": "Routes the reader to a guide, a municipality, a form, or the aid extract.",
        "hub": "Chooses the procedure inside one subject and links to the official source.",
        "scenario": "Applies the padrón rules of one housing or personal situation.",
        "directory-ccaa": "Lists the provinces or councils of one community.",
        "directory-province": "Lists the councils of one province.",
        "directory-municipality": "Names one council and the channel used for the padrón there.",
        "guide": "Explains one procedure and links to the official source.",
        "model": "Gives one letter or form skeleton and the official rule it depends on.",
        "dataset": "Publishes the selected aid extract or the method required to reuse it.",
        "download-index": "Hands the reader an official file and its provenance.",
        "method": "States how the site checks sources.",
        "legal": "States the legal terms of the site.",
        "contact": "Gives the site's contact address.",
    }
    return texts[page_type]


def conversion_for(page_type):
    if page_type == "download-index":
        return "Download a pertinent official form."
    if page_type == "dataset":
        return "Reuse the aid dataset or open the official call it cites."
    if page_type in ("directory-ccaa", "directory-province", "directory-municipality"):
        return "Choose the municipality and open the responsible official source."
    if page_type in ("legal", "contact", "method"):
        return "No acquisition action. The page meets a trust, contact, or method need."
    return "Choose the right guide and open the responsible official source."


def schedule_for(page_type, path):
    if path in ("/dni", "/pasaporte") or page_type == "dataset":
        return "When the official fee, call, or cited record changes. No invented calendar."
    if page_type in ("directory-ccaa", "directory-province", "directory-municipality"):
        return "When the municipal catalog or the council channel changes."
    if page_type == "legal":
        return "When the legal notice changes."
    if page_type == "model":
        return "When the official rule behind the letter changes."
    return "When the official procedure explained on the page changes."


def task_for(path, page_type):
    if path in TASKS:
        return TASKS[path]
    slug = path.strip("/") or "home"
    labels = {
        "scenario": f"Prepare the padrón situation at {path} and open the official source.",
        "directory-ccaa": f"Choose a council in the community published at {path}.",
        "directory-province": f"Choose a council in the province published at {path}.",
        "directory-municipality": f"Prepare the padrón for the council published at {path}.",
        "model": f"Use the letter or form at {path} only after checking the official rule.",
        "guide": f"Complete the distinct procedure published at {path} and open its official source.",
        "hub": f"Choose the next procedure inside {path} and open the official source.",
    }
    return labels.get(page_type, f"Complete the distinct task published at {slug}.")


def build_gsc(growth, source):
    final_rows = growth["final_daily"]["rows"]
    click_days = [
        {"date": row["keys"][0], "clicks": row["clicks"], "impressions": row["impressions"]}
        for row in final_rows
        if row["clicks"]
    ]
    pages = [
        {
            "url": row["keys"][0],
            "path": row["keys"][0][len(HOST):] or "/",
            "clicks": row["clicks"],
            "impressions": row["impressions"],
            "position": row["position"],
        }
        for row in growth["pages"]["rows"]
    ]
    queries = [
        {
            "query": row["keys"][0],
            "clicks": row["clicks"],
            "impressions": row["impressions"],
            "position": row["position"],
        }
        for row in growth["queries"]["rows"]
    ]
    provisional = [
        {
            "date": row["keys"][0],
            "clicks": row["clicks"],
            "impressions": row["impressions"],
            "position": row["position"],
        }
        for row in growth["recent_all_states"]["daily"]["rows"]
    ]
    return {
        "source": source,
        "checked_at": growth["checked_at"],
        "property": growth["property"],
        "timezone": "America/Los_Angeles",
        "timezone_label": "Pacific Time",
        "request": growth["request"],
        "latest_final_date": growth["latest_final_date"],
        "goal_evidenced": growth["evaluation"]["goal_evidenced"],
        "days_meeting_target": growth["evaluation"]["days_meeting_target"],
        "target_impressions": growth["evaluation"]["target_per_day"]["impressions"],
        "target_clicks": growth["evaluation"]["target_per_day"]["clicks"],
        "measurement_age_days": growth["evaluation"]["measurement_age_days"],
        "final_daily": [
            {
                "date": row["keys"][0],
                "clicks": row["clicks"],
                "impressions": row["impressions"],
                "position": row["position"],
            }
            for row in final_rows
        ],
        "final_impressions_sum": sum(row["impressions"] for row in final_rows),
        "final_clicks_sum": sum(row["clicks"] for row in final_rows),
        "click_days": click_days,
        "pages": pages,
        "page_row_count": len(pages),
        "page_impressions_sum": sum(row["impressions"] for row in pages),
        "page_clicks_sum": sum(row["clicks"] for row in pages),
        "queries": queries,
        "query_row_count": len(queries),
        "query_impressions_sum_disclosed": sum(row["impressions"] for row in queries),
        "query_clicks_sum_disclosed": sum(row["clicks"] for row in queries),
        "provisional_daily": provisional,
        "provisional_page_row_count": len(growth["recent_all_states"]["pages"]["rows"]),
        "provisional_query_row_count": len(growth["recent_all_states"]["queries"]["rows"]),
        "historical_business_md": {
            "path": str(BUSINESS_PATH).replace("\\", "/"),
            "reviewed": "2026-09-16",
            "impressions": 48,
            "clicks": 0,
            "through": "2026-09-13",
            "use": "historical product context only",
        },
    }


def build_groups(queries, paths):
    grouped = {}
    unassigned = []
    stored = []
    for row in queries:
        assigned = assign_query(row["query"], set(paths))
        stored.append({
            "query": row["query"],
            "source": "GSC searchAnalytics, dataState final, dimension query, aggregation byProperty",
            "audience": "A person preparing a trámite in Spain, inferred from the words. Not a measured panel.",
            "region": "ES",
            "language": "es",
            "branded": assigned["query_group"] == "brand-home",
            "demand": "Disclosed impressions in this row only. Not market volume.",
            "impressions": row["impressions"],
            "clicks": row["clicks"],
            "position": row["position"],
            "trend": "UNKNOWN",
            "commercial_relevance": "Useful action only. Euros UNKNOWN.",
            "current_url": "UNKNOWN",
            "current_url_reason": "This receipt has no query-page rows, so the page that received the impression is unknown.",
            "search_result_notes": "UNKNOWN. Live results were not reviewed in this run.",
            "query_group": assigned["query_group"],
            "owner": assigned["owner"],
            "intent": assigned["intent"],
            "evidence_kind": "measurement" if assigned["query_group"] else "measurement",
            "ownership_evidence_kind": "own inference" if assigned["query_group"] else "own inference",
        })
        if assigned["query_group"] is None:
            unassigned.append(stored[-1])
            continue
        bucket = grouped.setdefault(assigned["query_group"], {
            "query_group": assigned["query_group"],
            "owner": assigned["owner"],
            "intent": assigned["intent"],
            "queries": [],
            "impressions": 0,
            "clicks": 0,
        })
        bucket["queries"].append(row["query"])
        bucket["impressions"] += row["impressions"]
        bucket["clicks"] += row["clicks"]
    groups = []
    for group_id, bucket in grouped.items():
        meta = GROUP_META[group_id]
        weight = bucket["impressions"]
        position = None
        if weight:
            position = sum(
                row["impressions"] * row["position"]
                for row in queries
                if row["query"] in set(bucket["queries"])
            ) / weight
        demand_score = demand_score_from_disclosed_impressions(bucket["impressions"])
        chance = ranking_score_from_position(position)
        scores = {
            "business_value": 2,
            "closeness_to_conversion": meta["closeness"],
            "new_information": meta["new_information"],
            "chance_of_ranking": chance,
            "demand": demand_score,
            "reuse": meta["reuse"],
            "distribution": meta["distribution"],
        }
        scored = priority_from_scores(scores, meta["effort"])
        groups.append({
            **bucket,
            "query_count": len(bucket["queries"]),
            "position_weighted": position,
            "demand_label": "Sum of disclosed query rows in this group. Not market volume and not a page total.",
            "scores": scores,
            "effort": meta["effort"],
            "priority": scored,
            "business_value_currency": "1-5 inference. Euros UNKNOWN.",
            "rank_probability_applied": False,
            "click_share_assumes_target_position": False,
            "money_contribution": expected_monthly_contribution(None, None, None, "UNKNOWN"),
        })
    groups.sort(key=lambda item: (-(item["priority"]["hundredths"] or -1), -item["impressions"], item["query_group"]))
    return stored, groups, unassigned


def build_registry(paths, inspection_by_path, page_impressions, groups, scenarios, guide_parents, sitemap_comparison):
    owners = {}
    for group in groups:
        owners.setdefault(group["owner"], []).append(group["query_group"])
    classified = {path: classify_path(path, paths, guide_parents, scenarios) for path in paths}
    children = {path: [] for path in paths}
    for path, (_page_type, parent) in classified.items():
        if parent in children:
            children[parent].append(path)
    for path in children:
        children[path].sort()
    rows = []
    for path in paths:
        page_type, parent = classified[path]
        inspected = inspection_by_path.get(path)
        sitemap_note = (
            f"public/sitemap.xml has {sitemap_comparison['file_count']} URLs. "
            f"The captured live sitemap ({sitemap_comparison['fetched_date_header']}) has {sitemap_comparison['live_count']} URLs"
            f"{' and matches the file' if sitemap_comparison['live_matches_file'] else ''}. "
            f"The 6 Oct 19:30 summary recorded {sitemap_comparison['summary_count']} URLs. "
            "Whether this URL was inside that earlier count is UNKNOWN."
        )
        if inspected:
            page_status = f"HTTP {inspected['http']} on the 2026-10-06 URL inspection. {sitemap_note}"
            index_status = inspected["coverage"]
        else:
            page_status = f"Present in the current sitemap. {sitemap_note} Per-URL HTTP status is UNKNOWN."
            index_status = "UNKNOWN"
        known_impressions = path in page_impressions
        if index_status == "UNKNOWN":
            indexed = None
        elif index_status == "Enviada e indexada":
            indexed = True
        else:
            indexed = False
        if known_impressions or indexed is False:
            action = "improve"
            action_reason = "The URL has finalized page impressions in the 6 Oct receipt, or the 6 Oct inspection says it is not indexed."
        else:
            action = "keep"
            action_reason = "Distinct existing task. Index status is indexed or UNKNOWN. Unknown is not treated as a failure or as zero demand."
        query_groups = owners.get(path, [])
        rows.append({
            "canonical_url": HOST + ("" if path == "/" else path) if path != "/" else HOST + "/",
            "path": path,
            "page_status": page_status,
            "index_status": index_status,
            "index_bucket": index_bucket(index_status) if inspected else "UNKNOWN",
            "primary_task": task_for(path, page_type),
            "query_group": "+".join(sorted(query_groups)) if query_groups else f"unmeasured:{path}",
            "measured_query_groups": sorted(query_groups),
            "page_type": page_type,
            "parent_pages": [] if parent is None else [HOST + parent if parent != "/" else HOST + "/"],
            "child_pages": [HOST + child if child != "/" else HOST + "/" for child in children[path]],
            "primary_conversion": conversion_for(page_type),
            "new_information_or_utility": utility_for(page_type),
            "internal_link_sources": "UNKNOWN at URL level. The 6 Oct public crawl reported 0 broken destinations for the sitemap set and did not publish a per-URL inbound list.",
            "owner": "operador del sitio",
            "last_verification_date": "2026-10-06",
            "update_schedule": schedule_for(page_type, path),
            "action": action,
            "action_reason": action_reason,
            "final_page_impressions": page_impressions.get(path),
            "candidate": False,
        })
    rows.sort(key=lambda row: row["path"])
    validate_registry(rows)
    return rows


def build_foundation(aids, gsc):
    items = [
        {
            "item": "Audience, search problem, and primary conversion",
            "rating": "ESTABLISHED",
            "owner": "operador del sitio",
            "evidence": "docs/seo-workflow/context/business.md defines the audience and the useful actions. The 6 Oct receipts do not replace that product definition.",
            "evidence_kind": "project data",
        },
        {
            "item": "Value of a customer, in money",
            "rating": "UNKNOWN",
            "owner": "operador del sitio",
            "evidence": "No accredited sale price, qualified paid leads, or revenue in the 6 Oct receipt or in the 16 Sep business snapshot.",
            "evidence_kind": "project data",
        },
        {
            "item": "Why search demand should exist",
            "rating": "PARTIAL",
            "owner": "operador del sitio",
            "evidence": f"The final query table discloses {gsc['query_row_count']} queries. Market volume is UNKNOWN. Disclosed impressions are not a market total, and missing rows are not zero.",
            "evidence_kind": "measurement",
        },
        {
            "item": "Anonymous crawl, sitemap, and private pages kept out of the sitemap",
            "rating": "PARTIAL",
            "owner": "operador del sitio",
            "evidence": "The 6 Oct public crawl reported the 259 sitemap URLs with 0 broken destinations. Per-URL canonical agreement and a fresh check of private metric routes are not in that crawl.",
            "evidence_kind": "measurement",
        },
        {
            "item": "Index status of every sitemap URL",
            "rating": "PARTIAL",
            "owner": "operador del sitio",
            "evidence": "url-inspection-post-oauth.json covers 20 URLs on 2026-10-06. The other sitemap URLs stay UNKNOWN. Unknown is not zero indexation.",
            "evidence_kind": "measurement",
        },
        {
            "item": "One owning URL per distinct search task",
            "rating": "PARTIAL",
            "owner": "operador del sitio",
            "evidence": "This plan assigns disclosed queries to existing sitemap URLs. There is no query-page join in the receipt, so the assignment is an inference and the current URL of each query stays UNKNOWN.",
            "evidence_kind": "own inference",
        },
        {
            "item": "Opportunity database joining demand, live intent, value, performance, conversion, and effort",
            "rating": "PARTIAL",
            "owner": "operador del sitio",
            "evidence": "Final page rows and query rows exist. Live result notes, conversion counts, and revenue are UNKNOWN.",
            "evidence_kind": "measurement",
        },
        {
            "item": "Internal links that show which page owns each topic",
            "rating": "PARTIAL",
            "owner": "operador del sitio",
            "evidence": "No per-URL inbound graph is in the 6 Oct receipts.",
            "evidence_kind": "project data",
        },
        {
            "item": "Verifiable business identity and documented method",
            "rating": "ESTABLISHED",
            "owner": "operador del sitio",
            "evidence": "The site publishes /metodologia, /fuentes, and a product definition as an independent guide, not as an official office.",
            "evidence_kind": "project data",
        },
        {
            "item": "Named personal authorship",
            "rating": "UNKNOWN",
            "owner": "operador del sitio",
            "evidence": "This run did not find a dated author baseline to score. No author name is invented.",
            "evidence_kind": "own inference",
        },
        {
            "item": "What search engines and AI answers currently say",
            "rating": "PARTIAL",
            "owner": "operador del sitio",
            "evidence": "ai-prompts.json records the 14 Sep samples. summary.json records a 2-question resurvey on 6 Oct and searchAppearance with no rows. The samples are not market share.",
            "evidence_kind": "measurement",
        },
        {
            "item": "Measurement by page connected to business results",
            "rating": "PARTIAL",
            "owner": "operador del sitio",
            "evidence": "GSC page rows exist for the disclosed set. GA4 is not accredited. The private counter is not read as unique users or filed applications. metrics.md still says no accredited real-visit rows; the 6 Oct GSC receipt does not replace that statement.",
            "evidence_kind": "project data",
        },
        {
            "item": "Dated log of SEO changes",
            "rating": "PARTIAL",
            "owner": "operador del sitio",
            "evidence": "docs/ESTADO-AUDITORIA.md and docs/seo-workflow/20261006-audit/ are a narrative log. They are not a structured experiment log.",
            "evidence_kind": "project data",
        },
        {
            "item": "Queue of improvements for existing pages",
            "rating": "PARTIAL",
            "owner": "operador del sitio",
            "evidence": "The registry in this plan is the queue. It recommends improve or keep. It adds no indexable URL.",
            "evidence_kind": "own inference",
        },
        {
            "item": "Public proof asset",
            "rating": "PARTIAL",
            "owner": "operador del sitio",
            "evidence": f"The aid extract counts {aids['count']} records from {', '.join(aids['sources'])}. Citation outcome is not established: the 6 Oct search recorded 0 external brand mentions, and the AI samples recorded 0 citations.",
            "evidence_kind": "project data",
        },
    ]
    validate_foundation(items)
    return items


def build_technical(registry, gsc, summary):
    by_path = {row["path"]: row for row in registry}
    impression_paths = [page["path"] for page in gsc["pages"]]
    not_indexed = []
    unknown_with_impressions = []
    inspected_not_indexed = []
    for path in impression_paths:
        row = by_path.get(path)
        if row is None:
            unknown_with_impressions.append(path + " (not in the current sitemap)")
            continue
        if row["index_status"] == "UNKNOWN":
            unknown_with_impressions.append(path)
        elif row["index_status"] != "Enviada e indexada":
            not_indexed.append(path)
    for row in registry:
        if row["index_bucket"] in ("crawled_not_indexed", "discovered_not_indexed", "unknown_to_google"):
            inspected_not_indexed.append(row["path"])
    unknown_count = sum(1 for row in registry if row["index_status"] == "UNKNOWN")
    problems = [
        {
            "impact": 1,
            "title": "Inspected URLs with finalized impressions are not indexed",
            "url_count": len(not_indexed),
            "urls": not_indexed,
            "detail": "URL inspection on 2026-10-06 and the final page table do not describe the same state. Last crawl times in the inspection file are before the 2026-10-06 release, so this file does not measure that release.",
        },
        {
            "impact": 2,
            "title": "Finalized page impressions whose index status is UNKNOWN",
            "url_count": len(unknown_with_impressions),
            "urls": unknown_with_impressions,
            "detail": "These URLs have page rows. They were not in the 20-URL inspection, or they are not in the sitemap. Unknown index status stays unknown.",
        },
        {
            "impact": 3,
            "title": "Inspected URLs that are crawled, discovered, or unrecognized, including those without a page row",
            "url_count": len(inspected_not_indexed),
            "urls": inspected_not_indexed,
            "detail": "Indexation of the existing URL is the blocker. A new URL for the same task is rejected.",
        },
        {
            "impact": 4,
            "title": "Sitemap URLs with no URL inspection in this receipt",
            "url_count": unknown_count,
            "urls": [],
            "detail": "The absence of an inspection row is UNKNOWN, not proof that the URL is out of the index and not proof that it is indexed.",
        },
        {
            "impact": 5,
            "title": "Laboratory performance on two measured URLs",
            "url_count": 2,
            "urls": ["/", "/empadronarse"],
            "detail": summary["post_deploy"]["lighthouse_mobile_local"]["nota"],
        },
    ]
    return problems


def build_briefs(groups):
    approved = []
    withheld = []
    for group in groups:
        copy = WITHHELD_BRIEFS.get(group["owner"])
        if not copy:
            continue
        brief = {
            "url": group["owner"],
            "query_group": group["query_group"],
            "page_type": "existing sitemap URL",
            "passes_seven": False,
            "weak": ["what_current_results_lack", "why_beat"],
            "expected_answer": copy["expected_answer"],
            "addition": copy["addition"],
            "status": "withheld",
            "why_withheld": "Live result notes are UNKNOWN, and the site has not shown it can beat current results. Question 7 is weak, so this is not an approval to publish.",
        }
        withheld.append(brief)
    # One note per URL even if two groups shared an owner.
    seen = set()
    unique = []
    for brief in withheld:
        if brief["url"] in seen:
            continue
        seen.add(brief["url"])
        unique.append(brief)
    return approved, unique


def build_experiments(technical):
    overlap = next(item for item in technical if item["impact"] == 1)
    return [
        {
            "name": "Observe index status against the impression table. Change nothing.",
            "kind": "observational",
            "current_constraint": "Some URLs with finalized impressions are not indexed in the 6 Oct inspection.",
            "hypothesis": "The inspection and the impression window describe different moments. This receipt cannot say which change caused the October impression rise.",
            "why": "Last crawl times are before release 20261006T180152Z.",
            "eligible_urls": overlap["urls"],
            "control": "None. There is no comparable held-out group.",
            "change": "None. Template, body, title, internal links, and promotion stay untouched.",
            "primary_metric": "URL Inspection coverage on a later read.",
            "population": "The eligible URLs, one inspection each, after a crawl dated later than 2026-10-06.",
            "smallest_effect": "A coverage change on one of the eligible URLs is worth recording. It is not worth a new indexable URL by itself.",
            "before": "Inspection checked at 2026-10-06T18:16:49Z. Groups were not a controlled experiment.",
            "volume": "Three finalized clicks in the request window. Too small for a causal SEO test.",
            "guardrails": "Do not add sitemap URLs. Do not edit the growth timer.",
            "guardrail_purpose": "Keep this observation from becoming a publication or a timer change.",
            "early_signal": "None expected from this plan, because it makes no change.",
            "start_date": "Not started.",
            "review_dates": "The next day the operator reads a fresh URL inspection.",
            "other_changes": "Release 20261006T180152Z already happened before this plan and is not a clean control.",
            "decision_rule": "If the next inspection still says not indexed, keep the registry action improve and add no URL. If it says indexed, update the registry. Do not treat the before/after impression move as proof of cause.",
            "reversal_plan": "No change to reverse.",
            "result": "Not run.",
            "conclusion": "Not available.",
        },
        {
            "name": "Do not run a title or click-through test.",
            "kind": "not started",
            "current_constraint": "Finalized clicks in the request window are 3.",
            "hypothesis": "A title test cannot separate noise from an effect at this volume.",
            "why": "po.md section 17: do not run a test that cannot answer the question.",
            "eligible_urls": [],
            "control": "None.",
            "change": "None.",
            "primary_metric": "Not chosen, because the test will not start.",
            "population": "The finalized request window in growth-latest.json.",
            "smallest_effect": "Not set. There is no test.",
            "before": "Not applicable.",
            "volume": "3 finalized clicks. A before/after move would not prove cause.",
            "guardrails": "Do not change title, body, template, internal links, and promotion together.",
            "guardrail_purpose": "Avoid an unreadable combination of changes.",
            "early_signal": "None.",
            "start_date": "Not started.",
            "review_dates": "Reconsider only after seven consecutive finalized days meet the existing 1,000/50 goal.",
            "other_changes": "The October impression rise is already mixed with indexation and releases.",
            "decision_rule": "Do not start. Stop remains in force while finalized clicks stay this small.",
            "reversal_plan": "No change to reverse.",
            "result": "Not run.",
            "conclusion": "The test is rejected for lack of volume.",
        },
    ]


def build_recommendations(gsc, fit, aids):
    goal = (
        f"The daily goal is {gsc['target_impressions']} impressions and {gsc['target_clicks']} clicks. "
        f"goal_evidenced is {str(gsc['goal_evidenced']).lower()}. The goal is not met."
    )
    return {
        "2": [recommendation(
            "Keep the primary conversion as a useful action: choose the right guide or municipality, open the responsible official source, download a pertinent form, or reuse the aid dataset. Read another article is not the final conversion.",
            "The actions are the ones already defined for this site in the 16 Sep business snapshot and repeated in the product record. No later receipt replaces them with a sale.",
            "project data",
            "Judge pages by whether that action can follow. Do not add a purchase step.",
            "The private counter's official-link, download, and assistant events, read only as aggregate counts. Not unique users and not filed applications. Revenue stays UNKNOWN until a price exists.",
            "operador del sitio",
            "Stop if a real sale price is accredited. Until then do not report euros.",
        )],
        "3": [recommendation(
            f"Treat SEO as a serious but limited pilot on existing URLs. The weighted score is {fit['score']} and the band is {fit['band']}. {goal} Revenue is unmeasured. This score is a decision aid, not a Google rule.",
            "Commercial value, chance of ranking, and path to authority are scored 3, so the weighted fit is 3.00. The 6 Oct receipt is unchanged: disclosed queries exist, qualified clicks are few, the domain was registered on 2026-09-03, external mentions in that day's search were 0, and there is no price.",
            "own inference",
            "Limit the pilot to the registry URLs. Do not open a large page program.",
            "The cheapest falsifying test: the installed daily GSC read. The verdict is wrong if seven consecutive finalized Pacific Time days on sc-domain:rutatramite.com, type web, each show at least 1,000 impressions and 50 clicks. One finalized day at that level reopens the score before any new indexable URL. If the next 28 finalized days stay under 300 impressions and under 5 clicks, keep this band.",
            "operador del sitio",
            "Stop scaling, which has not started, while the seven-day goal is not evidenced.",
        )],
        "7": [recommendation(
            "Rank query groups with 1–5 scores. Keep the euro contribution UNKNOWN. Do not multiply by rank probability, because no attainable click share was estimated.",
            "Expected monthly contribution is UNKNOWN when demand, click share, conversion rate, or contribution per conversion is missing. The 6 Oct receipt has impressions and almost no clicks, and it has no revenue.",
            "measurement",
            "Use the priority table to order improvements of existing URLs. Do not turn the score into a euro forecast.",
            "Recompute the table from the next growth receipt. Compare disclosed impressions and clicks only inside one table.",
            "operador del sitio",
            "Stop using a group score if its disclosed impressions disappear from the next final table or if a query-page export shows the owner URL is wrong.",
        )],
        "8": [recommendation(
            "Keep the current hubs. Add no new branch in this release.",
            f"The sitemap has {gsc['page_row_count']} URLs with finalized page rows and the registry covers every sitemap URL once. New URLs are not required to represent the disclosed tasks.",
            "project data",
            "Use the existing parent and child paths in the registry.",
            "The next sitemap diff. A new indexable URL is a failed check for this plan.",
            "operador del sitio",
            "Stop the structure recommendation if a query-page export shows two current URLs ranking for one task.",
        )],
        "12": [recommendation(
            f"Use the existing aid extract as the proof asset. Counted records: {aids['count']}. Do not build a second asset in this goal, and do not send outreach from this plan.",
            "Records are counted from data/rental-aid-reviews.json and the inline objects in src/lib/ayudas.ts. The 6 Oct search recorded 0 external brand mentions. A past outreach kit is not a measured backlink.",
            "project data",
            "Keep the dataset's method, scope, and limits next to the download. Leave distribution to the operator's already approved kit, which this plan does not send.",
            "External mentions and citations on a later dated search. A sent email is not a backlink.",
            "operador del sitio",
            "Stop promoting the extract if a dated recount shows the records are no longer the published set, or if an official source withdraws a cited call and the row is not updated.",
        )],
        "16": [
            recommendation(
                "In the next 30 days, read the next final GSC receipt and re-inspect the impression URLs after a crawl later than the 6 Oct release. Publish no new indexable URL.",
                "Index status is PARTIAL and the goal is not met. The growth timer already runs. This plan does not edit it.",
                "measurement",
                "Update the registry index field from the new inspection. Leave template, titles, and links unchanged in that window so the observation stays readable.",
                "URL Inspection coverage and the daily final impression and click counts.",
                "operador del sitio",
                "Stop the 30-day observation when the new inspection is filed, or after 30 days, whichever comes first.",
            ),
            recommendation(
                "In days 31 to 60, if the impression URLs are indexed, improve one existing page. Start with the DNI page. Change the dated official-fee route only. Do not also change the template, title, internal links, and promotion.",
                "The DNI page has the largest finalized page-row impression count in the receipt. Fee amounts are not copied into this plan because they must come from the official page on the day of the edit.",
                "measurement",
                "One visible correction on /dni, after the index observation, and only if the operator publishes through the existing release procedure. This plan does not publish it.",
                "The next final page row for /dni, plus a manual check that the fee sentence matches the official page.",
                "operador del sitio",
                "Stop the edit if the inspection still says the URL is not indexed. The constraint is then indexation, not a rewrite.",
            ),
            recommendation(
                "In days 61 to 90, recalculate this fit score from the newest growth receipt. Scale a page type only if seven consecutive finalized days meet 1,000 impressions and 50 clicks.",
                "The current score is a decision aid. The authorized goal overrides it and is not met.",
                "project data",
                "Replace the factor scores with the new receipt. Keep rejected URLs rejected if the goal is still open.",
                "The new weighted score, the seven-day evaluation, and the registry action counts.",
                "operador del sitio",
                "Stop the quarter when the new score and the seven-day evaluation are filed. Do not carry the work into a template rollout.",
            ),
        ],
        "17": [recommendation(
            "Postpone, merge, or reject the work listed in section 17. Improve or keep existing URLs before any new indexable page.",
            "No candidate passed the seven pre-approval answers. Query variants already share an owning URL.",
            "own inference",
            "Leave the sitemap unchanged.",
            "A diff of public/sitemap.xml against the registry canonical URLs.",
            "operador del sitio",
            "Reopen a rejected URL only after question 7 has dated evidence and the seven-day goal is met.",
        )],
    }


def build_record(root=ROOT):
    growth, growth_source = load_json(root, GROWTH_PATH)
    inspection, inspection_source = load_json(root, INSPECTION_PATH)
    summary, summary_source = load_json(root, SUMMARY_PATH)
    prompts, prompts_source = load_json(root, PROMPTS_PATH)
    if growth.get("property") != "sc-domain:rutatramite.com":
        raise ValueError("growth receipt property is not sc-domain:rutatramite.com")
    if growth["request"].get("dataState") != "final" or growth["request"].get("type") != "web":
        raise ValueError("growth receipt is not final web data")
    paths = sitemap_paths(root)
    sitemap_comparison = load_sitemap_comparison(root, paths, summary["sitemap_live"]["urls"])
    gsc = build_gsc(growth, growth_source)
    stored_queries, groups, unassigned = build_groups(gsc["queries"], paths)
    inspection_by_path = {row["path"]: row for row in inspection["urls"]}
    page_impressions = {page["path"]: page["impressions"] for page in gsc["pages"]}
    registry = build_registry(
        paths,
        inspection_by_path,
        page_impressions,
        groups,
        scenario_slugs(root),
        load_guide_parents(root),
        sitemap_comparison,
    )
    if len(registry) != len(paths):
        raise ValueError("registry does not cover every sitemap URL once")
    aids = count_aid_records(root)
    foundation = build_foundation(aids, gsc)
    fit_math = weighted_fit(FIT_SCORES)
    band = fit_band(fit_math["score"])
    fit = {
        "scores": dict(FIT_SCORES),
        "weights": {"search_demand": 20, "commercial_value": 20, "ability_to_produce_better_result": 20, "chance_of_ranking": 15, "path_to_authority": 10, "maintenance_burden": 10, "asset_value_over_time": 5},
        "score": fit_math["score"],
        "hundredths": fit_math["hundredths"],
        "band": band,
        "verdict": (
            f"Score {fit_math['score']}. Band: {band}. "
            "Run a serious but limited pilot on pages that already exist. "
            "The authorized goal of 1,000 impressions and 50 clicks a day is not met. "
            "Revenue is unmeasured. "
            "A higher score cannot override the tiny qualified demand in this receipt or the missing route to measured revenue. "
            "This score is a decision aid, not a Google rule."
        ),
        "weakest_assumptions": [
            "Market search volume is UNKNOWN. Disclosed impressions are not demand.",
            "Commercial value 3 is an inference. It is not a euro forecast.",
            "Chance of ranking 3 is an inference from a domain registered on 2026-09-03, partial indexation, and positions that are often past the first page.",
            "Path to authority 3 is an inference. The 6 Oct search recorded 0 external brand mentions.",
            "Maintenance burden 3 means the pages can be kept current only if the operator continues to check official sources. The euro cost is UNKNOWN.",
        ],
        "cheapest_falsifying_test": (
            "Keep the installed daily GSC read. The verdict is wrong if seven consecutive finalized Pacific Time days "
            "on sc-domain:rutatramite.com, type web, each show at least 1,000 impressions and 50 clicks. "
            "One finalized day at that level reopens the score before any new indexable URL. "
            "If the next 28 finalized days stay under 300 impressions and under 5 clicks, keep this band. "
            "Do not treat a before/after move as proof of cause."
        ),
    }
    if fit_math["score"] != "3.00" or band != "serious but limited pilot":
        raise ValueError("fit scores no longer match the written verdict; update the verdict before writing")
    technical = build_technical(registry, gsc, summary)
    approved, withheld = build_briefs(groups)
    experiments = build_experiments(technical)
    recommendations = build_recommendations(gsc, fit, aids)
    record = {
        "program": "seo_operating_plan",
        "publishes": False,
        "headings": list(HEADINGS),
        "fit": fit,
        "foundation": foundation,
        "gsc": gsc,
        "aids": aids,
        "queries": stored_queries,
        "groups": groups,
        "unassigned_query_count": len(unassigned),
        "unassigned_impressions": sum(row["impressions"] for row in unassigned),
        "registry": registry,
        "registry_action_counts": {
            action: sum(1 for row in registry if row["action"] == action)
            for action in ("keep", "improve", "merge", "redirect", "remove", "exclude")
        },
        "approved_briefs": approved,
        "withheld_briefs": withheld,
        "technical": technical,
        "experiments": experiments,
        "recommendations": recommendations,
        "contribution": expected_monthly_contribution(None, None, None, "UNKNOWN"),
        "rank_probability_applied": False,
        "revenue": None,
        "candidate_urls": [],
        "sitemap_comparison": sitemap_comparison,
        "sources": {
            "growth": growth_source,
            "inspection": inspection_source,
            "summary": summary_source,
            "prompts": prompts_source,
            "metrics": str(METRICS_PATH).replace("\\", "/"),
            "business_md": str(BUSINESS_PATH).replace("\\", "/"),
            "sitemap": str(SITEMAP_PATH).replace("\\", "/"),
            "summary_checked_at": summary["checked_at"],
            "domain_registered": summary["rdap_domain"]["registered"],
            "domain_age_days_at_audit": summary["rdap_domain"]["domain_age_days_at_audit"],
            "external_mentions": summary["websearch_external_mentions"]["brand_mentions_outside_domain"],
            "public_crawl": summary["post_deploy"]["public_crawl_after"],
            "search_appearance": summary["oauth_restored_same_night"]["ai_resurvey_after_recrawl"],
            "prompt_execution": prompts["execution_status"],
            "prompt_questions": prompts["prompts"],
            "prompt_rules": {
                "language": prompts["language"],
                "intended_region": prompts["intended_region"],
                "brand_or_site_in_prompt": prompts["brand_or_site_in_prompt"],
                "protocol": prompts["protocol"],
            },
        },
        "postpone": [
            "New indexable URLs and keyword-variant pages.",
            "International hreflang and other-country versions.",
            "A Google Business Profile. No accredited premises.",
            "A sale price or any euro forecast.",
            "GA4, until an accredited property exists. This plan does not buy a tool.",
            "A fresh multi-model AI sample. The Copilot protocol needs a human check, and this goal does not run one.",
            "Outreach sends. The 6 Oct kit stays with the operator. This plan does not send it.",
            "Scaling the municipal template.",
            "A project that treats llms.txt or schema as a proven citation lift.",
            "A formal SEO experiment at the current click volume.",
        ],
        "reject": [
            "A new URL that clones the official DNI appointment site.",
            "A new URL only for combined DNI and passport fees while /dni and /pasaporte already exist.",
            "Using the 16 Sep figure of 48 impressions and 0 clicks as the current result.",
            "Adding disclosed query impressions to page impressions or to the daily property total.",
            "Treating a sample citation rate as market share.",
        ],
        "merge": [
            "Query variants inside one group already share one owning URL. Rewordings are not extra pages.",
            "No sitemap URL receives the action merge. Location, situation, document, and form tasks stay separate, and each split is the path itself.",
            "A merge of two current URLs waits until a query-page export shows they serve one task.",
        ],
    }
    return record


def _rec_lines(items):
    lines = []
    for item in items:
        lines.extend([
            "",
            f"Recommendation: {item['statement']}",
            f"Evidence: {item['evidence']}",
            f"Evidence kind: {item['evidence_kind']}",
            f"Change: {item['change']}",
            f"Measure: {item['measure']}",
            f"Owner: {item['owner']}",
            f"Stop when: {item['stop_when']}",
        ])
    return lines


def render_plan(record):
    gsc = record["gsc"]
    fit = record["fit"]
    lines = [
        "# RutaTrámite SEO operating plan",
        "",
        "Checked against the 2026-10-06 measurement receipt. This is a decision record. It does not publish pages, and it does not open with article ideas.",
        "",
    ]
    lines.append(f"## {HEADINGS[0]}")
    lines.append("")
    lines.append("Ratings are ESTABLISHED, PARTIAL, or UNKNOWN. A gap that was not inspected is UNKNOWN and has an owner. Unknown is not zero demand, zero indexation, or zero citations.")
    for item in record["foundation"]:
        lines.append("")
        lines.append(f"- {item['item']}: {item['rating']}. Owner: {item['owner']}. {item['evidence']} Evidence kind: {item['evidence_kind']}.")

    lines.extend(["", f"## {HEADINGS[1]}", ""])
    lines.append("RutaTrámite is an independent Spanish guide at https://rutatramite.com. It explains procedures, points to the responsible official source, and publishes a selected aid extract. It is not a gestoría and it has no accredited premises.")
    lines.append("")
    lines.append("Primary audience: a person preparing a trámite in Spain, and a person who needs a source they can cite. Region: Spain. Language: es.")
    lines.append("")
    lines.append("Primary conversion: choose the right guide or municipality, open the responsible official source, download a pertinent form, or reuse the aid dataset. Read another article is not the final conversion. Secondary conversion: none accredited. Value of the primary conversion: revenue is unmeasured. There is no sale price.")
    lines.append("")
    hist = gsc["historical_business_md"]
    lines.append(
        f"The {hist['reviewed']} snapshot in {hist['path']} stated {hist['impressions']} finalized impressions and {hist['clicks']} clicks through {hist['through']}. "
        "That snapshot is historical and is not the current result."
    )
    lines.append("")
    lines.append(
        f"Current property: `{gsc['property']}`. Dates are {gsc['timezone_label']} ({gsc['timezone']}). "
        f"Receipt `{gsc['source']}` checked at {gsc['checked_at']}. Request dataState `{gsc['request']['dataState']}`, type `{gsc['request']['type']}`, "
        f"from {gsc['request']['startDate']} to {gsc['request']['endDate']}. Latest final date: {gsc['latest_final_date']}."
    )
    lines.append("")
    lines.append(
        f"Final daily rows sum to {gsc['final_impressions_sum']} impressions and {gsc['final_clicks_sum']} clicks. "
        f"That sum is the sum of the returned daily rows, not a market total. "
        f"Click dates in those rows: " + ", ".join(f"{row['date']} ({row['clicks']} click, {row['impressions']} impressions)" for row in gsc["click_days"]) + ". "
        f"The seven-day evaluation meets the goal on {gsc['days_meeting_target']} days. goal_evidenced is {str(gsc['goal_evidenced']).lower()}. "
        f"The authorized goal of {gsc['target_impressions']} impressions and {gsc['target_clicks']} clicks a day is not met."
    )
    lines.append("")
    lines.append("Final daily rows, kept separate from provisional rows:")
    lines.append("")
    lines.append("| Date | Impressions | Clicks | Position |")
    lines.append("| --- | ---: | ---: | ---: |")
    for row in gsc["final_daily"]:
        lines.append(f"| {row['date']} | {row['impressions']} | {row['clicks']} | {row['position']:.2f} |")
    lines.append("")
    lines.append(
        f"Provisional `recent_all_states` daily rows use a different data state from the final table. "
        f"They are not added to the final totals. Provisional page rows: {gsc['provisional_page_row_count']}. "
        f"Provisional query rows: {gsc['provisional_query_row_count']}."
    )
    lines.append("")
    lines.append("| Provisional date | Impressions | Clicks | Position |")
    lines.append("| --- | ---: | ---: | ---: |")
    for row in gsc["provisional_daily"]:
        lines.append(f"| {row['date']} | {row['impressions']} | {row['clicks']} | {row['position']:.2f} |")
    lines.append("")
    lines.append(
        f"Disclosed final query rows: {gsc['query_row_count']}, summing to {gsc['query_impressions_sum_disclosed']} impressions and {gsc['query_clicks_sum_disclosed']} clicks. "
        f"Disclosed final page rows: {gsc['page_row_count']}, summing to {gsc['page_impressions_sum']} impressions and {gsc['page_clicks_sum']} clicks. "
        "Do not add the disclosed query-row impression sum to the daily property total or to the page-row total. "
        "The query table shows 0 clicks while the daily and page tables show the clicks above. The queries that produced the clicks are UNKNOWN, because anonymized or omitted queries are not assigned."
    )
    lines.extend(_rec_lines(record["recommendations"]["2"]))

    lines.extend(["", f"## {HEADINGS[2]}", ""])
    lines.append("Weights: Search demand 20%, Commercial value 20%, Ability to produce a better result 20%, Chance of ranking 15%, Path to earning authority 10%, Maintenance burden 10%, Value of the asset over time 5%. The weights sum to 100%.")
    lines.append("")
    lines.append("| Factor | Score (1–5, 5 is favorable) | Weight |")
    lines.append("| --- | ---: | ---: |")
    for key, label in FIT_FACTOR_LABELS.items():
        lines.append(f"| {label} | {fit['scores'][key]} | {fit['weights'][key]}% |")
    lines.append("")
    lines.append(f"Weighted score: {fit['score']}. Verdict: {fit['verdict']}")
    lines.append("")
    lines.append("Weakest assumptions:")
    for assumption in fit["weakest_assumptions"]:
        lines.append(f"- {assumption}")
    lines.append("")
    lines.append(f"The cheapest falsifying test: {fit['cheapest_falsifying_test']}")
    lines.append("")
    lines.append("Maintenance burden is scored so that 5 means the pages can stay current at an acceptable cost. The score of 3 is not a claim that the burden is small, and it is not a euro cost.")
    lines.extend(_rec_lines(record["recommendations"]["3"]))

    lines.extend(["", f"## {HEADINGS[3]}", ""])
    lines.append("Assumptions and missing evidence, each left unknown rather than filled with zero:")
    lines.append("- Market keyword volume: UNKNOWN. No volume tool was queried.")
    lines.append("- Live search-result notes for every query group: UNKNOWN. AI-generated questions, synonyms, and competitor examples are not measured demand.")
    lines.append("- Which URL received each disclosed query: UNKNOWN. The receipt has no query-page dimension.")
    lines.append("- Revenue, contribution per conversion, and conversion rate: UNKNOWN. Revenue is unmeasured.")
    lines.append("- GA4: no accredited property. No GA4 result is reported.")
    lines.append("- Private-counter totals for real visits: UNKNOWN in this run. The counter is not unique users and not filed applications.")
    comparison = record["sitemap_comparison"]
    lines.append(
        f"- Sitemap count: the 19:30 summary recorded {comparison['summary_count']} URLs. "
        f"public/sitemap.xml now has {comparison['file_count']}. "
        f"The captured live response ({comparison['fetched_date_header']}, Last-Modified {comparison['last_modified']}, HTTP {comparison['http_status']}) has {comparison['live_count']} URLs. "
        f"It matches the file: {str(comparison['live_matches_file']).lower()}. "
        "The URL-level difference between the summary count and the current file is UNKNOWN. This plan does not edit the sitemap."
    )
    lines.append("- Index status outside the 20 inspected URLs: UNKNOWN.")
    lines.append("- Per-URL inbound internal links: UNKNOWN.")
    lines.append("- A fresh AI citation sample beyond the stored prompts: not run. The stored rates are sample rates, not market share.")
    lines.append("- Branded demand hidden by anonymized queries: UNKNOWN. Disclosed rows contain no rutatramite query. That does not prove branded demand is zero.")
    lines.append(f"- Domain registration in the 6 Oct audit summary: {record['sources']['domain_registered']}. Age at that audit: {record['sources']['domain_age_days_at_audit']} days. External brand mentions recorded by that search: {record['sources']['external_mentions']}.")

    lines.extend(["", f"## {HEADINGS[4]}", ""])
    lines.append("Experiences a problem → Understands the problem → Considers possible solutions → Chooses a type of solution → Compares the official channel and the documents → Acts by opening the official source, downloading the pertinent form, or reusing the aid dataset → Implements the procedure at the responsible body → Renews when the procedure expires.")
    lines.append("")
    lines.append("For the measured groups, the inferred task, decision, page, and next action are:")
    lines.append("")
    lines.append("| Group | Intent | Owning URL | Decision the search supports | Next action |")
    lines.append("| --- | --- | --- | --- | --- |")
    for group in record["groups"]:
        lines.append(
            f"| {group['query_group']} | {group['intent']} | {group['owner']} | "
            "Whether this existing page is the right guide for the task | "
            f"{conversion_for('guide') if group['owner'] != '/descargas' else conversion_for('download-index')} |"
        )
    lines.append("")
    lines.append("Groups that share the same task, page type, and next action use one URL. A different place, document, or form stays on its own URL. Raw queries are stored in the machine record before those assignments.")

    lines.extend(["", f"## {HEADINGS[5]}", ""])
    lines.append(
        f"Raw final queries stored: {gsc['query_row_count']}. Source: `{gsc['source']}`, property `{gsc['property']}`, dataState final. "
        f"Assigned groups: {len(record['groups'])}. Queries left unassigned: {record['unassigned_query_count']} "
        f"({record['unassigned_impressions']} disclosed impressions). Unassigned queries are not one task and do not become a page. "
        "Their volume is not zero, and it is not a reason to publish."
    )
    lines.append("")
    lines.append("| Group | Intent | Queries | Disclosed impressions | Disclosed clicks | Weighted position | Owner |")
    lines.append("| --- | --- | ---: | ---: | ---: | ---: | --- |")
    for group in record["groups"]:
        position = "UNKNOWN" if group["position_weighted"] is None else f"{group['position_weighted']:.2f}"
        lines.append(
            f"| {group['query_group']} | {group['intent']} | {group['query_count']} | {group['impressions']} | {group['clicks']} | {position} | {group['owner']} |"
        )
    lines.append("")
    lines.append("Search-result notes for every group: UNKNOWN. The intent column is an inference from the words, checked only against the query text, not against a live result page.")
    lines.append("")
    lines.append("Combined DNI and passport fee queries, including vale, paga, and sale, are grouped on /dni. Passport-only fee queries stay on /pasaporte. A third fee URL is rejected. DNI appointment queries stay on /dni/cita-previa. Passport appointment queries stay on /pasaporte/cita-previa. Queries that ask for both documents in one appointment stay on /dni/misma-cita-pasaporte when that URL is in the sitemap. citaprevianie stays on /extranjeria.")

    lines.extend(["", f"## {HEADINGS[6]}", ""])
    lines.append("Money contribution is UNKNOWN for every group. Rank probability is not applied. The score column is 1–5 arithmetic, not euros. Business value is 2 for every group because no price is accredited. Demand and chance use disclosed rows only.")
    lines.append("")
    lines.append("| Group | Business value | Closeness | New utility | Chance | Demand | Reuse | Distribution | Effort | Priority | Reason |")
    lines.append("| --- | ---: | ---: | ---: | ---: | ---: | ---: | ---: | ---: | ---: | --- |")
    for group in record["groups"]:
        scores = group["scores"]
        reason = "Existing URL. Disclosed query rows only. Euros UNKNOWN."
        lines.append(
            f"| {group['query_group']} | {scores['business_value']} | {scores['closeness_to_conversion']} | {scores['new_information']} | "
            f"{scores['chance_of_ranking']} | {scores['demand']} | {scores['reuse']} | {scores['distribution']} | {group['effort']} | "
            f"{group['priority']['score']} | {reason} |"
        )
    lines.extend(_rec_lines(record["recommendations"]["7"]))

    lines.extend(["", f"## {HEADINGS[7]}", ""])
    lines.append("Smallest useful structure: the sitemap that already exists. No new indexable branch.")
    lines.append("")
    lines.append("```text")
    lines.append("Home /")
    lines.append("├── Procedure hubs already in the sitemap (DNI, pasaporte, empadronarse, becas, extranjería, alquiler, and the other pack hubs)")
    lines.append("│   ├── One guide, scenario, or model per distinct task")
    lines.append("│   └── Municipal padrón directories, split by place")
    lines.append("├── /descargas  (official files)")
    lines.append("├── /ayudas and /recursos  (selected aid extract and method)")
    lines.append("└── /metodologia, /fuentes, /aviso-legal, /privacidad, /contacto")
    lines.append("```")
    lines.append("")
    lines.append("Candidate new URLs in this release: none. The machine record's candidate_urls list is empty.")
    lines.extend(_rec_lines(record["recommendations"]["8"]))

    lines.extend(["", f"## {HEADINGS[8]}", ""])
    lines.append(f"Every current indexable sitemap URL appears once. Count: {len(record['registry'])}. Actions: {json.dumps(record['registry_action_counts'], ensure_ascii=False)}.")
    lines.append("")
    lines.append("Child paths are listed in full. Index status UNKNOWN stays UNKNOWN.")
    lines.append("")
    for row in record["registry"]:
        parents = ", ".join(row["parent_pages"]) if row["parent_pages"] else "none"
        children = ", ".join(row["child_pages"]) if row["child_pages"] else "none"
        lines.append(
            f"- {row['canonical_url']} | page status: {row['page_status']} | index status: {row['index_status']} | "
            f"task: {row['primary_task']} | query group: {row['query_group']} | page type: {row['page_type']} | "
            f"parents: {parents} | children: {children} | conversion: {row['primary_conversion']} | "
            f"utility: {row['new_information_or_utility']} | internal links: {row['internal_link_sources']} | "
            f"owner: {row['owner']} | last verification: {row['last_verification_date']} | "
            f"update: {row['update_schedule']} | action: {row['action']}"
        )

    lines.extend(["", f"## {HEADINGS[9]}", ""])
    lines.append(f"Approved briefs: {len(record['approved_briefs'])}. No page passed all seven pre-approval answers. what current results lack is UNKNOWN, and why the page can beat current results is unproven.")
    lines.append("")
    lines.append("The notes below are withheld. Each names the expected answer and the specific addition. None of them is an approval to publish, and none of them is new wording alone.")
    for brief in record["withheld_briefs"]:
        lines.append("")
        lines.append(f"Withheld note for {brief['url']} (group {brief['query_group']}). Status: {brief['status']}. passes_seven: {str(brief['passes_seven']).lower()}. Weak answers: {', '.join(brief['weak'])}.")
        lines.append(f"Expected answer: {brief['expected_answer']}")
        lines.append(f"Addition: {brief['addition']}")
        lines.append(f"Why withheld: {brief['why_withheld']}")

    lines.extend(["", f"## {HEADINGS[10]}", ""])
    lines.append(
        "Failures are ordered by impact. Indexation comes before laboratory performance. "
        "The 6 Oct public-crawl sentence in the summary is not a failure and is not a description of every URL now in the file: "
        + record["sources"]["public_crawl"]
    )
    for problem in record["technical"]:
        urls = ", ".join(problem["urls"]) if problem["urls"] else "count only; the URL list is the unknown remainder"
        lines.append("")
        lines.append(f"Impact {problem['impact']}. {problem['title']}. Affected URL count: {problem['url_count']}. URLs: {urls}.")
        lines.append(problem["detail"])

    lines.extend(["", f"## {HEADINGS[11]}", ""])
    lines.append("Proof-asset brief. The asset already exists. This goal does not build a replacement and does not publish one.")
    lines.append("")
    lines.append(f"Asset: selected aid extract. Counted records: {record['aids']['count']} ({record['aids']['rental_review_count']} rental-review rows + {record['aids']['inline_count']} inline records). Sources: {', '.join(record['aids']['sources'])}.")
    lines.append("Method: one row per selected call, with territory, phase, review date, and the official source URL. Dates keep a clock time only when the source states one. The TypeScript module spreads the rental-review file and then adds the inline records. Overlapping ids would stop this plan.")
    lines.append("Scope: the records that those two sources contain on the day this plan is built. The public routes are /ayudas, /recursos, /alquiler/ayudas-por-comunidad, /datos/ayudas.json, and /datos/ayudas.csv. It is a selected extract, not a catalog of every aid in Spain.")
    lines.append("Limits: a row is not an open application and not a filed application. The 6 Oct search recorded 0 external brand mentions. The stored AI samples recorded 0 citations of rutatramite.com. Those observations are not a claim that no mention exists outside the searches that were run. Twenty copies of one announcement would still be one source, and this plan does not count any copy as a backlink.")
    lines.append("Distribution: the canonical copy stays on the site. This plan does not send email, does not post the 6 Oct outreach kit, and does not buy a placement. Past manual outreach remains the operator's, and a send is not evidence of a link.")
    lines.append("Owner: operador del sitio. Stop when a cited official source changes and the row is stale, or when a recount no longer matches the published extract.")
    lines.extend(_rec_lines(record["recommendations"]["12"]))

    lines.extend(["", f"## {HEADINGS[12]}", ""])
    prompts = record["sources"]["prompt_questions"]
    rules = record["sources"]["prompt_rules"]
    execution = record["sources"]["prompt_execution"]
    lines.append("Question set, from the stored protocol. These questions are leads for a citation check. They are not measured demand.")
    for prompt in prompts:
        lines.append(f"- {prompt['id']}: {prompt['question']} (page named in the protocol: {prompt['page']})")
    lines.append("")
    lines.append("Observation conditions:")
    lines.append(f"- How the questions were chosen: a fixed list in docs/seo-workflow/measurement/ai-prompts.json, created {record['sources']['prompt_execution'].get('receipt', 'see the prompt file')}. They were not drawn from the GSC query table.")
    lines.append(f"- Branded versus discovery: brand_or_site_in_prompt is {str(rules['brand_or_site_in_prompt']).lower()}. The questions are discovery questions.")
    lines.append("- Model, version, and mode: Microsoft Copilot, authenticated Smart mode, model version UNKNOWN. Google AI Mode, model version UNKNOWN. The 6 Oct resurvey used a search interface with a generative answer; model UNKNOWN.")
    lines.append(f"- Country and language: intended {rules['intended_region']}, {rules['language']}. Copilot's effective region was not independently verified.")
    lines.append("- Account and history: Copilot was authenticated. Account history is UNKNOWN. The 6 Oct resurvey's account is UNKNOWN in this plan.")
    lines.append("- App or API: Copilot in the product UI, with a human check on 14 Sep. The 6 Oct check was a search UI. This was not an API study.")
    lines.append("- Whether search was triggered or forced: the protocol says not to add RutaTrámite to force discovery. Forcing was not recorded as a switch. For the 6 Oct check, search was the interface used. UNKNOWN whether a tool forced a search tool internally.")
    lines.append("- Repeats: one conversation per question on 14 Sep. The protocol says not to rerun and keep the best result. The 6 Oct resurvey used 2 questions.")
    lines.append("- Dates: 2026-09-14 for the ten-question samples. 2026-10-06 for the two-question resurvey and for searchAppearance.")
    lines.append("")
    lines.append("Separate events:")
    lines.append("- An AI crawler requested the page: UNKNOWN. This run has no verified log sample.")
    lines.append("- The page was in the sources the answer drew from: UNKNOWN. The systems did not show that list here.")
    lines.append(f"- The answer cited the page: Google AI Mode on 2026-09-14, {execution['Google AI Mode']}. Microsoft Copilot on 2026-09-14, {execution['Microsoft Copilot']}. The 6 Oct resurvey recorded 0 citations of rutatramite.com and said the answers cited official sites and established media. searchAppearance rows in that note: none.")
    lines.append("- The answer mentioned or recommended the brand: 0 of 10 in the 14 Sep Copilot sample, as recorded in the project state. A citation and a recommendation are different events. The 6 Oct two-question sample did not publish a separate brand-mention count, so that count stays UNKNOWN.")
    lines.append("- Someone visited from the answer: UNKNOWN. No referrer is stored on the private counter, and GA4 is not accredited.")
    lines.append("- That visitor became a customer: UNKNOWN. Revenue is unmeasured, and a useful action is not a sale.")
    lines.append("")
    lines.append("Accuracy is reported only for answers that exist, as correct, incorrect, partial, or absent. This run did not re-score the stored answers, so accuracy is UNKNOWN even though answers existed on 14 Sep and on 6 Oct. A favorable description would not be a correct fee. The sample rate is not market share. If one later sample says brand A appears in 30 of 100 answers and brand B in 50, those are sample mention rates, not shares of the market.")

    lines.extend(["", f"## {HEADINGS[13]}", ""])
    lines.append("Layers, in the order of the measurement contract. AI impressions are not added again on top of the web totals. The private counter is not unique users and not filed applications.")
    lines.append("")
    lines.append("| Layer | What this project can say | Source |")
    lines.append("| --- | --- | --- |")
    lines.append("| Eligibility | PARTIAL. The sitemap crawl had 0 broken destinations. Full index rules are not known for every URL. | 6 Oct crawl and the 20-URL inspection |")
    lines.append("| Discovery | PARTIAL. 20 URLs inspected. The rest are UNKNOWN. | url-inspection-post-oauth.json |")
    lines.append(f"| Visibility | Measured for the final window. Latest final date {gsc['latest_final_date']}. Goal not met. | {gsc['source']} |")
    lines.append("| Acquisition | Finalized clicks are the daily and page tables above. Disclosed queries are non-brand inside the returned rows. Omitted queries are not assigned. | same receipt |")
    lines.append("| Usefulness | UNKNOWN. No accredited real-visit rows are read in this run. | metrics.md |")
    lines.append("| Conversion | The useful actions are defined. Their counts are UNKNOWN in this run. | business.md and metrics.md |")
    lines.append("| Customer quality | UNKNOWN. | No accredited quality sample |")
    lines.append("| Economics | Revenue is unmeasured. Contribution is UNKNOWN, not 0 euros. | No price in the receipts |")
    lines.append("| Accumulated value | The 6 Oct search recorded 0 external brand mentions. Disclosed branded queries are 0 rows, which does not prove branded demand is zero. | summary.json and the query table |")
    lines.append("")
    lines.append("Do not draw one line through GSC clicks, the private counter, and revenue. They are different observations. Query rows do not identify a person.")

    lines.extend(["", f"## {HEADINGS[14]}", ""])
    lines.append("Both cards are observational or explicitly not started. Neither card changes the template, body, title, internal links, and promotion. Neither card edits rutatramite-growth.timer or rutatramite-weekly.timer.")
    for experiment in record["experiments"]:
        lines.append("")
        lines.append(f"Experiment: {experiment['name']}")
        lines.append(f"Kind: {experiment['kind']}")
        lines.append(f"Current constraint: {experiment['current_constraint']}")
        lines.append(f"Hypothesis: {experiment['hypothesis']}")
        lines.append(f"Why the change should work: {experiment['why']}")
        lines.append(f"Eligible URLs: {', '.join(experiment['eligible_urls']) if experiment['eligible_urls'] else 'none'}")
        lines.append(f"Control or comparison group: {experiment['control']}")
        lines.append(f"Change: {experiment['change']}")
        lines.append(f"Primary metric: {experiment['primary_metric']}")
        lines.append(f"Population, unit, and time window: {experiment['population']}")
        lines.append(f"Smallest effect worth acting on: {experiment['smallest_effect']}")
        lines.append(f"Before period: {experiment['before']}")
        lines.append(f"Available volume and expected noise: {experiment['volume']}")
        lines.append(f"Guardrails: {experiment['guardrails']}")
        lines.append(f"Purpose of each guardrail: {experiment['guardrail_purpose']}")
        lines.append(f"Expected early signal: {experiment['early_signal']}")
        lines.append(f"Start date: {experiment['start_date']}")
        lines.append(f"Review dates: {experiment['review_dates']}")
        lines.append(f"Other changes that may affect the result: {experiment['other_changes']}")
        lines.append(f"Decision rule: {experiment['decision_rule']}")
        lines.append(f"Reversal plan: {experiment['reversal_plan']}")
        lines.append(f"Result: {experiment['result']}")
        lines.append(f"Conclusion: {experiment['conclusion']}")

    lines.extend(["", f"## {HEADINGS[15]}", ""])
    lines.append("The work below improves or checks existing pages. It does not scale a template, and this plan does not publish it.")
    lines.extend(_rec_lines(record["recommendations"]["16"]))

    lines.extend(["", f"## {HEADINGS[16]}", ""])
    lines.append("Postpone:")
    for item in record["postpone"]:
        lines.append(f"- {item}")
    lines.append("")
    lines.append("Merge:")
    for item in record["merge"]:
        lines.append(f"- {item}")
    lines.append("")
    lines.append("Reject:")
    for item in record["reject"]:
        lines.append(f"- {item}")
    lines.extend(_rec_lines(record["recommendations"]["17"]))
    lines.append("")
    lines.append("Answer a valuable question with the smallest useful set of pages. Add something worth choosing and citing. Earn attention. Measure the business result. Scale only after the system works.")
    lines.append("")
    return "\n".join(lines)


def validate_rendered(text, record):
    cursor = 0
    for heading in HEADINGS:
        found = text.find(heading, cursor)
        if found < 0:
            raise ValueError(f"missing heading: {heading}")
        cursor = found
    if "The cheapest falsifying test:" not in text:
        raise ValueError("missing cheapest falsifying test")
    if str(record["gsc"]["property"]) not in text:
        raise ValueError("missing property")
    if "is not met" not in text or "Revenue is unmeasured" not in text:
        raise ValueError("missing goal or revenue statement")
    if "That snapshot is historical and is not the current result." not in text:
        raise ValueError("historical snapshot is not labeled")
    for rating in ("ESTABLISHED", "PARTIAL", "UNKNOWN"):
        if rating not in text:
            raise ValueError(f"missing rating {rating}")
    if record["approved_briefs"]:
        raise ValueError("approved briefs must stay empty while question 7 is weak")
    if record["candidate_urls"]:
        raise ValueError("candidate URLs must stay empty in this goal")


def main(argv=None):
    parser = argparse.ArgumentParser(description="Write the SEO operating plan from dated receipts.")
    parser.add_argument("--output-dir", default=str(DEFAULT_OUTPUT))
    parser.add_argument("--root", default=str(ROOT))
    args = parser.parse_args(argv)
    root = Path(args.root)
    output = Path(args.output_dir)
    if not output.is_absolute():
        output = root / output
    record = build_record(root)
    text = render_plan(record)
    validate_rendered(text, record)
    output.mkdir(parents=True, exist_ok=True)
    plan_path = output / "plan.md"
    record_path = output / "record.json"
    plan_path.write_text(text, encoding="utf-8", newline="\n")
    record_path.write_text(json.dumps(record, ensure_ascii=False, indent=2, sort_keys=True) + "\n", encoding="utf-8", newline="\n")
    summary = {
        "score": record["fit"]["score"],
        "band": record["fit"]["band"],
        "verdict": record["fit"]["verdict"],
        "registry_actions": record["registry_action_counts"],
        "headings": record["headings"],
        "goal_evidenced": record["gsc"]["goal_evidenced"],
        "revenue": record["revenue"],
        "plan": str(plan_path),
        "record": str(record_path),
        "sitemap_urls": len(record["registry"]),
        "approved_briefs": len(record["approved_briefs"]),
    }
    print(json.dumps(summary, ensure_ascii=False))
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
