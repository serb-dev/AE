import * as path from 'path'
import { Options } from 'cucumber-html-reporter'
import logger from './src/logger/logger'

// const reportsDir = path.join(process.cwd(), '/reporter')
// const targetJson = reportsDir + '/cucumber_report.json'
// logger.info(targetJson + ': the PATH')

const reportDir = __dirname + '/reporter'
const file = reportDir + '/cucumber_report.json'
logger.info(file + 'OPPO')
export const reporterOptions = {
    jsonFile: file,
    launchReport: true,
    output: reportsDir + '/cucumber_reporter.html',
    reportSuiteAsScenarios: true,
    theme: 'bootstrap',
}

// export const cucumberReporterOptions: Options = {
//     jsonFile: targetJson,
//     launchReport: true,
//     output: reportsDir + '/cucumber_reporter.html',
//     reportSuiteAsScenarios: true,
//     theme: 'bootstrap',
// }

