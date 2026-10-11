import { test } from '../../src/Fixtures/GlobalFixture';

// write test
test('optimised POM Playwright Test', async ({ page, homepage, resultsPage, finalpage }) => {
    await page.setViewportSize({ width: 1366, height: 728 });
    console.log(`Test Execution Started`);
    await homepage.goToUrl();
    await homepage.searchWithKeyword(`${process.env.SearchKeyword}`);
    await resultsPage.clickOnLink();
    await finalpage.validateLinkTitle();

});