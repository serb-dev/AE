"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.MinusrusPage = void 0;
const selenium_webdriver_1 = require("selenium-webdriver");
const utils_1 = require("../utils/utils");
const logger_1 = __importDefault(require("../logger/logger"));
class MinusrusPage {
    constructor(driver) {
        this.url = 'https://www.minusrus.com/';
        this.engBtn = selenium_webdriver_1.By.xpath('//a[@href="/en"]');
        this.logoText = selenium_webdriver_1.By.className('logo-text');
        this.dateLabel = selenium_webdriver_1.By.className('date__label');
        this.dateArrow = selenium_webdriver_1.By.className('control-btn');
        this.lostOfPersonel = selenium_webdriver_1.By.xpath('//div[@class="card card_large"]/div/div[2]/span');
        this.percentOfLosses = selenium_webdriver_1.By.className('percent__int large');
        // private percentOfLosses: By = By.xpath('//div[@class="card card_large"]/div[2]/div[2]/div/div/div/div/div/span')
        this.lostOfAircrafts = selenium_webdriver_1.By.xpath('//div[@class="card__container"]/div[4]/div[2]/span');
        this.percentOfLossesAircrafts = selenium_webdriver_1.By.xpath('//div[@class="card__container"]/div[4]/div[3]/div[2]/div/div/div/div/div/span');
        this.expectedTitleStr = 'За підтримки Сил Спеціальних Операцій';
        this.intendetForInvasion = '190.000';
        this.intendetAircraftsForInv = '330';
        this.driver = driver;
    }
    async goToMinusrusPage() {
        logger_1.default.info('Open minusrus page');
        await this.driver.manage().window().maximize();
        await this.driver.get(this.url);
    }
    async checkingLanguage() {
        const element = await this.driver.wait(selenium_webdriver_1.until.elementLocated(this.logoText), 10000);
        const languageENG = await this.driver.wait(selenium_webdriver_1.until.elementLocated(this.engBtn), 10000);
        const text = await element.getText();
        const replacedStr = text.replace('\n', ' ');
        await (0, utils_1.delay)(3000);
        if (replacedStr.includes(this.expectedTitleStr)) {
            logger_1.default.info(replacedStr);
            languageENG.click();
        }
        else {
            logger_1.default.error('no matches');
            throw new Error('no matches with title');
        }
    }
    async changeDate(expectedDate) {
        await (0, utils_1.delay)(3000);
        logger_1.default.info(expectedDate);
        const leftArrow = await this.driver.wait(selenium_webdriver_1.until.elementLocated(this.dateArrow), 1000);
        let currentDate = await (0, utils_1.getCurrentDay)(this.driver, this.dateLabel);
        (0, utils_1.dateChecking)(expectedDate, currentDate);
        while (expectedDate !== currentDate) {
            leftArrow.click();
            (0, utils_1.delay)(3000);
            currentDate = await (0, utils_1.getCurrentDay)(this.driver, this.dateLabel);
        }
    }
    async testTaskSwitcher(expectedDate) {
        await (0, utils_1.delay)(3000);
        switch (expectedDate) {
            case '09.08.2022':
                const percentOfLossesElement = await this.driver.wait(selenium_webdriver_1.until.elementLocated(this.percentOfLosses), 10000);
                const percentOfLosses = await percentOfLossesElement.getText();
                logger_1.default.info('get percent of losses from site: ' + percentOfLosses);
                const calculationOfPersonalLosses = await this.calculationOfPersonalLosses();
                logger_1.default.info(calculationOfPersonalLosses);
                if (+percentOfLosses === calculationOfPersonalLosses) {
                    logger_1.default.info('succes test with personal losses');
                }
                else {
                    logger_1.default.error('error: not equal');
                    throw new Error('error: not equal');
                }
                break;
            case '06.08.2022':
                const percentLossesAircraftElement = await this.driver.wait(selenium_webdriver_1.until.elementLocated(this.percentOfLossesAircrafts), 10000);
                const totaPercentAircraftLosses = await percentLossesAircraftElement.getText();
                logger_1.default.info('get daily percent of aircraft losses:' + totaPercentAircraftLosses);
                const calculationOfAircraftlLosses = await this.calculationOfAircraftLosses();
                logger_1.default.info(calculationOfAircraftlLosses);
                if (+totaPercentAircraftLosses === calculationOfAircraftlLosses) {
                    logger_1.default.info('succes test with aircraft losses');
                }
                else {
                    logger_1.default.error('error: not equal');
                    throw new Error('error: not equal');
                }
                break;
            default:
                logger_1.default.error('thre are no cases');
                throw new Error('thre are no cases');
        }
    }
    // private methods for calculating russian losses
    async calculationOfPersonalLosses() {
        const roundedLossesElement = await this.driver.wait(selenium_webdriver_1.until.elementLocated(this.lostOfPersonel), 10000);
        const roundedLosses = await roundedLossesElement.getText();
        const totalLosses = roundedLosses.slice(1, 7);
        logger_1.default.info('get number of losses from site: ' + totalLosses);
        const personalLosses = await this.calculatorOfPercent(totalLosses, this.intendetForInvasion);
        return personalLosses;
    }
    async calculationOfAircraftLosses() {
        const dailyLossesAircraftsElement = await this.driver.wait(selenium_webdriver_1.until.elementLocated(this.lostOfAircrafts), 10000);
        const dailyLossesAircraft = await dailyLossesAircraftsElement.getText();
        logger_1.default.info('get daily number of aircraf losses:' + dailyLossesAircraft);
        const aircraftLosses = await this.calculatorOfPercent(dailyLossesAircraft, this.intendetAircraftsForInv);
        return aircraftLosses;
    }
    /**
     * method for calculating percent of losses
     *
     * @param daily string with day losses
     * @param intended string with total amount
     * @returns number of percent
     */
    async calculatorOfPercent(daily, intended) {
        const totalNumber = +daily / +intended;
        const percent = totalNumber * 100;
        const rounded = percent.toFixed(1);
        return +rounded;
    }
}
exports.MinusrusPage = MinusrusPage;
//# sourceMappingURL=MinusrusMain.js.map