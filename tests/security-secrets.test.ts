import { readdirSync, readFileSync, statSync } from "node:fs";
import path from "node:path";
import { describe, expect, it } from "vitest";

const RELEASE_ROOTS = [
  "src",
  "data",
  "content",
  "public",
  "messages",
  "tests",
  "scripts",
  "pack/rutatramite-empadronamiento-agent-pack/05_content/escenarios",
];

const RELEASE_FILES = [
  "package.json",
  "package-lock.json",
  "next.config.ts",
  "tailwind.config.ts",
  "postcss.config.mjs",
  "tsconfig.json",
  "vitest.config.ts",
  "playwright.config.ts",
  "next-env.d.ts",
];

const SECRET_NAMES = [
  "servidor.env",
  "token.json",
  "client_secrets.json",
  "id_rsa",
  "id_ed25519",
  "id_ecdsa",
];

const SKIP_PARTS = new Set(["__pycache__", "_drafts"]);
const BINARY_EXT = new Set([
  ".png",
  ".jpg",
  ".jpeg",
  ".gif",
  ".webp",
  ".pdf",
  ".mp4",
  ".zip",
  ".woff",
  ".woff2",
  ".ico",
  ".pyc",
]);

const CONTENT_RULES: { id: string; pattern: RegExp }[] = [
  { id: "pem_private", pattern: /-----BEGIN (?:RSA |OPENSSH |EC |DSA |ENCRYPTED )?PRIVATE KEY-----/ },
  { id: "client_secret_literal", pattern: /client_secret["']?\s*[:=]\s*["'][^"']{8,}/ },
  { id: "refresh_token_literal", pattern: /refresh_token["']?\s*[:=]\s*["'][^"']{8,}/i },
  { id: "private_key_literal", pattern: /private_key["']?\s*[:=]\s*["'][^"']{8,}/i },
  { id: "github_token", pattern: /ghp_[A-Za-z0-9]{20,}|github_pat_[A-Za-z0-9_]{20,}/ },
  { id: "slack_token", pattern: /xox[baprs]-[A-Za-z0-9-]{10,}/ },
  { id: "aws_access", pattern: /AKIA[0-9A-Z]{16}/ },
  { id: "google_api", pattern: /AIza[0-9A-Za-z_\-]{30,}/ },
  { id: "stripe_live", pattern: /(?:sk|rk)_live_[A-Za-z0-9]{10,}/ },
  { id: "jwt", pattern: /eyJ[A-Za-z0-9_\-]{10,}\.[A-Za-z0-9_\-]{10,}\./ },
];

function isSecretFileName(name: string) {
  return (
    SECRET_NAMES.includes(name) ||
    name === ".env" ||
    name.startsWith(".env.") ||
    name.endsWith(".env") ||
    name.endsWith(".pem") ||
    name.endsWith(".key")
  );
}

function releaseFiles() {
  const files: string[] = [];
  const walk = (dir: string) => {
    for (const entry of readdirSync(dir, { withFileTypes: true })) {
      if (SKIP_PARTS.has(entry.name)) continue;
      const full = path.join(dir, entry.name);
      if (entry.isDirectory()) {
        walk(full);
        continue;
      }
      if (entry.isFile()) files.push(full);
    }
  };
  for (const root of RELEASE_ROOTS) walk(root);
  for (const file of RELEASE_FILES) {
    if (statSync(file, { throwIfNoEntry: false })?.isFile()) files.push(file);
  }
  return files;
}

describe("release secret scan", () => {
  it("keeps env files and private keys out of the packaged tree", () => {
    const inputs = readFileSync("scripts/release_inputs.py", "utf8");
    const pack = readFileSync("scripts/pack_source.py", "utf8");
    expect(inputs).toContain("def release_skipped");
    expect(pack).toContain("release_skipped(Path(info.name))");
    for (const name of SECRET_NAMES) expect(inputs).toContain("'" + name + "'");

    const findings: string[] = [];
    for (const file of releaseFiles()) {
      const rel = path.relative(process.cwd(), file).split(path.sep).join("/");
      if (isSecretFileName(path.basename(file))) findings.push("secret_filename " + rel);
      if (BINARY_EXT.has(path.extname(file).toLowerCase())) continue;
      const text = readFileSync(file, "utf8");
      for (const rule of CONTENT_RULES) {
        if (rule.pattern.test(text)) findings.push(rule.id + " " + rel);
      }
    }
    expect(findings).toEqual([]);
  });
});
