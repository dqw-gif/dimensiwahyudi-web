import { defineConfig, devices } from '@playwright/test';

const PORT = process.env.PORT ? Number(process.env.PORT) : 3000;
const BASE_URL = process.env.BASE_URL || `http://localhost:${PORT}`;
const IS_STABILITY_RUN = process.env.E2E_STABILITY === '1';

export default defineConfig({
  testDir: './tests/e2e',
  timeout: IS_STABILITY_RUN ? 45_000 : 30_000,
  expect: {
    timeout: IS_STABILITY_RUN ? 15_000 : 10_000,
  },
  fullyParallel: !IS_STABILITY_RUN,
  workers: IS_STABILITY_RUN ? 4 : undefined,
  retries: process.env.CI ? 1 : 0,
  use: {
    baseURL: BASE_URL,
    trace: 'retain-on-failure',
  },
  webServer: {
    command: 'npm run dev',
    url: BASE_URL,
    reuseExistingServer: true,
    timeout: 120_000,
  },
  projects: [
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'] },
    },
  ],
});
