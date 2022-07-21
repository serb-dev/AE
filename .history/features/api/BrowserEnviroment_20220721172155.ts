import chrome from "selenium-webdriver/chrome";
import firefox from 'selenium-webdriver/firefox';
require('chromedriver');
require('geckodriver');
import { Driver } from '../api/driver'

export class BrowserEnviroment {
    browser: string

    constructor(browser: string){
        this.browser = browser
    }

    public getDriver() {
        switch(this.browser){
            case 'chrome':    
            const chromeOptions = this.getChrome();
            const chromeDriver = new Driver(this.browser, chromeOptions)
            return chromeDriver.getBrowserDriver()

            case 'firefox': 
            const firefoxOptions = this.getFirefox();
            const firefoxDriver = new Driver(this.browser, firefoxOptions)
            return firefoxDriver.getBrowserDriver();

            default:
                throw new Error (`There in no ${this.browser}`)
        }
    }

    private getFirefox(): firefox.Options {
        const firefoxOptions = new firefox.Options();
        firefoxOptions.useGeckoDriver
        return firefoxOptions
    }
    private getChrome(): chrome.Options {
        const chromeOptions = new chrome.Options();
        chromeOptions.excludeSwitches('enable-logging')
        return chromeOptions
    }
}
