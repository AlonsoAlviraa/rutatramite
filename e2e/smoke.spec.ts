import { expect, test, type Page } from "@playwright/test";

const HTML_PAGES = ["/", "/elecciones", "/empadronarse", "/dni", "/becas"] as const;
const MISSING_PATH = "/__ci_missing_page__";

function trackConsole(page: Page, ignore: (text: string, url: string) => boolean = () => false): string[] {
  const errors: string[] = [];
  page.on("pageerror", (error) => {
    errors.push(`pageerror: ${error.message}`);
  });
  page.on("console", (message) => {
    if (message.type() !== "error") return;
    const text = message.text();
    const url = message.location().url;
    if (ignore(text, url)) return;
    errors.push(`console: ${text}${url ? ` @ ${url}` : ""}`);
  });
  return errors;
}

async function expectCanonical(page: Page, path: string) {
  const href = await page.locator('link[rel="canonical"]').first().getAttribute("href");
  expect(href, `${path} canonical`).toBeTruthy();
  const canonical = new URL(href!);
  expect(canonical.protocol === "http:" || canonical.protocol === "https:").toBe(true);
  const pathname = canonical.pathname.replace(/\/$/, "") || "/";
  expect(pathname).toBe(path === "/" ? "/" : path);
}

for (const path of HTML_PAGES) {
  test(`smoke ${path}`, async ({ page }) => {
    const errors = trackConsole(page);
    const response = await page.goto(path, { waitUntil: "load" });
    expect(response, path).not.toBeNull();
    expect(
      response!.status(),
      `${path} should return 200. A 404 means this route is not in the current tree.`,
    ).toBe(200);
    await expect(page).toHaveTitle(/\S/);
    await expectCanonical(page, path);
    expect(errors, errors.join("\n")).toEqual([]);
  });
}

test("unknown path is a 404", async ({ page }) => {
  const errors = trackConsole(
    page,
    (text, url) => /404/.test(text) && (url.includes(MISSING_PATH) || text.includes(MISSING_PATH)),
  );
  const response = await page.goto(MISSING_PATH, { waitUntil: "load" });
  expect(response, MISSING_PATH).not.toBeNull();
  expect(response!.status()).toBe(404);
  await expect(page).toHaveTitle(/\S/);
  expect(errors, errors.join("\n")).toEqual([]);
});

test("robots.txt", async ({ request }) => {
  const response = await request.get("/robots.txt");
  expect(response.status()).toBe(200);
  const body = (await response.text()).toLowerCase();
  expect(body).toMatch(/user-agent|sitemap/);
});

test("sitemap.xml", async ({ request }) => {
  const response = await request.get("/sitemap.xml");
  expect(response.status()).toBe(200);
  const body = await response.text();
  expect(body).toMatch(/<urlset|<sitemapindex/);
});

test("llms.txt", async ({ request }) => {
  const response = await request.get("/llms.txt");
  expect(response.status()).toBe(200);
  const body = (await response.text()).trim();
  expect(body.length).toBeGreaterThan(20);
  expect(body.startsWith("<!DOCTYPE")).toBe(false);
  expect(body.startsWith("<html")).toBe(false);
});
