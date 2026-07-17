export class MyCartPage {

    constructor(page) {

        this.page = page;

        this.headingMyCartTitle = page.getByRole('heading', { name: 'My Cart' });
        this.headingNoProductsInCart = page.getByRole('heading', { name: 'No Products in Your Cart !' })
        this.headingFirstProductNameInCart = page.locator("div.cartSection h3").first();
        this.headingProductsNameInCart = page.locator("div.cartSection h3");
        this.productPricesInCart = page.locator("div.prodTotal p");
        this.buttonDeleteProduct = page.locator("button.btn-danger");
        this.buttonCheckout =  page.getByRole('button', { name: 'Checkout' })

    }

    async getAllProductNamesInCart(){

        const allProductsNameInCart = await this.headingProductsNameInCart.allInnerTexts();
        return allProductsNameInCart;
    }

    async getProductsCountInCart(){

        const productsCountInCart = await this.headingProductsNameInCart.count();
        return productsCountInCart;
    }

    async getFirstPriceProductInCart(){
        const firstProductPriceInCart = await this.productPricesInCart.first().textContent();
        return firstProductPriceInCart;
    }

    async deleteFirstProduct(){

        await this.buttonDeleteProduct.click()
    }

    async deleteAllProducts(){

        let eliminarProductos = await this.buttonDeleteProduct.all();

        for (let eliminarProducto of eliminarProductos){

            await eliminarProducto.click();
        }
    }

    async goToCheckout(){
        await this.buttonCheckout.click();
    }

    

}