import { WebDriver } from 'selenium-webdriver';
import { Before } from "@cucumber/cucumber"
import { Builder} from 'selenium-webdriver'
import chrome from "selenium-webdriver/chrome";
import firefox from 'selenium-webdriver/firefox';
require('chromedriver');
require('geckodriver');

const browser = process.env.BOWSER_ENW
console.log(browser)

Before(async function(scenario) {
    console.log('I am before')

    const params: BrowserEnviroment = new BrowserEnviroment(browser)

    const driver = new Builder()
    .forBrowser(params.getDriver())
    .build()

    this.world = {driver}
})

export interface CucumberWorld {
    driver: WebDriver
}