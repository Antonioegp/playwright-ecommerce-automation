import { test, expect, request } from '@playwright/test';
import { LoginPage, DashboardPage, MyCartPage, MyOrdersPage, CheckoutPage, RegisterPage } from "../pages/index"
import { users } from "../test-data/users"
import { url } from "../test-data/urls"
import { products } from "../test-data/products"
import { cvv, country, couponCodes } from '../test-data/checkout-data';

for (const product of Object.values(products)) {

    test(`@smoke TC-SMOKE-001: [${product}] Flujo E2E completo`, async ({ page }) => {

        const loginPage = new LoginPage(page);
        await loginPage.goTo(url.login);
        await loginPage.login(users.mainUser.username, users.mainUser.password);

        const dashboardPage = new DashboardPage(page);
        await expect(dashboardPage.loginSuccessMessage).toBeVisible();
        await expect(page).toHaveURL(url.dashboard);
        await expect(dashboardPage.productCards.first()).toBeVisible();
        await dashboardPage.searchAndAddProductToCart(product);
        await expect(dashboardPage.cartBadge).toHaveText("1");
        await dashboardPage.goToCart();

        const myCartPage = new MyCartPage(page);
        await expect(myCartPage.headingMyCartTitle).toHaveText("My Cart");
        await expect(page).toHaveURL(url.myCart);
        await expect(myCartPage.headingFirstProductNameInCart).toBeVisible();
        await expect(myCartPage.headingFirstProductNameInCart).toHaveText(product);
        await myCartPage.goToCheckout();
        await expect(page).toHaveURL(/order/);

        const checkoutPage = new CheckoutPage(page);
        await expect(checkoutPage.checkoutProductName.first()).toBeVisible();
        await checkoutPage.fillCheckoutForm(cvv.cvv1, couponCodes.validCouponCode, country.spain);
        await expect(checkoutPage.correctCheckoutMessagge).toHaveText("Thankyou for the order.");
        const orderId = await checkoutPage.getFirstOrderId();
        expect(orderId).toHaveLength(24);
        expect(orderId).toMatch(/^[a-f0-9]+$/i);
        await checkoutPage.goToOrders();

        const myOrdersPage = new MyOrdersPage(page);
        await expect(page).toHaveURL(url.myOrders);
        await expect(myOrdersPage.buttonGoBackToShop).toBeVisible();
        await myOrdersPage.searchOrderAndGoToView(orderId);
        await expect(myOrdersPage.viewOrderDetailsTitle).toBeVisible();
        await expect(myOrdersPage.orderIdInOrderSummary).toHaveText(orderId);
        await expect(myOrdersPage.productTitleInOrdersSummary).toHaveText(product);
        await myOrdersPage.signOut();
        await expect(loginPage.logoutSuccessMessage).toHaveText(" Logout Successfully ");

    });
}

test('@smoke TC-SMOKE-002: Verificar la navegación completa de la aplicación', async ({ page }) => {

    const loginPage = new LoginPage(page);
    await loginPage.goTo(url.login);
    await loginPage.goToRegisterPage();

    const registerPage = new RegisterPage(page);
    await expect(registerPage.headingRegister).toBeVisible();
    await registerPage.goToLogin();
    await expect(loginPage.inputUsername).toBeVisible();
    await expect(loginPage.inputPassword).toBeVisible();
    await expect(loginPage.buttonSignIn).toBeVisible();
    await loginPage.login(users.mainUser.username, users.mainUser.password);

    const dashboardPage = new DashboardPage(page);
    await expect(dashboardPage.loginSuccessMessage).toBeVisible();
    await expect(page).toHaveURL(url.dashboard);
    await expect(dashboardPage.productCards.first()).toBeVisible();
    await dashboardPage.goToOrders();

    const myOrdersPage = new MyOrdersPage(page);
    await expect(myOrdersPage.buttonGoBackToShop).toBeVisible();
    await myOrdersPage.goToDashboard();
    await expect(page).toHaveURL(url.dashboard);
    await expect(dashboardPage.productCards.first()).toBeVisible();
    await dashboardPage.addFirstProductToCart()
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
