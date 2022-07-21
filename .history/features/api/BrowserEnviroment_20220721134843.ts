
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
            console.log('chromeDriver');    
            const chromeOptions = this.getChrome();
            const driver = new Driver(this.browser, chromeOptions)
            driver.getBrowserDriver()

            case 'firefox': 
            console.log('firefoxDriver');
            const firefoxOptions = this.getFirefox();
            const driver

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
