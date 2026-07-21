import { expect } from '@playwright/test';

export class CheckoutPage {

    constructor(page) {

        this.page = page;

        this.checkoutProductName = page.locator("div.item__title");
        this.inputCreditCardNumber = page.locator("div.field input.text-validated");
        this.selectMonthExpiryDate = page.locator("div.small select").first();
        this.selectDayExpiryDate = page.locator("div.small select").last();
        this.inputCVVCode = page.locator("div.small input").first();
        this.inputCouponCode = page.locator("div.small input").last();
        this.buttonApplyCoupon = page.getByRole('button', { name: 'Apply Coupon' });
        this.correctCouponAppliedText = page.getByText('* Coupon Applied', { exact: true });
        this.couponApliedText = page.locator("div.small p");
        this.inputEmail = page.locator("div.user__name input.ng-touched");
        this.labelEmail = page.locator("div.user__name label");
        this.selectCountry = page.getByRole('textbox', { name: 'Select Country' });
        this.countryList = page.locator("section.ta-results span");
        this.buttonPlaceOrder = page.locator("div.actions a");
        this.invalidPlaceOrderMessagge = page.getByLabel('Please Enter Full Shipping Information');
        this.correctCheckoutMessagge = page.getByRole('heading', { name: 'Thankyou for the order.' });
        this.checkoutOrderID = page.locator("td.em-spacer-1 label.ng-star-inserted");
        this.buttonOrders = page.getByRole('button', { name: 'ORDERS' });
        this.buttonSignOut = page.getByRole('button', { name: 'Sign Out' });

    }

    async getAllProductsNameInCheckout(){

        const allProductsNameInCheckout = await this.checkoutProductName.allInnerTexts();
        return allProductsNameInCheckout;
    }

    async fillCheckoutForm(cvvCode, couponCode, country){
        await this.inputCVVCode.fill(cvvCode);
        await this.inputCouponCode.fill(couponCode);
        await this.buttonApplyCoupon.click();
        await expect(this.correctCouponAppliedText).toHaveText("* Coupon Applied");

        if(country){
            await this.selectCountry.pressSequentially(country);
            await this.countryList.filter({ hasText: country }).click();
        }

        await this.buttonPlaceOrder.click();
    }
    
    async searchValidCountry(country){

        await this.selectCountry.pressSequentially(country);
        const countryOption = this.countryList.filter({ hasText: country });
        await expect(countryOption).toBeVisible();
        const countryOptionText = this.countryList.filter({ hasText: country }).textContent();
        return countryOptionText;
    }

    async getFirstOrderId(){

        await expect(this.checkoutOrderID.first()).toBeVisible();
        const orderId = await this.checkoutOrderID.first().innerText();
        return orderId.replace(/\|/g, '').trim();
    }

    async getAllOrderIds(){

        await expect(this.checkoutOrderID.first()).toBeVisible();
        const orderIds = await this.checkoutOrderID.allInnerTexts();
        return orderIds.map(id => id.replace(/\|/g, '').trim());
    }

    async applyCoupon(couponCode){

        await this.inputCouponCode.fill(couponCode);
        await this.buttonApplyCoupon.click();
        await expect(this.couponApliedText).toBeVisible();

    }

    async getUserEmailCheckout(){

        const checkoutEmail = await this.labelEmail.innerText();
        return checkoutEmail;

    }

    async goToOrders(){

        await this.buttonOrders.click();
    }

    async signOut(){

        await this.buttonSignOut.click();
    }

}