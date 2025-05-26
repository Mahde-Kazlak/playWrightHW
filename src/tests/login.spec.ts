import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';
import './setupTest';

test.describe('Login Feature', () => {
  let loginPage: LoginPage;

  test.beforeEach(async ({ page }) => {
    loginPage = new LoginPage(page);
    await loginPage.navigate();
  });

  test('Successful login', async ({ page }) => {
    await loginPage.login(process.env.SAUCE_USERNAME!, process.env.SAUCE_PASSWORD!);
    await page.waitForSelector('.inventory_list', { timeout: 10000 });
    await expect(page).toHaveURL(/inventory.html/);
  });

  test('Invalid login', async () => {
    await loginPage.login('invalid_user', 'wrong_password');
    await loginPage.assertErrorMessage('Epic sadface: Username and password do not match any user in this service');
  });
});
