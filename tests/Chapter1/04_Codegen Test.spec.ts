import { test, expect } from '@playwright/test';

test('test1', async ({ page }) => {
  await page.goto('https://www.youtube.com/');
  await page.getByRole('combobox', { name: 'Search' }).click();
  await page.getByRole('combobox', { name: 'Search' }).fill('playwright by testes talk');
  await page.getByRole('combobox', { name: 'Search' }).press('Enter');
  await page.getByRole('link', { name: 'Playwright by Testers Talk ✅' }).click();
  test.setTimeout(10000);
  await expect(page.getByRole('link', { name: 'Playwright by Testers Talk ✅' })).toBeVisible();
  await expect(page.locator('#header-description')).toContainText('Playwright by Testers Talk ✅');
});

