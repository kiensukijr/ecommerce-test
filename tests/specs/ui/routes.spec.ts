import { test, expect } from '@playwright/test';
import { HomePage } from '../../pages/HomePage';
import { LoginPage } from '../../pages/LoginPage';
import { RegisterPage } from '../../pages/RegisterPage';
import { CartPage } from '../../pages/CartPage';
import { AdminPage } from '../../pages/AdminPage';

const pageObjects = [
    { pageClass: HomePage, name: 'Home' },
    { pageClass: LoginPage, name: 'Login' },
    { pageClass: RegisterPage, name: 'Register' },
    { pageClass: CartPage, name: 'Cart' },
    { pageClass: AdminPage, name: 'Admin' },
];

for (const p of pageObjects) {
    test(`UI route ${p.name} should load using POM`, async ({ page }) => {
        const obj = new p.pageClass(page);
        await obj.goto();
        await expect(page.locator(`[data-testid=\"${(obj as any).testId}\"]`)).toBeVisible({ timeout: 5000 });
    });
}
