import { defineConfig } from "@playwright/test";
const run = process.env.E2E_RUN ?? new Date().toISOString().replace(/[:.]/g,"-");
export default defineConfig({
  testDir: "./tests/e2e", fullyParallel: true, workers: Number(process.env.E2E_WORKERS ?? 3), timeout: 45000,
  retries: 0, forbidOnly: true,
  outputDir: `tmp/e2e/${run}/artifacts`,
  reporter: [["line"],["json",{outputFile:`tmp/e2e/${run}/results.json`}],["html",{outputFolder:`tmp/e2e/${run}/report`,open:"never"}]],
  use: { baseURL: process.env.E2E_BASE ?? "http://127.0.0.1:8199", extraHTTPHeaders: {"x-rutatramite-test":"1"},
    trace:"retain-on-failure",screenshot:"only-on-failure",video:"retain-on-failure" },
  projects: [
    {name:"inventory-mobile",testMatch:/inventory.spec.ts/,use:{browserName:"chromium",viewport:{width:390,height:900},trace:"off",video:"off",screenshot:"off"}},
    {name:"inventory-desktop",testMatch:/inventory.spec.ts/,use:{browserName:"chromium",viewport:{width:1280,height:900},trace:"off",video:"off",screenshot:"off"}},
    ...(["chromium","firefox","webkit"] as const).map(browserName=>({name:browserName,testMatch:/journeys.spec.ts/,use:{browserName,viewport:{width:1280,height:900},...(browserName==='firefox'?{trace:{mode:'retain-on-failure' as const,snapshots:false,screenshots:false},video:'off' as const}:{})}})),
    {name:"http",testMatch:/http.spec.ts/}
  ]
});
