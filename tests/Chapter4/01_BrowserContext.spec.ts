import { test, expect } from '@playwright/test';

// write test
test('Multiple browser/tabs in Playwright Test', async ({ page,browser }) => {
  // go to website
  await page.goto('https://www.wikipedia.org/');

  // search keywords
  const searchBox = page.getByRole('searchbox', { name: 'Search Wikipedia' });
  await searchBox.fill('Playwright');
  await searchBox.press('Enter');

  // click on article link
  await page.getByRole('link', { name: 'Playwright' }).first().click();

  // validate page title
  await expect(page).toHaveTitle(/Playwright/);
  //Browser context is like a new browser profile. It can have its own cookies, storage, etc. You can create multiple contexts in a single browser instance.
  const context = await browser.newContext();
    const page2 = await context.newPage();
    await page2.goto('https://www.wikipedia.org/');

  // search keywords
  const searchBox1 = page2.getByRole('searchbox', { name: 'Search Wikipedia' });
  await searchBox1.fill('Playwright');
  await searchBox1.press('Enter');

  // click on article link
  await page2.getByRole('link', { name: 'Playwright' }).first().click();

  // validate page title
  await expect(page2).toHaveTitle(/Playwright/);

  //Create new tab in the same browser context
    const page3 = await context.newPage();
    await page3.goto('https://www.wikipedia.org/');

  // search keywords
  const searchBox2 = page3.getByRole('searchbox', { name: 'Search Wikipedia' });
  await searchBox2.fill('Playwright');
  await searchBox2.press('Enter');

  // click on article link
  await page3.getByRole('link', { name: 'Playwright' }).first().click();

  // validate page title
  await expect(page3).toHaveTitle(/Playwright/);
});