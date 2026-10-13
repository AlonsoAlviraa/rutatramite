import { describe,expect,it } from "vitest";
import { renderToStaticMarkup } from "react-dom/server";
import { DocumentFees } from "@/components/tramites/DocumentFees";

describe("answers for observed document-fee searches",()=>{
  it.each([true,false])("keeps official fees, exceptions and actionable sources visible, passport=%s",passport=>{
    const html=renderToStaticMarkup(<DocumentFees passport={passport}/>);
    expect(html).toContain(passport ? "hacer o renovar el pasaporte" : "renovar el DNI en 2026");
    for (const text of ["12 €","30 €","documento en vigor","menores de 14","familia numerosa","2026-09-14"]) expect(html).toContain(text);
    expect(html).toContain('href="https://www.citapreviadnie.es/"');
    expect(html).toContain('href="https://www.boe.es/diario_boe/txt.php?id=BOE-A-2023-18093"');
    expect(html).toContain("precio fijo por llamada");
    expect(html).toContain("REF_480"); expect(html).toContain("REF_1086");
  });
});
