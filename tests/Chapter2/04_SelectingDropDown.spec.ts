import { test, expect } from '@playwright/test';

// write test
test('Dropdowns in playwright', async ({ page }) => {
  // go to website
  await page.goto('https://practice.expandtesting.com/dropdown');

  //dropdown selection by value
  await page.locator('#dropdown').selectOption('1');
  
  //dropdown selection by visible text
  await page.locator('#country').selectOption('American Samoa');
  await page.locator('#elementsPerPageSelect').selectOption('10');

  //validate the selected value
    await expect(page.locator('#dropdown')).toHaveValue('1');
    await expect(page.locator('#elementsPerPageSelect')).toHaveValue('10');
});