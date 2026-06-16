import BasePage from './BasePage';

export class RegisterPage extends BasePage {

    readonly name = '[id="register-name"]';
    readonly email = '[id="register-email"]';
    readonly password = '[id="register-password"]';
    readonly submitBtn = '[data-testid="register-submit"]';

    async goto() {
        await this.page.goto('/register');
    }

    async login(name: string, email: string, password: string) {
        await this.page.fill(this.name, name);
        await this.page.fill(this.email, email);
        await this.page.fill(this.password, password);
        await this.page.click(this.submitBtn);
    }
}