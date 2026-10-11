import { test, expect } from '@playwright/test';

// write test
test('Assertions in Playwright', async ({ page }) => {
 
    await page.goto('https://www.youtube.com/');

    //Visbility assertion
    await expect(page.getByRole('link', { name: 'YouTube' }).first()).toBeVisible();
    //Edibility assertion
    await expect(page.getByPlaceholder('Search', { exact: true }).first()).toBeEditable();
    //Enabled assertion
    await expect(page.getByRole('button', { name: 'Search' }).first()).toBeEnabled();
    //Empty assertion
    await expect(page.getByPlaceholder('Search', { exact: true }).first()).toBeEmpty();

    //URL assertion
    await expect(page).toHaveURL('https://www.youtube.com/');
    //title assertion
    await expect(page).toHaveTitle('YouTube');
    //Value assertion
    //await page.getByPlaceholder('Search', { exact: true }).first().fill('Playwright by Testers Talk');
    //await expect(page.getByPlaceholder('Search', { exact: true }).first()).toHaveValue('Playwright by Testers Talk');

    //text assertion
    //await expect(page.getByRole('link', { name: 'YouTube' }).first()).toHaveText('YouTube');
    //Count assertion
    await expect(page.getByRole('link', { name: 'YouTube' })).toHaveCount(1);
    //disabled assertion
    //await page.getByPlaceholder('Search', { exact: true }).first().fill('Playwright by Testers Talk');
    //await expect(page.getByRole('button', { name: 'Search' }).first()).toBeDisabled();

});