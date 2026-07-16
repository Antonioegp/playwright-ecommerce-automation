export class LoginPage {

    constructor(page) {

        this.page = page;

        this.inputUsername = page.getByRole('textbox', {name: 'email@example.com' });
        this.inputPassword = page.getByRole('textbox', { name: 'enter your passsword' });
        this.buttonSignIn = page.getByRole('button', { name: 'Login' });
        this.incorrectLoginMessagge = page.locator("div.toast-message");
        this.incorrectEmailMessagge = page.getByText('*Email is required', { exact: true });
        this.incorrectPasswordMessage = page.getByText('*Password is required', { exact: true });
        this.registerLink = page.locator("p.login-wrapper-footer-text");


    }


    async goTo(url) { 

        await this.page.goto(url);
    }

    async login(username, password){
        await this.inputUsername.fill(username);
        await this.inputPassword.fill(password);
        await this.buttonSignIn.click();
    }

    async goToRegisterPage(){
        await this.registerLink.click()
    }



}