import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';

test.describe('Login Feature', () => {
  let loginPage: LoginPage;

  test.beforeEach(async ({ page }) => {
    loginPage = new LoginPage(page);
    await loginPage.navigate();
  });

  // Parameterized tests
  const users = [
    { 
      username: process.env.SAUCE_USERNAME!, 
      password: process.env.SAUCE_PASSWORD!, 
      valid: true 
    },
    { 
      username: 'locked_out_user', 
      password: 'secret_sauce', 
      valid: false,
      error: 'Epic sadface: Sorry, this user has been locked out.'
    },
    { 
      username: 'invalid_user', 
      password: 'wrong_password', 
      valid: false,
      error: 'Epic sadface: Username and password do not match any user in this service'
    }
  ];

  users.forEach((user) => {
    test(`Login as ${user.username}`, async ({ page }) => {
      await loginPage.login(user.username, user.password);
      
      if(user.valid) {
        await page.waitForURL(/inventory.html/);
        await expect(page.locator('.inventory_list')).toBeVisible();
      } else {
        await expect(loginPage.getErrorMessage()).toHaveText(user.error!);
      }
    });
  });
});