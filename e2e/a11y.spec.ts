import AxeBuilder from "@axe-core/playwright";
import { expect, test } from "@playwright/test";
// Violations are printed as GitHub warnings and do not fail the test.

const PATHS = ["/", "/elecciones", "/empadronarse", "/dni", "/becas"] as const;

for (const path of PATHS) {
  test(`axe ${path}`, async ({ page }) => {
    const response = await page.goto(path, { waitUntil: "load" });
    expect(response, path).not.toBeNull();
    test.skip(response!.status() === 404, `${path} is not in this tree`);
    expect(response!.status(), path).toBeLessThan(500);

    const results = await new AxeBuilder({ page })
      .withTags(["wcag2a", "wcag2aa", "wcag21a", "wcag21aa"])
      .analyze();

    for (const violation of results.violations) {
      const targets = violation.nodes
        .slice(0, 5)
        .map((node) => node.target.join(" "))
        .join("; ");
      const detail = `${path} ${violation.id} (${violation.impact ?? "unknown"}): ${violation.help} — ${targets}`;
      console.log(`::warning title=axe ${violation.id}::${detail}`);
    }

  });
}
