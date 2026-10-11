import { test, expect } from '@playwright/test';

// write test
test('Radio Buttons in Playwright Test', async ({ page }) => {
  // go to website
  await page.goto('https://jqueryui.com/checkboxradio/');

  const frame = page.frameLocator('.demo-frame');
  await expect(frame.locator('[for="radio-1"]')).not.toBeChecked();
  await frame.locator('[for="radio-1"]').check();
   await expect(frame.locator('[for="radio-1"]')).toBeChecked();
  
  
  
});