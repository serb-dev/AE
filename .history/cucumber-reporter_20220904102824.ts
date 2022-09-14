

const reportsDir = path.join(process.cwd(), '/reporter')
    const targetJson = reportsDir + '/cucumber_report.json'

    const cucumberReporterOptions: Options = {
        jsonFile: targetJson,
        launchReport: true,
        output: reportsDir + '/cucumber_reporter.html',
        reportSuiteAsScenarios: true,
        theme: 'bootstrap',
    }

    const createHTMLReport = () => {
        try {
            reporter.generate(cucumberReporterOptions)
        } catch (err) {
            if (err) {
                throw new Error(`Failed to create cucumber html report.\n Error: ${err}`)
            }
        }
    }

    createHTMLReport()
