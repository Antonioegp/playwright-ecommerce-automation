export class MyOrdersPage {

    constructor(page) {

        this.page = page;

        this.buttonGoBackToShop = page.getByRole('button', { name: 'Go Back to Shop' });


    }






}