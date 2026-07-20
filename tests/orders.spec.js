import { test, expect, request } from '@playwright/test';
import { LoginPage, DashboardPage, MyCartPage, MyOrdersPage, CheckoutPage } from "../pages/index"
import { users } from "../test-data/users"
import { url } from  "../test-data/urls"
import { products } from "../test-data/products"
import { cvv, country, couponCodes } from '../test-data/checkout-data';

test('@orders TC-ORDERS-001: Acceder correctamente a la página **My Orders** ', async ({ page }) => {

    const loginPage = new LoginPage(page);
    await loginPage.goTo(url.login);
    await loginPage.login(users.mainUser.username, users.mainUser.password);

    const dashboardPage = new DashboardPage(page);
    await expect(dashboardPage.loginSuccessMessage).toBeVisible();
    await expect(page).toHaveURL(url.dashboard);
    await dashboardPage.goToOrders();

    const myOrdersPage = new MyOrdersPage(page);
    await expect(page).toHaveURL(url.myOrders);
    await expect(myOrdersPage.buttonGoBackToShop).toBeVisible();
    
});

test('@orders TC-ORDERS-002: Verificar que el identificador (Order ID) del pedido es correcto', async ({ page }) => {

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
    await checkoutPage.goToOrders();

    const myOrdersPage = new MyOrdersPage(page);
    await expect(page).toHaveURL(url.myOrders);
    await expect(myOrdersPage.buttonGoBackToShop).toBeVisible();
    const orderIdOnMyOrders = await myOrdersPage.getMatchingOrderId(orderId);
    await expect(orderIdOnMyOrders).toEqual(orderId);
    
});

test('@orders TC-ORDERS-003: Verificar que el detalle del pedido muestra el Order Id correcto', async ({ page }) => {

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
    await checkoutPage.goToOrders();

    const myOrdersPage = new MyOrdersPage(page);
    await expect(page).toHaveURL(url.myOrders);
    await expect(myOrdersPage.buttonGoBackToShop).toBeVisible();
    const orderIdOnMyOrders = await myOrdersPage.getMatchingOrderId(orderId);
    await expect(orderIdOnMyOrders).toEqual(orderId);
    await myOrdersPage.searchOrderAndGoToView(orderId);
    await expect(myOrdersPage.viewOrderDetailsTitle).toBeVisible();
    await expect(myOrdersPage.orderIdInOrderSummary).toHaveText(orderId);
    
});

test('@orders TC-ORDERS-004: Volver al Dashboard desde la página **My Orders**', async ({ page }) => {

    const loginPage = new LoginPage(page);
    await loginPage.goTo(url.login);
    await loginPage.login(users.mainUser.username, users.mainUser.password);

    const dashboardPage = new DashboardPage(page);
    await expect(dashboardPage.loginSuccessMessage).toBeVisible();
    await expect(page).toHaveURL(url.dashboard);
    await dashboardPage.goToOrders();

    const myOrdersPage = new MyOrdersPage(page);
    await expect(page).toHaveURL(url.myOrders);
    await expect(myOrdersPage.buttonGoBackToShop).toBeVisible();
    await myOrdersPage.goToDashboard();
    await expect(page).toHaveURL(url.dashboard);
    await expect(dashboardPage.productCards.first()).toBeVisible();

});

test('@orders TC-ORDERS-005: Verificar que un usuario sin pedidos no visualiza órdenes registradas', async ({ page }) => {

    const today = new Date().toISOString().split('T')[0];
    const loginPage = new LoginPage(page);
    await loginPage.goTo(url.login);
    await loginPage.login(users.secondaryUser.username, users.secondaryUser.password);

    const dashboardPage = new DashboardPage(page);
    await expect(dashboardPage.loginSuccessMessage).toBeVisible();
    await expect(page).toHaveURL(url.dashboard);
    await dashboardPage.goToOrders();

    const myOrdersPage = new MyOrdersPage(page);
    await expect(page).toHaveURL(url.myOrders);
    await expect(myOrdersPage.buttonGoBackToShop).toBeVisible();
    await expect(myOrdersPage.noOrdersMessage).toContainText(" You have No Orders to show at this time.");
    await page.screenshot({path: `screenshots/TC-ORDERS-005-${today}.png`, fullPage: true,  });

});