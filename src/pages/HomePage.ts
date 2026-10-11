import { Locator, Page } from "@playwright/test"

export class HomePage {
    readonly page: Page;
    readonly searchBox: Locator;
    readonly searchButton: Locator;
    
    constructor(page: Page) {
        this.page = page;
        //Elements
        this.searchBox = page.getByRole('searchbox', { name: 'Search Wikipedia' });
        this.searchButton = page.getByRole('button', { name: 'Search' });
    }
    //Methods
    // async goToUrl() {
    //     await this.page.goto(`${process.env.BaseURL1}`);
    // }
    async goToUrl() {
        if (process.env.TEST_EXECUTION_ENV == 'qa') {
            await this.page.goto(`${process.env.BaseURL1}`);
            console.log(`Tests are running in ${process.env.TEST_EXECUTION_ENV} env.`)
        } else if (process.env.TEST_EXECUTION_ENV == 'dev') {
            await this.page.goto(`${process.env.BaseURL1}`);
            console.log(`Tests are running in ${process.env.TEST_EXECUTION_ENV} env.`)
        }
    }

    async searchWithKeyword(keyword: string) {
        await this.searchBox.click();
        await this.searchBox.fill(keyword);
        await this.searchButton.press('Enter');
    }
}

