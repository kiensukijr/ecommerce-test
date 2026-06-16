import { test, expect } from '@playwright/test';
import { RegisterPage } from '../../pages/RegisterPage';
import { userRegisterPassUi, userRegisterFail } from '../../data/register.data';


for (const user of userRegisterPassUi()) {
    test(`Register test for ${user.id}`, async ({ page }) => {

        const registerPage = new RegisterPage(page);

        await registerPage.goto();

        await registerPage.login(user.name, user.email, user.password);

        await expect(page).toHaveURL('http://localhost:5173/');
    });
}

for (const user of userRegisterFail) {
    test(`Register test for ${user.id}`, async ({ page }) => {

        const registerPage = new RegisterPage(page);

        await registerPage.goto();

        await registerPage.login(user.name,user.email, user.password);

        await expect(page).toHaveURL('/register');
    });
}   


