import { test, expect } from '@playwright/test';
import { InventoryPage } from '../pages/InventoryPage';
import { LoginPage } from '../pages/LoginPage';
import './setupTest';

test.describe('Remove from Cart', () => {
  test.beforeEach(async ({ page }) => {
    const loginPage = new LoginPage(page);
    await loginPage.navigate();
    await loginPage.login(process.env.SAUCE_USERNAME!, process.env.SAUCE_PASSWORD!);
    await page.waitForSelector('.inventory_item', { timeout: 10000 });
  });

  test('Remove item from cart', async ({ page }) => {
    const inventoryPage = new InventoryPage(page);
    await inventoryPage.addToCart('Sauce Labs Bolt T-Shirt');
    await page.waitForTimeout(2000);
    await inventoryPage.removeFromCart('Sauce Labs Bolt T-Shirt');
    await expect(inventoryPage.getCartCount()).not.toBeVisible({ timeout: 15000 });
    await page.waitForTimeout(2000);
  });
});
