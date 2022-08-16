import { WebDriver, until } from 'selenium-webdriver'
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

export function getCurrentDay(driver: WebDriver) {
    logger.info(driver)
    const dateElement = driver.wait(until.elementLocated(this.dateLabel), 10000)
    const date = dateElement.getText()
    return date
}
