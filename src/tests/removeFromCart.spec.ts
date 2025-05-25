import { test, expect } from '@playwright/test';
import { InventoryPage } from '../pages/InventoryPage';

test.describe('Remove from Cart', () => {
test('Remove item from cart', async ({ page }) => {
  const inventoryPage = new InventoryPage(page);
  await page.goto('/inventory.html');
  
  // Add explicit waits
  await inventoryPage.addToCart('Sauce Labs Bolt T-Shirt');
  await page.waitForTimeout(1000);
  
  await inventoryPage.removeFromCart('Sauce Labs Bolt T-Shirt');
  await expect(inventoryPage.getCartCount()).not.toBeVisible({ timeout: 15000 });
});
});