import { test, expect, request } from '@playwright/test';
import { LoginPage, RegisterPage } from "../pages/index"
import { users, occupation } from "../test-data/users"
import { url } from  "../test-data/urls"

test('@register TC-REGISTER-001: Registrar un usuario con datos válidos', async ({ page }) => {
  
    const loginPage = new LoginPage(page);
    await loginPage.goTo(url.login);
    await loginPage.goToRegisterPage();

    const registerPage = new RegisterPage(page);
    await expect(registerPage.headingRegister).toBeVisible();
    
    
});