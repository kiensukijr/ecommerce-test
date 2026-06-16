import { test, expect } from '@playwright/test';
import { LoginPage } from '../../pages/LoginPage';
import { userLoginPass, userLoginFail } from '../../data/userlogin.data';


for (const user of userLoginPass) {
    test(`Login test for ${user.email}`, async ({ page }) => {

        const loginPage = new LoginPage(page);

        await loginPage.goto();

        await loginPage.login(user.email, user.password);

        await expect(page).toHaveURL('http://localhost:5173/');
    });
}

for (const user of userLoginFail) {
    test(`Login test for ${user.email}`, async ({ page }) => {

        const loginPage = new LoginPage(page);

        await loginPage.goto();

        await loginPage.login(user.email, user.password);
        await page.pause();

        // await expect(page).toHaveURL('/login');
        await expect(page.getByText('Invalid email or password', {exact: true})).toBeVisible();
    });
}   


