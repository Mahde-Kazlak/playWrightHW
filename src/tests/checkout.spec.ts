import { test, expect } from '@playwright/test';
import { InventoryPage } from '../pages/InventoryPage';
import { CartPage } from '../pages/CartPage';
import { LoginPage } from '../pages/LoginPage';
import './setupTest';

test.describe('Checkout Process', () => {
  test.beforeEach(async ({ page }) => {
    const loginPage = new LoginPage(page);
    await loginPage.navigate();
    await loginPage.login(process.env.SAUCE_USERNAME!, process.env.SAUCE_PASSWORD!);
    await page.waitForSelector('.inventory_item', { timeout: 10000 });
  });

  test('Complete checkout', async ({ page }) => {
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
