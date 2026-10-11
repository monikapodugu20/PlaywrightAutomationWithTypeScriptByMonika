// Import playwright module
import { test, expect } from '@playwright/test';

import { parse } from 'csv-parse/sync';
import fs from 'fs';
import path from 'path';

type TestRecords = {
    Skill1: string,
    Skill2: string
}

const records = parse(
    fs.readFileSync(path.join(__dirname, '../../test-data/QA/testdata.csv')),
    {
        columns: true,
        skipEmptyLines: true
    }
) as TestRecords[];

for (const record of records) {

    test(`Data Driven Testing Using CSV file in playwright : ${record.Skill1}`, { tag: ['@DataDrivenTesting'] }, async ({ page }) => {

        console.log(`CSV file row data`);
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