import { test } from '@playwright/test';
import './setupTest';

test('Validate environment variables', () => {
  if (!process.env.SAUCE_USERNAME || !process.env.SAUCE_PASSWORD) {
    throw new Error(`
      Environment variables not loaded properly!
      Check .env file exists in project root with:
      SAUCE_USERNAME=standard_user
      SAUCE_PASSWORD=secret_sauce
    `);
  }
});
