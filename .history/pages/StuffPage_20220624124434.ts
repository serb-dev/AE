import { WebDriver, By, until } from "selenium-webdriver";
import {delay} from '../utils/utils';

export class StuffPage {
    private carousel: By = By.className('qa-wcs-category-banner wcs-category-banner __4d61e');
    private rejectFormBtn: By = By.name('reject-notifications');
    private btnCarousel: By = By.css('button[class="close-button btn-cancel qa-btn-cancel"]');
    private stuff: By = By.xpath('.//div[@class="__6cafc results-list qa-results-list"]/div[3]/div/a[1]');
    
    private driver: WebDriver;

    constructor(driver:WebDriver){
        this.driver = driver
    }

    public async getMenJeansPage(): Promise<void> {
        await this.driver.wait(until.elementLocated(this.carousel), 10000);
        const reject = await this.driver.wait(until.elementLocated(this.rejectFormBtn), 10000)
        await delay(3000);
        await reject.click();
        // await this.driver.wait(until.elementLocated(this.btnCarousel), 10000)
        // await this.driver.findElement(this.btnCarousel).click()
    }

    public async getStuff(): Promise<void> {
        const stuff = await this.driver.wait(until.elementLocated(this.stuff), 10000);
        await delay(3000);
        await stuff.click();
    }
}