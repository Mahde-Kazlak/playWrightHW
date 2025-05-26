import { test, expect } from '@playwright/test';
import { InventoryPage } from '../pages/InventoryPage';
import { CartPage } from '../pages/CartPage';
import './setupTest';

test.describe('Checkout Process', () => {
  test('Complete checkout', async ({ page }) => {
    await page.goto('/inventory.html');
    const inventoryPage = new InventoryPage(page);
    const cartPage = new CartPage(page);
    
    await inventoryPage.addToCart('Sauce Labs Bike Light');
    await inventoryPage.openCart();
    await cartPage.checkout();
    await cartPage.fillInformation('John', 'Doe', '12345');
    await cartPage.finishCheckout();
    
    await page.waitForSelector('.complete-header', { timeout: 30000 });
    const confirmation = cartPage.getConfirmationMessage();
    await expect(confirmation).toHaveText('Thank you for your order!', { timeout: 10000 });
  });
});
