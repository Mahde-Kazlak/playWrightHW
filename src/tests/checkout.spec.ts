import { test, expect } from '@playwright/test';
import { InventoryPage } from '../pages/InventoryPage';
import { CartPage } from '../pages/CartPage';

test.describe('Checkout Process', () => {
  let inventoryPage: InventoryPage;
  let cartPage: CartPage;

  test.beforeEach(async ({ page }) => {
    inventoryPage = new InventoryPage(page);
    cartPage = new CartPage(page);
    await page.goto('/inventory.html');
    await inventoryPage.addToCart('Sauce Labs Bike Light');
    await inventoryPage.openCart();
  });

  test('Complete checkout', async () => {
    await cartPage.checkout();
    await cartPage.fillInformation('John', 'Doe', '12345');
    await cartPage.finishCheckout();
    
    const confirmation = cartPage.getConfirmationMessage();
    await expect(confirmation).toHaveText('Thank you for your order!');
  });

test('Checkout with missing information', async ({ page }) => {
  const cartPage = new CartPage(page);
  await cartPage.checkout();
  await cartPage.fillInformation('', '', '');
  
  // Add explicit wait
  await page.waitForTimeout(1000);
  const error = cartPage.getErrorMessage();
  await expect(error).toBeVisible({ timeout: 15000 });
});
});