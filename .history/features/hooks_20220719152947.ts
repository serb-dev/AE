import logger from '../logger/logger';
import { WebDriver } from 'selenium-webdriver';
import { Before } from "@cucumber/cucumber"
import { Builder} from 'selenium-webdriver'
import { BrowserEnviroment } from './api/BrowserEnviroment';

const browser = process.env.BOWSER_ENW
console.log(browser)

Before(async function(scenario) {
    console.log('I am before')
    const enviroment = new BrowserEnviroment(browser)

    logger.info(enviroment.getDriver())

    const driver = new Builder()
    .forBrowser(browser)
    .withCapabilities(enviroment.getDriver())
    .build()

    this.world = {
        driver
    }
})

export interface CucumberWorld {
    driver: WebDriver
}