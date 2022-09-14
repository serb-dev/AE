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
        // language buttons
        this.engBtn = selenium_webdriver_1.By.css('a[href="/en"]');
        this.uaBtn = selenium_webdriver_1.By.className('languages__item current languages__item');
        this.ruBtn = selenium_webdriver_1.By.css('a[href="/ru"]');
        this.logoText = selenium_webdriver_1.By.className('logo-text');
        this.dateLabel = selenium_webdriver_1.By.className('date__label');
        this.dateArrow = selenium_webdriver_1.By.className('control-btn');
        // private cards: By = By.css('div[class="card"]')
        this.cards = selenium_webdriver_1.By.className('card');
        this.dailyAmount = selenium_webdriver_1.By.css('span[class="card__amount-total"]');
        this.cardTitle = selenium_webdriver_1.By.css('div[class="card__title"]');
        this.totalPercentAmount = selenium_webdriver_1.By.className('percent__int');
        this.statisticsTitle = selenium_webdriver_1.By.css('div[class="statistics__title"]');
        this.totalNumberOfForces = selenium_webdriver_1.By.className('statistics__description');
        this.driver = driver;
    }
    async goToMinusrusPage() {
        logger_1.default.info('Open minusrus page');
        await this.driver.manage().window().maximize();
        await this.driver.get(this.url);
    }
    async choosingLanguage(language) {
        const languageToSelector = {
            UA: this.uaBtn,
            ENG: this.engBtn,
            RU: this.ruBtn
        };
        const button = await this.driver.wait(selenium_webdriver_1.until.elementLocated(languageToSelector[language]), 10000);
        await button.click();
    }
    async verifyingSelectedLanguage(language) {
        const logoElement = await this.driver.wait(selenium_webdriver_1.until.elementLocated(this.logoText), 10000);
        const logoText = await logoElement.getText();
        const replacedLogoStr = logoText.replace('\n', ' ');
        logger_1.default.info(replacedLogoStr);
        await (0, utils_1.delay)(3000);
        switch (language) {
            case 'ENG':
                if (replacedLogoStr !== 'With the support of the Special Operations Forces') {
                    throw new Error(`Not any matches with ${replacedLogoStr}`);
                }
                break;
            case 'RU':
                if (replacedLogoStr !== 'При поддержке Сил Специальных Операций') {
                    throw new Error(`Not any matches with ${replacedLogoStr}`);
                }
                break;
            case 'UA':
                if (replacedLogoStr !== 'За підтримки Сил Спеціальних Операцій') {
                    throw new Error(`Not any matches with ${replacedLogoStr}`);
                }
                break;
            default: throw new Error(`Not any matches with ${language}`);
        }
    }
    async chooseDate(expectedDate) {
        await (0, utils_1.delay)(3000);
        logger_1.default.info(expectedDate);
        const arrows = await this.driver.wait(selenium_webdriver_1.until.elementsLocated(this.dateArrow), 1000);
        let currentDate = await this.getCurrentDay(this.driver, this.dateLabel);
        (0, utils_1.dateChecking)(expectedDate, currentDate);
        const formatedCurrentDate = await this.changeStringToDATE(currentDate);
        const formatedExpectedDate = await this.changeStringToDATE(expectedDate);
        let arrowToClick;
        if (formatedExpectedDate < formatedCurrentDate) {
            arrowToClick = arrows[0];
        }
        else {
            arrowToClick = arrows[1];
        }
        while (expectedDate !== currentDate) {
            await arrowToClick.click();
            currentDate = await this.getCurrentDay(this.driver, this.dateLabel);
        }
    }
    async testTaskSwitcher(entity) {
        const cardsElements = await this.driver.wait(selenium_webdriver_1.until.elementsLocated(this.cards));
        let baseElement;
        for (const cardElement of cardsElements) {
            const text = await cardElement.getText();
            if (text.includes(entity)) {
                baseElement = cardElement;
                break;
            }
        }
        if (baseElement === undefined || baseElement === null) {
            throw new Error(`Entity with name ${entity} not found`);
        }
        const cardTitleElement = await baseElement.findElement(this.cardTitle);
        const cardTitleText = await cardTitleElement.getText();
        const dailyAmountElement = await baseElement.findElement(this.dailyAmount);
        const textAmount = await dailyAmountElement.getText();
        const amount = textAmount.replace('~', '');
        logger_1.default.info(`${cardTitleText}: ${amount}`);
        await (0, utils_1.delay)(3000);
        const statisticsTitle = await baseElement.findElement(this.statisticsTitle);
        const percentTitle = await statisticsTitle.getText();
        const percents = await baseElement.findElements(this.totalPercentAmount);
        const percentString = await percents[1].getText();
        const percent = +percentString;
        logger_1.default.info(`${percentTitle}: ${percent}`);
        const totalNumberOfForcesElements = await baseElement.findElements(this.totalNumberOfForces);
        const totalNumberOfForcesElement = await totalNumberOfForcesElements[1].getText();
        const totalNumberOfForcesArray = totalNumberOfForcesElement.split('\n');
        const totalNumberOfForces = totalNumberOfForcesArray[0];
        const totalNumberOfForcesString = totalNumberOfForcesArray[1];
        const changedTotalNumberOfForces = totalNumberOfForces.replace('.', '');
        logger_1.default.info(`${totalNumberOfForcesString}: ${changedTotalNumberOfForces}`);
        const myCalculation = await this.calculatorOfPercent(amount, changedTotalNumberOfForces);
        logger_1.default.info(myCalculation);
        if (percent === myCalculation) {
            logger_1.default.info('my calculation is equal site calculation');
        }
        else {
            throw new Error(`${percent} is not equal to ${myCalculation}`);
        }
    }
    // private methods for calculating russian losses
    async getCurrentDay(driver, dateLabel) {
        const dateElement = driver.wait(selenium_webdriver_1.until.elementLocated(dateLabel), 10000);
        const date = dateElement.getText();
        return date;
    }
    async changeStringToDATE(date) {
        const splitedDate = date.split('.');
        const reverrsedDate = splitedDate.reverse();
        const formatedString = reverrsedDate.join('.');
        const newDate = new Date(formatedString);
        return newDate;
    }
    /**
     * method for calculating percent of losses
     *
     * @param daily string with day losses
     * @param total string with total amount
     * @returns number of percent
     */
    async calculatorOfPercent(daily, total) {
        logger_1.default.info(`${+daily} ${+total}`);
        const totalNumber = +daily / +total;
        const percent = totalNumber * 100;
        logger_1.default.info(percent);
        const rounded = percent.toFixed(1);
        return +rounded;
    }
}
exports.MinusrusPage = MinusrusPage;
//# sourceMappingURL=MinusrusMain.js.map