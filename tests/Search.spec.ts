import { test, expect } from '@playwright/test';

test('Search Flow', async ({ page }) => {
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

  // Go to homepage
  await page.goto('https://classifiedy.com', { waitUntil: 'load' });

  // Wait for the page to load completely
  await page.waitForTimeout(2000); // Give the page time to stabilize

  // Search for a product - use a more specific selector
  await page.locator('input[name="sPattern"]:visible').first().fill('Macbook');
  

  // Click the search button
  await page.getByRole('button', { name: 'Search' }).click();
  
  // Wait for search results to load
  await page.waitForTimeout(3000);

  // Select a search result
  await page.locator('a:has-text("Macbook")').first().waitFor({ state: 'visible' });
  await page.locator('a:has-text("Macbook")').first().click();

 // Verify the title 
 await expect.soft(page.locator('h1.row')).toBeVisible();
 await expect.soft(page.locator('h1.row')).toHaveText('Macbook Air M3');

});