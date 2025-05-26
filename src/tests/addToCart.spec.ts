import { test, expect } from '@playwright/test';
import { InventoryPage } from '../pages/InventoryPage';
import './setupTest';

test.describe('Add to Cart', () => {
  let inventoryPage: InventoryPage;

  test.beforeEach(async ({ page }) => {
    // With storage state, the user is already logged in.
    await page.goto('/inventory.html');
    inventoryPage = new InventoryPage(page);
  });

  test('Add item to cart', async () => {
    await inventoryPage.addToCart('Sauce Labs Backpack');
    await expect(inventoryPage.getCartCount()).toHaveText('1', { timeout: 10000 });
  });
});
