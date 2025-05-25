import { Page, expect, Locator } from '@playwright/test';

export class InventoryPage {
  constructor(protected page: Page) {}

  getCartCount(): Locator {
    return this.page.locator('.shopping_cart_badge');
  }

  private getCartButton(itemName: string, action: 'add' | 'remove') {
    const kebabName = itemName.toLowerCase().replace(/\s+/g, '-');
    const actionPrefix = action === 'add' ? 'add-to-cart' : 'remove';
    return this.page.locator(`[data-test="${actionPrefix}-${kebabName}"]`);
  }

async addToCart(itemName: string) {
  const button = this.getCartButton(itemName, 'add');
  await button.waitFor({ state: 'visible' });
  await button.click();
  await this.page.waitForLoadState('networkidle');
}

  async removeFromCart(itemName: string) {
    await this.getCartButton(itemName, 'remove').click();
  }

async sortProducts(option: 'az' | 'za' | 'lohi' | 'hilo') {
  const sortDropdown = this.page.locator('[data-test="product-sort-container"]');
  await sortDropdown.waitFor({ state: 'visible', timeout: 15000 });
  await sortDropdown.selectOption(option);
  await this.page.waitForTimeout(1000);
}

  async getProductNames() {
    return this.page.locator('.inventory_item_name').allTextContents();
  }

  async getProductPrices() {
    return this.page.locator('.inventory_item_price').allTextContents();
  }

  async openCart() {
    await this.page.locator('.shopping_cart_link').click();
  }
}