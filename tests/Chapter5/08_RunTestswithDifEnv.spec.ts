// Import playwright module
import { test } from '../../src/Fixtures/GlobalFixture';

/**
 * author Testers Talk
 */
test('Optimized Page Object Model Test in Playwright', async ({ page, homepage, resultsPage, finalpage, testData }) => {

    // Go to URL & Search with keywords
    await homepage.goToUrl();
    await homepage.searchWithKeyword(String(testData.Module1TestData?.skill1));

    // Click on playlist
    await resultsPage.clickOnLink()

    // Validate web page title
    await finalpage.validateLinkTitle()

    console.log(`Skill : ${String(testData.Module1TestData?.skill1)}`);
    console.log(`Skill : ${String(testData.Module1TestData?.skill2)}`);
    
    
});