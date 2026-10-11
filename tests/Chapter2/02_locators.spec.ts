import { test, expect } from '@playwright/test';

// write test
test('locators Playwright Test', async ({ page }) => {
  // go to website
  //await page.goto('https://github.com/BakkappaN');

//   // getByRole
//   await page.getByRole('link', { name: 'Sign in' }).click();
  
//   // getByLabel
//   await page.getByLabel('Homepage',{exact:true}).first().click();

//     // getByAltText
//     await page.getByAltText("View BakkappaN's full-sized avatar").click();  
       
    // // getByTestId
    // await page.getByTestId('repositories').first().click();

    // //getByText
    // await page.getByText('Sign up').click();

    await page.goto('https://www.youtube.com/@testerstalk');

    // // getByPlaceholder
    // await page.getByPlaceholder('Search').fill('testers talk');

    // // XPath
    // await page.locator('//input[@name="search_query"]').fill('testers talk');

//     //CSS Selector
//     await page.locator('input[name="search_query"]').first().fill('testers talk');

   //getByTitle
    await page.getByTitle('Search').first().click();

 });