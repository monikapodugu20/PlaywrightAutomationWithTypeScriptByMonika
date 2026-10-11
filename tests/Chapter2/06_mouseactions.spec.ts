import { test, expect } from '@playwright/test';

// write test
test('Mouse actions in playwright', async ({ page }) => {
  // go to website
  await page.goto('https://www.google.com/search?q=playwright+by+testers+talk');
  //Left click
  await page.getByRole('link', { name: 'Playwright by Testers Talk' }).first().click({button:'left'});
    //Middle click
  //await page.getByRole('link', { name: 'Playwright by Testers Talk' }).first().click({button:'middle'});
  //Right click
  //await page.getByRole('link', { name: 'Playwright by Testers Talk' }).first().click({button:'right'});
  //mouse hover
  await page.getByRole('link', { name: 'Playwright by Testers Talk' }).hover();
  //Double click
  await page.getByRole('link', { name: 'Playwright by Testers Talk' }).dblclick();
});