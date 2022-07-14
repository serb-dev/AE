import { WebDriver, until, By } from "selenium-webdriver";
import { delay } from '../utils/utils';

export class BagPage {
    driver: WebDriver;
    private banner: By = By.className('sticky-promo qa-sticky-header-promo __a842c');
    private checkoutBtn: By = By.name('go2checkout');
    
    constructor(driver:WebDriver) {
        this.driver = driver
    }

    public async goToBagPage(): Promise<void> {
        await this.driver.wait(until.elementLocated(this.banner), 10000);
        await delay(3000);
    }

    public async checkoutClick(): Promise<void> {
        const checkout = await this.driver.wait(until.elementLocated(this.checkoutBtn), 10000);
        await checkout.click();
        await delay(3000);
    }
}