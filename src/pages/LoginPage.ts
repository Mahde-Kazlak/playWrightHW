import { Locator, Page, expect } from '@playwright/test';

export class LoginPage {
  constructor(page: Page) {
    this.page = page;
    this.errorMessage = page.locator('[data-test="error"]');
  }
  readonly page: Page;
  readonly errorMessage: Locator;
  async navigate() {
    await this.page.goto('/');
  }

  async login(username: string, password: string) {
    await this.page.locator('#user-name').fill(username);
    await this.page.locator('#password').fill(password);
    await this.page.locator('#login-button').click();
  }

  async assertErrorMessage(message: string) {
    await expect(this.page.locator('[data-test="error"]')).toHaveText(message);
  }
  getErrorMessage(): Locator {
    return this.errorMessage;
  }
}