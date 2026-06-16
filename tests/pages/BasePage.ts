import { Page } from '@playwright/test';

export default class BasePage {
    protected page: Page;
    protected basePath = '/';

    constructor(page: Page) {
        this.page = page;
    }

    async navigate(path = '/') {
        await this.page.goto(path);
    }

    async isVisible(testId: string) {
        return this.page.locator(`[data-testid="${testId}"]`).isVisible();
    }
}
