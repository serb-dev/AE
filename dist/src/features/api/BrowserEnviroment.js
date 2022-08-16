"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.BrowserEnviroment = void 0;
const chrome_1 = __importDefault(require("selenium-webdriver/chrome"));
const firefox_1 = __importDefault(require("selenium-webdriver/firefox"));
const driver_1 = require("./driver");
require('chromedriver');
require('geckodriver');
class BrowserEnviroment {
    constructor(browser) {
        this.browser = browser;
    }
    getDriver() {
        switch (this.browser) {
            case 'chrome':
                const chromeOptions = this.getChromeOptions();
                const chromeDriver = new driver_1.Driver(this.browser, chromeOptions);
                return chromeDriver.getBrowserDriver();
            case 'firefox':
                const firefoxOptions = this.getFirefoxOptions();
                const firefoxDriver = new driver_1.Driver(this.browser, firefoxOptions);
                return firefoxDriver.getBrowserDriver();
            default:
                throw new Error(`There in no ${this.browser}`);
        }
    }
    getFirefoxOptions() {
        const firefoxOptions = new firefox_1.default.Options();
        return firefoxOptions;
    }
    getChromeOptions() {
        const chromeOptions = new chrome_1.default.Options();
        chromeOptions.excludeSwitches('enable-logging');
        return chromeOptions;
    }
}
exports.BrowserEnviroment = BrowserEnviroment;
//# sourceMappingURL=BrowserEnviroment.js.map