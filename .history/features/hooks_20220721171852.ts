import { Before } from "@cucumber/cucumber"
import { BrowserEnviroment } from './api/BrowserEnviroment';
import logger from "logger/logger";

const browser = process.env.BOWSER_ENW

Before(async function(scenario) {
    console.log('I am before')
    logger.info('---------------Start ')
    const enviroment = new BrowserEnviroment(browser)
    const driver = enviroment.getDriver()

    this.world = {
        driver
    }
})