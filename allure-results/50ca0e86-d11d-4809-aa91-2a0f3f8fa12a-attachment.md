# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: Chapter5\01_EnvTest.spec.ts >> .ENV file for Playwright Test
- Location: tests\Chapter5\01_EnvTest.spec.ts:4:5

# Error details

```
Error: locator.press: Target page, context or browser has been closed
Call log:
  - waiting for getByRole('searchbox', { name: 'Search Wikipedia' })
    - locator resolved to <input type="search" name="search" accesskey="f" id="searchInput" autocomplete="off" spellcheck="false" autocapitalize="none" aria-label="Search Wikipedia" placeholder="Search Wikipedia" title="Search Wikipedia [alt-f]" class="cdx-text-input__input mw-searchInput"/>
  - elementHandle.press("Enter")
  - element was detached from the DOM, retrying

```

# Test source

```ts
  1  | import { test, expect } from '@playwright/test';
  2  | 
  3  | // write test
  4  | test('.ENV file for Playwright Test', async ({ page }) => {
  5  |   // go to website
  6  |   await page.goto(`${process.env.BaseURL}`);
  7  | 
  8  |   // search keywords
  9  |   const searchBox = page.getByRole('searchbox', { name: 'Search Wikipedia' });
  10 |   await searchBox.fill('Playwright');
> 11 |   await searchBox.press('Enter');
     |                   ^ Error: locator.press: Target page, context or browser has been closed
  12 | 
  13 |   // click on article link
  14 |   await page.getByRole('link', { name: 'Playwright' }).first().click();
  15 | 
  16 |   // validate page title
  17 |   await expect(page).toHaveTitle(/Playwright/);
  18 | });
```