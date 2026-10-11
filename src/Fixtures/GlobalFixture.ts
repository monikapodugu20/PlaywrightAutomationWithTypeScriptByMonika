import { test as base } from '@playwright/test';
import { HomePage } from '../pages/HomePage';
import { ResultsPage } from '../pages/ResultsPage';
import { FinalPage } from '../pages/FinalPage';
import { loadTestData } from '../utils/JsonHelper';
import { TestData } from '../interface/Module1Testdata.interface';

/**
 * author Monika
 */
export const test = base.extend<{
    saveLogs: void;
    homepage: HomePage;
    resultsPage: ResultsPage;
    finalpage: FinalPage;
    testData: TestData;
}>({
    saveLogs: [async ({ }, use) => {
        console.log('Global before is running...');

        await use();

        console.log('Global afterEach is running...');
    },
    { auto: true }],
    homepage: async ({ page }, use) => {
        const homePage = new HomePage(page);
        await use(homePage);
    },
    resultsPage: async ({ page }, use) => {
        const resultPage = new ResultsPage(page);
        await use(resultPage);
    },
    finalpage: async ({ page }, use) => {
        const finalPage = new FinalPage(page);
        await use(finalPage);
    },
    testData: async ({ }, use) => {
        const data = await loadTestData();
        await use(data);
    }
});

export { expect } from '@playwright/test';