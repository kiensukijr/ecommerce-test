import BasePage from './BasePage';
import { Page } from '@playwright/test';

export class CartPage extends BasePage {
    readonly testId = 'cart-page';
    readonly path = '/cart';

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
