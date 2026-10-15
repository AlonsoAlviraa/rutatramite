import { test,expect,type Page } from "@playwright/test";
import axe from "axe-core";

const pageErrors = new WeakMap<Page, string[]>();
test.beforeEach(async({page})=>{ const errors:string[]=[];pageErrors.set(page,errors);page.on("pageerror",error=>errors.push(error.message));page.on("requestfailed",request=>{if(['script','stylesheet','font'].includes(request.resourceType()))errors.push(`${request.resourceType()}: ${request.url()} ${request.failure()?.errorText}`);}); });
test.afterEach(async({page})=>{ expect(pageErrors.get(page) ?? []).toEqual([]); });
async function wizard(page:Page,municipio:string,procedure:string,nationality="espanola") {
  await page.goto('/empadronarse');
  const form=page.getByRole('form',{name:'Asistente de empadronamiento'});
  await expect(form.getByRole('button',{name:'Continuar',exact:true})).toBeDisabled();
  await form.getByRole('combobox',{name:'Municipio',exact:true}).fill(municipio);
  await form.getByRole('option').first().click();
  await form.getByRole('button',{name:'Continuar',exact:true}).click();
  for(const [name,value] of [['housing','contrato'],['nacionalidad',nationality],['nieTie','false'],['menores','false']]) {
    await form.locator(`input[name="${name}"][value="${value}"]`).check();
    await form.getByRole('button',{name:'Continuar',exact:true}).click();
  }
  await form.locator(`input[name="tramite"][value="${procedure}"]`).check();
  await form.getByRole('button',{name:'Ver mi guía',exact:true}).click();
  await expect(form.locator('[data-wizard-output]')).toBeVisible();return form;
}
test('directory search, empty state and selected guide',async({page})=>{
  await page.goto('/');const search=page.getByRole('searchbox').first();
  await search.fill('zzzzinexistente');await expect(page.getByText('No encontramos coincidencias.',{exact:false})).toBeVisible();
  await search.fill('DNI');await expect(page.locator('.directory-results a').first()).toBeVisible();
  const href=await page.locator('.directory-results a').first().getAttribute('href');await page.locator('.directory-results a').first().click();
  await expect(page).toHaveURL(new RegExp(href!.replace(/[.*+?^${}()|[\]\\]/g,'\\$&')+'$'));await expect(page.locator('main h1')).toBeVisible();
});
for(const procedure of ['alta','cambio','certificado','volante','renovacion']) test(`wizard Madrid ${procedure}`,async({page})=>{
  const form=await wizard(page,'28079',procedure);const checklist=form.locator('[data-checklist]');
  if(['certificado','volante','renovacion'].includes(procedure)) await expect(checklist).not.toContainText('Hoja padronal');
  if(procedure==='renovacion')await expect(checklist).toContainText('no corresponde');
  if(procedure==='alta')await expect(checklist).toContainText('referencia catastral');
  await form.getByRole('button',{name:'Revisar mis respuestas'}).click();await expect(form.getByRole('combobox')).toBeVisible();
});
test('unverified municipal data and missing documents remain explicit',async({page})=>{
  const form=await wizard(page,'30024','alta');
  await expect(form.locator('[data-wizard-output]')).toContainText('no está verificada');
  await expect(form.locator('[data-checklist]')).toContainText('No hemos comprobado');
});
test('municipality picker supports keyboard and invalidation',async({page})=>{
  await page.goto('/empadronarse');const form=page.getByRole('form',{name:'Asistente de empadronamiento'});const input=form.getByRole('combobox');
  await input.fill('28079');await input.press('ArrowDown');await input.press('Enter');await expect(form.getByText('Seleccionado:',{exact:false})).toBeVisible();
  await input.fill('zzzzinexistente');await expect(form.getByRole('button',{name:'Continuar',exact:true})).toBeDisabled();await expect(form.getByText('No encontramos ese municipio.',{exact:false})).toBeVisible();
});
test('aid filters distinguish territories, phase and no matching records',async({page})=>{
  await page.goto('/ayudas');await page.getByRole('combobox',{name:'Comunidad autónoma',exact:true}).selectOption('aragon');
  await page.getByRole('combobox',{name:'Categoría',exact:true}).selectOption('alquiler');await page.getByRole('combobox',{name:'Fase',exact:true}).selectOption('solicitud');
  await expect(page.getByText('No hay registros que coincidan',{exact:false})).toBeVisible();
  await page.getByRole('combobox',{name:'Comunidad autónoma',exact:true}).selectOption('comunidad-de-madrid');await expect(page.locator('[data-aid="bono-madrid"]')).toBeVisible();
  await expect(page.locator('[data-aid="bono-andalucia"]')).toHaveCount(0);
});
test('regional rental expansion keeps open and closed applications distinct',async({page})=>{
  await page.goto('/ayudas');
  await page.getByRole('combobox',{name:'Comunidad autónoma',exact:true}).selectOption('illes-balears');
  await page.getByRole('combobox',{name:'Categoría',exact:true}).selectOption('alquiler');
  await page.getByRole('combobox',{name:'Fase',exact:true}).selectOption('solicitud');
  await expect(page.locator('[data-aid="bono-baleares-2026"]')).toBeVisible();
  await expect(page.locator('[data-aid="bono-valenciana-2026"]')).toHaveCount(0);
  await page.getByRole('combobox',{name:'Comunidad autónoma',exact:true}).selectOption('comunidad-valenciana');
  await expect(page.getByText('No hay registros que coincidan',{exact:false})).toBeVisible();
  await page.getByRole('combobox',{name:'Fase',exact:true}).selectOption('cerrada');
  await expect(page.locator('[data-aid="bono-valenciana-2026"]')).toBeVisible();
  await page.goto('/alquiler/ayudas-por-comunidad');
  await expect(page.locator('main h1')).toContainText('Ayudas al alquiler por comunidad');
  await expect(page.getByRole('heading',{name:'Emanzipa: ayuda al alquiler joven en Navarra',exact:true})).toBeVisible();
});
test('document checklist changes requirements with procedure',async({page})=>{
  await page.goto('/dni/checklist');await page.getByRole('combobox',{name:'Procedimiento',exact:true}).selectOption('pasaporte-menor');
  await expect(page.getByText('Presencia del menor y consentimiento',{exact:false})).toBeVisible();
  await page.getByRole('combobox',{name:'Procedimiento',exact:true}).selectOption('dni-primero');
  await expect(page.getByText('Certificación de nacimiento para DNI de hasta seis meses',{exact:false})).toBeVisible();
});
test('copy success and clipboard failure both preserve usable model',async({page})=>{
  await page.addInitScript(()=>{Object.defineProperty(navigator,'clipboard',{configurable:true,value:{writeText:async()=>{}}});});
  await page.goto('/inventario-fianza-alquiler');const model=page.locator('[data-modelo]').first();
  await model.getByRole('button').click();await expect(model.getByRole('status')).toContainText('Texto copiado');
  await page.evaluate(()=>{Object.defineProperty(navigator,'clipboard',{configurable:true,value:{writeText:async()=>{throw new Error('test-denied');}}});});
  await model.getByRole('button').click();await expect(model.getByRole('status')).toContainText('manualmente');await expect(model.locator('pre')).toBeVisible();
});
test('404 remains navigable if search backend fails',async({page})=>{
  await page.route('**/api/guias',route=>route.fulfill({status:503,body:'unavailable'}));
  const response=await page.goto('/no-existe-e2e');expect(response?.status()).toBe(404);
  await expect(page.getByRole('status')).toContainText('El buscador no está disponible');
  await page.getByRole('link',{name:'Ver todos los trámites'}).click();await expect(page.locator('main h1')).toBeVisible();
});
test('metrics outage does not prevent useful actions',async({page})=>{
  let requests=0;
  await page.addInitScript(()=>Object.defineProperty(navigator,'webdriver',{get:()=>false}));
  await page.route('**/api/metricas',route=>{requests++;return route.fulfill({status:503,body:''});});
  await page.goto('/');await page.getByRole('searchbox').first().fill('becas');await expect(page.locator('.directory-results a').first()).toBeVisible();
  await expect.poll(()=>requests).toBeGreaterThan(0);
});
for(const width of [320,768,1440]) for(const path of ['/','/recursos/padron-municipal','/ayudas','/dni/checklist','/inventario-fianza-alquiler','/empadronarse']) test(`layout and accessibility ${width} ${path}`,async({page},info)=>{
  await page.setViewportSize({width,height:900});await page.goto(path,{waitUntil:'load'});
  expect(await page.evaluate(()=>document.documentElement.scrollWidth>innerWidth+1)).toBe(false);
  await page.addScriptTag({content:axe.source});
  const audit=await page.evaluate(async()=>{const r=await (window as unknown as {axe:typeof axe}).axe.run(document,{runOnly:{type:'tag',values:['wcag2a','wcag2aa','wcag21a','wcag21aa']}});return {passes:r.passes.map(r=>r.id),violations:r.violations,incomplete:r.incomplete};});
  await info.attach('axe',{body:JSON.stringify(audit),contentType:'application/json'});expect(audit.violations).toEqual([]);
  await page.screenshot({path:info.outputPath('page.png'),fullPage:true});
});
test('keyboard skip link and 200 percent content scaling',async({page})=>{
  await page.setViewportSize({width:1280,height:900});await page.goto('/');await page.keyboard.press('Tab');
  await expect(page.getByRole('link',{name:'Saltar al contenido'})).toBeFocused();await page.keyboard.press('Enter');
  await page.addStyleTag({content:'html { zoom: 2; }'});
  await expect(page.locator('main h1')).toBeVisible();expect(await page.evaluate(()=>document.documentElement.scrollWidth>innerWidth+1)).toBe(false);
});
test('mobile navigation opens, closes with Escape and follows a section',async({page})=>{
  await page.setViewportSize({width:390,height:900});await page.goto('/');
  const toggle=page.getByRole('button',{name:'Menú',exact:true});await toggle.click();
  const nav=page.getByRole('navigation',{name:'Secciones'});await expect(nav).toBeVisible();
  await page.getByRole('button',{name:'Cerrar',exact:true}).press('Escape');await expect(toggle).toBeFocused();await expect(toggle).toHaveAttribute('aria-expanded','false');
  await toggle.click();await nav.getByRole('link',{name:'Ayudas y plazos'}).click();await expect(page).toHaveURL(/\/ayudas$/);
});
