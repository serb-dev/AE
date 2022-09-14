import * as path from 'path'
import { Options } from 'cucumber-html-reporter'
import logger from './src/logger/logger'

const reporterDir = path.join(process.cwd(), '/reporter')
const reporterJson = reporterDir + '/cucumber_report.json'

export const cucumberReporterOptions: Options = {
    jsonFile: reporterJson,
    launchReport: true,
    output: reporterDir + '/cucumber_reporter.html',
    reportSuiteAsScenarios: true,
    theme: 'bootstrap',
    ignoreBadJsonFile: true
}

