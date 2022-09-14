import * as path from 'path'
import * as reporter from 'cucumber-html-reporter'
import { Before, AfterAll } from '@cucumber/cucumber'
import logger from '../../src/logger/logger'
import { cucumberReporterOptions } from './../../cucumber-reporter'
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
    // const createHTMLReport = () => {
    //     try {
    //         reporter.generate(cucumberReporterOptions)
    //     } catch (err) {
    //         if (err) {
    //             throw new Error(`Failed to create cucumber html report.\n Error: ${err}`)
    //         }
    //     }
    // }

    // createHTMLReport()
    const options = {
        theme: 'bootstrap',
        jsonFile: '/reporter/cucumber_report.json',
        output: '/reporter/cucumber_report.html',
        reportSuiteAsScenarios: true,
        scenarioTimestamp: true,
        launchReport: true,
        metadata: {
            "App Version":"0.3.2",
            "Test Environment": "STAGING",
            "Browser": "Chrome  54.0.2840.98",
            "Platform": "Windows 10",
            "Parallel": "Scenarios",
            "Executed": "Remote"
    }
})
