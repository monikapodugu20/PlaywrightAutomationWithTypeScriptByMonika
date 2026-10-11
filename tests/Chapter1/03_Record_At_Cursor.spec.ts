import { test, expect } from '@playwright/test';

// write test
test('My Record at cursor Playwright Test', async ({ page }) => {
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
  await expect(page.getByRole('link', { name: 'Etymology' })).toBeVisible();
  await expect(page.getByRole('link', { name: 'Early playwrights' })).toBeVisible();
  
  await expect(page.locator('#toc-Etymology')).toContainText('Etymology');
  await expect(page.locator('#toc-Early_playwrights')).toContainText('Early playwrights');
  await expect(page.getByRole('link', { name: 'Aristotle\'s Poetics techniques' })).toBeVisible();
  await expect(page.locator("[id=\"toc-Aristotle's_Poetics_techniques\"]")).toContainText("Aristotle's Poetics techniques");
});