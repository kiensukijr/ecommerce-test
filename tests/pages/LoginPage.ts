import BasePage from './BasePage';

export class LoginPage extends BasePage {

    readonly email = '[id="login-email"]';
    readonly password = '[id="login-password"]';
    readonly submitBtn = 'button[type="submit"]';

    async goto() {
        await this.page.goto('/login');
    }

    async login(email: string, password: string) {
        await this.page.fill(this.email, email);
        await this.page.fill(this.password, password);
        await this.page.click(this.submitBtn);
    }
}