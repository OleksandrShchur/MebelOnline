import { defineConfig, devices } from '@playwright/test';

/**
 * E2E prerequisites
 * -----------------
 * Unit/component tests (`npm test`) mock fetch and do **not** need SQL Server.
 *
 * These Playwright flows also mock `/api/*`, so they do **not** need a database.
 * They do need the Vite SPA:
 *
 *   cd mebelonline.client
 *   npm install
 *   npx playwright install chromium
 *   npm run test:e2e
 *
 * Optional live-API smoke (not the default): start the ASP.NET host with a
 * configured SQL Server connection string, then run against https://localhost:51347
 * without the route mocks. Missing connection string is a known backend gap.
 */
export default defineConfig({
  testDir: './e2e',
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0,
  use: {
    baseURL: 'http://127.0.0.1:5174',
    ignoreHTTPSErrors: true,
    trace: 'on-first-retry',
  },
  webServer: {
    command: 'npx vite --host 127.0.0.1 --port 5174 --strictPort',
    url: 'http://127.0.0.1:5174',
    reuseExistingServer: !process.env.CI,
    timeout: 120_000,
    env: {
      VITE_HTTP: '1',
      VITE_PORT: '5174',
    },
  },
  projects: [
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'] },
    },
  ],
});
