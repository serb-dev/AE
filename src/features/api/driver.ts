import { Builder, ThenableWebDriver } from 'selenium-webdriver'
import chrome from 'selenium-webdriver/chrome'
import firefox from 'selenium-webdriver/firefox'

/**
 * class that get some data and create selenium WebDriver
 */

export class Driver {
    driver = new Builder()
    browser: string
    capabilities: chrome.Options | firefox.Options

    constructor(browser: string, capabilities: chrome.Options | firefox.Options) {
        this.browser = browser
        this.capabilities = capabilities
    }

    /**
     *
     * @returns webdriver with options
     */

    public getBrowserDriver(): ThenableWebDriver {
        const driver = this.driver
            .forBrowser(this.browser)
            .withCapabilities(this.capabilities)
            .build()

        return driver
    }
}
