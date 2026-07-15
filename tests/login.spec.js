import { test, expect, request } from '@playwright/test';
import { LoginPage } from "../pages/index"
import { users } from "../test-data/users"
import { url } from  "../test-data/urls"

test('TC-LOGIN-001: Iniciar sesión con credenciales válidas', async ({ page }) => {
  
    const loginpage = new LoginPage(page);
    await loginpage.goTo(url.login);
    

});