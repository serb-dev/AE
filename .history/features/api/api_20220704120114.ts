import { WebDriver, By } from "selenium-webdriver";
import { setWorldConstructor } from "@cucumber/cucumber";

class apiClient {
    driver: WebDriver;
    aplicationData: string = 'https://restcountries.com/v3.1/alpha/US';

    constructor(driver: WebDriver){
        this.driver = driver
    }
}

class apiClientWorld {
    
}



setWorldConstructor(apiClientWorld);