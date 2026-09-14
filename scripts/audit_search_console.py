"""Read-only Search Console evidence. Never logs OAuth credentials."""
import json
from datetime import date, datetime, timedelta, timezone
from pathlib import Path
from urllib.parse import quote
from submit_search import gsc_refresh, http_json

ROOT = Path(__file__).resolve().parents[1]

def main():
    report = {"checked_at": datetime.now(timezone.utc).isoformat(), "sites": {}}
    try:
        auth = {"Authorization": "Bearer " + gsc_refresh()}
        code, body = http_json("https://www.googleapis.com/webmasters/v3/sites", headers=auth)
        if code != 200:
            raise RuntimeError(f"Property discovery HTTP {code}")
        sites = [s for s in json.loads(body).get("siteEntry", []) if "rutatramite.com" in s["siteUrl"]]
        end = date.today() - timedelta(days=3)
        for site in sites:
            origin = site["siteUrl"]
            base = "https://www.googleapis.com/webmasters/v3/sites/" + quote(origin, safe="")
            result = {"permission": site["permissionLevel"], "reports": {}}
            for name, dimensions in [("daily", ["date"]), ("queries", ["query"]), ("pages", ["page"]), ("devices", ["device"])]:
                payload = {"startDate": str(end-timedelta(days=89)), "endDate": str(end), "dimensions": dimensions, "rowLimit": 1000, "dataState": "final"}
                status, data = http_json(base + "/searchAnalytics/query", payload, auth)
                result["reports"][name] = {"status": status, "request": payload, "data": json.loads(data)}
            status, data = http_json(base + "/sitemaps", headers=auth)
            result["sitemaps"] = {"status": status, "data": json.loads(data)}
            inspections = []
            for path in ["/", "/becas", "/becas/mec", "/empadronarse/comunidad-de-madrid/madrid/madrid"]:
                status, data = http_json("https://searchconsole.googleapis.com/v1/urlInspection/index:inspect", {"inspectionUrl": "https://rutatramite.com" + path, "siteUrl": origin, "languageCode": "es-ES"}, auth)
                inspections.append({"path": path, "status": status, "data": json.loads(data)})
            result["inspections"] = inspections
            report["sites"][origin] = result
    except Exception as exc:
        report["error"] = f"{type(exc).__name__}: {str(exc)[:160]}"
    target = ROOT / "docs" / f"search-console-{date.today().isoformat()}.json"
    target.write_text(json.dumps(report, ensure_ascii=False, indent=2), encoding="utf-8")
    print(json.dumps({"report": str(target), "sites": list(report["sites"]), "error": report.get("error")}))

if __name__ == "__main__":
    main()
