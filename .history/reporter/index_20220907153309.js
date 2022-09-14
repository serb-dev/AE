import { logger } from '../src/logger/logger'
import { generate } from 'cucumber-html-reporter'


const exitCode = process.exitCode
logger.info(exitCode)

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

generate(options)
