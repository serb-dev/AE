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

    fetchPosts = async () => {
        const response = await fetch('https://restcountries.com/v3.1/alpha/US?json')
    
        const responseData = await response.json();

        const loadedData = [];

        for (const key in responseData[0]) {
            loadedData.push({
                capital: responseData[key].capital
            })
        }

        console.log(loadedData)
    }
    
}