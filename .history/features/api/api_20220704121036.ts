import { setWorldConstructor } from '@cucumber/cucumber';
import { WebDriver, By } from "selenium-webdriver";

export class apiClient {
    driver: WebDriver;
    aplicationData: string = 'https://restcountries.com/v3.1/alpha/US';

    constructor(driver: WebDriver){
        this.driver = driver
    }

    public async getAPI() {
        await this.driver.get(this.aplicationData);
    }
}

setWorldConstructor()