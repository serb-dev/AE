const reporter = require('cucumber-html-reporter')

const exitCode = process.exitCode
const exit = process.exit(0)
// eslint-disable-next-line no-console
console.log(exitCode)
// eslint-disable-next-line no-console
console.log(exit)

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
// eslint-disable-next-line no-console
console.log(exitCode)
