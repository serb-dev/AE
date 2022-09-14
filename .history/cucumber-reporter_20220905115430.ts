import * as path from 'path'
import { Options } from 'cucumber-html-reporter'
import logger from './src/logger/logger'

const reportsDir = path.join(process.cwd(), '/reporter')
const targetJson = reportsDir + '/cucumber_report.json'
logger.info(targetJson + ': the PATH')

export const cucumberReporterOptions: Options = {
    jsonDir: targetJson,
    launchReport: true,
    output: reportsDir + '/cucumber_reporter.html',
    reportSuiteAsScenarios: true,
    theme: 'bootstrap',
}

