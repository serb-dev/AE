import { setWorldConstructor } from '@cucumber/cucumber';
import { WebDriver, By } from "selenium-webdriver";

const _defaultOptions = {
    env: 'stage',
};
   
function World(input) {
    this.World = input;
    }

    Object.assign(this, _defaultOptions);



setWorldConstructor(World);