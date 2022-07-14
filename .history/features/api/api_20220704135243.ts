import { get } from "http";
import { WebDriver, By } from "selenium-webdriver";
import logger from '../../logger/logger';;

export class apiClient {
    driver: WebDriver;
    aplicationData: string = 'https://restcountries.com/v3.1/alpha/US';

    constructor(driver: WebDriver){
        this.driver = driver
    }

    public async getAPI() {
        let response = get(this.aplicationData);
        logger.info('22')
        logger.info(response)
    }
}