import { chromium, firefox, FullConfig } from '@playwright/test';

async function globalSetup(config: FullConfig) {
  if (!process.env.SAUCE_USERNAME || !process.env.SAUCE_PASSWORD) {
    throw new Error('Missing SAUCE_USERNAME or SAUCE_PASSWORD in .env file');
  }


  const chromiumBrowser = await chromium.launch();
  const chromiumPage = await chromiumBrowser.newPage();
  await chromiumPage.goto('https://www.saucedemo.com');
  await chromiumPage.locator('#user-name').fill(process.env.SAUCE_USERNAME);
  await chromiumPage.locator('#password').fill(process.env.SAUCE_PASSWORD);
  await chromiumPage.locator('#login-button').click();
  await chromiumPage.waitForURL(/inventory.html/);
  await chromiumPage.context().storageState({ path: 'storageState-chromium.json' });
  await chromiumBrowser.close();

  const firefoxBrowser = await firefox.launch();
  const firefoxPage = await firefoxBrowser.newPage();
  await firefoxPage.goto('https://www.saucedemo.com');
  await firefoxPage.locator('#user-name').fill(process.env.SAUCE_USERNAME);
  await firefoxPage.locator('#password').fill(process.env.SAUCE_PASSWORD);
  await firefoxPage.locator('#login-button').click();
  await firefoxPage.waitForURL(/inventory.html/);
  await firefoxPage.context().storageState({ path: 'storageState-firefox.json' });
  await firefoxBrowser.close();
}

export default globalSetup;
