import Ajv2020 from "ajv/dist/2020";
import addFormats from "ajv-formats";
import { loadSchema } from "@/lib/data/load";
import type { Municipio } from "@/lib/types";

let validator: ReturnType<Ajv2020["compile"]> | null = null;

export function getMunicipioValidator() {
  if (validator) return validator;
  const ajv = new Ajv2020({ allErrors: true, strict: false });
  addFormats(ajv);
  validator = ajv.compile(loadSchema());
  return validator;
}

export function validateMunicipio(data: Municipio): { ok: boolean; errors: string[] } {
  const v = getMunicipioValidator();
  const ok = v(data);
  const errors = (v.errors ?? []).map((e) => `${e.instancePath} ${e.message}`);
  return { ok: Boolean(ok), errors };
}
