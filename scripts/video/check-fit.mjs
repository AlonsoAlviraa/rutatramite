// Comprobación determinista de ajuste de texto: recorre todas las diapositivas de
// videos.mjs en Chromium y verifica que ningún elemento desborde el lienzo 1080×1920
// ni su propio ancho tras el autoajuste del renderizador.
// Uso: node scripts/video/check-fit.mjs → sale con código 1 si hay desbordamiento.

import { chromium } from "@playwright/test";
import { VIDEOS } from "./videos.mjs";
import { slideHook, slideBeat, slideCta } from "./render-videos.mjs";

const LIENZO_ANCHO = 1080;
const LIENZO_ALTO = 1920;

function slideHtml(video, i) {
  if (i === 0) return slideHook(video);
  if (i === video.beats.length + 1) return slideCta(video);
  return slideBeat(video, video.beats[i - 1], i - 1);
}

const navegador = await chromium.launch();
const context = await navegador.newContext({
  viewport: { width: LIENZO_ANCHO, height: LIENZO_ALTO },
  deviceScaleFactor: 1,
});
const page = await context.newPage();

let desbordes = 0;
let titulares = [];
for (const video of VIDEOS) {
  const total = video.beats.length + 2;
  for (let i = 0; i < total; i++) {
    const html = slideHtml(video, i);
    await page.goto("data:text/html;charset=utf-8," + encodeURIComponent(html), { waitUntil: "networkidle" });
    await page.evaluate(() => document.fonts.ready);
    // mismo autoajuste que render-videos.mjs
    await page.evaluate(() => {
      const reducir = (el, minPx) => {
        let size = parseFloat(getComputedStyle(el).fontSize);
        while (el.scrollWidth > el.clientWidth + 1 && size > minPx) {
          size -= 2;
          el.style.fontSize = `${size}px`;
        }
      };
      document.querySelectorAll(".headline, .titulo").forEach((el) => reducir(el, 64));
      let vueltas = 0;
      while (document.body.scrollHeight > 1920 && vueltas < 80) {
        vueltas += 1;
        document.querySelectorAll(".headline, .titulo").forEach((el) => {
          const size = parseFloat(getComputedStyle(el).fontSize);
          if (size > 64) el.style.fontSize = `${size - 2}px`;
        });
        const cuerpo = document.querySelector(".cuerpo");
        if (cuerpo && vueltas > 20) {
          const size = parseFloat(getComputedStyle(cuerpo).fontSize);
          if (size > 34) cuerpo.style.fontSize = `${size - 1}px`;
        }
      }
    });

    const informe = await page.evaluate(() => {
      const problemas = [];
      if (document.documentElement.scrollWidth > 1081) problemas.push(`doc ${document.documentElement.scrollWidth}px`);
      if (document.body.scrollHeight > 1921) problemas.push(`alto ${document.body.scrollHeight}px`);
      for (const el of document.querySelectorAll(".headline, .titulo, .cuerpo, .kicker, .ruta, .nota, .pie")) {
        if (el.scrollWidth > el.clientWidth + 1) {
          problemas.push(`${el.className} ${el.scrollWidth}>${el.clientWidth}`);
        }
      }
      const titular = document.querySelector(".headline, .titulo");
      return { problemas, fuenteTitular: titular ? getComputedStyle(titular).fontSize : null };
    });
    const nombre = `${video.id}#${i + 1}`;
    titulares.push(`${nombre}: ${informe.fuenteTitular}`);
    if (informe.problemas.length) {
      desbordes += 1;
      console.log(`✗ ${nombre} → ${informe.problemas.join(", ")}`);
    }
  }
}
await navegador.close();
console.log(titulares.join("\n"));
if (desbordes > 0) {
  console.error(`\n${desbordes} diapositivas con desbordamiento.`);
  process.exit(1);
}
console.log(`\nTodas las diapositivas (${VIDEOS.length} vídeos) encajan en 1080×1920 sin recortes.`);
