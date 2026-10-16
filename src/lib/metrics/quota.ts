// Process-wide on purpose: this counter is not keyed by client.
export const METRIC_BODIES_PER_MINUTE = 120;
let minute = 0;
let count = 0;

export function resetMetricQuota() {
  minute = 0;
  count = 0;
}

export function metricQuotaExceeded(now = Date.now()) {
  const current = Math.floor(now / 60000);
  if (current !== minute) {
    minute = current;
    count = 0;
  }
  return ++count > METRIC_BODIES_PER_MINUTE;
}