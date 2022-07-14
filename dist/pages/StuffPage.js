"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.StuffPage = void 0;
const selenium_webdriver_1 = require("selenium-webdriver");
const utils_1 = require("../utils/utils");
const logger_1 = __importDefault(require("../logger/logger"));
class StuffPage {
    constructor(driver) {
        this.carousel = selenium_webdriver_1.By.className('qa-wcs-category-banner wcs-category-banner __4d61e');
        this.rejectFormBtn = selenium_webdriver_1.By.name('reject-notifications');
        this.btnCarousel = selenium_webdriver_1.By.css('button[class="close-button btn-cancel qa-btn-cancel"]');
        this.stuff = selenium_webdriver_1.By.xpath('.//div[@class="__6cafc results-list qa-results-list"]/div[3]/div/a[1]');
        this.driver = driver;
    }
    async goToMenJeansPage() {
        logger_1.default.info('I am on "Men" page');
        await this.driver.wait(selenium_webdriver_1.until.elementLocated(this.carousel), 10000);
        logger_1.default.info('I reject modal window');
        const reject = await this.driver.wait(selenium_webdriver_1.until.elementLocated(this.rejectFormBtn), 10000);
        await utils_1.delay(3000);
        await reject.click();
    }
    async chooseOneStuff() {
        logger_1.default.info('Select an item');
        const stuff = await this.driver.wait(selenium_webdriver_1.until.elementLocated(this.stuff), 10000);
        await this.driver.executeScript('arguments[0].scrollIntoView()', stuff);
        await utils_1.delay(5000);
        await this.driver.executeScript('arguments[0].click()', stuff);
    }
}
exports.StuffPage = StuffPage;
//# sourceMappingURL=StuffPage.js.map