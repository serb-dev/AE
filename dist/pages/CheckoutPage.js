"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CheckoutPage = void 0;
const selenium_webdriver_1 = require("selenium-webdriver");
const utils_1 = require("../utils/utils");
const logger_1 = __importDefault(require("../logger/logger"));
class CheckoutPage {
    constructor(driver) {
        this.emailForm = selenium_webdriver_1.By.className('form-input-email');
        this.firstNameForm = selenium_webdriver_1.By.className('form-input-firstname');
        this.lastNameForm = selenium_webdriver_1.By.className('form-input-lastname');
        this.adressForm = selenium_webdriver_1.By.className('form-input-street-address1');
        this.floorForm = selenium_webdriver_1.By.className('form-input-street-address2');
        this.cityForm = selenium_webdriver_1.By.className('form-input-city');
        this.stateSelector = selenium_webdriver_1.By.name('states');
        this.stateItem = selenium_webdriver_1.By.xpath('.//select[@name="states"]/option[14]');
        this.postalCode = selenium_webdriver_1.By.className('form-input-postal-code');
        this.confirmBtn = selenium_webdriver_1.By.className('btn-block btn-place-order');
        // credit card
        this.creditCard = selenium_webdriver_1.By.className('form-input-card-number');
        this.cardTerm = selenium_webdriver_1.By.className('form-input-expiration-date');
        this.CVV = selenium_webdriver_1.By.className('form-input-security-code');
        this.phone = selenium_webdriver_1.By.className('form-input-phone-number');
        //errors txt
        this.cardNumberError = selenium_webdriver_1.By.xpath('.//div[@data-label-code="error.checkout.payment.creditCardNumber.empty"]');
        this.cardTermError = selenium_webdriver_1.By.xpath('.//div[@data-label-code="error.checkout.payment.expirationDate.empty"]');
        this.cvvError = selenium_webdriver_1.By.xpath('.//div[@data-label-code="error.checkout.payment.cardVerificationNumber.missed"]');
        this.numberError = selenium_webdriver_1.By.xpath('.//div[@data-label-code="error.checkout.billingAddress.phoneNumber.empty"]');
        this.driver = driver;
    }
    async goToCheckoutPage() {
        logger_1.default.info('I am on checkout page');
        await utils_1.delay(3000);
    }
    async fillingInEmail() {
        logger_1.default.info('I am typing email');
        const email = await this.driver.wait(selenium_webdriver_1.until.elementLocated(this.emailForm), 10000);
        await email.sendKeys('michele.kiehn@balistreri.com');
        await utils_1.delay(1000);
    }
    async fillingInPersonal() {
        logger_1.default.info('I am typing name');
        const firstName = await this.driver.wait(selenium_webdriver_1.until.elementLocated(this.firstNameForm), 10000);
        await firstName.sendKeys('Jamey');
        await utils_1.delay(2000);
        logger_1.default.info('I am typing lastname');
        const lastname = await this.driver.wait(selenium_webdriver_1.until.elementLocated(this.lastNameForm), 10000);
        await lastname.sendKeys('Stoltenberg');
        await utils_1.delay(2000);
    }
    async fillingInStreetAndFloor(street) {
        logger_1.default.info('I am typing street');
        const streetForm = await this.driver.wait(selenium_webdriver_1.until.elementLocated(this.adressForm), 10000);
        await streetForm.sendKeys(street);
        await utils_1.delay(2000);
        logger_1.default.info('I am typing floor');
        const floor = await this.driver.wait(selenium_webdriver_1.until.elementLocated(this.floorForm), 10000);
        await floor.sendKeys('4');
        await utils_1.delay(2000);
    }
    async fillingInCityAndState(props) {
        logger_1.default.info('I am typing city');
        const city = await this.driver.wait(selenium_webdriver_1.until.elementLocated(this.cityForm), 10000);
        // await city.sendKeys(getCity());
        await city.sendKeys(props);
        await utils_1.delay(2000);
        logger_1.default.info('I am choosing state');
        const states = await this.driver.wait(selenium_webdriver_1.until.elementLocated(this.stateSelector), 10000);
        await states.click();
        await utils_1.delay(2000);
        const state = await this.driver.wait(selenium_webdriver_1.until.elementLocated(this.stateItem), 10000);
        await state.click();
        await utils_1.delay(2000);
    }
    async fillingInZipCode(code) {
        logger_1.default.info('I am typing zip code');
        const zipCode = await this.driver.wait(selenium_webdriver_1.until.elementLocated(this.postalCode), 10000);
        await zipCode.sendKeys(code);
        await utils_1.delay(2000);
    }
    //Payment info
    async fillingPaymentInfo() {
        const card = await this.driver.wait(selenium_webdriver_1.until.elementLocated(this.creditCard), 10000);
        await card.sendKeys('0000000000000000');
        await utils_1.delay(2000);
        const cardTerm = await this.driver.wait(selenium_webdriver_1.until.elementLocated(this.cardTerm), 10000);
        await cardTerm.sendKeys('0624');
        await utils_1.delay(2000);
        const code = await this.driver.wait(selenium_webdriver_1.until.elementLocated(this.CVV), 10000);
        await code.sendKeys('000');
        await utils_1.delay(2000);
        const phone = await this.driver.wait(selenium_webdriver_1.until.elementLocated(this.phone), 10000);
        await phone.sendKeys('3333333333');
        await utils_1.delay(2000);
    }
    async clickOnCheckoutConfirmButton() {
        logger_1.default.info('click on confirm button');
        const button = await this.driver.wait(selenium_webdriver_1.until.elementLocated(this.confirmBtn), 10000);
        await this.driver.executeScript('arguments[0].click()', button);
        await utils_1.delay(5000);
        await this.driver.executeScript('arguments[0].click()', button);
    }
    async checkPaymentPanelErrorMessagesText() {
        logger_1.default.info('I get errors');
        const cardRelation = {
            selector: this.cardNumberError,
            expected_text: 'Please enter credit card number, this field can\'t be empty'
        };
        const termRelation = {
            selector: this.cardTermError,
            expected_text: 'Please enter an expiration date.'
        };
        const cvvRelation = {
            selector: this.cvvError,
            expected_text: 'Please enter a CVV number'
        };
        const numberRelation = {
            selector: this.numberError,
            expected_text: 'Please enter a phone number.'
        };
        const relationsArray = [cardRelation, termRelation, cvvRelation, numberRelation];
        const errors = [];
        for (const relation of relationsArray) {
            const element = await this.driver.wait(selenium_webdriver_1.until.elementLocated(relation.selector), 10000);
            const errorText = await element.getText();
            if (!errorText.includes(relation.expected_text)) {
                const res = `Actual text: ${errorText}\nExpected text: ${relation.expected_text}`;
                errors.push(res);
            }
        }
        if (errors.length !== 0) {
            const res = errors.join('');
            logger_1.default.error(res);
            throw new Error(res);
        }
    }
}
exports.CheckoutPage = CheckoutPage;
//# sourceMappingURL=CheckoutPage.js.map