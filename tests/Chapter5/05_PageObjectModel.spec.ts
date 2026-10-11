import { test, expect } from '@playwright/test';
import { HomePage } from '../../src/pages/HomePage';
import { FinalPage } from '../../src/pages/FinalPage';
import { ResultsPage } from '../../src/pages/ResultsPage';

// write test
test('POM Playwright Test', async ({ page }) => {
    await page.setViewportSize({ width: 1366, height: 728 });
    console.log(`Test Execution Started`);
    //Create object for HomePage
    const homepage = new HomePage(page);
    await homepage.goToUrl();
    await homepage.searchWithKeyword(`${process.env.SearchKeyword}`);

    //Create object for ResultsPage
    const resultsPage = new ResultsPage(page);
    await resultsPage.clickOnLink();

    //Create object for FinalPage
    const finalpage = new FinalPage(page);
    await finalpage.validateLinkTitle();


});