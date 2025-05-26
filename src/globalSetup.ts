import { chromium, FullConfig } from '@playwright/test';

async function globalSetup(config: FullConfig) {
  if (!process.env.SAUCE_USERNAME || !process.env.SAUCE_PASSWORD) {
    throw new Error('Missing SAUCE_USERNAME or SAUCE_PASSWORD in .env file');
  }

  const browser = await chromium.launch();
  const page = await browser.newPage();
  
  await page.goto('https://www.saucedemo.com');
  await page.locator('#user-name').fill(process.env.SAUCE_USERNAME);
  await page.locator('#password').fill(process.env.SAUCE_PASSWORD);
  await page.locator('#login-button').click();
  await page.waitForURL(/inventory.html/);
  await browser.close();
}

export default globalSetup;
