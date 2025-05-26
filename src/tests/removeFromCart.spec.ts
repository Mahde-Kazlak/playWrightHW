import { test, expect } from '@playwright/test';
import { InventoryPage } from '../pages/InventoryPage';
import './setupTest';

test.describe('Remove from Cart', () => {
  test('Remove item from cart', async ({ page }) => {
    await page.goto('/inventory.html');
    const inventoryPage = new InventoryPage(page);
    
    await inventoryPage.addToCart('Sauce Labs Bolt T-Shirt');
    await page.waitForTimeout(2000);
    await inventoryPage.removeFromCart('Sauce Labs Bolt T-Shirt');
    await expect(inventoryPage.getCartCount()).not.toBeVisible({ timeout: 15000 });
    await page.waitForTimeout(2000);
  });
});
