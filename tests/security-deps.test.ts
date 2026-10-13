import { readFileSync } from "node:fs";
import { describe, expect, it } from "vitest";

type LockPackage = {
  version?: string;
  optionalDependencies?: Record<string, string>;
};

function versionAtLeast(actual: string, minimum: string) {
  const left = actual.split(".").map((part) => Number(part));
  const right = minimum.split(".").map((part) => Number(part));
  for (let index = 0; index < 3; index += 1) {
    const a = left[index] ?? 0;
    const b = right[index] ?? 0;
    if (a !== b) return a > b;
  }
  return true;
}

describe("production dependency patch", () => {
  it("locks sharp on the librsvg patch inside Next's existing range", () => {
    const lock = JSON.parse(readFileSync("package-lock.json", "utf8")) as {
      packages: Record<string, LockPackage>;
    };
    const sharp = lock.packages["node_modules/sharp"];
    const libvips = lock.packages["node_modules/@img/sharp-libvips-linux-x64"];
    expect(sharp?.version && versionAtLeast(sharp.version, "0.35.5")).toBe(true);
    expect(sharp?.version?.startsWith("0.35.")).toBe(true);
    expect(sharp?.optionalDependencies?.["@img/sharp-linux-x64"]).toBe(sharp?.version);
    expect(libvips?.version && versionAtLeast(libvips.version, "1.3.4")).toBe(true);
    expect(sharp?.optionalDependencies?.["@img/sharp-libvips-linux-x64"]).toBe(libvips?.version);
  });
});