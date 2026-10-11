import { test, expect } from '@playwright/test';

import path from 'path';
import { readExcelFile } from '../../src/utils/ExcelHelper';

const filePath = path.join(__dirname, '../../test-data/QA/TestData.xlsx');
const records = readExcelFile(filePath);

for (const record of records) {

    test(`Data Driven Testing Using Excel file in playwright : ${record.Skill1}`, { tag: ['@DataDrivenTesting'] }, async ({ page }) => {

        console.log(`Excel file row data`);
        console.log(`Skill 1 : ${record.Skill1}`);
        console.log(`Skill 2 : ${record.Skill2}`);

        // Go to URL
        await page.goto('https://www.wikipedia.org/');

        // Search with keywords
        await page.getByRole('searchbox', { name: 'Search Wikipedia' }).fill(record.Skill1);
        await page.getByRole('searchbox', { name: 'Search Wikipedia' }).press('Enter');

        await page.getByRole('link', { name: `${record.Skill1}` }).first().click();

  // validate page title
  await expect(page).toHaveTitle(new RegExp(record.Skill1));
    });
}