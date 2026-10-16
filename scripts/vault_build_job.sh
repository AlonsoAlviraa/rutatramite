#!/usr/bin/env bash
set -euo pipefail
mkdir -p docs
npm ci --no-audit --no-fund
cat > tests/zz-vault-gen-llms.test.ts <<'T'
import fs from "node:fs";
import { it } from "vitest";
import { renderLlmsTxt } from "@/lib/seo/llms";
it("gen public/llms.txt", () => { fs.writeFileSync("public/llms.txt", renderLlmsTxt()); });
T
npx vitest run tests/zz-vault-gen-llms.test.ts --reporter=dot
rm -f tests/zz-vault-gen-llms.test.ts
npx vitest run --reporter=dot > docs/vault-pretest.log 2>&1 || { echo VAULT_PRETEST_FAILED; exit 3; }
bash scripts/build_linux_job.sh
