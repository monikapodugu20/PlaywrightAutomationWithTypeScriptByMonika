import { test, expect } from '@playwright/test';

// write test
test('Re run failed Playwright Test1', async ({ page }) => {
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
});

test('Re run failed Playwright Test2', async ({ page }) => {

  await expect(page).toHaveTitle(/Playwright/);
});

test('Re run failed Playwright Test3', async ({ page }) => {
  // go to website
  await expect(page).toHaveTitle(/Playwright/);
});