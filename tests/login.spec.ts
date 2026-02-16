import { test, expect } from '@playwright/test';

test('Login Flow', async ({ page }) => {
  // Navigate directly to the login page
  await page.goto('https://classifiedy.com/user/login', { waitUntil: 'load' });

  // Wait for the login form to be visible
  await page.waitForSelector('#email', { timeout: 60000 });

  // Fill out the login form
  await page.fill('#email', 'Test.automation@gmail.com');
  await page.fill('#password', 'Test123!');

  // Submit the form using the correct button selector
  await page.click('#user-login > div.content.loc-login.sec-default > section > div > form > button');

  // Wait for successful login - check for "Hi Test" text
  await page.waitForSelector('text=Hi Test', { timeout: 60000 });
  await expect(page.locator('text=Hi Test')).toBeVisible();


});


test('Logout Flow', async ({ page }) => {
  // Navigate directly to the login page
  await page.goto('https://classifiedy.com/user/login', { waitUntil: 'load' });

  // Wait for the login form to be visible
  await page.waitForSelector('#email', { timeout: 60000 });

  // Fill out the login form
  await page.fill('#email', 'Test.automation@gmail.com');
  await page.fill('#password', 'Test123!');

  // Submit the form using the correct button selector
  await page.click('#user-login > div.content.loc-login.sec-default > section > div > form > button');

  // Wait for successful login - check for "Hi Test" text
  await page.waitForSelector('text=Hi Test', { timeout: 60000 });
  await expect(page.locator('text=Hi Test')).toBeVisible();

  // Click logout
  await page.getByRole('link', { name: 'Logout' }).click();

  // Validate logout
  await expect(page.getByText('Sign in / Register')).toBeVisible();


});
