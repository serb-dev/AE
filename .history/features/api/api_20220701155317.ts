import { WebDriver, By } from "selenium-webdriver";

export class api {
    driver: WebDriver;
    aplication: string = ''

    constructor(driver: WebDriver){
        this.driver = driver
    }
}