
const { test, expect } = require('@playwright/test');
const LoginPage = require('../pages/loginPage');
const ProductsPage = require('../pages/productPage');
const CartPage = require('../pages/cartPage');
const CheckoutPage = require('../pages/checkoutPage');
const testData = require('../testData');

test.describe('Edge Case Test Scenarios', () => {

    // Helper function to perform login with logging
    async function login(page, username, password) {

        const loginPage = new LoginPage(page);
        console.log(`Navigating to login page...`);
        await loginPage.navigate();
        
        console.log(`Attempting login with username: ${username}`);
        await loginPage.login(username, password);
    }

    // EDGE CASE 1: Invalid Login Credentials
    test('Login with invalid credentials should fail', async ({ page }) => {

        const loginPage = new LoginPage(page);
        await loginPage.navigate();

        console.log("Attempting login with invalid credentials...");
        await loginPage.login('invalid_user', 'wrong_password');

        console.log("Fetching error message...");
        const errorMessage = await loginPage.getErrorMessage();
        console.log(`Error message received: ${errorMessage}`);

        expect(errorMessage).toContain('Username and password do not match');

        await page.screenshot({ path: 'screenshots/EdgeTest/login-invalid.png' });
    });

    // EDGE CASE 2: Login with Empty Fields
    test('Login with empty username and password should show error', async ({ page }) => {

        const loginPage = new LoginPage(page);
        await loginPage.navigate();

        console.log("Clicking login button without entering credentials...");
        await loginPage.clickLoginButton();

        console.log("Verifying error message...");
        const errorMessage = await loginPage.getErrorMessage();
        console.log(`Error message received: ${errorMessage}`);

        expect(errorMessage).toContain('Username is required');

        await page.screenshot({ path: 'screenshots/EdgeTest/login-empty-fields.png' });
    });

    // EDGE CASE 3: Checkout with Empty Cart
    test('Proceeding to checkout with empty cart should be blocked', async ({ page }) => {

        await login(page, testData.validUser.username, testData.validUser.password);

        const cartPage = new CartPage(page);
        await cartPage.navigate();

        console.log("Attempting to checkout with an empty cart...");
        await cartPage.goToCart();
        await cartPage.proceedToCheckout();

        const checkoutPage = new CheckoutPage(page);
        await checkoutPage.fillCheckoutDetails('Shweta', 'Mehta', '1234');

        console.log("Checking for checkout error message...");
        const errorMessage = await cartPage.getErrorMessage();
        console.log(`Error message received: ${errorMessage}`);

        await page.screenshot({ path: 'screenshots/EdgeTest/checkout-empty-cart.png' });
    });

    // EDGE CASE 4: Keyboard Navigation for Checkout
    test('Checkout page should be navigable with keyboard', async ({ page }) => {
       
        const checkoutPage = new CheckoutPage(page);
        const loginPage = new LoginPage(page);

        await loginPage.navigate();
        await loginPage.login(testData.validUser.username, testData.validUser.password);
        await checkoutPage.navigate();

        await test.step('Navigate using keyboard only', async () => {
            await page.keyboard.press('Tab');
            await page.keyboard.press('Enter');
        });

        await test.step('Ensure checkout button is focusable', async () => {
            const checkoutButton = await page.locator('#checkout');
            expect(checkoutButton.isEnabled);
            console.log("Checkout button is Enabled")
        });

        await page.screenshot({ path: 'screenshots/EdgeTest/keyboard-nav.png' });
    });

    test.afterEach(async ({ page }, testInfo) => {
        if (testInfo.status !== 'passed') {
            console.log(`Test failed: ${testInfo.title}`);
            await page.screenshot({ path: `screenshots/failure-${testInfo.title.replace(/\s+/g, '_')}.png` });
        }
        console.log('Test completed');
    });

});
