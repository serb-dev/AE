import fetch from 'node-fetch'
import { get } from 'https';
import { WebDriver, By } from "selenium-webdriver";
import logger from '../../logger/logger';;

export class apiClient {
    driver: WebDriver;
    aplicationData: string = 'https://restcountries.com/v3.1/alpha/US/?json';

    constructor(driver: WebDriver){
        this.driver = driver
    }

    // public async getAPI() {
    //     const response = get(this.aplicationData)

    //     const responseData = response.json()
    //     logger.info(responseData)
    // }

    fetchPosts = async () => {
        const response = await fetch('https://restcountries.com/v3.1/alpha/US?json')
    
        const responseData = await response.json();
    
        console.log(responseData)
    }
    
}