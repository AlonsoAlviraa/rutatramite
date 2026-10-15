// Renderiza la serie 2 de vídeos (1080×1920): fotos documentales con efecto
// Ken Burns + overlays de texto, capturas reales de rutatramite.com con banda de
// título, diapositivas de texto de marca y CTA final. Ensamblaje con ffmpeg.
// Uso: node scripts/video/render-videos-v2.mjs [--only id] [--out-dir ruta]

import { mkdir, writeFile } from "node:fs/promises";
import { existsSync } from "node:fs";
import path from "node:path";
import process from "node:process";
import { execFile as execFileCb } from "node:child_process";
import { promisify } from "node:util";
import { fileURLToPath } from "node:url";
import { chromium } from "@playwright/test";
import { VIDEOS_V2, CREDITOS_FOTOS, MARCA_V2 } from "./videos-v2.mjs";

const execFile = promisify(execFileCb);

const RAIZ = fileURLToPath(new URL("../../", import.meta.url));
const OUT_DIR_DEFAULT = path.join(RAIZ, "videos", "empadronamiento-20260925");
const IMG_DIR = path.join(OUT_DIR_DEFAULT, "_img");
const XF = 0.4;

// --- CSS común (tipografía y paleta de DESIGN.md) ---
const CSS_BASE = `
  * { margin: 0; padding: 0; box-sizing: border-box; }
  html, body { width: 1080px; height: 1920px; }
  body {
    font-family: "Public Sans", "Segoe UI", Arial, sans-serif;
    color: #252B26; background: #FFFFFF;
    -webkit-font-smoothing: antialiased;
  }
  .serif { font-family: "Newsreader", Georgia, "Times New Roman", serif; }
  .frame { height: 100%; display: flex; flex-direction: column; padding: 84px 90px; }
  .frame > * { min-width: 0; max-width: 100%; }
`;

const FONTS_LINK = `
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Newsreader:opsz,wght@6..72,600;6..72,700&family=Public+Sans:wght@400;600;700;800&display=swap" rel="stylesheet">
`;

function escapeHtml(s) {
  return String(s).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");
}

function conEnfasis(texto, frases = []) {
  let resultado = escapeHtml(texto);
  for (const frase of frases) {
    const escapo = escapeHtml(frase).replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
    resultado = resultado.replace(new RegExp(escapo), (m) => `<span class="em">${m}</span>`);
  }
  return resultado;
}

function pagina(titulo, estilos, contenido) {
  return `<!doctype html><html lang="es"><head><meta charset="utf-8">${FONTS_LINK}
  <title>${escapeHtml(titulo)}</title><style>${CSS_BASE}${estilos}</style></head>
  <body>${contenido}</body></html>`;
}

// Overlay transparente para diapositivas de foto: velo inferior para legibilidad
// y texto anclado abajo (blanco; énfasis en verde claro de la paleta de marca).
export function slideFotoFg(slide) {
  return pagina("foto-fg", `
    body { background: transparent; }
    .velo {
      position: absolute; inset: 0;
      background: linear-gradient(180deg, rgba(8,14,10,0.55) 0%, rgba(8,14,10,0.05) 16%,
        rgba(8,14,10,0.12) 46%, rgba(8,14,10,0.82) 100%);
    }
    .contenido { position: relative; height: 100%; display: flex; flex-direction: column; padding: 84px 90px; }
    .contenido > * { min-width: 0; max-width: 100%; }
    .cab { display: flex; justify-content: space-between; align-items: baseline; }
    .marca { font-size: 34px; font-weight: 600; color: #FFFFFF; }
    .independiente { font-size: 29px; color: rgba(255,255,255,0.78); }
    .bloque { margin-top: auto; }
    .kicker { font-size: 36px; font-weight: 700; letter-spacing: 6px; text-transform: uppercase; color: #95D5B2; }
    .titulo { margin-top: 30px; font-weight: 700; font-size: 104px; line-height: 1.06; letter-spacing: -1px; color: #FFFFFF; }
    .titulo .em { color: #95D5B2; }
    .cuerpo { margin-top: 38px; font-size: 44px; line-height: 1.35; color: rgba(255,255,255,0.92); }
    .nota { margin-top: 44px; padding-top: 30px; border-top: 2px solid rgba(255,255,255,0.35); font-size: 27px; color: rgba(255,255,255,0.75); }
  `, `
    <div class="velo"></div>
    <div class="contenido">
      <div class="cab"><div class="marca">${MARCA_V2.sitio}</div><div class="independiente">guía independiente</div></div>
      <div class="bloque">
        ${slide.kicker ? `<div class="kicker">${escapeHtml(slide.kicker)}</div>` : ""}
        <h1 class="titulo serif">${conEnfasis(slide.titulo, slide.enfasis)}</h1>
        ${slide.cuerpo ? `<p class="cuerpo">${escapeHtml(slide.cuerpo)}</p>` : ""}
        <div class="nota">${MARCA_V2.notaFoto}</div>
      </div>
    </div>`);
}

// Overlay transparente para capturas: banda superior de título y pie inferior.
export function slideCapturaFg(slide) {
  return pagina("captura-fg", `
    body { background: transparent; }
    .banda {
      position: absolute; top: 64px; left: 48px; right: 48px;
      background: #1B4332; border-radius: 8px; padding: 34px 44px;
      box-shadow: 0 2px 0 rgba(8,14,10,0.25);
    }
    .banda .k { font-size: 26px; font-weight: 700; letter-spacing: 5px; text-transform: uppercase; color: #95D5B2; }
    .banda .t { margin-top: 10px; font-size: 54px; font-weight: 700; color: #FFFFFF; line-height: 1.1; }
    .pie {
      position: absolute; left: 0; right: 0; bottom: 0; padding: 120px 90px 64px;
      background: linear-gradient(180deg, rgba(8,14,10,0) 0%, rgba(8,14,10,0.85) 55%);
    }
    .pie .cuerpo { font-size: 44px; line-height: 1.35; color: #FFFFFF; }
    .pie .cuerpo .em { color: #95D5B2; }
    .pie .nota { margin-top: 24px; font-size: 26px; color: rgba(255,255,255,0.72); }
  `, `
    <div class="banda"><div class="k">rutatramite.com</div><div class="t serif">${escapeHtml(slide.banda)}</div></div>
    <div class="pie"><p class="cuerpo">${escapeHtml(slide.cuerpo)}</p><div class="nota">${MARCA_V2.notaFoto}</div></div>`);
}

// Diapositiva de texto opaca, estilo serie 1 (fondo blanco de marca).
export function slideTexto(slide) {
  return pagina("texto", `
    .regla { width: 130px; height: 8px; background: #2D6A4F; margin-top: 120px; }
    .num { margin-top: 34px; font-size: 44px; font-weight: 800; letter-spacing: 5px; color: #2D6A4F; }
    .titulo { margin-top: 30px; font-weight: 700; font-size: 92px; line-height: 1.07; color: #1B4332; letter-spacing: -0.5px; }
    .cuerpo { margin-top: 44px; font-size: 45px; line-height: 1.38; color: #3C443E; }
    .nota { margin-top: auto; padding-top: 36px; border-top: 3px solid #E5EDE7; font-size: 30px; color: #5F6B62; }
  `, `
    <div class="frame">
      <div class="regla"></div>
      <div class="num">${escapeHtml(slide.numero)}</div>
      <h2 class="titulo serif">${escapeHtml(slide.titulo)}</h2>
      <p class="cuerpo">${escapeHtml(slide.cuerpo)}</p>
      <div class="nota">Guía independiente · el alta en el padrón es gratuita</div>
    </div>`);
}

// CTA final: verde de marca con URL y línea de créditos de las fotos usadas.
export function slideCtaV2(slide, creditos) {
  return pagina("cta", `
    body { background: #1B4332; color: #FFFFFF; }
    .centro { height: 100%; display: flex; flex-direction: column; padding: 84px 90px; }
    .centro > * { min-width: 0; max-width: 100%; }
    .cab { display: flex; justify-content: space-between; align-items: baseline; }
    .marca { font-size: 34px; font-weight: 600; color: #FFFFFF; }
    .independiente { font-size: 29px; color: #95D5B2; }
    .titulo { margin-top: 200px; font-weight: 700; font-size: 108px; line-height: 1.08; letter-spacing: -1px; color: #FFFFFF; }
    .caja-url { margin-top: 64px; background: #F3F6F4; border-radius: 6px; padding: 44px 52px; }
    .caja-url .ruta { font-size: 44px; font-weight: 700; color: #1B4332; line-height: 1.3; word-break: break-word; }
    .creditos { margin-top: auto; padding-top: 30px; border-top: 2px solid rgba(255,255,255,0.3); font-size: 24px; line-height: 1.45; color: rgba(255,255,255,0.75); }
  `, `
    <div class="centro">
      <div class="cab"><div class="marca">${MARCA_V2.sitio}</div><div class="independiente">guía independiente</div></div>
      <h2 class="titulo serif">${escapeHtml(slide.titulo)}</h2>
      <div class="caja-url"><div class="ruta">${escapeHtml(slide.ruta)}</div></div>
      <div class="creditos">Fotos: ${creditos.map((c) => `${c.autor} (${c.licencia})`).join(" · ")}</div>
    </div>`);
}

function resolverImg(referencia, dirBase) {
  const opciones = Array.isArray(referencia) ? referencia : [referencia];
  for (const rel of opciones) {
    const abs = path.join(dirBase, rel);
    if (existsSync(abs)) return abs;
  }
  return null;
}

async function capturar(page, html, destino, transparente) {
  await page.goto("data:text/html;charset=utf-8," + encodeURIComponent(html), { waitUntil: "networkidle" });
  await page.evaluate(() => document.fonts.ready);
  await page.evaluate(() => {
    const reducir = (el, minPx) => {
      let size = parseFloat(getComputedStyle(el).fontSize);
      while (el.scrollWidth > el.clientWidth + 1 && size > minPx) {
        size -= 2;
        el.style.fontSize = `${size}px`;
      }
    };
    document.querySelectorAll(".titulo, .t, .cuerpo").forEach((el) => reducir(el, 56));
    let vueltas = 0;
    while (document.body.scrollHeight > 1920 && vueltas < 80) {
      vueltas += 1;
      document.querySelectorAll(".titulo").forEach((el) => {
        const size = parseFloat(getComputedStyle(el).fontSize);
        if (size > 64) el.style.fontSize = `${size - 2}px`;
      });
    }
  });
  await page.waitForTimeout(150);
  await page.screenshot({ path: destino, type: "png", omitBackground: transparente });
}

// Prepara el fondo de foto: recorte «cover» a 2160×3840 para el efecto Ken Burns.
async function prepararFondoFoto(origen, destino) {
  await execFile("ffmpeg", [
    "-y", "-v", "error", "-i", origen,
    "-vf", "scale=2160:3840:force_original_aspect_ratio=increase:flags=lanczos,crop=2160:3840",
    "-frames:v", "1", destino,
  ]);
}

function filtroZoom(tipo, duracion) {
  const fps = 30;
  const pasos = Math.round(duracion * fps);
  if (tipo === "out") {
    return `zoompan=z='if(lte(on,1),1.10,max(zoom-0.0009,1.0))':x='iw/2-(iw/zoom/2)':y='ih/2-(ih/zoom/2)':d=1:s=1080x1920:fps=${fps}`;
  }
  return `zoompan=z='min(zoom+0.0009,1.10)':x='iw/2-(iw/zoom/2)':y='ih/2-(ih/zoom/2)':d=1:s=1080x1920:fps=${fps},trim=duration=${duracion.toFixed(3)}`;
}

function comandoMontaje(segmentos, salida) {
  // segmentos: [{ tipo: 'foto'|'captura'|'plano', bg, fg?, dur, zoom? }]
  const args = ["-y"];
  const fondos = [];
  const capas = [];
  let numEntradas = 0; // índice de entrada de ffmpeg, distinto de la posición en argv
  segmentos.forEach((s) => {
    args.push("-loop", "1", "-framerate", "30", "-t", s.dur.toFixed(3), "-i", s.bg);
    fondos.push(numEntradas);
    numEntradas += 1;
    if (s.fg) {
      args.push("-loop", "1", "-framerate", "30", "-t", s.dur.toFixed(3), "-i", s.fg);
      capas.push(numEntradas);
      numEntradas += 1;
    } else {
      capas.push(null);
    }
  });

  const partes = [];
  segmentos.forEach((s, i) => {
    if (s.tipo === "foto") {
      partes.push(`[${fondos[i]}:v]${filtroZoom(s.zoom, s.dur)},setsar=1,format=yuv420p[b${i}]`);
    } else {
      partes.push(`[${fondos[i]}:v]scale=1080:1920:flags=lanczos,setsar=1,fps=30,format=yuv420p[b${i}]`);
    }
    if (s.fg) {
      partes.push(`[${capas[i]}:v]scale=1080:1920:flags=lanczos,format=rgba[f${i}]`);
      partes.push(`[b${i}][f${i}]overlay=0:0:format=auto[o${i}]`);
    }
  });

  const conOverlay = segmentos.map((s, i) => (s.fg ? `o${i}` : `b${i}`));
  let anterior = conOverlay[0];
  let offset = segmentos[0].dur - XF;
  for (let i = 1; i < segmentos.length; i++) {
    const etiqueta = `x${i}`;
    partes.push(`[${anterior}][${conOverlay[i]}]xfade=transition=fade:duration=${XF}:offset=${offset.toFixed(3)}[${etiqueta}]`);
    anterior = etiqueta;
    offset += segmentos[i].dur - XF;
  }
  const total = segmentos.reduce((a, s) => a + s.dur, 0) - (segmentos.length - 1) * XF;
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
  const seleccion = solo ? VIDEOS_V2.filter((v) => solo.includes(v.id)) : VIDEOS_V2;
  if (seleccion.length === 0) {
    console.error(`Ningún vídeo coincide con --only. Disponibles: ${VIDEOS_V2.map((v) => v.id).join(", ")}`);
    process.exit(1);
  }

  const navegador = await chromium.launch();
  const context = await navegador.newContext({ viewport: { width: 1080, height: 1920 }, deviceScaleFactor: 2 });
  const page = await context.newPage();

  const creditosUsados = new Set();
  const resultados = [];
  for (const video of seleccion) {
    const dirSlides = path.join(outDir, "_slides", video.id);
    await mkdir(dirSlides, { recursive: true });

    const segmentos = [];
    let paso = 0;
    for (const slide of video.slides) {
      paso += 1;
      const prefijo = path.join(dirSlides, String(paso).padStart(2, "0"));

      if (slide.tipo === "foto") {
        const origen = resolverImg(slide.img, IMG_DIR);
        if (!origen) {
          throw new Error(`Foto no encontrada para ${video.id}#${paso}: ${JSON.stringify(slide.img)}`);
        }
        const bg = `${prefijo}-bg.png`;
        const fg = `${prefijo}-fg.png`;
        await prepararFondoFoto(origen, bg);
        await capturar(page, slideFotoFg(slide), fg, true);
        segmentos.push({ tipo: "foto", bg, fg, dur: slide.dur, zoom: slide.zoom });
        const apodo = path.basename(Array.isArray(slide.img) ? resolverImg(slide.img, IMG_DIR) : origen).replace(".jpg", "");
        if (CREDITOS_FOTOS[apodo]) creditosUsados.add(apodo);
      } else if (slide.tipo === "captura") {
        const origen = resolverImg(slide.img, IMG_DIR);
        if (!origen) {
          throw new Error(`Captura no encontrada para ${video.id}#${paso}: ${slide.img}`);
        }
        const fg = `${prefijo}-fg.png`;
        await capturar(page, slideCapturaFg(slide), fg, true);
        segmentos.push({ tipo: "captura", bg: origen, fg, dur: slide.dur });
      } else if (slide.tipo === "texto") {
        const plano = `${prefijo}-plano.png`;
        await capturar(page, slideTexto(slide), plano, false);
        segmentos.push({ tipo: "plano", bg: plano, dur: slide.dur });
      } else if (slide.tipo === "cta") {
        const fotos = [...creditosUsados].filter((a) => video.slides.some((s) => {
          if (s.tipo !== "foto") return false;
          const abs = resolverImg(s.img, IMG_DIR);
          return abs && path.basename(abs).replace(".jpg", "") === a;
        }));
        const plano = `${prefijo}-plano.png`;
        await capturar(page, slideCtaV2(slide, fotos.map((a) => CREDITOS_FOTOS[a])), plano, false);
        segmentos.push({ tipo: "plano", bg: plano, dur: slide.dur });
      }
    }

    const salidaMp4 = path.join(outDir, `${video.id}.mp4`);
    await execFile("ffmpeg", comandoMontaje(segmentos, salidaMp4), { maxBuffer: 64 * 1024 * 1024 });
    const info = await probe(salidaMp4);
    resultados.push({ id: video.id, archivo: salidaMp4, ...info });
    console.log(`✔ ${video.id} — ${info.duracion}s, ${info.ancho}×${info.alto}, ${info.tamanoMb} MB`);
  }

  await navegador.close();

  await writeFile(
    path.join(outDir, "creditos.json"),
    JSON.stringify({ generado: new Date().toISOString(), fotos: [...creditosUsados].map((a) => CREDITOS_FOTOS[a]) }, null, 2),
    "utf8",
  );
  await writeFile(
    path.join(outDir, "resumen-render-v2.json"),
    JSON.stringify({ generado: new Date().toISOString(), resultados }, null, 2),
    "utf8",
  );
  console.log("\nCréditos y resumen escritos en", outDir);
}

const esPuntoEntrada = process.argv[1] && import.meta.url === new URL(`file:///${path.resolve(process.argv[1]).replace(/\\/g, "/")}`).href;
if (esPuntoEntrada) {
  main().catch((error) => {
    console.error(error);
    process.exit(1);
  });
}
