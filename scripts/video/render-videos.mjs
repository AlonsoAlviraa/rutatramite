// Renderiza los vídeos cortos verticales (1080×1920) definidos en videos.mjs.
// Pipeline: diapositivas HTML (tipografía y paleta de marca) → PNG con Chromium
// (Playwright) → montaje con ffmpeg (fundidos, H.264, 30 fps, sin audio).
// Uso: node scripts/video/render-videos.mjs [--only id1,id2] [--out-dir ruta]
// Requisitos: @playwright/test con Chromium instalado y ffmpeg en PATH.

import { mkdir, writeFile } from "node:fs/promises";
import path from "node:path";
import process from "node:process";
import { execFile as execFileCb } from "node:child_process";
import { promisify } from "node:util";
import { fileURLToPath } from "node:url";
import { chromium } from "@playwright/test";
import { VIDEOS, MARCA } from "./videos.mjs";

const execFile = promisify(execFileCb);

const RAIZ = fileURLToPath(new URL("../../", import.meta.url));
const OUT_DIR_DEFAULT = path.join(RAIZ, "videos", "empadronamiento-20260923");
const XF = 0.4; // duración del fundido entre diapositivas, en segundos
const DUR = { hook: 3.0, beat: 4.2, cta: 4.4 };

// --- CSS compartido de las diapositivas (paleta y fuentes de DESIGN.md) ---
const CSS_BASE = `
  * { margin: 0; padding: 0; box-sizing: border-box; }
  html, body { width: 1080px; height: 1920px; }
  body {
    font-family: "Public Sans", "Segoe UI", Arial, sans-serif;
    color: #252B26; background: #FFFFFF;
    -webkit-font-smoothing: antialiased;
  }
  .frame { height: 100%; display: flex; flex-direction: column; padding: 84px 90px; position: relative; }
  /* Sin esto, un flex item en columna no puede ser más estrecho que su palabra más larga
     y el autoajuste de tipografía no detecta el desbordamiento. */
  .frame > * { min-width: 0; max-width: 100%; }
  .cab { display: flex; justify-content: space-between; align-items: baseline; }
  .marca { font-size: 34px; font-weight: 600; color: #1B4332; letter-spacing: 0.5px; }
  .independiente { font-size: 29px; color: #5F6B62; }
  .nota { margin-top: auto; padding-top: 36px; border-top: 3px solid #E5EDE7; font-size: 30px; color: #5F6B62; line-height: 1.4; }
  .serif { font-family: "Newsreader", Georgia, "Times New Roman", serif; }
`;

const FONTS_LINK = `
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Newsreader:opsz,wght@6..72,600;6..72,700&family=Public+Sans:wght@400;600;700;800&display=swap" rel="stylesheet">
`;

function pagina(titulo, estilos, contenido) {
  return `<!doctype html><html lang="es"><head><meta charset="utf-8">${FONTS_LINK}
  <title>${escapeHtml(titulo)}</title><style>${CSS_BASE}${estilos}</style></head>
  <body>${contenido}</body></html>`;
}

function conEnfasis(texto, frases) {
  let resultado = escapeHtml(texto);
  for (const frase of frases) {
    const escapo = escapeHtml(frase).replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
    resultado = resultado.replace(new RegExp(escapo), (m) => `<span class="em">${m}</span>`);
  }
  return resultado;
}

function escapeHtml(s) {
  return s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");
}

export function slideHook(video) {
  return pagina(video.id + " hook", `
    .kicker { margin-top: 130px; font-size: 38px; font-weight: 700; letter-spacing: 6px; text-transform: uppercase; color: #2D6A4F; }
    .headline { margin-top: 48px; font-weight: 700; font-size: 148px; line-height: 1.05; letter-spacing: -1px; }
    .headline .em { color: #2D6A4F; }
  `, `
    <div class="frame">
      <div class="cab"><div class="marca">${MARCA.sitio}</div><div class="independiente">guía independiente</div></div>
      <div class="kicker">${escapeHtml(video.kicker)}</div>
      <h1 class="headline serif">${conEnfasis(video.hook.texto, video.hook.enfasis)}</h1>
      <div class="nota">${MARCA.nota}</div>
    </div>`);
}

export function slideBeat(video, beat, indice) {
  const numero = String(indice + 1).padStart(2, "0");
  return pagina(`${video.id} beat ${numero}`, `
    .regla { width: 130px; height: 8px; background: #2D6A4F; margin-top: 120px; }
    .num { margin-top: 34px; font-size: 44px; font-weight: 800; letter-spacing: 5px; color: #2D6A4F; }
    .titulo { margin-top: 30px; font-weight: 700; font-size: 92px; line-height: 1.07; color: #1B4332; letter-spacing: -0.5px; }
    .cuerpo { margin-top: 44px; font-size: 45px; line-height: 1.38; color: #3C443E; }
  `, `
    <div class="frame">
      <div class="cab"><div class="marca">${MARCA.sitio}</div><div class="independiente">guía independiente</div></div>
      <div class="regla"></div>
      <div class="num">${numero}</div>
      <h2 class="titulo serif">${escapeHtml(beat.titulo)}</h2>
      <p class="cuerpo">${escapeHtml(beat.cuerpo)}</p>
      <div class="nota">${MARCA.nota}</div>
    </div>`);
}

export function slideCta(video) {
  return pagina(video.id + " cta", `
    body { background: #1B4332; color: #FFFFFF; }
    .marca { color: #FFFFFF; }
    .independiente { color: #95D5B2; }
    .kicker { margin-top: 170px; font-size: 36px; font-weight: 700; letter-spacing: 6px; text-transform: uppercase; color: #95D5B2; }
    .titulo { margin-top: 46px; font-weight: 700; font-size: 104px; line-height: 1.08; letter-spacing: -1px; color: #FFFFFF; }
    .caja-url { margin-top: 72px; background: #F3F6F4; border-radius: 6px; padding: 48px 52px; }
    .caja-url .ruta { font-size: 44px; font-weight: 700; color: #1B4332; line-height: 1.3; word-break: break-word; }
    .pie { margin-top: 40px; font-size: 32px; color: #95D5B2; }
  `, `
    <div class="frame">
      <div class="cab"><div class="marca">${MARCA.sitio}</div><div class="independiente">guía independiente</div></div>
      <div class="kicker">${escapeHtml(video.kicker)}</div>
      <h2 class="titulo serif">${escapeHtml(video.cta.titulo)}</h2>
      <div class="caja-url"><div class="ruta">${escapeHtml(video.cta.ruta)}</div></div>
      <div class="pie">Guía gratuita, con fuentes oficiales y enlaces a la sede</div>
    </div>`);
}

async function capturar(page, html, destino) {
  await page.goto("data:text/html;charset=utf-8," + encodeURIComponent(html), { waitUntil: "networkidle" });
  await page.evaluate(() => document.fonts.ready);
  // Autoajuste: palabras largas («empadronarte», URLs) no deben desbordar el lienzo.
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
  await page.waitForTimeout(150);
  await page.screenshot({ path: destino, type: "png" });
}

function duracionesDiapositivas(video) {
  return [DUR.hook, ...video.beats.map(() => DUR.beat), DUR.cta];
}

function comandoFfmpeg(rutasPng, duraciones, salida) {
  const args = ["-y"];
  for (let i = 0; i < rutasPng.length; i++) {
    args.push("-loop", "1", "-t", String(duraciones[i]), "-i", rutasPng[i]);
  }
  const partes = [];
  rutasPng.forEach((_, i) => {
    partes.push(`[${i}:v]scale=1080:1920:flags=lanczos,setsar=1,fps=30,format=yuv420p[v${i}]`);
  });
  let anterior = "v0";
  let offset = duraciones[0] - XF;
  for (let i = 1; i < rutasPng.length; i++) {
    const etiqueta = `x${i}`;
    partes.push(`[${anterior}][v${i}]xfade=transition=fade:duration=${XF}:offset=${offset.toFixed(3)}[${etiqueta}]`);
    anterior = etiqueta;
    offset += duraciones[i] - XF;
  }
  const total = duraciones.reduce((a, b) => a + b, 0) - (rutasPng.length - 1) * XF;
  partes.push(`[${anterior}]fade=t=in:st=0:d=0.3,fade=t=out:st=${(total - 0.35).toFixed(3)}:d=0.35[vout]`);
  args.push(
    "-filter_complex", partes.join(";"),
    "-map", "[vout]",
    "-c:v", "libx264", "-crf", "19", "-preset", "medium",
    "-pix_fmt", "yuv420p", "-movflags", "+faststart", "-an",
    salida,
  );
  return args;
}

async function probe(videoPath) {
  const { stdout } = await execFile("ffprobe", [
    "-v", "error", "-select_streams", "v:0",
    "-show_entries", "stream=width,height,codec_name:format=duration,size",
    "-of", "json", videoPath,
  ]);
  const info = JSON.parse(stdout);
  return {
    codec: info.streams[0].codec_name,
    ancho: info.streams[0].width,
    alto: info.streams[0].height,
    duracion: Number(info.format.duration).toFixed(2),
    tamanoMb: (Number(info.format.size) / 1024 / 1024).toFixed(2),
  };
}

async function main() {
  const argv = process.argv.slice(2);
  const valor = (nombre) => {
    const arg = argv.find((a) => a === nombre || a.startsWith(`${nombre}=`));
    if (!arg) return null;
    return arg === nombre ? argv[argv.indexOf(arg) + 1] ?? null : arg.slice(nombre.length + 1);
  };
  const outDir = valor("--out-dir") ? path.resolve(RAIZ, valor("--out-dir")) : OUT_DIR_DEFAULT;
  const solo = valor("--only") ? valor("--only").split(",").map((s) => s.trim()) : null;
  const seleccion = solo ? VIDEOS.filter((v) => solo.includes(v.id)) : VIDEOS;
  if (seleccion.length === 0) {
    console.error(`Ningún vídeo coincide con --only ${solo.join(",")}. Disponibles: ${VIDEOS.map((v) => v.id).join(", ")}`);
    process.exit(1);
  }

  const navegador = await chromium.launch();
  const context = await navegador.newContext({
    viewport: { width: 1080, height: 1920 },
    deviceScaleFactor: 2,
  });
  const page = await context.newPage();

  const resultados = [];
  for (const video of seleccion) {
    const dirSlides = path.join(outDir, "_slides", video.id);
    await mkdir(dirSlides, { recursive: true });

    const htmls = [slideHook(video), ...video.beats.map((b, i) => slideBeat(video, b, i)), slideCta(video)];
    const pngs = [];
    for (let i = 0; i < htmls.length; i++) {
      const destino = path.join(dirSlides, `${String(i + 1).padStart(2, "0")}.png`);
      await capturar(page, htmls[i], destino);
      pngs.push(destino);
    }

    const salidaMp4 = path.join(outDir, `${video.id}.mp4`);
    const args = comandoFfmpeg(pngs, duracionesDiapositivas(video), salidaMp4);
    await execFile("ffmpeg", args, { maxBuffer: 64 * 1024 * 1024 });
    const info = await probe(salidaMp4);
    resultados.push({ id: video.id, archivo: salidaMp4, ...info });
    console.log(`✔ ${video.id} — ${info.duracion}s, ${info.ancho}×${info.alto}, ${info.tamanoMb} MB`);
  }

  await navegador.close();

  const resumen = path.join(outDir, "resumen-render.json");
  await writeFile(resumen, JSON.stringify({ generado: new Date().toISOString(), resultados }, null, 2), "utf8");
  console.log(`\nResumen: ${resumen}`);
}

// Solo se ejecuta como punto de entrada; check-fit.mjs importa las plantillas sin renderizar.
const esPuntoEntrada = process.argv[1] && import.meta.url === new URL(`file:///${path.resolve(process.argv[1]).replace(/\\/g, "/")}`).href;
if (esPuntoEntrada) {
  main().catch((error) => {
    console.error(error);
    process.exit(1);
  });
}
