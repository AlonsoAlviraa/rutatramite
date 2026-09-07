"""Check for UTF-8 mojibake across every public sitemap page."""
from __future__ import annotations

import argparse
import json
import re
from collections import Counter
from concurrent.futures import ThreadPoolExecutor
from datetime import datetime, timezone
from html.parser import HTMLParser
from pathlib import Path
from urllib.parse import urlsplit
from urllib.request import Request, urlopen
import xml.etree.ElementTree as ET


MARKERS = ("\u00c3", "\u00c2", "\u00e2", "\ufffd")


class Text(HTMLParser):
    def __init__(self) -> None:
        super().__init__()
        self.parts: list[str] = []

    def handle_data(self, data: str) -> None:
        self.parts.append(data)

    @property
    def text(self) -> str:
        return " ".join(self.parts)


def fetch(base: str, path: str) -> dict[str, object]:
    try:
        with urlopen(Request(base + path, headers={"User-Agent": "RutaTramite-Encoding-Audit/1.0"}), timeout=35) as response:
            html = response.read().decode("utf-8", errors="replace")
            parsed = Text()
            parsed.feed(re.sub(r"<script\b[^>]*>[\s\S]*?</script>", "", html))
            counts = {marker: parsed.text.count(marker) for marker in MARKERS}
            return {"path": path, "status": response.status, "bytes": len(html.encode("utf-8")), "markers": counts, "bad": sum(counts.values()) > 0}
    except Exception as error:
        return {"path": path, "status": 0, "bytes": 0, "markers": {}, "bad": True, "error": str(error)}


def main() -> None:
    parser = argparse.ArgumentParser()
    parser.add_argument("--base", default="https://rutatramite.com")
    parser.add_argument("--sitemap", default="public/sitemap.xml")
    parser.add_argument("--output", default="docs/audit-public-encoding.json")
    parser.add_argument("--build-id", default="")
    args = parser.parse_args()
    root = Path(__file__).resolve().parents[1]
    urls = [node.text for node in ET.parse(root / args.sitemap).iter() if node.tag.endswith("}loc") and node.text]
    paths = sorted({urlsplit(url).path or "/" for url in urls})
    with ThreadPoolExecutor(max_workers=8) as pool:
        rows = list(pool.map(lambda path: fetch(args.base.rstrip("/"), path), paths))
    report = {
        "generated": datetime.now(timezone.utc).isoformat(),
        "build": args.build_id or None,
        "base": args.base.rstrip("/"),
        "sitemap_count": len(paths),
        "status_counts": dict(Counter(str(row["status"]) for row in rows)),
        "marker_counts": {marker: sum(int(row.get("markers", {}).get(marker, 0)) for row in rows) for marker in MARKERS},
        "bad_pages": [row for row in rows if row["bad"]],
        "scope": "Rendered text on every sitemap URL; no claim about external documents",
    }
    (root / args.output).write_text(json.dumps(report, ensure_ascii=False, indent=2), encoding="utf-8")
    print(json.dumps({k: v for k, v in report.items() if k != "bad_pages"}, ensure_ascii=False))


if __name__ == "__main__":
    main()
