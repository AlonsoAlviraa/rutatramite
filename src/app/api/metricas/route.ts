import { recordMetric } from "@/lib/metrics/store";
import { metricQuotaExceeded } from "@/lib/metrics/quota";
import { excludedMetrics, metricPayload } from "@/lib/metrics/validation";
export const runtime = "nodejs";
export const dynamic = "force-dynamic";
const reply = (status: number) => new Response(null, { status, headers: { "Cache-Control":"no-store", "X-Robots-Tag":"noindex" } });
export async function POST(request: Request) {
  if (excludedMetrics(request.headers)) return reply(204);
  const origin = request.headers.get("origin");
  const permitted = new Set([new URL(request.url).origin, "https://rutatramite.com"]);
  if (!origin || !permitted.has(origin)) return reply(403);
  if (!request.headers.get("content-type")?.startsWith("application/json")) return reply(415);
  if (metricQuotaExceeded()) return reply(429);
  try {
    const reader = request.body?.getReader();
    if (!reader) return reply(400);
    let bytes=0, text=""; const decoder=new TextDecoder();
    while (true) { const chunk=await reader.read(); if(chunk.done) break; bytes+=chunk.value.byteLength;
      if(bytes>1024) { await reader.cancel(); return reply(413); } text+=decoder.decode(chunk.value,{stream:true}); }
    text+=decoder.decode();
    let parsed: unknown; try { parsed=JSON.parse(text); } catch { return reply(400); }
    const payload=metricPayload(parsed);
    if (!payload) return reply(400);
    if (!process.env.METRICS_DB_PATH) return reply(503);
    recordMetric(process.env.METRICS_DB_PATH,payload.event,payload.path);
    return reply(204);
  } catch { return reply(503); }
}