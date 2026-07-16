import { test, expect, request } from '@playwright/test';
import { LoginPage, DashboardPage } from "../pages/index"
import { users } from "../test-data/users"
import { url } from  "../test-data/urls"

test('@login TC-LOGIN-001: Iniciar sesión con credenciales válidas', async ({ page }) => {
  
    const loginPage = new LoginPage(page);
    await loginPage.goTo(url.login);
    await loginPage.login(users.mainUser.username, users.mainUser.password);

    const dashboardPage = new DashboardPage(page);
    await expect(dashboardPage.loginSuccessMessage).toBeVisible()
    await expect(page).toHaveURL(url.dashboard)
    
});

test('@login TC-LOGIN-002: Iniciar sesión con contraseña incorrecta', async ({ page }) => {
  
    const loginPage = new LoginPage(page);
    await loginPage.goTo(url.login);
    await loginPage.login(users.mainUser.username, users.mainUser.incorrectPassword);
    await expect(loginPage.incorrectLoginMessagge).toBeVisible();
    
});

test('@login TC-LOGIN-003: Iniciar sesión con usuario inexistente', async ({ page }) => {
  
    const loginPage = new LoginPage(page);
    await loginPage.goTo(url.login);
    await loginPage.login(users.validRandomUser.username, users.validRandomUser.password);
    await expect(loginPage.incorrectLoginMessagge).toBeVisible();
    
});

test('@login TC-LOGIN-004: Iniciar sesión con campos vacíos', async ({ page }) => {
  
    const loginPage = new LoginPage(page);
    await loginPage.goTo(url.login);
    await loginPage.login("", "");
    await expect(loginPage.incorrectEmailMessagge).toHaveText("*Email is required");
    await expect(loginPage.incorrectPasswordMessage).toHaveText("*Password is required");
    
});

test('@login TC-LOGIN-005: Verificar mensaje de error para credenciales inválidas', async ({ page }) => {
  
    const loginPage = new LoginPage(page);
    await loginPage.goTo(url.login);
    await loginPage.login(users.validRandomUser.username, users.validRandomUser.password);
    await expect(loginPage.incorrectLoginMessagge).toHaveText("Incorrect email or password.");
    
});