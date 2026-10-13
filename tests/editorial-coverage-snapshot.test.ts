import { execFileSync } from "node:child_process";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import { describe, expect, it } from "vitest";
import { pythonExecutable } from "./python-bin";

const ROOT = path.resolve(__dirname, "..");
const SNAPSHOT = path.join(
  ROOT,
  "docs/seo-workflow/editorial-coverage-after-directories-20260916.json",
);
const LEDGER = path.join(ROOT, "docs/seo-workflow/editorial-review-ledger-20260916.json");
const LICENSE = path.join(ROOT, "docs/google-license-published-20260915.json");
const ESTADO = path.join(ROOT, "docs/ESTADO-AUDITORIA.md");
const AUDITORIA = path.join(ROOT, "docs/AUDITORIA-PROFUNDA-20260916.md");
const COVERAGE_SCRIPT = path.join(ROOT, "scripts/editorial_review_coverage.py");
const LAUNCHER = path.join(ROOT, "scripts/launch_verified_build.py");
const CHECK_RELEASE = path.join(ROOT, "scripts/check_release.sh");
const ACTIVATE = path.join(ROOT, "scripts/activate_release.sh");
const HAS_LEDGER_DOCS = fs.existsSync(SNAPSHOT);

type CoveragePage = { path: string; category: string; status: string };
type Coverage = {
  remaining_count: number;
  reviewed_local_count: number;
  verified_unchanged_count: number;
  reviewed_count: number;
  captured_count: number;
  remaining_category_counts: Record<string, number>;
  remaining: CoveragePage[];
};

function readJson<T>(file: string): T {
  return JSON.parse(fs.readFileSync(file, "utf8")) as T;
}

describe.skipIf(!HAS_LEDGER_DOCS)(
  "cobertura editorial del 16-sep (ledger docs, absent from isolated source pack)",
  () => {
    it("el script de cobertura reproduce el snapshot: 199 locales, 23 conservadas, 222 contrastadas, 36 restantes", () => {
      const snapshot = readJson<Coverage>(SNAPSHOT);
      const out = path.join(os.tmpdir(), `editorial-coverage-${process.pid}-${Date.now()}.json`);
      execFileSync(pythonExecutable(), [COVERAGE_SCRIPT, "--output", out], {
        cwd: ROOT,
        encoding: "utf8",
      });
      const recomputed = readJson<Coverage>(out);
      fs.unlinkSync(out);

      expect(snapshot.captured_count).toBe(258);
      expect(recomputed.captured_count).toBe(snapshot.captured_count);
      expect(recomputed.reviewed_local_count).toBe(199);
      expect(recomputed.verified_unchanged_count).toBe(23);
      expect(recomputed.reviewed_count).toBe(222);
      expect(recomputed.remaining_count).toBe(36);
      expect(snapshot.remaining).toHaveLength(snapshot.remaining_count);
      expect(recomputed.remaining.map((row) => row.path)).toEqual(
        snapshot.remaining.map((row) => row.path),
      );
      expect(recomputed.remaining_category_counts).toEqual({
        institutional_information: 2,
        municipal_detail: 18,
        resource_catalogue: 3,
        topic_hub: 13,
      });
      expect(recomputed.remaining.some((row) => row.category === "individual_guide")).toBe(false);
      expect(
        recomputed.remaining.every((row) => row.status === "not_in_current_review_ledger"),
      ).toBe(true);
    });

    it("el ledger suma 199 unpublished y 23 unchanged", () => {
      const ledger = readJson<{
        pages: { status: string }[];
        additional_pages: { status: string }[];
        verified_unchanged_pages: { status: string }[];
      }>(LEDGER);
      const entries = [
        ...ledger.pages,
        ...ledger.additional_pages,
        ...ledger.verified_unchanged_pages,
      ];
      const unpublished = entries.filter((row) => row.status === "reviewed_local_unpublished");
      const unchanged = entries.filter((row) => row.status === "reviewed_unchanged");
      expect(unpublished).toHaveLength(199);
      expect(unchanged).toHaveLength(23);
      expect(unpublished.length + unchanged.length).toBe(222);
      expect(fs.readFileSync(ESTADO, "utf8")).toContain("3FHgYwbST-p9KZHQi2Esh");
      expect(fs.readFileSync(AUDITORIA, "utf8")).toContain("## Validación y continuación");
      const published = readJson<{ build_id: string; release: string }>(LICENSE);
      expect(published.build_id).toBe("mc2BEFYMW13Izl_iG8j50");
      expect(published.release).toBe("/srv/tenants/slot2/releases/20260915T171408Z");
    });
  },
);

describe("release scripts shipped in the source bundle", () => {
  it("preview does not activate and activation stays inside the slot2 release tree", () => {
    expect(fs.existsSync(LAUNCHER)).toBe(true);
    const checkRelease = fs.readFileSync(CHECK_RELEASE, "utf8");
    expect(checkRelease).toContain("do not activate it");
    expect(checkRelease).toContain("sport = :8199");
    const activate = fs.readFileSync(ACTIVATE, "utf8");
    expect(activate).toContain("mv -Tf");
    expect(activate).toContain("ROOT=/srv/tenants/slot2");
    expect(activate).toContain('RELEASE="$ROOT/releases/$STAMP"');
  });
});
