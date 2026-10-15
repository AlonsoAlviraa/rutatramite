import { execFileSync } from "node:child_process";

let cached: string | undefined;

// La imagen del VPS trae python3. En Windows el nombre habitual es python
// y python3 puede ser el alias de la Store, que no ejecuta el intérprete.
export function pythonExecutable(): string {
  if (cached) return cached;
  const failures: string[] = [];
  for (const bin of ["python3", "python"]) {
    try {
      execFileSync(bin, ["-c", "import sys; raise SystemExit(0 if sys.version_info[0] >= 3 else 1)"], {
        stdio: "ignore",
        timeout: 8000,
        windowsHide: true,
      });
      cached = bin;
      return bin;
    } catch (error) {
      const code =
        error instanceof Error && "code" in error ? String((error as NodeJS.ErrnoException).code) : "fail";
      failures.push(`${bin}:${code}`);
    }
  }
  throw new Error(`No hay Python 3 en PATH (${failures.join(", ")})`);
}
