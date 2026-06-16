import BasePage from './BasePage';
import { Page } from '@playwright/test';

export class AdminPage extends BasePage {
    readonly testId = 'admin-page';
    readonly path = '/admin';

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
