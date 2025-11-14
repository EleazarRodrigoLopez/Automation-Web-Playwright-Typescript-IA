import { defineConfig } from '@playwright/test';

export default defineConfig({
  testDir: './src/flow/tests',
  reporter: [
    ['list'],
    ['html', { outputFolder: 'playwright-report', open: 'never' }]
  ],
  use: {
    headless: false,
    screenshot: 'on',
    video: 'on',
    trace: 'on'
  },
  timeout: 30000,
  retries: 0
});