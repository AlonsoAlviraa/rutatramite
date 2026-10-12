import path from "node:path";
import { defineConfig } from "vitest/config";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  test: {
    environment: "node",
    include: ["tests/**/*.test.ts", "tests/**/*.test.tsx"],
    testTimeout: 180_000,
    hookTimeout: 180_000,
    teardownTimeout: 180_000,
    fileParallelism: false,
    coverage: {
      provider: "v8",
      reporter: ["text-summary", "json-summary", "lcov"],
      reportsDirectory: "coverage",
      include: ["src/**/*.{ts,tsx}"],
    },
  },
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "src"),
    },
  },
});
