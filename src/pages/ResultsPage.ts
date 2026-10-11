import { Locator, Page } from "@playwright/test"

export class ResultsPage {
    readonly page: Page;
    
    constructor(page: Page) {
        this.page = page;

    }
    //Methods
    async clickOnLink() {
        await this.page.getByRole('link', { name: 'Playwright' }).first().click();
    }

}

