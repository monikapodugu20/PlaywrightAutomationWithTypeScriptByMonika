import { test, expect } from '@playwright/test';

// write test
test('.ENV file for Playwright Test', async ({ page }) => {
  // go to website
  await page.goto(`${process.env.BaseURL}`);

});