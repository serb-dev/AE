"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.BagPage = void 0;
const selenium_webdriver_1 = require("selenium-webdriver");
const utils_1 = require("../utils/utils");
const logger_1 = __importDefault(require("../logger/logger"));
/**
 * This class for Bag page instances
 */
class BagPage {
    constructor(driver) {
        this.banner = selenium_webdriver_1.By.className('sticky-promo qa-sticky-header-promo __a842c');
        this.checkoutBtn = selenium_webdriver_1.By.name('go2checkout');
        this.driver = driver;
    }
    async goToBagPage() {
        logger_1.default.info('I am on bag page');
        await this.driver.wait(selenium_webdriver_1.until.elementLocated(this.banner), 10000);
        await (0, utils_1.delay)(3000);
    }
    async clickOnCheckoutButton() {
        logger_1.default.info('I click on checkout button');
        const checkout = await this.driver.wait(selenium_webdriver_1.until.elementLocated(this.checkoutBtn), 10000);
        await checkout.click();
        await (0, utils_1.delay)(3000);
    }
}
exports.BagPage = BagPage;
//# sourceMappingURL=BagPage.js.map