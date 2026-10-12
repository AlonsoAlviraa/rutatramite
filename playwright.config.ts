import fs from "node:fs";
import { defineConfig, devices } from "@playwright/test";

function packageManager(): "npm" | "pnpm" | "yarn" | "bun" {
  if (fs.existsSync("pnpm-lock.yaml")) return "pnpm";
  if (fs.existsSync("yarn.lock")) return "yarn";
  if (fs.existsSync("bun.lock") || fs.existsSync("bun.lockb")) return "bun";
  return "npm";
}

function startCommand(): string {
  if (process.env.PLAYWRIGHT_WEB_COMMAND) return process.env.PLAYWRIGHT_WEB_COMMAND;
  switch (packageManager()) {
    case "pnpm":
      return "pnpm start";
    case "yarn":
      return "yarn start";
    case "bun":
      return "bun run start";
    default:
      return "npm start";
  }
}

const port = Number(process.env.PORT || 3000);
const baseURL = process.env.PLAYWRIGHT_BASE_URL || `http://127.0.0.1:${port}`;

export default defineConfig({
  testDir: "e2e",
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 1 : 0,
  workers: process.env.CI ? 2 : undefined,
  timeout: 60_000,
  expect: { timeout: 15_000 },
  reporter: process.env.CI
    ? [["list"], ["html", { open: "never", outputFolder: "playwright-report" }]]
    : "list",
  use: {
    baseURL,
    trace: "retain-on-failure",
    screenshot: "only-on-failure",
    video: "retain-on-failure",
  },
  projects: [
    { name: "desktop", use: { ...devices["Desktop Chrome"] } },
    { name: "mobile", use: { ...devices["Pixel 5"] } },
  ],
  webServer: process.env.PLAYWRIGHT_BASE_URL
    ? undefined
    : {
        command: startCommand(),
        url: baseURL,
        reuseExistingServer: !process.env.CI,
        timeout: 120_000,
      },
});
