import fs from 'fs'
import { Before, AfterAll } from '@cucumber/cucumber'
import logger from '../../src/logger/logger'
import { BrowserEnviroment } from './api/BrowserEnviroment'

const browser = process.env.BOWSER_ENW

Before(async function() {
    logger.info(`--------------- Start ${browser} browser session -----------------`)
    const enviroment = new BrowserEnviroment(browser)
    const driver = enviroment.getDriver()

    this.world = {
        driver
    }
})

AfterAll(async function() {

})
