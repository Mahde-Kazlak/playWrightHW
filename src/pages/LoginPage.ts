import { Page, expect } from '@playwright/test';

export class LoginPage {
  constructor(private page: Page) {}

  async navigate() {
    await this.page.goto('/');
  }

  async login(username: string, password: string) {
    await this.page.locator('#user-name').fill(username);
    await this.page.locator('#password').fill(password);
    const loginButton = this.page.locator('#login-button');
    await loginButton.waitFor({ state: 'visible', timeout: 15000 });
    await loginButton.click({ force: true, timeout: 20000 });
  }

  async assertErrorMessage(message: string) {
    await expect(this.page.locator('[data-test="error"]')).toHaveText(message);
  }
}
