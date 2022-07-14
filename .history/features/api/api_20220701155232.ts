import { WebDriver, By } from "selenium-webdriver";

export class api {
    driver: WebDriver;

    constructor(driver: WebDriver){
        this.driver = driver
    }
}