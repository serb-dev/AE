"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const cucumber_1 = require("@cucumber/cucumber");
class Calculator {
    sum(a, b) {
        return a + b;
    }
}
class SumaWorld {
    constructor() {
        this.calculator = new Calculator();
        this.result = 0;
    }
}
cucumber_1.setWorldConstructor(SumaWorld);
//# sourceMappingURL=calculator.js.map