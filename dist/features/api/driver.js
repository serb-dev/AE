"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Driver = void 0;
const selenium_webdriver_1 = require("selenium-webdriver");
class Driver {
    constructor(browser, capabilities) {
        this.driver = new selenium_webdriver_1.Builder();
        this.browser = browser;
        this.capabilities = capabilities;
    }
    getBrowserDriver() {
        const driver = this.driver
            .forBrowser(this.browser)
            .withCapabilities(this.capabilities)
            .build();
        return driver;
    }
}
exports.Driver = Driver;
//# sourceMappingURL=driver.js.map