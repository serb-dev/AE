import { WebDriver, By } from "selenium-webdriver";
import { setWorldConstructor } from "@cucumber/cucumber";

class Calculator {
    sum(a,b) {
        return a + b
    }
}

class SumaWorld {
    constructor() {
        
    }
}