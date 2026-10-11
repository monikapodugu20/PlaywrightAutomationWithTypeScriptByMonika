import { test, expect } from '@playwright/test';

// write test
test('loops in Playwright Test', async ({ page }) => {
  // go to website
  await page.goto('https://github.com/BakkappaN');

  // for of loop
 const repolinks=await page.$$('.repo');
 for(const link of repolinks){
    const text=await link.innerText();
    console.log('loop1 : '+text);
  }
  
 //For loop 
 for(let i=0;i<repolinks.length;i++){ 
    const text=await repolinks[i].textContent();
    console.log('loop2 : '+text);
  }
//For loop + nth method
 for(let i=0;i<repolinks.length;i++){ 
    const text=await page.locator('.repo').nth(i).textContent();
    console.log('loop3 : '+text);
  }
});