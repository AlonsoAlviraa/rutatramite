#!/usr/bin/env python3
"""Prepara una copia aislada del árbol fuente del release activo y aplica el parche literal.

No despliega, no autoriza el despliegue y no sustituye a una decisión de la persona.
No lee credenciales, no abre SSH, no llama a VisionSetil ni a vps_ssh.py, no regenera
sitemap ni llms, no hace git add ni git commit, y no modifica rel.sh.

rel.sh no está en este repositorio. El comportamiento descrito (checkout fijo
/workspace/wt-mej, regenerar sitemap/llms, test temporal, git add -A y commit,
build y activate de ese checkout) no es un camino seguro para este parche.
Este helper se aparta de rel.sh y de los pasos de DEPLOY_NOW.md que regeneran
el sitemap o hablan con el VPS. Esa desviación exige una decisión explícita
antes de construir o activar.

Uso, con una copia local ya hecha del árbol fuente (no el paquete server.js,
no /workspace y no wt-mej). El directorio o un archivo RELEASE_ID debe identificar
20261108T072734Z y ningún otro sello:

    python3 patches/preparar-copia-release-20261108.py --self-test
    python3 patches/preparar-copia-release-20261108.py --active /ruta/20261108T072734Z --dry-run
    python3 patches/preparar-copia-release-20261108.py --active /ruta/20261108T072734Z --work /tmp/rt-editorial-20261108

La copia --active se trata como inmutable. --work tiene que ser un directorio nuevo,
fuera de --active y fuera de este checkout. Si la comprobación falla, --work se borra.
"""

from __future__ import annotations

import argparse
import hashlib
import json
import os
import re
import shutil
import subprocess
import sys
import tempfile
from pathlib import Path

EXPECTED_RELEASE = "20261108T072734Z"
STAMP_RE = re.compile(r"20\d{6}T\d{6}Z")
LOC_RE = re.compile(r"<loc>([^<]+)</loc>")
SKIP_DIRS = frozenset({".git", "node_modules", ".next"})
PATCHED = (
    "src/lib/tramites/encuestas-29n.ts",
    "src/lib/tramites/corte-ave-20261031.ts",
    "src/lib/tramites/promesas-29n.ts",
    "src/lib/tramites/mejoras-20261024.ts",
)
FROZEN = (
    "public/sitemap.xml",
    "public/llms.txt",
    "public/llms-full.txt",
    "data/sitemap-lastmod.json",
)
REPO_ROOT = Path(__file__).resolve().parents[1]
PATCH_SCRIPT = Path(__file__).resolve().parent / "aplicar-correccion-editorial-20261108.py"


class PrepError(SystemExit):
    pass


def refuse_shared(path: Path, label: str) -> Path:
    resolved = path.resolve()
    if resolved == Path("/workspace").resolve() or REPO_ROOT in resolved.parents or resolved == REPO_ROOT:
        raise PrepError(f"{label} está dentro del checkout compartido ({resolved}). Usa una copia fuera de él.")
    if "wt-mej" in resolved.parts or resolved.name == "wt-mej":
        raise PrepError(f"{label} apunta a wt-mej ({resolved}). rel.sh usa ese checkout; este helper no.")
    return resolved


def assert_stamp(active: Path) -> None:
    found = set(STAMP_RE.findall("/".join(active.parts)))
    release_id = active / "RELEASE_ID"
    if release_id.is_file():
        found.update(STAMP_RE.findall(release_id.read_text(encoding="utf-8", errors="replace")))
    if found != {EXPECTED_RELEASE}:
        raise PrepError(
            f"Se esperaba identificar solo {EXPECTED_RELEASE} en la ruta o en RELEASE_ID. "
            f"Encontrado: {sorted(found) or 'ningún sello'}."
        )


def assert_source_tree(active: Path) -> None:
    if (active / "server.js").is_file() and not (active / "package.json").is_file():
        raise PrepError(
            "Esta ruta es el paquete activado (server.js), no el árbol fuente. "
            "El parche no se aplica al JavaScript compilado."
        )
    required = ["package.json", *PATCHED, *FROZEN[:3]]
    missing = [rel for rel in required if not (active / rel).is_file()]
    if missing:
        raise PrepError("Faltan archivos del árbol fuente: " + ", ".join(missing))
    for name in ("data", "content", "public"):
        base = active / name
        if not base.is_dir() or not any(p.is_file() for p in base.rglob("*") if not p.is_symlink()):
            raise PrepError(f"El directorio {name}/ no tiene archivos. No parece el release fuente.")


def iter_files(root: Path) -> list[Path]:
    found: list[Path] = []
    for dirpath, dirnames, filenames in os.walk(root, followlinks=False):
        current = Path(dirpath)
        rel_parts = current.relative_to(root).parts
        if any(part in SKIP_DIRS for part in rel_parts):
            dirnames[:] = []
            continue
        dirnames[:] = [name for name in dirnames if name not in SKIP_DIRS]
        for name in filenames:
            path = current / name
            rel = path.relative_to(root)
            if any(part in SKIP_DIRS for part in rel.parts):
                continue
            if path.is_symlink():
                raise PrepError(f"Enlace simbólico no permitido en la copia: {rel.as_posix()}")
            found.append(path)
    return found


def fingerprint(root: Path) -> dict[str, str]:
    digest: dict[str, str] = {}
    for path in iter_files(root):
        rel = path.relative_to(root).as_posix()
        digest[rel] = hashlib.sha256(path.read_bytes()).hexdigest()
    return digest


def locs(path: Path) -> list[str]:
    if not path.is_file():
        return []
    return LOC_RE.findall(path.read_text(encoding="utf-8", errors="replace"))


def copy_tree(active: Path, work: Path) -> None:
    def ignore(_dir: str, names: list[str]) -> set[str]:
        return {name for name in names if name in SKIP_DIRS}

    shutil.copytree(active, work, symlinks=False, ignore=ignore, copy_function=shutil.copy2)


def apply_patch(work: Path) -> None:
    if not PATCH_SCRIPT.is_file():
        raise PrepError(f"No está el parche literal: {PATCH_SCRIPT}")
    completed = subprocess.run(
        [sys.executable, str(PATCH_SCRIPT), "--root", str(work), "--release"],
        check=False,
    )
    if completed.returncode != 0:
        raise PrepError(f"El parche literal falló con código {completed.returncode}. No se deja una copia a medias.")


def verify(active: Path, work: Path, before: dict[str, str]) -> dict[str, object]:
    again = fingerprint(active)
    if again != before:
        raise PrepError("La copia de origen cambió durante la preparación. Se aborta sin tocar el release activo.")
    current = fingerprint(work)
    changed = sorted(rel for rel, digest in current.items() if before.get(rel) != digest)
    added = sorted(set(current) - set(before))
    removed = sorted(set(before) - set(current))
    if added or removed or set(changed) != set(PATCHED):
        raise PrepError(
            "El diff no es solo el parche editorial. "
            f"cambiados={changed} nuevos={added} borrados={removed}"
        )
    frozen_mismatch = []
    for rel in FROZEN:
        active_file = active / rel
        work_file = work / rel
        if active_file.is_file() != work_file.is_file():
            frozen_mismatch.append(rel)
        elif active_file.is_file() and active_file.read_bytes() != work_file.read_bytes():
            frozen_mismatch.append(rel)
    if frozen_mismatch:
        raise PrepError("Sitemap, llms o lastmod cambiaron: " + ", ".join(frozen_mismatch))
    active_locs = locs(active / "public/sitemap.xml")
    work_locs = locs(work / "public/sitemap.xml")
    if active_locs != work_locs:
        raise PrepError("Las URL del sitemap no son idénticas a las del release de origen.")
    report: dict[str, object] = {
        "release": EXPECTED_RELEASE,
        "active": str(active),
        "work": str(work),
        "files_preserved": len(before),
        "files_changed": changed,
        "sitemap_locs": len(active_locs),
        "sitemap_and_llms_unchanged": True,
        "active_unchanged": True,
        "git_commit": False,
        "deploy_authorized": False,
        "decision_required": True,
        "rel_sh_used": False,
        "rel_sh_in_repo": False,
        "deviation": [
            "No usar rel.sh: fija /workspace/wt-mej, regenera sitemap/llms, hace git add -A y commit, y activa ese checkout.",
            "No ejecutar scripts/build_sitemaps.py ni reescribir public/llms.txt en esta preparación.",
            "No ejecutar scripts/predeploy_check.py ni scripts/deploy_verified_release.py: hablan con el VPS o con VisionSetil.",
            "El lastmod del sitemap no se actualiza. La página de transporte pasa reviewedAt a 2026-11-08 en el HTML construido; alinear el lastmod es otra decisión.",
            "Activar sigue siendo scripts/activate_release.sh, que ya hace rollback si las comprobaciones fallan. Este helper no lo ejecuta.",
        ],
    }
    return report


def prepare(active: Path, work: Path | None, dry_run: bool) -> dict[str, object]:
    active = refuse_shared(active, "--active")
    assert_stamp(active)
    assert_source_tree(active)
    before = fingerprint(active)
    if fingerprint(active) != before:
        raise PrepError("La copia de origen no es estable. Se aborta.")
    owned_tmp: tempfile.TemporaryDirectory[str] | None = None
    created = False
    work_path: Path | None = None
    try:
        if dry_run:
            owned_tmp = tempfile.TemporaryDirectory(prefix="rt-editorial-dry-")
            work_path = Path(owned_tmp.name) / "work"
        else:
            if work is None:
                raise PrepError("Hace falta --work, un directorio que todavía no exista.")
            work_path = refuse_shared(work, "--work")
            if work_path == active or active in work_path.parents or work_path in active.parents:
                raise PrepError("--work no puede estar dentro de --active ni al revés.")
            if not work_path.parent.is_dir():
                raise PrepError(f"No existe el directorio padre de --work ({work_path.parent}).")
            if work_path.exists():
                raise PrepError(f"--work ya existe ({work_path}). No se reutiliza una copia previa.")
            created = True
        copy_tree(active, work_path)
        if fingerprint(work_path) != before:
            raise PrepError("La copia de trabajo no reproduce el origen. Se aborta.")
        if fingerprint(active) != before:
            raise PrepError("El origen cambió al copiar. Se aborta.")
        apply_patch(work_path)
        report = verify(active, work_path, before)
        report["dry_run"] = dry_run
        if dry_run:
            report["work"] = "(copia desechable borrada)"
        else:
            report_path = work_path.with_name(work_path.name + "-PREPARACION-20261108.json")
            report_path.write_text(json.dumps(report, ensure_ascii=False, indent=2) + "\n", encoding="utf-8")
            report["report"] = str(report_path)
        return report
    except BaseException:
        if created and work_path is not None and work_path.exists():
            shutil.rmtree(work_path, ignore_errors=True)
        raise
    finally:
        if owned_tmp is not None:
            owned_tmp.cleanup()


def write_fixture(root: Path, *, sigma: bool = True) -> None:
    import importlib.util

    spec = importlib.util.spec_from_file_location("editorial_patch", PATCH_SCRIPT)
    if spec is None or spec.loader is None:
        raise PrepError("No se pudo cargar el parche literal para la fixtura.")
    module = importlib.util.module_from_spec(spec)
    spec.loader.exec_module(module)
    root.mkdir(parents=True, exist_ok=True)
    (root / "RELEASE_ID").write_text(EXPECTED_RELEASE + "\n", encoding="utf-8")
    (root / "package.json").write_text('{"name":"fixture","private":true}\n', encoding="utf-8")
    enc = root / "src/lib/tramites/encuestas-29n.ts"
    enc.parent.mkdir(parents=True)
    enc.write_text(
        "\n".join([module.E1_OLD, module.E2_OLD, module.SIGMA_OLD if sigma else "sin celda"]) + "\n",
        encoding="utf-8",
    )
    corte = root / "src/lib/tramites/corte-ave-20261031.ts"
    corte.write_text(
        "\n".join(
            [
                module.LEAD_LIVE,
                module.H2_ESTADO_OLD,
                module.INTRO_OLD,
                module.LINEA_OLD,
                module.CONVENCIONAL_OLD,
                module.BUS_OLD,
                module.PAT_OLD,
                module.OUIGO_BULLET_LIVE,
                module.H2_OUIGO_LIVE,
                module.OUIGO_P_LIVE,
                module.OUIGO_REGLAMENTO_OLD,
                module.IRYO_H2_OLD,
                module.IRYO_P_OLD,
                module.T5_OLD,
                module.ASISTENCIA_OLD,
                module.T6_OLD,
                module.FAQ_VUELVE_LIVE,
                module.FAQ_BUS_OLD,
                module.FAQ_DINERO_OLD,
                module.BYLINE_OLD,
                module.DISCLAIMER_OLD,
                'id: "corte-ave-madrid-andalucia-reembolso", pack: "transporte", reviewedAt: R, path: P_CORTE_AVE,',
                'renfeBus: { href: "https://grupo.renfe.com/content/dam/grupo-renfe/sala-de-prensa/comunicacion/comunicacion/castilla-la-mancha/pdf/pat-urda/PAT_MADRID-PUERTOLLANO.pdf", label: "Renfe: horarios del autobús Madrid–Ciudad Real–Puertollano (PDF)" },',
                "sources: [S.renfe, S.renfePat, S.renfeBus, S.renfeAyuda, S.iryo, S.ouigo, S.mitmaDerechos, S.mitmaVictimas, S.reglamento, S.jccm, S.ep],",
                'label: "Renfe: el plan alternativo Madrid–Andalucía no podrá empezar antes del 3 de noviembre"',
                'description: "La alta velocidad Madrid–Andalucía sigue cortada tras el accidente de Urda. Cómo pedir el reembolso o cambiar el billete en Renfe, Iryo y Ouigo, y reclamar.",',
            ]
        )
        + "\n",
        encoding="utf-8",
    )
    promesas = root / "src/lib/tramites/promesas-29n.ts"
    promesas.write_text(
        "\n".join(
            [
                '"id": "p29n-comunidad-madrid"',
                module.COMP_OLD,
                '"href": "https://www.boe.es/buscar/act.php?id=BOE-A-1992-28740"',
                "}",
                "],",
                '"id": "p29n-comunidad-murcia"',
            ]
        )
        + "\n",
        encoding="utf-8",
    )
    mejoras = root / "src/lib/tramites/mejoras-20261024.ts"
    mejoras.write_text(
        module.MADRID_PREFIX
        + module.THRESHOLD_OLD
        + "\n"
        + module.THRESHOLD_OLD
        + "\n",
        encoding="utf-8",
    )
    (root / "src/keep.ts").write_text("export const intacto = true;\n", encoding="utf-8")
    sitemap = (
        "<urlset>\n"
        "<loc>https://rutatramite.com/elecciones/encuestas-29n</loc>\n"
        "<loc>https://rutatramite.com/transporte/corte-ave-madrid-andalucia-reembolso</loc>\n"
        "<loc>https://rutatramite.com/elecciones/promesas/comunidad-madrid</loc>\n"
        "</urlset>\n"
    )
    (root / "public").mkdir()
    (root / "public/sitemap.xml").write_text(sitemap, encoding="utf-8")
    (root / "public/llms.txt").write_text(sitemap, encoding="utf-8")
    (root / "public/llms-full.txt").write_text(sitemap, encoding="utf-8")
    (root / "data").mkdir()
    (root / "data/sitemap-lastmod.json").write_text('{"/":"2026-11-04"}\n', encoding="utf-8")
    (root / "data/keep.txt").write_text("dato vivo\n", encoding="utf-8")
    (root / "content").mkdir()
    (root / "content/keep.md").write_text("contenido vivo\n", encoding="utf-8")
    subprocess.run(["git", "init", "-q"], cwd=root, check=True)
    subprocess.run(["git", "add", "-A"], cwd=root, check=True)
    subprocess.run(
        ["git", "-c", "user.email=fixture@example.com", "-c", "user.name=Fixture", "commit", "-qm", "fixture"],
        cwd=root,
        check=True,
    )


def git_head(root: Path) -> str:
    completed = subprocess.run(
        ["git", "rev-parse", "HEAD"],
        cwd=root,
        check=True,
        capture_output=True,
        text=True,
    )
    return completed.stdout.strip()


def expect_fail(label: str, fn) -> None:
    try:
        fn()
    except (PrepError, SystemExit) as exc:
        if isinstance(exc, SystemExit) and exc.code in (0, None):
            raise PrepError(f"{label}: tenía que fallar y salió bien") from exc
        print(f"fallo cerrado ok: {label}")
        return
    raise PrepError(f"{label}: tenía que fallar y salió bien")


def self_test() -> None:
    with tempfile.TemporaryDirectory(prefix="rt-editorial-fixture-") as tmp:
        base = Path(tmp)
        active = base / EXPECTED_RELEASE
        write_fixture(active)
        head = git_head(active)
        snapshot = fingerprint(active)
        report = prepare(active, None, dry_run=True)
        if report["deploy_authorized"] or set(report["files_changed"]) != set(PATCHED):
            raise PrepError(f"Informe de dry-run inesperado: {report}")
        if fingerprint(active) != snapshot or git_head(active) != head:
            raise PrepError("El dry-run modificó la copia de origen o su git.")
        if list(base.rglob("*PREPARACION-20261108.json")):
            raise PrepError("El dry-run dejó un informe.")
        work = base / "copia-trabajo"
        report = prepare(active, work, dry_run=False)
        report_path = work.with_name(work.name + "-PREPARACION-20261108.json")
        if not report_path.is_file():
            raise PrepError("Falta el informe de preparación.")
        if fingerprint(active) != snapshot or git_head(active) != head:
            raise PrepError("La preparación modificó la copia de origen.")
        if (work / ".git").exists():
            raise PrepError("La copia de trabajo no debe arrastrar .git ni poder hacer commit.")
        text = (work / "src/lib/tramites/encuestas-29n.ts").read_text(encoding="utf-8")
        if "viene sobre todo del método" in text or "es un empate" in text:
            raise PrepError("La copia de trabajo conserva las frases retiradas.")
        if "superan el 3 %" not in (work / "src/lib/tramites/mejoras-20261024.ts").read_text(encoding="utf-8"):
            raise PrepError("Se ha borrado el umbral del resto de comunidades en la fixtura.")
        if (active / "public/sitemap.xml").read_bytes() != (work / "public/sitemap.xml").read_bytes():
            raise PrepError("El sitemap de la copia de trabajo no coincide con el origen.")
        expect_fail("checkout compartido", lambda: prepare(REPO_ROOT, None, dry_run=True))
        broken = base / "sin-sitemap" / EXPECTED_RELEASE
        write_fixture(broken)
        (broken / "public/sitemap.xml").unlink()
        expect_fail("sitemap ausente", lambda: prepare(broken, None, dry_run=True))
        no_sigma = base / "sin-sigma" / EXPECTED_RELEASE
        write_fixture(no_sigma, sigma=False)
        expect_fail("celda Sigma ausente", lambda: prepare(no_sigma, None, dry_run=True))
        reused = base / "ya-existe"
        reused.mkdir()
        expect_fail("work existente", lambda: prepare(active, reused, dry_run=False))
        print(json.dumps({"self_test": "ok", "changed": report["files_changed"], "locs": report["sitemap_locs"]}, ensure_ascii=False))


def main() -> None:
    parser = argparse.ArgumentParser(description="Prepara una copia aislada del release activo y aplica el parche literal.")
    parser.add_argument("--active", type=Path, help="Copia inmutable del árbol fuente del release 20261108T072734Z.")
    parser.add_argument("--work", type=Path, help="Directorio nuevo, fuera del checkout compartido, donde quedará la copia parcheada.")
    parser.add_argument("--dry-run", action="store_true", help="Comprueba en una copia desechable y la borra.")
    parser.add_argument("--self-test", action="store_true", help="Ejecuta las fixturas locales.")
    args = parser.parse_args()
    if args.self_test:
        self_test()
        return
    if args.active is None:
        raise PrepError("Hace falta --active con la copia del árbol fuente.")
    report = prepare(args.active, args.work, args.dry_run)
    print(json.dumps(report, ensure_ascii=False, indent=2))
    print(
        "DECISION REQUERIDA: este informe no autoriza el despliegue. "
        "No ejecutes rel.sh. Si decides activar, construye solo desde --work, "
        "sin build_sitemaps.py y sin commit, y usa scripts/activate_release.sh, que ya revierte si falla."
    )


if __name__ == "__main__":
    try:
        main()
    except PrepError as exc:
        print(f"ABORT: {exc}", file=sys.stderr)
        raise SystemExit(1) from exc
