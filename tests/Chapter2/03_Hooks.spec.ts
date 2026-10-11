import { test, expect } from '@playwright/test';

test.beforeAll(async () => {
  return console.log('Before all tests');
},);

test.beforeEach(async () => {
  return console.log('Before each test');
},);

test.afterEach(async () => {
  return console.log('After each test');
},);

test.afterAll(async () => {
  return console.log('After all tests');
},); 

// write test
test('Test hooks1', async ({ page }) => {
    console.log('Execution started for test case 1');
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

test('Test hooks2', async ({ page }) => {
    console.log('Execution started for test case 2');
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
