import { setWorldConstructor } from "@cucumber/cucumber";

class Calculator {
  sum(a: number, b: number) {
    return a + b;
  }
}

class SumaWorld {
  constructor() {
    this.calculator = new Calculator();
    this.result = 0;
  }
}

setWorldConstructor(SumaWorld)