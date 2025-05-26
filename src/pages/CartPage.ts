import { Locator, Page, expect } from '@playwright/test';

export class CartPage {
  constructor(private page: Page) {}

  async checkout() {
    await this.page.locator('[data-test="checkout"]').click();
  }

  async fillInformation(firstName: string, lastName: string, zip: string) {
    const firstNameInput = this.page.locator('[data-test="firstName"]');
    await firstNameInput.waitFor({ state: 'visible', timeout: 15000 });
    await firstNameInput.fill(firstName);
    await this.page.locator('[data-test="lastName"]').fill(lastName);
    await this.page.locator('[data-test="postalCode"]').fill(zip);
    await this.page.locator('[data-test="continue"]').click();
  }

  async finishCheckout() {
    await this.page.locator('[data-test="finish"]').click();
  }

  getConfirmationMessage(): Locator {
    return this.page.locator('.complete-header');
  }
}
