import { ThenableWebDriver } from "selenium-webdriver";
import chrome from "selenium-webdriver/chrome";
import firefox from 'selenium-webdriver/firefox';
import { Driver } from './driver';
require('chromedriver');
require('geckodriver');

export class BrowserEnviroment {
   private browser1: string

    constructor(browser: string){
        this.browser = browser;
    }

    public getDriver(): ThenableWebDriver {
        switch(this.browser){
            case 'chrome':    
            const chromeOptions = this.getChromeOptions();
            const chromeDriver = new Driver(this.browser, chromeOptions);
            return chromeDriver.getBrowserDriver();

            case 'firefox': 
            const firefoxOptions = this.getFirefoxOptions();
            const firefoxDriver = new Driver(this.browser, firefoxOptions);
            return firefoxDriver.getBrowserDriver();

            default:
                throw new Error (`There in no ${this.browser}`);
        }
    }

    private getFirefoxOptions(): firefox.Options {
        const firefoxOptions = new firefox.Options();
        firefoxOptions.useGeckoDriver;
        return firefoxOptions;
    };
    private getChromeOptions(): chrome.Options {
        const chromeOptions = new chrome.Options();
        chromeOptions.excludeSwitches('enable-logging');
        return chromeOptions;
    };
};