import { get } from 'https';
import fetch from 'node-fetch';
import { WebDriver, By } from "selenium-webdriver";
import logger from '../../logger/logger';;

export class apiClient {
    driver: WebDriver;
    aplicationData: string = 'https://restcountries.com/v3.1/alpha/US/?json';

    constructor(driver: WebDriver){
        this.driver = driver
    }

    public async getAPI() {
        const response = await get(this.aplicationData)

        const responseData = await response
        logger.info('22')
        logger.info(responseData)
    }
}