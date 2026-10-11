import { test, expect } from '@playwright/test';

// write test
test('date picker in playwright', async ({ page }) => {
  // go to website
   await page.goto('https://jqueryui.com/datepicker/');
//    //manually select date from date picker
        const iframe = page.frameLocator('.demo-frame');
//     await iframe.locator('#datepicker').fill('10/02/2026');
    //DynaMically selecting date from date picker
    // await iframe.locator('#datepicker').click();
    // await iframe.locator('.ui-datepicker-today').click();
    // test.setTimeout(10000);

   //Select past date from date picker 
//    await iframe.locator('#datepicker').click();
//    await iframe.locator('[title="Prev"]').click();
//    await iframe.locator('text="14"').click();
//    test.setTimeout(10000);
 //Select Future date from date picker 
   await iframe.locator('#datepicker').click();
   await iframe.locator('[title="Next"]').click();
   await iframe.locator('text="23"').click();
   test.setTimeout(10000);
});