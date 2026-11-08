import { execFileSync } from "node:child_process";
import { describe, expect, it } from "vitest";

describe("preparación aislada del release 20261108", () => {
  it("supera las fixturas de dry-run, copia inmutable y fallo cerrado", () => {
    const out = execFileSync("python3", ["patches/preparar-copia-release-20261108.py", "--self-test"], {
      encoding: "utf8",
    });
    expect(out).toContain('"self_test": "ok"');
    expect(out).toContain("fallo cerrado ok: checkout compartido");
    expect(out).toContain("fallo cerrado ok: celda Sigma ausente");
    expect(out).not.toContain('"deploy_authorized": true');
  });
});
