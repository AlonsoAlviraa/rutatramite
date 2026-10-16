"""Interactive one-time Google Search Console re-consent (loopback OAuth).

The stored refresh token was revoked (invalid_grant on 2026-09-19). This script
walks the user through granting a new one; it never prints or logs credentials.

Usage:
    python -X utf8 scripts/gsc_authorize.py            # opens the browser
    python -X utf8 scripts/gsc_authorize.py --url      # print URL only, no server

Scope is read-only webmasters. The written token.json keeps the exact shape
expected by gsc_refresh() in scripts/submit_search.py.
"""
import argparse
import json
import os
import random
import socket
import time
import urllib.parse
import urllib.request
import webbrowser
from datetime import datetime, timezone
from http.server import BaseHTTPRequestHandler, ThreadingHTTPServer
from pathlib import Path

GSC_TOKEN = Path(os.environ.get("GSC_TOKEN_PATH", str(Path.home() / ".grok" / "secrets" / "gsc" / "token.json")))
GSC_CLIENT = Path(os.environ.get("GSC_CLIENT_PATH", str(Path.home() / ".grok" / "secrets" / "gsc" / "client_secrets.json")))
SCOPES = "https://www.googleapis.com/auth/webmasters.readonly"


def build_auth_url(redirect_uri: str, state: str) -> str:
    secrets = json.loads(GSC_CLIENT.read_text(encoding="utf-8"))
    installed = secrets.get("installed") or secrets.get("web")
    params = {
        "client_id": installed["client_id"],
        "redirect_uri": redirect_uri,
        "response_type": "code",
        "scope": SCOPES,
        "access_type": "offline",
        "prompt": "consent",
        "state": state,
    }
    return installed["auth_uri"] + "?" + urllib.parse.urlencode(params)


def exchange_code(code: str, redirect_uri: str) -> dict:
    secrets = json.loads(GSC_CLIENT.read_text(encoding="utf-8"))
    installed = secrets.get("installed") or secrets.get("web")
    body = urllib.parse.urlencode(
        {
            "code": code,
            "client_id": installed["client_id"],
            "client_secret": installed["client_secret"],
            "redirect_uri": redirect_uri,
            "grant_type": "authorization_code",
        }
    ).encode()
    req = urllib.request.Request(installed["token_uri"], data=body, method="POST")
    req.add_header("Content-Type", "application/x-www-form-urlencoded")
    with urllib.request.urlopen(req, timeout=30) as resp:
        return json.loads(resp.read().decode())


def free_port() -> int:
    with socket.socket(socket.AF_INET, socket.SOCK_STREAM) as s:
        s.bind(("127.0.0.1", 0))
        return s.getsockname()[1]


def main() -> int:
    ap = argparse.ArgumentParser()
    ap.add_argument("--url", action="store_true", help="only print the consent URL; do not run the loopback server")
    ap.add_argument("--timeout", type=int, default=600, help="seconds to wait for the browser callback")
    args = ap.parse_args()

    state = f"rt-{random.randbytes(12).hex()}"
    if args.url:
        redirect_uri = "http://localhost"
        print(build_auth_url(redirect_uri, state))
        print("With --url no server runs: complete the flow only if your tooling can capture the code.")
        return 0

    port = free_port()
    redirect_uri = f"http://127.0.0.1:{port}/"
    url = build_auth_url(redirect_uri, state)
    print("Abre esta URL en tu navegador y autoriza el acceso de solo lectura a Search Console:\n")
    print(url + "\n")

    result: dict = {}

    class Handler(BaseHTTPRequestHandler):
        def do_GET(self):  # noqa: N802
            parsed = urllib.parse.urlparse(self.path)
            qs = urllib.parse.parse_qs(parsed.query)
            if qs.get("state", [""])[0] != state:
                self.send_response(400)
                self.end_headers()
                self.wfile.write(b"state mismatch")
                return
            if "code" in qs:
                result["code"] = qs["code"][0]
                self.send_response(200)
                self.end_headers()
                self.wfile.write("Autorizacion recibida. Puedes cerrar esta pestana.".encode())
            else:
                result["error"] = qs.get("error", ["unknown"])[0]
                self.send_response(400)
                self.end_headers()
                self.wfile.write(b"authorization denied")

        def log_message(self, *a):
            pass

    server = ThreadingHTTPServer(("127.0.0.1", port), Handler)
    webbrowser.open(url)
    deadline = time.time() + args.timeout
    while not result and time.time() < deadline:
        server.handle_request()
    server.server_close()

    if "error" in result:
        print(f"Consentimiento rechazado: {result['error']}")
        return 1
    if "code" not in result:
        print("Tiempo de espera agotado sin callback del navegador.")
        return 1

    fresh = exchange_code(result["code"], redirect_uri)
    if "refresh_token" not in fresh:
        print("Google no devolvio refresh_token (prompt=consent deberia forzarlo). Reintenta en unos minutos.")
        return 1

    token = {
        "access_token": fresh["access_token"],
        "refresh_token": fresh["refresh_token"],
        "scope": fresh.get("scope", SCOPES),
        "token_type": fresh.get("token_type", "Bearer"),
        "expires_in": fresh.get("expires_in", 3600),
        "obtained_at": datetime.now(timezone.utc).isoformat(),
    }
    GSC_TOKEN.parent.mkdir(parents=True, exist_ok=True)
    GSC_TOKEN.write_text(json.dumps(token, indent=2), encoding="utf-8")
    print(f"Token guardado en {GSC_TOKEN}. Prueba con: python -X utf8 scripts/measure_growth.py")
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
