import { test, expect } from '@playwright/test';

// write test
test('Captures Screenshots in playwright', async ({ page }) => {
  // go to website
  await page.goto('https://www.youtube.com/@testerstalk');

  //Element screnshot
    await page.locator('#page-header-container').screenshot({ path: './Screenshots/element_screenshot.png' });
  //Page screenshot
    await page.screenshot({ path: './Screenshots/page_screenshot.png' });
  //Ful Page screenshot
    await page.screenshot({ path: './Screenshots/full_page_screenshot.jpeg', fullPage: true });
});