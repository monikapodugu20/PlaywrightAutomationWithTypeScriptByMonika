import { test, expect } from '@playwright/test';

// write test
test('Drag and Drop in playwright', async ({ page }) => {
  // go to website
  await page.goto('https://jqueryui.com/droppable/');
 
  //Iframe handling
  const frame = page.frameLocator('.demo-frame');

  const drag = frame.locator('#draggable');
  const drop = frame.locator('#droppable');
  
  //Drag and Drop
    // const drag= page.locator('#draggable');
    // const drop= page.locator('#droppable');
    test.setTimeout(10000);
    await drag.dragTo(drop);
  
});