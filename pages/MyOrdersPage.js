import { expect } from '@playwright/test';

export class MyOrdersPage {

    constructor(page) {

        this.page = page;

        this.buttonGoBackToShop = page.getByRole('button', { name: 'Go Back to Shop' });
        this.orderDetailRows = page.locator("tr.ng-star-inserted");
        this.buttonViewOrder = page.locator("tr.ng-star-inserted  td button.btn-primary");
        this.viewOrderDetailsTitle = page.locator("div.email-title");
        this.orderIdInOrderSummary = page.locator("div.col-text");
        this.productTitleInOrdersSummary = page.locator("div.title");
        this.buttonHome = page.locator("button[routerlink='/dashboard/']");
        this.noOrdersMessage = page.getByText('You have No Orders to show at this time. Please Visit Back Us', { exact: true });
        this.buttonSignOut = page.getByRole('button', { name: 'Sign Out' });

    }

    async getMatchingOrderId(orderId){

        const orderDetails = await this.orderDetailRows.all();
        let orderDetailId;

        for(let orderDetail of orderDetails){

            orderDetailId = await orderDetail.locator("th").textContent();

            if(orderDetailId == orderId){

                break;
            }
        }
        return orderDetailId;
    }

    async searchOrderAndGoToView(orderId){

        const orderDetails = await this.orderDetailRows.all();
        let orderDetailId;

        for(let orderDetail of orderDetails){

            orderDetailId = await orderDetail.locator("th").textContent();

            if(orderDetailId == orderId){
                await orderDetail.locator("button.btn-primary").click();
                break;
            }
        }
 
       }

    async goToDashboard(){

        await this.buttonHome.click();

    }

    async signOut(){

        await this.buttonSignOut.click();
    }
}


