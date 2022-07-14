import { setWorldConstructor, World } from '@cucumber/cucumber';

class Calculator {
    sum(a, b) {
        return a + b
    }
}

class SumaWorld{
    constructor(){
        this.calculator = new Calculator
        
    }
}