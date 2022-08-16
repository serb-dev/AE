import { WebDriver, until, By } from 'selenium-webdriver'
import logger from '../logger/logger'
/**
 * Function for delay and pauses between steps
 *
 * @param ms accept number of ms
 * @returns Promise with timeout
 */

export function delay(ms: number) {
    return new Promise((resolve) => setTimeout(resolve, ms))
}

export function getCurrentDay(driver: WebDriver, dateLabel: By) {
    const dateElement = driver.wait(until.elementLocated(dateLabel), 10000)
    const date = dateElement.getText()
    return date
}

export function dateChecking(expectedDate: string, currentDate: string): void{
    const date = new Date()
    const testDate = expectedDate.split('')
    const reversetestDate = testDate.reverse()
    const newTestDate = reversetestDate.join('')

    const dateExpected = new Date(newTestDate)
    if(date > dateExpected){
        logger.info('succes DATA')
        logger.info(date)
        logger.info(dateExpected)
    }else{
        logger.info(date)
        logger.info(dateExpected)
        throw new Error(expectedDate + ' > than ' + currentDate)
    }
}
