import { test, expect } from '@playwright/test';

test('test', async ({ page }) => {
  await test.step('Go to GitHub and click on Sign in', async () => {
    await page.goto('https://github.com/');
  });

  await test.step('Click on Sign in and enter credentials', async () => {
      await page.getByRole('link', { name: 'Sign in' }).click();
      await page.getByRole('textbox', { name: 'Username or email address' }).click();
      await page.getByRole('textbox', { name: 'Username or email address' }).fill('test');
      await page.getByRole('textbox', { name: 'Password' }).click();
      await page.getByRole('textbox', { name: 'Password' }).fill('test123');
   });

  await test.step('Click on Sign in button', async () => { 
      await page.getByRole('button', { name: 'Sign in', exact: true }).click();
   });

   await test.step('Verify error message', async () => {
      await expect(page.getByRole('alert')).toContainText('Incorrect username or password.');
   });
   
});