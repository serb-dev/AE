import { setWorldConstructor, World } from "@cucumber/cucumber";
import { Console } from "console";

export class Calculator extends World  {
  sum(a: number, b: number) {
    return a + b;
  }
}

class SumaWorld {
  calculator: Calculator
  result: number
  constructor() {
    this.calculator = new Calculator();
    this.result = 0;
  }
}

// setWorldConstructor(SumaWorld)