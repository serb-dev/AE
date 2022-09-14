import fs from 'fs'
import { Before, AfterAll } from '@cucumber/cucumber'
import logger from '../../src/logger/logger'
import { BrowserEnviroment } from './api/BrowserEnviroment'
const reporter = require('cucumber-html-reporter')

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
    try {
        await fs.promises.access('reporter/cucumber_report.json')
        logger.info('existing PATH')
        const options = {
            theme: 'bootstrap',
            jsonFile: 'reporter/cucumber_report.json',
            output: 'reporter/cucumber_report.html',
            reportSuiteAsScenarios: true,
            scenarioTimestamp: true,
            launchReport: true,
            metadata: {
                'App Version':'0.3.2',
                'Test Environment': 'STAGING',
                'Browser': 'Chrome  54.0.2840.98',
                'Platform': 'Windows 10',
                'Parallel': 'Scenarios',
                'Executed': 'Remote'
            }
        }

        reporter.generate(options)
    } catch (error) {
        logger.info('error PAth')
    }
})
