#!/usr/bin/env node
/**
 * POST homepage + pillars to IndexNow (Bing, Yandex, etc.).
 * Google still uses sitemap + GSC. Fail-soft: exits 0 unless --strict.
 *
 *   node scripts/ping-indexnow.mjs
 *   node scripts/ping-indexnow.mjs --strict
 *   NEXT_PUBLIC_SITE_URL=https://rutatramite.com node scripts/ping-indexnow.mjs
 */
const KEY = "b7e4c91a0f3d28e65a1c47b90d2e8f36";
const origin = (process.env.NEXT_PUBLIC_SITE_URL || "https://rutatramite.com").replace(/\/$/, "");
const host = origin.replace(/^https?:\/\//, "");
const paths = [
  "/",
  "/empadronarse",
  "/dni",
  "/pasaporte",
  "/extranjeria",
  "/mudanza",
  "/colegio",
  "/comedor",
  "/fp",
  "/bebe",
  "/becas",
  "/modelos",
  "/metodologia",
  "/fuentes",
];
const urlList = paths.map((p) => `${origin}${p === "/" ? "" : p}`);
const body = {
  host,
  key: KEY,
  keyLocation: `${origin}/${KEY}.txt`,
  urlList,
};

const strict = process.argv.includes("--strict");

try {
  const res = await fetch("https://api.indexnow.org/indexnow", {
    method: "POST",
    headers: { "content-type": "application/json; charset=utf-8" },
    body: JSON.stringify(body),
  });
  const text = await res.text();
  console.log(JSON.stringify({ ok: res.ok, status: res.status, submitted: urlList.length, body: text.slice(0, 300) }));
  if (strict && !res.ok) process.exit(1);
} catch (err) {
  console.error(JSON.stringify({ ok: false, status: 0, error: String(err) }));
  if (strict) process.exit(1);
}
