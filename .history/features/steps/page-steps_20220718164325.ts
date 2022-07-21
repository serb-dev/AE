import { SingleStuffPage } from '../../pages/SingleStuffPage'
import { StuffPage } from '../../pages/StuffPage'
import { HomePage } from '../../pages/MainPage'
import { BagPage } from '../../pages/BagPage'
import { CheckoutPage } from '../../pages/CheckoutPage'
import { When, Given, Then, Before, After} from '@cucumber/cucumber'
import { Builder} from 'selenium-webdriver'
import chrome from "selenium-webdriver/chrome";
import firefox from 'selenium-webdriver/firefox';
require('chromedriver');
require('geckodriver');
import { restcountriesApiClient } from '../api/interfaceApi';
import { Calculator} from '../api/calculator';


Given('I open American Eagle',{timeout: 100 * 1000}, async function(){
    const homepage:HomePage = new HomePage(this.world.driver)
    await homepage.goToHomePage()
    await homepage.waitForLoadPage()
    await homepage.acceptCookies()    
});

When('I choose a category', {timeout: 100 * 1000}, async function (){
    const dropdown:HomePage = new HomePage(this.world.driver)
    await dropdown.hoverOnMenu()
    await dropdown.clickOnDropdownItem()
});

Given('I am on some stuff page',{timeout: 100 * 1000}, async function(){
    const stuffPage: StuffPage = new StuffPage(this.world.driver)
    await stuffPage.goToMenJeansPage();
})

When('I choose a stuff',{timeout: 100 * 1000}, async function(){
    const stuffPage: StuffPage = new StuffPage(this.world.driver);
    await stuffPage.chooseOneStuff();
});

Given('I am on single page of stuff', {timeout: 100 * 1000}, async function(){
    const singlePage: SingleStuffPage = new SingleStuffPage(this.world.driver)
    await singlePage.goToSingleStuffPage()
})

When('I select size', {timeout: 100 * 1000}, async function() {
    const singlePage: SingleStuffPage = new SingleStuffPage(this.world.driver)
    await singlePage.selectStuffSize();
})

When('I change amount of stuff', {timeout: 100 * 1000}, async () => {
    const singlePage: SingleStuffPage = new SingleStuffPage(this.world.driver);
    await singlePage.increasingAmountStuff();
    await singlePage.decreasingAmountStuff();
})

Then('I add stuff to the basket', {timeout: 100 * 1000}, async () => {
    const singlePage: SingleStuffPage = new SingleStuffPage(this.world.driver);
    await singlePage.addToBagButton();
    await singlePage.viewBagButton();
})

Given('I am on basket page', {timeout: 100 * 1000}, async () => {
    const bagPage: BagPage = new BagPage(this.world.driver);
    await bagPage.goToBagPage();
})

When('I click on checkout button', {timeout: 100 * 1000}, async () => {
    const bagPage: BagPage = new BagPage(this.world.driver);
    await bagPage.goToCheckoutButton();
}) 

Given('I am on checkout page', {timeout: 100 * 1000}, async () => {
    const checkout: CheckoutPage = new CheckoutPage(this.world.driver);
    await checkout.goToCheckoutPage();
})

When('I fill name, lastname, email in Shipping Info', {timeout: 100 * 1000}, async () => {
    const checkout: CheckoutPage = new CheckoutPage(this.world.driver);
    await checkout.fillingInEmail();
    await checkout.fillingInPersonal();
})

When('I fill {string} and floor', {timeout: 100 * 1000}, async function(street: string) {
    const checkout: CheckoutPage = new CheckoutPage(this.world.driver);
    await checkout.fillingInStreetAndFloor(street);
})

When('I get DATA from API', {timeout: 100 * 1000}, async function() {
    const cityApi = new restcountriesApiClient()
    this.data = cityApi.getApi(); 
})

When('I fill city and state', {timeout: 100 * 1000}, async function(){
    const checkout: CheckoutPage = new CheckoutPage(this.world.driver);
    await checkout.fillingInCityAndState(this.data);
})

When('I fill {string}', {timeout: 100 * 1000}, async function(code: string) {
    const checkout: CheckoutPage = new CheckoutPage(driver);
    await checkout.fillingInZipCode(code);
})

Then('I click on Confirm button', {timeout: 100 * 1000}, async () => {
    const checkout: CheckoutPage = new CheckoutPage(driver);
    await checkout.clickOnCheckoutConfirmButton();
})

When('I get errors from Shipping card form', {timeout: 100 * 1000}, async () => {
    const checkout: CheckoutPage = new CheckoutPage(driver);
    await checkout.checkPaymentPanelErrorMessagesText();
})

Then('I fill Shipping card info', {timeout: 100 * 1000}, async () => {
    const checkout: CheckoutPage = new CheckoutPage(driver);
    await checkout.fillingPaymentInfo();
})

After(function() {
    // driver.quit();
})