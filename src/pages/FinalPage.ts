import { expect, Locator, Page } from "@playwright/test"

export class FinalPage {
    readonly page: Page;
    
    constructor(page: Page) {
        this.page = page;

    }
    //Methods
    async validateLinkTitle() {
        await expect(this.page).toHaveTitle(/Playwright/);
    }

}


