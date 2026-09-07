"""Audit static accessibility prerequisites across every generated HTML page.

This is intentionally narrower than a WCAG audit: it checks structural
requirements that can be proved from server-rendered HTML (unique IDs, one
main landmark, named form controls and buttons, and image alt attributes).
Computed contrast, focus order and screen-reader output still need a browser.
"""
from __future__ import annotations

import argparse
import json
import re
from collections import Counter
from html.parser import HTMLParser
from pathlib import Path


class PageAudit(HTMLParser):
    def __init__(self) -> None:
        super().__init__()
        self.ids: set[str] = set()
        self.labels: set[str] = set()
        self.controls: list[dict[str, str | None]] = []
        self.buttons: list[dict[str, str]] = []
        self.images = 0
        self.main_count = 0
        self._label: dict[str, str] | None = None
        self._button: dict[str, str] | None = None
        self.issues: list[str] = []

    def handle_starttag(self, tag: str, attrs_list: list[tuple[str, str | None]]) -> None:
        attrs = dict(attrs_list)
        element_id = attrs.get("id")
        if element_id:
            if element_id in self.ids:
                self.issues.append(f"duplicate id: {element_id}")
            self.ids.add(element_id)
        if tag == "main":
            self.main_count += 1
        if tag == "label":
            self._label = {"for": attrs.get("for"), "text": ""}
            if attrs.get("for"):
                self.labels.add(attrs["for"] or "")
        if tag in ("input", "select", "textarea") and attrs.get("type") not in (
            "hidden",
            "submit",
            "button",
            "reset",
        ):
            self.controls.append(
                {
                    "id": attrs.get("id"),
                    "name": attrs.get("name"),
                    "aria-label": attrs.get("aria-label"),
                    "aria-labelledby": attrs.get("aria-labelledby"),
                    "label": self._label,
                }
            )
        if tag == "button":
            self._button = {"text": "", "aria-label": attrs.get("aria-label") or "", "aria-labelledby": attrs.get("aria-labelledby") or ""}
            self.buttons.append(self._button)
        if tag == "img":
            self.images += 1
            if "alt" not in attrs:
                self.issues.append("image without alt")

    def handle_data(self, data: str) -> None:
        if self._label is not None:
            self._label["text"] += data
        if self._button is not None:
            self._button["text"] += data

    def handle_endtag(self, tag: str) -> None:
        if tag == "label":
            self._label = None
        if tag == "button":
            self._button = None

    def finish(self) -> list[str]:
        if self.main_count != 1:
            self.issues.append(f"{self.main_count} main landmarks")
        for control in self.controls:
            implicit = control.get("label")
            implicit_text = isinstance(implicit, dict) and bool(implicit.get("text", "").strip())
            named = bool(
                control.get("aria-label")
                or control.get("aria-labelledby")
                or (control.get("id") and control["id"] in self.labels)
                or implicit_text
            )
            if not named:
                self.issues.append(
                    f"control without accessible name: {control.get('id') or control.get('name') or 'unnamed'}"
                )
        for button in self.buttons:
            if not (button["text"].strip() or button["aria-label"] or button["aria-labelledby"]):
                self.issues.append("button without accessible name")
        return self.issues


def route_for(file: Path, build: Path) -> str:
    route = "/" + file.relative_to(build).as_posix()[:-5]
    return "/" if route == "/index" else route


def main() -> None:
    parser = argparse.ArgumentParser()
    parser.add_argument("--build-dir", default=".next")
    parser.add_argument("--output", default="docs/audit-accessibility-build.json")
    args = parser.parse_args()
    root = Path(__file__).resolve().parents[1]
    build = (root / args.build_dir / "server/app").resolve()
    if not build.is_dir():
        raise SystemExit(f"missing generated app: {build}")
    rows = []
    for file in sorted(build.rglob("*.html")):
        html = file.read_text(encoding="utf-8")
        html = re.sub(r"<script\b[^>]*>[\s\S]*?</script>", "", html)
        audit = PageAudit()
        audit.feed(html)
        rows.append(
            {
                "path": route_for(file, build),
                "issues": audit.finish(),
                "controls": len(audit.controls),
                "buttons": len(audit.buttons),
                "images": audit.images,
            }
        )
    report = {
        "build_id": (root / args.build_dir / "BUILD_ID").read_text(encoding="utf-8").strip(),
        "html_pages": len(rows),
        "scope": "Static HTML prerequisites only; not complete WCAG conformance",
        "issue_counts": dict(Counter(issue for row in rows for issue in row["issues"])),
        "pages_with_issues": [row for row in rows if row["issues"]],
    }
    (root / args.output).write_text(json.dumps(report, ensure_ascii=False, indent=2), encoding="utf-8")
    print(json.dumps({k: v for k, v in report.items() if k != "pages_with_issues"}, ensure_ascii=False))


if __name__ == "__main__":
    main()
