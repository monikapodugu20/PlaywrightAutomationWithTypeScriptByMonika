import { test, expect } from '@playwright/test';

// write test
test('Keyboard actions in playwright', async ({ page }) => {
  // go to website
   await page.goto('https://www.wikipedia.org/');

  //search keywords
  const searchBox = page.getByRole('searchbox', { name: 'Search Wikipedia' });
  await searchBox.fill('Playwright');
  //await searchBox.press('Enter');

//   //Control + A
//   test.setTimeout(10000);
//   await searchBox.press('Control+A');
    
//   //Delete
//   await searchBox.press('Delete');

// Tab and Enter
  test.setTimeout(10000);
  await searchBox.press('Tab');
  test.setTimeout(10000);
  await searchBox.press('Enter');
});