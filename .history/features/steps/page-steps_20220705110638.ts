import { SingleStuffPage } from '../../pages/SingleStuffPage'
import { StuffPage } from '../../pages/StuffPage'
import { HomePage } from '../../pages/MainPage'
import { BagPage } from '../../pages/BagPage'
import { CheckoutPage } from '../../pages/CheckoutPage'
import { When, Given, Then, Before, After} from '@cucumber/cucumber'
import { Builder} from 'selenium-webdriver'
import chrome from "selenium-webdriver/chrome";
require('chromedriver')

const options = new chrome.Options()
options.excludeSwitches('enable-logging')

const driver = new Builder()
    .forBrowser('chrome')
    .withCapabilities(options)
    .build()

    
Before(function() {
  
})

Given('I open American Eagle',{timeout: 100 * 1000}, async function(){
    const homepage:HomePage = new HomePage(driver)
    await homepage.goToHomePage()
    await homepage.waitForLoadPage()
    await homepage.acceptCookies()    
});

When('I choose a category', {timeout: 100 * 1000}, async function (){
    const dropdown:HomePage = new HomePage(driver)
    await dropdown.hoverOnMenu()
    await dropdown.clickOnDropdownItem()
});

Given('I am on some stuff page',{timeout: 100 * 1000}, async function(){
    const stuffPage: StuffPage = new StuffPage(driver)
    await stuffPage.getMenJeansPage()
})

When('I choose a stuff',{timeout: 100 * 1000}, async () => {
    const stuffPage: StuffPage = new StuffPage(driver)
    await stuffPage.getStuff()
});

Given('I am on single page of stuff', {timeout: 100 * 1000}, async () => {
    const singlePage: SingleStuffPage = new SingleStuffPage(driver)
    await singlePage.getSingleStuffPage()
})

When('I select size', {timeout: 100 * 1000}, async () => {
    const singlePage: SingleStuffPage = new SingleStuffPage(driver)
    await singlePage.getSize()
})

When('I change amount of stuff', {timeout: 100 * 1000}, async () => {
    const singlePage: SingleStuffPage = new SingleStuffPage(driver)
    await singlePage.getIncrease()
    await singlePage.getDecrease()
})

Then('I add stuff to the basket', {timeout: 100 * 1000}, async () => {
    const singlePage: SingleStuffPage = new SingleStuffPage(driver);
    await singlePage.getToBag()
    await singlePage.viewBag()
})

Given('I am on basket page', {timeout: 100 * 1000}, async () => {
    const bagPage: BagPage = new BagPage(driver);
    await bagPage.goToBagPage();
})

When('I click on checkout button', {timeout: 100 * 1000}, async () => {
    const bagPage: BagPage = new BagPage(driver);
    await bagPage.checkoutClick();
}) 

Given('I am on checkout page', {timeout: 100 * 1000}, async () => {
    const checkout: CheckoutPage = new CheckoutPage(driver);
    await checkout.goToCheckout();
})

When('I fill name, lastname, email in Shipping Info', {timeout: 100 * 1000}, async () => {
    const checkout: CheckoutPage = new CheckoutPage(driver);
    await checkout.fillingInEmail();
    await checkout.fillingInPersonal();
})

When('I fill "<street>" and floor', {timeout: 100 * 1000}, async () =>{
    const checkout: CheckoutPage = new CheckoutPage(driver);
    await checkout.fillingStreetAndFloor();
})

When('I fill city and state', {timeout: 100 * 1000}, async () =>{
    const checkout: CheckoutPage = new CheckoutPage(driver);
    await checkout.fillingInCityAndState();
})

When('I fill {zip code}', {timeout: 100 * 1000}, async () =>{
    const checkout: CheckoutPage = new CheckoutPage(driver);
    await checkout.fillingInZipCode();
})

Then('I click on Confirm button', {timeout: 100 * 1000}, async () => {
    const checkout: CheckoutPage = new CheckoutPage(driver);
    await checkout.clickOnConfirmButton();
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

})