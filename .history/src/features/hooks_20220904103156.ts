import * as reporter from 'cucumber-html-reporter'
import { Before, AfterAll } from '@cucumber/cucumber'
import { cucumberReporterOptions } from 'cucumber-reporter'
import logger from '../../src/logger/logger'
import { BrowserEnviroment } from './api/BrowserEnviroment'

// const fs = require('fs')

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
