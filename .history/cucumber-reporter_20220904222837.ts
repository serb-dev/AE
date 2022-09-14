import * as path from 'path'
import { Options } from 'cucumber-html-reporter'
import logger from './src/logger/logger'

const reportsDir = path.join(process.cwd(), `/reporter`)
const targetJson = reportsDir + '/cucumber_report.json'


export const cucumberReporterOptions: Options = {
    jsonFile: targetJson,
    launchReport: true,
    output: reportsDir + '/cucumber_reporter.html',
    reportSuiteAsScenarios: true,
    theme: 'bootstrap',
}
logger.info(targetJson)
