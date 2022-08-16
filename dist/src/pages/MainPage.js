"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.HomePage = void 0;
const selenium_webdriver_1 = require("selenium-webdriver");
const utils_1 = require("../utils/utils");
const logger_1 = __importDefault(require("../logger/logger"));
class HomePage {
    constructor(driver) {
        this.url = 'https://www.ae.com/us/en';
        this.banner = selenium_webdriver_1.By.className('_content_3s1n4b _overlay-wrapper_c5lqad');
        this.cookiesBtn = selenium_webdriver_1.By.name('accept-cookie');
        this.menuBtn = selenium_webdriver_1.By.css('a[data-text="Men"]');
        this.dropdownItem = selenium_webdriver_1.By.xpath('//a[@href="/us/en/c/men/bottoms/jeans/cat6430041?pagetype=plp"]');
        this.driver = driver;
    }
    async goToHomePage() {
        logger_1.default.info('I open American Eagle');
        await this.driver.manage().window().maximize();
        await this.driver.get(this.url);
    }
    async waitForLoadPage() {
        logger_1.default.info('waiting for load page');
        await this.driver.wait(selenium_webdriver_1.until.elementLocated(this.banner), 10000);
        await (0, utils_1.delay)(3000);
    }
    async acceptCookies() {
        const cookies = await this.driver.wait(selenium_webdriver_1.until.elementLocated(this.cookiesBtn), 10000);
        await (0, utils_1.delay)(3000);
        await cookies.click();
    }
    async hoverOnMenu() {
        logger_1.default.info('move mouse on menu item');
        await this.driver.wait(selenium_webdriver_1.until.elementLocated(this.menuBtn), 10000);
        await (0, utils_1.delay)(3000);
        const dropButton = this.driver.findElement(this.menuBtn);
        const actions = this.driver.actions();
        const mouse = actions.mouse();
        await actions.pause(mouse).move({ origin: dropButton }).press().perform();
    }
    async clickOnDropdownItem() {
        logger_1.default.info('click on "Men" item');
        const dropdown = await this.driver.wait(selenium_webdriver_1.until.elementLocated(this.dropdownItem), 10000);
        await (0, utils_1.delay)(3000);
        await dropdown.click();
    }
}
exports.HomePage = HomePage;
//# sourceMappingURL=MainPage.js.map