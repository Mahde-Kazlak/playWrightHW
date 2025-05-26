import { test, expect } from '@playwright/test';
import { InventoryPage } from '../pages/InventoryPage';
import { LoginPage } from '../pages/LoginPage';
import './setupTest';

test.describe('Add to Cart', () => {
  let inventoryPage: InventoryPage;

  test.beforeEach(async ({ page }) => {
    const loginPage = new LoginPage(page);
    await loginPage.navigate();
    await loginPage.login(process.env.SAUCE_USERNAME!, process.env.SAUCE_PASSWORD!);
    await page.waitForSelector('.inventory_item', { timeout: 10000 });
    inventoryPage = new InventoryPage(page);
  });

  test('Add item to cart', async () => {
    await inventoryPage.addToCart('Sauce Labs Backpack');
    await expect(inventoryPage.getCartCount()).toHaveText('1', { timeout: 10000 });
  });
});
