class CheckoutPage {
    constructor(page) {
        this.page = page;
        this.firstNameInput = page.locator('[data-test="firstName"]');
        this.lastNameInput = page.locator('[data-test="lastName"]');
        this.zipInput = page.locator('[data-test="postalCode"]');
        this.continueButton = page.locator('[data-test="continue"]');
        this.finishButton = page.locator('[data-test="finish"]');
        this.totalPrice = page.locator('.summary_total_label');
        this.successMessage = page.locator('.complete-header');
        this.subtotalLocator = page.locator('.summary_subtotal_label');
        this.taxLocator = page.locator('.summary_tax_label');
        this.checkoutButton = page.locator('#checkout');
    }

    async goToCart() {
        await this.page.click('.shopping_cart_link');
    }

    async addItemsToCart(items) {
        for (const item of items) {
            const itemLocator = this.page.locator(`.inventory_item:has-text("${item}") button`);
            await itemLocator.click();
        }
    }

    async fillCheckoutDetails(firstName, lastName, zip) {
        await this.firstNameInput.fill(firstName);
        await this.lastNameInput.fill(lastName);
        await this.zipInput.fill(zip);
        await this.continueButton.click();
    }

    async getTotalPrice() {
        
        await this.page.locator('.summary_total_label').scrollIntoViewIfNeeded();
    
        const price = await this.page.locator('.summary_total_label').textContent();
        console.log(`Total Price: ${price}`);
        const priceWithoutDollar = price.replace('$', '').trim();
        console.log(`Price without $: ${priceWithoutDollar}`);
    
        //Use a regular expression to extract the number after "Total: "
        const priceMatch = priceWithoutDollar.match(/Total:\s*(\d+\.\d{2})/);
    
        // Check if the regular expression match is successful
        if (priceMatch) {         
            return parseFloat(priceMatch[1]);
        }else {
            console.log('Price not found.');
            return null;
        } 
    }

    async getSubtotal() {
        console.log('Fetching subtotal...');
        await this.page.waitForSelector('.summary_subtotal_label', { timeout: 5000 }); 
        const subtotalText = await this.subtotalLocator.innerText();
        console.log('Subtotal found:', subtotalText);
        return parseFloat(subtotalText.replace('Item total: $', '')); 
    }

    async getTax() { 
        console.log('Fetching tax...');
        await this.page.waitForSelector('.summary_tax_label', { timeout: 5000 }); 
        const taxText = await this.taxLocator.innerText();
        console.log('Tax found:', taxText);
        return parseFloat(taxText.replace('Tax: $', '')); 
    }

    async isOrderSuccessful() {

        await this.finishButton.click();
        return await this.successMessage.textContent();
    }

   async navigate() {
        await this.page.goto('https://www.saucedemo.com/checkout-step-one.html');
    }

    async proceedToCheckout() {
        await this.checkoutButton.click();
    }
}

module.exports = CheckoutPage;
