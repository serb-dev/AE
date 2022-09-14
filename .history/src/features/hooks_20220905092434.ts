import * as reporter from 'cucumber-html-reporter'
import { Before, AfterAll } from '@cucumber/cucumber'
import logger from '../../src/logger/logger'
// import { cucumberReporterOptions } from './../../cucumber-reporter'
import { reporterOptions } from './../../cucumber-reporter'
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
    const createHTMLReport = () => {
        try {
            const reportDir = __dirname + '\reporter'
            const file = reportDir + '\cucumber_report.json'
            logger.info(file + 'OPPO')
            reporter.generate(reporterOptions)
        } catch (err) {
            if (err) {
                throw new Error(`Failed to create cucumber html report.\n Error: ${err}`)
            }
        }
    }

    createHTMLReport()
})
