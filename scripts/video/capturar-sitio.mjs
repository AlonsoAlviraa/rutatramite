// Captura pantallas reales de rutatramite.com (móvil, 1080×1920 lógicos, 2× reales)
// para las diapositivas «tu ruta en RutaTrámite» de la serie 2 de vídeos.
// Uso: node scripts/video/capturar-sitio.mjs
import { mkdir } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { chromium } from "@playwright/test";

const RAIZ = fileURLToPath(new URL("../../", import.meta.url));
const DESTINO = path.join(RAIZ, "videos", "empadronamiento-20260925", "_img", "sitio");

const PAGINAS = [
  { nombre: "portada", url: "https://rutatramite.com/", scroll: 0 },
  { nombre: "asistente", url: "https://rutatramite.com/#asistente", hash: "#asistente" },
  { nombre: "directorio", url: "https://rutatramite.com/empadronarse", scroll: 0 },
  { nombre: "guia-no-ue", url: "https://rutatramite.com/empadronarse/extranjeros-no-ue", scroll: 0 },
  { nombre: "guia-arraigo", url: "https://rutatramite.com/extranjeria/arraigo-padron", scroll: 0 },
];

const navegador = await chromium.launch();
const context = await navegador.newContext({
  viewport: { width: 1080, height: 1920 },
  deviceScaleFactor: 2,
  isMobile: true,
  hasTouch: true,
  userAgent:
    "Mozilla/5.0 (iPhone; CPU iPhone OS 17_0 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/17.0 Mobile/15E148 Safari/604.1",
});
const page = await context.newPage();

await mkdir(DESTINO, { recursive: true });
for (const p of PAGINAS) {
  await page.goto(p.url, { waitUntil: "networkidle", timeout: 60000 });
  await page.evaluate(() => document.fonts.ready);
  // El menú móvil colapsable no debe tapar el contenido en la captura.
  await page.evaluate(() => window.scrollTo(0, 0));
  if (p.hash) {
    await page.evaluate((h) => document.querySelector(h)?.scrollIntoView({ block: "start" }), p.hash);
  }
  await page.waitForTimeout(400);
  const archivo = path.join(DESTINO, `${p.nombre}.png`);
  await page.screenshot({ path: archivo, type: "png" });
  console.log(`✔ ${p.nombre} → ${archivo}`);
}
await navegador.close();
