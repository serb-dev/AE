import { WebDriver, By } from "selenium-webdriver";
import logger from '../../logger/logger';

export class apiClient {
    driver: WebDriver;
    aplicationData: string = 'https://restcountries.com/v3.1/alpha/US';

    constructor(driver: WebDriver){
        this.driver = driver
    }

    public async getAPI() {
        let response = await fetch(this.aplicationData);

        if (response.ok) { 
            let json = await response.json();
            logger.info(json)
        } else {
        alert("Ошибка HTTP: " + response.status);
        }
        logger.info('22')
        
    }
}