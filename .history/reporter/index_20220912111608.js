const reporter = require('cucumber-html-reporter')

const exitCode = process.env.EXIT
// eslint-disable-next-line no-console
console.log(exitCode)


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

// reporter.generate(options)

const code = +exitCode
if(code === 0){
    process.exitCode = 0
}else{
    process.exitCode = 1
}
