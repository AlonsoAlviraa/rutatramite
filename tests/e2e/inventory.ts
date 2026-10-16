import fs from "node:fs";
export type Inventory={build_id:string;pages:{path:string;indexable:boolean;title:string}[];targets:string[];pdfs:{file:string;bytes:number;sha256:string}[]};
export function inventory():Inventory {
  const file=process.env.E2E_INVENTORY ?? "docs/e2e-inventory.json";
  if(!fs.existsSync(file))throw new Error(`Missing build inventory: ${file}. Run scripts/build_e2e_inventory.py against the tested build.`);
  return JSON.parse(fs.readFileSync(file,"utf8"));
}
