import { expect } from '@playwright/test';

export class DashboardPage {

    constructor(page) {

        this.page = page;

        this.loginSuccessMessage = page.getByLabel('Login Successfully');
        this.completeProductCards = page.locator("div.col-lg-4");
        this.productCards = page.locator("div.card-body");
        this.productTitles = page.locator("div.card-body b");
        this.productPrices = page.locator("div.card-body div.text-muted");
        this.buttonProductAddToCart = page.locator("div.card-body button.w-10");
        this.inputProductSearchByTitle = page.locator("input[name='search']").last();
        this.correctAddToCartText = page.locator("div[aria-label='Product Added To Cart']");
        this.inputMinPriceFilter = page.locator("input[formcontrolname='minPrice']").last();
        this.inputMaxPriceFilter = page.locator("input[formcontrolname='maxPrice']").last();
        this.buttonOrders = page.getByRole('button', { name: 'ORDERS' });
        this.buttonCart = page.locator("button[routerlink='/dashboard/cart']");
        this.cartBadge = page.locator("button[routerlink='/dashboard/cart'] label");
        this.buttonSignOut = page.getByRole('button', { name: 'Sign Out' });

    }

    async addFirstProductToCart(){
        await this.buttonProductAddToCart.first().click();
    }

    async getFirstProductName(){
        const firstProductName = await this.productTitles.first().textContent();
        return firstProductName;
    }

    async getAllProductsName(){
        const allProductsName = await this.productTitles.allInnerTexts();
        return allProductsName;
    }

    async addAllProductsToCart(){

        let productsCount = 0;
        let cartasDeProductos = await this.productCards.all();

        for (let cartaDeProducto of cartasDeProductos){
            await cartaDeProducto.locator("button.w-10").click();
            productsCount++;
            await expect(this.correctAddToCartText).toBeHidden();
        }

        return productsCount;

    }

    async getFirstProductPrice(){
        const firstProductPrice = await this.productPrices.first().textContent();
        return firstProductPrice;
    }

    async filterByPriceRange(minPrice, maxPrice){

        await this.inputMinPriceFilter.fill(minPrice);
        await this.inputMaxPriceFilter.fill(maxPrice);
        await this.inputMaxPriceFilter.press("Enter");
        await this.page.waitForTimeout(3000);
    }

    async filterByProductName(productName){

        await this.inputProductSearchByTitle.fill(productName);
        await this.inputProductSearchByTitle.press("Enter");
        await this.page.waitForTimeout(3000);
    }

    async searchProductByTitle(productName){

        let cartasDeProductos = await this.productCards.all();
        let filterProductName;

        for (let cartaDeProducto of cartasDeProductos){
            filterProductName = await cartaDeProducto.locator("b").textContent();
        }

        return filterProductName;
    }

    async assertAllProductsHaveTitleAndImage(){

        let cartasDeProductos = await this.completeProductCards.all();

        for (let cartaDeProducto of cartasDeProductos){
            await expect(cartaDeProducto.locator("img")).toBeVisible();
            await expect(cartaDeProducto.locator("b")).toBeVisible();
        }

    }

    async assertAllProductsPricesAreBetween(minPrice, maxPrice) {

        const cartasDeProductos = await this.productCards.all();

        for (let cartaDeProducto of cartasDeProductos){

            const textoPrecio = await cartaDeProducto.locator("div.text-muted").textContent();
            const precio = Number(textoPrecio.replace(/[^0-9.]/g, ""));

            expect(precio).toBeGreaterThanOrEqual(minPrice);
            expect(precio).toBeLessThanOrEqual(maxPrice);

        }
    
    }

    async assertAllProductsHavePrices(){

        let cartasDeProductos = await this.productCards.all();

        for (let cartaDeProducto of cartasDeProductos){
            await expect(cartaDeProducto.locator("div.text-muted")).toBeVisible();
        }

    }

    async goToCart(){
        await this.buttonCart.click();
    }

    async goToOrders(){
        await this.buttonOrders.click();
    }

    async logout(){
        await this.buttonSignOut.click();
    }





    

}