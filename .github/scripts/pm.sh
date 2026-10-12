#!/usr/bin/env bash
# Package-manager helpers. The manager is chosen from the lockfile so the
# workflows keep working when the tree on main changes.
set -euo pipefail

ROOT="$(cd "$(dirname "${BASH_SOURCE[0]}")/../.." && pwd)"
cd "$ROOT"

detect_pm() {
  if [[ -f pnpm-lock.yaml ]]; then
    echo pnpm
  elif [[ -f yarn.lock ]]; then
    echo yarn
  elif [[ -f bun.lock || -f bun.lockb ]]; then
    echo bun
  else
    echo npm
  fi
}

node_version() {
  if [[ -f .nvmrc ]]; then
    tr -d '[:space:]' < .nvmrc | sed 's/^v//'
    return
  fi
  if [[ -f .node-version ]]; then
    tr -d '[:space:]' < .node-version | sed 's/^v//'
    return
  fi
  if [[ -f package.json ]]; then
    node -e '
      const fs = require("fs");
      const pkg = JSON.parse(fs.readFileSync("package.json", "utf8"));
      const eng = pkg.engines && pkg.engines.node;
      if (typeof eng === "string" && eng.trim()) {
        process.stdout.write(eng.trim());
      } else {
        process.stdout.write("22");
      }
    '
    return
  fi
  echo 22
}

has_script() {
  local name="$1"
  [[ -f package.json ]] || return 1
  node -e '
    const fs = require("fs");
    const pkg = JSON.parse(fs.readFileSync("package.json", "utf8"));
    const scripts = pkg.scripts || {};
    process.exit(scripts[process.argv[1]] ? 0 : 1);
  ' "$name"
}

has_dep() {
  local name="$1"
  [[ -f package.json ]] || return 1
  node -e '
    const fs = require("fs");
    const pkg = JSON.parse(fs.readFileSync("package.json", "utf8"));
    const deps = Object.assign({}, pkg.dependencies, pkg.devDependencies, pkg.optionalDependencies);
    process.exit(deps[process.argv[1]] ? 0 : 1);
  ' "$name"
}

activate() {
  local pm
  pm="$(detect_pm)"
  case "$pm" in
    pnpm | yarn)
      corepack enable
      if node -e 'const p=require("./package.json"); if(!p.packageManager) process.exit(1)'; then
        corepack install
      elif [[ "$pm" == pnpm ]]; then
        corepack prepare pnpm@10 --activate
      else
        corepack prepare yarn@1.22.22 --activate
      fi
      ;;
    bun)
      if ! command -v bun >/dev/null 2>&1; then
        echo "bun is not on PATH. The setup action should install it before install." >&2
        exit 1
      fi
      ;;
    npm)
      ;;
  esac
}

install_deps() {
  local pm
  pm="$(detect_pm)"
  case "$pm" in
    npm)
      if [[ -f package-lock.json ]]; then
        npm ci
      else
        npm install
      fi
      ;;
    pnpm)
      if [[ -f pnpm-lock.yaml ]]; then
        pnpm install --frozen-lockfile
      else
        pnpm install
      fi
      ;;
    yarn)
      if [[ -f yarn.lock ]]; then
        if [[ -f .yarnrc.yml ]]; then
          yarn install --immutable
        else
          yarn install --frozen-lockfile
        fi
      else
        yarn install
      fi
      ;;
    bun)
      if [[ -f bun.lock || -f bun.lockb ]]; then
        bun install --frozen-lockfile
      else
        bun install
      fi
      ;;
  esac
}

run_script() {
  local script="$1"
  shift
  local pm
  pm="$(detect_pm)"
  case "$pm" in
    npm) npm run "$script" -- "$@" ;;
    pnpm) pnpm run "$script" -- "$@" ;;
    yarn) yarn run "$script" -- "$@" ;;
    bun) bun run "$script" -- "$@" ;;
  esac
}

exec_bin() {
  local bin="$1"
  shift
  if [[ -x "node_modules/.bin/${bin}" ]]; then
    "node_modules/.bin/${bin}" "$@"
    return
  fi
  echo "Executable ${bin} is not installed. Add it as a dependency or skip this step." >&2
  exit 1
}

cache_dir() {
  local pm
  pm="$(detect_pm)"
  case "$pm" in
    npm) npm config get cache ;;
    pnpm) pnpm store path ;;
    yarn) yarn cache dir ;;
    bun)
      if command -v bun >/dev/null 2>&1; then
        bun pm cache
      else
        echo "${HOME}/.bun/install/cache"
      fi
      ;;
  esac
}

audit_deps() {
  local pm
  pm="$(detect_pm)"
  case "$pm" in
    npm) npm audit --audit-level=high ;;
    pnpm) pnpm audit --audit-level high ;;
    yarn)
      if [[ -f .yarnrc.yml ]]; then
        yarn npm audit --severity high
      else
        yarn audit --level high
      fi
      ;;
    bun)
      if bun audit --help >/dev/null 2>&1; then
        bun audit || true
        echo "bun audit does not support a stable high-only gate; reviewed as non-blocking."
      else
        echo "This Bun version has no audit command; skipping."
      fi
      ;;
  esac
}

cmd="${1:-}"
shift || true

case "$cmd" in
  detect) detect_pm ;;
  node-version) node_version ;;
  has-script) has_script "$@" ;;
  has-dep) has_dep "$@" ;;
  activate) activate ;;
  install) install_deps ;;
  run) run_script "$@" ;;
  exec) exec_bin "$@" ;;
  cache-dir) cache_dir ;;
  audit) audit_deps ;;
  *)
    echo "usage: pm.sh detect|node-version|has-script|has-dep|activate|install|run|exec|cache-dir|audit" >&2
    exit 2
    ;;
esac
