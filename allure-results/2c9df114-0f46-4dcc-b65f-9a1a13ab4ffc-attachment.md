# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: Chapter5\03_dataDrivenUsingcsv.spec.ts >> csv Playwright Test
- Location: tests\Chapter5\03_dataDrivenUsingcsv.spec.ts:18:5

# Error details

```
Error: locator.click: Target page, context or browser has been closed
Call log:
  - waiting for getByRole('link', { name: 'Playwright' }).first()

```

# Test source

```ts
  1  | import { test, expect } from '@playwright/test';
  2  | import path from 'path';
  3  | import fs from 'fs';
  4  | import {parse} from 'csv-parse/sync';
  5  | type Record = {
  6  |   skill1: string;
  7  |   skill2: string;
  8  | };
  9  | const records = parse
  10 | (fs.readFileSync(path.join(__dirname, '../../test-data/QA/testdata.csv'), 'utf8'), 
  11 |     {
  12 |     columns: true,
  13 |     skip_empty_lines: true
  14 |     }
  15 | )as Record[];
  16 | 
  17 | // write test
  18 | test('csv Playwright Test', async ({ page }) => {
  19 |   // go to website
  20 |   await page.goto('https://www.wikipedia.org/');
  21 | 
  22 |   // search keywords
  23 |   const searchBox = page.getByRole('searchbox', { name: 'Search Wikipedia' });
  24 |   //await searchBox.fill('' + testData.TestData.skill1);
  25 |   await searchBox.fill(String((records[0] as { skill1: string }).skill1));
  26 |   await searchBox.press('Enter');
  27 | 
  28 |   // click on article link
> 29 |   await page.getByRole('link', { name: 'Playwright' }).first().click();
     |                                                                ^ Error: locator.click: Target page, context or browser has been closed
  30 | 
  31 |   // validate page title
  32 |   await expect(page).toHaveTitle(/Playwright/);
  33 | });
```