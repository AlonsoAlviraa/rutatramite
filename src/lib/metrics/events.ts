export const METRIC_EVENTS = ["page_view", "search_results", "search_no_results", "wizard_start", "wizard_complete", "model_copy", "download_click", "official_link_click"] as const;
export type MetricEvent = typeof METRIC_EVENTS[number];
export function sendMetric(event: MetricEvent) {
  if (typeof window === "undefined" || navigator.webdriver || navigator.doNotTrack === "1") return;
  // Send no query string, referrer, identifiers, search terms or wizard answers.
  void fetch("/api/metricas", { method: "POST", headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ event, path: window.location.pathname }), credentials: "omit", referrerPolicy: "no-referrer", keepalive: true }).catch(()=>{});
}
