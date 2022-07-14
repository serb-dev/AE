import { WebDriver, until, By } from "selenium-webdriver";
import { delay } from '../utils/utils';

export class CheckoutPage {
    driver: WebDriver;
    private emailForm: By = By.className('form-input-email');
    private firstNameForm: By = By.className('form-input-firstname');
    private lastNameForm: By = By.className('form-input-lastname');
    private adressForm: By = By.className('form-input-street-address1');
    private floorForm: By = By.className('form-input-street-address2');
    private cityForm: By = By.className('form-input-city');
    private stateSelector: By = By.name('states');
    private stateItem: By = By.xpath('.//select[@name="states"]/option[11]');
    private postalCode: By = By.className('form-input-postal-code');
    private confirmBtn: By = By.className('btn-block btn-place-order');
    // credit card
    private creditCard: By = By.className('form-input-card-number'); 
    private cardTerm: By = By.className('form-input-expiration-date');
    private CVV: By = By.className('form-input-security-code');
    private phone: By = By.className('form-input-phone-number');
    //errors txt
    private emailError: By = By.xpath('.//div[@class*="_input_15uv2l"]/div')
    private cardTermError: By
    private cvvError: By
    private numberError: By

    private modalBtn: By = By.className('qa-btn-cancel');

    constructor(driver:WebDriver) {
        this.driver = driver
    }

    public async goToCheckout(): Promise<void> {
        await delay(3000);
    }

    public async fillingInEmail(): Promise<void> {
        const email = await this.driver.wait(until.elementLocated(this.emailForm), 10000);
        await email.sendKeys('michele.kiehn@balistreri.com');
        await delay(1000);
    }

    public async fillingInPersonal(): Promise<void> {
        const firstName = await this.driver.wait(until.elementLocated(this.firstNameForm), 10000);
        await firstName.sendKeys('Jamey');
        await delay(3000);
        const lastname = await this.driver.wait(until.elementLocated(this.lastNameForm), 10000);
        await lastname.sendKeys('Stoltenberg');
        await delay(3000);
    }

    public async fillingInAdress(): Promise<void> {
        const street = await this.driver.wait(until.elementLocated(this.adressForm), 10000);
        await street.sendKeys('1375 Viewridge Rd');
        await delay(2000);
        const floor = await this.driver.wait(until.elementLocated(this.floorForm), 10000);
        await floor.sendKeys('4');
        await delay(2000);
        const city = await this.driver.wait(until.elementLocated(this.cityForm), 10000);
        await city.sendKeys('Bennett');
        await delay(2000);
        const states = await this.driver.wait(until.elementLocated(this.stateSelector), 10000);
        await states.click();
        await delay(2000);
        const state = await this.driver.wait(until.elementLocated(this.stateItem), 10000);
        await state.click();
        await delay(2000);
        const code = await this.driver.wait(until.elementLocated(this.postalCode), 10000);
        await code.sendKeys('80102');
        await delay(2000);
    }

    //Payment info

    public async fillingPaymentInfo(): Promise<void> {
        const card = await this.driver.wait(until.elementLocated(this.creditCard), 10000);
        await card.sendKeys('0000000000000000');
        await delay(2000);
        const cardTerm = await this.driver.wait(until.elementLocated(this.cardTerm), 10000);
        await cardTerm.sendKeys('0624');
        await delay(2000);
        const code = await this.driver.wait(until.elementLocated(this.CVV), 10000);
        await code.sendKeys('000');
        await delay(2000);
        const phone = await this.driver.wait(until.elementLocated(this.phone), 10000);
        await phone.sendKeys('3333333333');
        await delay(2000);
    }

    public async confirmClick(): Promise<void> {
        const button = await this.driver.wait(until.elementLocated(this.confirmBtn), 10000);
        await button.click();
        await delay(3000);
    }

    public async confirm(): Promise<void> {
        const button = await this.driver.wait(until.elementLocated(this.confirmBtn), 10000);
        await button.click();
        await delay(3000);
        await button.click();
        // const modal = await this.driver.wait(until.elementLocated(this.modalBtn), 10000);
        // await modal.click();
        // await delay(3000);
    }

    public async checkingProblem() {
        const errorEmail = await this.driver.wait(until.elementLocated(this.emailError), 10000);
        const text = await errorEmail.getText();
        if(text.concat('Please enter credit card number, this field can/t be empty')){
            console.log('done')
        }
        else{
            throw new Error('error message')
        }
    }
}