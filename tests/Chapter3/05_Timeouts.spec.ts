import { test, expect } from '@playwright/test';

// write test
test('Timeouts Playwright Test', async ({ page }) => {
  // go to website
  test.setTimeout(120000); // set test timeout to 2 minutes this will overrie the global timout plywright.config.ts
  await page.goto('https://www.wikipedia.org/');

  // search keywords
  const searchBox = page.getByRole('searchbox', { name: 'Search Wikipedia' });
  await searchBox.fill('Playwright');
  await searchBox.press('Enter');

  // click on article link
  await page.getByRole('link', { name: 'tPlaywright' }).first().click({ timeout: 5000 }); // set click timeout to 10 seconds this will overrie the global timout plywright.config.ts

  // validate page title
  //await expect(page).toHaveTitle(/tPlaywright/,{timeout: 10000}); // set expect timeout to 10 seconds this will overrie the global timout plywright.config.ts
  //await page.waitForTimeout(60000); // wait for 60 seconds
});