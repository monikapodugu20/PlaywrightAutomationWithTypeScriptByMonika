# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: Chapter5\05_PageObjectModel.spec.ts >> POM Playwright Test
- Location: tests\Chapter5\05_PageObjectModel.spec.ts:7:5

# Error details

```
Error: page.goto: Protocol error (Page.navigate): Cannot navigate to invalid URL
Call log:
  - navigating to "undefined", waiting until "load"

```

# Test source

```ts
  1  | import { Locator, Page } from "@playwright/test"
  2  | 
  3  | export class HomePage {
  4  |     readonly page: Page;
  5  |     readonly searchBox: Locator;
  6  |     readonly searchButton: Locator;
  7  |     
  8  |     constructor(page: Page) {
  9  |         this.page = page;
  10 |         //Elements
  11 |         this.searchBox = page.getByRole('searchbox', { name: 'Search Wikipedia' });
  12 |         this.searchButton = page.getByRole('button', { name: 'Search' });
  13 |     }
  14 |     //Methods
  15 |     async goToUrl() {
> 16 |         await this.page.goto(`${process.env.BASE_URL}`);
     |                         ^ Error: page.goto: Protocol error (Page.navigate): Cannot navigate to invalid URL
  17 |     }
  18 | 
  19 |     async searchWithKeyword(keyword: string) {
  20 |         await this.searchBox.click();
  21 |         await this.searchBox.fill(keyword);
  22 |         await this.searchButton.click();
  23 |     }
  24 | }
  25 | 
  26 | 
```