import { test, expect, request } from '@playwright/test';
import { LoginPage, RegisterPage } from "../pages/index"
import { users, occupation } from "../test-data/users"
import { url } from  "../test-data/urls"

test('@register TC-REGISTER-001: Registrar un usuario con datos válidos', async ({ page }) => {
    
    const today = new Date().toISOString().split('T')[0];
    const loginPage = new LoginPage(page);
    await loginPage.goTo(url.login);
    await loginPage.goToRegisterPage();

    const registerPage = new RegisterPage(page);
    await expect(registerPage.headingRegister).toBeVisible();
    await registerPage.registerUser(users.validRandomUser.firstName, users.validRandomUser.lastName, users.validRandomUser.username, users.validRandomUser.phoneNumber, occupation.engineer, users.validRandomUser.password, users.validRandomUser.password);
    await expect(registerPage.validRegisterMessagge).toHaveText("Account Created Successfully");
    await page.screenshot({path: `screenshots/TC-REGISTER-001-${today}.png`, fullPage: true,  });
    
});

test('@register TC-REGISTER-002: Registrar un usuario ya existente', async ({ page }) => {
  
    const loginPage = new LoginPage(page);
    await loginPage.goTo(url.login);
    await loginPage.goToRegisterPage();

    const registerPage = new RegisterPage(page);
    await expect(registerPage.headingRegister).toBeVisible();
    await registerPage.registerUser(users.validRandomUser.firstName, users.validRandomUser.lastName, users.mainUser.username, users.validRandomUser.phoneNumber, occupation.engineer, users.validRandomUser.password, users.validRandomUser.password);
    await expect(registerPage.invalidEmailRegister).toHaveText(" User already exisits with this Email Id! ");
    
});

test('@register TC-REGISTER-003: Registrar un usuario con email inválido', async ({ page }) => {
  
    const loginPage = new LoginPage(page);
    await loginPage.goTo(url.login);
    await loginPage.goToRegisterPage();

    const registerPage = new RegisterPage(page);
    await expect(registerPage.headingRegister).toBeVisible();
    await registerPage.registerUser(users.validRandomUser.firstName, users.validRandomUser.lastName, "emailInvalido", users.validRandomUser.phoneNumber, occupation.engineer, users.validRandomUser.password, users.validRandomUser.password);
    await expect(registerPage.invalidEmailText).toBeVisible();
    
});

test('@register TC-REGISTER-004: Registrar un usuario con contraseña inválida', async ({ page }) => {
  
    const loginPage = new LoginPage(page);
    await loginPage.goTo(url.login);
    await loginPage.goToRegisterPage();

    const registerPage = new RegisterPage(page);
    await expect(registerPage.headingRegister).toBeVisible();
    await registerPage.registerUser(users.validRandomUser.firstName, users.validRandomUser.lastName, users.mainUser.username, users.validRandomUser.phoneNumber, occupation.engineer, "pass", "pass");
    await expect(registerPage.invalidPasswordText).toHaveText(" Password must be 8 Character Long! ");
    
});

test('@register TC-REGISTER-005: Registrar un usuario con campos obligatorios vacíos', async ({ page }) => {
  
    const loginPage = new LoginPage(page);
    await loginPage.goTo(url.login);
    await loginPage.goToRegisterPage();

    const registerPage = new RegisterPage(page);
    await expect(registerPage.headingRegister).toBeVisible();
    await registerPage.registerUser("","","","",occupation.engineer,"","");
    await expect(registerPage.emptyFirstNameText).toHaveText("*First Name is required");
    await expect(page).toHaveURL(url.register);
    
});
