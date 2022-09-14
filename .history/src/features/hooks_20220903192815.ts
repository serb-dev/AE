import * as path from 'path'
import { Options } from 'cucumber-html-reporter'
import * as reporter from 'cucumber-html-reporter'

import { Before, AfterAll } from '@cucumber/cucumber'
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
    const reportsDir = path.join(process.cwd(), '/reporter')
    const targetJson = reportsDir + '/cucumber_report.json'

    const cucumberReporterOptions: Options = {
        jsonFile: targetJson,
        launchReport: true,
        output: reportsDir + '/cucumber_reporter.html',
        reportSuiteAsScenarios: true,
        theme: 'bootstrap',
    }

    const createHTMLReport = () => {
        try {
            reporter.generate(cucumberReporterOptions)
        } catch (err) {
            if (err) {
                throw new Error(`Failed to create cucumber html report.\n Error: ${err}`)
            }
        }
    }

    createHTMLReport()

})
