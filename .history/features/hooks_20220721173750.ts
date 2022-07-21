import { Before } from "@cucumber/cucumber";
import { BrowserEnviroment } from './api/BrowserEnviroment';
import logger from "logger/logger";

const browser = process.env.BOWSER_ENW;

Before(async function(scenario) {
    logger.info(`--------------- Start ${browser} browser session -----------------`);
    const enviroment = new BrowserEnviroment(browser);
    const driver = enviroment.getDriver();

    this.world = {
        driver
    }
});