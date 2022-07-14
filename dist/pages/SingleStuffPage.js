"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.SingleStuffPage = void 0;
const selenium_webdriver_1 = require("selenium-webdriver");
const utils_1 = require("../utils/utils");
const logger_1 = __importDefault(require("../logger/logger"));
class SingleStuffPage {
    constructor(driver) {
        this.banner = selenium_webdriver_1.By.className('_content_3s1n4b _overlay-wrapper_c5lqad');
        this.selector = selenium_webdriver_1.By.className('dropdown-toggle qa-dropdown-toggle');
        this.selectItem = selenium_webdriver_1.By.xpath('.//ul[@class="dropdown-menu"]/li[2]/a');
        this.increaseBtn = selenium_webdriver_1.By.className('qty-inc-btn');
        this.decreaseBtn = selenium_webdriver_1.By.className('qty-dec-btn');
        this.colors = selenium_webdriver_1.By.className('_swatch-img_1e4pqf');
        this.addButton = selenium_webdriver_1.By.name('addToBag');
        this.viewButton = selenium_webdriver_1.By.name('viewBag');
        this.driver = driver;
    }
    async goToSingleStuffPage() {
        logger_1.default.info('I open page with choosed stuff');
        await this.driver.wait(selenium_webdriver_1.until.elementLocated(this.banner), 10000);
        await utils_1.delay(3000);
    }
    async selectStuffSize() {
        logger_1.default.info('select size');
        const selector = await this.driver.wait(selenium_webdriver_1.until.elementLocated(this.selector), 10000);
        await selector.click();
        await utils_1.delay(3000);
        const selectorItem = await this.driver.wait(selenium_webdriver_1.until.elementLocated(this.selectItem), 10000);
        await selectorItem.click();
    }
    async increasingAmountStuff() {
        logger_1.default.info('increase amount');
        const plus = await this.driver.wait(selenium_webdriver_1.until.elementLocated(this.increaseBtn), 10000);
        await utils_1.delay(3000);
        await plus.click();
    }
    async decreasingAmountStuff() {
        logger_1.default.info('decrease amount');
        const minus = await this.driver.wait(selenium_webdriver_1.until.elementLocated(this.decreaseBtn), 10000);
        await utils_1.delay(3000);
        await minus.click();
        await utils_1.delay(3000);
    }
    async addToBagButton() {
        logger_1.default.info('add this to bag');
        const addToBag = await this.driver.wait(selenium_webdriver_1.until.elementLocated(this.addButton), 10000);
        await addToBag.click();
        await utils_1.delay(3000);
    }
    async viewBagButton() {
        logger_1.default.info('click on "view bag" button');
        const viewBag = await this.driver.wait(selenium_webdriver_1.until.elementLocated(this.viewButton), 10000);
        await viewBag.click();
    }
}
exports.SingleStuffPage = SingleStuffPage;
//# sourceMappingURL=SingleStuffPage.js.map