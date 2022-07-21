"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const cucumber_1 = require("@cucumber/cucumber");
const BrowserEnviroment_1 = require("./api/BrowserEnviroment");
const browser = process.env.BOWSER_ENW;
console.log(browser);
cucumber_1.Before(async function (scenario) {
    console.log('I am before');
    const enviroment = new BrowserEnviroment_1.BrowserEnviroment(browser);
    const driver = enviroment.getDriver();
    // const driver = new Builder()
    // .forBrowser(browser)
    // .withCapabilities(enviroment.getDriver())
    // .build()
    this.world = {
        driver,
    };
});
//# sourceMappingURL=hooks.js.map