import { Before, AfterAll } from '@cucumber/cucumber'
import logger from '../../src/logger/logger'
// import { options } from './../../cucumber-reporter'
import { BrowserEnviroment } from './api/BrowserEnviroment'

const reporter = require('cucumber-html-reporter')
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
    try{
        await reporter.generate(options)
    }catch(error){
        if (error) {
            throw new Error(`Failed to create cucumber html report.\n Error: ${error}`)
        }
    }
})
