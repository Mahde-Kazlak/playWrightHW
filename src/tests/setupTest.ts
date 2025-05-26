import { test } from '@playwright/test';

test.afterEach(async ({ page }) => {
  if (page) {
    await page.waitForTimeout(2000);
  }
});
