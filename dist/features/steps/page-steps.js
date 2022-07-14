"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// import { logger } from '../../logger/logger';
const SingleStuffPage_1 = require("../../pages/SingleStuffPage");
const StuffPage_1 = require("../../pages/StuffPage");
const MainPage_1 = require("../../pages/MainPage");
const BagPage_1 = require("../../pages/BagPage");
const CheckoutPage_1 = require("../../pages/CheckoutPage");
const cucumber_1 = require("@cucumber/cucumber");
const selenium_webdriver_1 = require("selenium-webdriver");
const chrome_1 = __importDefault(require("selenium-webdriver/chrome"));
const firefox_1 = __importDefault(require("selenium-webdriver/firefox"));
require('chromedriver');
require('geckodriver');
const cucumber_2 = require("@cucumber/cucumber");
const interfaceApi_1 = require("../api/interfaceApi");
cucumber_2.setWorldConstructor(interfaceApi_1.CityApiClient);
const firefoxOptions = new firefox_1.default.Options();
firefoxOptions.useGeckoDriver;
const chromeOptions = new chrome_1.default.Options();
chromeOptions.excludeSwitches('enable-logging');
const brovser = process.env.BOWSER_ENW;
console.log(brovser);
const driver = new selenium_webdriver_1.Builder()
    .forBrowser(brovser)
    .build();
// .withCapabilities(chromeOptions)
cucumber_1.Before(function () {
});
cucumber_1.Given('I open American Eagle', { timeout: 100 * 1000 }, async function () {
    const homepage = new MainPage_1.HomePage(driver);
    await homepage.goToHomePage();
    await homepage.waitForLoadPage();
    await homepage.acceptCookies();
});
cucumber_1.When('I choose a category', { timeout: 100 * 1000 }, async function () {
    const dropdown = new MainPage_1.HomePage(driver);
    await dropdown.hoverOnMenu();
    await dropdown.clickOnDropdownItem();
});
cucumber_1.Given('I am on some stuff page', { timeout: 100 * 1000 }, async function () {
    const stuffPage = new StuffPage_1.StuffPage(driver);
    await stuffPage.goToMenJeansPage();
});
cucumber_1.When('I choose a stuff', { timeout: 100 * 1000 }, async () => {
    const stuffPage = new StuffPage_1.StuffPage(driver);
    await stuffPage.chooseOneStuff();
});
cucumber_1.Given('I am on single page of stuff', { timeout: 100 * 1000 }, async () => {
    const singlePage = new SingleStuffPage_1.SingleStuffPage(driver);
    await singlePage.goToSingleStuffPage();
});
cucumber_1.When('I select size', { timeout: 100 * 1000 }, async () => {
    const singlePage = new SingleStuffPage_1.SingleStuffPage(driver);
    await singlePage.selectStuffSize();
});
cucumber_1.When('I change amount of stuff', { timeout: 100 * 1000 }, async () => {
    const singlePage = new SingleStuffPage_1.SingleStuffPage(driver);
    await singlePage.increasingAmountStuff();
    await singlePage.decreasingAmountStuff();
});
cucumber_1.Then('I add stuff to the basket', { timeout: 100 * 1000 }, async () => {
    const singlePage = new SingleStuffPage_1.SingleStuffPage(driver);
    await singlePage.addToBagButton();
    await singlePage.viewBagButton();
});
cucumber_1.Given('I am on basket page', { timeout: 100 * 1000 }, async () => {
    const bagPage = new BagPage_1.BagPage(driver);
    await bagPage.goToBagPage();
});
cucumber_1.When('I click on checkout button', { timeout: 100 * 1000 }, async () => {
    const bagPage = new BagPage_1.BagPage(driver);
    await bagPage.goToCheckoutButton();
});
cucumber_1.Given('I am on checkout page', { timeout: 100 * 1000 }, async () => {
    const checkout = new CheckoutPage_1.CheckoutPage(driver);
    await checkout.goToCheckoutPage();
});
cucumber_1.When('I fill name, lastname, email in Shipping Info', { timeout: 100 * 1000 }, async () => {
    const checkout = new CheckoutPage_1.CheckoutPage(driver);
    await checkout.fillingInEmail();
    await checkout.fillingInPersonal();
});
cucumber_1.When('I fill {string} and floor', { timeout: 100 * 1000 }, async function (street) {
    const checkout = new CheckoutPage_1.CheckoutPage(driver);
    await checkout.fillingInStreetAndFloor(street);
});
cucumber_1.When('I get DATA from API', { timeout: 100 * 1000 }, async function () {
    const cityName = this.getApi();
});
cucumber_1.When('I fill city and state', { timeout: 100 * 1000 }, async function () {
    const city = this.cityName;
    const checkout = new CheckoutPage_1.CheckoutPage(driver);
    await checkout.fillingInCityAndState(city);
});
cucumber_1.When('I fill {string}', { timeout: 100 * 1000 }, async function (code) {
    const checkout = new CheckoutPage_1.CheckoutPage(driver);
    await checkout.fillingInZipCode(code);
});
cucumber_1.Then('I click on Confirm button', { timeout: 100 * 1000 }, async () => {
    const checkout = new CheckoutPage_1.CheckoutPage(driver);
    await checkout.clickOnCheckoutConfirmButton();
});
cucumber_1.When('I get errors from Shipping card form', { timeout: 100 * 1000 }, async () => {
    const checkout = new CheckoutPage_1.CheckoutPage(driver);
    await checkout.checkPaymentPanelErrorMessagesText();
});
cucumber_1.Then('I fill Shipping card info', { timeout: 100 * 1000 }, async () => {
    const checkout = new CheckoutPage_1.CheckoutPage(driver);
    await checkout.fillingPaymentInfo();
});
cucumber_1.After(function () {
    // driver.quit();
});
//# sourceMappingURL=page-steps.js.map