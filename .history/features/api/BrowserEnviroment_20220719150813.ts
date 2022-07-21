import chrome from "selenium-webdriver/chrome";
import firefox from 'selenium-webdriver/firefox';
require('chromedriver');
require('geckodriver');

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
        switch(this.browser){
            case 'chrome': 
            console.log('chromeDriver');
            this.getChrome();
            break;

            case 'firefox': 
            console.log('firefoxDriver');
            this.getFirefox();
            break;

            default
        }
    }
}
