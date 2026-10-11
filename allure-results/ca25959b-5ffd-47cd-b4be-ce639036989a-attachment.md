# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: Chapter5\05_PageObjectModel.spec.ts >> POM Playwright Test
- Location: tests\Chapter5\05_PageObjectModel.spec.ts:7:5

# Error details

```
Error: locator.click: Target page, context or browser has been closed
Call log:
  - waiting for getByRole('link', { name: 'Playwright' }).first()

```

# Test source

```ts
  1  | import { Locator, Page } from "@playwright/test"
  2  | 
  3  | export class ResultsPage {
  4  |     readonly page: Page;
  5  |     
  6  |     constructor(page: Page) {
  7  |         this.page = page;
  8  | 
  9  |     }
  10 |     //Methods
  11 |     async clickOnLink() {
> 12 |         await this.page.getByRole('link', { name: 'Playwright' }).first().click();
     |                                                                           ^ Error: locator.click: Target page, context or browser has been closed
  13 |     }
  14 | 
  15 | }
  16 | 
  17 | 
```