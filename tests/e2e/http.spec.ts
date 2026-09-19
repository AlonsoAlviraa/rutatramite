import { test,expect } from "@playwright/test";
import { createHash } from "node:crypto";
import { inventory } from "./inventory";
const data=inventory();
for(const path of data.targets) test(`HTTP ${path}`,async({request})=>{ const r=await request.get(path);expect(r.status()).toBe(200); });
for(const pdf of data.pdfs) test(`PDF integrity ${pdf.file}`,async({request})=>{
  const r=await request.get('/'+pdf.file);const bytes=await r.body();
  expect(r.headers()["content-type"]).toContain("application/pdf");expect(r.headers()["x-robots-tag"]).toBe("noindex");
  expect(bytes.subarray(0,5).toString()).toBe("%PDF-");expect(bytes.length).toBe(pdf.bytes);
  expect(createHash("sha256").update(bytes).digest("hex")).toBe(pdf.sha256);
});
test("datasets and index retain their contracts",async({request})=>{
  const aids=await (await request.get('/datos/ayudas.json')).json();expect(aids.records).toHaveLength(8);expect(aids.coverage).toHaveLength(68);
  const csv=await (await request.get('/datos/ayudas.csv')).text();for(const row of aids.records)expect(csv).toContain(row.id);
  const padron=await (await request.get('/datos/padron-municipal.json')).json();expect(padron.records).toHaveLength(21);
  const pcsv=await (await request.get('/datos/padron-municipal.csv')).text();for(const row of padron.records)expect(pcsv).toContain(row.ine_code);
  expect((await request.get('/no-existe-e2e')).status()).toBe(404);
  expect((await request.get('/api/metricas')).status()).toBe(405);
});
