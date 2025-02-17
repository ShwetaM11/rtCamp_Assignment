class CartPage {
    constructor(page) {
        this.page = page;
        this.cartIcon = page.locator('.shopping_cart_link');
        this.cartBadge = page.locator('.shopping_cart_badge');
        this.cartItems = page.locator('.cart_item .inventory_item_name');
        this.checkoutButton = page.locator('[data-test="checkout"]');
        this.cartPrices = page.locator('.cart_item .inventory_item_price');
        this.errorMessage = page.locator('.summary_total_label');

    }

    async goToCart() {
        await this.cartIcon.click();
        await this.page.waitForSelector('.cart_list');
    }

    async getCartItems() {
        return await this.cartItems.allTextContents();
    }

    async getCartPrices() {

        console.log('Checking if cart items exist...');
        const itemCount = await this.cartItems.count();
        console.log('Total Item in cart :'+ itemCount);
    
        if (itemCount === 0) {
            throw new Error('No items found in the cart! Prices cannot be fetched.');
        }
    
        console.log('Fetching cart prices...');
        await this.page.waitForSelector('.cart_item .inventory_item_price', { timeout: 5000 }); // Ensure prices are available
        const prices = await this.cartPrices.allTextContents();
        console.log('Raw Prices:', prices);
    
        //Convert to numbers
        const numericPrices = prices.map(price => parseFloat(price.replace('$', '')));
        return numericPrices;
    }
    
    async proceedToCheckout() {
        await this.checkoutButton.click();
    }
    
    async navigate() {
        await this.page.goto('https://www.saucedemo.com/cart.html');
    }

    async getErrorMessage() {
        return await this.errorMessage.textContent();
    }
}

module.exports = CartPage;
