import { test, expect, request } from '@playwright/test';
import { LoginPage, DashboardPage, MyCartPage, MyOrdersPage, CheckoutPage } from "../pages/index"
import { users } from "../test-data/users"
import { url } from  "../test-data/urls"
import { products } from "../test-data/products"
import { cvv, country, couponCodes } from '../test-data/checkout-data';
import { apiData } from '../test-data/api-data';

test('@api TC-API-001: Iniciar sesión mediante la API con credenciales válidas', async ({ page }) => {

    const apiContext = await request.newContext();

    const loginResponse = await apiContext.post("https://rahulshettyacademy.com/api/ecom/auth/login", 
    {
        data: apiData.validLogin
    }
    )

    expect((await loginResponse).ok()).toBeTruthy();
    const loginResponseJSON = await loginResponse.json();
    let token = loginResponseJSON.token;
    
    console.log("Token normalizado del login: "+ token);
});

test('@api TC-API-002: Obtener correctamente el listado de productos (POST Products)', async ({ page }) => {

    const apiContext = await request.newContext();

    const loginResponse = await apiContext.post("https://rahulshettyacademy.com/api/ecom/auth/login", 
    {
        data: apiData.validLogin
    }
    )

    expect((await loginResponse).ok()).toBeTruthy();
    const loginResponseJSON = await loginResponse.json();
    let token = loginResponseJSON.token;
    
    const allProductsResponse = await apiContext.post("https://rahulshettyacademy.com/api/ecom/product/get-all-products",
        {
            headers: {
            "authorization" : token,
            "Content-Type" : "application/json"
        },
     })

     expect(allProductsResponse.ok()).toBeTruthy();
     const allProductsResponseJSON = await (await allProductsResponse).json();

    for (const product of allProductsResponseJSON.data) {
    console.log(
        `Name: ${product.productName} | Category: ${product.productCategory} | Price: ${product.productPrice} | ID: ${product._id}`
    );
 }
});


test('@api TC-API-003: Verificar error al iniciar sesión con credenciales inválidas', async ({ page }) => {

    const apiContext = await request.newContext();

    const loginResponse = await apiContext.post("https://rahulshettyacademy.com/api/ecom/auth/login", 
    {
        data: apiData.invalidLogin
    }
    )

    expect((await loginResponse).status()).toBe(400);
    const loginResponseJSON = await loginResponse.json();
    console.log(loginResponseJSON);
    expect(loginResponseJSON.message).toContain("Incorrect email or password")
    
});

test('@api TC-API-004: Crear un nuevo pedido mediante la API y validar la respuesta', async ({ page }) => {

    const apiContext = await request.newContext();

    const loginResponse = await apiContext.post("https://rahulshettyacademy.com/api/ecom/auth/login", 
    {
        data: apiData.validLogin
    }
    )

    expect((await loginResponse).ok()).toBeTruthy();
    const loginResponseJSON = await loginResponse.json();
    let token = loginResponseJSON.token;

    const orderResponse = await apiContext.post("https://rahulshettyacademy.com/api/ecom/order/create-order",
        {
            data: apiData.orderPayLoad,

            headers:  {
                "authorization" : token,
                "Content-Type" : "application/json"
            },
        }
    )

    const orderResponseJSON = await orderResponse.json();
    console.log(orderResponseJSON);

    expect(orderResponseJSON.orders).toHaveLength(1);
    const orderId = orderResponseJSON.orders[0];    
    expect(orderId).toHaveLength(24);
    expect(orderId).toMatch(/^[a-f0-9]+$/i);

});

test('@api TC-API-005: Crear un nuevo pedido mediante la API y validar el Order ID generado en el front', async ({ page }) => {

    const apiContext = await request.newContext();

    const loginResponse = await apiContext.post("https://rahulshettyacademy.com/api/ecom/auth/login", 
    {
        data: apiData.validLogin
    }
    )

    expect((await loginResponse).ok()).toBeTruthy();
    const loginResponseJSON = await loginResponse.json();
    let token = loginResponseJSON.token;

    const orderResponse = await apiContext.post("https://rahulshettyacademy.com/api/ecom/order/create-order",
        {
            data: apiData.orderPayLoad,

            headers:  {
                "authorization" : token,
                "Content-Type" : "application/json"
            },
        }
    )

    const orderResponseJSON = await orderResponse.json();
    console.log(orderResponseJSON);

    expect(orderResponseJSON.orders).toHaveLength(1);
    const apiOrderId = orderResponseJSON.orders[0];    
    expect(apiOrderId).toHaveLength(24);
    expect(apiOrderId).toMatch(/^[a-f0-9]+$/i);

    await page.addInitScript(value => {
    window.localStorage.setItem('token', value);
    }, token );

    await page.goto(url.dashboard);
    const today = new Date().toISOString().split('T')[0];
    const dashboardPage = new DashboardPage(page);
    await expect(dashboardPage.productCards.first()).toBeVisible();
    await dashboardPage.goToOrders();

    const myOrdersPage = new MyOrdersPage(page);
    await expect(page).toHaveURL(url.myOrders);
    await expect(myOrdersPage.buttonGoBackToShop).toBeVisible();
    const orderIdOnMyOrders = await myOrdersPage.getMatchingOrderId(apiOrderId);
    await expect(orderIdOnMyOrders).toEqual(apiOrderId);
    await page.screenshot({path: `screenshots/TC-API-005-${today}.png`, fullPage: true,  });

});

test('@api TC-API-006: Simular mediante Mock una respuesta sin pedidos y verificar el mensaje mostrado', async ({ page }) => {

    const apiContext = await request.newContext();

    const loginResponse = await apiContext.post("https://rahulshettyacademy.com/api/ecom/auth/login", 
    {
        data: apiData.validLogin
    }
    )

    expect((await loginResponse).ok()).toBeTruthy();
    const loginResponseJSON = await loginResponse.json();
    let token = loginResponseJSON.token;

    const orderResponse = await apiContext.post("https://rahulshettyacademy.com/api/ecom/order/create-order",
        {
            data: apiData.orderPayLoad,

            headers:  {
                "authorization" : token,
                "Content-Type" : "application/json"
            },
        }
    )

    const orderResponseJSON = await orderResponse.json();
    console.log(orderResponseJSON);

    expect(orderResponseJSON.orders).toHaveLength(1);
    const apiOrderId = orderResponseJSON.orders[0];    
    expect(apiOrderId).toHaveLength(24);
    expect(apiOrderId).toMatch(/^[a-f0-9]+$/i);

    await page.addInitScript(value => {
    window.localStorage.setItem('token', value);
    }, token );

    await page.goto(url.dashboard);
    const today = new Date().toISOString().split('T')[0];
    const dashboardPage = new DashboardPage(page);
    await expect(dashboardPage.productCards.first()).toBeVisible();

    //MOCK:
    const fakeOrderPayload = { data: [], message: "No Orders" };

    await page.route("https://rahulshettyacademy.com/api/ecom/order/get-orders-for-customer/*",
        async route => {

            const response = await page.request.fetch(route.request()); 
            let body = JSON.stringify(fakeOrderPayload); 

            route.fulfill({

                response,
                body,

            })

        });

    await dashboardPage.goToOrders();

    const myOrdersPage = new MyOrdersPage(page);
    await expect(page).toHaveURL(url.myOrders);
    await expect(myOrdersPage.buttonGoBackToShop).toBeVisible();
    await expect(myOrdersPage.noOrdersMessage).toContainText(" You have No Orders to show at this time.");
    await page.screenshot({path: `screenshots/TC-API-006-${today}.png`, fullPage: true,  });

});

