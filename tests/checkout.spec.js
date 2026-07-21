import { test, expect, request } from '@playwright/test';
import { LoginPage, DashboardPage, MyCartPage, MyOrdersPage, CheckoutPage } from "../pages/index"
import { users } from "../test-data/users"
import { url } from  "../test-data/urls"
import { products } from "../test-data/products"
import { cvv, country, couponCodes } from '../test-data/checkout-data';

test('@checkout TC-CHECKOUT-001: Acceder correctamente a la página de Checkout desde el carrito', async ({ page }) => {

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

test('@checkout TC-CHECKOUT-002: Verificar que se muestran correctamente los productos seleccionados', async ({ page }) => {

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
    await myCartPage.goToCheckout();
    await expect(page).toHaveURL(/order/);
    
    const checkoutPage = new CheckoutPage(page);
    await expect(checkoutPage.checkoutProductName).toHaveCount(productsCount);
    const allProductsNameInCheckout = await checkoutPage.getAllProductsNameInCheckout();
    expect(allProductsNameInCheckout).toHaveLength(allProductsName.length);

    const dashboard = allProductsName.map(p => p.toUpperCase()).sort();
    const checkout = allProductsNameInCheckout.map(p => p.toUpperCase()).sort();
    expect(checkout).toEqual(dashboard);
    
});

test('@checkout TC-CHECKOUT-003: Completar una compra con datos válidos', async ({ page }) => {

    const today = new Date().toISOString().split('T')[0];
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
    await expect(myCartPage.headingFirstProductNameInCart).toBeVisible();
    await myCartPage.goToCheckout();
    await expect(page).toHaveURL(/order/);
    
    const checkoutPage = new CheckoutPage(page);
    await expect(checkoutPage.checkoutProductName.first()).toBeVisible();
    await checkoutPage.fillCheckoutForm(cvv.cvv1, couponCodes.validCouponCode , country.spain);
    await expect(checkoutPage.correctCheckoutMessagge).toHaveText("Thankyou for the order.");
    await page.screenshot({path: `screenshots/TC-CHECKOUT-003-${today}.png`, fullPage: true,  });
    
});

test('@checkout TC-CHECKOUT-004: Buscar y seleccionar un país válido durante el proceso de compra', async ({ page }) => {

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
    await expect(myCartPage.headingFirstProductNameInCart).toBeVisible();
    await myCartPage.goToCheckout();
    await expect(page).toHaveURL(/order/);
    
    const checkoutPage = new CheckoutPage(page);
    await expect(checkoutPage.checkoutProductName.first()).toBeVisible();
    const countryOptionText = await checkoutPage.searchValidCountry(country.mexico);
    await expect(countryOptionText.trim()).toEqual(country.mexico);
    
});

test('@checkout TC-CHECKOUT-005: Verificar que se genera un identificador (Order ID) tras completar la compra', async ({ page }) => {

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
    await expect(myCartPage.headingFirstProductNameInCart).toBeVisible();
    await myCartPage.goToCheckout();
    await expect(page).toHaveURL(/order/);
    
    const checkoutPage = new CheckoutPage(page);
    await expect(checkoutPage.checkoutProductName.first()).toBeVisible();
    await checkoutPage.fillCheckoutForm(cvv.cvv1, couponCodes.validCouponCode , country.spain);
    await expect(checkoutPage.correctCheckoutMessagge).toHaveText("Thankyou for the order.");
    const orderId = await checkoutPage.getFirstOrderId();
    expect(orderId).toHaveLength(24);
    expect(orderId).toMatch(/^[a-f0-9]+$/i);

});

test('@checkout TC-CHECKOUT-006: Intentar completar la compra sin seleccionar un país', async ({ page }) => {

    const today = new Date().toISOString().split('T')[0];
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
    await expect(myCartPage.headingFirstProductNameInCart).toBeVisible();
    await myCartPage.goToCheckout();
    await expect(page).toHaveURL(/order/);
    
    const checkoutPage = new CheckoutPage(page);
    await expect(checkoutPage.checkoutProductName.first()).toBeVisible();
    await checkoutPage.fillCheckoutForm(cvv.cvv1, couponCodes.validCouponCode , "");
    await expect(checkoutPage.invalidPlaceOrderMessagge).toHaveText("Please Enter Full Shipping Information");
    
});

test('@checkout TC-CHECKOUT-007: Intentar aplicar un codigo de cupon invalido', async ({ page }) => {

    const today = new Date().toISOString().split('T')[0];
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
    await expect(myCartPage.headingFirstProductNameInCart).toBeVisible();
    await myCartPage.goToCheckout();
    await expect(page).toHaveURL(/order/);
    
    const checkoutPage = new CheckoutPage(page);
    await expect(checkoutPage.checkoutProductName.first()).toBeVisible();
    await checkoutPage.applyCoupon(couponCodes.invalidCouponCode);
    await expect(checkoutPage.couponApliedText).toHaveText("* Invalid Coupon");
    
});

test('@checkout TC-CHECKOUT-008: Verificar que el correo del usuario autenticado se muestra correctamente', async ({ page }) => {

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
    await expect(myCartPage.headingFirstProductNameInCart).toBeVisible();
    await myCartPage.goToCheckout();
    await expect(page).toHaveURL(/order/);
    
    const checkoutPage = new CheckoutPage(page);
    await expect(checkoutPage.checkoutProductName.first()).toBeVisible();
    const checkoutEmail = await checkoutPage.getUserEmailCheckout();
    await expect(checkoutEmail).toEqual(users.mainUser.username);

});

