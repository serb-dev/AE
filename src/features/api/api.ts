import fetch from 'node-fetch'

/**
 *
 * @returns
 */

export async function getCity() {
    const request = await fetch('https://restcountries.com/v3.1/alpha/US?json')
    const responseData = await request.json()

    const city: string = responseData[0].capital[0]
    return city.slice(0, 10)
}
