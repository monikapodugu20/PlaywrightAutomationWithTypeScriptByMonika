import { test, expect } from '@playwright/test';

// write test
test('Get text and attribute values', async ({ page }) => {
  // go to website
  await page.goto('https://github.com/BakkappaN/');
  //const name = (await page.locator('[itemprop="name"]').textContent())?.trim() ?? '';
  //innertext
  const name = (await page.locator('[itemprop="name"]').innerText())?.trim() ?? '';
  const itempropValue = await page.locator('[itemprop="name"]').getAttribute('itemprop');
  console.log('Name is : ' + name);
  console.log('Itemprop value is : ' + itempropValue);
  expect(name).toBe('Testers Talk');

});

