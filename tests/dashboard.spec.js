import { test, expect, request } from '@playwright/test';
import { LoginPage, DashboardPage, MyCartPage, MyOrdersPage } from "../pages/index"
import { users } from "../test-data/users"
import { url } from  "../test-data/urls"
import { products } from "../test-data/products"

test('@dashboard TC-DASHBOARD-001: Verificar la carga correcta del Dashboard tras iniciar sesión', async ({ page }) => {

    const loginPage = new LoginPage(page);
    await loginPage.goTo(url.login);
    await loginPage.login(users.mainUser.username, users.mainUser.password);

    const dashboardPage = new DashboardPage(page);
    await expect(dashboardPage.loginSuccessMessage).toBeVisible();
    await expect(page).toHaveURL(url.dashboard);
    await expect(dashboardPage.productCards.first()).toBeVisible();
    
});

test('@dashboard TC-DASHBOARD-002: Visualizar correctamente el catálogo de productos', async ({ page }) => {

    const loginPage = new LoginPage(page);
    await loginPage.goTo(url.login);
    await loginPage.login(users.mainUser.username, users.mainUser.password);

    const dashboardPage = new DashboardPage(page);
    await expect(dashboardPage.loginSuccessMessage).toBeVisible();
    await expect(page).toHaveURL(url.dashboard);
    await expect(dashboardPage.productCards.first()).toBeVisible();
    await expect(dashboardPage.productTitles.first()).toBeVisible();
    
});

test('@dashboard TC-DASHBOARD-003: Añadir un producto al carrito desde el Dashboard', async ({ page }) => {

    const loginPage = new LoginPage(page);
    await loginPage.goTo(url.login);
    await loginPage.login(users.mainUser.username, users.mainUser.password);

    const dashboardPage = new DashboardPage(page);
    await expect(dashboardPage.loginSuccessMessage).toBeVisible();
    await expect(page).toHaveURL(url.dashboard);
    await expect(dashboardPage.productCards.first()).toBeVisible();
    await expect(dashboardPage.productTitles.first()).toBeVisible();
    await dashboardPage.addFirstProductToCart();
    await expect(dashboardPage.cartBadge).toHaveText("1");

});

test('@dashboard TC-DASHBOARD-004: Añadir todos los productos al carrito', async ({ page }) => {

    const loginPage = new LoginPage(page);
    await loginPage.goTo(url.login);
    await loginPage.login(users.mainUser.username, users.mainUser.password);

    const dashboardPage = new DashboardPage(page);
    await expect(dashboardPage.loginSuccessMessage).toBeVisible();
    await expect(page).toHaveURL(url.dashboard);
    await expect(dashboardPage.productCards.first()).toBeVisible();
    await expect(dashboardPage.productTitles.first()).toBeVisible();
    let productsCount = await dashboardPage.addAllProductsToCart();
    await expect(dashboardPage.cartBadge).toHaveText(productsCount.toString());

});

test('@dashboard TC-DASHBOARD-005: Verificar que se muestra el mensaje de producto añadido correctamente', async ({ page }) => {

    const loginPage = new LoginPage(page);
    await loginPage.goTo(url.login);
    await loginPage.login(users.mainUser.username, users.mainUser.password);

    const dashboardPage = new DashboardPage(page);
    await expect(dashboardPage.loginSuccessMessage).toBeVisible();
    await expect(page).toHaveURL(url.dashboard);
    await expect(dashboardPage.productCards.first()).toBeVisible();
    await expect(dashboardPage.productTitles.first()).toBeVisible();
    await dashboardPage.addFirstProductToCart();
    await expect(dashboardPage.correctAddToCartText).toHaveText(" Product Added To Cart ");

});

test('@dashboard TC-DASHBOARD-006: Acceder a la página del carrito desde el Dashboard', async ({ page }) => {

    const loginPage = new LoginPage(page);
    await loginPage.goTo(url.login);
    await loginPage.login(users.mainUser.username, users.mainUser.password);

    const dashboardPage = new DashboardPage(page);
    await expect(dashboardPage.loginSuccessMessage).toBeVisible();
    await expect(page).toHaveURL(url.dashboard);
    await dashboardPage.goToCart();
    
    const myCartPage = new MyCartPage(page);
    await expect(myCartPage.headingMyCartTitle).toHaveText("My Cart");
    await expect(page).toHaveURL(url.myCart);

});

test('@dashboard TC-DASHBOARD-007: Acceder a la página My Orders desde el Dashboard', async ({ page }) => {

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

test('@dashboard TC-DASHBOARD-008: Cerrar sesión desde el Dashboard', async ({ page }) => {

    const loginPage = new LoginPage(page);
    await loginPage.goTo(url.login);
    await loginPage.login(users.mainUser.username, users.mainUser.password);

    const dashboardPage = new DashboardPage(page);
    await expect(dashboardPage.loginSuccessMessage).toBeVisible();
    await expect(page).toHaveURL(url.dashboard);
    await dashboardPage.logout();
    await expect(loginPage.logoutSuccessMessage).toHaveText(" Logout Successfully ");

});

test('@dashboard TC-DASHBOARD-009: Verificar que cada producto muestra nombre e imagen', async ({ page }) => {

    const loginPage = new LoginPage(page);
    await loginPage.goTo(url.login);
    await loginPage.login(users.mainUser.username, users.mainUser.password);

    const dashboardPage = new DashboardPage(page);
    await expect(dashboardPage.loginSuccessMessage).toBeVisible();
    await expect(page).toHaveURL(url.dashboard);
    await dashboardPage.assertAllProductsHaveTitleAndImage();

});

test('@dashboard TC-DASHBOARD-010: Verificar que cada producto muestra su precio', async ({ page }) => {

    const loginPage = new LoginPage(page);
    await loginPage.goTo(url.login);
    await loginPage.login(users.mainUser.username, users.mainUser.password);

    const dashboardPage = new DashboardPage(page);
    await expect(dashboardPage.loginSuccessMessage).toBeVisible();
    await expect(page).toHaveURL(url.dashboard);
    await dashboardPage.assertAllProductsHavePrices();

});

test('@dashboard TC-DASHBOARD-011: Verificar que el filtrado de un producto por su titulo es correcto', async ({ page }) => {

    const loginPage = new LoginPage(page);
    await loginPage.goTo(url.login);
    await loginPage.login(users.mainUser.username, users.mainUser.password);

    const dashboardPage = new DashboardPage(page);
    await expect(dashboardPage.loginSuccessMessage).toBeVisible();
    await expect(page).toHaveURL(url.dashboard);
    await dashboardPage.filterByProductName(products.adidasOriginal);
    let filterProductName = await dashboardPage.searchProductByTitle(products.adidasOriginal);
    await expect(filterProductName).toBe(products.adidasOriginal);

});

test('@dashboard TC-DASHBOARD-012: Verificar que el filtrado de un producto por su rango de precios es correcto', async ({ page }) => {

    const loginPage = new LoginPage(page);
    await loginPage.goTo(url.login);
    await loginPage.login(users.mainUser.username, users.mainUser.password);

    const dashboardPage = new DashboardPage(page);
    await expect(dashboardPage.loginSuccessMessage).toBeVisible();
    await expect(page).toHaveURL(url.dashboard);
    await dashboardPage.filterByPriceRange("10000", "12000");
    await dashboardPage.assertAllProductsPricesAreBetween(10000, 12000);

});





