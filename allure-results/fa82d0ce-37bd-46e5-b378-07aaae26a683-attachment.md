# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: Chapter5\02_dataDrivenUsigJson.spec.ts >> My First Playwright Test
- Location: tests\Chapter5\02_dataDrivenUsigJson.spec.ts:5:5

# Error details

```
Error: locator.click: Target page, context or browser has been closed
Call log:
  - waiting for getByRole('link', { name: 'Playwright' }).first()

```

# Test source

```ts
  1  | import { test, expect } from '@playwright/test';
  2  | import testData from '../../test-data/QA/testData.json';
  3  | 
  4  | // write test
  5  | test('My First Playwright Test', async ({ page }) => {
  6  |   // go to website
  7  |   await page.goto('https://www.wikipedia.org/');
  8  | 
  9  |   // search keywords
  10 |   const searchBox = page.getByRole('searchbox', { name: 'Search Wikipedia' });
  11 |   //await searchBox.fill('' + testData.TestData.skill1);
  12 |   await searchBox.fill('${testData.TestData.skill1}');
  13 |   await searchBox.press('Enter');
  14 | 
  15 |   // click on article link
> 16 |   await page.getByRole('link', { name: 'Playwright' }).first().click();
     |                                                                ^ Error: locator.click: Target page, context or browser has been closed
  17 | 
  18 |   // validate page title
  19 |   await expect(page).toHaveTitle(/Playwright/);
  20 | });
```