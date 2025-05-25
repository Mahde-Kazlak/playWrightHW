import { defineConfig, devices } from '@playwright/test';
require('dotenv').config();

export default defineConfig({
  testDir: './src/tests',
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0,
  workers: process.env.CI ? 1 : undefined,
  reporter: 'html',
  use: {
    launchOptions: {
      slowMo: 1000, // Correct placement
      headless: false // Optional: keep browser open
    },
    actionTimeout: 10000,
    baseURL: 'https://www.saucedemo.com',
    trace: 'on-first-retry',
    storageState: 'storageState.json',
    viewport: { width: 1920, height: 1080 }
    
  },
projects: [
  {
    name: 'chromium',
    use: { 
      ...devices['Desktop Chrome'],
      launchOptions: {
        slowMo: 500,
        headless: false
      }
    },
  },
  {
    name: 'firefox',
    use: { 
      ...devices['Desktop Firefox'],
      launchOptions: {
        slowMo: 1000, 
        headless: false
      }
    },
  }
],
  globalSetup: require.resolve('./src/globalSetup.ts'),
});