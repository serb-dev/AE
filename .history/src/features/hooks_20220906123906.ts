import * as path from 'path'
import { Before, AfterAll } from '@cucumber/cucumber'
import logger from '../../src/logger/logger'
// import { options } from './../../cucumber-reporter'
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
    try{
        // const reporterDir = path.join(process.cwd(), '/reporter')
        // const reporterJson = reporterDir + '/cucumber_report.json'

        const options = {
            theme: 'bootstrap',
            jsonFile: reporterJson,
            output: reporterDir + '/cucumber_report.html',
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
