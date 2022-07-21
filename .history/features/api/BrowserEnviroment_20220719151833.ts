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
        return firefoxOptions
    }
    private getChrome() {
        const chromeOptions = new chrome.Options();
        chromeOptions.excludeSwitches('enable-logging')
        return chromeOptions;
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

            default:
                throw new Error ("There in no `${this.browser}`")
        }
    }
}
