import { WebDriver } from 'selenium-webdriver';
import { Builder, ThenableWebDriver} from 'selenium-webdriver'

export class Driver {
    driver = new Builder()
    browser: string
    capabilities: string

    constructor(browser: string, capabilities: string) {
        this.browser = browser
        this.capabilities = capabilities
    }
    
    public getBrowserDriver() {
        this.driver 
        .forBrowser(this.browser)
        .withCapabilities(this.capabilities)
        .build()  
    }
}


