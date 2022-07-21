"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.BrowserEnviroment = void 0;
const chrome_1 = __importDefault(require("selenium-webdriver/chrome"));
const firefox_1 = __importDefault(require("selenium-webdriver/firefox"));
require('chromedriver');
require('geckodriver');
const driver_1 = require("../api/driver");
class BrowserEnviroment {
    constructor(browser) {
        this.browser = browser;
    }
    getDriver() {
        switch (this.browser) {
            case 'chrome':
                console.log('chromeDriver');
                const chromeOptions = this.getChrome();
                const chromeDriver = new driver_1.Driver(this.browser, chromeOptions);
                return chromeDriver.getBrowserDriver();
            case 'firefox':
                console.log('firefoxDriver');
                const firefoxOptions = this.getFirefox();
                const firefoxDriver = new driver_1.Driver(this.browser, firefoxOptions);
                return firefoxDriver.getBrowserDriver();
            default:
                throw new Error(`There in no ${this.browser}`);
        }
    }
    getFirefox() {
        const firefoxOptions = new firefox_1.default.Options();
        firefoxOptions.useGeckoDriver;
        return firefoxOptions;
    }
    getChrome() {
        const chromeOptions = new chrome_1.default.Options();
        chromeOptions.excludeSwitches('enable-logging');
        return chromeOptions;
    }
}
exports.BrowserEnviroment = BrowserEnviroment;
//# sourceMappingURL=BrowserEnviroment.js.map