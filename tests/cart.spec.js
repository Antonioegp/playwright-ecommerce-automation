import { test, expect, request } from '@playwright/test';
import { LoginPage, DashboardPage, MyCartPage, MyOrdersPage, CheckoutPage } from "../pages/index"
import { users } from "../test-data/users"
import { url } from  "../test-data/urls"
import { products } from "../test-data/products"

test('@cart TC-CART-001: Visualizar correctamente la página del carrito', async ({ page }) => {

    const loginPage = new LoginPage(page);
    await loginPage.goTo(url.login);
    await loginPage.login(users.mainUser.username, users.mainUser.password);

    const dashboardPage = new DashboardPage(page);
    await expect(dashboardPage.loginSuccessMessage).toBeVisible();
    await expect(page).toHaveURL(url.dashboard);
    await expect(dashboardPage.productCards.first()).toBeVisible();
    await dashboardPage.goToCart();

    const myCartPage = new MyCartPage(page);
    await expect(myCartPage.headingMyCartTitle).toHaveText("My Cart");
    await expect(page).toHaveURL(url.myCart);
    await expect(myCartPage.headingNoProductsInCart).toHaveText("No Products in Your Cart !");

});

test('@cart TC-CART-002: Verificar que un producto añadido desde el Dashboard aparece en el carrito', async ({ page }) => {

    const loginPage = new LoginPage(page);
    await loginPage.goTo(url.login);
    await loginPage.login(users.mainUser.username, users.mainUser.password);

    const dashboardPage = new DashboardPage(page);
    await expect(dashboardPage.loginSuccessMessage).toBeVisible();
    await expect(page).toHaveURL(url.dashboard);
    await expect(dashboardPage.productCards.first()).toBeVisible();
    await dashboardPage.addFirstProductToCart();
    await expect(dashboardPage.cartBadge).toHaveText("1");
    const firstProductName = await dashboardPage.getFirstProductName();
    await dashboardPage.goToCart();

    const myCartPage = new MyCartPage(page);
    await expect(myCartPage.headingMyCartTitle).toHaveText("My Cart");
    await expect(page).toHaveURL(url.myCart);
    await expect(myCartPage.headingFirstProductNameInCart).toHaveText(firstProductName);

});

test('@cart TC-CART-003: Verificar que varios productos añadidos aparecen en el carrito', async ({ page }) => {

    const loginPage = new LoginPage(page);
    await loginPage.goTo(url.login);
    await loginPage.login(users.mainUser.username, users.mainUser.password);

    const dashboardPage = new DashboardPage(page);
    await expect(dashboardPage.loginSuccessMessage).toBeVisible();
    await expect(page).toHaveURL(url.dashboard);
    await expect(dashboardPage.productCards.first()).toBeVisible();
    const productsCount = await dashboardPage.addAllProductsToCart();
    await expect(dashboardPage.cartBadge).toHaveText(productsCount.toString());
    const allProductsName = await dashboardPage.getAllProductsName();
    await dashboardPage.goToCart();

    const myCartPage = new MyCartPage(page);
    await expect(myCartPage.headingMyCartTitle).toHaveText("My Cart");
    await expect(page).toHaveURL(url.myCart);
    await expect(myCartPage.headingFirstProductNameInCart).toBeVisible();
    const allProductsNameInCart = await myCartPage.getAllProductNamesInCart();
    expect(allProductsNameInCart).toEqual(allProductsName);
    const productsCountInCart = await myCartPage.getProductsCountInCart();
    expect(productsCountInCart).toEqual(productsCount);

});

test('@cart TC-CART-004: Verificar que se muestra el precio de un producto correctamente', async ({ page }) => {

    const loginPage = new LoginPage(page);
    await loginPage.goTo(url.login);
    await loginPage.login(users.mainUser.username, users.mainUser.password);

    const dashboardPage = new DashboardPage(page);
    await expect(dashboardPage.loginSuccessMessage).toBeVisible();
    await expect(page).toHaveURL(url.dashboard);
    await expect(dashboardPage.productCards.first()).toBeVisible();
    await dashboardPage.addFirstProductToCart();
    await expect(dashboardPage.cartBadge).toHaveText("1");
    const firstProductPrice = await dashboardPage.getFirstProductPrice();
    await dashboardPage.goToCart();

    const myCartPage = new MyCartPage(page);
    await expect(myCartPage.headingMyCartTitle).toHaveText("My Cart");
    await expect(page).toHaveURL(url.myCart);
    const firstProductPriceInCart = await myCartPage.getFirstPriceProductInCart();
    expect(firstProductPriceInCart).toEqual(firstProductPrice);

});

test('@cart TC-CART-005: Eliminar un producto del carrito', async ({ page }) => {

    const loginPage = new LoginPage(page);
    await loginPage.goTo(url.login);
    await loginPage.login(users.mainUser.username, users.mainUser.password);

    const dashboardPage = new DashboardPage(page);
    await expect(dashboardPage.loginSuccessMessage).toBeVisible();
    await expect(page).toHaveURL(url.dashboard);
    await expect(dashboardPage.productCards.first()).toBeVisible();
    await dashboardPage.addFirstProductToCart();
    await expect(dashboardPage.cartBadge).toHaveText("1");
    await dashboardPage.goToCart();

    const myCartPage = new MyCartPage(page);
    await expect(myCartPage.headingMyCartTitle).toHaveText("My Cart");
    await expect(page).toHaveURL(url.myCart);
    await expect(myCartPage.productPricesInCart.first()).toBeVisible();
    await myCartPage.deleteFirstProduct();
    await expect(myCartPage.headingNoProductsInCart).toHaveText("No Products in Your Cart !");

});

test('@cart TC-CART-006: Verificar que el carrito queda vacío tras eliminar todos los productos', async ({ page }) => {

    const loginPage = new LoginPage(page);
    await loginPage.goTo(url.login);
    await loginPage.login(users.mainUser.username, users.mainUser.password);

    const dashboardPage = new DashboardPage(page);
    await expect(dashboardPage.loginSuccessMessage).toBeVisible();
    await expect(page).toHaveURL(url.dashboard);
    await expect(dashboardPage.productCards.first()).toBeVisible();
    const productsCount = await dashboardPage.addAllProductsToCart();
    await expect(dashboardPage.cartBadge).toHaveText(productsCount.toString());
    await dashboardPage.goToCart();

    const myCartPage = new MyCartPage(page);
    await expect(myCartPage.headingMyCartTitle).toHaveText("My Cart");
    await expect(page).toHaveURL(url.myCart);
    await expect(myCartPage.headingFirstProductNameInCart).toBeVisible();
    await myCartPage.deleteAllProducts();
    await expect(myCartPage.headingNoProductsInCart).toHaveText("No Products in Your Cart !");

});

test('@cart TC-CART-007: Continuar al proceso de Checkout desde el carrito', async ({ page }) => {

    const loginPage = new LoginPage(page);
    await loginPage.goTo(url.login);
    await loginPage.login(users.mainUser.username, users.mainUser.password);

    const dashboardPage = new DashboardPage(page);
    await expect(dashboardPage.loginSuccessMessage).toBeVisible();
    await expect(page).toHaveURL(url.dashboard);
    await expect(dashboardPage.productCards.first()).toBeVisible();
    await dashboardPage.addFirstProductToCart();
    await expect(dashboardPage.cartBadge).toHaveText("1");
    await dashboardPage.goToCart();

    const myCartPage = new MyCartPage(page);
    await expect(myCartPage.headingMyCartTitle).toHaveText("My Cart");
    await expect(page).toHaveURL(url.myCart);
    await expect(myCartPage.productPricesInCart.first()).toBeVisible();
    await myCartPage.goToCheckout();
    await expect(page).toHaveURL(/order/);
    
    const checkoutPage = new CheckoutPage(page);
    await expect(checkoutPage.checkoutProductName.first()).toBeVisible();


});


