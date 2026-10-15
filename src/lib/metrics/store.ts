import { DatabaseSync } from "node:sqlite";
import path from "node:path";
import fs from "node:fs";
import type { MetricEvent } from "@/lib/metrics/events";

export function metricDay(now = new Date()) { return new Intl.DateTimeFormat("sv-SE", { timeZone: "Europe/Madrid", year:"numeric",month:"2-digit",day:"2-digit" }).format(now); }
export function recordMetric(file: string, event: MetricEvent, page: string, now = new Date()) {
  if (!path.isAbsolute(file)) throw new Error("Metrics path must be absolute");
  fs.mkdirSync(path.dirname(file), { recursive: true, mode: 0o700 });
  const db = new DatabaseSync(file);
  fs.chmodSync(file, 0o600);
  try {
    db.exec("PRAGMA busy_timeout=1000; CREATE TABLE IF NOT EXISTS daily_counts (day TEXT NOT NULL, path TEXT NOT NULL, event TEXT NOT NULL, count INTEGER NOT NULL CHECK(count>=0), PRIMARY KEY(day,path,event));");
    db.prepare("INSERT INTO daily_counts(day,path,event,count) VALUES(?,?,?,1) ON CONFLICT(day,path,event) DO UPDATE SET count=count+1").run(metricDay(now),page,event);
    const cutoff = new Date(Date.parse(metricDay(now)+"T12:00:00Z")-179*86400000).toISOString().slice(0,10);
    db.prepare("DELETE FROM daily_counts WHERE day < ?").run(cutoff);
  } finally { db.close(); }
}
