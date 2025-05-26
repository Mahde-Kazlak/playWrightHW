import { test, expect, Page } from '@playwright/test';
import { InventoryPage } from '../pages/InventoryPage';
import './setupTest';

test.describe('Sort Feature', () => {
  let inventoryPage: InventoryPage;
  let page: Page;

  test.beforeEach(async ({ page: testPage }) => {
    page = testPage;
    await page.goto('/inventory.html');
    inventoryPage = new InventoryPage(page);
  });

  test('Sort A-Z', async () => {
    await inventoryPage.sortProducts('az');
    await page.waitForLoadState('networkidle');
    const names = await inventoryPage.getProductNames();
    expect(names).toEqual([...names].sort());
  });

  test('Sort Price High-Low', async () => {
    await inventoryPage.sortProducts('hilo');
    await page.waitForLoadState('networkidle');
    const prices = await inventoryPage.getProductPrices();
    const numericPrices = prices.map(price => parseFloat(price.replace('$', '')));
    expect(numericPrices).toEqual([...numericPrices].sort((a, b) => b - a));
  });
});
