export class MyCartPage {

    constructor(page) {

        this.page = page;

        this.headingMyCartTitle = page.getByRole('heading', { name: 'My Cart' });


    }






}