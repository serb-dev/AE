import { WebDriver, until, By } from 'selenium-webdriver'
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

export function dateChacking(){
    const date = new Date()
}
