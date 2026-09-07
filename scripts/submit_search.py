#!/usr/bin/env python3
"""Submit live RutaTrámite URLs to Google Search Console + IndexNow (Bing/Yandex/etc)."""
from __future__ import annotations

import json
import os
import re
import sys
import time
import urllib.error
import urllib.parse
import urllib.request
from datetime import datetime, timezone
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
PUBLIC = ROOT / "public"
ORIGIN = os.environ.get("SITE_ORIGIN", "https://rutatramite.com").rstrip("/")
HOST = ORIGIN.replace("https://", "").replace("http://", "")
INDEXNOW_KEY = "b7e4c91a0f3d28e65a1c47b90d2e8f36"
GSC_TOKEN = Path.home() / ".grok" / "secrets" / "gsc" / "token.json"
GSC_CLIENT = Path.home() / ".grok" / "secrets" / "gsc" / "client_secrets.json"
GSC_SITE = f"{ORIGIN}/"


def load_sitemap_urls() -> list[str]:
    text = (PUBLIC / "sitemap.xml").read_text(encoding="utf-8")
    if "<sitemapindex" in text:
        raise SystemExit("sitemap.xml is still a sitemapindex; rebuild with scripts/build_sitemaps.py")
    urls: list[str] = []
    seen: set[str] = set()
    for u in re.findall(r"<loc>([^<]+)</loc>", text):
        if u not in seen:
            seen.add(u)
            urls.append(u)
    return urls


def http_json(url: str, payload: dict | None = None, headers: dict | None = None, method: str | None = None) -> tuple[int, str]:
    body = None if payload is None else json.dumps(payload).encode("utf-8")
    req = urllib.request.Request(url, data=body, method=method or ("POST" if body else "GET"))
    req.add_header("User-Agent", "RutaTramiteBot/0.1 indexing")
    if body is not None:
        req.add_header("Content-Type", "application/json")
    for k, v in (headers or {}).items():
        req.add_header(k, v)
    try:
        with urllib.request.urlopen(req, timeout=60) as resp:
            return resp.status, resp.read().decode("utf-8", "replace")
    except urllib.error.HTTPError as e:
        return e.code, e.read().decode("utf-8", "replace")


def ping_indexnow(urls: list[str]) -> None:
    payload = {
        "host": HOST,
        "key": INDEXNOW_KEY,
        "keyLocation": f"{ORIGIN}/{INDEXNOW_KEY}.txt",
        "urlList": urls,
    }
    endpoints = [
        "https://api.indexnow.org/indexnow",
        "https://www.bing.com/indexnow",
        "https://yandex.com/indexnow",
        "https://search.seznam.cz/indexnow",
        "https://searchadvisor.naver.com/indexnow",
    ]
    for ep in endpoints:
        code, body = http_json(ep, payload)
        print(f"IndexNow {ep} -> {code} {body[:240].replace(chr(10), ' ')}")


def ping_sitemap_get() -> None:
    sitemap = f"{ORIGIN}/sitemap.xml"
    gets = [
        f"https://www.google.com/ping?sitemap={urllib.parse.quote(sitemap, safe='')}",
        f"https://www.bing.com/ping?sitemap={urllib.parse.quote(sitemap, safe='')}",
        f"https://webmaster.yandex.com/ping?sitemap={urllib.parse.quote(sitemap, safe='')}",
    ]
    for url in gets:
        try:
            req = urllib.request.Request(url, method="GET")
            req.add_header("User-Agent", "RutaTramiteBot/0.1 indexing")
            with urllib.request.urlopen(req, timeout=30) as resp:
                print(f"GET ping {url.split('?')[0]} -> {resp.status}")
        except urllib.error.HTTPError as e:
            print(f"GET ping {url.split('?')[0]} -> {e.code} {e.read()[:120]!r}")
        except Exception as e:
            print(f"GET ping {url.split('?')[0]} -> {e}")


def gsc_refresh() -> str:
    tok = json.loads(GSC_TOKEN.read_text(encoding="utf-8"))
    secrets = json.loads(GSC_CLIENT.read_text(encoding="utf-8"))
    installed = secrets.get("installed") or secrets.get("web")
    body = urllib.parse.urlencode(
        {
            "client_id": installed["client_id"],
            "client_secret": installed["client_secret"],
            "refresh_token": tok["refresh_token"],
            "grant_type": "refresh_token",
        }
    ).encode()
    req = urllib.request.Request("https://oauth2.googleapis.com/token", data=body, method="POST")
    req.add_header("Content-Type", "application/x-www-form-urlencoded")
    with urllib.request.urlopen(req, timeout=30) as resp:
        fresh = json.loads(resp.read().decode())
    tok["access_token"] = fresh["access_token"]
    tok["obtained_at"] = datetime.now(timezone.utc).isoformat()
    if "expires_in" in fresh:
        tok["expires_in"] = fresh["expires_in"]
    GSC_TOKEN.write_text(json.dumps(tok, indent=2), encoding="utf-8")
    return tok["access_token"]


def gsc_submit(access: str) -> None:
    auth = {"Authorization": f"Bearer {access}"}
    encoded = urllib.parse.quote(GSC_SITE, safe="")
    domain = urllib.parse.quote("sc-domain:rutatramite.com", safe="")
    for site in (GSC_SITE, "sc-domain:rutatramite.com"):
        enc = urllib.parse.quote(site, safe="")
        code, body = http_json(
            f"https://www.googleapis.com/webmasters/v3/sites/{enc}",
            headers=auth,
            method="PUT",
        )
        print(f"GSC add {site} -> {code} {body[:300].replace(chr(10), ' ')}")
    code, body = http_json("https://www.googleapis.com/webmasters/v3/sites", headers=auth)
    print(f"GSC list -> {code} {body[:800].replace(chr(10), ' ')}")
    leftovers = (
        f"{ORIGIN}/sitemap-core.xml",
        f"{ORIGIN}/sitemap-provincias.xml",
        f"{ORIGIN}/sitemap-municipios.xml",
    )
    for site in (GSC_SITE, "sc-domain:rutatramite.com"):
        enc = urllib.parse.quote(site, safe="")
        sitemap = urllib.parse.quote(f"{ORIGIN}/sitemap.xml", safe="")
        code, body = http_json(
            f"https://www.googleapis.com/webmasters/v3/sites/{enc}/sitemaps/{sitemap}",
            headers=auth,
            method="PUT",
        )
        print(f"GSC sitemap {site} -> {code} {body[:300].replace(chr(10), ' ')}")
        for leftover in leftovers:
            sm = urllib.parse.quote(leftover, safe="")
            code, body = http_json(
                f"https://www.googleapis.com/webmasters/v3/sites/{enc}/sitemaps/{sm}",
                headers=auth,
                method="DELETE",
            )
            print(f"GSC unsubmit {leftover.split('/')[-1]} @ {site} -> {code}")


def main() -> int:
    urls = [u for u in load_sitemap_urls() if u.startswith(ORIGIN + "/") or u == ORIGIN]
    print(f"urls={len(urls)} origin={ORIGIN}")
    if not urls:
        print("no sitemap urls", file=sys.stderr)
        return 1
    ping_indexnow(urls)
    ping_sitemap_get()
    try:
        access = gsc_refresh()
        gsc_submit(access)
    except Exception as e:
        print(f"GSC error: {e}")
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
