import { test, expect } from '@playwright/test';

// write test
test('Alerts in Playwright Test', async ({ page }) => {
  // go to website
  await page.goto('https://www.selenium.dev/documentation/webdriver/interactions/alerts/');

  page.once('dialog', dialog => {
    dialog.accept();//clicks ok
     console.log(`Dialog type: ${dialog.type()}`);
    console.log(`Dialog message: ${dialog.message()}`);
  });
  await page.getByText('See an example alert',{exact: true}).click();
  
});

test('Confirm alert in Playwright Test', async ({ page }) => {
  // go to website
  await page.goto('https://www.selenium.dev/documentation/webdriver/interactions/alerts/');

  page.once('dialog', dialog => {
    //dialog.accept();//clicks ok
     dialog.dismiss();//clicks cancel
      console.log(`Dialog type: ${dialog.type()}`);
    console.log(`Dialog message: ${dialog.message()}`);
  });
  await page.getByText('See a sample confirm',{exact: true}).click();
  
});

test('Text input alert in Playwright Test', async ({ page }) => {
  // go to website
  await page.goto('https://www.selenium.dev/documentation/webdriver/interactions/alerts/');

  page.once('dialog', async dialog => {
    await dialog.accept("playwright");//enters text and clicks ok
     //dialog.dismiss();//clicks cancel
     console.log(`Dialog type: ${dialog.type()}`);
    console.log(`Dialog message: ${dialog.message()}`);
  });
  await page.getByText('See a sample prompt',{exact: true}).click();
  
});