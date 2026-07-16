export class RegisterPage {

    constructor(page) {

        this.page = page;

        this.headingRegister = page.getByRole('heading', { name: 'Register' });
        this.inputFirstName = page.getByRole('textbox', { name: 'First Name' });
        this.inputLastName = page.getByRole('textbox', { name: 'Last Name' });
        this.inputEmail = page.getByRole('textbox', { name: 'email@example.com' });
        this.inputPhoneNumber = page.getByRole('textbox', { name: 'enter your number' })
        this.selectOccupation = page.getByRole('combobox');
        this.checkGenderMale = page.locator("input[value='Male']");
        this.checkGenderFemale = page.locator("input[value='Female']");
        this.inputPassword = page.getByRole('textbox', { name: 'Passsword' });
        this.inputConfirmPassword = page.getByRole('textbox', { name: 'Confirm Password' });
        this.check18YearsOlder = page.getByRole('checkbox');
        this.invalidEmailText = page.getByText('*Enter Valid Email', { exact: true });
        this.emptyFirstNameText = page.getByText('*First Name is required', { exact: true });
        this.buttonRegister = page.getByRole('button');
        this.validRegisterMessagge = page.getByRole('heading', { name: 'Account Created Successfully' });
        this.invalidEmailRegister = page.locator("div[aria-label='User already exisits with this Email Id!']");
        this.invalidPasswordText = page.locator("div[aria-label='Password must be 8 Character Long!']");
        

    }

    async registerUser(firstName, lastName, email, phoneNumber, occupation, password, confirmPassword){
        await this.inputFirstName.fill(firstName);
        await this.inputLastName.fill(lastName);
        await this.inputEmail.fill(email);
        await this.inputPhoneNumber.fill(phoneNumber);
        await this.selectOccupation.selectOption(occupation);
        await this.checkGenderMale.click();
        await this.inputPassword.fill(password);
        await this.inputConfirmPassword.fill(confirmPassword);
        await this.check18YearsOlder.click();
        await this.buttonRegister.click();
    }



    

}