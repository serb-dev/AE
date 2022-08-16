/**
 * Function for delay and pauses between steps
 * @param ms accept number of ms
 * @returns Promise with timeout
 */

export function delay(ms:number) {
    return new Promise(resolve => setTimeout(resolve, ms))
}