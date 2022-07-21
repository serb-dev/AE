import { WebDriver } from 'selenium-webdriver';
import { Before } from "@cucumber/cucumber"
import { Builder} from 'selenium-webdriver'
import chrome from "selenium-webdriver/chrome";
import firefox from 'selenium-webdriver/firefox';
require('chromedriver');
require('geckodriver');

const browser = process.env.BOWSER_ENW
console.log(browser)

export class BrowserEnviroment {
    browser: string

    constructor(browser: string){
        this.browser = browser
    }

    private getFirefox() {
        const firefoxOptions = new firefox.Options();
        firefoxOptions.useGeckoDriver
    }
    private getChrome() {
        const chromeOptions = new chrome.Options();
        chromeOptions.excludeSwitches('enable-logging')
    }
    public getDriver() {
        switch(browser){
            case 'chrome': 
            console.log('chromeDriver');
            this.getChrome();
            break;

            case 'firefox': 
            console.log('firefoxDriver');
            this.getFirefox();
            break;
        }
    }
}

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