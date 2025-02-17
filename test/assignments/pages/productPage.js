class ProductsPage {
    constructor(page) {
        this.page = page;
        this.sortDropdown = page.locator('.product_sort_container');
        this.inventoryItems = page.locator('.inventory_item_name');
        this.productPrices = page.locator('.inventory_item_price');
        this.searchBox = page.locator('.search-box'); 
        this.noResultsMessage = page.locator('.no-results');
    }

    async sortBy(option) {
        await this.sortDropdown.selectOption(option);
    }

    async getSortedProductNames() {
        return await this.inventoryItems.allTextContents();
    }

    async getProductPrices() {
        return (await this.productPrices.allTextContents()).map(price => parseFloat(price.replace('$', '')));
    }

    async getProductCount() {
        return await this.productList.count();  
    }
}

module.exports = ProductsPage;
