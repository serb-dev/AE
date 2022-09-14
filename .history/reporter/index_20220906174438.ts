import * as path from 'path'
const reporter = require('cucumber-html-reporter')

const reporterFile = path.join(process.cwd(), '/reporter/cucumber_report.json')
const reporterOutput = path.join(process.cwd(), '/reporter/cucumber_report.html')

const options = {
    theme: 'bootstrap',
    jsonFile: reporterFile,
    output: reporterOutput,
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
