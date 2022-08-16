/**
 * Function for delay and pauses between steps
 * @param ms 
 * @returns 
 */

export function delay(ms:number) {
    return new Promise(resolve => setTimeout(resolve, ms))
}