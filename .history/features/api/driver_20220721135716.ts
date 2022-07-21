import { firefox } from 'selenium-webdriver/firefox';
import { Options, WebDriver } from 'selenium-webdriver';
import { Builder, ThenableWebDriver} from 'selenium-webdriver'
import chrome from "selenium-webdriver/chrome";

export class Driver {
    driver:Builder = new Builder()
    browser: string
    capabilities: chrome.Options | firefox.Options

    constructor(browser: string, capabilities: chrome.Options) {
        this.browser = browser
        this.capabilities = capabilities
    }
    
    public getBrowserDriver() {
        const driver = this.driver 
        .forBrowser(this.browser)
        .withCapabilities(this.capabilities)
        .build()  

        return driver
    }
}


