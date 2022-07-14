import { WebDriver, until, By } from "selenium-webdriver";
import { delay } from '../utils/utils';
import logger from '../logger/logger';
import { getCity } from "../features/api/api";

export class CheckoutPage {
    driver: WebDriver;
    private emailForm: By = By.className('form-input-email');
    private firstNameForm: By = By.className('form-input-firstname');
    private lastNameForm: By = By.className('form-input-lastname');
    private adressForm: By = By.className('form-input-street-address1');
    private floorForm: By = By.className('form-input-street-address2');
    private cityForm: By = By.className('form-input-city');
    private stateSelector: By = By.name('states');
    private stateItem: By = By.xpath('.//select[@name="states"]/option[14]');
    private postalCode: By = By.className('form-input-postal-code');
    private confirmBtn: By = By.className('btn-block btn-place-order');
    // credit card
    private creditCard: By = By.className('form-input-card-number'); 
    private cardTerm: By = By.className('form-input-expiration-date');
    private CVV: By = By.className('form-input-security-code');
    private phone: By = By.className('form-input-phone-number');
    //errors txt
    private cardNumberError: By = By.xpath('.//div[@data-label-code="error.checkout.payment.creditCardNumber.empty"]');
    private cardTermError: By = By.xpath('.//div[@data-label-code="error.checkout.payment.expirationDate.empty"]');
    private cvvError: By = By.xpath('.//div[@data-label-code="error.checkout.payment.cardVerificationNumber.missed"]');
    private numberError: By = By.xpath('.//div[@data-label-code="error.checkout.billingAddress.phoneNumber.empty"]');

    constructor(driver:WebDriver) {
        this.driver = driver
    }

    public async goToCheckoutPage(): Promise<void> {
        logger.info('I am on checkout page');
        await delay(3000);
    }

    public async fillingInEmail(): Promise<void> {
        logger.info('I am typing email');
        const email = await this.driver.wait(until.elementLocated(this.emailForm), 10000);
        await email.sendKeys('michele.kiehn@balistreri.com');
        await delay(1000);
    }

    public async fillingInPersonal(): Promise<void> {
        logger.info('I am typing name');
        const firstName = await this.driver.wait(until.elementLocated(this.firstNameForm), 10000);
        await firstName.sendKeys('Jamey');
        await delay(2000);

        logger.info('I am typing lastname');
        const lastname = await this.driver.wait(until.elementLocated(this.lastNameForm), 10000);
        await lastname.sendKeys('Stoltenberg');
        await delay(2000);
    }

    public async fillingInStreetAndFloor(street: string): Promise<void> {
        logger.info('I am typing street');
        const streetForm = await this.driver.wait(until.elementLocated(this.adressForm), 10000);
        await streetForm.sendKeys(street);
        await delay(2000);

        logger.info('I am typing floor');
        const floor = await this.driver.wait(until.elementLocated(this.floorForm), 10000);
        await floor.sendKeys('4');
        await delay(2000);
    }

    public async fillingInCityAndState(): Promise<void> {
        logger.info('I am typing city');
        const city = await this.driver.wait(until.elementLocated(this.cityForm), 10000);
        await city.sendKeys(getCity());
        await delay(2000);

        logger.info('I am choosing state');
        const states = await this.driver.wait(until.elementLocated(this.stateSelector), 10000);
        await states.click();
        await delay(2000);
        const state = await this.driver.wait(until.elementLocated(this.stateItem), 10000);
        await state.click();
        await delay(2000);
    }

    public async fillingInZipCode(code: string): Promise<void> {
        logger.info('I am typing zip code');
        const zipCode = await this.driver.wait(until.elementLocated(this.postalCode), 10000);
        await zipCode.sendKeys(code);
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

    public async clickOnCheckoutConfirmButton(): Promise<void> {
        logger.info('click on confirm button');
        
        const button = await this.driver.wait(until.elementLocated(this.confirmBtn), 10000);
        await button.click();
        await delay(5000);
        await button.click();
    }

    public async checkPaymentPanelErrorMessagesText() {
        logger.info('I get errors');

        const cardRelation = {
            selector: this.cardNumberError,
            expected_text: 'Please enter credit card number, this field can\'t be empty'
        }

        const termRelation = {
            selector: this.cardTermError,
            expected_text: 'Please enter an expiration date.'
        }

        const cvvRelation = {
            selector: this.cvvError,
            expected_text: 'Please enter a CVV number'
        }

        const numberRelation = {
            selector: this.numberError,
            expected_text: 'Please enter a phone number.'
        }

        const relationsArray = [cardRelation, termRelation, cvvRelation, numberRelation]

        const errors: string[] = []

        for(const relation of relationsArray){
            const element = await this.driver.wait(until.elementLocated(relation.selector), 10000);
            const errorText = await element.getText();

            if(!errorText.includes(relation.expected_text)){
                const res = `Actual text: ${errorText}\nExpected text: ${relation.expected_text}`
                errors.push(res);
            }
        }

        if(errors.length !== 0){
            const res = errors.join('')
            logger.error(res);
            throw new Error(res);
        }
    }
}