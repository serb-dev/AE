import * as path from 'path'
// import * as reporter from 'cucumber-html-reporter'

import { Before, AfterAll } from '@cucumber/cucumber'
import { delay } from '../utils/utils'
import logger from '../../src/logger/logger'
// import { cucumberReporterOptions } from './../../cucumber-reporter'
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
    const reporter = require('cucumber-html-reporter')
    const jsonDir = path.join(process.cwd(), '/reporter')
    const jsonFile = path.join(process.cwd(), '/reporter/cucumber_report.html')

    try{
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
        await reporter.generate(options)
    }catch(error){
        if (error) {
            throw new Error(`Failed to create cucumber html report.\n Error: ${error}`)
        }
    }
})
