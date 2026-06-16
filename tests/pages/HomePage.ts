import BasePage from './BasePage';
import { Page } from '@playwright/test';

export class HomePage extends BasePage {
    readonly testId = 'home-page';
    readonly path = '/';

    constructor(page: Page) {
        super(page);
    }

    async goto() {
        await this.navigate(this.path);
    }

    async isLoaded() {
        return this.isVisible(this.testId);
    }
}
