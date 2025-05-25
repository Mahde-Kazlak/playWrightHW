import { test, expect, Page } from '@playwright/test';
import { InventoryPage } from '../pages/InventoryPage';

test.describe('Sort Feature', () => {
  let inventoryPage: InventoryPage;
  let page: Page;

test.beforeEach(async ({ page: testPage }) => {
  page = testPage;
  inventoryPage = new InventoryPage(page);
  await page.goto('/inventory.html');
  await page.waitForSelector('.inventory_item', { state: 'visible', timeout: 15000 });
  await page.waitForLoadState('networkidle');
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