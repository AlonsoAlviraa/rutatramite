import fs from "node:fs";
import path from "node:path";
import { METRIC_EVENTS, type MetricEvent } from "@/lib/metrics/events";
let routes: Set<string> | undefined;
function knownRoutes() {
  if (!routes) {
    const xml = fs.readFileSync(path.join(process.cwd(),"public/sitemap.xml"),"utf8");
    const index = JSON.parse(fs.readFileSync(path.join(process.cwd(),"data/municipios/_index.json"),"utf8")) as {path:string}[];
    routes = new Set([...Array.from(xml.matchAll(/<loc>([^<]+)<\/loc>/g),m=>new URL(m[1]).pathname), ...index.map(m=>m.path)]);
  }
  return routes;
}
export function metricPayload(body: unknown): { event: MetricEvent; path: string } | null {
  if (!body || typeof body !== "object" || Array.isArray(body)) return null;
  const row = body as Record<string,unknown>;
  if (Object.keys(row).sort().join(",") !== "event,path" || typeof row.path !== "string" || !knownRoutes().has(row.path) || !METRIC_EVENTS.includes(row.event as MetricEvent)) return null;
  return { event: row.event as MetricEvent, path: row.path };
}
export function excludedMetrics(headers: Headers) {
  return headers.has("x-rutatramite-test") || headers.get("dnt") === "1" || /bot|crawler|spider|headless|playwright|lighthouse|freecrawl|python|curl|wget/i.test(headers.get("user-agent") ?? "");
}
