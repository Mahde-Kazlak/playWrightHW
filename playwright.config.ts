import { defineConfig, devices } from '@playwright/test';
require('dotenv').config();

export default defineConfig({
  testDir: './src/tests',
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0,
  reporter: 'html',
  globalSetup: require.resolve('./src/globalSetup'),
  use: {
    actionTimeout: 10000,
    baseURL: 'https://www.saucedemo.com',
    trace: 'on-first-retry',
    viewport: { width: 1920, height: 1080 }
  },
  projects: [
    {
      name: 'chromium',
      use: {
        ...devices['Desktop Chrome'],
        storageState: 'storageState-chromium.json',
        launchOptions: { slowMo: 1000, headless: false }
      }
    },
    {
      name: 'firefox',
      use: {
        ...devices['Desktop Firefox'],
        storageState: 'storageState-firefox.json',
        launchOptions: { slowMo: 1000, headless: false }
      },
      workers: 1
    }
  ]
});
