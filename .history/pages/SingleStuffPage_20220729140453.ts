import { WebDriver, By, until} from "selenium-webdriver";
import {delay} from '../../utils/utils';
import logger from '../../logger/logger';

export class SingleStuffPage {
    private driver: WebDriver;
    private banner: By = By.className('_content_3s1n4b _overlay-wrapper_c5lqad');
    private selector: By = By.className('dropdown-toggle qa-dropdown-toggle');
    private selectItem: By = By.xpath('.//ul[@class="dropdown-menu"]/li[2]/a');
    private increaseBtn: By = By.className('qty-inc-btn');
    private decreaseBtn: By = By.className('qty-dec-btn');
    private addButton: By = By.name('addToBag');
    private viewButton: By = By.name('viewBag');

    constructor(driver: WebDriver){
        this.driver = driver
    }

    public async goToSingleStuffPage(): Promise<void> {
        logger.info('I open page with choosed stuff');
        await this.driver.wait(until.elementLocated(this.banner), 10000);
        await delay(3000);
    };

    public async selectStuffSize(): Promise<void> { 
        logger.info('selecting size');
        const selector = await this.driver.wait(until.elementLocated(this.selector), 10000);
        await selector.click();
        await delay(3000);
        const selectorItem = await this.driver.wait(until.elementLocated(this.selectItem), 10000);
        await selectorItem.click();        
    };

    public async increasingAmountStuff(): Promise<void> {
        logger.info('increase amount');
        const plus = await this.driver.wait(until.elementLocated(this.increaseBtn), 10000);
        await delay(3000);
        await plus.click();
    }
    public async decreasingAmountStuff(): Promise<void> {
        logger.info('decrease amount');
        const minus = await this.driver.wait(until.elementLocated(this.decreaseBtn), 10000);
        await delay(3000);
        await minus.click();   
        await delay(3000);     
    }
    public async clickAddToBagButton(): Promise<void> {
        logger.info('add this to bag');
        const addToBag = await this.driver.wait(until.elementLocated(this.addButton), 10000);
        await addToBag.click();
        await delay(3000);
    }
    public async clickViewBagButton(): Promise<void> {
        logger.info('click on "view bag" button');
        const viewBag = await this.driver.wait(until.elementLocated(this.viewButton), 10000);
        await viewBag.click();
    }
}