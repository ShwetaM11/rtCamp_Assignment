const { test, expect } = require('@playwright/test');
const LoginPage = require('../pages/loginPage');
const ProductsPage = require('../pages/productPage');
const CartPage = require('../pages/cartPage');
const CheckoutPage = require('../pages/checkoutPage');
const testData = require('../testData');

test.describe('E2E Test Cases', () => {

    // Before each test, navigate to the login page and authenticate the user
    test.beforeEach(async ({ page }) => {
        const loginPage = new LoginPage(page);

        try {
            await test.step('Navigate to SauceDemo login page', async () => {
                console.log("Navigating to login page...");
                await loginPage.navigate();

                // Ensure we are on the correct login page by checking the URL
                expect(await page.url()).toContain('saucedemo');
                console.log("Successfully landed on login page.");
            });

            await test.step('Login with standard user', async () => {
                console.log(`Logging in as: ${testData.validUser.username}`);
                
                // Attempt login with provided credentials
                await loginPage.login(testData.validUser.username, testData.validUser.password);

                // Validate successful login by checking session or UI elements
                expect(await loginPage.isLoggedIn()).toBeTruthy();
                console.log("Login successful.");
            });

            await test.step('Verify successful login', async () => {
                console.log("Checking if inventory list is visible...");

                // Ensure that the inventory page is displayed after login
                await page.waitForSelector('.inventory_list', { timeout: 5000 });
                expect(await page.locator('.inventory_list').isVisible()).toBeTruthy();

                // Validate the user is redirected to the correct inventory page
                const currentURL = page.url();
                console.log(`Current URL after login: ${currentURL}`);
                expect(currentURL).toContain('/inventory.html');
            });

            // Capture screenshot for documentation
            await page.screenshot({ path: 'screenshots/E2E-Test/login-success.png' });

        } catch (error) {
            console.error('Error during login:', error);

            // Capture a screenshot in case of failure for debugging
            await page.screenshot({ path: 'screenshots/E2E-Test/login-error.png' });
            throw error;
        }
    });

    // Test case: Verify product sorting functionality (Z to A)
    test('Verify sorting order (Z-A)', async ({ page }) => {
        const productsPage = new ProductsPage(page);

        try {
            await test.step('Sort items in Z-A order', async () => {
                console.log("Sorting products from Z to A...");
                
                // Apply sorting filter
                await productsPage.sortBy("za");
            });

            await test.step('Verify sorted order', async () => {
                // Get the sorted product names from UI
                const sortedProducts = await productsPage.getSortedProductNames();
                console.log("Products after sorting:", sortedProducts);

                // Ensure product list is not empty before checking order
                expect(sortedProducts.length).toBeGreaterThan(0);

                // Validate sorting logic by comparing with manually sorted list
                const expectedSortedProducts = [...sortedProducts].sort((a, b) => b.localeCompare(a));
                expect(sortedProducts).toEqual(expectedSortedProducts);
                console.log("Sorting verification passed.");
            });

            // Capture a screenshot for validation
            await page.screenshot({ path: 'screenshots/E2E-Test/sort-ZtoA.png' });

        } catch (error) {
            console.error('Error in sorting test:', error);
            await page.screenshot({ path: 'screenshots/E2E-Test/sort-error.png' });
            throw error;
        }
    });

    // Test case: Verify product price sorting (High to Low)
    test('Verify price sorting (High-Low)', async ({ page }) => {
        const productsPage = new ProductsPage(page);

        try {
            await test.step('Sort items by price: High to Low', async () => {
                console.log("Sorting products by price (High to Low)...");
                await productsPage.sortBy("hilo");
            });

            await test.step('Verify sorted prices', async () => {
                // Fetch product prices from UI
                const productPrices = await productsPage.getProductPrices();
                console.log("Prices after sorting:", productPrices);

                // Ensure products are displayed before performing assertions
                expect(productPrices.length).toBeGreaterThan(0);

                // Validate if prices are sorted correctly in descending order
                expect(productPrices).toEqual([...productPrices].sort((a, b) => b - a));
                console.log("Price sorting verification passed.");
            });

            await page.screenshot({ path: 'screenshots/E2E-Test/sort-hilo.png' });

        } catch (error) {
            console.error('Error in price sorting test:', error);
            await page.screenshot({ path: 'screenshots/E2E-Test/sort-price-error.png' });
            throw error;
        }
    });

    // Test case: Add multiple products to cart and verify checkout process
    test('Add multiple items and validate checkout journey', async ({ page }) => {
        const checkoutPage = new CheckoutPage(page);
        const cartPage = new CartPage(page);

        try {
            await test.step('Add multiple items to cart', async () => {
                console.log(`Adding items to cart: ${testData.productsToAdd}`);
                await checkoutPage.addItemsToCart(testData.productsToAdd);
            });


            // Verify that the cart badge count matches the number of added products
            await test.step('Verify cart badge count', async () => {
                const cartBadge = page.locator('.shopping_cart_badge');
                await expect(cartBadge).toHaveText(String(testData.productsToAdd.length), { timeout: 5000 });
                console.log(`Cart badge count verified: ${await cartBadge.textContent()}`);
            });

            await test.step('Navigate to cart and verify items', async () => {
                await checkoutPage.goToCart();
                const cartItems = await cartPage.getCartItems();
                console.log("Items in cart:", cartItems);

                testData.productsToAdd.forEach(item => {
                    expect(cartItems).toContain(item);
                });
                console.log("Cart verification passed.");
            });

            await test.step('Proceed to checkout', async () => {
                console.log("Proceeding to checkout...");
                await cartPage.proceedToCheckout();
            });

            await test.step('Fill in checkout details', async () => {
                console.log("Filling checkout details...");
                await checkoutPage.fillCheckoutDetails('Shweta', 'Mehta', '1234');
            });

            await test.step('Verify subtotal, tax, and total calculations', async () => {
                // Retrieve checkout values
                const subtotal = await checkoutPage.getSubtotal();
                const tax = await checkoutPage.getTax();
                const total = await checkoutPage.getTotalPrice();

                console.log(`Subtotal: ${subtotal}, Tax: ${tax}, Total: ${total}`);
                
                // Ensure that subtotal, tax, and total calculations are correct
                expect(subtotal).toBeGreaterThan(0);
                expect(tax).toBeGreaterThan(0);
                expect(total).toBeCloseTo(subtotal + tax, 2);
            });

            await test.step('Verify order confirmation message', async () => {

                // Confirm that the order is successful
                const confirmationMessage = await checkoutPage.isOrderSuccessful();
                console.log("Order confirmation message:", confirmationMessage);
                expect(confirmationMessage).toBe('Thank you for your order!');
            });

            await page.screenshot({ path: 'screenshots/E2E-Test/order-confirmation.png' });

        } catch (error) {
            console.error('Error in checkout test:', error);
            // Capture screenshot after checkout success
            await page.screenshot({ path: 'screenshots/E2E-Test/checkout-error.png' });
            throw error;
        }
    });

    // After each test, capture failure screenshot if test fails
    test.afterEach(async ({ page }, testInfo) => {
        if (testInfo.status !== 'passed') {
            console.error(`Test failed: ${testInfo.title}`);
            await page.screenshot({ path: `screenshots/failure-${testInfo.title.replace(/\s+/g, '_')}.png` });
        }
        console.log(`Test execution completed: ${testInfo.title}`);
    });
});