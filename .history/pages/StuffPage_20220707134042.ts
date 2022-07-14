import { WebDriver, By, until, Actions } from "selenium-webdriver";
import {delay} from '../utils/utils';
import logger from '../logger/logger';

export class StuffPage {
    private carousel: By = By.className('qa-wcs-category-banner wcs-category-banner __4d61e');
    private rejectFormBtn: By = By.name('reject-notifications');
    private btnCarousel: By = By.css('button[class="close-button btn-cancel qa-btn-cancel"]');
    private stuff: By = By.xpath('.//div[@class="__6cafc results-list qa-results-list"]/div[3]/div/a[1]');
    
    private driver: WebDriver;

    constructor(driver:WebDriver){
        this.driver = driver
    }

    public async goToMenJeansPage(): Promise<void> {
        logger.info('I am on "Men" page');
        await this.driver.wait(until.elementLocated(this.carousel), 10000);
        logger.info('I reject modal window');
        const reject = await this.driver.wait(until.elementLocated(this.rejectFormBtn), 10000)
        await delay(3000);
        await reject.click();
    }

    public async chooseOneStuff(): Promise<void> {
        logger.info('Select an item');
        const stuff = await this.driver.wait(until.elementLocated(this.stuff), 10000);
        // await this.driver.executeScript('scrollTo', this.stuff);
        await this.driver.executeScript(() => {window.scrollBy(0, 1500)});
        await delay(3000);
        await stuff.click();
    }
}