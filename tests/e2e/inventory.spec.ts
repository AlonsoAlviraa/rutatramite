import { test as base,expect,type Page } from "@playwright/test";
import { inventory } from "./inventory";
// The inventory follows links in an ordinary browsing session, reusing static
// assets. Functional journeys retain fresh contexts in their separate suite.
const test=base.extend<{}, {inventoryPage:Page}>({
  inventoryPage:[async({browser},use,workerInfo)=>{
    const context=await browser.newContext({baseURL:process.env.E2E_BASE ?? 'http://127.0.0.1:8199',viewport:{width:workerInfo.project.name.includes('mobile')?390:1280,height:900},extraHTTPHeaders:{'x-rutatramite-test':'1'}});
    const page=await context.newPage();await use(page);await context.close();
  },{scope:'worker'}],
  page:async({inventoryPage},use,info)=>{
    await inventoryPage.context().tracing.start({screenshots:true,snapshots:true,sources:true});
    await use(inventoryPage);
    const failed=info.status!==info.expectedStatus;
    const trace=info.outputPath('inventory-trace.zip');
    await inventoryPage.context().tracing.stop(failed?{path:trace}:{});
    if(failed){await info.attach('trace',{path:trace,contentType:'application/zip'});await inventoryPage.screenshot({path:info.outputPath('failure.png'),fullPage:true});}
    inventoryPage.removeAllListeners('pageerror');inventoryPage.removeAllListeners('requestfailed');
  }
});
for(const row of inventory().pages) test(`render ${row.path}`,async({page},info)=>{
  const errors:string[]=[];page.on("pageerror",error=>errors.push(error.message));
  page.on("requestfailed",request=>{if(['script','stylesheet','font'].includes(request.resourceType()))errors.push(`${request.resourceType()}: ${request.url()} ${request.failure()?.errorText}`);});
  const response=await page.goto(row.path,{waitUntil:"load"});expect(response?.status()).toBe(200);
  await expect(page.locator("main h1")).toHaveCount(1);await expect(page.locator("main h1")).toBeVisible();
  await expect(page).toHaveTitle(row.title);
  expect(await page.evaluate(()=>document.documentElement.scrollWidth>innerWidth+1)).toBe(false);
  expect((await page.locator('link[rel="canonical"]').getAttribute("href"))?.replace(/\/$/,"")).toBe(`https://rutatramite.com${row.path==="/"?"":row.path}`);
  const robots=await page.locator('meta[name="robots"]').getAttribute("content");
  expect(robots?.includes("noindex")).toBe(!row.indexable);
  expect(errors).toEqual([]);
  await info.attach("render-evidence",{body:JSON.stringify({path:row.path,viewport:page.viewportSize(),status:response?.status(),javascriptErrors:errors}),contentType:"application/json"});
});
