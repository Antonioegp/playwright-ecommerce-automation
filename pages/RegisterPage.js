export class RegisterPage {

    constructor(page) {

        this.page = page;

        this.headingRegister = page.getByRole('heading', { name: 'Register' });
        this.inputFirstName = page.getByRole('textbox', { name: 'First Name' });
        this.inputLastName = page.getByRole('textbox', { name: 'Last Name' });
        this.inputEmail = page.getByRole('textbox', { name: 'email@example.com' });
        this.inputPhoneNumber = page.getByRole('textbox', { name: 'enter your number' })
        this.selectOccupation = page.getByRole('combobox');
        this.checkGenderMale = page.getByLabel('Male');
        this.checkGenderFemale = page.getByLabel('Female');
        this.inputPassword = page.getByRole('textbox', { name: 'Passsword' });
        this.inputConfirmPassword = page.getByRole('textbox', { name: 'Confirm Password' });
        this.check18YearsOlder = page.getByText('I am 18 year or Older', { exact: true });
        this.buttonRegister = page.getByRole('button');

    }

    async registerUser(firstName, lastName, email, phoneNumber, occupation, password, confirmPassword){
        await this.inputFirstName.fill(firstName);
        await this.inputLastName.fill(lastName);
        await this.inputEmail.fill(email);
        await this.inputPhoneNumber.fill(phoneNumber);
        await this.selectOccupation.selecOption(occupation);
        await this.checkGenderMale.click();
        await this.inputPassword.fill(password);
        await this.inputConfirmPassword.fill(confirmPassword);
        await this.check18YearsOlder.click();
        await this.buttonRegister.click();

    }



    

}