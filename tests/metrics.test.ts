import { afterEach, describe, it, expect, vi } from "vitest";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import { DatabaseSync } from "node:sqlite";
import { recordMetric, metricDay } from "@/lib/metrics/store";
import { metricPayload } from "@/lib/metrics/validation";
import { POST } from "@/app/api/metricas/route";
const dirs: string[]=[];
function temporaryDb() { const dir=fs.mkdtempSync(path.join(os.tmpdir(),"rt-metrics-test-")); dirs.push(dir); return path.join(dir,"counts.sqlite"); }
afterEach(()=>{ vi.unstubAllEnvs(); for(const dir of dirs.splice(0)) fs.rmSync(dir,{recursive:true,force:true}); });
function request(body:unknown,headers:Record<string,string>={}) {return new Request("https://rutatramite.com/api/metricas",{method:"POST",headers:{"content-type":"application/json",origin:"https://rutatramite.com",...headers},body:JSON.stringify(body)});}
describe("aggregate metrics privacy and failure",()=>{
  it("accepts only enumerated events and known paths without extra data",()=>{
    expect(metricPayload({event:"page_view",path:"/"})).not.toBeNull();
    for(const body of [{event:"page_view",path:"/?dni=123"},{event:"arbitrary",path:"/"},{event:"page_view",path:"/",query:"private"},{event:"page_view",path:"/someone@example.com"}]) expect(metricPayload(body)).toBeNull();
  });
  it("increments aggregate rows and expires days beyond the retention window",()=>{
    const file=temporaryDb(); recordMetric(file,"page_view","/",new Date("2025-01-01T12:00:00Z"));
    const now=new Date("2026-09-14T22:30:00Z");
    recordMetric(file,"page_view","/",now);recordMetric(file,"page_view","/",now);
    expect(metricDay(now)).toBe("2026-09-15");
    const db=new DatabaseSync(file,{readOnly:true});
    expect(db.prepare("SELECT * FROM daily_counts").all()).toEqual([{day:"2026-09-15",path:"/",event:"page_view",count:2}]);
    expect(db.prepare("PRAGMA table_info(daily_counts)").all().map(r=>r.name)).toEqual(["day","path","event","count"]);db.close();
  });
  it("rejects cross-origin, unknown data and oversized input",async()=>{
    expect((await POST(request({event:"page_view",path:"/"},{origin:"https://example.org"}))).status).toBe(403);
    expect((await POST(request({event:"page_view",path:"/",answer:"private"}))).status).toBe(400);
    expect((await POST(request({event:"page_view",path:"/",answer:"x".repeat(1500)}))).status).toBe(413);
  });
  it("excludes tests and bots and reports storage failure without writing",async()=>{
    vi.stubEnv("METRICS_DB_PATH","");
    for(const headers of ([{"user-agent":"Googlebot"},{"x-rutatramite-test":"1"},{dnt:"1"}] as Record<string,string>[])) expect((await POST(request({event:"page_view",path:"/"},headers))).status).toBe(204);
    expect((await POST(request({event:"page_view",path:"/"}))).status).toBe(503);
  });
  it("stores only the aggregate despite incidental transport headers",async()=>{
    const file=temporaryDb();vi.stubEnv("METRICS_DB_PATH",file);
    expect((await POST(request({event:"download_click",path:"/descargas"},{"x-forwarded-for":"192.0.2.1",referer:"https://example.org/private"}))).status).toBe(204);
    const db=new DatabaseSync(file,{readOnly:true});const rows=db.prepare("SELECT * FROM daily_counts").all();db.close();
    expect(JSON.stringify(rows)).not.toMatch(/192\.0|example.org|private/);
    expect(rows[0].count).toBe(1);
  });
});
