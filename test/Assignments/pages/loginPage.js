class LoginPage {
    constructor(page) {
        this.page = page;
        this.usernameInput = page.locator('#user-name');
        this.passwordInput = page.locator('#password');
        this.loginButton = page.locator('#login-button');
        this.errorMessage = page.locator('[data-test="error"]');
    }

    async navigate() {
        await this.page.goto('https://www.saucedemo.com/');
        await this.page.waitForLoadState('domcontentloaded');
    }

    async login(username, password) {
        await this.usernameInput.fill(username);
        await this.passwordInput.fill(password);
        await this.loginButton.click();
    }

    async clickLoginButton() {
        await this.loginButton.click();
    }

    async isLoggedIn() {
        return await this.page.locator('.inventory_list').isVisible();
    }

    async getErrorMessage() {
        return await this.errorMessage.textContent();
    }
}

module.exports = LoginPage;