"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const cucumber_1 = require("@cucumber/cucumber");
const logger_1 = __importDefault(require("../../src/logger/logger"));
const BrowserEnviroment_1 = require("./api/BrowserEnviroment");
const browser = process.env.BOWSER_ENW;
(0, cucumber_1.Before)(async function () {
    logger_1.default.info(`--------------- Start ${browser} browser session -----------------`);
    const enviroment = new BrowserEnviroment_1.BrowserEnviroment(browser);
    const driver = enviroment.getDriver();
    this.world = {
        driver
    };
});
//# sourceMappingURL=hooks.js.map