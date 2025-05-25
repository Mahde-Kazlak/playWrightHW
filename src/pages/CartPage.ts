import { Page,Locator, expect } from '@playwright/test';

export class CartPage {
 getErrorMessage(): Locator {
  return this.page.locator('[data-test="error"]');
}
  constructor(private page: Page) {}

  async checkout() {
    await this.page.locator('[data-test="checkout"]').click();
  }

  async fillInformation(firstName: string, lastName: string, zip: string) {
    await this.page.locator('[data-test="firstName"]').fill(firstName);
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