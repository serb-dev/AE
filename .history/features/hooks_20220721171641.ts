import { Before } from "@cucumber/cucumber"
import { BrowserEnviroment } from './api/BrowserEnviroment';
import { Builder, ThenableWebDriver} from 'selenium-webdriver'

const browser = process.env.BOWSER_ENW
console.log(browser)

Before(async function(scenario) {
    console.log('I am before')
    const enviroment = new BrowserEnviroment(browser)
    const driver = enviroment.getDriver()

    this.world = {
        driver
    }
})