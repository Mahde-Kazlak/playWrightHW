import { test, expect } from '@playwright/test';
import { InventoryPage } from '../pages/InventoryPage';

test.describe('Add to Cart', () => {
  let inventoryPage: InventoryPage;

  test.beforeEach(async ({ page }) => {
    inventoryPage = new InventoryPage(page);
    await page.goto('/inventory.html');
  });

test('Add item to cart', async () => {
  await inventoryPage.addToCart('Sauce Labs Backpack');

  await expect(inventoryPage.getCartCount()).toHaveText('1', { timeout: 10000 });
});
});