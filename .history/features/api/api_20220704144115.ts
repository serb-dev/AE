import { get } from 'https';
import { WebDriver, By } from "selenium-webdriver";
import logger from '../../logger/logger';;

export class apiClient {
    driver: WebDriver;
    aplicationData: string = 'https://restcountries.com/v3.1/alpha/US/?json';

    constructor(driver: WebDriver){
        this.driver = driver
    }

    public async getAPI() {
        const response = get(this.aplicationData)

        const responseData = response[1]
        logger.info(responseData)
    }
}