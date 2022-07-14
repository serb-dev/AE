import { get } from 'https';
import { WebDriver, By } from "selenium-webdriver";
import logger from '../../logger/logger';;

export class apiClient {
     aplicationData: string = 'https://restcountries.com/v3.1/alpha/US/?json';


    public async getAPI() {
        const response = await get(this.aplicationData)

        const responseData = await response
        logger.info('22')
        logger.info(responseData)
    }
}