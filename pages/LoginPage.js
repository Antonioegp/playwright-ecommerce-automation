export class LoginPage {

    constructor(page) {

        this.page = page;

        this.inputUsername = page.getByRole('textbox', {name: 'email@example.com' });
        this.inputPassword = page.getByRole('textbox', {name: 'enter your password'} );
        this.buttonSignIn = page.getByRole('button', {name: 'Login'});


    }


    async goTo(url) { 

        await this.page.goto(url);

    }

    async login(username, password){
        
    }

}